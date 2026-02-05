'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WonkaCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'candy' | 'chocolate' | 'lollipop' | 'gummy';
  animateOnHover?: boolean;
}

export default function WonkaCard({ 
  children, 
  title, 
  className = '', 
  variant = 'candy',
  animateOnHover = true
}: WonkaCardProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'chocolate':
        return 'bg-gradient-to-br from-chocolate-brown to-amber-800 border-wonka-yellow';
      case 'lollipop':
        return 'bg-gradient-to-br from-wonka-pink to-cotton-candy border-lollipop-red';
      case 'gummy':
        return 'bg-gradient-to-br from-wonka-green to-lime-300 border-wonka-blue';
      case 'candy':
      default:
        return 'wonka-card'; // Uses the CSS class defined in globals.css
    }
  };

  const cardClasses = `p-6 rounded-xl border-2 ${getVariantClasses()} ${className}`;
  
  const motionProps = animateOnHover ? {
    whileHover: { 
      y: -10,
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
        <h3 className="font-display text-xl font-bold mb-3 text-chocolate-brown">
          {title}
        </h3>
      )}
      <div className="text-charcoal">
        {children}
      </div>
    </motion.div>
  );
}