'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function StickyScoreCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if user has dismissed before
    const dismissed = localStorage.getItem('sticky-cta-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling 300px
      if (scrollY > 300) {
        setHasScrolled(true);
      }
    };

    // Show after 3 seconds on page
    const timer = setTimeout(() => {
      if (hasScrolled) {
        setIsVisible(true);
      }
    }, 3000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasScrolled]);

  // Show after 3 seconds if user has scrolled
  useEffect(() => {
    if (hasScrolled && !isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasScrolled, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('sticky-cta-dismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop - Bottom right floating button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 hidden md:block"
          >
            <Link
              href="/questionnaire"
              className="group relative flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3 rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
            >
              {/* Animated glow */}
              <motion.span
                className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Icon */}
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Star size={20} fill="currentColor" />
                </motion.div>
              </div>

              {/* Text */}
              <div className="relative z-10">
                <span className="font-bold text-lg">Get Your Free Score</span>
              </div>

              {/* Trending icon */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TrendingUp size={18} />
              </motion.div>

              {/* Dismiss button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDismiss();
                }}
                className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-1 transition-colors"
                aria-label="Dismiss"
              >
                <X size={12} />
              </button>
            </Link>
          </motion.div>

          {/* Mobile - Bottom bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom"
          >
            <Link
              href="/questionnaire"
              className="block"
            >
              <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 mx-2 mb-2 rounded-t-2xl">
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 bg-amber-400/30 blur-xl rounded-t-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Star size={24} fill="white" className="text-white" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-lg">Get Your Free Score</div>
                      <div className="text-xs text-white/80">Interactive film analysis</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <TrendingUp size={20} />
                    </motion.div>
                  </div>

                  {/* Dismiss button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDismiss();
                    }}
                    className="absolute -top-8 right-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2 transition-colors"
                    aria-label="Dismiss"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
