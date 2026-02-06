// src/components/PhysicsStats.tsx
'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FilmGrain from '@/components/animations/FilmGrain';
import Image from 'next/image';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Card configuration with image paths
interface CardConfig {
  imagePath: string;
  edgeGlow: string;
  sparkle: string;
}

// Map stats to the provided card images
const CARD_CONFIGS: CardConfig[] = [
  {
    imagePath: '/images/ornate-cards/card-1.png', // First card image
    edgeGlow: 'rgba(255, 215, 0, 0.8)',
    sparkle: '#FFD700',
  },
  {
    imagePath: '/images/ornate-cards/card-2.png', // Second card image
    edgeGlow: 'rgba(200, 200, 255, 0.6)',
    sparkle: '#E0E0E0',
  },
  {
    imagePath: '/images/ornate-cards/cards-grid.png', // Grid image (will use for multiple cards)
    edgeGlow: 'rgba(255, 215, 0, 0.8)',
    sparkle: '#FFD700',
  },
  {
    imagePath: '/images/ornate-cards/card-1.png',
    edgeGlow: 'rgba(255, 215, 0, 0.8)',
    sparkle: '#FFD700',
  },
  {
    imagePath: '/images/ornate-cards/card-2.png',
    edgeGlow: 'rgba(205, 127, 50, 0.7)',
    sparkle: '#CD7F32',
  },
  {
    imagePath: '/images/ornate-cards/cards-grid.png',
    edgeGlow: 'rgba(255, 215, 0, 0.8)',
    sparkle: '#FFD700',
  },
];

// Sparkle particles that appear on hover
function SparkleParticles({ count, isHovered, color }: { count: number; isHovered: boolean; color: string }) {
  if (!isHovered) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            background: color,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 0.5 + Math.random(),
          }}
        />
      ))}
    </>
  );
}

// Glow orb that appears on hover
function HoverGlowOrb({
  edgeGlow,
  isHovered
}: {
  edgeGlow: string;
  isHovered: boolean;
}) {
  if (!isHovered) return null;

  return (
    <>
      {/* Rotating outer glow orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          left: '50%',
          top: '50%',
          marginLeft: '-60px',
          marginTop: '-60px',
          background: `radial-gradient(circle, ${edgeGlow} 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Secondary inner orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '60px',
          height: '60px',
          left: '50%',
          top: '50%',
          marginLeft: '-30px',
          marginTop: '-30px',
          background: `radial-gradient(circle, ${edgeGlow} 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(15px)',
        }}
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

// Ornate Vintage Card with 3D effects using actual images
const OrnateVintageCard = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  config: CardConfig;
  index: number;
  className?: string;
}>(({ children, config, index, className = '' }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Calculate 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -8;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 8;

    setMousePos({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref || cardRef}
      className={`group relative text-center transform-gpu cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
      } as React.CSSProperties}
    >
      {/* Outer glow that intensifies on hover */}
      <div
        className="absolute -inset-2 rounded-2xl blur-md transition-all duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 80px at ${mousePos.x}% ${mousePos.y}%,
            ${config.edgeGlow} 0%,
            transparent 70%
          )`,
          opacity: isHovered ? 0.8 : 0.2,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      />

      {/* Main card with 3D perspective */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${config.edgeGlow}40`
            : '0 10px 30px rgba(0,0,0,0.5)',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Card Image Background */}
        <div className="relative w-full h-full" style={{ minHeight: '280px' }}>
          <Image
            src={config.imagePath}
            alt={`Achievement card ${index + 1}`}
            fill
            className="object-cover"
            style={{
              objectFit: 'cover',
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />

          {/* Subtle overlay only for text readability - much lighter */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Mouse-following inner glow for 3D effect */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 120px at ${mousePos.x}% ${mousePos.y}%,
                ${config.edgeGlow}25 0%,
                transparent 70%
              )`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Inner glow that pulses on hover - reduced opacity */}
          <div
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${config.edgeGlow}40 0%, transparent 70%)`,
              opacity: isHovered ? 0.4 : 0.1,
            }}
          />

          {/* Edge lighting that follows mouse */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              padding: '2px',
              background: `radial-gradient(
                ellipse 60px at ${mousePos.x}% ${mousePos.y}%,
                ${config.edgeGlow} 0%,
                transparent 80%
              )`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: isHovered ? 0.8 : 0.3,
            }}
          />

          {/* Animated shimmer sweep on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {/* Sparkle particles on hover */}
          <SparkleParticles count={6} isHovered={isHovered} color={config.sparkle} />

          {/* Hover glow orb */}
          <HoverGlowOrb edgeGlow={config.edgeGlow} isHovered={isHovered} />

          {/* Content overlay */}
          <div
            className="relative z-10 p-8 flex flex-col items-center justify-center text-center min-h-[280px] transition-all duration-500"
            style={{
              transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
            }}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

OrnateVintageCard.displayName = 'OrnateVintageCard';

interface StatItem {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  texture?: string;
}

interface PhysicsStatsProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
}

export default function PhysicsStats({
  title = "Our Impact",
  subtitle = "Numbers that speak to our success",
  stats
}: PhysicsStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    statRefs.current.forEach(stat => {
      if (stat) {
        gsap.set(stat, { opacity: 0, y: 30, scale: 0.95 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    statRefs.current.forEach((stat, index) => {
      if (stat) {
        tl.to(stat, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, index * 0.15);
      }
    });

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      tl.kill();
    };
  }, []);

  return (
    <section className="relative py-24 -mt-32 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal" />

      {/* Add subtle film grain */}
      <FilmGrain opacity={0.03} intensity="high" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Premium heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent"
                  style={{ textShadow: '0 2px 30px rgba(251, 191, 36, 0.5)' }}>
              {title}
            </span>
          </h2>
          <p className="text-lg text-paper/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={containerRef}>
          {stats.map((stat, index) => {
            const config = CARD_CONFIGS[index % CARD_CONFIGS.length];

            return (
              <OrnateVintageCard
                key={index}
                ref={el => { statRefs.current[index] = el; }}
                config={config}
                index={index}
                className=""
              >
                {/* Icon with float animation */}
                {stat.icon && (
                  <motion.div
                    className="flex justify-center mb-3"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {stat.icon}
                  </motion.div>
                )}

                {/* Main Value - Large, Bold, Metallic - unified styling */}
                <div className="relative inline-block mb-2">
                  <div
                    className="text-5xl md:text-6xl font-bold relative z-10"
                    style={{
                      color: '#FFD700',
                      textShadow: `0 3px 6px rgba(0,0,0,0.95), 0 0 20px rgba(255, 215, 0, 0.4), 0 2px 4px rgba(0,0,0,0.9)`,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(0,0,0,0.6))',
                    }}
                  >
                    {stat.value}
                  </div>
                </div>

                {/* Label - unified styling */}
                <div
                  className="text-xl md:text-2xl font-bold relative z-10"
                  style={{
                    color: '#FFD700',
                    textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 0 15px rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))',
                  }}
                >
                  {stat.label}
                </div>
              </OrnateVintageCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
