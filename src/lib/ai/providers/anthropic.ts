import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, StoryAnalysisRequest, StoryAnalysisResult } from '../types';

export class AnthropicProvider implements AIProvider {
  name = 'Anthropic Claude';
  private client: Anthropic | null = null;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey && !apiKey.includes('sk-ant-your')) {
      this.client = new Anthropic({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult> {
    if (!this.client) {
      throw new Error('Anthropic client not initialized');
    }

    const prompt = this.buildPrompt(request);

    const response = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022', // Fast, cost-effective
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const text = response.content[0];
    if (text.type !== 'text') {
      throw new Error('Unexpected response format from Anthropic');
    }

    // Extract JSON from response (in case there's extra text)
    const jsonMatch = text.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Anthropic response');
    }

    return this.parseResponse(JSON.parse(jsonMatch[0]));
  }

  private buildPrompt(request: StoryAnalysisRequest): string {
    return `You are an expert film and TV story analyst. Analyze this story concept:

Story Details:
- Logline: ${request.logline}
${request.description ? `- Description: ${request.description}` : ''}
${request.format ? `- Format: ${request.format}` : ''}

Provide scores across 5 dimensions (1-10 scale) and return ONLY a JSON object with this structure:
{
  "overallScore": <1-100>,
  "breakdown": {
    "originality": <1-10>,
    "emotionalImpact": <1-10>,
    "commercialPotential": <1-10>,
    "formatReadiness": <1-10>,
    "clarityOfVision": <1-10>
  },
  "detailedAnalysis": "<2-3 paragraph analysis>",
  "recommendations": ["<3-5 specific recommendations>"],
  "confidence": <0-1>
}

Return ONLY the JSON, no other text.`;
  }

  private parseResponse(data: any): StoryAnalysisResult {
    return {
      overallScore: data.overallScore || 70,
      breakdown: {
        originality: data.breakdown?.originality || 7,
        emotionalImpact: data.breakdown?.emotionalImpact || 7,
        commercialPotential: data.breakdown?.commercialPotential || 7,
        formatReadiness: data.breakdown?.formatReadiness || 7,
        clarityOfVision: data.breakdown?.clarityOfVision || 7
      },
      detailedAnalysis: data.detailedAnalysis || 'Analysis not available.',
      recommendations: data.recommendations || [
        'Consider strengthening the emotional core.',
        'Clarify the target audience.'
      ],
      confidence: data.confidence || 0.8
    };
  }
}
