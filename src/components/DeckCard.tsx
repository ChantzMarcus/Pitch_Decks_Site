'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { Deck } from '@/db';
import { useState } from 'react';

interface DeckCardProps {
  deck: Deck;
  index: number;
  onQuickView?: (deck: Deck) => void;
}

export default function DeckCard({ deck, index, onQuickView }: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect values - Sonar-style
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / rect.width - 0.5) * 2);
    y.set((mouseY / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enable keyboard interaction for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onQuickView?.(deck);
    }
  };

  const genreTags = deck.genre.slice(0, 2).join(', ');
  const cardDescription = `${deck.title}. ${deck.slide_count} slides. ${deck.production_status}. Genres: ${genreTags}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="group relative" role="article" aria-label={`Project: ${deck.title}`}>
        {/* Card Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-charcoal/10">
          <Image
            src={deck.cover_image_url}
            alt={`${deck.title} cover image`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />

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
            onKeyDown={handleKeyDown}
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
