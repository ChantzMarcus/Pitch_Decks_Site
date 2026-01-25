"""
Lead Scoring Engine

Calculates lead quality scores based on questionnaire responses.
Scores range from 0-100 and determine lead tier (Hot, Warm, Cold, Unqualified).
"""

from dataclasses import dataclass
from typing import Optional

from app.db.models import (
    QuestionnaireResponse, LeadTier, BudgetRange, Timeline,
    DevelopmentStage, ProjectType
)
from app.core.config import settings


@dataclass
class LeadScoreResult:
    """Result of lead scoring calculation."""
    total_score: int
    tier: LeadTier
    breakdown: dict


class LeadScoringEngine:
    """
    Scores leads based on their questionnaire responses.

    Scoring factors:
    - Budget/Financial capacity (30 points max)
    - Timeline urgency (20 points max)
    - Material readiness (25 points max)
    - Project type fit (15 points max)
    - Experience level (10 points max)
    """

    # Budget scoring (max 30 points)
    BUDGET_SCORES = {
        BudgetRange.STUDIO: 30,      # $10M+ = most valuable
        BudgetRange.HIGH: 25,        # $2M-$10M
        BudgetRange.MID: 20,         # $500K-$2M
        BudgetRange.LOW: 12,         # $100K-$500K
        BudgetRange.MICRO: 5,        # Under $100K
        BudgetRange.UNDETERMINED: 3, # Unknown = low score
    }

    # Timeline scoring (max 20 points)
    TIMELINE_SCORES = {
        Timeline.IMMEDIATE: 20,
        Timeline.ONE_TO_THREE_MONTHS: 15,
        Timeline.THREE_TO_SIX_MONTHS: 10,
        Timeline.SIX_PLUS_MONTHS: 5,
        Timeline.JUST_EXPLORING: 2,
    }

    # Development stage scoring (max 25 points for material readiness)
    STAGE_SCORES = {
        DevelopmentStage.PACKAGE_READY: 25,
        DevelopmentStage.FINANCING: 22,
        DevelopmentStage.SCRIPT_COMPLETE: 20,
        DevelopmentStage.PRE_PRODUCTION: 18,
        DevelopmentStage.SCRIPT_IN_PROGRESS: 12,
        DevelopmentStage.TREATMENT: 8,
        DevelopmentStage.IDEA_ONLY: 3,
    }

    # Project type scoring (max 15 points)
    PROJECT_TYPE_SCORES = {
        ProjectType.FEATURE_FILM: 15,
        ProjectType.TV_SERIES: 14,
        ProjectType.TV_PILOT: 12,
        ProjectType.DOCUMENTARY: 10,
        ProjectType.WEB_SERIES: 6,
        ProjectType.SHORT_FILM: 5,
        ProjectType.OTHER: 8,
    }

    # Tier thresholds
    TIER_THRESHOLDS = {
        LeadTier.HOT: 70,
        LeadTier.WARM: 45,
        LeadTier.COLD: 20,
    }

    def calculate_score(self, response: QuestionnaireResponse) -> LeadScoreResult:
        """
        Calculate the total lead score based on questionnaire responses.

        Args:
            response: The questionnaire response to score

        Returns:
            LeadScoreResult with total score, tier, and breakdown
        """
        breakdown = {}

        # Budget score
        budget_score = self.BUDGET_SCORES.get(response.budget_range, 0)
        # Bonus if they have financing
        if response.has_financing:
            financing_bonus = min(5, (response.financing_percentage or 0) // 20)
            budget_score = min(30, budget_score + financing_bonus)
        breakdown["budget"] = budget_score

        # Timeline score
        timeline_score = self.TIMELINE_SCORES.get(response.timeline, 0)
        breakdown["timeline"] = timeline_score

        # Material readiness score
        material_score = self.STAGE_SCORES.get(response.development_stage, 0)
        # Bonus if they have actual material to submit
        if response.has_material:
            material_score = min(25, material_score + 3)
        breakdown["material_readiness"] = material_score

        # Project type score
        project_score = self.PROJECT_TYPE_SCORES.get(response.project_type, 0)
        breakdown["project_type"] = project_score

        # Experience score (max 10 points)
        experience_score = 10 if response.previous_credits else 3
        breakdown["experience"] = experience_score

        # Calculate total
        total_score = sum(breakdown.values())
        total_score = min(100, total_score)  # Cap at 100

        # Determine tier
        tier = self._determine_tier(total_score)

        return LeadScoreResult(
            total_score=total_score,
            tier=tier,
            breakdown=breakdown
        )

    def _determine_tier(self, score: int) -> LeadTier:
        """Determine lead tier based on total score."""
        if score >= self.TIER_THRESHOLDS[LeadTier.HOT]:
            return LeadTier.HOT
        elif score >= self.TIER_THRESHOLDS[LeadTier.WARM]:
            return LeadTier.WARM
        elif score >= self.TIER_THRESHOLDS[LeadTier.COLD]:
            return LeadTier.COLD
        else:
            return LeadTier.UNQUALIFIED

    def get_scoring_criteria(self) -> dict:
        """
        Return the scoring criteria for transparency/debugging.
        Useful for admin dashboard or API documentation.
        """
        return {
            "max_score": 100,
            "categories": {
                "budget": {
                    "max_points": 30,
                    "description": "Financial capacity based on budget range and existing financing"
                },
                "timeline": {
                    "max_points": 20,
                    "description": "How soon they need services"
                },
                "material_readiness": {
                    "max_points": 25,
                    "description": "Development stage and whether they have materials"
                },
                "project_type": {
                    "max_points": 15,
                    "description": "Type of project (feature, TV, etc.)"
                },
                "experience": {
                    "max_points": 10,
                    "description": "Previous credits and industry experience"
                }
            },
            "tiers": {
                LeadTier.HOT.value: f"Score {self.TIER_THRESHOLDS[LeadTier.HOT]}+",
                LeadTier.WARM.value: f"Score {self.TIER_THRESHOLDS[LeadTier.WARM]}-{self.TIER_THRESHOLDS[LeadTier.HOT]-1}",
                LeadTier.COLD.value: f"Score {self.TIER_THRESHOLDS[LeadTier.COLD]}-{self.TIER_THRESHOLDS[LeadTier.WARM]-1}",
                LeadTier.UNQUALIFIED.value: f"Score below {self.TIER_THRESHOLDS[LeadTier.COLD]}",
            }
        }


# Singleton instance
lead_scoring_engine = LeadScoringEngine()
