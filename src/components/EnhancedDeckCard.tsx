// src/components/EnhancedDeckCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/image';
import { Eye } from 'lucide-react';
import { Deck } from '@/db';

interface DeckCardProps {
  deck: Deck;
  index: number;
  onQuickView?: (deck: Deck) => void;
}

export default function EnhancedDeckCard({ deck, index, onQuickView }: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div 
        ref={cardRef}
        className="group relative h-full cursor-pointer transform-style-3d"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-charcoal/10 shadow-lg transition-all duration-300">
          {/* Image Container with GSAP-controlled effects */}
          <div ref={imageRef} className="w-full h-full">
            <Link
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
            <Eye size={18} aria-hidden="true" />
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
    </motion.div>
  );
}