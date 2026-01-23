import { Mistral } from '@mistralai/mistralai';
import type { AIProvider, StoryAnalysisRequest, StoryAnalysisResult } from '../types';

export class MistralProvider implements AIProvider {
  name = 'Mistral AI';
  private client: Mistral | null = null;

  constructor() {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (apiKey && apiKey !== 'your-mistral-key-here') {
      this.client = new Mistral({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    const prompt = this.buildPrompt(request);

    const response = await this.client.chat.complete({
      model: 'mistral-large-latest', // Most capable
      messages: [
        {
          role: 'system',
          content: 'You are an expert film and TV story analyst. Provide objective scores and actionable feedback. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      responseFormat: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from Mistral');
    }

    // Handle both string and array content
    let contentStr: string;
    if (typeof content === 'string') {
      contentStr = content;
    } else if (Array.isArray(content) && content.length > 0) {
      const first = content[0];
      contentStr = (first as any).text || String(first);
    } else {
      throw new Error('Unexpected content format from Mistral');
    }

    return this.parseResponse(JSON.parse(contentStr));
  }

  private buildPrompt(request: StoryAnalysisRequest): string {
    return `Analyze this film/TV story concept:

Story Details:
- Logline: ${request.logline}
${request.description ? `- Description: ${request.description}` : ''}
${request.format ? `- Format: ${request.format}` : ''}

Return ONLY a JSON object:
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
  "recommendations": ["<3-5 recommendations>"],
  "confidence": <0-1>
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
        'Strengthen the emotional core.',
        'Clarify the target audience.'
      ],
      confidence: data.confidence || 0.8
    };
  }
}
