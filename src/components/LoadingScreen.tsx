// components/LoadingScreen.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum display time in ms
}

export default function LoadingScreen({ onComplete, minDuration = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Hide loading screen after min duration
    const timeout = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, remaining);
    }, minDuration);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal pointer-events-none"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="text-paper font-display text-4xl md:text-6xl font-bold">
                PITCH DECKS
              </div>

              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-accent-indigo"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-0.5 bg-paper/20 overflow-hidden">
              <motion.div
                className="h-full bg-accent-indigo"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading lines - Sonar-style */}
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-8 bg-paper/40"
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
