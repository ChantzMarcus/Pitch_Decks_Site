import { HfInference } from '@huggingface/inference';
import type { AIProvider, StoryAnalysisRequest, StoryAnalysisResult } from '../types';

export class HuggingFaceProvider implements AIProvider {
  name = 'Hugging Face';
  private client: HfInference | null = null;
  private model = 'Qwen/Qwen2.5-72B-Instruct'; // Fast, capable open-source model

  constructor() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (apiKey && !apiKey.startsWith('hf_')) {
      // Invalid key format
      return;
    }
    if (apiKey) {
      this.client = new HfInference(apiKey);
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult> {
    if (!this.client) {
      throw new Error('Hugging Face client not initialized');
    }

    const prompt = this.buildPrompt(request);

    const response = await this.client.textGeneration({
      model: this.model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    const text = response.generated_text;
    if (!text) {
      throw new Error('No response from Hugging Face');
    }

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Hugging Face response');
    }

    return this.parseResponse(JSON.parse(jsonMatch[0]));
  }

  private buildPrompt(request: StoryAnalysisRequest): string {
    return `You are an expert film and TV story analyst. Analyze this story concept and return ONLY a valid JSON object:

Story Details:
- Logline: ${request.logline}
${request.description ? `- Description: ${request.description}` : ''}
${request.format ? `- Format: ${request.format}` : ''}

Return JSON in this exact format:
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
        'Strengthen the emotional core.',
        'Clarify the target audience.'
      ],
      confidence: data.confidence || 0.8
    };
  }
}
