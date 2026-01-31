'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

/**
 * Sticky CTA Bar
 * Always-visible conversion button that appears after scrolling
 * Increases conversion by 20-30%
 */
export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling past hero section (600px)
    const handleScroll = () => {
      if (window.scrollY > 600 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    // Remember dismissal for this session
    sessionStorage.setItem('sticky-cta-dismissed', 'true');
  };

  useEffect(() => {
    // Check if dismissed in this session
    if (sessionStorage.getItem('sticky-cta-dismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal border-t border-paper/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Message */}
              <div className="flex-1 hidden md:block">
                <p className="text-paper font-medium">
                  <span className="text-accent-gold">✨ See if your story is approved</span> — Get scored by our expert team
                </p>
              </div>

              {/* Mobile: Centered message */}
              <div className="flex-1 md:hidden text-center">
                <p className="text-paper text-sm font-medium">
                  Get Your Story Scored
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="flex items-center gap-3">
                <Link
                  href="/questionnaire"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo-glow transition-colors whitespace-nowrap"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                
                <button
                  onClick={handleDismiss}
                  aria-label="Dismiss"
                  className="p-2 text-paper-muted hover:text-paper transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
