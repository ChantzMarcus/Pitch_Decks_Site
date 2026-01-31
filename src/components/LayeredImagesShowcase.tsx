'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations';

interface LayeredImage {
  src: string;
  alt: string;
  zIndex: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

interface LayeredImagesShowcaseProps {
  images: LayeredImage[];
  title?: string;
  description?: string;
  deviceFrame?: 'macbook' | 'ipad' | 'iphone' | 'none';
  className?: string;
}

/**
 * LayeredImagesShowcase Component
 * 
 * Inspired by Apple's layered images effect:
 * - Multiple images layered with depth
 * - Parallax scroll effects
 * - Smooth animations
 * - Device frame option (MacBook, iPad, iPhone)
 */
export default function LayeredImagesShowcase({
  images,
  title,
  description,
  deviceFrame = 'macbook',
  className = '',
}: LayeredImagesShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const deviceFrames = {
    macbook: (
      <div className="absolute inset-0 pointer-events-none">
        {/* MacBook frame */}
        <div className="absolute inset-0 border-[3px] border-charcoal/30 rounded-[2rem] shadow-2xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-charcoal/20 rounded-b-lg" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-charcoal/10 rounded-t-lg" />
      </div>
    ),
    ipad: (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-[2px] border-charcoal/30 rounded-[1.5rem] shadow-xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-charcoal/20 rounded-b-md" />
      </div>
    ),
    iphone: (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-[2px] border-charcoal/30 rounded-[2rem] shadow-xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-charcoal/20 rounded-b-lg" />
      </div>
    ),
    none: null,
  };

  return (
    <section ref={containerRef} className={`py-24 md:py-32 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {(title || description) && (
          <ScrollReveal direction="up" className="text-center mb-16">
            {title && (
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-paper-muted max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </ScrollReveal>
        )}

        {/* Layered Images Container */}
        <div className="relative max-w-5xl mx-auto aspect-[16/10] md:aspect-[16/9]">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 via-accent-gold/10 to-accent-teal/20 rounded-2xl blur-3xl" />

          {/* Device frame */}
          {deviceFrames[deviceFrame]}

          {/* Layered images */}
          {images.map((image, index) => {
            const yTransform = index === 0 ? y1 : index === 1 ? y2 : y3;
            const zIndex = image.zIndex || index + 1;
            const offsetX = image.offsetX || 0;
            const offsetY = image.offsetY || 0;
            const scale = image.scale || 1;

            return (
              <motion.div
                key={index}
                style={{
                  y: yTransform,
                  opacity,
                  zIndex,
                  x: `${offsetX}%`,
                  scale,
                  top: `${offsetY}%`,
                }}
                className="absolute inset-0 rounded-xl overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  priority={index === 0}
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            );
          })}

          {/* Additional depth layers with blur */}
          {images.length > 1 && (
            <>
              {/* Blurred background layer for depth */}
              <motion.div
                style={{ 
                  opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.1]),
                  zIndex: 0,
                }}
                className="absolute inset-0 rounded-xl overflow-hidden"
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover blur-xl scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />
              </motion.div>
            </>
          )}
        </div>

        {/* Caption */}
        {description && (
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-8">
            <p className="text-paper-muted text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
