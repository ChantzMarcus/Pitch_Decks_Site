'use client';

import { motion } from 'framer-motion';

interface GoldenHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  tagline?: string;
  variant?: 'gold' | 'silver' | 'red-velvet' | 'purple-velvet';
  className?: string;
}

const gradientStyles = {
  gold: 'from-amber-200 via-amber-400 via-yellow-500 to-amber-600',
  silver: 'from-gray-200 via-silver-300 via-silver-400 to-gray-400',
  'red-velvet': 'from-red-300 via-rose-400 via-red-500 to-red-700',
  'purple-velvet': 'from-purple-300 via-violet-400 via-purple-500 to-purple-700',
};

const shadowStyles = {
  gold: '0 2px 20px rgba(251, 191, 36, 0.3)',
  silver: '0 2px 20px rgba(192, 192, 192, 0.3)',
  'red-velvet': '0 2px 20px rgba(225, 29, 72, 0.4)',
  'purple-velvet': '0 2px 20px rgba(147, 51, 234, 0.4)',
};

export function GoldenHeading({
  children,
  subtitle,
  tagline,
  variant = 'gold',
  className = '',
}: GoldenHeadingProps) {
  const gradient = gradientStyles[variant];
  const shadow = shadowStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      {/* Decorative top lines */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-16" style={{
          background: `linear-gradient(to right, transparent, ${variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA'}, transparent)`
        }} />
        <div className="w-3 h-3 rotate-45 border" style={{
          borderColor: variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA',
          backgroundColor: `${variant === 'gold' ? 'rgba(251, 191, 36, 0.2)' : variant === 'silver' ? 'rgba(192, 192, 192, 0.2)' : variant === 'red-velvet' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(167, 139, 250, 0.2)'}`
        }} />
        <div className="h-px w-16" style={{
          background: `linear-gradient(to left, transparent, ${variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA'}, transparent)`
        }} />
      </div>

      <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
        <span
          className={`bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
          style={{ textShadow: shadow }}
        >
          {children}
        </span>
      </h2>

      {subtitle && (
        <p
          className={`text-xl max-w-3xl mx-auto ${variant === 'gold' ? 'text-amber-200/70' : variant === 'silver' ? 'text-gray-200/70' : variant === 'red-velvet' ? 'text-red-200/70' : 'text-purple-200/70'}`}
        >
          {subtitle}
        </p>
      )}

      {tagline && (
        <p className="mt-4 text-paper/60 italic font-serif">
          "{tagline}"
        </p>
      )}

      {/* Decorative bottom lines */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="h-px w-16" style={{
          background: `linear-gradient(to right, transparent, ${variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA'}, transparent)`
        }} />
        <div className="w-2 h-2 rotate-45 border" style={{
          borderColor: variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA'
        }} />
        <div className="h-px w-16" style={{
          background: `linear-gradient(to left, transparent, ${variant === 'gold' ? '#FBBF24' : variant === 'silver' ? '#C0C0C0' : variant === 'red-velvet' ? '#F87171' : '#A78BFA'}, transparent)`
        }} />
      </div>
    </motion.div>
  );
}

// Simplified version for inline use
export function GoldenText({
  children,
  variant = 'gold',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'gold' | 'silver' | 'red-velvet' | 'purple-velvet';
  className?: string;
}) {
  const gradient = gradientStyles[variant];
  const shadow = shadowStyles[variant];

  return (
    <span
      className={`bg-gradient-to-br ${gradient} bg-clip-text text-transparent ${className}`}
      style={{ textShadow: shadow }}
    >
      {children}
    </span>
  );
}
