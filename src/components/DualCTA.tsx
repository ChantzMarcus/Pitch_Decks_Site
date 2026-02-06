'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { StoryIcon, CalendarIcon } from '@/components/icons/FilmIcons';
import { getConsultationUrl } from '@/lib/constants';

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
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-indigo rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-indigo/20 to-accent-gold/20 rounded-full text-accent-gold font-medium mb-6 border border-accent-gold/30"
          >
            <SparklesIcon size={18} />
            <span>Ready to Transform Your Story?</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent">
            Ready to Get Your Story Funded?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Take the first step. Get a free professional assessment of your project's potential
            and book a strategy session with our team.
          </p>
        </motion.div>

        {/* Triple CTAs */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Option A: Getting Started */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group bg-gradient-to-br from-white/10 via-indigo-500/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-accent-indigo/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent-indigo/20"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-indigo/0 to-accent-indigo/0 group-hover:from-accent-indigo/10 group-hover:to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-indigo to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-indigo/30 group-hover:scale-110 transition-transform duration-300">
                    <SparklesIcon size={32} className="text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-accent-indigo/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center">Just Starting Out?</h3>
              </div>
              <p className="text-white/70 mb-6 text-center leading-relaxed">
                Get foundational resources and guidance to begin your pitch deck journey.
                Perfect for creators taking their first steps.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Educational resources',
                  'Template guides',
                  'Best practices',
                  'Community support',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent-gold to-amber-600 flex items-center justify-center mt-0.5">
                      <SparklesIcon className="text-white" size={12} />
                    </div>
                    <span className="flex-1">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/getting-started"
                className="block w-full relative group/button"
              >
                <span className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-accent-indigo to-indigo-600 text-white font-semibold rounded-xl hover:from-accent-indigo/90 hover:to-indigo-600/90 transition-all duration-300 shadow-lg shadow-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/40 hover:scale-105">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Option B: Free Assessment - Featured/Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group bg-gradient-to-br from-accent-indigo/20 via-indigo-500/20 to-accent-teal/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-accent-indigo/40 hover:border-accent-indigo/60 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-accent-indigo/30 md:scale-105"
          >
            {/* Featured badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-indigo to-accent-teal rounded-full text-white text-xs font-bold shadow-lg">
              MOST POPULAR
            </div>
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-indigo/0 via-accent-teal/0 to-accent-indigo/0 group-hover:from-accent-indigo/20 group-hover:via-accent-teal/10 group-hover:to-accent-indigo/20 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-indigo via-indigo-500 to-accent-teal rounded-2xl flex items-center justify-center shadow-lg shadow-accent-indigo/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <StoryIcon size={32} className="text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-accent-indigo/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center">Free Project Assessment</h3>
              </div>
              <p className="text-white/70 mb-6 text-center leading-relaxed">
                See if your story is approved by our expert team. Get your story scored using the same proprietary system trusted by top-tier producers and executives.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Expert team evaluation',
                  'Proprietary scoring system',
                  'Industry-trusted methodology',
                  'See if your story is approved',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent-gold to-amber-600 flex items-center justify-center mt-0.5">
                      <SparklesIcon className="text-white" size={12} />
                    </div>
                    <span className="flex-1">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/questionnaire"
                className="block w-full relative group/button"
              >
                <span className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-accent-indigo via-indigo-500 to-accent-teal text-white font-semibold rounded-xl hover:from-accent-indigo/90 hover:via-indigo-500/90 hover:to-accent-teal/90 transition-all duration-300 shadow-lg shadow-accent-indigo/40 hover:shadow-xl hover:shadow-accent-indigo/50 hover:scale-105">
                  Get Your Story Scored by Experts
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Option C: Book a Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group bg-gradient-to-br from-white/10 via-amber-500/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-accent-gold/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent-gold/20"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-gold/0 to-amber-600/0 group-hover:from-accent-gold/10 group-hover:to-amber-600/10 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-gold/30 group-hover:scale-110 transition-transform duration-300">
                    <CalendarIcon size={32} className="text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-accent-gold/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-center">Book a Strategy Call</h3>
              </div>
              <p className="text-white/70 mb-6 text-center leading-relaxed">
                Ready to move fast? Schedule a 30-minute strategy session with our team.
                We'll discuss your project, timeline, and how we can help you get funded.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Direct consultation with experts',
                  'Custom project roadmap',
                  'Pricing and package options',
                  'Next steps defined',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent-gold to-amber-600 flex items-center justify-center mt-0.5">
                      <SparklesIcon className="text-white" size={12} />
                    </div>
                    <span className="flex-1">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <a
                href={getConsultationUrl('dual_cta', 'strategy_call')}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full relative group/button"
              >
                <span className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-accent-gold to-amber-600 text-white font-semibold rounded-xl hover:from-accent-gold/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg shadow-accent-gold/30 hover:shadow-xl hover:shadow-accent-gold/40 hover:scale-105">
                  Book Strategy Call
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Urgency/Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-indigo to-accent-teal border-2 border-charcoal" />
              ))}
            </div>
            <p className="text-white/70 text-sm md:text-base font-medium">
              <span className="text-accent-gold font-semibold">All options are free.</span> No commitment required. Let's see if we're a good fit to work together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
