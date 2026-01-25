"""
External Analysis Software Integration

Handles communication with your existing analysis software
that provides high-level analysis of submitted materials.
"""

import httpx
from typing import Optional, Dict, Any
from dataclasses import dataclass
from datetime import datetime

from app.core.config import settings


@dataclass
class AnalysisRequest:
    """Request to send to analysis software."""
    lead_id: int
    submission_id: Optional[int]
    submission_type: str  # "script", "treatment", "pitch_deck", "idea"
    content: Optional[bytes]  # File content for material submissions
    idea_description: Optional[str]  # For idea-only submissions
    project_type: str
    genre: Optional[str]
    logline: Optional[str]


@dataclass
class AnalysisResponse:
    """Response from analysis software."""
    success: bool
    analysis_type: str
    raw_response: Dict[str, Any]
    summary: Optional[str] = None
    strengths: Optional[list] = None
    weaknesses: Optional[list] = None
    market_potential: Optional[str] = None
    error: Optional[str] = None


class AnalysisIntegration:
    """
    Integration layer for external analysis software.

    This class handles:
    - Sending submissions to your analysis software
    - Parsing responses
    - Error handling and retries
    """

    def __init__(self):
        self.base_url = settings.ANALYSIS_SOFTWARE_URL
        self.api_key = settings.ANALYSIS_SOFTWARE_API_KEY
        self.timeout = settings.ANALYSIS_TIMEOUT_SECONDS

    async def request_analysis(self, request: AnalysisRequest) -> AnalysisResponse:
        """
        Send a submission to the analysis software and get results.

        Args:
            request: The analysis request containing submission data

        Returns:
            AnalysisResponse with the analysis results
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                # Prepare the request payload
                payload = self._build_payload(request)

                # Send to analysis software
                response = await client.post(
                    self.base_url,
                    json=payload,
                    headers=self._get_headers()
                )

                response.raise_for_status()
                data = response.json()

                # Parse the response
                return self._parse_response(data)

        except httpx.TimeoutException:
            return AnalysisResponse(
                success=False,
                analysis_type="high_level",
                raw_response={},
                error="Analysis software timed out. Please try again."
            )
        except httpx.HTTPStatusError as e:
            return AnalysisResponse(
                success=False,
                analysis_type="high_level",
                raw_response={},
                error=f"Analysis software returned error: {e.response.status_code}"
            )
        except Exception as e:
            return AnalysisResponse(
                success=False,
                analysis_type="high_level",
                raw_response={},
                error=f"Failed to get analysis: {str(e)}"
            )

    def _get_headers(self) -> Dict[str, str]:
        """Build request headers."""
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
        return headers

    def _build_payload(self, request: AnalysisRequest) -> Dict[str, Any]:
        """
        Build the payload for the analysis software.

        NOTE: Adjust this method to match your analysis software's API format.
        """
        payload = {
            "lead_id": request.lead_id,
            "submission_id": request.submission_id,
            "submission_type": request.submission_type,
            "project_type": request.project_type,
            "genre": request.genre,
            "logline": request.logline,
            "analysis_level": "high_level",  # Free tier
            "timestamp": datetime.utcnow().isoformat(),
        }

        # For idea submissions, include the description
        if request.idea_description:
            payload["idea_description"] = request.idea_description

        # For file submissions, you may need to:
        # 1. Send the file as base64
        # 2. Send a URL to the file
        # 3. Send the file separately via multipart form
        # Adjust based on your analysis software's requirements
        if request.content:
            import base64
            payload["file_content_base64"] = base64.b64encode(request.content).decode()

        return payload

    def _parse_response(self, data: Dict[str, Any]) -> AnalysisResponse:
        """
        Parse the response from analysis software.

        NOTE: Adjust this method to match your analysis software's response format.
        """
        # Example expected response structure:
        # {
        #     "success": true,
        #     "analysis": {
        #         "summary": "A compelling thriller with strong market potential...",
        #         "strengths": ["Unique premise", "Strong protagonist"],
        #         "weaknesses": ["Pacing in act 2", "Underdeveloped antagonist"],
        #         "market_potential": "high",
        #         "recommendations": [...]
        #     }
        # }

        if data.get("success", False):
            analysis = data.get("analysis", {})
            return AnalysisResponse(
                success=True,
                analysis_type="high_level",
                raw_response=data,
                summary=analysis.get("summary"),
                strengths=analysis.get("strengths"),
                weaknesses=analysis.get("weaknesses"),
                market_potential=analysis.get("market_potential"),
            )
        else:
            return AnalysisResponse(
                success=False,
                analysis_type="high_level",
                raw_response=data,
                error=data.get("error", "Unknown error from analysis software")
            )

    async def check_health(self) -> bool:
        """Check if the analysis software is available."""
        try:
            async with httpx.AsyncClient(timeout=5) as client:
                # Adjust endpoint based on your analysis software
                response = await client.get(
                    self.base_url.replace("/analyze", "/health"),
                    headers=self._get_headers()
                )
                return response.status_code == 200
        except Exception:
            return False


# Singleton instance
analysis_integration = AnalysisIntegration()
