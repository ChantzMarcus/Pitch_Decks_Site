// src/app/getting-started/page.tsx
import GettingStartedGuide from '@/components/GettingStartedGuide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started | FilmDecks',
  description: 'Begin your journey with FilmDecks - resources and guides for creating your first pitch deck',
};

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Getting Started
          </h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Resources and guides to help you begin your pitch deck journey
          </p>
        </div>

        <GettingStartedGuide />
      </div>
    </div>
  );
}