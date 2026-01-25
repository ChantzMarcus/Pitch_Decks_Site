'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { revealVariants, staggerContainer, scaleRevealVariants, slideLeftVariants, slideRightVariants } from '@/hooks/useScrollAnimations';

type RevealType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: RevealType;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  type = 'fade-up',
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });

  const getVariants = () => {
    switch (type) {
      case 'fade-left':
        return slideLeftVariants;
      case 'fade-right':
        return slideRightVariants;
      case 'scale':
        return scaleRevealVariants;
      case 'stagger':
        return staggerContainer;
      default:
        return revealVariants;
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal component (animates text word by word)
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export function TextReveal({ text, className = '', delay = 0, wordDelay = 0.04 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const words = text.split(' ');

  return (
    <div ref={ref} className={className}>
      <span className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: delay + i * wordDelay,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block mr-1.5"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </div>
  );
}

// Parallax image component
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({ src, alt, className = '', speed = 0.3 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Stagger children wrapper
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  childDelay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: childDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reveal item for use inside StaggerReveal
export function RevealItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
