'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
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

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    (buttonRef.current as any).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    (buttonRef.current as any).style.transform = 'translate(0, 0)';
  };

  return (
    <motion.button
      ref={buttonRef}
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

// Link variant
interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  strength?: number;
}

export function MagneticLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  strength = 0.3,
  ...props
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = linkRef.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    (linkRef.current as any).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (!linkRef.current) return;
    (linkRef.current as any).style.transform = 'translate(0, 0)';
  };

  return (
    <motion.a
      ref={linkRef}
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
