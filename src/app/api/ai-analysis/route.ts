import { NextRequest, NextResponse } from 'next/server';
import { analyzeStory } from '@/lib/ai';
import { z } from 'zod';
import {
  storeAnalysisRequest,
  updateAnalysisWithBasicResult,
  getAnalysisPreview
} from '@/lib/ai/analysis-storage';

// Validation schema
const analysisRequestSchema = z.object({
  logline: z.string().min(1, 'Logline is required'),
  description: z.string().optional(),
  format: z.string().optional(),
  budget: z.string().optional(),
  // File upload support
  uploadedFileText: z.string().optional(),
  uploadedFileName: z.string().optional(),
  // Contact info for premium access
  contactInfo: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }).optional(),
});

/**
 * POST /api/ai-analysis
 *
 * Analyzes a story concept using AI providers with fallback
 * Returns basic preview results immediately, full results sent separately
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request
    const validatedData = analysisRequestSchema.parse(body);

    // Store the analysis request
    const analysisId = await storeAnalysisRequest(
      validatedData.logline,
      validatedData.description,
      validatedData.format,
      validatedData.contactInfo
    );

    // Combine uploaded file text with description if present
    const combinedDescription = [
      validatedData.uploadedFileName ? `--- From ${validatedData.uploadedFileName} ---` : undefined,
      validatedData.uploadedFileText,
      validatedData.description,
    ]
      .filter(Boolean)
      .join('\n\n');

    // Call AI service (automatically tries providers in order)
    const result = await analyzeStory({
      logline: validatedData.logline,
      description: combinedDescription || undefined,
      format: validatedData.format,
      budget: validatedData.budget,
      uploadedFileText: validatedData.uploadedFileText,
      uploadedFileName: validatedData.uploadedFileName,
    });

    // Store the basic results immediately
    await updateAnalysisWithBasicResult(analysisId, {
      overallScore: result.overallScore,
      breakdown: result.breakdown
    });

    // Return only basic results to the user immediately
    const basicResult = {
      overallScore: result.overallScore,
      breakdown: result.breakdown,
      // Indicate that full analysis is being prepared
      message: validatedData.contactInfo
        ? "Thank you! Your full analysis is being prepared and will be sent to your email."
        : "Your story has been analyzed. Full results are being prepared by our team.",
      requiresContactInfo: !validatedData.contactInfo,
      analysisId
    };

    return NextResponse.json({
      success: true,
      analysis: basicResult,
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
 * GET /api/ai-analysis/{id}
 *
 * Retrieve analysis preview by ID
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({
      success: false,
      error: 'Analysis ID is required',
    }, { status: 400 });
  }

  const analysis = await getAnalysisPreview(id);

  if (!analysis) {
    return NextResponse.json({
      success: false,
      error: 'Analysis not found',
    }, { status: 404 });
  }

  // Return only the basic preview
  return NextResponse.json({
    success: true,
    analysis: {
      id: analysis.id,
      overallScore: analysis.basicResult.overallScore,
      breakdown: analysis.basicResult.breakdown,
      message: "This is a preview of your analysis. Full results are being prepared.",
      requiresContactInfo: !analysis.contactInfo,
    },
  }, { status: 200 });
}
