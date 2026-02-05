// src/components/SimpleCard.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SimpleCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  index?: number;
}

export default function SimpleCard({
  children,
  title,
  description,
  className = "",
  index = 0
}: SimpleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);
  
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ['-20%', '20%']);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ['-20%', '20%']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    setMousePosition({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`holo-card relative rounded-2xl border border-accent-gold/20 bg-gradient-to-br from-charcoal-light/90 via-charcoal-medium/80 to-charcoal-light/90 backdrop-blur-sm shadow-xl overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
    >
      {/* Holographic shine overlay - moves with mouse */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(
            115deg,
            transparent 0%,
            rgba(245, 158, 11, 0.4) 25%,
            transparent 47%,
            transparent 53%,
            rgba(20, 184, 166, 0.4) 75%,
            transparent 100%
          )`,
          backgroundSize: '300% 300%',
          mixBlendMode: 'color-dodge',
          x: shineX,
          y: shineY,
        }}
      />
      
      {/* Secondary holographic layer - brand colors */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(
            125deg,
            rgba(245, 158, 11, 0.2) 15%,
            rgba(20, 184, 166, 0.15) 30%,
            rgba(99, 102, 241, 0.1) 40%,
            rgba(245, 158, 11, 0.1) 60%,
            rgba(20, 184, 166, 0.15) 70%,
            rgba(99, 102, 241, 0.2) 85%
          )`,
          backgroundSize: '160% 160%',
          mixBlendMode: 'color-dodge',
          x: useTransform(mouseXSpring, [-0.5, 0.5], ['10%', '-10%']),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ['10%', '-10%']),
        }}
      />
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(245, 158, 11, 0.2) 0%,
              rgba(20, 184, 166, 0.15) 40%,
              transparent 70%
            )`,
            mixBlendMode: 'screen',
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
}