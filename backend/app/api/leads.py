"""
Lead Management API endpoints.

For admin/internal use to manage and view leads.
"""

from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.db.session import get_db
from app.db.models import Lead, LeadTier, LeadStatus
from app.schemas.lead import (
    LeadResponse, LeadListResponse, LeadUpdateStatus, LeadScoreBreakdown
)
from app.services.lead_scoring import lead_scoring_engine

router = APIRouter()


@router.get("/", response_model=LeadListResponse)
async def list_leads(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    tier: Optional[LeadTier] = None,
    status: Optional[LeadStatus] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    List all leads with pagination and filtering.
    """
    # Build query
    query = select(Lead)

    if tier:
        query = query.where(Lead.tier == tier)
    if status:
        query = query.where(Lead.status == status)
    if search:
        search_filter = f"%{search}%"
        query = query.where(
            (Lead.email.ilike(search_filter)) |
            (Lead.first_name.ilike(search_filter)) |
            (Lead.last_name.ilike(search_filter)) |
            (Lead.company.ilike(search_filter))
        )

    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar()

    # Paginate
    query = query.order_by(Lead.created_at.desc())
    query = query.offset((page - 1) * per_page).limit(per_page)

    result = await db.execute(query)
    leads = result.scalars().all()

    return LeadListResponse(
        leads=[LeadResponse.model_validate(lead) for lead in leads],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=(total + per_page - 1) // per_page
    )


@router.get("/stats")
async def get_lead_stats(db: AsyncSession = Depends(get_db)):
    """
    Get lead statistics for dashboard.
    """
    # Total leads
    total_result = await db.execute(select(func.count(Lead.id)))
    total = total_result.scalar()

    # Leads by tier
    tier_stats = {}
    for tier in LeadTier:
        result = await db.execute(
            select(func.count(Lead.id)).where(Lead.tier == tier)
        )
        tier_stats[tier.value] = result.scalar()

    # Leads by status
    status_stats = {}
    for status in LeadStatus:
        result = await db.execute(
            select(func.count(Lead.id)).where(Lead.status == status)
        )
        status_stats[status.value] = result.scalar()

    # Recent leads (last 7 days)
    from datetime import timedelta
    week_ago = datetime.utcnow() - timedelta(days=7)
    result = await db.execute(
        select(func.count(Lead.id)).where(Lead.created_at >= week_ago)
    )
    recent = result.scalar()

    return {
        "total": total,
        "by_tier": tier_stats,
        "by_status": status_stats,
        "last_7_days": recent
    }


@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get a specific lead by ID.
    """
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    return LeadResponse.model_validate(lead)


@router.get("/{lead_id}/score", response_model=LeadScoreBreakdown)
async def get_lead_score_breakdown(
    lead_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get detailed score breakdown for a lead.
    """
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    if not lead.questionnaire_response:
        raise HTTPException(
            status_code=400,
            detail="Lead has not completed questionnaire"
        )

    score_result = lead_scoring_engine.calculate_score(lead.questionnaire_response)

    return LeadScoreBreakdown(
        total_score=score_result.total_score,
        tier=score_result.tier,
        breakdown=score_result.breakdown
    )


@router.patch("/{lead_id}/status", response_model=LeadResponse)
async def update_lead_status(
    lead_id: int,
    update: LeadUpdateStatus,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a lead's status in the pipeline.
    """
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.status = update.status
    if update.status == LeadStatus.CONTACTED:
        lead.last_contacted_at = datetime.utcnow()

    await db.commit()
    await db.refresh(lead)

    return LeadResponse.model_validate(lead)


@router.get("/{lead_id}/full")
async def get_lead_full_details(
    lead_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get full lead details including questionnaire, submissions, and analyses.
    """
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    questionnaire_data = None
    if lead.questionnaire_response:
        q = lead.questionnaire_response
        questionnaire_data = {
            "project_type": q.project_type.value,
            "project_title": q.project_title,
            "project_logline": q.project_logline,
            "genre": q.genre,
            "development_stage": q.development_stage.value,
            "has_material": q.has_material,
            "budget_range": q.budget_range.value,
            "has_financing": q.has_financing,
            "financing_percentage": q.financing_percentage,
            "timeline": q.timeline.value,
            "services_needed": q.services_needed,
            "previous_credits": q.previous_credits,
            "submitted_at": q.submitted_at,
        }

    submissions_data = [
        {
            "id": s.id,
            "submission_type": s.submission_type,
            "original_filename": s.original_filename,
            "is_processed": s.is_processed,
            "uploaded_at": s.uploaded_at,
        }
        for s in lead.submissions
    ]

    analyses_data = [
        {
            "id": a.id,
            "analysis_type": a.analysis_type,
            "summary": a.summary,
            "market_potential": a.market_potential,
            "created_at": a.created_at,
        }
        for a in lead.analysis_results
    ]

    return {
        "lead": LeadResponse.model_validate(lead),
        "questionnaire": questionnaire_data,
        "submissions": submissions_data,
        "analyses": analyses_data,
    }
