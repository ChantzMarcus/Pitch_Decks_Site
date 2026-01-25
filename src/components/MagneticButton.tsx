'use client';

import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticButton } from '@/hooks/useScrollAnimations';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  strength?: number;
}

const variantStyles = {
  primary: 'bg-charcoal text-white hover:bg-accent-indigo',
  secondary: 'bg-accent-indigo text-white hover:bg-accent-gold',
  outline: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  ghost: 'text-charcoal hover:bg-charcoal/5',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      strength = 0.3,
      ...props
    },
    externalRef
  ) => {
    const { ref: magneticRef, handleMouseMove, handleMouseLeave } = useMagneticButton(strength);

    const setRef = (element: HTMLButtonElement | null) => {
      if (element) {
        magneticRef.current = element;
        if (typeof externalRef === 'function') {
          externalRef(element);
        } else if (externalRef) {
          externalRef.current = element;
        }
      }
    };

    return (
      <motion.button
        ref={setRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        className={`
          relative inline-flex items-center justify-center gap-2
          font-medium rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

// Link variant
interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  strength?: number;
}

export const MagneticLink = forwardRef<HTMLAnchorElement, MagneticLinkProps>(
  (
    {
      children,
      href,
      variant = 'primary',
      size = 'md',
      className = '',
      strength = 0.3,
      ...props
    },
    externalRef
  ) => {
    const { ref: magneticRef, handleMouseMove, handleMouseLeave } = useMagneticButton(strength);

    const setRef = (element: HTMLAnchorElement | null) => {
      if (element) {
        magneticRef.current = element;
        if (typeof externalRef === 'function') {
          externalRef(element);
        } else if (externalRef) {
          externalRef.current = element;
        }
      }
    };

    return (
      <motion.a
        ref={setRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative inline-flex items-center justify-center gap-2
          font-medium rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }
);

MagneticLink.displayName = 'MagneticLink';
