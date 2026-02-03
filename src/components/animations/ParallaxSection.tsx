'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'y' | 'x';
}

/**
 * Enhanced ParallaxSection with hybrid approach:
 * - Uses native CSS Scroll-Driven Animations when supported (better performance)
 * - Falls back to Framer Motion for older browsers
 */
export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  direction = 'y',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [supportsNativeScroll, setSupportsNativeScroll] = useState(false);

  // Check for CSS Scroll-Driven Animations support
  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports) {
      // Check if animation-timeline is supported
      const supportsTimeline = CSS.supports('animation-timeline', 'scroll()') ||
                               CSS.supports('animation-timeline', 'scroll(inline)');
      setSupportsNativeScroll(supportsTimeline);
    }
  }, []);

  // Apply native CSS scroll-driven animation when supported
  useEffect(() => {
    if (supportsNativeScroll && ref.current) {
      const element = ref.current;
      const property = direction === 'y' ? 'translateY' : 'translateX';
      const maxValue = direction === 'y' ? 100 * speed : 50 * speed;
      
      // Use CSS custom properties for native scroll-driven animations
      element.style.setProperty('--parallax-speed', String(speed));
      element.style.setProperty('--parallax-max', `${maxValue}%`);
      element.style.setProperty('--parallax-direction', direction);
      
      // Add class for CSS animations
      element.classList.add('parallax-native');
    }
  }, [supportsNativeScroll, speed, direction]);

  // Framer Motion fallback for browsers without native support
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'y' ? [0, 100 * speed] : [0, 50 * speed]
  );

  // Use native CSS when supported, otherwise use Framer Motion
  if (supportsNativeScroll) {
    return (
      <div 
        ref={ref} 
        className={`parallax-section-native ${className}`}
        style={{
          '--parallax-speed': speed,
          '--parallax-max': direction === 'y' ? `${100 * speed}%` : `${50 * speed}%`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  // Fallback to Framer Motion
  return (
    <motion.div 
      ref={ref} 
      style={{ [direction === 'y' ? 'y' : 'x']: transform }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
