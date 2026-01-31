// src/components/GlassCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !isHovered) return;

    // Enhanced glassmorphism effect on hover
    const tween = gsap.to(cardRef.current, {
      backdropFilter: 'blur(25px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      duration: 0.3,
      ease: "power2.out"
    });

    return () => {
      tween.kill();
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        // Reset to default glassmorphism effect
        if (cardRef.current) {
          const resetTween = gsap.to(cardRef.current, {
            backdropFilter: 'blur(20px) saturate(180%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.3,
            ease: "power2.out"
          });
          // Store reference for potential cleanup (though it will complete naturally)
          (cardRef.current as any)._resetTween = resetTween;
        }
      }}
      className={`relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden ${className}`}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>

      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
    </motion.div>
  );
}