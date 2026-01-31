'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle } from 'lucide-react';

interface MilestoneCelebrationProps {
  show: boolean;
  message: string;
  onComplete?: () => void;
}

/**
 * Milestone Celebration Component
 * Shows animated celebration at progress milestones
 */
export default function MilestoneCelebration({ 
  show, 
  message,
  onComplete 
}: MilestoneCelebrationProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 pointer-events-none"
          />

          {/* Celebration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                onComplete?.();
              }, 2000);
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] pointer-events-none"
          >
            <div className="bg-gradient-to-br from-accent-indigo to-accent-gold p-8 rounded-2xl shadow-2xl text-center min-w-[300px]">
              {/* Sparkles Animation */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="mb-4"
              >
                <Sparkles size={48} className="text-white mx-auto" />
              </motion.div>

              {/* Check Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <CheckCircle size={40} className="text-white mx-auto" />
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white font-display text-xl font-bold mb-2"
              >
                {message}
              </motion.p>

              {/* Confetti Effect */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    x: Math.cos((i * 30) * Math.PI / 180) * 100,
                    y: Math.sin((i * 30) * Math.PI / 180) * 100,
                    scale: [1, 1.5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: 'easeOut'
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
                  style={{
                    transform: `translate(-50%, -50%)`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
