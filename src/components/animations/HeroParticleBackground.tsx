'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleSystem from './ParticleSystem';
import * as THREE from 'three';

interface HeroParticleBackgroundProps {
  /**
   * Number of particles
   */
  particleCount?: number;
  /**
   * Particle color (single color)
   */
  color?: string;
  /**
   * Multiple colors for multi-color particles (vintage tech style!)
   */
  colors?: string[];
  /**
   * Opacity
   */
  opacity?: number;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * HeroParticleBackground Component
 *
 * A ready-to-use particle background for hero sections
 * - Performance-optimized
 * - Subtle and cinematic
 * - Works as overlay on video backgrounds
 *
 * Usage:
 * ```tsx
 * <HeroParticleBackground
 *   particleCount={300}
 *   color="#ffffff"
 *   opacity={0.2}
 * />
 * ```
 */
export default function HeroParticleBackground({
  particleCount = 300,
  color,
  colors = ['#DAA520', '#B87333', '#7A7A7A'], // Vintage tech palette: Gold, Copper, Steel
  opacity = 0.2,
  className = '',
}: HeroParticleBackgroundProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Ambient light for subtle illumination */}
          <ambientLight intensity={0.3} />

          {/* Main particle system - vintage tech style! */}
          <ParticleSystem
            count={particleCount}
            size={0.03}
            color={color}
            colors={colors}
            speed={0.3}
            opacity={opacity}
            area={{ width: 12, height: 8, depth: 6 }}
            movement="float"
          />

          {/* Secondary subtle layer for depth */}
          <ParticleSystem
            count={Math.floor(particleCount * 0.5)}
            size={0.015}
            color={color}
            colors={colors}
            speed={0.2}
            opacity={opacity * 0.5}
            area={{ width: 15, height: 10, depth: 8 }}
            movement="flow"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
