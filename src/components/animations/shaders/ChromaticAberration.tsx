// src/components/animations/shaders/ChromaticAberration.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Chromatic Aberration Shader
 * Creates a lens effect where colors separate at the edges
 * Gives a cinematic/filmic look
 */

interface ChromaticAberrationMaterialProps {
  baseTexture?: THREE.Texture;
  intensity?: number;
  time?: number;
}

export function useChromaticAberrationShader({
  baseTexture,
  intensity = 0.003,
  time = 0,
}: ChromaticAberrationMaterialProps) {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: baseTexture || null },
        intensity: { value: intensity },
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
        uniform float intensity;
        uniform float time;

        varying vec2 vUv;

        void main() {
          // Animated chromatic aberration offset
          float offset = intensity * (1.0 + sin(time * 2.0) * 0.3);

          // Sample red, green, and blue channels at slightly different positions
          vec2 redOffset = vec2(offset, 0.0);
          vec2 blueOffset = vec2(-offset, 0.0);

          vec4 color;
          if (baseTexture != null) {
            float r = texture2D(baseTexture, vUv + redOffset).r;
            float g = texture2D(baseTexture, vUv).g;
            float b = texture2D(baseTexture, vUv + blueOffset).b;
            float a = texture2D(baseTexture, vUv).a;

            color = vec4(r, g, b, a);
          } else {
            color = vec4(0.2, 0.2, 0.2, 1.0);
          }

          // Add subtle film grain
          float grain = (fract(sin(dot(vUv * time, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.05;
          color.rgb += grain;

          gl_FragColor = color;
        }
      `,
      transparent: true,
    });
  }, [baseTexture, intensity, time]);
}

export default function ChromaticAberrationShader(props: ChromaticAberrationMaterialProps) {
  return null; // Utility component, use useChromaticAberrationShader hook
}
