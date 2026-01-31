'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CinematicLoaderProps {
  message?: string;
  subtext?: string;
}

export default function CinematicLoader({
  message = 'Analyzing your story...',
  subtext = 'Our AI is evaluating your concept and generating insights',
}: CinematicLoaderProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated circles */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent-indigo/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-accent-indigo/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-accent-indigo/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pulsing center */}
          <motion.div
            className="absolute inset-12 rounded-full bg-gradient-to-br from-accent-indigo to-accent-gold"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent-gold rounded-full"
              style={{
                transformOrigin: `${-80 + i * 20}px 0`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 - i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Icon with glow */}
        <motion.div
          className="mb-8 inline-block"
          animate={{
            scale: [1, 1.1, 1],
            filter: ['drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))', 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))', 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-12 h-12 text-accent-indigo" strokeWidth={1.5} />
        </motion.div>

        {/* Main message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-semibold text-white mb-3"
        >
          {message}
        </motion.p>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/70"
        >
          {subtext}
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold"
            animate={{ x: ['-100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%' }}
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-2 mt-6"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-accent-indigo rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
