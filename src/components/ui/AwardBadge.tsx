// src/components/ui/AwardBadge.tsx
'use client';

import { motion } from 'framer-motion';
import { Award, Star, Trophy, Film } from 'lucide-react';
import { useState } from 'react';

export type BadgeType = 'award' | 'star' | 'trophy' | 'festival' | 'selection';

export interface BadgeProps {
  type: BadgeType;
  title: string;
  year?: number;
  description?: string;
  testimonial?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  showOnHover?: boolean;
}

const badgeConfig = {
  award: {
    icon: Award,
    colors: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  star: {
    icon: Star,
    colors: 'from-indigo-500 to-purple-600',
    bgGradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  trophy: {
    icon: Trophy,
    colors: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  festival: {
    icon: Film,
    colors: 'from-rose-500 to-pink-600',
    bgGradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  selection: {
    icon: Star,
    colors: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    textColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
};

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

const positionClasses = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

export default function AwardBadge({
  type,
  title,
  year,
  description,
  testimonial,
  position = 'top-right',
  size = 'md',
  showOnHover = false,
}: BadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} ${showOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onHoverStart={() => testimonial && setIsExpanded(true)}
      onHoverEnd={() => testimonial && setIsExpanded(false)}
    >
      {/* Compact Badge */}
      <motion.div
        className={`relative ${config.bgGradient} rounded-full flex items-center justify-center shadow-lg cursor-pointer ${sizeClasses[size]}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="text-white" strokeWidth={2.5} />

        {/* Animated glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${config.bgGradient} opacity-50`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Expanded Details on Hover */}
      {testimonial && (
        <motion.div
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8,
            y: isExpanded ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
          className={`absolute ${position.includes('top') ? 'top-full mt-2' : 'bottom-full mb-2'} ${position.includes('left') ? 'left-0' : 'right-0'} w-48 ${config.bgColor} rounded-lg shadow-xl p-3 z-50`}
        >
          <div className={`${config.textColor} font-semibold text-sm mb-1`}>
            {title}
            {year && <span className="ml-1 opacity-70">({year})</span>}
          </div>
          {description && (
            <p className="text-charcoal/70 text-xs mb-2">{description}</p>
          )}
          {testimonial && (
            <p className="text-charcoal/60 text-xs italic">"{testimonial}"</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Quick preset badges for common use cases
export function OfficialSelectionBadge() {
  return (
    <AwardBadge
      type="selection"
      title="Official Selection"
      description="Film Festival"
    />
  );
}

export function AwardWinnerBadge({ festival }: { festival: string }) {
  return (
    <AwardBadge
      type="award"
      title="Winner"
      description={festival}
    />
  );
}

export function StarBadge() {
  return (
    <AwardBadge
      type="star"
      title="Top Rated"
      description="Audience Favorite"
    />
  );
}
