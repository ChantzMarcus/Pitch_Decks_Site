// Cinematic Vintage Tech Theme
// Subtle integration of 1840s-1930s elegance with modern technology

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CinematicCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'elegant' | 'tech' | 'vintage' | 'luxury';
  animateOnHover?: boolean;
}

export default function CinematicCard({ 
  children, 
  title, 
  className = '', 
  variant = 'elegant',
  animateOnHover = true
}: CinematicCardProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'tech':
        return 'bg-gradient-to-br from-steampunk-steel to-mechanical-gear border border-brass-dark';
      case 'vintage':
        return 'bg-gradient-to-br from-ivory to-cream border border-carnival-gold';
      case 'luxury':
        return 'bg-gradient-to-br from-vintage-velvet to-circus-red border border-gold-300';
      case 'elegant':
      default:
        return 'bg-gradient-to-br from-ivory to-old-gold border border-brass-dark';
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
          variant === 'luxury' 
            ? 'text-gold-300' 
            : variant === 'tech'
            ? 'text-gas-light-yellow'
            : 'text-vintage-velvet'
        }`}>
          {title}
        </h3>
      )}
      <div className={
        variant === 'luxury' || variant === 'tech'
          ? 'text-ivory'
          : 'text-charcoal'
      }>
        {children}
      </div>
    </motion.div>
  );
}