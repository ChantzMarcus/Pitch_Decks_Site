import OpenAI from 'openai';
import type { AIProvider, StoryAnalysisRequest, StoryAnalysisResult } from '../types';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private client: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'sk-your-openai-key-here') {
      this.client = new OpenAI({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    const prompt = this.buildPrompt(request);

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective, fast
      messages: [
        {
          role: 'system',
          content: 'You are an expert film and TV story analyst. Score stories objectively and provide actionable feedback.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return this.parseResponse(JSON.parse(content));
  }

  private buildPrompt(request: StoryAnalysisRequest): string {
    return `Analyze this film/TV story concept and provide scores across 5 dimensions (1-10 scale):

Story Details:
- Logline: ${request.logline}
${request.description ? `- Description: ${request.description}` : ''}
${request.format ? `- Format: ${request.format}` : ''}

Return a JSON object with this exact structure:
{
  "overallScore": <1-100, calculated from the 5 dimensions>,
  "breakdown": {
    "originality": <1-10, how unique is the concept>,
    "emotionalImpact": <1-10, will it connect with audiences>,
    "commercialPotential": <1-10, market appeal and viability>,
    "formatReadiness": <1-10, does it fit the chosen format>,
    "clarityOfVision": <1-10, is the core message clear>
  },
  "detailedAnalysis": "<2-3 paragraph analysis of the story's strengths and areas for improvement>",
  "recommendations": ["<3-5 specific, actionable recommendations>"],
  "confidence": <0-1, how confident are you in this analysis>
}`;
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
        'Consider strengthening the emotional core of the story.',
        'Clarify the target audience and commercial positioning.'
      ],
      confidence: data.confidence || 0.8
    };
  }
}
