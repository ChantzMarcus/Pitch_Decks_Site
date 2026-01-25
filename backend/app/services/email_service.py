"""
Email Service

Sends emails to leads with their analysis results
and follow-up communications.
"""

from typing import Optional, List
from dataclasses import dataclass
from pathlib import Path

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr

from app.core.config import settings
from app.db.models import Lead, AnalysisResult


@dataclass
class EmailResult:
    """Result of email send operation."""
    success: bool
    message_id: Optional[str] = None
    error: Optional[str] = None


class EmailService:
    """
    Handles sending emails to leads.
    """

    def __init__(self):
        self.config = ConnectionConfig(
            MAIL_USERNAME=settings.MAIL_USERNAME,
            MAIL_PASSWORD=settings.MAIL_PASSWORD,
            MAIL_FROM=settings.MAIL_FROM,
            MAIL_PORT=settings.MAIL_PORT,
            MAIL_SERVER=settings.MAIL_SERVER,
            MAIL_STARTTLS=settings.MAIL_STARTTLS,
            MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True,
        )
        self.mailer = FastMail(self.config)

    async def send_analysis_results(
        self,
        lead: Lead,
        analysis: AnalysisResult
    ) -> EmailResult:
        """
        Send analysis results to a lead.

        Args:
            lead: The lead to email
            analysis: The analysis results to send

        Returns:
            EmailResult indicating success/failure
        """
        try:
            subject = f"Your Project Analysis is Ready - {lead.first_name}"

            # Build email body
            body = self._build_analysis_email(lead, analysis)

            message = MessageSchema(
                subject=subject,
                recipients=[lead.email],
                body=body,
                subtype=MessageType.html
            )

            await self.mailer.send_message(message)

            return EmailResult(success=True)

        except Exception as e:
            return EmailResult(success=False, error=str(e))

    async def send_welcome_email(self, lead: Lead) -> EmailResult:
        """
        Send welcome email after questionnaire submission.

        Args:
            lead: The new lead

        Returns:
            EmailResult indicating success/failure
        """
        try:
            subject = f"Welcome {lead.first_name} - We've Received Your Submission"

            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Thank You for Your Submission!</h2>

                <p>Hi {lead.first_name},</p>

                <p>We've received your project information and our team is reviewing it.</p>

                <p>Here's what happens next:</p>
                <ol>
                    <li>Our analysis software will review your submission</li>
                    <li>You'll receive a high-level analysis within 24-48 hours</li>
                    <li>A team member may reach out for additional details</li>
                </ol>

                <p>In the meantime, if you have any questions, feel free to reply to this email.</p>

                <p>Best regards,<br>
                The Team</p>
            </body>
            </html>
            """

            message = MessageSchema(
                subject=subject,
                recipients=[lead.email],
                body=body,
                subtype=MessageType.html
            )

            await self.mailer.send_message(message)

            return EmailResult(success=True)

        except Exception as e:
            return EmailResult(success=False, error=str(e))

    def _build_analysis_email(self, lead: Lead, analysis: AnalysisResult) -> str:
        """Build the HTML email body for analysis results."""

        strengths_html = ""
        if analysis.strengths:
            strengths_items = "".join(f"<li>{s}</li>" for s in analysis.strengths)
            strengths_html = f"""
            <h3 style="color: #28a745;">Strengths</h3>
            <ul>{strengths_items}</ul>
            """

        weaknesses_html = ""
        if analysis.weaknesses:
            weaknesses_items = "".join(f"<li>{w}</li>" for w in analysis.weaknesses)
            weaknesses_html = f"""
            <h3 style="color: #dc3545;">Areas for Improvement</h3>
            <ul>{weaknesses_items}</ul>
            """

        market_html = ""
        if analysis.market_potential:
            market_html = f"""
            <h3>Market Potential</h3>
            <p><strong>{analysis.market_potential.title()}</strong></p>
            """

        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Your Project Analysis</h2>

            <p>Hi {lead.first_name},</p>

            <p>Great news! We've completed the initial analysis of your project.
            Here's what we found:</p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Summary</h3>
                <p>{analysis.summary or "Analysis complete. See details below."}</p>

                {strengths_html}

                {weaknesses_html}

                {market_html}
            </div>

            <h3>What's Next?</h3>
            <p>This is a high-level analysis. For a comprehensive deep-dive including:</p>
            <ul>
                <li>Detailed script coverage</li>
                <li>Market positioning strategy</li>
                <li>Packaging recommendations</li>
                <li>Distribution pathway analysis</li>
            </ul>
            <p>We'd love to schedule a call to discuss your project further.</p>

            <p><a href="#" style="background: #007bff; color: white; padding: 10px 20px;
               text-decoration: none; border-radius: 5px;">Schedule a Consultation</a></p>

            <p>Best regards,<br>
            The Team</p>
        </body>
        </html>
        """

    async def send_custom_email(
        self,
        to_email: str,
        subject: str,
        body: str,
        is_html: bool = True
    ) -> EmailResult:
        """
        Send a custom email.

        Args:
            to_email: Recipient email
            subject: Email subject
            body: Email body
            is_html: Whether body is HTML

        Returns:
            EmailResult indicating success/failure
        """
        try:
            message = MessageSchema(
                subject=subject,
                recipients=[to_email],
                body=body,
                subtype=MessageType.html if is_html else MessageType.plain
            )

            await self.mailer.send_message(message)

            return EmailResult(success=True)

        except Exception as e:
            return EmailResult(success=False, error=str(e))


# Singleton instance
email_service = EmailService()
