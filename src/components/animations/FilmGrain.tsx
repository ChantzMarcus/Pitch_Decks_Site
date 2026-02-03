'use client';

import { useEffect, useRef } from 'react';

interface FilmGrainProps {
  /**
   * Opacity of the grain (0-1)
   */
  opacity?: number;
  /**
   * Intensity of the grain effect
   */
  intensity?: 'low' | 'medium' | 'high';
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FilmGrain Component
 * 
 * Adds authentic film grain texture overlay
 * - Cinematic film texture
 * - Performance-optimized CSS
 * - Authentic film look
 * 
 * Usage:
 * ```tsx
 * <FilmGrain opacity={0.03} intensity="medium" />
 * ```
 */
export default function FilmGrain({
  opacity = 0.03,
  intensity = 'medium',
  className = '',
}: FilmGrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;

    // Generate grain based on intensity
    const grainSize = intensity === 'low' ? 1 : intensity === 'medium' ? 0.8 : 0.6;
    const grainDensity = intensity === 'low' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7;

    // Create grain pattern
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const grain = Math.random() < grainDensity ? Math.random() * 255 : 128;
      data[i] = grain;     // R
      data[i + 1] = grain; // G
      data[i + 2] = grain; // B
      data[i + 3] = 255;   // A
    }

    ctx.putImageData(imageData, 0, 0);
  }, [intensity]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${canvasRef.current?.toDataURL() || ''})`,
        backgroundSize: '200px 200px',
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
