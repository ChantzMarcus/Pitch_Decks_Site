'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';

// Constants for timing
const DEFAULT_AUTO_ROTATE_INTERVAL = 15000; // 15 seconds per featured deck
const DEFAULT_SLIDE_INTERVAL = 4000; // 4 seconds per slide

interface FeaturedDeck {
  deck: Deck;
  slides: string[];
  highlightText?: string;
  ctaText?: string;
}

interface FeaturedDeckWalkthroughProps {
  featuredDecks: FeaturedDeck[];
  autoRotateInterval?: number; // Rotate featured decks every X milliseconds
  slideInterval?: number; // Time per slide within a deck
  onWatchFullDeck?: (deck: Deck) => void;
}

/**
 * FeaturedDeckWalkthrough - Hero-style featured deck presentation
 *
 * A prominent, cinematic showcase that:
 * - Auto-plays through slides of featured decks
 * - Has a beautiful frame/stage presentation
 * - Includes "Watch Full Deck" CTA
 * - Rotates through multiple featured decks
 * - Links to the full walkthrough modal
 */
export default function FeaturedDeckWalkthrough({
  featuredDecks,
  autoRotateInterval = DEFAULT_AUTO_ROTATE_INTERVAL,
  slideInterval = DEFAULT_SLIDE_INTERVAL,
  onWatchFullDeck,
}: FeaturedDeckWalkthroughProps) {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeDeck = featuredDecks[activeDeckIndex];
  const currentSlide = activeDeck?.slides[activeSlideIndex];

  // Auto-rotate through featured decks
  useEffect(() => {
    if (isPaused || featuredDecks.length === 0) return;

    // Cycle through slides of current deck, then move to next deck
    const slideTimer = setInterval(() => {
      setActiveSlideIndex((prevSlide) => {
        const currentDeck = featuredDecks[activeDeckIndex];
        if (!currentDeck?.slides || currentDeck.slides.length === 0) {
          return prevSlide;
        }
        
        const nextSlide = prevSlide + 1;
        
        // If we've gone through all slides, move to next deck
        if (nextSlide >= currentDeck.slides.length) {
          setActiveDeckIndex((prevDeck) => (prevDeck + 1) % featuredDecks.length);
          return 0; // Reset to first slide of next deck
        }
        
        return nextSlide;
      });
    }, slideInterval);

    return () => clearInterval(slideTimer);
  }, [activeDeckIndex, featuredDecks, isPaused, slideInterval]);

  // Manual navigation for featured decks
  const goToNextDeck = () => {
    setActiveDeckIndex((prev) => (prev + 1) % featuredDecks.length);
    setActiveSlideIndex(0);
  };

  const goToPrevDeck = () => {
    setActiveDeckIndex((prev) => (prev - 1 + featuredDecks.length) % featuredDecks.length);
    setActiveSlideIndex(0);
  };

  const handleWatchFullDeck = () => {
    onWatchFullDeck?.(activeDeck.deck);
  };

  if (!activeDeck) return null;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      className="relative py-20 md:py-32 bg-charcoal overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 via-transparent to-accent-gold/20 animate-pulse" />
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`,
            animation: 'gradient-shift 8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded-full mb-6">
            <Play className="w-4 h-4 text-accent-gold fill-current" />
            <span className="text-sm font-medium text-accent-gold">Featured Project</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-6">
            {activeDeck.deck.title}
          </h2>
          <p className="text-xl text-paper/70 max-w-3xl mx-auto">
            {activeDeck.deck.logline || activeDeck.highlightText || 'A compelling story ready for production'}
          </p>
        </motion.div>

        {/* Main Stage - Featured Deck Presentation */}
        <div className="relative max-w-6xl mx-auto">
          {/* Cinematic Frame */}
          <motion.div
            key={activeDeckIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Frame border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-indigo via-accent-gold to-accent-teal rounded-2xl opacity-50 blur-sm" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-indigo via-accent-gold to-accent-teal rounded-2xl opacity-30 blur-md" />

            {/* Main content frame */}
            <div className="relative bg-charcoal-light rounded-xl overflow-hidden shadow-2xl border border-white/10">
              {/* Slide Display */}
              <div className="relative aspect-video">
                <AnimatePresence mode="wait">
                  {currentSlide && (
                    <motion.div
                      key={currentSlide}
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentSlide}
                        alt={`Slide ${activeSlideIndex + 1} of ${activeDeck.deck.title}`}
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 1400px) 100vw"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/20">
                  <div className="flex gap-1.5">
                    {activeDeck.slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === activeSlideIndex
                            ? 'bg-accent-gold scale-125'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {activeSlideIndex + 1} / {activeDeck.slides.length}
                  </span>
                </div>
              </div>

              {/* Deck Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between gap-6">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {activeDeck.deck.genre.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-accent-indigo/80 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {activeDeck.deck.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {activeDeck.deck.logline}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleWatchFullDeck}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-indigo to-accent-gold text-white font-semibold rounded-xl shadow-2xl hover:shadow-accent-indigo/50 transition-all border border-white/20"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Full Deck</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Deck Navigation */}
          {featuredDecks.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrevDeck}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Previous featured deck"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Deck indicators */}
              <div className="flex gap-2">
                {featuredDecks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveDeckIndex(i);
                      setActiveSlideIndex(0);
                    }}
                    className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-charcoal ${
                      i === activeDeckIndex
                        ? 'bg-accent-gold scale-125 w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`View featured deck ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNextDeck}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Next featured deck"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Stats / Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-gold mb-2">
              {activeDeck.deck.slide_count}
            </div>
            <div className="text-paper/70 text-sm">Slides</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-indigo mb-2">
              {activeDeck.deck.view_count}
            </div>
            <div className="text-paper/70 text-sm">Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-teal mb-2">
              {activeDeck.deck.production_status}
            </div>
            <div className="text-paper/70 text-sm">Status</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-indigo/10 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full filter blur-[100px]" />

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
