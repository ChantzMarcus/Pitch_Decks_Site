'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

/**
 * Standalone Landing Page for Outbound Campaigns
 * Use this for scraped leads from Reddit, LinkedIn, book authors, etc.
 * Simple, focused, optimized for conversion
 *
 * Usage: /landing?source=reddit&topic=screenwriting
 */
export default function LeadLanding({
  source = 'direct',
  topic = '',
  customMessage = '',
}: {
  source?: string;
  topic?: string;
  customMessage?: string;
}) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-charcoal hover:text-accent-indigo transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to FilmDecks</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-gold/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-charcoal mb-6">
            {customMessage || `Turn Your ${topic || 'Story'} Into a Funded Project`}
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto mb-8">
            Get a free professional assessment of your project's potential.
            Our AI + expert review system has helped 50+ creators get their stories funded.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
            >
              Free Story Analysis
            </Link>
            <a
              href="https://cal.com/screenwriterhannah/pitch-deck-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent-gold text-accent-gold font-medium rounded-lg hover:bg-accent-gold hover:text-white transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* Quick Lead Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-charcoal/10">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
                Get Your Free Assessment
              </h2>
              <p className="text-charcoal/60">
                Tell us about your project and we'll provide personalized feedback
                on how to make it investor-ready.
              </p>
            </div>
            <LeadCaptureForm source={source} />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-gold mb-2">50+</div>
              <div className="text-white/70">5-Star Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-gold mb-2">$300K+</div>
              <div className="text-white/70">Client Projects Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-gold mb-2">100%</div>
              <div className="text-white/70">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-accent-indigo/10 to-accent-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
            Ready to move forward?
          </h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Skip the form. Book a strategy call directly with our team.
          </p>
          <a
            href="https://cal.com/screenwriterhannah/pitch-deck-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
          >
            Book Strategy Call
          </a>
        </div>
      </section>
    </div>
  );
}
