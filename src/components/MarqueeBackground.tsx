// components/MarqueeBackground.tsx - Sonar-style marquee background animations
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MarqueeBackgroundProps {
  children?: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function MarqueeBackground({
  children,
  speed = 50,
  direction = 'left',
  className = '',
}: MarqueeBackgroundProps) {
  return (
    <div className={`marquee-bg ${className}`}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          className="marquee-bg__panel"
          initial={{ scale: 0.5 - (i - 1) * 0.08 }}
          animate={{
            x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(79, 70, 229, ${0.03 - (i - 1) * 0.005})`,
            transform: `scale(${0.5 - (i - 1) * 0.08})`,
          }}
        />
      ))}
      {children}
    </div>
  );
}

// Infinite scrolling text marquee
export function InfiniteScrollText({
  text,
  speed = 20,
  direction = 'left',
  className = '',
}: {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
  );

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="inline-block">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="inline-block px-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Horizontal scroll progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent-indigo origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// Parallax scroll container
export function ParallaxContainer({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// Auto-scrolling ticker
export function Ticker({
  items,
  speed = 30,
  className = '',
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0 px-8">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
