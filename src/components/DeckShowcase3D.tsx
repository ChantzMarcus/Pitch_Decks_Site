'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/FilmIcons';
import type { Deck } from '@/db';

interface Slide {
  id: string;
  url: string;
  caption: string;
}

interface DeckWithSlides extends Deck {
  slides?: Slide[];
}

interface DeckShowcase3DProps {
  decks: DeckWithSlides[];
  onDeckClick?: (deck: Deck) => void;
}

/**
 * DeckShowcase3D - Interactive 3D stacked card showcase
 *
 * Features:
 * - 3D card stack effect like the CodePen example
 * - Click to expand deck viewer in-place
 * - CTA button always visible
 * - Smooth animations without gimmicks
 */
export default function DeckShowcase3D({ decks, onDeckClick }: DeckShowcase3DProps) {
  const [expandedDeck, setExpandedDeck] = useState<DeckWithSlides | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }, [handleClose, nextSlide, prevSlide]);

  return (
    <div className="relative w-full py-16" ref={containerRef} onKeyDown={handleKeyDown}>
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

      {/* 3D Card Stack */}
      {!expandedDeck && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              Featured Pitch Decks
            </h2>
            <p className="text-xl text-paper-muted">
              Click any deck to explore
            </p>
          </div>

          {/* 3D Stacked Cards */}
          <div className="relative h-[500px] flex items-center justify-center perspective-container">
            {decks.slice(0, 5).map((deck, index) => {
              const offset = index * 2;
              const rotateOffset = index * 3;
              const scaleOffset = 1 - index * 0.05;
              const zIndex = 50 - index;

              return (
                <motion.div
                  key={deck.id}
                  className="absolute cursor-pointer"
                  style={{
                    width: '320px',
                    height: '480px',
                    zIndex,
                  }}
                  initial={{
                    x: offset * 8,
                    y: offset * 4,
                    rotateZ: rotateOffset,
                    scale: scaleOffset,
                    opacity: 1 - index * 0.1
                  }}
                  whileHover={{
                    x: (index - 2) * 40,
                    y: -10,
                    rotateZ: (index - 2) * 5,
                    scale: scaleOffset + 0.05,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: scaleOffset - 0.02 }}
                  onClick={() => handleDeckClick(deck)}
                >
                  {/* Card */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-charcoal border border-white/10">
                    {/* Cover Image */}
                    <div className="relative w-full h-3/5">
                      <Image
                        src={deck.cover_image_url}
                        alt={deck.title}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {deck.genre.slice(0, 2).map(g => (
                          <span
                            key={g}
                            className="px-2 py-1 bg-accent-indigo/20 text-accent-indigo text-xs rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-bold text-paper mb-2">
                        {deck.title}
                      </h3>
                      <p className="text-sm text-paper-muted line-clamp-2">
                        {deck.logline}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/0 to-accent-indigo/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
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

              {/* Slide Viewer */}
              <div className="flex-1 flex items-center justify-center p-8">
                {expandedDeck.slides && expandedDeck.slides.length > 0 ? (
                  <div className="relative w-full max-w-5xl aspect-video">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={expandedDeck.slides[currentSlideIndex].url}
                          alt={expandedDeck.slides[currentSlideIndex].caption}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {currentSlideIndex > 0 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}
                    {currentSlideIndex < expandedDeck.slides.length - 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-paper-muted">
                    No slides available
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

      {/* CSS for perspective */}
      <style jsx>{`
        .perspective-container {
          perspective: 1000px;
          perspective-origin: center center;
        }
      `}</style>
    </div>
  );
}
