'use client';

import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PinnedSectionProps {
  children: ReactNode;
  /**
   * Height multiplier for the pinned section
   * e.g., 3 means section is 3x viewport height
   * Content stays pinned while scrolling through this space
   */
  heightMultiplier?: number;
  /**
   * Content to animate while section is pinned
   * This content will animate as user scrolls through the pinned section
   */
  animatedContent?: ReactNode;
  className?: string;
}

/**
 * PinnedSection Component
 * 
 * Apple-style "pinning" effect where a section stays fixed
 * while content scrolls through it. Perfect for immersive storytelling.
 * 
 * Example:
 * ```tsx
 * <PinnedSection heightMultiplier={3}>
 *   <div>This stays pinned</div>
 *   <PinnedSection.Animation>
 *     <div>This animates as you scroll</div>
 *   </PinnedSection.Animation>
 * </PinnedSection>
 * ```
 */
export default function PinnedSection({
  children,
  heightMultiplier = 3,
  animatedContent,
  className = '',
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Animate opacity/transform as user scrolls through pinned section
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className={`pinned-section ${className}`}
      style={{
        height: `${heightMultiplier * 100}vh`,
        position: 'relative',
      }}
    >
      {/* Pinned Content - stays fixed while scrolling */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            opacity,
            scale,
            y,
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
        
        {/* Animated content that changes as you scroll */}
        {animatedContent && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
            }}
          >
            {animatedContent}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * Animation wrapper for content that animates within pinned section
 */
PinnedSection.Animation = function PinnedAnimation({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pinned-animation ${className}`}>
      {children}
    </div>
  );
};
