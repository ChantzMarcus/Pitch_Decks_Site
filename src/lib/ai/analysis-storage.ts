// src/lib/ai/analysis-storage.ts
import { StoryAnalysisResult } from './types';

export interface StoredAnalysis {
  id: string;
  logline: string;
  description?: string;
  format?: string;
  createdAt: Date;
  basicResult: {
    overallScore: number;
    breakdown: {
      originality: number;
      emotionalImpact: number;
      commercialPotential: number;
      formatReadiness: number;
      clarityOfVision: number;
    };
  };
  fullResult?: StoryAnalysisResult; // Only stored after review
  status: 'pending' | 'reviewed' | 'sent_to_user';
  reviewedAt?: Date;
  reviewerNote?: string;
  contactInfo?: {
    name: string;
    email: string;
  };
}

// In-memory storage (replace with database in production)
const storedAnalyses: StoredAnalysis[] = [];

export async function storeAnalysisRequest(
  logline: string,
  description: string | undefined,
  format: string | undefined,
  contactInfo?: { name: string; email: string }
): Promise<string> {
  const id = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const newAnalysis: StoredAnalysis = {
    id,
    logline,
    description,
    format,
    createdAt: new Date(),
    basicResult: {
      overallScore: 0, // Will be filled after analysis
      breakdown: {
        originality: 0,
        emotionalImpact: 0,
        commercialPotential: 0,
        formatReadiness: 0,
        clarityOfVision: 0
      }
    },
    status: 'pending',
    contactInfo
  };

  storedAnalyses.push(newAnalysis);
  return id;
}

export async function updateAnalysisWithBasicResult(
  id: string,
  basicResult: StoredAnalysis['basicResult']
): Promise<void> {
  const analysis = storedAnalyses.find(a => a.id === id);
  if (analysis) {
    analysis.basicResult = basicResult;
    analysis.status = 'pending'; // Awaiting full review
  }
}

export async function getAnalysisPreview(id: string): Promise<StoredAnalysis | undefined> {
  return storedAnalyses.find(a => a.id === id);
}

export async function markAsReviewed(
  id: string,
  fullResult: StoryAnalysisResult,
  reviewerNote?: string
): Promise<void> {
  const analysis = storedAnalyses.find(a => a.id === id);
  if (analysis) {
    analysis.fullResult = fullResult;
    analysis.reviewedAt = new Date();
    analysis.reviewerNote = reviewerNote;
    analysis.status = 'reviewed';
  }
}

export async function getPendingReviews(): Promise<StoredAnalysis[]> {
  return storedAnalyses.filter(a => a.status === 'pending');
}