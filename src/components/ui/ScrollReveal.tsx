'use client';

import { motion, useInView, UseInViewOptions, Transition } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  className?: string;
  viewportMargin?: UseInViewOptions['margin'];
  once?: boolean;
}

// Custom cubic bezier easing function compatible with Framer Motion v11+
const easeBezier = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Scroll Reveal Component
 * Reveals content with a smooth animation when it enters the viewport
 * Part of 2025 scroll-triggered animation trends
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  className = '',
  viewportMargin = '-100px',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: viewportMargin,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: easeBezier,
      } as Transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Children Reveal
 * Reveals multiple items with staggered delay
 */
export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  className = '',
}: {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-50px',
  });

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: easeBezier,
          } as Transition}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
