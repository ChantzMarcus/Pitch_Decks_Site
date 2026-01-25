"""
Pitch Decks Site - Main FastAPI Application

Lead generation platform for film/TV development clients.
Captures leads through questionnaire, scores them, and integrates
with external analysis software.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import leads, questionnaire, submissions, analysis, health
from app.core.config import settings
from app.db.session import engine
from app.db import models


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    yield
    # Shutdown: Close connections
    await engine.dispose()


app = FastAPI(
    title="Pitch Decks Site API",
    description="Lead generation platform for film/TV development clients",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(leads.router, prefix="/api/leads", tags=["Leads"])
app.include_router(questionnaire.router, prefix="/api/questionnaire", tags=["Questionnaire"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["Submissions"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])


@app.get("/")
async def root():
    return {
        "message": "Pitch Decks Site API",
        "docs": "/docs",
        "health": "/health",
    }
