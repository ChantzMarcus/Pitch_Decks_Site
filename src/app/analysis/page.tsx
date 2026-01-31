// src/app/analysis/page.tsx
import AIStoryAnalysis from '@/components/AIStoryAnalysis';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Story Evaluation | FilmDecks',
  description: 'Exclusive proprietary analysis system powered by industry-trusted data. The same methodology used by top-tier producers and executives to evaluate commercial viability and production readiness.',
};

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse"></span>
            <span className="text-sm font-medium text-accent-indigo">
              Proprietary System • Industry-Trusted Data
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Professional Story Evaluation
          </h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto mb-4">
            Powered by our proprietary analysis system, trained on decades of industry data from major studios, streaming platforms, and production companies.
          </p>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
            This exclusive evaluation uses the same methodology trusted by top-tier producers and executives to assess commercial viability, market potential, and production readiness.
          </p>
        </div>

        <AIStoryAnalysis />
      </div>
    </div>
  );
}