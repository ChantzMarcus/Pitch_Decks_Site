'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { Deck } from '@/db';
import { getDeckSlideUrls } from '@/lib/mock-decks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MetallicDeckCarouselProps {
  decks: Deck[];
  onDeckClick?: (deck: Deck) => void;
}

/**
 * Metallic 3D Carousel for Pitch Decks
 * Inspired by circus golden ticket aesthetics with:
 * - Gold, silver, bronze metallic gradients
 * - 3D rotating carousel effect
 * - Ornate vintage styling with modern touches
 */
export default function MetallicDeckCarousel({
  decks,
  onDeckClick,
}: MetallicDeckCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  // Auto-rotate through decks
  useEffect(() => {
    if (!isPaused && isInView && decks.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % decks.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isInView, decks.length]);

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev - 1 + decks.length) % decks.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % decks.length);
    }
  };

  if (decks.length === 0) return null;

  // Calculate positions for 3D carousel effect
  const getCardStyle = (index: number) => {
    const total = decks.length;
    const diff = (index - activeIndex + total) % total;
    const offset = diff > total / 2 ? diff - total : diff;

    // Distance from center (0 = active card)
    const distance = Math.abs(offset);

    // Calculate 3D transforms
    const rotateY = offset * -45; // Rotate each card
    const translateZ = distance === 0 ? 200 : 100 - distance * 50; // Push center card forward
    const opacity = distance === 0 ? 1 : Math.max(0.3, 1 - distance * 0.25);
    const scale = distance === 0 ? 1 : Math.max(0.7, 1 - distance * 0.15);
    const zIndex = 50 - distance;

    return {
      transform: `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ornate header with metallic styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-block">
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
            <div className="w-3 h-3 rotate-45 border border-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-black">
            <span className="bg-gradient-to-br from-amber-200 via-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                  style={{ textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
              Golden Gallery
            </span>
          </h2>

          {/* Tagline */}
          <p className="mt-4 text-amber-200/80 font-serif italic text-lg md:text-xl">
            "Step right up and witness the magic..."
          </p>

          {/* Decorative bottom line */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
            <div className="w-3 h-3 rotate-45 border border-amber-400 bg-amber-400/20" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
          </div>
        </div>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px]">
        {/* Carousel */}
        <div
          className="relative w-[300px] md:w-[380px] h-[420px] md:h-[520px] transform-style-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {decks.map((deck, index) => {
            const slides = getDeckSlideUrls(deck.id);
            const thumbnail = slides[0] || '/images/posters/hero-poster.jpg';
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={deck.id}
                className="absolute inset-0 cursor-pointer"
                style={style as any}
                onClick={() => isActive && onDeckClick?.(deck)}
                whileHover={isActive ? { scale: 1.02 } : {}}
                transition={{ duration: 0.3 }}
              >
                {/* Metallic Card Frame */}
                <div
                  className={`
                    relative w-full h-full rounded-2xl overflow-hidden
                    ${isActive ? 'ring-4 ring-amber-400/50 ring-offset-4 ring-offset-charcoal' : ''}
                  `}
                  style={{
                    background: `
                      linear-gradient(135deg,
                        rgba(217, 119, 6, 0.3) 0%,
                        rgba(251, 191, 36, 0.1) 25%,
                        rgba(192, 192, 192, 0.2) 50%,
                        rgba(251, 191, 36, 0.1) 75%,
                        rgba(217, 119, 6, 0.3) 100%
                      )
                    `,
                    boxShadow: isActive
                      ? '0 25px 80px rgba(251, 191, 36, 0.4), 0 0 40px rgba(217, 119, 6, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 10px 40px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Ornate corner decorations */}
                  {isActive && (
                    <>
                      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-400/60 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-amber-400/60 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-amber-400/60 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-400/60 rounded-br-lg" />
                    </>
                  )}

                  {/* Deck thumbnail */}
                  <div className="relative w-full h-[70%] overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={deck.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 380px"
                    />
                    {/* Metallic overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `
                          linear-gradient(135deg,
                            rgba(255, 215, 0, 0.1) 0%,
                            transparent 50%,
                            rgba(192, 192, 192, 0.1) 100%
                          )
                        `,
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-charcoal via-charcoal/95 to-transparent p-4">
                    {/* Golden ticket-style label */}
                    <div className="inline-block px-3 py-1 mb-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full">
                      <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                        Featured
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
                      {deck.title}
                    </h3>
                    {deck.logline && (
                      <p className="text-amber-200/70 text-sm line-clamp-2">
                        {deck.logline}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons with circus styling */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('prev')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 text-charcoal shadow-lg hover:shadow-amber-400/50 transition-shadow"
          style={{
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
          aria-label="Previous deck"
        >
          <ChevronLeft className="w-7 h-7" />
        </motion.button>
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('next')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 text-charcoal shadow-lg hover:shadow-amber-400/50 transition-shadow"
          style={{
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
          aria-label="Next deck"
        >
          <ChevronRight className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Pagination dots with golden ticket style */}
      <div className="flex justify-center gap-3 mt-8">
        {decks.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 w-8'
                : 'bg-silver-400/30'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to deck ${index + 1}`}
          />
        ))}
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -50, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Ornate footer decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
          <div className="w-2 h-2 rotate-45 border border-amber-400/30" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>
      </div>
    </div>
  );
}
