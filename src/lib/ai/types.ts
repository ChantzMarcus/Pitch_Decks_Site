// AI Analysis Types

export interface StoryAnalysisRequest {
  logline: string;
  description?: string;
  format?: string;
  budget?: string;
}

export interface StoryAnalysisResult {
  overallScore: number; // 1-100
  breakdown: {
    originality: number; // 1-10
    emotionalImpact: number; // 1-10
    commercialPotential: number; // 1-10
    formatReadiness: number; // 1-10
    clarityOfVision: number; // 1-10
  };
  detailedAnalysis: string;
  recommendations: string[];
  confidence: number; // 0-1
}

export interface AIProvider {
  name: string;
  analyzeStory(request: StoryAnalysisRequest): Promise<StoryAnalysisResult>;
  isAvailable(): boolean;
}

export type ProviderName = 'openai' | 'anthropic' | 'groq' | 'mistral' | 'huggingface';

export interface ProviderConfig {
  enabled: boolean;
  priority: number; // Lower = tried first
  maxRetries: number;
  timeout: number; // ms
}
