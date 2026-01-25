"""
Pydantic schemas for Submission-related requests and responses.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class IdeaSubmission(BaseModel):
    """Schema for submitting just an idea (no file)."""
    lead_id: int
    idea_description: str = Field(..., min_length=50, max_length=5000)


class SubmissionResponse(BaseModel):
    """Response after file/idea submission."""
    id: int
    lead_id: int
    submission_type: str
    original_filename: Optional[str]
    file_size_bytes: Optional[int]
    is_processed: bool
    uploaded_at: datetime
    message: str

    class Config:
        from_attributes = True


class SubmissionStatus(BaseModel):
    """Schema for checking submission status."""
    id: int
    is_processed: bool
    processing_error: Optional[str]
    has_analysis: bool
    uploaded_at: datetime
    processed_at: Optional[datetime]
