// src/components/GlassCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  index?: number;
}

export default function GlassCard({
  children,
  title,
  description,
  className = "",
  index = 0
}: GlassCardProps) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    // Create a style element for dynamic pseudo-element styles
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const h = rect.height;
    const w = rect.width;

    // Calculate position percentages
    const px = Math.abs(Math.floor((100 / w) * x) - 100);
    const py = Math.abs(Math.floor((100 / h) * y) - 100);
    const pa = (50 - px) + (50 - py);

    // Calculate gradient positions
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + (Math.abs(pa) * 1.5);

    // Calculate 3D tilt
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    // Apply transform
    cardRef.current.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;

    // Update pseudo-element styles
    if (styleRef.current && cardRef.current) {
      const cardId = `holo-card-${index}`;
      cardRef.current.id = cardId;
      
      styleRef.current.textContent = `
        #${cardId}.holo-card::before {
          background-position: ${lp}% ${tp}%;
        }
        #${cardId}.holo-card::after {
          background-position: ${px_spark}% ${py_spark}%;
          opacity: ${p_opc / 100};
        }
      `;
    }

    setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = '';
    setIsActive(false);
    
    // Clear dynamic styles after a delay to allow animation
    setTimeout(() => {
      if (styleRef.current) {
        styleRef.current.textContent = '';
      }
    }, 2500);
  };

  return (
    <div className="holo-wrapper">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`holo-card relative rounded-2xl border border-carnival-gold/20 bg-charcoal-light/90 backdrop-blur-xl shadow-xl overflow-hidden ${isActive ? 'active' : ''} ${className}`}
        style={{
          boxShadow: isActive
            ? `
              -20px -20px 30px -25px rgba(218, 165, 32, 0.6),
              20px 20px 30px -25px rgba(255, 215, 0, 0.6),
              -7px -7px 10px -5px rgba(218, 165, 32, 0.5),
              7px 7px 10px -5px rgba(255, 215, 0, 0.5),
              0 0 20px 6px rgba(218, 165, 32, 0.3),
              0 55px 35px -20px rgba(0, 0, 0, 0.7)
            `
            : `
              -5px -5px 5px -5px rgba(218, 165, 32, 0.3),
              5px 5px 5px -5px rgba(255, 215, 0, 0.3),
              0 55px 35px -20px rgba(0, 0, 0, 0.6)
            `,
          transition: 'box-shadow 0.1s ease-out',
        }}
      >
        {/* Vintage paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-[3]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperTexture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperTexture)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
          }}
        />
        
        {/* Subtle vintage border pattern */}
        <div className="absolute inset-0 border-2 border-carnival-gold/10 rounded-2xl pointer-events-none z-[4]" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(218, 165, 32, 0.03) 2px,
              rgba(218, 165, 32, 0.03) 4px
            )`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}