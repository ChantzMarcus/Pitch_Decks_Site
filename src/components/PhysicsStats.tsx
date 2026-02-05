// src/components/PhysicsStats.tsx
'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FilmGrain from '@/components/animations/FilmGrain';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Rich metallic configurations with multiple gradient layers
const METALLIC_TEXTURES = {
  gold: {
    // Bright golden-yellow - classic gold
    base: 'linear-gradient(145deg, #FFF700 0%, #FFD700 20%, #FFC700 40%, #DAA520 60%, #FFC700 80%, #FFD700 100%)',
    highlight: 'linear-gradient(135deg, rgba(255,255,224,0.9) 0%, rgba(255,255,224,0.4) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(184,134,11,0.4) 100%)',
    edgeGlow: 'rgba(255, 215, 0, 0.8)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(255,215,0,0.4) 0%, transparent 70%)',
    sparkle: '#FFD700',
    textGradient: 'linear-gradient(180deg, #FFD700 0%, #DAA520 50%, #FFD700 100%)',
  },
  silver: {
    // Cool gray metallic
    base: 'linear-gradient(145deg, #F8F8F8 0%, #D3D3D3 20%, #A8A8A8 40%, #808080 60%, #A8A8A8 80%, #D3D3D3 100%)',
    highlight: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(100,100,100,0.4) 100%)',
    edgeGlow: 'rgba(200, 200, 255, 0.6)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(220,220,255,0.4) 0%, transparent 70%)',
    sparkle: '#E0E0E0',
    textGradient: 'linear-gradient(180deg, #E0E0E0 0%, #909090 50%, #E0E0E0 100%)',
  },
  bronze: {
    // Deep brown-bronze
    base: 'linear-gradient(145deg, #CD7F32 0%, #8B4513 25%, #654321 50%, #8B4513 75%, #CD7F32 100%)',
    highlight: 'linear-gradient(135deg, rgba(255,200,150,0.5) 0%, rgba(255,200,150,0.2) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(60,40,20,0.5) 100%)',
    edgeGlow: 'rgba(205, 127, 50, 0.7)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(205,127,50,0.3) 0%, transparent 70%)',
    sparkle: '#CD7F32',
    textGradient: 'linear-gradient(180deg, #CD7F32 0%, #654321 50%, #CD7F32 100%)',
  },
  brass: {
    // Yellow-tan brass (much lighter than bronze)
    base: 'linear-gradient(145deg, #FFF8DC 0%, #F5DEB3 20%, #DEB887 40%, #DAA520 60%, #F5DEB3 80%, #FFF8DC 100%)',
    highlight: 'linear-gradient(135deg, rgba(255,250,220,0.9) 0%, rgba(255,250,220,0.4) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(180,160,100,0.4) 100%)',
    edgeGlow: 'rgba(245, 222, 179, 0.7)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(245,222,179,0.3) 0%, transparent 70%)',
    sparkle: '#F5DEB3',
    textGradient: 'linear-gradient(180deg, #F5DEB3 0%, #DAA520 50%, #F5DEB3 100%)',
  },
  copper: {
    // Reddish-copper (distinct from both bronze and brass)
    base: 'linear-gradient(145deg, #FFB6A1 0%, #E6A57D 20%, #C87F5E 40%, #A0522D 60%, #C87F5E 80%, #FFB6A1 100%)',
    highlight: 'linear-gradient(135deg, rgba(255,200,180,0.7) 0%, rgba(255,200,180,0.3) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(139,69,19,0.5) 100%)',
    edgeGlow: 'rgba(255, 140, 100, 0.7)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(255,140,100,0.3) 0%, transparent 70%)',
    sparkle: '#E6A57D',
    textGradient: 'linear-gradient(180deg, #FFB6A1 0%, #A0522D 50%, #E6A57D 100%)',
  },
};

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
  texture,
  isHovered
}: {
  texture: keyof typeof METALLIC_TEXTURES;
  isHovered: boolean;
}) {
  if (!isHovered) return null;

  const config = METALLIC_TEXTURES[texture];

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
          background: `radial-gradient(circle, ${config.edgeGlow} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${config.edgeGlow} 0%, transparent 70%)`,
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

// Premium Metallic Card with 3D effects and rich layering
const PremiumMetallicCard = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  texture: keyof typeof METALLIC_TEXTURES;
  className?: string;
}>(({ children, texture = 'gold', className = '' }, ref) => {
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
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -8; // Max 8deg rotation
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 8;

    setMousePos({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 50, y: 50 });
    setTilt({ x: 0, y: 0 });
  };

  const config = METALLIC_TEXTURES[texture];

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
        className="absolute -inset-3 rounded-3xl blur-md transition-all duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 100px at ${mousePos.x}% ${mousePos.y}%,
            ${config.edgeGlow} 0%,
            transparent 70%
          )`,
          opacity: isHovered ? 1 : 0.3,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      />

      {/* Main card with 3D perspective */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: config.base,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 25px 50px rgba(0,0,0,0.3), 0 0 30px ${config.edgeGlow}40`
            : '0 10px 30px rgba(0,0,0,0.2)',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Multiple metallic layers for depth */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base metallic gradient */}
          <div className="absolute inset-0" style={{ background: config.base }} />

          {/* Top highlight layer - creates shine */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: config.highlight,
              opacity: isHovered ? 1 : 0.7,
            }}
          />

          {/* Shadow layer at bottom */}
          <div className="absolute inset-0" style={{ background: config.shadow }} />

          {/* Mouse-following inner glow for 3D effect */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(
                ellipse 150px at ${mousePos.x}% ${mousePos.y}%,
                ${config.edgeGlow}30 0%,
                transparent 70%
              )`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Inner glow that pulses on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: config.innerGlow,
              opacity: isHovered ? 1 : 0.3,
            }}
          />

          {/* Brushed metal texture lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(255,255,255,0.05) 1px,
                transparent 2px,
                transparent 100px
              )`,
            }}
          />

          {/* Subtle grain for realism */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Edge lighting that follows mouse */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            padding: '2px',
            background: `radial-gradient(
              ellipse 80px at ${mousePos.x}% ${mousePos.y}%,
              ${config.edgeGlow} 0%,
              transparent 80%
            )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Animated shimmer sweep on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {/* Sparkle particles on hover */}
        <SparkleParticles count={8} isHovered={isHovered} color={config.sparkle} />

        {/* Hover glow orb */}
        <HoverGlowOrb texture={texture} isHovered={isHovered} />

        {/* Content */}
        <div
          className="relative z-10 p-8 transition-all duration-500"
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
});

PremiumMetallicCard.displayName = 'PremiumMetallicCard';

interface StatItem {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  texture?: keyof typeof METALLIC_TEXTURES;
}

interface PhysicsStatsProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
}

// Default texture rotation
const TEXTURE_ORDER: (keyof typeof METALLIC_TEXTURES)[] = ['gold', 'brass', 'copper', 'silver', 'bronze'];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10" ref={containerRef}>
          {stats.map((stat, index) => {
            const texture = stat.texture || TEXTURE_ORDER[index % TEXTURE_ORDER.length];
            const config = METALLIC_TEXTURES[texture];

            return (
              <PremiumMetallicCard
                key={index}
                ref={el => { statRefs.current[index] = el; }}
                texture={texture}
                className=""
              >
                {/* Icon with float animation */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="p-4 rounded-full" style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    {stat.icon}
                  </div>
                </motion.div>

                {/* Number with metallic gradient */}
                <div className="relative inline-block mb-3">
                  <div
                    className="text-6xl md:text-7xl font-bold relative z-10"
                    style={{
                      background: config.textGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                    }}
                  >
                    {stat.value}
                  </div>
                </div>

                {/* Label */}
                <div className="text-base font-semibold tracking-wide relative z-10" style={{
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}>
                  {stat.label}
                </div>
              </PremiumMetallicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
