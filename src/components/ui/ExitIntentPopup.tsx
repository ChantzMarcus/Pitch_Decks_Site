'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';

/**
 * Exit Intent Popup
 * Triggers when user moves mouse toward top of screen (leaving)
 * Can increase conversions by 15-25%
 */
export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exit-intent-shown') === 'true') {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving upward (toward address bar)
      if (e.clientY < 50 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
        // Prevent body scroll when popup is open
        document.body.style.overflow = 'hidden';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.overflow = '';
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div className="bg-charcoal rounded-2xl shadow-2xl max-w-md w-full border border-paper/10 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-paper-muted hover:text-paper transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-indigo/20 rounded-full mb-4">
                    <Sparkles className="text-accent-indigo" size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-paper mb-2">
                    Wait! Don't Miss Out
                  </h3>
                  <p className="text-paper-muted">
                    See if your story is approved by our expert team. Get your proprietary score in minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/questionnaire"
                    onClick={handleClose}
                    className="block w-full px-6 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo-glow transition-colors"
                  >
                    Get Your Story Scored Now
                  </Link>
                  
                  <button
                    onClick={handleClose}
                    className="block w-full px-6 py-4 text-paper-muted hover:text-paper transition-colors text-sm"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-6 pt-6 border-t border-paper/10">
                  <p className="text-xs text-paper-muted">
                    ✓ Free evaluation • ✓ Expert team • ✓ Industry-trusted system
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
