'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/FilmIcons';

interface AlwaysStickyCTAProps {
  ctaText?: string;
  ctaHref?: string;
  position?: 'bottom-right' | 'bottom-center' | 'top-right';
}

/**
 * AlwaysStickyCTA - Always visible CTA that follows user everywhere
 *
 * Features:
 * - Always visible from page load (no fade-in delay)
 * - Fixed position that stays in viewport
 * - Golden gradient with shimmer effect
 * - Never leaves user's eyeline
 */
export default function AlwaysStickyCTA({
  ctaText = 'Get Your Free Score',
  ctaHref = '/questionnaire',
  position = 'bottom-right',
}: AlwaysStickyCTAProps) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2',
    'top-right': 'fixed top-6 right-6',
  };

  return (
    <div className={`${positionClasses[position]} z-[9999]`}>
      <Link
        href={ctaHref}
        className="relative flex items-center gap-3 px-8 py-4 rounded-full hover:scale-105 transition-all group text-base font-bold overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #B8860B 50%, #C9AE5D 75%, #D4AF37 100%)',
          border: '3px solid rgba(212, 175, 55, 0.8)',
          color: '#1a1a1a',
          boxShadow: '0 10px 50px rgba(212, 175, 55, 0.7), 0 0 30px rgba(255, 215, 0, 0.5)',
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Golden glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-transparent to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top highlight for 3D effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-t-full pointer-events-none" />

        <span className="relative z-10 drop-shadow-md">{ctaText}</span>
        <ArrowRightIcon className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform drop-shadow-md" />
      </Link>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

// Also export as FloatingStickyCTA for compatibility
export { AlwaysStickyCTA as FloatingStickyCTA };
