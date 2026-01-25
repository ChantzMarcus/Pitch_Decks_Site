"""
Analysis API endpoints.

Handles triggering analysis and retrieving results.
"""

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.db.models import Lead, Submission, AnalysisResult
from app.schemas.analysis import AnalysisResultResponse, AnalysisRequest, AnalysisStatus
from app.services.analysis_integration import (
    analysis_integration, AnalysisRequest as AnalysisServiceRequest
)
from app.services.file_handler import file_handler
from app.services.email_service import email_service

router = APIRouter()


async def process_analysis(
    lead_id: int,
    submission_id: int | None,
    db: AsyncSession
):
    """
    Background task to process analysis.
    """
    # Get lead and questionnaire
    result = await db.execute(
        select(Lead).where(Lead.id == lead_id)
    )
    lead = result.scalar_one_or_none()
    if not lead or not lead.questionnaire_response:
        return

    questionnaire = lead.questionnaire_response

    # Get submission if provided
    content = None
    idea_description = None
    submission_type = "idea"

    if submission_id:
        result = await db.execute(
            select(Submission).where(Submission.id == submission_id)
        )
        submission = result.scalar_one_or_none()
        if submission:
            submission_type = submission.submission_type
            if submission.file_path:
                content = await file_handler.get_file(submission.file_path)
            if submission.idea_description:
                idea_description = submission.idea_description

    # Build analysis request
    analysis_request = AnalysisServiceRequest(
        lead_id=lead_id,
        submission_id=submission_id,
        submission_type=submission_type,
        content=content,
        idea_description=idea_description,
        project_type=questionnaire.project_type.value,
        genre=questionnaire.genre,
        logline=questionnaire.project_logline,
    )

    # Call analysis software
    response = await analysis_integration.request_analysis(analysis_request)

    # Store result
    analysis_result = AnalysisResult(
        lead_id=lead_id,
        submission_id=submission_id,
        analysis_type=response.analysis_type,
        raw_response=response.raw_response,
        summary=response.summary,
        strengths=response.strengths,
        weaknesses=response.weaknesses,
        market_potential=response.market_potential,
    )
    db.add(analysis_result)

    # Mark submission as processed
    if submission_id:
        result = await db.execute(
            select(Submission).where(Submission.id == submission_id)
        )
        submission = result.scalar_one_or_none()
        if submission:
            submission.is_processed = True
            submission.processed_at = datetime.utcnow()
            if not response.success:
                submission.processing_error = response.error

    await db.commit()
    await db.refresh(analysis_result)

    # Send email with results
    if response.success:
        try:
            await email_service.send_analysis_results(lead, analysis_result)
            analysis_result.is_sent_to_lead = True
            analysis_result.sent_at = datetime.utcnow()
            await db.commit()
        except Exception:
            pass  # Don't fail if email fails


@router.post("/trigger")
async def trigger_analysis(
    request: AnalysisRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """
    Trigger analysis for a lead's submission.

    This runs in the background and emails results when complete.
    """
    # Verify lead exists
    result = await db.execute(select(Lead).where(Lead.id == request.lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Verify submission exists if provided
    if request.submission_id:
        result = await db.execute(
            select(Submission).where(Submission.id == request.submission_id)
        )
        submission = result.scalar_one_or_none()
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")

    # Queue background task
    background_tasks.add_task(
        process_analysis,
        request.lead_id,
        request.submission_id,
        db
    )

    return {
        "status": "processing",
        "message": "Analysis has been queued. Results will be emailed when ready."
    }


@router.get("/lead/{lead_id}", response_model=list[AnalysisResultResponse])
async def get_lead_analysis(
    lead_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all analysis results for a lead.
    """
    result = await db.execute(
        select(AnalysisResult).where(AnalysisResult.lead_id == lead_id)
    )
    analyses = result.scalars().all()

    return [
        AnalysisResultResponse(
            id=a.id,
            lead_id=a.lead_id,
            submission_id=a.submission_id,
            analysis_type=a.analysis_type,
            summary=a.summary,
            strengths=a.strengths,
            weaknesses=a.weaknesses,
            market_potential=a.market_potential,
            created_at=a.created_at,
        )
        for a in analyses
    ]


@router.get("/{analysis_id}", response_model=AnalysisResultResponse)
async def get_analysis(
    analysis_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific analysis result.
    """
    result = await db.execute(
        select(AnalysisResult).where(AnalysisResult.id == analysis_id)
    )
    analysis = result.scalar_one_or_none()

    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    return AnalysisResultResponse(
        id=analysis.id,
        lead_id=analysis.lead_id,
        submission_id=analysis.submission_id,
        analysis_type=analysis.analysis_type,
        summary=analysis.summary,
        strengths=analysis.strengths,
        weaknesses=analysis.weaknesses,
        market_potential=analysis.market_potential,
        created_at=analysis.created_at,
    )


@router.get("/status/{lead_id}", response_model=AnalysisStatus)
async def get_analysis_status(
    lead_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Check analysis status for a lead.
    """
    result = await db.execute(
        select(AnalysisResult)
        .where(AnalysisResult.lead_id == lead_id)
        .order_by(AnalysisResult.created_at.desc())
    )
    analysis = result.scalar_one_or_none()

    if analysis:
        return AnalysisStatus(
            has_analysis=True,
            analysis_id=analysis.id,
            status="complete",
            created_at=analysis.created_at
        )

    # Check if there's a pending submission
    result = await db.execute(
        select(Submission)
        .where(Submission.lead_id == lead_id)
        .where(Submission.is_processed == False)
    )
    pending = result.scalar_one_or_none()

    if pending:
        return AnalysisStatus(
            has_analysis=False,
            analysis_id=None,
            status="processing",
            created_at=None
        )

    return AnalysisStatus(
        has_analysis=False,
        analysis_id=None,
        status="pending",
        created_at=None
    )
