'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  /**
   * Number of particles
   */
  count?: number;
  /**
   * Particle size
   */
  size?: number;
  /**
   * Particle color (hex string) - single color
   */
  color?: string;
  /**
   * Multiple colors for multi-color particles (Wes Anderson style!)
   */
  colors?: string[];
  /**
   * Animation speed
   */
  speed?: number;
  /**
   * Opacity of particles
   */
  opacity?: number;
  /**
   * Size of the particle field
   */
  area?: { width: number; height: number; depth: number };
  /**
   * Particle movement type
   */
  movement?: 'float' | 'flow' | 'spiral';
}

/**
 * ParticleSystem Component
 * 
 * Creates a cinematic particle system for backgrounds and ambiance
 * - Performance-optimized using instanced rendering
 * - Subtle floating particles
 * - Works with existing Three.js setup
 * 
 * Usage:
 * ```tsx
 * <ParticleSystem 
 *   count={500}
 *   color="#ffffff"
 *   opacity={0.3}
 * />
 * ```
 */
export default function ParticleSystem({
  count = 500,
  size = 0.02,
  color = '#ffffff',
  colors,
  speed = 0.5,
  opacity = 0.3,
  area = { width: 10, height: 10, depth: 5 },
  movement = 'float',
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Use colors array if provided, otherwise use single color
  const particleColors = colors && colors.length > 0 ? colors : [color];

  // Create particle positions, velocities, and colors
  const { positions, velocities, colorArray } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random starting positions within area
      positions[i * 3] = (Math.random() - 0.5) * area.width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * area.height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * area.depth;

      // Assign random color from palette
      const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
      const threeColor = new THREE.Color(randomColor);
      colors[i * 3] = threeColor.r;
      colors[i * 3 + 1] = threeColor.g;
      colors[i * 3 + 2] = threeColor.b;

      // Random velocities based on movement type
      switch (movement) {
        case 'flow':
          velocities[i * 3] = (Math.random() - 0.5) * 0.02 * speed;
          velocities[i * 3 + 1] = Math.random() * 0.01 * speed;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01 * speed;
          break;
        case 'spiral':
          const angle = (i / count) * Math.PI * 2;
          velocities[i * 3] = Math.cos(angle) * 0.01 * speed;
          velocities[i * 3 + 1] = 0.01 * speed;
          velocities[i * 3 + 2] = Math.sin(angle) * 0.01 * speed;
          break;
        case 'float':
        default:
          velocities[i * 3] = (Math.random() - 0.5) * 0.01 * speed;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01 * speed;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01 * speed;
          break;
      }
    }

    return { positions, velocities, colorArray: colors };
  }, [count, area, movement, speed, particleColors]);

  // Animate particles
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions based on movement type
      switch (movement) {
        case 'float':
          // Gentle floating with sine wave
          positions[i3] += velocities[i3] + Math.sin(time + i) * 0.0005;
          positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.7 + i) * 0.0005;
          positions[i3 + 2] += velocities[i3 + 2];
          break;
        case 'flow':
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          // Wrap around for continuous flow
          if (positions[i3 + 1] > area.height / 2) {
            positions[i3 + 1] = -area.height / 2;
          }
          break;
        case 'spiral':
          const angle = (i / count) * Math.PI * 2 + time * 0.5;
          positions[i3] = Math.cos(angle) * (area.width / 4);
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] = Math.sin(angle) * (area.depth / 4);
          break;
      }

      // Boundary wrapping for float movement
      if (movement === 'float') {
        if (Math.abs(positions[i3]) > area.width / 2) {
          positions[i3] = (Math.random() - 0.5) * area.width;
        }
        if (Math.abs(positions[i3 + 1]) > area.height / 2) {
          positions[i3 + 1] = (Math.random() - 0.5) * area.height;
        }
        if (Math.abs(positions[i3 + 2]) > area.depth / 2) {
          positions[i3 + 2] = (Math.random() - 0.5) * area.depth;
        }
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05; // Slow rotation for depth
  });

  // Create geometry with colors
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    return geom;
  }, [positions, colorArray]);

  // Create material (vertexColors enabled for multi-color support)
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size,
      vertexColors: particleColors.length > 1, // Enable vertex colors for multi-color
      color: particleColors.length === 1 ? new THREE.Color(particleColors[0]) : new THREE.Color(0xffffff),
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, [size, particleColors, opacity]);

  return (
    <>
      <points ref={meshRef} geometry={geometry} material={material} />
      {/* Optional: Subtle point light for glow effect */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={0.5}
        distance={10}
        color={particleColors[0]}
      />
    </>
  );
}
