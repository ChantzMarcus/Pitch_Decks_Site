'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface FlickThroughDeckProps {
  slides: Array<{
    id: string;
    url: string;
    title?: string;
    caption?: string;
  }>;
  initialSlide?: number;
  onClose?: () => void;
  className?: string;
  onSlideChange?: (index: number) => void;
}

/**
 * FlickThroughDeck - Realistic card deck flicking animation
 *
 * Features:
 * - 3D card flip transforms like a real deck
 * - Stack depth effect with multiple visible cards
 * - Physics-based spring animations
 * - Drag/swipe gestures for touch and mouse
 * - Keyboard navigation (arrow keys)
 * - Realistic shadows and lighting
 */
export default function FlickThroughDeck({
  slides,
  initialSlide = 0,
  onClose,
  className = '',
  onSlideChange,
}: FlickThroughDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);

  // Motion values for card position and rotation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

  // Get visible cards (stack effect)
  const getVisibleCards = useCallback(() => {
    const cards = [];
    const stackDepth = 3; // Number of cards visible in stack

    for (let i = stackDepth; i >= 0; i--) {
      const cardIndex = (currentIndex + i) % slides.length;
      if (slides[cardIndex]) {
        cards.push({
          slide: slides[cardIndex],
          index: cardIndex,
          offset: i,
          zIndex: stackDepth - i,
        });
      }
    }

    return cards;
  }, [currentIndex, slides]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      onSlideChange?.(currentIndex + 1);
    }
  }, [currentIndex, slides.length, onSlideChange]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      onSlideChange?.(currentIndex - 1);
    }
  }, [currentIndex, onSlideChange]);

  // Handle drag start
  const handleDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX;
    dragStartTime.current = Date.now();
    setIsDragging(true);
  }, []);

  // Handle drag move
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    x.set(deltaX);
  }, [isDragging, x]);

  // Handle drag end
  const handleDragEnd = useCallback((_clientX: number, velocity: number) => {
    setIsDragging(false);
    const deltaX = x.get();
    const timeDelta = Date.now() - dragStartTime.current;

    // Determine if swipe is complete based on distance and velocity
    const swipeThreshold = 100;
    const velocityThreshold = 500;

    if (deltaX > swipeThreshold || (deltaX > 50 && velocity > velocityThreshold)) {
      // Swiped right - go to previous
      prevSlide();
    } else if (deltaX < -swipeThreshold || (deltaX < -50 && velocity < -velocityThreshold)) {
      // Swiped left - go to next
      nextSlide();
    }

    // Reset position
    x.set(0);
  }, [x, prevSlide, nextSlide]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    // Calculate velocity
    const deltaX = e.clientX - dragStartX.current;
    const timeDelta = Date.now() - dragStartTime.current;
    const velocity = timeDelta > 0 ? (deltaX / timeDelta) * 1000 : 0;
    handleDragEnd(e.clientX, velocity);
  }, [handleDragEnd]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const clientX = e.changedTouches[0].clientX;
    const deltaX = clientX - dragStartX.current;
    const timeDelta = Date.now() - dragStartTime.current;
    const velocity = timeDelta > 0 ? (deltaX / timeDelta) * 1000 : 0;
    handleDragEnd(clientX, velocity);
  }, [handleDragEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onClose]);

  // Reset position when not dragging
  useEffect(() => {
    if (!isDragging) {
      x.set(0);
    }
  }, [isDragging, x, currentIndex]);

  if (slides.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-paper-muted">No slides to display</p>
      </div>
    );
  }

  const visibleCards = getVisibleCards();
  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <div className="text-white">
            <h3 className="font-display font-bold text-lg">
              {currentSlide?.title || `Slide ${currentIndex + 1}`}
            </h3>
            <p className="text-sm text-white/70">
              {currentIndex + 1} of {slides.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative flex-1 flex items-center justify-center perspective-1000">
        {visibleCards.map(({ slide, index, offset, zIndex }) => {
          const isActive = index === currentIndex;
          const stackOffset = offset * 8; // Pixels to offset stacked cards
          const stackRotation = offset * 2; // Degrees to rotate stacked cards
          const stackScale = 1 - offset * 0.05; // Scale down stacked cards
          const stackOpacity = 1 - offset * 0.2; // Fade out stacked cards

          return (
            <motion.div
              key={`${slide.id}-${index}`}
              className="absolute"
              style={{
                zIndex: zIndex as any,
                transformOrigin: 'center left' as any,
              }}
              initial={false}
              animate={{
                x: isActive ? x.get() : -stackOffset,
                y: isActive ? 0 : offset * 4,
                rotateY: isActive ? rotate.get() : -stackRotation,
                scale: isActive ? scale.get() : stackScale,
                opacity: isActive ? opacity.get() : stackOpacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
            >
              {/* Card with 3D effect */}
              <div
                className="relative bg-charcoal rounded-lg shadow-2xl overflow-hidden"
                style={{
                  width: '85vw',
                  maxWidth: '600px',
                  aspectRatio: '16/9',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main slide image */}
                <div className="relative w-full h-full">
                  <Image
                    src={slide.url}
                    alt={slide.caption || slide.title || `Slide ${index + 1}`}
                    fill
                    className="object-contain"
                    draggable={false}
                  />

                  {/* Lighting gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(
                          135deg,
                          rgba(255, 255, 255, 0.1) 0%,
                          transparent 50%,
                          rgba(0, 0, 0, 0.2) 100%
                        )
                      `,
                    }}
                  />

                  {/* Paper texture overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 0, 0, 0.1) 2px,
                          rgba(0, 0, 0, 0.1) 4px
                        )
                      `,
                    }}
                  />
                </div>

                {/* Card edge highlight (3D effect) */}
                {isActive && (
                  <div
                    className="absolute inset-y-0 left-0 w-1 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                )}
              </div>

              {/* Shadow effect */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-4 left-4 right-4 h-4 bg-black/40 blur-xl rounded-full"
                  style={{
                    scale: useTransform(x, [-200, 200], [0.8, 1.2]),
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-accent-indigo rounded-full"
            initial={{ width: `${((currentIndex) / slides.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/60">
          <span>Swipe or use arrow keys</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>
    </div>
  );
}

// Wrapper component for modal-like usage
export function FlickThroughModal({
  slides,
  isOpen,
  onClose,
  initialSlide = 0,
}: {
  slides: FlickThroughDeckProps['slides'];
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <FlickThroughDeck
        slides={slides}
        initialSlide={initialSlide}
        onClose={onClose}
        className="w-full h-full max-w-6xl max-h-[90vh]"
      />
    </motion.div>
  );
}
