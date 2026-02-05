// Cinematic Vintage Tech Theme
// Subtle integration of 1840s-1930s elegance with modern technology

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CinematicBannerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'elegant' | 'tech' | 'vintage' | 'luxury';
  animate?: boolean;
}

export default function CinematicBanner({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  variant = 'elegant',
  animate = true
}: CinematicBannerProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'tech':
        return 'bg-gradient-to-r from-steampunk-steel to-mechanical-gear text-ivory';
      case 'vintage':
        return 'bg-gradient-to-r from-ivory to-cream text-charcoal';
      case 'luxury':
        return 'bg-gradient-to-r from-vintage-velvet to-circus-red text-ivory';
      case 'elegant':
      default:
        return 'bg-gradient-to-r from-ivory to-old-gold text-charcoal';
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
          <span className={variant === 'tech' || variant === 'luxury' ? 'text-ivory' : 'text-charcoal'}>
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
          <span className={variant === 'tech' || variant === 'luxury' ? 'text-ivory' : 'text-charcoal'}>
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