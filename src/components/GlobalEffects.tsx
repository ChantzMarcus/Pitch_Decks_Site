'use client';

import { useEffect, useRef } from 'react';
import { ScrollSparkleTrail, ConfettiRain } from '@/components/effects/GoldenTicketSparkles';

/**
 * Animated Film Grain Component - Vintage style with vertical scratch lines
 * Creates an authentic film grain overlay with animated noise and vertical scratches
 * that span across the entire screen
 */
function AnimatedFilmGrain({ 
  opacity = 0.25, 
  intensity = 'medium' 
}: { 
  opacity?: number; 
  intensity?: 'low' | 'medium' | 'high' 
}) {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const noiseCanvas = noiseCanvasRef.current;
    const scratchCanvas = scratchCanvasRef.current;
    if (!noiseCanvas || !scratchCanvas) return;

    const noiseCtx = noiseCanvas.getContext('2d');
    const scratchCtx = scratchCanvas.getContext('2d');
    if (!noiseCtx || !scratchCtx) return;

    const updateCanvasSize = () => {
      noiseCanvas.width = window.innerWidth;
      noiseCanvas.height = window.innerHeight;
      scratchCanvas.width = window.innerWidth;
      scratchCanvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Generate noise pattern
    const generateNoise = () => {
      const width = noiseCanvas.width;
      const height = noiseCanvas.height;
      const imageData = noiseCtx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const color = Math.random() * 200;
        data[i] = color;     // R
        data[i + 1] = color; // G
        data[i + 2] = color; // B
        data[i + 3] = 80;    // Alpha
      }

      noiseCtx.putImageData(imageData, 0, 0);
    };

    // Draw vertical scratch lines across the entire screen (more subtle)
    const drawVerticalLine = (xPosition: number, lineHeight: number) => {
      scratchCtx.strokeStyle = Math.random() > 0.3
        ? "rgba(255,255,255,0.15)"  // Much more subtle white lines
        : "rgba(0,0,0,0.25)";       // Much more subtle dark lines
      scratchCtx.lineWidth = Math.floor(Math.random() * 1.5) + 0.5;  // Thinner lines
      scratchCtx.beginPath();
      scratchCtx.moveTo(xPosition, 0);
      scratchCtx.lineTo(xPosition, lineHeight);
      scratchCtx.stroke();

      // Less frequently draw additional lines
      if (Math.random() > 0.85) {
        drawVerticalLine(Math.random() * noiseCanvas.width, noiseCanvas.height);
      }
    };

    // Draw random scratches/dust circles
    const drawScratches = () => {
      const numberOfCircles = Math.floor(Math.random() * 15);
      for (let i = 0; i < numberOfCircles; i++) {
        const x = Math.random() * scratchCanvas.width;
        const y = Math.random() * scratchCanvas.height;
        const radius = Math.floor(Math.random() * 5) + 1;
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, radius, 0, Math.PI * 2);
        scratchCtx.fillStyle = "rgba(0,0,0,0.8)";
        scratchCtx.fill();
      }
    };

    // Initial generation
    generateNoise();

    // Regenerate noise and scratches periodically (vintage film effect)
    const n = 100; // milliseconds
    intervalRef.current = setInterval(() => {
      generateNoise();
      drawScratches();
    }, n);

    // Draw vertical lines less frequently - these span the entire screen height
    const lineInterval = setInterval(() => {
      // Clear previous lines more frequently to prevent buildup
      if (Math.random() > 0.5) {
        scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
      }
      // Only draw lines sometimes - more subtle effect
      if (Math.random() > 0.4) {
        drawVerticalLine(Math.random() * noiseCanvas.width, noiseCanvas.height);
      }
    }, n * 4);  // Slower frequency - was n * 2

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearInterval(lineInterval);
    };
  }, [intensity]);

  return (
    <>
      {/* Noise layer */}
      <canvas 
        ref={noiseCanvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{
          mixBlendMode: 'hard-light',
          opacity,
        }}
      />
      {/* Scratch layer with vertical lines - more subtle */}
      <canvas
        ref={scratchCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{
          mixBlendMode: 'hard-light',
          opacity: opacity * 0.25,  // Reduced from 0.6 for more subtle effect
        }}
      />
    </>
  );
}

/**
 * Global effects that span the entire site
 * - Gold dust trail that follows scroll
 * - Confetti rain for ambient depth
 * - Animated film grain for vintage Hollywood feel
 */
export function GlobalEffects() {
  return (
    <>
      {/* Gold Dust Trail - follows scroll throughout site */}
      <ScrollSparkleTrail enabled />

      {/* Confetti Rain - ambient falling particles */}
      <ConfettiRain count={15} />

      {/* Animated Film Grain Overlay - Vintage style */}
      <AnimatedFilmGrain opacity={0.3} intensity="high" />
    </>
  );
}
