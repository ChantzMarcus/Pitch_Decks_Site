'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Deck } from '@/db';
import { getDeckSlideUrls } from '@/lib/mock-decks';
import { GoldenTicketSparkles } from './effects/GoldenTicketSparkles';

interface PitchDeckCardShowcaseProps {
  decks: Deck[];
  onCardClick?: (deck: Deck) => void;
  onQuickView?: (deck: Deck) => void;
}

/**
 * Dribbble-style card showcase for pitch decks
 * Features:
 * - Overlapping/tilted cards (like Dribbble examples)
 * - 3D tilt effects on hover
 * - Badges and tags
 * - Horizontal scroll
 * - Shows ALL decks, not just one
 */
export default function PitchDeckCardShowcase({
  decks,
  onCardClick,
  onQuickView,
}: PitchDeckCardShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  if (decks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-paper/60 text-lg">No pitch decks found.</p>
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
            Our Pitch Decks
          </h2>
          <p className="text-paper/80 text-lg max-w-2xl mx-auto">
            Explore our collection of professionally crafted pitch decks
          </p>
        </motion.div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            onMouseEnter={checkScrollButtons}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              canScrollLeft
                ? 'bg-paper/10 text-paper hover:bg-paper/20 backdrop-blur-sm'
                : 'bg-paper/5 text-paper/30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            onMouseEnter={checkScrollButtons}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              canScrollRight
                ? 'bg-paper/10 text-paper hover:bg-paper/20 backdrop-blur-sm'
                : 'bg-paper/5 text-paper/30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Cards container - overlapping style */}
        <div
          ref={containerRef}
          onScroll={checkScrollButtons}
          className="flex gap-0 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingLeft: '60px', // Offset for first card overlap
          }}
        >
          {decks.map((deck, index) => {
            const slides = getDeckSlideUrls(deck.id);
            const firstSlide = slides[0] || '/images/posters/hero-poster.jpg';
            
            return (
              <DeckCard
                key={deck.id}
                deck={deck}
                thumbnail={firstSlide}
                index={index}
                onCardClick={() => onCardClick?.(deck)}
                onQuickView={() => onQuickView?.(deck)}
              />
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

/**
 * Individual deck card with 3D tilt and Dribbble-style design
 */
function DeckCard({
  deck,
  thumbnail,
  index,
  onCardClick,
  onQuickView,
}: {
  deck: Deck;
  thumbnail: string;
  index: number;
  onCardClick?: () => void;
  onQuickView?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Card dimensions - vertical aspect ratio like Dribbble examples
  const aspectRatio = 'aspect-[9/16]';
  const cardWidth = 'w-[280px] md:w-[320px] min-w-[280px]';

  // 3D tilt effect (like EducationalVideoCard)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);

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

  // Calculate flying entrance from different directions based on index
  const getEntranceAnimation = (idx: number) => {
    const positions = [
      { x: -300, y: 100, z: -200, rotate: -15 },   // from left-bottom
      { x: 300, y: -100, z: -200, rotate: 15 },    // from right-top
      { x: -200, y: -150, z: -300, rotate: 10 },   // from left-top
      { x: 200, y: 150, z: -250, rotate: -10 },    // from right-bottom
      { x: 0, y: 200, z: -400, rotate: 5 },        // from bottom center
      { x: -250, y: 50, z: -200, rotate: -20 },    // from left
    ];
    return positions[idx % positions.length];
  };

  const entranceStart = getEntranceAnimation(index);

  return (
    <motion.div
      ref={cardRef}
      initial={{
        opacity: 0,
        x: entranceStart.x,
        y: entranceStart.y,
        z: entranceStart.z,
        scale: 0.3,
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
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      // Continuous floating animation when not hovering
      animate={
        isHovered
          ? {}
          : {
              y: [0, -8, 0],
              transition: {
                duration: 3 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }
            }
      }
      style={{
        rotateX,
        rotateY,
        zIndex: 10 - (index as any), // Overlapping effect - later cards appear on top
        marginLeft: index > 0 ? '-60px' : '0', // Overlap cards
      } as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative flex-shrink-0 cursor-pointer"
      onClick={onCardClick}
    >
      <GoldenTicketSparkles intensity="subtle">
        <div className={`relative ${cardWidth} overflow-hidden rounded-2xl bg-charcoal shadow-2xl`}>
        {/* Thumbnail Image */}
        <div className={`relative ${aspectRatio} overflow-hidden`}>
          <Image
            src={thumbnail}
            alt={deck.title}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            sizes="(max-width: 768px) 280px, 320px"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top-left category badge (like Dribbble examples) */}
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal">
              Pitch Deck
            </div>
          </div>

          {/* Top-right extra tag (like "+360" in examples) */}
          {deck.view_count && deck.view_count > 100 && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-charcoal">+</span>
              </div>
            </div>
          )}

          {/* Bottom-center deck title tag (like "netflix", "kfc" in examples) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="px-4 py-2 bg-accent-indigo/90 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-white lowercase">{deck.title}</span>
            </div>
          </div>

          {/* Play button overlay on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView?.();
                }}
                className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl"
              >
                <Play className="w-8 h-8 text-charcoal ml-1" fill="currentColor" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Card Info */}
        <div className="p-4 bg-charcoal">
          <h3 className="font-display text-lg font-bold text-paper mb-1 line-clamp-1">
            {deck.title}
          </h3>
          {deck.logline && (
            <p className="text-sm text-paper/70 line-clamp-2">
              {deck.logline}
            </p>
          )}
          {deck.view_count && (
            <div className="mt-2 flex items-center gap-2 text-xs text-paper/50">
              <span>{deck.view_count} views</span>
            </div>
          )}
        </div>
      </div>
      </GoldenTicketSparkles>
    </motion.div>
  );
}
