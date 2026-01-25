"""
Health check endpoints.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.db.session import get_db
from app.services.analysis_integration import analysis_integration

router = APIRouter()


@router.get("/health")
async def health_check():
    """Basic health check."""
    return {"status": "healthy"}


@router.get("/health/detailed")
async def detailed_health_check(db: AsyncSession = Depends(get_db)):
    """Detailed health check including dependencies."""
    health_status = {
        "api": "healthy",
        "database": "unknown",
        "analysis_software": "unknown"
    }

    # Check database
    try:
        await db.execute(text("SELECT 1"))
        health_status["database"] = "healthy"
    except Exception as e:
        health_status["database"] = f"unhealthy: {str(e)}"

    # Check analysis software
    try:
        is_healthy = await analysis_integration.check_health()
        health_status["analysis_software"] = "healthy" if is_healthy else "unhealthy"
    except Exception as e:
        health_status["analysis_software"] = f"unhealthy: {str(e)}"

    overall = all(v == "healthy" for v in health_status.values())

    return {
        "status": "healthy" if overall else "degraded",
        "components": health_status
    }
