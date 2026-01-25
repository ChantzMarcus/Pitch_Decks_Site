"""
Pydantic schemas for Analysis-related requests and responses.
"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel


class AnalysisResultResponse(BaseModel):
    """Schema for analysis result response."""
    id: int
    lead_id: int
    submission_id: Optional[int]
    analysis_type: str
    summary: Optional[str]
    strengths: Optional[List[str]]
    weaknesses: Optional[List[str]]
    market_potential: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class AnalysisRequest(BaseModel):
    """Schema for requesting analysis."""
    lead_id: int
    submission_id: Optional[int] = None


class AnalysisStatus(BaseModel):
    """Schema for analysis status check."""
    has_analysis: bool
    analysis_id: Optional[int]
    status: str  # "pending", "processing", "complete", "failed"
    created_at: Optional[datetime]
