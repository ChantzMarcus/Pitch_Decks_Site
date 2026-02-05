'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Global Confetti Rain - falls from top of screen continuously
 */
export function ConfettiRain({
  count = 50,
  colors = ['#FFD700', '#FFEC8B', '#F0E68C', '#C0C0C0', '#DA8A67'],
}: {
  count?: number;
  colors?: string[];
}) {
  const confetti = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: Math.random() * -100,
      size: 3 + Math.random() * 5,
      speed: 2 + Math.random() * 3,
      wobble: Math.random() * 10 - 5,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '2px',
          }}
          animate={{
            y: [p.startY, 110],
            x: [p.x, p.x + p.wobble * 5, p.x - p.wobble * 5],
            rotate: [p.rotation, p.rotation + 180],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.speed * 1000,
            delay: p.delay * 1000,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/**
 * GoldenTicketSparkles - Reusable sparkle effect component
 * Adds magical "golden ticket" dust shimmer to any element
 *
 * Usage:
 * - Wrap any element to add sparkle effects on hover
 * - Can be used on cards, buttons, sections
 */

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface GoldenTicketSparklesProps {
  children: React.ReactNode;
  /**
   * Intensity of sparkles: 'subtle' | 'medium' | 'intense' | 'explosive'
   */
  intensity?: 'subtle' | 'medium' | 'intense' | 'explosive';
  /**
   * Sparkle colors - defaults to gold/silver circus palette
   */
  colors?: string[];
  /**
   * Additional className
   */
  className?: string;
  /**
   * Enable sparkle burst on click
   */
  burstOnClick?: boolean;
  /**
   * Custom sparkle positions (for precise placement)
   */
  customSparkles?: Partial<Sparkle>[];
  /**
   * Whether sparkles should emit outward from center
   */
  emitFromCenter?: boolean;
}

// Circus/Golden Ticket color palette
const GOLDEN_TICKET_COLORS = [
  '#FFD700', // True gold
  '#FFEC8B', // Light gold
  '#FFF8DC', // Cream
  '#E6B800', // Rich gold
  '#F0E68C', // Gas light yellow
  '#C0C0C0', // Silver
  '#DA8A67', // Copper oxide
];

const INTENSITY_MAP = {
  subtle: { count: 6, size: [2, 4], duration: [1.5, 2.5] },
  medium: { count: 12, size: [2, 6], duration: [1.2, 2] },
  intense: { count: 20, size: [2, 8], duration: [0.8, 1.8] },
  explosive: { count: 35, size: [2, 10], duration: [0.5, 1.5] },
};

export function GoldenTicketSparkles({
  children,
  intensity = 'medium',
  colors = GOLDEN_TICKET_COLORS,
  className = '',
  burstOnClick = false,
  customSparkles,
  emitFromCenter = false,
}: GoldenTicketSparklesProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isBursting, setIsBursting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate sparkle positions
  const generateSparkles = useCallback((burst = false) => {
    const settings = INTENSITY_MAP[intensity];
    const count = burst ? settings.count * 2 : settings.count;
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return [];

    const newSparkles: Sparkle[] = [];
    const width = rect?.width || 300;
    const height = rect?.height || 200;

    for (let i = 0; i < count; i++) {
      const isCenterEmit = emitFromCenter && burst;
      newSparkles.push({
        id: Date.now() + i,
        x: isCenterEmit
          ? width / 2
          : Math.random() * width,
        y: isCenterEmit
          ? height / 2
          : Math.random() * height,
        size: settings.size[0] + Math.random() * (settings.size[1] - settings.size[0]),
        delay: Math.random() * (burst ? 0.3 : 0.5),
        duration: settings.duration[0] + Math.random() * (settings.duration[1] - settings.duration[0]),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return newSparkles;
  }, [intensity, colors, emitFromCenter]);

  // Burst animation on click
  const triggerBurst = useCallback(() => {
    const burstSparkles = generateSparkles(true);
    setSparkles(burstSparkles);
    setIsBursting(true);

    // Clear after animation
    setTimeout(() => {
      setSparkles([]);
      setIsBursting(false);
    }, 1500);
  }, [generateSparkles]);

  // Hover effect
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!burstOnClick && !customSparkles) {
      setSparkles(generateSparkles(false));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isBursting && !customSparkles) {
      setSparkles([]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={burstOnClick ? triggerBurst : undefined}
    >
      {children}

      {/* Sparkles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {(customSparkles || sparkles).map((sparkle) => {
          const isVisible = isHovered || isBursting;

          return (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: sparkle.size ?? 4,
                height: sparkle.size ?? 4,
                backgroundColor: sparkle.color,
                boxShadow: `0 0 ${(sparkle.size ?? 4) * 1.5}px ${sparkle.color}80`,
              }}
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={isVisible ? {
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
                x: emitFromCenter ? [
                  0,
                  (Math.random() - 0.5) * 100,
                  (Math.random() - 0.5) * 100
                ] : 0,
                y: emitFromCenter ? [
                  0,
                  (Math.random() - 0.5) * 100,
                  (Math.random() - 0.5) * 100
                ] : 0,
              } : {
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: (sparkle.duration ?? 1.5) * 1000,
                delay: (sparkle.delay ?? 0) * 1000,
                repeat: isVisible ? Infinity : 0,
                repeatType: isVisible ? 'loop' : undefined,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * Floating ambient particles background for sections
 * Adds subtle golden ticket dust throughout sections
 */
export function FloatingParticlesBackground({
  count = 30,
  colors = GOLDEN_TICKET_COLORS,
  className = '',
}: {
  count?: number;
  colors?: string[];
  className?: string;
}) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 1.2}px ${p.color}60`,
          }}
          animate={{
            y: [p.y, p.y - 20, p.y],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Scroll-triggered golden dust trail
 * Creates a trail of sparkles following scroll position
 */
export function ScrollSparkleTrail({
  enabled = true,
  colors = GOLDEN_TICKET_COLORS,
}: {
  enabled?: boolean;
  colors?: string[];
}) {
  const [scrollY, setScrollY] = useState(0);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; progress: number }>>([]);

  useEffect(() => {
    if (!enabled) return;

    let lastScroll = 0;
    let sparkleIdCounter = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDelta = Math.abs(currentScroll - lastScroll);

      // Only add sparkles when scrolling
      if (scrollDelta > 10) {
        const newSparkle = {
          id: sparkleIdCounter++,
          x: Math.random() * 100,
          y: 50 + (Math.random() - 0.5) * 30, // Near center vertically
          progress: 0,
        };
        setSparkles(prev => [...prev.slice(-15), newSparkle]); // Keep last 15

        lastScroll = currentScroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled]);

  // Animate sparkles
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setSparkles(prev =>
        prev.map(sparkle => ({
          ...sparkle,
          progress: Math.min(sparkle.progress + 0.02, 1),
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((sparkle) => {
        const yPos = sparkle.y + (1 - sparkle.progress) * -100; // Float upward as progress increases
        const scale = sparkle.progress < 0.3 ? 0 : sparkle.progress < 0.7 ? 1 : 0; // Grow then shrink

        return (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${yPos}%`,
              width: 3,
              height: 3,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              boxShadow: `0 0 6px ${colors[Math.floor(Math.random() * colors.length)]}80`,
            }}
            animate={{
              scale,
              opacity: sparkle.progress < 0.2 ? 0 : sparkle.progress < 0.8 ? 1 : 0,
            }}
            transition={{
              duration: 30,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Burst celebration effect for buttons
 * Explodes sparkles outward on click
 */
export function SparkleBurst({
  trigger,
  x = 50,
  y = 50,
  colors = GOLDEN_TICKET_COLORS,
  count = 20,
}: {
  trigger: boolean;
  x?: number;
  y?: number;
  colors?: string[];
  count?: number;
}) {
  const [burst, setBurst] = useState<Array<{ id: number; angle: number; distance: number; progress: number }>>([]);

  useEffect(() => {
    if (trigger) {
      const newBurst = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / count) * 360,
        distance: 0,
        progress: 0,
      }));
      setBurst(newBurst);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {burst.map((particle) => {
        const distance = particle.distance * particle.progress * 150; // Expand outward
        const burstX = x + Math.cos((particle.angle * Math.PI) / 180) * distance;
        const burstY = y + Math.sin((particle.angle * Math.PI) / 180) * distance;
        const scale = particle.progress * 1;
        const opacity = 1 - particle.progress;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${burstX}%`,
              top: `${burstY}%`,
              width: 4,
              height: 4,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              boxShadow: `0 0 8px ${colors[Math.floor(Math.random() * colors.length)]}`,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
            animate={{
              scale: [0, 1, 0.5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 800,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Button with integrated sparkle effects
 */
export function SparkleButton({
  children,
  onClick,
  intensity = 'medium',
  variant = 'gold',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  intensity?: 'subtle' | 'medium' | 'intense';
  variant?: 'gold' | 'silver' | 'circus';
  className?: string;
}) {
  const [isTriggered, setIsTriggered] = useState(false);

  const handleClick = () => {
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 1000);
    onClick?.();
  };

  const variantColors = {
    gold: ['#FFD700', '#FFEC8B', '#E6B800', '#F0E68C'],
    silver: ['#C0C0C0', '#E8E8E8', '#D4D4D4', '#FFFFFF'],
    circus: ['#DC143C', '#FF69B4', '#32CD32', '#FFD700'],
  }[variant];

  return (
    <>
      <SparkleBurst trigger={isTriggered} colors={variantColors} count={INTENSITY_MAP[intensity].count} />
      <GoldenTicketSparkles intensity={intensity} colors={variantColors} burstOnClick className={className}>
        <div onClick={handleClick} className="inline-block relative">
          {children}
        </div>
      </GoldenTicketSparkles>
    </>
  );
}
