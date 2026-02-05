'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface LargeDeckShowcaseProps {
  decks: DeckWithSlides[];
  onDeckClick?: (deck: Deck) => void;
}

/**
 * LargeDeckShowcase - Full-size deck images showcase
 *
 * Features:
 * - Large deck cover images (as big as possible)
 * - Click to open full deck viewer
 * - Minimal overlay info
 * - Clean, no cropped cards
 */
export default function LargeDeckShowcase({ decks, onDeckClick }: LargeDeckShowcaseProps) {
  const [expandedDeck, setExpandedDeck] = useState<DeckWithSlides | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
    <div className="relative w-full py-16" onKeyDown={handleKeyDown}>
      {/* Large Deck Grid */}
      {!expandedDeck && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              Featured Pitch Decks
            </h2>
            <p className="text-xl text-paper-muted">
              Click any deck to view all slides
            </p>
          </div>

          {/* Large Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decks.slice(0, 6).map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleDeckClick(deck)}
              >
                {/* Full-size deck image container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-charcoal border border-white/10">
                  {/* Deck Cover Image - Full Size */}
                  <Image
                    src={deck.cover_image_url}
                    alt={deck.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Title overlay - minimal */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-accent-indigo-glow transition-colors">
                      {deck.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {deck.logline}
                    </p>
                  </div>

                  {/* Hover "View All Slides" indicator */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-accent-indigo/90 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View All Slides →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
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

      {/* Full Deck Viewer Modal */}
      <AnimatePresence>
        {expandedDeck && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-bold text-white">
                  {expandedDeck.title}
                </h2>
                <span className="text-sm text-white/60">
                  {expandedDeck.slides && `${currentSlideIndex + 1} / ${expandedDeck.slides.length}`}
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

            {/* Slide Viewer - Full Screen */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              {expandedDeck.slides && expandedDeck.slides.length > 0 ? (
                <div className="relative w-full max-w-7xl aspect-video">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlideIndex}
                      className="relative w-full h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                  )}
                  {currentSlideIndex < expandedDeck.slides.length - 1 && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center text-white/60">
                  No slides available
                </div>
              )}
            </div>

            {/* Progress dots */}
            {expandedDeck.slides && expandedDeck.slides.length > 1 && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {expandedDeck.slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlideIndex
                        ? 'bg-accent-indigo w-12'
                        : 'bg-white/30 hover:bg-white/50 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
