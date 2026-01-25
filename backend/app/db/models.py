"""
SQLAlchemy database models for the lead generation platform.
"""

import enum
from datetime import datetime
from typing import Optional, List
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Enum, ForeignKey,
    Boolean, Float, JSON
)
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class LeadTier(str, enum.Enum):
    """Lead quality tiers based on scoring."""
    HOT = "hot"           # Score 80-100: High budget, ready to go
    WARM = "warm"         # Score 50-79: Good potential
    COLD = "cold"         # Score 25-49: Needs nurturing
    UNQUALIFIED = "unqualified"  # Score 0-24: Not a fit


class LeadStatus(str, enum.Enum):
    """Lead pipeline status."""
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL_SENT = "proposal_sent"
    NEGOTIATING = "negotiating"
    CONVERTED = "converted"
    LOST = "lost"


class ProjectType(str, enum.Enum):
    """Type of film/TV project."""
    FEATURE_FILM = "feature_film"
    TV_SERIES = "tv_series"
    TV_PILOT = "tv_pilot"
    DOCUMENTARY = "documentary"
    SHORT_FILM = "short_film"
    WEB_SERIES = "web_series"
    OTHER = "other"


class DevelopmentStage(str, enum.Enum):
    """Current stage of the project."""
    IDEA_ONLY = "idea_only"
    TREATMENT = "treatment"
    SCRIPT_IN_PROGRESS = "script_in_progress"
    SCRIPT_COMPLETE = "script_complete"
    PACKAGE_READY = "package_ready"
    FINANCING = "financing"
    PRE_PRODUCTION = "pre_production"


class BudgetRange(str, enum.Enum):
    """Budget range for the project."""
    MICRO = "under_100k"         # Under $100K
    LOW = "100k_500k"            # $100K - $500K
    MID = "500k_2m"              # $500K - $2M
    HIGH = "2m_10m"              # $2M - $10M
    STUDIO = "10m_plus"          # $10M+
    UNDETERMINED = "undetermined"


class Timeline(str, enum.Enum):
    """How soon they need services."""
    IMMEDIATE = "immediate"       # Ready now
    ONE_TO_THREE_MONTHS = "1_3_months"
    THREE_TO_SIX_MONTHS = "3_6_months"
    SIX_PLUS_MONTHS = "6_plus_months"
    JUST_EXPLORING = "just_exploring"


class Lead(Base):
    """
    Main lead entity capturing contact info and qualification data.
    """
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # Contact Information
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    company: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    # Lead Scoring
    score: Mapped[int] = mapped_column(Integer, default=0)
    tier: Mapped[LeadTier] = mapped_column(Enum(LeadTier), default=LeadTier.UNQUALIFIED)
    status: Mapped[LeadStatus] = mapped_column(Enum(LeadStatus), default=LeadStatus.NEW)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_contacted_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    # Source tracking
    utm_source: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    referrer: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # Relationships
    questionnaire_response: Mapped[Optional["QuestionnaireResponse"]] = relationship(
        back_populates="lead", uselist=False
    )
    submissions: Mapped[List["Submission"]] = relationship(back_populates="lead")
    analysis_results: Mapped[List["AnalysisResult"]] = relationship(back_populates="lead")


class QuestionnaireResponse(Base):
    """
    Stores responses to the lead qualification questionnaire.
    """
    __tablename__ = "questionnaire_responses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), unique=True)

    # Project Details
    project_type: Mapped[ProjectType] = mapped_column(Enum(ProjectType))
    project_title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    project_logline: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    genre: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Development Stage
    development_stage: Mapped[DevelopmentStage] = mapped_column(Enum(DevelopmentStage))
    has_material: Mapped[bool] = mapped_column(Boolean, default=False)
    material_types: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # {"script": true, "treatment": true, etc.}

    # Financial Assessment
    budget_range: Mapped[BudgetRange] = mapped_column(Enum(BudgetRange))
    has_financing: Mapped[bool] = mapped_column(Boolean, default=False)
    financing_percentage: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # 0-100

    # Timeline & Needs
    timeline: Mapped[Timeline] = mapped_column(Enum(Timeline))
    services_needed: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # {"script_coverage": true, "packaging": true, etc.}

    # Experience
    previous_credits: Mapped[bool] = mapped_column(Boolean, default=False)
    credits_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Additional Info
    how_did_you_hear: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    additional_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Timestamps
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationship
    lead: Mapped["Lead"] = relationship(back_populates="questionnaire_response")


class Submission(Base):
    """
    Tracks uploaded materials (scripts, treatments, pitch decks, etc.)
    """
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), index=True)

    # File Information
    original_filename: Mapped[str] = mapped_column(String(255))
    stored_filename: Mapped[str] = mapped_column(String(255))  # UUID-based name
    file_path: Mapped[str] = mapped_column(String(500))
    file_size_bytes: Mapped[int] = mapped_column(Integer)
    mime_type: Mapped[str] = mapped_column(String(100))

    # Submission Type
    submission_type: Mapped[str] = mapped_column(String(50))  # "script", "treatment", "pitch_deck", "idea"

    # For idea-only submissions (no file)
    idea_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Status
    is_processed: Mapped[bool] = mapped_column(Boolean, default=False)
    processing_error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Timestamps
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    processed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    # Relationship
    lead: Mapped["Lead"] = relationship(back_populates="submissions")


class AnalysisResult(Base):
    """
    Stores results from the external analysis software.
    """
    __tablename__ = "analysis_results"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), index=True)
    submission_id: Mapped[Optional[int]] = mapped_column(ForeignKey("submissions.id"), nullable=True)

    # Analysis Data
    analysis_type: Mapped[str] = mapped_column(String(50))  # "high_level", "detailed", etc.
    raw_response: Mapped[dict] = mapped_column(JSON)  # Full response from analysis software

    # Extracted highlights for quick access
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    strengths: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    weaknesses: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    market_potential: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    # Status
    is_sent_to_lead: Mapped[bool] = mapped_column(Boolean, default=False)
    sent_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationship
    lead: Mapped["Lead"] = relationship(back_populates="analysis_results")
