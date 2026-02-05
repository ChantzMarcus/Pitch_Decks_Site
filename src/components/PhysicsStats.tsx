// src/components/PhysicsStats.tsx
'use client';

import { useEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FilmGrain from '@/components/animations/FilmGrain';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Texture type definition
interface MetallicTexture {
  base: string;
  highlight: string;
  shadow: string;
  edgeGlow: string;
  innerGlow: string;
  sparkle: string;
  textGradient: string;
  isVelvet?: boolean;
  velvetColor?: string;
}

// Rich metallic configurations with multiple gradient layers
const METALLIC_TEXTURES: Record<string, MetallicTexture> = {
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
  platinum: {
    // Icy white-platinum with blue undertones
    base: 'linear-gradient(145deg, #E8E8E8 0%, #D4D4D4 15%, #C0C0C0 30%, #A8A8B0 50%, #B0B0B8 70%, #C8C8D0 85%, #E0E0E8 100%)',
    highlight: 'linear-gradient(135deg, rgba(200,210,255,0.8) 0%, rgba(200,210,255,0.3) 30%, transparent 60%)',
    shadow: 'linear-gradient(180deg, transparent 0%, rgba(100,100,120,0.4) 100%)',
    edgeGlow: 'rgba(180, 190, 255, 0.7)',
    innerGlow: 'radial-gradient(ellipse at center, rgba(180,190,255,0.3) 0%, transparent 70%)',
    sparkle: '#D0D0D8',
    textGradient: 'linear-gradient(180deg, #E0E0E8 0%, #A0A0A8 50%, #C8C8D0 100%)',
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
  texture: string;
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

// Premium Metallic/Velvet Card with 3D effects and rich layering
const PremiumMetallicCard = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  texture: string;
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
          background: config.base,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.4), 0 0 25px ${config.edgeGlow}30`
            : '0 8px 25px rgba(0,0,0,0.3)',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Multiple texture layers for depth */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0" style={{ background: config.base }} />

          {/* Top highlight layer - creates shine */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: config.highlight,
              opacity: isHovered ? 1 : 0.6,
            }}
          />

          {/* Shadow layer at bottom */}
          <div className="absolute inset-0" style={{ background: config.shadow }} />

          {/* Mouse-following inner glow for 3D effect */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(
                ellipse 120px at ${mousePos.x}% ${mousePos.y}%,
                ${config.edgeGlow}25 0%,
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
              opacity: isHovered ? 0.8 : 0.2,
            }}
          />

          {/* Brushed metal texture lines */}
          <div
            className="absolute inset-0 opacity-15"
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
            className="absolute inset-0 opacity-8"
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
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {/* Sparkle particles on hover */}
        <SparkleParticles count={6} isHovered={isHovered} color={config.sparkle} />

        {/* Hover glow orb */}
        <HoverGlowOrb texture={texture} isHovered={isHovered} />

        {/* Content with dark backing for text visibility */}
        <div
          className="relative z-10 px-5 py-6 transition-all duration-500"
          style={{
            transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
            // Add subtle text shadow backing for better visibility
            textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)',
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
  texture?: string;
}

interface PhysicsStatsProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
}

// Default texture rotation - all metals
const TEXTURE_ORDER = ['gold', 'platinum', 'silver', 'copper', 'bronze'] as const;

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" ref={containerRef}>
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
                {/* Icon with float animation (smaller) */}
                <motion.div
                  className="flex justify-center mb-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="p-2 rounded-full" style={{
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    {stat.icon}
                  </div>
                </motion.div>

                {/* Number with high contrast - now visible! */}
                <div className="relative inline-block mb-2">
                  {/* Dark backing for number visibility */}
                  <div className="absolute inset-0 blur-sm rounded-lg" style={{
                    background: 'rgba(0,0,0,0.4)',
                  }} />
                  <div
                    className="text-4xl md:text-5xl font-bold relative z-10"
                    style={{
                      background: config.textGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(0,0,0,0.6))',
                    }}
                  >
                    {stat.value}
                  </div>
                </div>

                {/* Label - with better contrast */}
                <div className="text-sm font-semibold tracking-wide relative z-10" style={{
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
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
