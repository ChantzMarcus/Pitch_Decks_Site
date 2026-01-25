"""
Application configuration loaded from environment variables.
"""

from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Pitch Decks Site"
    DEBUG: bool = False
    SECRET_KEY: str = "change-this-in-production"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/pitch_decks"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # File Storage
    STORAGE_TYPE: str = "local"  # "local" or "s3"
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_MB: int = 50
    ALLOWED_FILE_TYPES: List[str] = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",  # pptx
        "application/vnd.ms-powerpoint",  # ppt
        "text/plain",  # txt (for scripts)
        "application/msword",  # doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # docx
    ]

    # S3 Configuration (if STORAGE_TYPE is "s3")
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    S3_BUCKET: str = ""

    # External Analysis Software Integration
    ANALYSIS_SOFTWARE_URL: str = "http://localhost:8001/analyze"
    ANALYSIS_SOFTWARE_API_KEY: str = ""
    ANALYSIS_TIMEOUT_SECONDS: int = 120

    # Email Configuration
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "noreply@pitchdecks.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False

    # Redis (for Celery background tasks)
    REDIS_URL: str = "redis://localhost:6379/0"

    # Lead Scoring Weights
    SCORE_WEIGHT_BUDGET: int = 30
    SCORE_WEIGHT_TIMELINE: int = 20
    SCORE_WEIGHT_MATERIAL: int = 25
    SCORE_WEIGHT_PROJECT_TYPE: int = 15
    SCORE_WEIGHT_EXPERIENCE: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
