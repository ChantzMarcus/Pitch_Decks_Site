'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp } from 'lucide-react';

/**
 * Urgency Counter Component
 * Shows social proof numbers that create FOMO
 * Updates periodically to show activity
 */
export default function UrgencyCounter({
  variant = 'default',
  className = '',
}: {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}) {
  const [count, setCount] = useState(47);
  const [funding, setFunding] = useState(287);

  useEffect(() => {
    // Simulate activity - increment every 30-60 seconds
    const interval = setInterval(() => {
      setCount((prev) => {
        // Random increment between 1-3
        const increment = Math.floor(Math.random() * 3) + 1;
        return prev + increment;
      });
      
      // Occasionally update funding (every 3rd update)
      if (Math.random() > 0.66) {
        setFunding((prev) => prev + Math.floor(Math.random() * 5) + 1);
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-6 text-sm ${className}`}>
        <div className="flex items-center gap-2 text-paper-muted">
          <Users size={16} className="text-accent-indigo" />
          <span>
            <span className="text-accent-gold font-semibold">{count}+</span> creators this week
          </span>
        </div>
        <div className="flex items-center gap-2 text-paper-muted">
          <TrendingUp size={16} className="text-accent-gold" />
          <span>
            <span className="text-accent-gold font-semibold">${funding}M+</span> secured
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        <motion.div
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Users className="text-accent-indigo" size={20} />
          <div>
            <div className="text-2xl font-bold text-paper">{count}+</div>
            <div className="text-xs text-paper-muted">Creators this week</div>
          </div>
        </motion.div>
        <motion.div
          key={funding}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <TrendingUp className="text-accent-gold" size={20} />
          <div>
            <div className="text-2xl font-bold text-paper">${funding}M+</div>
            <div className="text-xs text-paper-muted">Funding secured</div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Default variant - Card style
  return (
    <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
      <motion.div
        key={count}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-accent-indigo/20 to-transparent p-6 rounded-xl border border-accent-indigo/30"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent-indigo/20 rounded-xl flex items-center justify-center">
            <Users className="text-accent-indigo" size={24} />
          </div>
          <div>
            <motion.div
              key={count}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-paper"
            >
              {count}+
            </motion.div>
            <div className="text-paper-muted text-sm mt-1">Creators joined this week</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        key={funding}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-accent-gold/20 to-transparent p-6 rounded-xl border border-accent-gold/30"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-accent-gold" size={24} />
          </div>
          <div>
            <motion.div
              key={funding}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-paper"
            >
              ${funding}M+
            </motion.div>
            <div className="text-paper-muted text-sm mt-1">Total funding secured</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
