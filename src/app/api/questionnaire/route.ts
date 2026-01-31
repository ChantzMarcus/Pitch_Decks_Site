import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { sendNewLeadNotification, sendAnalysisReport } from '@/lib/resend';

// Zod schema for validating questionnaire data
const questionnaireSchema = z.object({
  // Step 1: Emotional Connection
  timeline: z.string().min(1, 'Timeline is required'),
  personalMeaning: z.array(z.string()).min(1, 'Select at least one'),
  projectFor: z.string().min(1, 'Project audience is required'),

  // Step 2: Creative Scope
  format: z.string().min(1, 'Format is required'),
  materials: z.array(z.string()).min(1, 'Select at least one material'),
  excitedParts: z.array(z.string()).min(1, 'Select at least one exciting part'),
  involvement: z.string().min(1, 'Involvement level is required'),

  // Step 3: Timing + Investment
  startTiming: z.string().min(1, 'Start timing is required'),
  budget: z.string().min(1, 'Budget is required'),

  // Step 4: Story Summary
  logline: z.string().min(10, 'Logline must be at least 10 characters'),
  description: z.string().optional(),

  // Step 5: Contact
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  wantConsult: z.boolean().default(false),

  // UTM tracking (optional)
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

// Budget to score mapping (higher budget = higher lead score)
const BUDGET_SCORES: Record<string, number> = {
  '<$5K': 20,
  '$5-15K': 50,
  '$15-50K': 75,
  '$50K+': 100,
  'unsure': 30,
};

// Timing urgency score
const TIMING_SCORES: Record<string, number> = {
  'ASAP – I\'m ready now': 100,
  'Within 1–3 months': 75,
  'This year – need to prepare first': 50,
  'Just exploring – not sure yet': 20,
};

// Budget category for lead segmentation
const BUDGET_CATEGORIES: Record<string, string> = {
  '<$5K': 'exploring',
  '$5-15K': 'specific',
  '$15-50K': 'serious',
  '$50K+': 'full',
  'unsure': 'exploring',
};

/**
 * Calculate lead score based on budget and timing
 * Score ranges from 0-100
 */
function calculateLeadScore(budget: string, startTiming: string): number {
  const budgetScore = BUDGET_SCORES[budget] || 30;
  const timingScore = TIMING_SCORES[startTiming] || 50;

  // Weight budget higher (70%) than timing (30%)
  return Math.round((budgetScore * 0.7) + (timingScore * 0.3));
}

/**
 * POST /api/questionnaire
 *
 * Handles questionnaire submissions:
 * 1. Validates input data
 * 2. Calculates lead score
 * 3. Saves to Neon database
 * 4. Returns success with teaser info
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate data
    const validatedData = questionnaireSchema.parse(body);

    // Calculate lead score
    const leadScore = calculateLeadScore(validatedData.budget, validatedData.startTiming);
    const budgetCategory = BUDGET_CATEGORIES[validatedData.budget] || 'exploring';

    // Determine lead status based on budget
    let status = 'new';
    if (leadScore >= 75) {
      status = 'qualified'; // High value lead
    } else if (leadScore >= 40) {
      status = 'contacted'; // Mid tier - needs nurturing
    }

    // Prepare database record
    const leadData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      timeline: validatedData.timeline,
      personalMeaning: validatedData.personalMeaning,
      projectFor: validatedData.projectFor,
      format: validatedData.format,
      materials: validatedData.materials,
      excitedParts: validatedData.excitedParts,
      involvement: validatedData.involvement,
      startTiming: validatedData.startTiming,
      budget: validatedData.budget,
      budgetCategory,
      logline: validatedData.logline,
      description: validatedData.description || null,
      wantConsult: validatedData.wantConsult,
      leadScore,
      status,
      utmSource: validatedData.utmSource || null,
      utmMedium: validatedData.utmMedium || null,
      utmCampaign: validatedData.utmCampaign || null,
      referrer: validatedData.referrer || null,
    };

    // Insert into database
    const [newLead] = await db.insert(leads).values(leadData).returning();

    // Trigger StakeOS processing asynchronously (takes ~15 minutes)
    // Don't wait for it - return immediately with teaser score
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Start StakeOS processing in background (fire and forget)
    fetch(`${baseUrl}/api/ai-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logline: validatedData.logline,
        description: validatedData.description || '',
        format: validatedData.format,
        budget: validatedData.budget,
        contactInfo: {
          name: validatedData.name,
          email: validatedData.email,
        },
        leadId: newLead.id, // Pass leadId so we can update the record when done
      }),
    })
      .then(async (aiResponse) => {
        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          
          if (aiResult.success && aiResult.analysis) {
            const { breakdown } = aiResult.analysis;

            // Update the lead record with StakeOS analysis scores
            await db
              .update(leads)
              .set({
                overallScore: aiResult.analysis.overallScore,
                originalityScore: breakdown.originality,
                emotionalScore: breakdown.emotionalImpact,
                commercialScore: breakdown.commercialPotential,
                formatScore: breakdown.formatReadiness,
                clarityScore: breakdown.clarityOfVision,
              })
              .where(eq(leads.id, newLead.id));

            // Send full StakeOS analysis report email
            sendAnalysisReport({
              to: validatedData.email,
              name: validatedData.name,
              logline: validatedData.logline,
              analysis: aiResult.analysis,
            }).catch(err => console.error('Analysis report email send failed:', err));
          }
        }
      })
      .catch((aiError) => {
        console.error('StakeOS Processing Error:', aiError);
        // Don't fail - processing continues in background
      });

    // Send notification email to admin team (non-blocking)
    try {
      await sendNewLeadNotification({
        name: validatedData.name,
        email: validatedData.email,
        format: validatedData.format,
        logline: validatedData.logline,
        budget: validatedData.budget,
        timeline: validatedData.startTiming,
        leadScore: leadScore,
      });
    } catch (emailError) {
      console.error('Failed to send lead notification email:', emailError);
      // Don't fail the submission if email fails
    }

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      teaserScore: {
        overall: leadScore,
        category: getScoreCategory(leadScore),
        budgetTier: budgetCategory,
      },
      message: 'Your story has been submitted successfully!',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }

    console.error('Questionnaire submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}

/**
 * Get human-readable score category
 */
function getScoreCategory(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Strong';
  if (score >= 40) return 'Developing';
  return 'Exploring';
}

/**
 * GET /api/questionnaire
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Questionnaire API is ready',
  });
}
