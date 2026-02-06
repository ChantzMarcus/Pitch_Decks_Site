'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Card configuration with textures and colors
interface CardConfig {
  frameColor: 'gold' | 'silver' | 'bronze';
  backgroundColor: string;
  backgroundTexture: 'velvet' | 'fabric' | 'leather' | 'damask';
  textColor: string;
  patternColor: string;
}

const CARD_CONFIGS: CardConfig[] = [
  {
    frameColor: 'gold',
    backgroundColor: '#8B1A1A', // Deep red velvet
    backgroundTexture: 'velvet',
    textColor: '#FFD700',
    patternColor: '#6B1515',
  },
  {
    frameColor: 'silver',
    backgroundColor: '#1A1F3A', // Dark blue velvet
    backgroundTexture: 'velvet',
    textColor: '#E0E0E0',
    patternColor: '#0F1325',
  },
  {
    frameColor: 'gold',
    backgroundColor: '#2D4A2D', // Muted green velvet
    backgroundTexture: 'velvet',
    textColor: '#FFD700',
    patternColor: '#1E3220',
  },
  {
    frameColor: 'gold',
    backgroundColor: '#8B6914', // Gold/yellow damask
    backgroundTexture: 'damask',
    textColor: '#FFD700',
    patternColor: '#6B4F0A',
  },
  {
    frameColor: 'bronze',
    backgroundColor: '#5C2E1A', // Deep brown leather
    backgroundTexture: 'leather',
    textColor: '#CD7F32',
    patternColor: '#3D1F0F',
  },
  {
    frameColor: 'gold',
    backgroundColor: '#8B6914', // Gold/yellow damask
    backgroundTexture: 'damask',
    textColor: '#FFD700',
    patternColor: '#6B4F0A',
  },
];

