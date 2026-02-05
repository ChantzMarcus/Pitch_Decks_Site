'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WonkaButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'caramel' | 'chocolate' | 'lollipop' | 'gum' | 'pop';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function WonkaButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'lollipop',
  size = 'md',
  disabled = false
}: WonkaButtonProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'caramel':
        return 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900';
      case 'chocolate':
        return 'bg-gradient-to-r from-chocolate-brown to-amber-900 hover:from-amber-800 hover:to-amber-950';
      case 'lollipop':
        return 'wonka-button'; // Uses the CSS class defined in globals.css
      case 'gum':
        return 'bg-gradient-to-r from-wonka-pink to-cotton-candy hover:from-pink-400 hover:to-pink-300';
      case 'pop':
        return 'bg-gradient-to-r from-wonka-red to-lollipop-red hover:from-red-500 hover:to-red-600';
      default:
        return 'wonka-button';
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

  const baseClasses = `font-bold text-white rounded-full transition-all duration-300 transform ${getSizeClasses()} ${getVariantClasses()} ${className}`;
  
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