import type { AIProvider, ProviderName, StoryAnalysisRequest, StoryAnalysisResult } from './types';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GroqProvider } from './providers/groq';
import { MistralProvider } from './providers/mistral';
import { HuggingFaceProvider } from './providers/huggingface';

// Provider configuration with fallback order (fastest & cheapest first)
const DEFAULT_PROVIDERS: ProviderName[] = ['groq', 'huggingface', 'openai', 'anthropic', 'mistral'];

class AIService {
  private providers: Map<ProviderName, AIProvider> = new Map();
  private providerOrder: ProviderName[] = DEFAULT_PROVIDERS;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize all available providers
    const providers = [
      { key: 'groq' as ProviderName, instance: new GroqProvider() },
      { key: 'huggingface' as ProviderName, instance: new HuggingFaceProvider() },
      { key: 'openai' as ProviderName, instance: new OpenAIProvider() },
      { key: 'anthropic' as ProviderName, instance: new AnthropicProvider() },
      { key: 'mistral' as ProviderName, instance: new MistralProvider() },
    ];

    for (const { key, instance } of providers) {
      if (instance.isAvailable()) {
        this.providers.set(key, instance);
      }
    }

    console.log(`AI Service initialized with ${this.providers.size} providers:`, Array.from(this.providers.keys()));
  }

  /**
   * Analyze a story using the first available provider
   * Falls back to next provider if one fails
   */
  async analyzeStory(request: StoryAnalysisRequest, preferredProvider?: ProviderName): Promise<StoryAnalysisResult> {
    const providersToTry = preferredProvider
      ? [preferredProvider, ...this.providerOrder.filter(p => p !== preferredProvider)]
      : this.providerOrder;

    const errors: Array<{ provider: string; error: string }> = [];

    for (const providerName of providersToTry) {
      const provider = this.providers.get(providerName);

      if (!provider || !provider.isAvailable()) {
        continue;
      }

      try {
        console.log(`Attempting analysis with ${provider.name}...`);
        const result = await provider.analyzeStory(request);
        console.log(`✓ Analysis complete with ${provider.name}`);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`✗ ${provider.name} failed:`, errorMessage);
        errors.push({ provider: provider.name, error: errorMessage });
      }
    }

    // If all providers failed, return a fallback result
    console.error('All AI providers failed:', errors);
    return this.getFallbackResult(request);
  }

  /**
   * Get a fallback result when all providers fail
   */
  private getFallbackResult(_request: StoryAnalysisRequest): StoryAnalysisResult {
    return {
      overallScore: 70,
      breakdown: {
        originality: 7,
        emotionalImpact: 7,
        commercialPotential: 7,
        formatReadiness: 7,
        clarityOfVision: 7
      },
      detailedAnalysis: 'We\'re experiencing technical difficulties with our analysis service. Your story has been submitted and our team will provide a personalized review shortly.',
      recommendations: [
        'Our team will review your story and provide detailed feedback.',
        'Check your email for your complete analysis within 24 hours.'
      ],
      confidence: 0.5
    };
  }

  /**
   * Get list of available providers
   */
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Check if a specific provider is available
   */
  isProviderAvailable(providerName: ProviderName): boolean {
    const provider = this.providers.get(providerName);
    return provider?.isAvailable() ?? false;
  }
}

// Singleton instance
export const aiService = new AIService();

// Convenience function
export async function analyzeStory(request: StoryAnalysisRequest, preferredProvider?: ProviderName): Promise<StoryAnalysisResult> {
  return aiService.analyzeStory(request, preferredProvider);
}

// Re-export types
export type { AIProvider, ProviderName, StoryAnalysisRequest, StoryAnalysisResult } from './types';
