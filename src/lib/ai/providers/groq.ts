import Groq from 'groq-sdk';
import type { AIProvider, StoryAnalysisRequest, StoryAnalysisResult } from '../types';

export class GroqProvider implements AIProvider {
  name = 'Groq (Llama)';
  private client: Groq | null = null;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey && !apiKey.includes('gsk-your-groq')) {
      this.client = new Groq({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult> {
    if (!this.client) {
      throw new Error('Groq client not initialized');
    }

    const prompt = this.buildPrompt(request);

    const response = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Fast, capable
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
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from Groq');
    }

    return this.parseResponse(JSON.parse(content));
  }

  private buildPrompt(request: StoryAnalysisRequest): string {
    return `Analyze this film/TV story concept:

Story Details:
- Logline: ${request.logline}
${request.description ? `- Description: ${request.description}` : ''}
${request.format ? `- Format: ${request.format}` : ''}

Return ONLY a JSON object with this structure:
{
  "overallScore": <1-100>,
  "breakdown": {
    "originality": <1-10, how unique>,
    "emotionalImpact": <1-10, audience connection>,
    "commercialPotential": <1-10, market appeal>,
    "formatReadiness": <1-10, fits the format>,
    "clarityOfVision": <1-10, clear message>
  },
  "detailedAnalysis": "<2-3 paragraph analysis>",
  "recommendations": ["<3-5 specific recommendations>"],
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
