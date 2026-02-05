'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VintageButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'circus' | 'steampunk' | 'vintage' | 'gaslight';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function VintageButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'vintage',
  size = 'md',
  disabled = false
}: VintageButtonProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'circus':
        return 'circus-button';
      case 'steampunk':
        return 'steampunk-button';
      case 'gaslight':
        return 'bg-gradient-to-r from-gas-light-yellow to-carnival-gold text-charcoal border-2 border-brass-dark';
      case 'vintage':
      default:
        return 'bg-gradient-to-r from-old-gold to-carnival-gold text-charcoal border-2 border-brass-dark';
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