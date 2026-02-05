// Cinematic Vintage Tech Theme
// Subtle integration of 1840s-1930s elegance with modern technology

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CinematicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'elegant' | 'tech' | 'vintage' | 'luxury';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function CinematicButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'elegant',
  size = 'md',
  disabled = false
}: CinematicButtonProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'tech':
        return 'bg-gradient-to-r from-steampunk-steel to-mechanical-gear text-ivory border border-brass-dark';
      case 'vintage':
        return 'bg-gradient-to-r from-ivory to-cream text-charcoal border border-carnival-gold';
      case 'luxury':
        return 'bg-gradient-to-r from-vintage-velvet to-circus-red text-ivory border border-gold-300';
      case 'elegant':
      default:
        return 'bg-gradient-to-r from-old-gold to-carnival-gold text-charcoal border border-brass-dark';
    }
  };

  const getSizeClasses = () => {
    switch(size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-8 py-3 text-lg';
      case 'md':
      default:
        return 'px-6 py-2 text-base';
    }
  };

  const baseClasses = `font-bold text-center rounded-full transition-all duration-300 transform ${getSizeClasses()} ${getVariantClasses()} ${className}`;
  
  if (disabled) {
    return (
      <span className={`${baseClasses} opacity-50 cursor-not-allowed`}>
        {children}
      </span>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}