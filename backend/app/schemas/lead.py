"""
Pydantic schemas for Lead-related requests and responses.
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

from app.db.models import LeadTier, LeadStatus


class LeadCreate(BaseModel):
    """Schema for creating a new lead (basic info)."""
    email: EmailStr
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=255)

    # UTM tracking (optional)
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None


class LeadResponse(BaseModel):
    """Schema for lead response."""
    id: int
    email: str
    first_name: str
    last_name: str
    phone: Optional[str]
    company: Optional[str]
    score: int
    tier: LeadTier
    status: LeadStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class LeadListResponse(BaseModel):
    """Schema for paginated lead list."""
    leads: List[LeadResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class LeadUpdateStatus(BaseModel):
    """Schema for updating lead status."""
    status: LeadStatus


class LeadScoreBreakdown(BaseModel):
    """Schema for lead score details."""
    total_score: int
    tier: LeadTier
    breakdown: dict
