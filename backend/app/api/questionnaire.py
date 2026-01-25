"""
Questionnaire API endpoints.

Main entry point for leads submitting their information.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.db.models import (
    Lead, QuestionnaireResponse as QuestionnaireModel,
    ProjectType, DevelopmentStage, BudgetRange, Timeline
)
from app.schemas.questionnaire import (
    QuestionnaireSubmission, QuestionnaireResponse, QuestionnaireOptions
)
from app.services.lead_scoring import lead_scoring_engine
from app.services.email_service import email_service

router = APIRouter()


@router.get("/options", response_model=QuestionnaireOptions)
async def get_questionnaire_options():
    """
    Get all available options for the questionnaire dropdowns.
    Useful for populating frontend forms.
    """
    return QuestionnaireOptions(
        project_types=[
            {"value": pt.value, "label": pt.value.replace("_", " ").title()}
            for pt in ProjectType
        ],
        development_stages=[
            {"value": ds.value, "label": ds.value.replace("_", " ").title()}
            for ds in DevelopmentStage
        ],
        budget_ranges=[
            {"value": BudgetRange.MICRO.value, "label": "Under $100K"},
            {"value": BudgetRange.LOW.value, "label": "$100K - $500K"},
            {"value": BudgetRange.MID.value, "label": "$500K - $2M"},
            {"value": BudgetRange.HIGH.value, "label": "$2M - $10M"},
            {"value": BudgetRange.STUDIO.value, "label": "$10M+"},
            {"value": BudgetRange.UNDETERMINED.value, "label": "Not Yet Determined"},
        ],
        timelines=[
            {"value": Timeline.IMMEDIATE.value, "label": "Ready to Start Now"},
            {"value": Timeline.ONE_TO_THREE_MONTHS.value, "label": "1-3 Months"},
            {"value": Timeline.THREE_TO_SIX_MONTHS.value, "label": "3-6 Months"},
            {"value": Timeline.SIX_PLUS_MONTHS.value, "label": "6+ Months"},
            {"value": Timeline.JUST_EXPLORING.value, "label": "Just Exploring Options"},
        ],
        services=[
            {"value": "script_coverage", "label": "Script Coverage"},
            {"value": "development_notes", "label": "Development Notes"},
            {"value": "packaging", "label": "Packaging Assistance"},
            {"value": "pitch_deck_review", "label": "Pitch Deck Review"},
            {"value": "market_analysis", "label": "Market Analysis"},
            {"value": "financing_strategy", "label": "Financing Strategy"},
        ]
    )


@router.post("/submit", response_model=QuestionnaireResponse)
async def submit_questionnaire(
    submission: QuestionnaireSubmission,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit the lead qualification questionnaire.

    This endpoint:
    1. Creates or updates the lead record
    2. Stores questionnaire responses
    3. Calculates lead score
    4. Sends welcome email
    5. Returns next steps
    """
    # Check if lead already exists
    result = await db.execute(
        select(Lead).where(Lead.email == submission.email)
    )
    existing_lead = result.scalar_one_or_none()

    if existing_lead:
        # Update existing lead
        lead = existing_lead
        lead.first_name = submission.first_name
        lead.last_name = submission.last_name
        lead.phone = submission.phone
        lead.company = submission.company
    else:
        # Create new lead
        lead = Lead(
            email=submission.email,
            first_name=submission.first_name,
            last_name=submission.last_name,
            phone=submission.phone,
            company=submission.company,
            utm_source=submission.utm_source,
            utm_medium=submission.utm_medium,
            utm_campaign=submission.utm_campaign,
            referrer=submission.referrer,
        )
        db.add(lead)
        await db.flush()  # Get the lead ID

    # Create questionnaire response
    questionnaire = QuestionnaireModel(
        lead_id=lead.id,
        project_type=submission.project_type,
        project_title=submission.project_title,
        project_logline=submission.project_logline,
        genre=submission.genre,
        development_stage=submission.development_stage,
        has_material=submission.has_material,
        material_types=submission.material_types,
        budget_range=submission.budget_range,
        has_financing=submission.has_financing,
        financing_percentage=submission.financing_percentage,
        timeline=submission.timeline,
        services_needed=submission.services_needed,
        previous_credits=submission.previous_credits,
        credits_description=submission.credits_description,
        how_did_you_hear=submission.how_did_you_hear,
        additional_notes=submission.additional_notes,
    )

    # Delete old questionnaire if exists
    if existing_lead and existing_lead.questionnaire_response:
        await db.delete(existing_lead.questionnaire_response)

    db.add(questionnaire)

    # Calculate lead score
    score_result = lead_scoring_engine.calculate_score(questionnaire)
    lead.score = score_result.total_score
    lead.tier = score_result.tier

    await db.commit()

    # Send welcome email (fire and forget)
    try:
        await email_service.send_welcome_email(lead)
    except Exception:
        pass  # Don't fail the request if email fails

    # Determine next step based on whether they have material
    if submission.has_material:
        next_step = "upload_material"
        message = "Thank you! Please upload your material on the next page."
    else:
        next_step = "submit_idea"
        message = "Thank you! Please describe your idea on the next page."

    return QuestionnaireResponse(
        lead_id=lead.id,
        score=score_result.total_score,
        tier=score_result.tier.value,
        message=message,
        next_step=next_step
    )


@router.get("/scoring-criteria")
async def get_scoring_criteria():
    """
    Get the lead scoring criteria (for transparency/admin use).
    """
    return lead_scoring_engine.get_scoring_criteria()
