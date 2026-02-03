'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Unlock } from 'lucide-react';

interface ScrollUnlockProps {
  /**
   * Content to show when locked
   */
  lockedContent: ReactNode;
  /**
   * Content to reveal when unlocked
   */
  unlockedContent: ReactNode;
  /**
   * Scroll distance required to unlock (in pixels)
   */
  unlockDistance?: number;
  /**
   * Show progress indicator
   */
  showProgress?: boolean;
  /**
   * Custom unlock message
   */
  unlockMessage?: string;
  /**
   * Callback when unlocked
   */
  onUnlock?: () => void;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ScrollUnlock Component
 * 
 * Creates a "scroll to unlock" pattern inspired by siena.film
 * - Progressive reveal as user scrolls
 * - Visual progress indicator
 * - Smooth unlock animation
 * - Creates anticipation and engagement
 * 
 * Usage:
 * ```tsx
 * <ScrollUnlock
 *   lockedContent={<LockedView />}
 *   unlockedContent={<MainContent />}
 *   unlockDistance={500}
 *   onUnlock={() => console.log('Unlocked!')}
 * />
 * ```
 */
export default function ScrollUnlock({
  lockedContent,
  unlockedContent,
  unlockDistance = 500,
  showProgress = true,
  unlockMessage = 'Scroll to unlock the immersive experience',
  onUnlock,
  className = '',
}: ScrollUnlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasTriggeredUnlock, setHasTriggeredUnlock] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', `start ${unlockDistance}px`],
  });

  // Calculate progress (0 to 1)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Opacity for locked content (fades out as you scroll)
  const lockedOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.3, 0]);
  const lockedScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Opacity for unlocked content (fades in as you scroll)
  const unlockedOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const unlockedScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.95, 1]);

  // Track progress percentage for display
  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [progress]);

  // Check if unlocked
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 1 && !hasTriggeredUnlock) {
        setIsUnlocked(true);
        setHasTriggeredUnlock(true);
        onUnlock?.();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggeredUnlock, onUnlock]);

  return (
    <div ref={containerRef} className={`scroll-unlock-container ${className}`}>
      {/* Locked Content */}
      <motion.div
        style={{
          opacity: lockedOpacity,
          scale: lockedScale,
        }}
        className="relative z-10"
      >
        {lockedContent}
      </motion.div>

      {/* Unlocked Content */}
      <motion.div
        style={{
          opacity: unlockedOpacity,
          scale: unlockedScale,
        }}
        className="relative z-20 mt-8"
      >
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {unlockedContent}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress Indicator */}
      {showProgress && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isUnlocked ? 0 : 1, y: isUnlocked ? -20 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-4 flex flex-col items-center gap-3 min-w-[280px]">
            {/* Message */}
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              {isUnlocked ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlocked!</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{unlockMessage}</span>
                </>
              )}
            </div>

            {/* Progress Bar */}
            {!isUnlocked && (
              <div className="w-full max-w-[240px] h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  style={{
                    scaleX: progress,
                    originX: 0,
                  }}
                  className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold rounded-full"
                />
              </div>
            )}

            {/* Progress Percentage */}
            {!isUnlocked && (
              <motion.div className="text-white/60 text-xs">
                {progressPercent}%
              </motion.div>
            )}

            {/* Scroll Indicator */}
            {!isUnlocked && (
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-white/40"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
