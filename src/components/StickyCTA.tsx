'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

interface StickyCTAProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  showAfterScroll?: number; // Show after scrolling this many pixels
  dismissible?: boolean;
  position?: 'bottom' | 'top';
  variant?: 'primary' | 'secondary' | 'minimal';
}

export default function StickyCTA({
  title = 'Ready to Get Started?',
  description = 'See if your story qualifies for our professional pitch packaging',
  ctaText = 'Get Your Story Scored',
  ctaHref = '/questionnaire',
  showAfterScroll = 400,
  dismissible = true,
  position = 'bottom',
  variant = 'primary',
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (!isDismissed && latest > showAfterScroll) {
        setIsVisible(true);
      } else if (latest < showAfterScroll) {
        setIsVisible(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, showAfterScroll, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  const variants = {
    primary: 'bg-gradient-to-r from-accent-indigo to-accent-gold text-white',
    secondary: 'bg-charcoal border border-paper/20 text-paper',
    minimal: 'bg-white/10 backdrop-blur-xl border border-white/20 text-paper',
  };

  return (
    <motion.div
      initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed left-0 right-0 z-50 ${position === 'bottom' ? 'bottom-0' : 'top-0'} ${
        variant === 'primary' ? variants.primary : variants.secondary
      } shadow-2xl`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base truncate">{title}</p>
            <p className="text-xs sm:text-sm opacity-90 hidden sm:block">{description}</p>
          </div>

          {/* CTA Button */}
          <Link
            href={ctaHref}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white text-charcoal rounded-xl font-medium text-sm hover:shadow-lg transition-all group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Dismiss Button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Floating variant - always visible but unobtrusive
export function FloatingStickyCTA({
  ctaText = 'Get Started',
  ctaHref = '/questionnaire',
}: {
  ctaText?: string;
  ctaHref?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [100, 0]);
  const opacity = useTransform(scrollY, [0, 100, 200], [0, 1, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={ctaHref}
        className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-accent-indigo to-accent-gold text-white rounded-2xl shadow-2xl shadow-accent-indigo/30 hover:shadow-accent-indigo/50 transition-all group"
      >
        <span className="font-medium">{ctaText}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
