"""
Pydantic schemas for Questionnaire-related requests and responses.
"""

from datetime import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel, EmailStr, Field

from app.db.models import (
    ProjectType, DevelopmentStage, BudgetRange, Timeline
)


class QuestionnaireSubmission(BaseModel):
    """
    Complete questionnaire submission from lead.
    This is the main form submission from the frontend.
    """
    # Contact Information
    email: EmailStr
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=255)

    # Project Details
    project_type: ProjectType
    project_title: Optional[str] = Field(None, max_length=255)
    project_logline: Optional[str] = Field(None, max_length=500)
    genre: Optional[str] = Field(None, max_length=100)

    # Development Stage
    development_stage: DevelopmentStage
    has_material: bool = False
    material_types: Optional[Dict[str, bool]] = None  # {"script": true, "treatment": true}

    # Financial Assessment
    budget_range: BudgetRange
    has_financing: bool = False
    financing_percentage: Optional[int] = Field(None, ge=0, le=100)

    # Timeline & Needs
    timeline: Timeline
    services_needed: Optional[Dict[str, bool]] = None  # {"script_coverage": true, "packaging": true}

    # Experience
    previous_credits: bool = False
    credits_description: Optional[str] = None

    # Additional Info
    how_did_you_hear: Optional[str] = None
    additional_notes: Optional[str] = None

    # UTM tracking
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None


class QuestionnaireResponse(BaseModel):
    """Response after questionnaire submission."""
    lead_id: int
    score: int
    tier: str
    message: str
    next_step: str


class QuestionnaireOptions(BaseModel):
    """Available options for questionnaire dropdowns."""
    project_types: List[Dict[str, str]]
    development_stages: List[Dict[str, str]]
    budget_ranges: List[Dict[str, str]]
    timelines: List[Dict[str, str]]
    services: List[Dict[str, str]]
