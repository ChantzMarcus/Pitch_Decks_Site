'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Deck } from '@/db';

interface QuickViewModalProps {
  deck: Deck;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ deck, isOpen, onClose }: QuickViewModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading slides for the deck
  useEffect(() => {
    if (isOpen) {
      // Reset to first slide when opening
      setCurrentSlideIndex(0);
      setIsLoading(true);

      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Generate placeholder slides based on slide_count
  const slides = Array.from({ length: deck.slide_count }, (_, i) => ({
    id: `${deck.id}-slide-${i + 1}`,
    deck_id: deck.id,
    slide_number: i + 1,
    image_url: deck.cover_image_url, // Using cover as placeholder
    caption: `Slide ${i + 1} of ${deck.title}`,
    created_at: new Date().toISOString()
  }));

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Close quick view"
        >
          <X size={24} />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide counter */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
          {currentSlideIndex + 1} / {slides.length}
        </div>

        {/* Main content */}
        <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentSlide.image_url}
                alt={`Slide ${currentSlideIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Deck info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <h3 className="font-display text-xl font-bold">{deck.title}</h3>
          <p className="text-sm opacity-80">{currentSlide.caption || `Slide ${currentSlideIndex + 1}`}</p>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 overflow-x-auto py-2 px-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIndex(index);
              }}
              className={`relative w-16 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                index === currentSlideIndex ? 'border-white' : 'border-transparent'
              }`}
            >
              <Image
                src={deck.cover_image_url} // Using cover as placeholder
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}