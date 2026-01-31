'use client';

import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
}

const badges: TrustBadge[] = [
  {
    icon: <Shield size={20} />,
    label: 'Industry Trusted',
    sublabel: 'Used by top producers',
  },
  {
    icon: <Lock size={20} />,
    label: 'Secure & Confidential',
    sublabel: 'Your story is protected',
  },
  {
    icon: <Award size={20} />,
    label: 'Expert Team',
    sublabel: 'Veteran industry professionals',
  },
  {
    icon: <CheckCircle size={20} />,
    label: 'Proprietary System',
    sublabel: 'Exclusive evaluation method',
  },
];

/**
 * Trust Badges Component
 * Displays security, trust, and quality indicators
 * Reduces friction and builds confidence
 */
export default function TrustBadges({ 
  variant = 'default',
  className = '' 
}: { 
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}) {
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-6 text-sm ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-paper-muted"
          >
            <div className="text-accent-indigo">{badge.icon}</div>
            <span>{badge.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-4 bg-charcoal-light rounded-lg border border-paper/10"
          >
            <div className="text-accent-indigo mb-2">{badge.icon}</div>
            <p className="text-paper font-medium text-sm">{badge.label}</p>
            {badge.sublabel && (
              <p className="text-paper-muted text-xs mt-1">{badge.sublabel}</p>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`grid md:grid-cols-4 gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 p-6 bg-charcoal-light rounded-xl border border-paper/10"
        >
          <div className="text-accent-indigo flex-shrink-0">{badge.icon}</div>
          <div>
            <p className="text-paper font-semibold mb-1">{badge.label}</p>
            {badge.sublabel && (
              <p className="text-paper-muted text-sm">{badge.sublabel}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
