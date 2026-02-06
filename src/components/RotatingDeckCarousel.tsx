'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/FilmIcons';
import type { Deck } from '@/db';
import type { DeckWithSlides } from '@/lib/mock-decks';

interface RotatingDeckCarouselProps {
  decks: DeckWithSlides[];
  onDeckClick?: (deck: DeckWithSlides) => void;
}

/**
 * RotatingDeckCarousel - 3D rotating carousel inspired by CodePen
 *
 * Features:
 * - 3D carousel with decks arranged in a circle
 * - Auto-rotates through decks
 * - Click to expand deck viewer in-place
 * - Drag/swipe to rotate manually
 * - Larger cover images with smooth hover effects
 * - CTA button always visible
 */
export default function RotatingDeckCarousel({ decks, onDeckClick }: RotatingDeckCarouselProps) {
  const [expandedDeck, setExpandedDeck] = useState<DeckWithSlides | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 200], [-30, 30]);

  const handleDeckClick = useCallback((deck: DeckWithSlides) => {
    setExpandedDeck(deck);
    setCurrentSlideIndex(0);
    onDeckClick?.(deck);
  }, [onDeckClick]);

  const handleClose = useCallback(() => {
    setExpandedDeck(null);
    setCurrentSlideIndex(0);
  }, []);

  const nextSlide = useCallback(() => {
    if (expandedDeck && expandedDeck.slides && currentSlideIndex < expandedDeck.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [expandedDeck, currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.offset.x;
    const angleChange = (dragDistance / window.innerWidth) * 45; // Scale drag to rotation
    setRotationAngle(prev => prev + angleChange);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }, [handleClose, nextSlide, prevSlide]);

  // Calculate visible cards (show 3-5 cards)
  const visibleDecks = decks.slice(0, 5);
  const angleStep = 360 / visibleDecks.length;

  return (
    <div
      className="relative w-full py-20"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Always-visible CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/questionnaire"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo hover:bg-accent-indigo-glow text-white font-semibold rounded-full shadow-lg shadow-accent-indigo/30 transition-all hover:scale-105"
        >
          Get Your Free Score
          <ArrowRightIcon size={18} />
        </Link>
      </div>

      {/* 3D Rotating Carousel */}
      {!expandedDeck && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              Featured Pitch Decks
            </h2>
            <p className="text-xl text-paper-muted">
              Click any deck to explore • Drag to rotate
            </p>
          </div>

          {/* 3D Carousel Container */}
          <div
            className="relative h-[800px] flex items-center justify-center"
            style={{
              perspective: '2000px',
            }}
          >
            <motion.div
              className="relative"
              style={{
                width: '1000px',
                height: '562px', // 16:9 aspect ratio
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: isPaused ? rotationAngle + dragRotate.get() : rotationAngle,
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 20,
              }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
            >
              {visibleDecks.map((deck, index) => {
                const cardAngle = index * angleStep;
                const isFrontCard = Math.abs(((rotationAngle % 360) + 360) % 360 - cardAngle) < angleStep / 2;

                return (
                  <motion.div
                    key={deck.id}
                    className="absolute cursor-pointer group"
                    style={{
                      width: '1000px',
                      height: '562px', // 16:9 aspect ratio
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${cardAngle}deg) translateZ(750px)`,
                    }}
                    whileHover={{
                      scale: isFrontCard ? 1.02 : 1.01,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => handleDeckClick(deck)}
                  >
                    {/* Card */}
                    <div
                      className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-charcoal border-4 transition-all duration-300 ${
                        isFrontCard
                          ? 'border-accent-indigo shadow-accent-indigo/60 shadow-2xl'
                          : 'border-white/20 shadow-black/50'
                      }`}
                    >
                      {/* Cover Image - FULL SIZE 16:9 */}
                      <div className="relative w-full h-full">
                        <Image
                          src={deck.cover_image_url}
                          alt={deck.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority
                        />
                        {/* Minimal dark overlay at bottom only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Front card indicator - larger */}
                        {isFrontCard && (
                          <div className="absolute top-6 right-6 px-6 py-3 bg-accent-indigo text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                            Click to View Deck →
                          </div>
                        )}

                        {/* Title overlay - minimal */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h3 className="font-display text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            {deck.title}
                          </h3>
                          <p className="text-lg text-white/90 line-clamp-1 drop-shadow-md">
                            {deck.logline}
                          </p>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/0 to-accent-indigo/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
                    </div>

                    {/* Card back (for 3D effect) */}
                    <div
                      className="absolute inset-0 rounded-3xl bg-charcoal border-4 border-white/10"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setRotationAngle(prev => prev - angleStep)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Previous deck"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-paper-muted text-sm">
              Drag or use arrows to browse
            </span>
            <button
              onClick={() => setRotationAngle(prev => prev + angleStep)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Next deck"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-accent-indigo hover:text-accent-indigo-glow font-medium transition-colors"
            >
              View All Projects
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      )}

      {/* Expanded Deck Viewer (in-place expansion) */}
      <AnimatePresence>
        {expandedDeck && (
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Deck Viewer */}
            <div className="relative w-full h-full flex flex-col">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-white">
                    {expandedDeck.title}
                  </h2>
                  <span className="text-sm text-white/60">
                    {expandedDeck.slides && `${currentSlideIndex + 1} of ${expandedDeck.slides.length}`}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Slide Viewer - FULL SCREEN */}
              <div className="flex-1 flex items-center justify-center p-6">
                {expandedDeck.slides && expandedDeck.slides.length > 0 ? (
                  <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        className="relative w-full h-full flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-full h-full max-h-[70vh]">
                          <Image
                            src={expandedDeck.slides[currentSlideIndex]}
                            alt={`${expandedDeck.title} - Slide ${currentSlideIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows - larger */}
                    {currentSlideIndex > 0 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all shadow-xl z-10"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-10 h-10" />
                      </button>
                    )}
                    {currentSlideIndex < expandedDeck.slides.length - 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all shadow-xl z-10"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-10 h-10" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-white/60 text-xl">
                    Loading slides...
                  </div>
                )}
              </div>

              {/* Progress dots */}
              {expandedDeck.slides && expandedDeck.slides.length > 1 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {expandedDeck.slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlideIndex
                          ? 'bg-accent-indigo w-8'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
