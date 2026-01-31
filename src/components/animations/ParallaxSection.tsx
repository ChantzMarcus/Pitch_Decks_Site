'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'y' | 'x';
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  direction = 'y',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'y' ? [0, 100 * speed] : [0, 50 * speed]
  );

  return (
    <motion.div ref={ref} style={{ [direction === 'y' ? 'y' : 'x']: transform }} className={className}>
      {children}
    </motion.div>
  );
}
