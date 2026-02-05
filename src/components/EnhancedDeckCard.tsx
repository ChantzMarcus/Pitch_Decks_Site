// src/components/EnhancedDeckCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Deck } from '@/db';
import { EyeIcon } from './icons/FilmIcons';
import { GoldenTicketSparkles } from './effects/GoldenTicketSparkles';

interface DeckCardProps {
  deck: Deck;
  index: number;
  onQuickView?: (deck: Deck) => void;
  videoPreviewUrl?: string; // Optional video preview URL
}

export default function EnhancedDeckCard({ deck, index, onQuickView, videoPreviewUrl }: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    if (isHovered) {
      // Enhanced 3D tilt effect with physics
      const handleMouseMove = (e: MouseEvent) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
        const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees
        const glowIntensity = Math.min(Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / 100, 0.5);
        
        gsap.to(card, {
          rotateY,
          rotateX,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        
        // Enhanced image effect
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Add subtle glow effect
        card.style.transformStyle = 'preserve-3d';
        card.style.boxShadow = `
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 ${glowIntensity * 20}px rgba(79, 70, 229, 0.1)
        `;
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });
        
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
        
        card.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else {
      // Reset to default state when not hovered
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      });
      
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
      
      if (card) {
        card.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
      }
    }
  }, [isHovered]);

  const genreTags = deck.genre.slice(0, 2).join(', ');
  const cardDescription = `${deck.title}. ${deck.slide_count} slides. ${deck.production_status}. Genres: ${genreTags}`;

  // Calculate flying entrance from different directions based on index
  const getEntranceAnimation = (idx: number) => {
    const positions = [
      { x: -200, y: 150, z: -300, scale: 0.4, rotate: -12 },   // from left-bottom
      { x: 200, y: -100, z: -250, scale: 0.5, rotate: 12 },    // from right-top
      { x: -150, y: -120, z: -350, scale: 0.3, rotate: 8 },    // from left-top
      { x: 180, y: 130, z: -280, scale: 0.45, rotate: -8 },    // from right-bottom
      { x: 0, y: 180, z: -400, scale: 0.35, rotate: 0 },       // from bottom center
      { x: -220, y: 50, z: -300, scale: 0.4, rotate: -15 },    // from left
      { x: 220, y: -50, z: -320, scale: 0.5, rotate: 15 },     // from right
      { x: 0, y: -150, z: -380, scale: 0.3, rotate: 5 },       // from top
    ];
    return positions[idx % positions.length];
  };

  const entranceStart = getEntranceAnimation(index);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: entranceStart.x,
        y: entranceStart.y,
        z: entranceStart.z,
        scale: entranceStart.scale,
        rotateY: entranceStart.rotate,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotateY: 0,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      // Continuous floating animation when not hovering
      animate={
        isHovered
          ? {}
          : {
              y: [0, -10, 0],
              transition: {
                duration: 3.5 + (index % 4) * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.15,
              }
            }
      }
      className="perspective-1000"
    >
      <GoldenTicketSparkles intensity="subtle" className="inline-block">
        <div
          ref={cardRef}
          className="group relative h-full cursor-pointer transform-style-3d"
          onMouseEnter={() => {
          setIsHovered(true);
          // Lazy load video preview on first hover
          if (videoPreviewUrl && !videoLoaded) {
            // Prefetch and load the video
            const video = document.createElement('video');
            video.src = videoPreviewUrl;
            video.preload = 'metadata';
            video.load();

            video.onloadeddata = () => {
              setVideoLoaded(true);
              setShowVideoPreview(true);
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {
                  // Autoplay blocked, ignore
                });
              }
            };

            video.onerror = () => {
              // Video failed to load, don't show preview
              console.warn(`Failed to load video preview: ${videoPreviewUrl}`);
            };
          } else if (videoPreviewUrl && videoLoaded && videoRef.current) {
            // Video already loaded, just play it
            setShowVideoPreview(true);
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {
              // Autoplay blocked, ignore
            });
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowVideoPreview(false);
          videoRef.current?.pause();
        }}
      >
        {/* Card Container with Bloom Effect */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-charcoal/10 shadow-lg transition-all duration-300 deck-card-bloom-premium">
          {/* Video Preview (plays on hover - lazy loaded) */}
          {videoPreviewUrl && (
            <AnimatePresence>
              {showVideoPreview && (
                <motion.video
                  ref={videoRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  src={videoPreviewUrl}
                  aria-label={`Video preview for ${deck.title}`}
                />
              )}
            </AnimatePresence>
          )}

          {/* Image Container with GSAP-controlled effects */}
          <div ref={imageRef} className={`w-full h-full ${showVideoPreview ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <Image
              src={deck.cover_image_url}
              alt={`${deck.title} cover image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
            />
          </div>

          {/* Gradient Overlay - appears on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Quick View Button - appears on hover */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              onQuickView?.(deck);
            }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 bg-white/95 backdrop-blur-sm rounded-lg text-charcoal font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
            aria-label={`Quick view ${deck.title}`}
          >
            <EyeIcon size={18} aria-hidden="true" />
            Quick View
          </motion.button>

          {/* Genre Tags - top right on hover */}
          <div
            className="absolute top-4 right-4 flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            {deck.genre.slice(0, 2).map((g: string) => (
              <span
                key={g}
                className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal shadow-md"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Metadata Below Card */}
        <div className="mt-4">
          <h3 className="font-display text-xl font-semibold text-charcoal mb-1" id={`deck-title-${deck.id}`}>
            {deck.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-charcoal/60" aria-describedby={`deck-title-${deck.id}`}>
            <span>{deck.slide_count} slides</span>
            <span aria-hidden="true">•</span>
            <span className="capitalize">{deck.production_status}</span>
          </div>
        </div>

        {/* Screen reader only description */}
        <span className="sr-only">{cardDescription}</span>
      </div>
      </GoldenTicketSparkles>
    </motion.div>
  );
}