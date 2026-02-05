'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VintageCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'circus' | 'steampunk' | 'vintage' | 'big-top';
  animateOnHover?: boolean;
}

export default function VintageCard({ 
  children, 
  title, 
  className = '', 
  variant = 'vintage',
  animateOnHover = true
}: VintageCardProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'circus':
        return 'circus-card';
      case 'steampunk':
        return 'steampunk-card';
      case 'big-top':
        return 'circus-card bg-gradient-to-br from-circus-red to-vintage-velvet border-carnival-gold';
      case 'vintage':
      default:
        return 'bg-gradient-to-br from-ivory to-cream border-2 border-carnival-gold';
    }
  };

  const cardClasses = `p-6 rounded-xl relative ${getVariantClasses()} ${className}`;
  
  const motionProps = animateOnHover ? {
    whileHover: { 
      y: -5,
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div 
      className={cardClasses} 
      {...motionProps}
    >
      {title && (
        <h3 className={`font-display text-xl font-bold mb-3 ${
          variant === 'circus' || variant === 'big-top' 
            ? 'text-carnival-gold' 
            : 'text-vintage-velvet'
        }`}>
          {title}
        </h3>
      )}
      <div className={
        variant === 'circus' || variant === 'big-top'
          ? 'text-ivory'
          : 'text-charcoal'
      }>
        {children}
      </div>
    </motion.div>
  );
}