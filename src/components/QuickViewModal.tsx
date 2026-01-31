'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Deck } from '@/db';
import { getDeckSlideUrls } from '@/lib/mock-decks';

interface QuickViewModalProps {
  deck: Deck & { slides?: string[] };
  isOpen: boolean;
  onClose: () => void;
}

interface Slide {
  id: string;
  deck_id: string;
  slide_number: number;
  image_url: string;
  caption: string;
}

export default function QuickViewModal({ deck, isOpen, onClose }: QuickViewModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Load slides when deck changes or modal opens
  useEffect(() => {
    if (isOpen && deck) {
      setCurrentSlideIndex(0);
      setIsLoading(true);

      // Get slide URLs for this deck
      const slideUrls = getDeckSlideUrls(deck.id);

      if (slideUrls.length > 0) {
        // Create slide objects from URLs
        const slideObjects: Slide[] = slideUrls.map((url, index) => ({
          id: `${deck.id}-slide-${index + 1}`,
          deck_id: deck.id,
          slide_number: index + 1,
          image_url: url,
          caption: `Slide ${index + 1} of ${deck.title}`,
        }));
        setSlides(slideObjects);
      } else {
        // Fallback to cover image if no slides
        setSlides([{
          id: `${deck.id}-slide-1`,
          deck_id: deck.id,
          slide_number: 1,
          image_url: deck.cover_image_url,
          caption: `${deck.title} - Cover`,
        }]);
      }

      // Simulate minimal loading time for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      // Focus close button when modal opens
      closeButtonRef.current?.focus();

      return () => clearTimeout(timer);
    }
  }, [isOpen, deck]);

  // Focus trap for modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && slides.length > 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && slides.length > 1) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, slides.length]);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];
  const hasSlides = slides.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Close quick view modal"
        >
          <X size={24} />
        </button>

        {/* Navigation arrows - only show if multiple slides */}
        {hasSlides && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide counter */}
        {hasSlides && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
            role="status"
            aria-live="polite"
          >
            {currentSlideIndex + 1} / {slides.length}
          </div>
        )}

        {/* Main content */}
        <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-full" role="status" aria-label="Loading slides">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : currentSlide ? (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentSlide.image_url}
                alt={`Slide ${currentSlideIndex + 1} of ${deck.title}`}
                fill
                className="object-contain max-w-full max-h-full"
                priority={currentSlideIndex === 0}
                sizes="(max-width: 1200px) 100vw"
              />
            </motion.div>
          ) : (
            <div className="text-white text-center">
              <p>No slides available for this deck.</p>
            </div>
          )}
        </div>

        {/* Deck info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <h3 id="modal-title" className="font-display text-xl font-bold">{deck.title}</h3>
          <p id="modal-description" className="text-sm opacity-80">
            {deck.logline || (hasSlides ? `Slide ${currentSlideIndex + 1} of ${slides.length}` : 'Cover Image')}
          </p>
          {deck.genre && (
            <div className="flex gap-2 justify-center mt-2">
              {deck.genre.slice(0, 2).map((g) => (
                <span key={g} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip - only show if multiple slides */}
        {hasSlides && (
          <div className="absolute bottom-24 left-0 right-0">
            <div className="flex justify-center gap-2 overflow-x-auto py-2 px-4 scrollbar-hide" role="tablist" aria-label="Slide thumbnails">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlideIndex(index);
                  }}
                  role="tab"
                  aria-selected={index === currentSlideIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  tabIndex={index === currentSlideIndex ? 0 : -1}
                  className={`relative w-16 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all ${
                    index === currentSlideIndex
                      ? 'border-white scale-105'
                      : 'border-transparent hover:border-white/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={slide.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
