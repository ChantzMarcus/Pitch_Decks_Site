"""
Submission API endpoints.

Handles file uploads and idea submissions from leads.
"""

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.db.models import Lead, Submission
from app.schemas.submission import IdeaSubmission, SubmissionResponse, SubmissionStatus
from app.services.file_handler import file_handler

router = APIRouter()


@router.post("/upload", response_model=SubmissionResponse)
async def upload_material(
    lead_id: int = Form(...),
    submission_type: str = Form(...),  # "script", "treatment", "pitch_deck"
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    Upload material (script, treatment, pitch deck, etc.)

    Args:
        lead_id: ID of the lead
        submission_type: Type of material being submitted
        file: The file to upload
    """
    # Verify lead exists
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Validate submission type
    valid_types = ["script", "treatment", "pitch_deck", "other"]
    if submission_type not in valid_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid submission type. Must be one of: {valid_types}"
        )

    # Upload file
    upload_result = await file_handler.upload_file(file, lead_id, submission_type)

    if not upload_result.success:
        raise HTTPException(status_code=500, detail=upload_result.error)

    # Create submission record
    submission = Submission(
        lead_id=lead_id,
        original_filename=file.filename,
        stored_filename=upload_result.stored_filename,
        file_path=upload_result.file_path,
        file_size_bytes=upload_result.file_size_bytes,
        mime_type=upload_result.mime_type,
        submission_type=submission_type,
        is_processed=False,
    )
    db.add(submission)
    await db.commit()
    await db.refresh(submission)

    return SubmissionResponse(
        id=submission.id,
        lead_id=submission.lead_id,
        submission_type=submission.submission_type,
        original_filename=submission.original_filename,
        file_size_bytes=submission.file_size_bytes,
        is_processed=submission.is_processed,
        uploaded_at=submission.uploaded_at,
        message="File uploaded successfully. Your analysis will be ready soon."
    )


@router.post("/idea", response_model=SubmissionResponse)
async def submit_idea(
    idea: IdeaSubmission,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit an idea description (no file upload).

    For leads who don't have material ready yet.
    """
    # Verify lead exists
    result = await db.execute(select(Lead).where(Lead.id == idea.lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Create submission record for idea
    submission = Submission(
        lead_id=idea.lead_id,
        original_filename="",
        stored_filename="",
        file_path="",
        file_size_bytes=0,
        mime_type="text/plain",
        submission_type="idea",
        idea_description=idea.idea_description,
        is_processed=False,
    )
    db.add(submission)
    await db.commit()
    await db.refresh(submission)

    return SubmissionResponse(
        id=submission.id,
        lead_id=submission.lead_id,
        submission_type=submission.submission_type,
        original_filename=None,
        file_size_bytes=None,
        is_processed=submission.is_processed,
        uploaded_at=submission.uploaded_at,
        message="Idea submitted successfully. Your analysis will be ready soon."
    )


@router.get("/{submission_id}/status", response_model=SubmissionStatus)
async def get_submission_status(
    submission_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Check the status of a submission.
    """
    result = await db.execute(
        select(Submission).where(Submission.id == submission_id)
    )
    submission = result.scalar_one_or_none()

    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    # Check if there's an analysis result
    has_analysis = len(submission.lead.analysis_results) > 0 if submission.lead else False

    return SubmissionStatus(
        id=submission.id,
        is_processed=submission.is_processed,
        processing_error=submission.processing_error,
        has_analysis=has_analysis,
        uploaded_at=submission.uploaded_at,
        processed_at=submission.processed_at
    )


@router.get("/lead/{lead_id}")
async def get_lead_submissions(
    lead_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all submissions for a lead.
    """
    result = await db.execute(
        select(Submission).where(Submission.lead_id == lead_id)
    )
    submissions = result.scalars().all()

    return [
        {
            "id": s.id,
            "submission_type": s.submission_type,
            "original_filename": s.original_filename,
            "file_size_bytes": s.file_size_bytes,
            "is_processed": s.is_processed,
            "uploaded_at": s.uploaded_at,
        }
        for s in submissions
    ]
