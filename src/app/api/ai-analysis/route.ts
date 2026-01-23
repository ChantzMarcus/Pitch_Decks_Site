import { NextRequest, NextResponse } from 'next/server';
import { analyzeStory } from '@/lib/ai';
import { z } from 'zod';

// Validation schema
const analysisRequestSchema = z.object({
  logline: z.string().min(10, 'Logline must be at least 10 characters'),
  description: z.string().optional(),
  format: z.string().optional(),
  budget: z.string().optional(),
});

/**
 * POST /api/ai-analysis
 *
 * Analyzes a story concept using AI providers with fallback
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request
    const validatedData = analysisRequestSchema.parse(body);

    // Call AI service (automatically tries providers in order)
    const result = await analyzeStory({
      logline: validatedData.logline,
      description: validatedData.description,
      format: validatedData.format,
      budget: validatedData.budget,
    });

    return NextResponse.json({
      success: true,
      analysis: result,
    }, { status: 200 });

  } catch (error) {
    console.error('AI Analysis API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error during analysis',
    }, { status: 500 });
  }
}

/**
 * GET /api/ai-analysis
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'AI Analysis API is ready',
    timestamp: new Date().toISOString(),
  });
}
