// src/components/animations/shaders/RippleShader.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Ripple/Distortion Shader for Deck Cards
 * Creates a water ripple effect that emanates from the cursor position
 */

interface RippleShaderMaterialProps {
  baseTexture?: THREE.Texture;
  ripplePosition?: { x: number; y: number };
  rippleIntensity?: number;
  rippleRadius?: number;
  time?: number;
}

export function useRippleShader({
  baseTexture,
  ripplePosition = { x: 0.5, y: 0.5 },
  rippleIntensity = 0.3,
  rippleRadius = 0.3,
  time = 0,
}: RippleShaderMaterialProps) {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: baseTexture || null },
        ripplePosition: { value: new THREE.Vector2(ripplePosition.x, ripplePosition.y) },
        rippleIntensity: { value: rippleIntensity },
        rippleRadius: { value: rippleRadius },
        time: { value: time },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform vec2 ripplePosition;
        uniform float rippleIntensity;
        uniform float rippleRadius;
        uniform float time;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Calculate distance from ripple center
          float dist = distance(uv, ripplePosition);

          // Create ripple effect using sine waves
          float ripple = sin(dist * 20.0 - time * 3.0) * exp(-dist * 3.0);

          // Distort UV based on ripple
          vec2 distortedUV = uv + normalize(uv - ripplePosition) * ripple * rippleIntensity * 0.02;

          // Sample texture with distorted UV
          vec4 color;
          if (baseTexture != null) {
            color = texture2D(baseTexture, distortedUV);
          } else {
            // Default gradient color
            color = vec4(0.2, 0.2, 0.2, 1.0);
          }

          // Add shimmer effect
          float shimmer = sin(dist * 30.0 - time * 5.0) * 0.5 + 0.5;
          shimmer *= exp(-dist * 4.0) * rippleIntensity;

          // Add rim light effect
          float rim = smoothstep(0.4, 0.5, dist);
          vec3 rimColor = vec3(0.4, 0.3, 1.0) * rim * 0.3;

          // Combine effects
          vec3 finalColor = color.rgb + rimColor + shimmer * 0.2;

          gl_FragColor = vec4(finalColor, color.a);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [baseTexture, ripplePosition, rippleIntensity, rippleRadius, time]);
}

export default function RippleShader(props: RippleShaderMaterialProps) {
  return null; // Utility component, use useRippleShader hook
}
