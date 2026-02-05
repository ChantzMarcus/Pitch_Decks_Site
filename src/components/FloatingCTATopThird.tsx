'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/FilmIcons';

/**
 * FloatingCTATopThird - CTA button that floats in the top 1/3 of viewport
 *
 * Stays at eye level (top 1/3 of screen) as user scrolls
 * Has the golden gradient style with shimmer effect
 */
export default function FloatingCTATopThird({
  ctaText = 'Get Your Free Score',
  ctaHref = '/getting-started',
  showAfterScroll = 200,
}: {
  ctaText?: string;
  ctaHref?: string;
  showAfterScroll?: number;
}) {
  const { scrollY } = useScroll();

  // Calculate position - stays in top 1/3 of viewport (33vh from top)
  const topPosition = '33vh';

  // Fade in based on scroll
  const opacity = useTransform(scrollY, [showAfterScroll, showAfterScroll + 100], [0, 1]);
  const scale = useTransform(scrollY, [showAfterScroll, showAfterScroll + 100], [0.9, 1]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        top: topPosition,
      }}
      className="fixed right-6 z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={ctaHref}
        className="relative flex items-center gap-3 px-6 py-4 rounded-full hover:scale-105 transition-all group text-base font-semibold overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #B8860B 50%, #C9AE5D 75%, #D4AF37 100%)',
          border: '2px solid rgba(212, 175, 55, 0.6)',
          color: '#1a1a1a',
          boxShadow: '0 8px 40px rgba(212, 175, 55, 0.6)',
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Golden glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        <span className="relative z-10">{ctaText}</span>
        <ArrowRightIcon className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  );
}

// Also export as FloatingStickyCTA for compatibility
export { FloatingCTATopThird as FloatingStickyCTA };
