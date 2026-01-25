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
 * Get tier info based on score - matches EvaluationResult component
 */
function getTierInfo(score: number): { tier: string; color: string; bgColor: string } {
  if (score >= 80) return { tier: 'Exceptional Potential', color: '#059669', bgColor: '#D1FAE5' };
  if (score >= 65) return { tier: 'High Potential', color: '#2563EB', bgColor: '#DBEAFE' };
  if (score >= 50) return { tier: 'Promising', color: '#D97706', bgColor: '#FEF3C7' };
  return { tier: 'Under Review', color: '#475569', bgColor: '#F1F5F9' };
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
    const { tier, color, bgColor } = getTierInfo(overallScore);
    const firstName = name.split(' ')[0];

    await resend.emails.send({
      from: FROM_EMAIL,
      to: to,
      subject: `${firstName}, your story shows ${tier}! (${overallScore}/100)`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px;">Your Story Analysis</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">848 Washington Media</p>
          </div>

          <div style="padding: 40px 30px;">
            <!-- Greeting -->
            <p style="color: #333; font-size: 18px; margin-bottom: 30px;">
              Hi ${firstName},<br><br>
              Thank you for sharing your story with us. Our proprietary analysis system has evaluated your concept, and we're excited to share the results.
            </p>

            <!-- Score Card -->
            <div style="background: ${bgColor}; border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <div style="font-size: 64px; font-weight: bold; color: ${color}; margin-bottom: 5px;">${overallScore}</div>
              <div style="color: #666; font-size: 14px; margin-bottom: 15px;">out of 100</div>
              <div style="display: inline-block; background: ${color}; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600;">
                ${tier}
              </div>
            </div>

            <!-- Your Story -->
            <div style="background: #F9FAFB; border-left: 4px solid #4F46E5; padding: 20px; margin-bottom: 30px;">
              <p style="font-style: italic; color: #555; margin: 0; line-height: 1.6;">"${logline}"</p>
            </div>

            <!-- Score Breakdown -->
            <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">Score Breakdown</h3>
            <table style="width: 100%; margin-bottom: 30px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 0; color: #555;">Originality</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #333;">${breakdown.originality}/10</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 0; color: #555;">Emotional Impact</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #333;">${breakdown.emotionalImpact}/10</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 0; color: #555;">Commercial Potential</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #333;">${breakdown.commercialPotential}/10</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5E7EB;">
                <td style="padding: 12px 0; color: #555;">Format Readiness</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #333;">${breakdown.formatReadiness}/10</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #555;">Clarity of Vision</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #333;">${breakdown.clarityOfVision}/10</td>
              </tr>
            </table>

            <!-- Analysis -->
            <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">Our Analysis</h3>
            <p style="color: #555; line-height: 1.7; margin-bottom: 30px;">${detailedAnalysis}</p>

            <!-- Recommendations -->
            <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">Recommendations</h3>
            <ul style="color: #555; line-height: 1.7; padding-left: 20px; margin-bottom: 30px;">
              ${recommendations.map((rec) => `<li style="margin-bottom: 10px;">${rec}</li>`).join('')}
            </ul>

            <!-- What's Next Box -->
            <div style="background: linear-gradient(135deg, #EEF2FF 0%, #FDF4FF 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #333; font-size: 18px; margin: 0 0 15px 0;">What Happens Next?</h3>
              <p style="color: #555; margin: 0 0 10px 0; line-height: 1.6;">
                <strong>Within 72 hours</strong>, our story development team will personally review your submission and provide additional personalized feedback.
              </p>
              <p style="color: #555; margin: 0; line-height: 1.6;">
                If your story qualifies for our development track, we'll reach out to schedule a strategy consultation.
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${BASE_URL}/gallery" style="display: inline-block; background: #4F46E5; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                See Projects We've Developed
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
              This preliminary analysis was generated by our AI system. Your full evaluation with expert feedback is coming within 72 hours.
            </p>
            <p style="color: #999; font-size: 12px; margin: 0;">
              848 Washington Media | <a href="${BASE_URL}" style="color: #4F46E5;">filmdecks.biz</a>
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send analysis report:', error);
    return { success: false, error };
  }
}