// Ornate border SVG pattern with intricate baroque-style decorations
function OrnateBorder({ color }: { color: 'gold' | 'silver' | 'bronze' }) {
  const colorMap = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
  };

  const borderColor = colorMap[color];
  const darkerColor = color === 'gold' ? '#DAA520' : color === 'silver' ? '#808080' : '#8B4513';

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 400 200"
    >
      <defs>
        {/* Metallic gradient for frame */}
        <linearGradient id={`frameGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={borderColor} stopOpacity="1" />
          <stop offset="30%" stopColor={borderColor} stopOpacity="0.95" />
          <stop offset="50%" stopColor={darkerColor} stopOpacity="0.9" />
          <stop offset="70%" stopColor={borderColor} stopOpacity="0.95" />
          <stop offset="100%" stopColor={borderColor} stopOpacity="1" />
        </linearGradient>
        
        {/* Highlight gradient for 3D effect */}
        <linearGradient id={`highlight-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        
        {/* Shadow gradient */}
        <linearGradient id={`shadow-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>
      
      {/* Outer thick border with shadow */}
      <rect
        x="0"
        y="0"
        width="400"
        height="200"
        fill="none"
        stroke={darkerColor}
        strokeWidth="10"
        rx="14"
        opacity="0.8"
      />
      
      {/* Main ornate border */}
      <rect
        x="5"
        y="5"
        width="390"
        height="190"
        fill="none"
        stroke={`url(#frameGradient-${color})`}
        strokeWidth="6"
        rx="12"
      />
      
      {/* Inner decorative border */}
      <rect
        x="16"
        y="16"
        width="368"
        height="168"
        fill="none"
        stroke={borderColor}
        strokeWidth="2"
        rx="8"
        opacity="0.7"
      />
      
      {/* Corner decorations - Top Left */}
      <g fill={borderColor} opacity="0.9">
        <path d="M 16 16 Q 12 12 16 8 L 20 12 Q 16 16 20 20 Z" />
        <path d="M 12 20 Q 8 16 12 12 L 16 16 Q 12 20 16 24 Z" />
        <circle cx="18" cy="18" r="1.5" fill={borderColor} opacity="0.8" />
      </g>
      
      {/* Corner decorations - Top Right */}
      <g fill={borderColor} opacity="0.9">
        <path d="M 384 16 Q 388 12 384 8 L 380 12 Q 384 16 380 20 Z" />
        <path d="M 388 20 Q 392 16 388 12 L 384 16 Q 388 20 384 24 Z" />
        <circle cx="382" cy="18" r="1.5" fill={borderColor} opacity="0.8" />
      </g>
      
      {/* Corner decorations - Bottom Left */}
      <g fill={borderColor} opacity="0.9">
        <path d="M 16 184 Q 12 188 16 192 L 20 188 Q 16 184 20 180 Z" />
        <path d="M 12 180 Q 8 184 12 188 L 16 184 Q 12 180 16 176 Z" />
        <circle cx="18" cy="182" r="1.5" fill={borderColor} opacity="0.8" />
      </g>
      
      {/* Corner decorations - Bottom Right */}
      <g fill={borderColor} opacity="0.9">
        <path d="M 384 184 Q 388 188 384 192 L 380 188 Q 384 184 380 180 Z" />
        <path d="M 388 180 Q 392 184 388 188 L 384 184 Q 388 180 384 176 Z" />
        <circle cx="382" cy="182" r="1.5" fill={borderColor} opacity="0.8" />
      </g>
      
      {/* Swirling patterns along top edge */}
      <g stroke={borderColor} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 50 16 Q 100 12 150 16 T 250 16 T 350 16" />
        <path d="M 60 20 Q 110 16 160 20 T 260 20 T 340 20" />
        <path d="M 70 18 Q 120 14 170 18 T 270 18 T 330 18" />
      </g>
      
      {/* Swirling patterns along bottom edge */}
      <g stroke={borderColor} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 50 184 Q 100 188 150 184 T 250 184 T 350 184" />
        <path d="M 60 180 Q 110 184 160 180 T 260 180 T 340 180" />
        <path d="M 70 182 Q 120 186 170 182 T 270 182 T 330 182" />
      </g>
      
      {/* Swirling patterns along left edge */}
      <g stroke={borderColor} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 16 50 Q 12 100 16 150" />
        <path d="M 20 60 Q 16 110 20 160" />
        <path d="M 18 70 Q 14 120 18 170" />
      </g>
      
      {/* Swirling patterns along right edge */}
      <g stroke={borderColor} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 384 50 Q 388 100 384 150" />
        <path d="M 380 60 Q 384 110 380 160" />
        <path d="M 382 70 Q 386 120 382 170" />
      </g>
      
      {/* Highlight overlay for 3D effect */}
      <rect
        x="5"
        y="5"
        width="390"
        height="95"
        fill={`url(#highlight-${color})`}
        rx="12"
        opacity="0.3"
      />
      
      {/* Shadow overlay for depth */}
      <rect
        x="5"
        y="100"
        width="390"
        height="95"
        fill={`url(#shadow-${color})`}
        rx="12"
        opacity="0.2"
      />
      
      {/* Bronze frame rivets */}
      {color === 'bronze' && (
        <g fill={darkerColor} opacity="0.9">
          {/* Top edge rivets */}
          {[50, 100, 150, 200, 250, 300, 350].map((x) => (
            <circle key={`top-${x}`} cx={x} cy={16} r="3" />
          ))}
          {/* Bottom edge rivets */}
          {[50, 100, 150, 200, 250, 300, 350].map((x) => (
            <circle key={`bottom-${x}`} cx={x} cy={184} r="3" />
          ))}
          {/* Left edge rivets */}
          {[50, 100, 150].map((y) => (
            <circle key={`left-${y}`} cx={16} cy={y} r="3" />
          ))}
          {/* Right edge rivets */}
          {[50, 100, 150].map((y) => (
            <circle key={`right-${y}`} cx={384} cy={y} r="3" />
          ))}
        </g>
      )}
    </svg>
  );
}

// Background texture component
function BackgroundTexture({ texture, color, patternColor }: { texture: string; color: string; patternColor: string }) {
  if (texture === 'velvet') {
    return (
      <>
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: `radial-gradient(ellipse at center, ${color} 0%, ${patternColor} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
        {/* Subtle swirling patterns */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse 200px 150px at 30% 40%, ${patternColor} 0%, transparent 50%),
                             radial-gradient(ellipse 150px 200px at 70% 60%, ${patternColor} 0%, transparent 50%)`,
          }}
        />
      </>
    );
  }
  
  if (texture === 'damask') {
    return (
      <>
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${patternColor} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h200v200H0z' fill='${patternColor.replace('#', '%23')}'/%3E%3Cpath d='M50 50 Q 100 30 150 50 T 250 50' stroke='${patternColor.replace('#', '%23')}' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M50 150 Q 100 170 150 150 T 250 150' stroke='${patternColor.replace('#', '%23')}' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </>
    );
  }
  
  if (texture === 'leather') {
    return (
      <>
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: `linear-gradient(145deg, ${color} 0%, ${patternColor} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
          }}
        />
      </>
    );
  }
  
  // Default fabric
  return (
    <>
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: color,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}

interface StatCard {
  value: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface OrnateStatsCardsProps {
  title?: string;
  subtitle?: string;
  stats: StatCard[];
}

export default function OrnateStatsCards({
  title = "Our Achievements",
  subtitle = "A legacy of excellence",
  stats,
}: OrnateStatsCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 50, scale: 0.9 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    cardRefs.current.forEach((card, index) => {
      if (card) {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          index * 0.1
        );
      }
    });

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      tl.kill();
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-charcoal to-charcoal">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span
              className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent"
              style={{ textShadow: "0 2px 30px rgba(251, 191, 36, 0.5)" }}
            >
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-lg text-paper/60 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const config = CARD_CONFIGS[index % CARD_CONFIGS.length];
            const isBronzeFrame = config.frameColor === 'bronze';

            return (
              <motion.div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="group relative"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Container */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Ornate Border */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <OrnateBorder color={config.frameColor} />
                  </div>

                  {/* Background with Texture */}
                  <div className="relative" style={{ padding: '16px' }}>
                    <div className="relative rounded-xl overflow-hidden" style={{ minHeight: '200px' }}>
                      <BackgroundTexture
                        texture={config.backgroundTexture}
                        color={config.backgroundColor}
                        patternColor={config.patternColor}
                      />

                      {/* Content */}
                      <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                        {/* Icon */}
                        {stat.icon && (
                          <div className="mb-4 opacity-90">
                            {stat.icon}
                          </div>
                        )}

                        {/* Main Value - Large, Bold, Metallic */}
                        <div
                          className="text-5xl md:text-6xl font-bold mb-2"
                          style={{
                            background: `linear-gradient(180deg, ${config.textColor} 0%, ${config.patternColor} 50%, ${config.textColor} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.8)) drop-shadow(0 0 15px rgba(0,0,0,0.6))',
                            textShadow: `0 2px 4px rgba(0,0,0,0.9), 0 0 20px ${config.textColor}40`,
                          }}
                        >
                          {stat.value}
                        </div>

                        {/* Label */}
                        <div
                          className="text-xl md:text-2xl font-bold mb-2"
                          style={{
                            color: config.textColor,
                            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                          }}
                        >
                          {stat.label}
                        </div>

                        {/* Subtitle with Icon */}
                        {stat.subtitle && (
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className="text-sm font-medium"
                              style={{
                                color: 'rgba(255,255,255,0.9)',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                              }}
                            >
                              {stat.subtitle}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${config.textColor}40 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
