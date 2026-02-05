'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WonkaBannerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'factory' | 'entrance' | 'golden-ticket' | 'candy-aisle';
  animate?: boolean;
}

export default function WonkaBanner({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  variant = 'factory',
  animate = true
}: WonkaBannerProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'factory':
        return 'wonka-bg-gradient text-white';
      case 'entrance':
        return 'bg-gradient-to-r from-wonka-yellow to-wonka-orange text-chocolate-brown';
      case 'golden-ticket':
        return 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-chocolate-brown border-4 border-gold';
      case 'candy-aisle':
        return 'wonka-candy-stripes text-white';
      default:
        return 'wonka-bg-gradient text-white';
    }
  };

  const bannerClasses = `p-8 md:p-12 rounded-2xl ${getVariantClasses()} ${className}`;
  
  const containerMotion = animate ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {};

  return (
    <motion.div 
      className={bannerClasses} 
      {...containerMotion}
    >
      {title && (
        <motion.h1 
          className="font-display text-4xl md:text-6xl font-bold mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <span className={variant === 'golden-ticket' ? 'text-chocolate-brown' : 'text-white'}>
            {title}
          </span>
        </motion.h1>
      )}
      
      {subtitle && (
        <motion.p 
          className="font-body text-xl md:text-2xl mb-6 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className={variant === 'golden-ticket' ? 'text-chocolate-brown' : 'text-white'}>
            {subtitle}
          </span>
        </motion.p>
      )}
      
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}