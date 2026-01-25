// lib/email/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AnalysisReportProps {
  to: string;
  name: string;
  logline: string;
  analysis: any; // The AI analysis result
}

export async function sendAnalysisReport(props: AnalysisReportProps) {
  try {
    const { to, name, logline, analysis } = props;
    
    const { data, error } = await resend.emails.send({
      from: process.env.REPLY_TO_EMAIL || 'onboarding@resend.dev',
      to: to,
      subject: `Your Story Analysis - ${logline.substring(0, 50)}${logline.length > 50 ? '...' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2B2B2B;">Your Story Analysis Report</h1>
          
          <p>Hello ${name},</p>
          
          <p>Thank you for submitting your story. Here's your professional analysis:</p>
          
          <div style="background: #F8F8F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #4F46E5;">Story Details</h2>
            <p><strong>Logline:</strong> ${logline}</p>
          </div>
          
          <div style="background: #F8F8F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #4F46E5;">Analysis Scores</h2>
            <p><strong>Overall Score:</strong> ${analysis.overallScore}/100</p>
            <p><strong>Originality:</strong> ${analysis.breakdown.originality}/10</p>
            <p><strong>Emotional Impact:</strong> ${analysis.breakdown.emotionalImpact}/10</p>
            <p><strong>Commercial Potential:</strong> ${analysis.breakdown.commercialPotential}/10</p>
            <p><strong>Format Readiness:</strong> ${analysis.breakdown.formatReadiness}/10</p>
            <p><strong>Clarity of Vision:</strong> ${analysis.breakdown.clarityOfVision}/10</p>
          </div>
          
          <div style="background: #F8F8F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #4F46E5;">Recommendations</h2>
            <ul>
              ${analysis.recommendations?.map((rec: string) => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <p>Would you like to discuss how we can help develop your story further?</p>
          
          <p>
            <a href="${process.env.BASE_URL}/questionnaire" style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
              Schedule a Consultation
            </a>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; margin: 0;">
              Best regards,<br>
              The 848 Washington Media Team
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending analysis report email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending analysis report email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}