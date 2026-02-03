'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight, Expand, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Deck } from '@/db';
import { getDeckSlideUrls } from '@/lib/mock-decks';

interface DeckWalkthroughModalProps {
  deck: Deck & { slides?: string[] };
  isOpen: boolean;
  onClose: () => void;
  autoPlay?: boolean; // Start auto-play on open
  autoPlayInterval?: number; // Milliseconds per slide (default 4000)
  onImmersiveView?: (deck: Deck & { slides?: string[] }) => void; // Callback to switch to immersive view
}

interface Slide {
  id: string;
  deck_id: string;
  slide_number: number;
  image_url: string;
  caption: string;
}

/**
 * DeckWalkthroughModal - Auto-playing slideshow for pitch decks
 *
 * Features:
 * - Auto-play mode with configurable timing
 * - Play/Pause controls
 * - Progress bar with slide indicators
 * - Keyboard shortcuts (Space = pause/play, arrows = navigate)
 * - Smooth transitions between slides
 * - Fullscreen viewing
 */
export default function DeckWalkthroughModal({
  deck,
  isOpen,
  onClose,
  autoPlay = false,
  autoPlayInterval = 4000,
  onImmersiveView,
}: DeckWalkthroughModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout>();

  // Load slides when deck changes or modal opens
  useEffect(() => {
    if (isOpen && deck) {
      setCurrentSlideIndex(0);
      setIsLoading(true);
      setIsPlaying(autoPlay);

      const slideUrls = getDeckSlideUrls(deck.id);

      if (slideUrls.length > 0) {
        const slideObjects: Slide[] = slideUrls.map((url, index) => ({
          id: `${deck.id}-slide-${index + 1}`,
          deck_id: deck.id,
          slide_number: index + 1,
          image_url: url,
          caption: `Slide ${index + 1} of ${deck.title}`,
        }));
        setSlides(slideObjects);
      } else {
        setSlides([{
          id: `${deck.id}-slide-1`,
          deck_id: deck.id,
          slide_number: 1,
          image_url: deck.cover_image_url,
          caption: `${deck.title} - Cover`,
        }]);
      }

      const timer = setTimeout(() => setIsLoading(false), 200);
      closeButtonRef.current?.focus();

      return () => clearTimeout(timer);
    }
  }, [isOpen, deck, autoPlay]);

  // Auto-play logic
  useEffect(() => {
    if (!isOpen || !isPlaying || slides.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isOpen, isPlaying, slides.length, autoPlayInterval]);

  // Clear timer when modal closes or playing state changes
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case ' ': // Spacebar
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, slides.length, onClose]);

  const goToNext = () => {
    if (slides.length === 0) return;
    setIsPlaying(false); // Pause when manually navigating
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    if (slides.length === 0) return;
    setIsPlaying(false); // Pause when manually navigating
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];
  const hasSlides = slides.length > 1;
  const progress = hasSlides ? ((currentSlideIndex + 1) / slides.length) * 100 : 100;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="walkthrough-title"
        className={`fixed inset-0 bg-black z-50 flex flex-col ${isFullscreen ? 'rounded-none' : 'rounded-lg m-4'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
          {/* Left: Title */}
          <div className="flex items-center gap-4">
            <h3 id="walkthrough-title" className="font-display text-xl font-bold text-white">
              {deck.title}
            </h3>
            {hasSlides && (
              <span className="text-white/60 text-sm">
                {currentSlideIndex + 1} / {slides.length}
              </span>
            )}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Auto-play toggle */}
            {hasSlides && (
              <button
                onClick={togglePlay}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            )}

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle fullscreen"
            >
              <Expand size={20} />
            </button>

            {/* Immersive View button */}
            {onImmersiveView && (
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onImmersiveView(deck);
                  }, 300);
                }}
                className="p-2 bg-accent-teal/20 hover:bg-accent-teal/30 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal"
                aria-label="Switch to immersive view"
                title="Switch to immersive full-screen view"
              >
                <Maximize2 size={20} />
              </button>
            )}

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close walkthrough"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {hasSlides && (
          <div className="w-full h-1 bg-white/20">
            <motion.div
              className="h-full bg-accent-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Main Content - Slide Display */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-full" role="status" aria-label="Loading slides">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-gold"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : currentSlide ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentSlide.image_url}
                  alt={`Slide ${currentSlideIndex + 1} of ${deck.title}`}
                  fill
                  className="object-contain max-w-full max-h-full"
                  priority={currentSlideIndex === 0}
                  sizes="(max-width: 1400px) 100vw"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-white text-center">
              <p>No slides available for this deck.</p>
            </div>
          )}
        </div>

        {/* Bottom Bar - Navigation */}
        {hasSlides && (
          <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  role="tab"
                  aria-selected={index === currentSlideIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  tabIndex={index === currentSlideIndex ? 0 : -1}
                  className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                    index === currentSlideIndex
                      ? 'bg-accent-gold scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Info */}
            <div className="text-white/60 text-sm">
              {deck.logline && (
                <span className="hidden sm:inline">{deck.logline}</span>
              )}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Hint */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 text-xs opacity-0 hover:opacity-100 transition-opacity">
          Space: Play/Pause | ← →: Navigate | F: Fullscreen | Esc: Close
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
