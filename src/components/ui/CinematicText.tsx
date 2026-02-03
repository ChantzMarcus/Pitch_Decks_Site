'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CinematicTextProps {
  children: string;
  className?: string;
  variant?: 'title' | 'subtitle' | 'quote' | 'typewriter';
  delay?: number;
  stagger?: number;
  animateOnLoad?: boolean;
}

export default function CinematicText({
  children,
  className = '',
  variant = 'title',
  delay = 0,
  stagger = 0.05,
  animateOnLoad = true
}: CinematicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into words for animation
  const words = children.split(' ');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200
      }
    }
  };

  // For typewriter effect
  const TypewriterEffect = () => {
    return (
      <div className="overflow-hidden inline-block">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: children.length * 0.05, ease: 'easeOut' }}
          className="border-r-2 border-accent-gold pr-1 inline-block"
        >
          {children}
        </motion.div>
      </div>
    );
  };

  // Determine classes based on variant
  const baseClasses = "font-display";
  const variantClasses = {
    title: "text-cinematic-title text-4xl md:text-6xl lg:text-7xl font-bold",
    subtitle: "text-cinematic-subtitle text-lg md:text-xl text-accent-indigo",
    quote: "text-cinematic-quote text-2xl md:text-3xl italic",
    typewriter: "text-lg md:text-xl font-body"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (variant === 'typewriter') {
    return <TypewriterEffect />;
  }

  return (
    <div ref={containerRef} className={combinedClasses}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animateOnLoad ? "visible" : "visible"}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="mr-2 last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// Additional cinematic text components
export const CinematicTitle = ({ children, className = "", ...props }: CinematicTextProps) => (
  <CinematicText variant="title" className={className} {...props}>
    {children}
  </CinematicText>
);

export const CinematicSubtitle = ({ children, className = "", ...props }: CinematicTextProps) => (
  <CinematicText variant="subtitle" className={className} {...props}>
    {children}
  </CinematicText>
);

export const CinematicQuote = ({ children, className = "", ...props }: CinematicTextProps) => (
  <CinematicText variant="quote" className={className} {...props}>
    {children}
  </CinematicText>
);

export const TypewriterText = ({ children, className = "", ...props }: CinematicTextProps) => (
  <CinematicText variant="typewriter" className={className} {...props}>
    {children}
  </CinematicText>
);