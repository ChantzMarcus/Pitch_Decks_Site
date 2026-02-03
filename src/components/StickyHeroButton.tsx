'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Sticky Hero Button
 * Makes the Hero's "Get Your Free Score" button follow the user as they scroll
 * Appears after scrolling past the Hero section
 */
export default function StickyHeroButton({
  ctaText = 'Get Your Free Score',
  ctaHref = '/questionnaire',
  showAfterScroll = 600,
}: {
  ctaText?: string;
  ctaHref?: string;
  showAfterScroll?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // Fade in/out based on scroll position
  const opacity = useTransform(scrollY, [showAfterScroll, showAfterScroll + 100], [0, 1]);
  const y = useTransform(scrollY, [showAfterScroll, showAfterScroll + 100], [20, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > showAfterScroll);
    });

    return () => unsubscribe();
  }, [scrollY, showAfterScroll]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <Link
        href={ctaHref}
        className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl overflow-hidden shadow-2xl
          bg-white/10 backdrop-blur-xl border border-white/20
          hover:bg-white/15 hover:border-white/30
          transition-all duration-300"
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-indigo/30 to-accent-gold/30 pointer-events-none group-hover:opacity-100 transition-opacity duration-400"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        <span className="relative z-10 font-medium text-lg text-paper">
          {ctaText}
        </span>
        <ArrowRight className="relative z-10 w-6 h-6 text-paper group-hover:translate-x-1.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
