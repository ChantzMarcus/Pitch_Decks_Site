'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VintageBannerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'big-top' | 'carnival' | 'steampunk' | 'gaslight' | 'vintage';
  animate?: boolean;
}

export default function VintageBanner({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  variant = 'big-top',
  animate = true
}: VintageBannerProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'carnival':
        return 'bg-gradient-to-r from-circus-red to-vintage-velvet text-ivory';
      case 'steampunk':
        return 'steampunk-bg text-ivory';
      case 'gaslight':
        return 'bg-gradient-to-r from-gas-light-yellow to-ivory text-charcoal border-4 border-brass-dark';
      case 'vintage':
        return 'bg-gradient-to-r from-ivory to-old-gold text-charcoal';
      case 'big-top':
      default:
        return 'vintage-bg-gradient text-ivory';
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
          <span className={variant === 'gaslight' || variant === 'vintage' ? 'text-charcoal' : 'text-ivory'}>
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
          <span className={variant === 'gaslight' || variant === 'vintage' ? 'text-charcoal' : 'text-ivory'}>
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