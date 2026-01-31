'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Trophy } from 'lucide-react';

interface ScoreRevealProps {
  score: number;
  userName?: string;
  onComplete?: () => void;
}

/**
 * Score Reveal Animation Component
 * Dramatic reveal of the score with confetti
 */
export default function ScoreReveal({ score, userName, onComplete }: ScoreRevealProps) {
  const [showScore, setShowScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const firstName = userName?.split(' ')[0] || 'there';

  useEffect(() => {
    // Show score after 0.5s
    setTimeout(() => setShowScore(true), 500);
    // Show confetti after score appears
    setTimeout(() => setShowConfetti(true), 1000);
    // Complete after animation
    setTimeout(() => {
      onComplete?.();
    }, 3000);
  }, [onComplete]);

  return (
    <div className="relative">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(30)].map((_, i) => {
              const angle = (i * 360) / 30;
              const distance = 150 + Math.random() * 50;
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    scale: [1, 1.5, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.1,
                    ease: 'easeOut'
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: ['#6366f1', '#f59e0b', '#10b981', '#ef4444'][i % 4],
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showScore ? 1 : 0,
          scale: showScore ? 1 : 0.5
        }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: showScore ? [0, 10, -10, 0] : 0,
            scale: showScore ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: 0.6,
            delay: 0.5
          }}
          className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-accent-indigo to-accent-gold rounded-full mb-6 shadow-2xl relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Sparkles className="text-white/30" size={32} />
          </motion.div>
          <span className="text-5xl font-bold text-white relative z-10">{score}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showScore ? 1 : 0, y: showScore ? 0 : 20 }}
          transition={{ delay: 0.7 }}
          className="font-display text-3xl font-bold text-charcoal mb-2"
        >
          {score >= 80 && '🌟 Exceptional!'}
          {score >= 65 && score < 80 && '✨ Great Potential!'}
          {score >= 50 && score < 65 && '💡 Promising!'}
          {score < 50 && '📋 Under Review'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showScore ? 1 : 0 }}
          transition={{ delay: 0.9 }}
          className="text-charcoal/70"
        >
          {firstName}, your story scored {score}/100
        </motion.p>
      </motion.div>
    </div>
  );
}
