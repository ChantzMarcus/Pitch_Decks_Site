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
    primary: 'bg-charcoal/95 backdrop-blur-xl border-t border-paper/10 text-paper',
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

          {/* CTA Button with liquid glass effect */}
          <Link
            href={ctaHref}
            className="relative flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-sm
              bg-white/10 backdrop-blur-xl border border-white/20 text-paper
              hover:bg-white/15 hover:border-white/30
              transition-all duration-300 group overflow-hidden shadow-lg"
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <span className="relative z-10">{ctaText}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

// Floating variant - appears after scrolling, subtle glassmorphism style
export function FloatingStickyCTA({
  ctaText = 'Get Started',
  ctaHref = '/getting-started',
  showAfterScroll = 400,
}: {
  ctaText?: string;
  ctaHref?: string;
  showAfterScroll?: number;
}) {
  const { scrollY } = useScroll();

  // Fade in - hidden initially, visible after scrolling
  const opacity = useTransform(scrollY, [0, showAfterScroll], [0, 1]);

  // Scale from small to normal
  const scale = useTransform(scrollY, [0, showAfterScroll], [0.9, 1]);

  // Subtle rotation
  const rotate = useTransform(scrollY, [0, showAfterScroll], [0, 0]);

  // Slide up from bottom
  const y = useTransform(scrollY, [0, showAfterScroll], [50, 0]);

  return (
    <motion.div
      style={{ y, scale, rotate, opacity } as any}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={ctaHref}
        className="relative flex items-center gap-3 px-6 py-4 rounded-full hover:scale-105 transition-all group text-base font-semibold overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #B8860B 50%, #C9AE5D 75%, #D4AF37 100%)',
          border: '2px solid rgba(212, 175, 55, 0.6)',
          color: '#1a1a1a',
          boxShadow: `
            0 8px 40px rgba(212, 175, 55, 0.6),
            0 0 60px rgba(184, 134, 11, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.5),
            inset 0 -2px 0 rgba(0, 0, 0, 0.2),
            inset 0 0 20px rgba(255, 215, 0, 0.3)
          `,
        }}
      >
        {/* Metallic shine overlay - top highlight */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 via-white/20 to-transparent"
            style={{ 
              background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)',
            }}
          />
          {/* Side shine for 3D metallic effect */}
          <div
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/40 to-transparent"
            style={{ 
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            }}
          />
          {/* Subtle radial gradient for depth */}
          <div
            className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>
        
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            background: [
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            backgroundPosition: '200% 0',
          }}
        />
        
        <span className="relative z-10 drop-shadow-md font-bold">{ctaText}</span>
        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform drop-shadow-md" />
      </Link>
    </motion.div>
  );
}
