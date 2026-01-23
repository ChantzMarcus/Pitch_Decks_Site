import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email configuration
const FROM_EMAIL = process.env.REPLY_TO_EMAIL || 'hello@filmdecks.biz';
const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'hello@filmdecks.biz';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface NewLeadNotificationParams {
  name: string;
  email: string;
  format: string;
  logline: string;
  budget: string;
  timeline: string;
  leadScore: number;
}

interface AnalysisReportParams {
  to: string;
  name: string;
  logline: string;
  analysis: {
    overallScore: number;
    breakdown: {
      originality: number;
      emotionalImpact: number;
      commercialPotential: number;
      formatReadiness: number;
      clarityOfVision: number;
    };
    detailedAnalysis: string;
    recommendations: string[];
  };
}

/**
 * Send notification to admin team about new qualified lead
 */
export async function sendNewLeadNotification(params: NewLeadNotificationParams) {
  if (!resend) {
    console.log('Resend not configured, skipping email notification');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { name, email, format, logline, budget, timeline, leadScore } = params;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New ${leadScore >= 75 ? 'HOT' : ''} Lead: ${name} (${budget})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Lead Submission</h2>

          <div style="background: ${leadScore >= 75 ? '#d4edda' : '#f8f9fa'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Lead Score:</strong> ${leadScore}/100</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Timing:</strong> ${timeline}</p>
            <p><strong>Format:</strong> ${format}</p>
          </div>

          <h3 style="color: #555;">Contact Info</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>

          <h3 style="color: #555;">Story Concept</h3>
          <p style="font-style: italic; color: #666;">"${logline}"</p>

          <p style="margin-top: 30px;">
            <a href="${BASE_URL}/admin/leads" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send lead notification:', error);
    return { success: false, error };
  }
}

/**
 * Send story analysis report to the user
 */
export async function sendAnalysisReport(params: AnalysisReportParams) {
  if (!resend) {
    console.log('Resend not configured, skipping analysis report');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { to, name, logline, analysis } = params;
    const { overallScore, breakdown, detailedAnalysis, recommendations } = analysis;

    // Get score category
    const scoreCategory = overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Strong' : overallScore >= 40 ? 'Developing' : 'Exploring';
    const scoreColor = overallScore >= 80 ? '#10B981' : overallScore >= 60 ? '#3B82F6' : overallScore >= 40 ? '#F59E0B' : '#6B7280';

    await resend.emails.send({
      from: FROM_EMAIL,
      to: to,
      subject: `Your Story Analysis: ${scoreCategory} (${overallScore}/100)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333;">Your Story Analysis</h1>
            <p style="color: #666;">Thanks for sharing your story with us, ${name}!</p>
          </div>

          <!-- Overall Score -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; background: ${scoreColor}; color: white; padding: 20px 40px; border-radius: 12px;">
              <div style="font-size: 48px; font-weight: bold;">${overallScore}</div>
              <div style="font-size: 14px; opacity: 0.9;">out of 100</div>
              <div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">${scoreCategory}</div>
            </div>
          </div>

          <!-- Story -->
          <div style="background: #F9FAFB; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-style: italic; color: #666;">"${logline}"</p>
          </div>

          <!-- Score Breakdown -->
          <h3 style="color: #555;">Score Breakdown</h3>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">Originality</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">
                <strong>${breakdown.originality}/10</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">Emotional Impact</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">
                <strong>${breakdown.emotionalImpact}/10</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">Commercial Potential</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">
                <strong>${breakdown.commercialPotential}/10</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">Format Readiness</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; text-align: right;">
                <strong>${breakdown.formatReadiness}/10</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Clarity of Vision</td>
              <td style="padding: 8px 0; text-align: right;">
                <strong>${breakdown.clarityOfVision}/10</strong>
              </td>
            </tr>
          </table>

          <!-- Analysis -->
          <h3 style="color: #555;">Analysis</h3>
          <p style="color: #666; line-height: 1.6;">${detailedAnalysis}</p>

          <!-- Recommendations -->
          <h3 style="color: #555;">Recommendations</h3>
          <ul style="color: #666; line-height: 1.6;">
            ${recommendations.map((rec, i) => `<li key="${i}" style="margin-bottom: 8px;">${rec}</li>`).join('')}
          </ul>

          <!-- CTA -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="color: #666; margin-bottom: 15px;">Want to dive deeper into your story's potential?</p>
            <a href="${BASE_URL}/questionnaire" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Schedule a Consultation
            </a>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            This analysis was generated by AI. For personalized feedback, consider scheduling a consultation with our team.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send analysis report:', error);
    return { success: false, error };
  }
}
