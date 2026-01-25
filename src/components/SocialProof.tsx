'use client';

import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Their analysis helped me see my story from a producer's perspective. Within 3 months, I had meetings with two studios.",
    author: "Sarah M.",
    role: "Screenwriter",
    project: "Drama Series",
  },
  {
    quote: "The feedback was incredibly detailed and actionable. My pitch deck went from amateur to industry-ready.",
    author: "Marcus T.",
    role: "Independent Filmmaker",
    project: "Feature Film",
  },
  {
    quote: "I was skeptical of AI analysis, but the human follow-up made all the difference. They genuinely care about your story.",
    author: "Jennifer L.",
    role: "First-time Writer",
    project: "Limited Series",
  },
];

const stats = [
  { value: '500+', label: 'Stories Analyzed' },
  { value: '89%', label: 'Would Recommend' },
  { value: '72hr', label: 'Avg. Response Time' },
];

/**
 * Compact social proof for questionnaire header
 */
export function SocialProofBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal/60"
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-indigo to-accent-gold flex items-center justify-center text-white text-xs font-bold border-2 border-white"
            >
              {['S', 'M', 'J', 'A'][i - 1]}
            </div>
          ))}
        </div>
        <span>
          <strong className="text-charcoal">500+</strong> filmmakers trust us
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className="w-4 h-4 text-amber-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1">4.9/5 rating</span>
      </div>
    </motion.div>
  );
}

/**
 * Stats bar for trust building
 */
export function StatsBar() {
  return (
    <div className="bg-white border-y border-charcoal/10 py-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-accent-indigo">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-charcoal/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonial carousel/slider
 */
export function TestimonialSlider() {
  return (
    <div className="bg-gradient-to-b from-transparent to-accent-indigo/5 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-center font-display text-xl font-bold text-charcoal mb-8">
          What Filmmakers Say
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl p-5 shadow-sm border border-charcoal/5"
            >
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-charcoal/80 mb-4 italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-indigo to-accent-gold flex items-center justify-center text-white font-bold text-sm">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-medium text-charcoal text-sm">{t.author}</p>
                  <p className="text-xs text-charcoal/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Urgency/scarcity banner
 */
export function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-accent-indigo to-purple-600 text-white py-3 px-4"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm">
        <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span>
          <strong>Limited availability:</strong> Only accepting 10 new stories this week
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Full social proof section combining all elements
 */
export default function SocialProof({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="space-y-6">
        <SocialProofBadge />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <UrgencyBanner />
      <StatsBar />
      <TestimonialSlider />
    </div>
  );
}
