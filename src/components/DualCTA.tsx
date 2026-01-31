'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { StoryIcon, CalendarIcon } from '@/components/icons/FilmIcons';

// Custom Sparkles icon
function SparklesIcon({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );
}

/**
 * Dual Call-to-Action Component
 * Primary goal: Get visitors to either submit their project OR book a meeting
 * This is where jobs are booked
 */
export default function DualCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/90 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Your Story Funded?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Take the first step. Get a free professional assessment of your project's potential
            and book a strategy session with our team.
          </p>
        </motion.div>

        {/* Triple CTAs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Option A: Getting Started */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-accent-indigo rounded-xl flex items-center justify-center">
                <SparklesIcon size={28} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold">Just Starting Out?</h3>
            </div>
            <p className="text-white/70 mb-6">
              Get foundational resources and guidance to begin your pitch deck journey.
              Perfect for creators taking their first steps.
            </p>
            <ul className="text-left space-y-3 mb-8">
              {[
                'Educational resources',
                'Template guides',
                'Best practices',
                'Community support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/80">
                  <SparklesIcon className="text-accent-gold flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/getting-started"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Option B: Free Assessment */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-accent-indigo rounded-xl flex items-center justify-center">
                <StoryIcon size={28} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold">Free Project Assessment</h3>
            </div>
            <p className="text-white/70 mb-6">
              See if your story is approved by our expert team. Get your story scored using the same proprietary system trusted by top-tier producers and executives.
            </p>
            <ul className="text-left space-y-3 mb-8">
              {[
                'Expert team evaluation',
                'Proprietary scoring system',
                'Industry-trusted methodology',
                'See if your story is approved',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/80">
                  <SparklesIcon className="text-accent-gold flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
            >
              Get Your Story Scored by Experts
            </Link>
          </motion.div>

          {/* Option C: Book a Meeting */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-accent-gold rounded-xl flex items-center justify-center">
                <CalendarIcon size={28} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold">Book a Strategy Call</h3>
            </div>
            <p className="text-white/70 mb-6">
              Ready to move fast? Schedule a 30-minute strategy session with our team.
              We'll discuss your project, timeline, and how we can help you get funded.
            </p>
            <ul className="text-left space-y-3 mb-8">
              {[
                'Direct consultation with experts',
                'Custom project roadmap',
                'Pricing and package options',
                'Next steps defined',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/80">
                  <SparklesIcon className="text-accent-gold flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://cal.com/screenwriterhannah/pitch-deck-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent-gold text-white font-medium rounded-lg hover:bg-accent-gold/90 transition-colors"
            >
              Book Strategy Call
            </a>
          </motion.div>
        </div>

        {/* Urgency/Trust Message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-sm"
        >
          Both options are free. No commitment required. Let's see if we're a good fit to work together.
        </motion.p>
      </div>
    </section>
  );
}
