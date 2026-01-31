'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  before: {
    title: string;
    description: string;
    image: string;
    issues?: string[];
  };
  after: {
    title: string;
    description: string;
    image: string;
    improvements?: string[];
  };
  metrics?: {
    funding?: string;
    timeline?: string;
    status?: string;
  };
}

interface BeforeAfterShowcaseProps {
  items?: BeforeAfterItem[];
  slides?: string[]; // Array of slide image URLs for slideshow mode
  title?: string;
  subtitle?: string;
  className?: string;
  autoAdvanceInterval?: number; // Auto-advance every X milliseconds (0 to disable)
}

/**
 * BeforeAfterShowcase Component
 *
 * Priority 1: Shows transformation from raw concept to polished deck
 * - Interactive slider with touch and mouse support
 * - Keyboard navigation (arrow keys)
 * - Auto-advance with pause on hover
 * - Smooth animations
 * - Success metrics display
 * - Full accessibility support
 */
export default function BeforeAfterShowcase({
  items = [],
  slides = [],
  title = 'See the Transformation',
  subtitle = 'From concept to production-ready pitch deck',
  className = '',
  autoAdvanceInterval = 3000, // Default 3 seconds for slideshow
}: BeforeAfterShowcaseProps) {
  // Slideshow mode: use slides array if provided
  const isSlideshowMode = slides.length > 0;
  const slideItems = isSlideshowMode ? slides : [];
  const totalItems = isSlideshowMode ? slideItems.length : items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0-100 for slider position
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const activeItem = items[activeIndex] || items[0];
  const currentSlide = isSlideshowMode ? slideItems[activeIndex] : null;

  // Navigate to next/previous item
  const goToNext = useCallback(() => {
    if (totalItems === 0) return;
    setActiveIndex((i) => (i + 1) % totalItems);
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    if (totalItems === 0) return;
    setActiveIndex((i) => (i - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not currently typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, items.length]);

  // Auto-advance with pause on hover (only for slideshow mode)
  useEffect(() => {
    if (!isSlideshowMode || !autoAdvanceInterval || isPaused || isDragging) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [isSlideshowMode, autoAdvanceInterval, isPaused, isDragging, goToNext]);

  // Touch/drag handlers for slider
  const handleSliderMove = (clientX: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Swipe gesture handlers for mobile (swipe entire card to change items)
  const minSwipeDistance = 50; // Minimum swipe distance in pixels

  const handleSwipeStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleSwipeMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleSwipeEnd = () => {
    const swipeDistance = touchStart - touchEnd;

    // Swipe left (next item)
    if (swipeDistance > minSwipeDistance) {
      goToNext();
    }
    // Swipe right (previous item)
    else if (swipeDistance < -minSwipeDistance) {
      goToPrevious();
    }
  };

  // Don't render if no content
  if (totalItems === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className={`py-20 md:py-32 bg-gradient-to-b from-paper to-charcoal/5 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleSwipeStart}
      onTouchMove={handleSwipeMove}
      onTouchEnd={handleSwipeEnd}
      aria-label={isSlideshowMode ? "Pitch deck slideshow - swipe left or right to navigate" : "Before and after transformation showcase - swipe left or right to navigate"}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          {!isSlideshowMode && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-indigo/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent-indigo" />
              <span className="text-sm font-medium text-accent-indigo">Transformation Showcase</span>
            </div>
          )}
          {isSlideshowMode && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-indigo/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent-indigo" />
              <span className="text-sm font-medium text-accent-indigo">Pitch Deck Showcase</span>
            </div>
          )}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
            {title}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>

        {/* Slideshow Mode - Show current slide */}
        {isSlideshowMode ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-accent-indigo/30 bg-charcoal shadow-2xl">
                {currentSlide && (
                  <Image
                    src={currentSlide}
                    alt={`Slide ${activeIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1400px) 100vw"
                    priority
                  />
                )}
                {/* Slide counter overlay */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {activeIndex + 1} / {totalItems}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Before/After Comparison Mode */
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 mb-12"
              >
                {/* Before Side */}
                <ScrollReveal direction="left" delay={0.1}>
                  <div className="relative" role="img" aria-label={`Before: ${activeItem.before.title}`}>
                  <div className="absolute -top-4 left-4 z-10">
                    <div className="px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
                      Before
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-red-500/30 bg-charcoal">
                    <Image
                      src={activeItem.before.image}
                      alt={activeItem.before.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{activeItem.before.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{activeItem.before.description}</p>
                      {activeItem.before.issues && (
                        <ul className="space-y-2">
                          {activeItem.before.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                              <span className="text-red-400 mt-1">✗</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* After Side */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="absolute -top-4 left-4 z-10">
                    <div className="px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
                      After
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-green-500/30 bg-charcoal shadow-2xl">
                    <Image
                      src={activeItem.after.image}
                      alt={activeItem.after.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{activeItem.after.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{activeItem.after.description}</p>
                      {activeItem.after.improvements && (
                        <ul className="space-y-2">
                          {activeItem.after.improvements.map((improvement, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                              <span className="text-green-400 mt-1">✓</span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Slider Version - Only in before/after mode */}
            <ScrollReveal direction="up" delay={0.3} className="mb-12">
              <div
                className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-charcoal/20 bg-charcoal shadow-2xl"
                role="region"
                aria-label="Interactive before and after comparison slider"
              >
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src={activeItem.before.image}
                    alt="Before"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>

            {/* After Image with clip-path */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <Image
                src={activeItem.after.image}
                alt="After"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            {/* Slider Control - Now with touch support! */}
            <div
              ref={sliderRef}
              className="absolute inset-y-0 left-0 right-0 z-20"
              aria-label="Comparison slider drag handle"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              role="slider"
            >
              {/* Invisible full-width drag area */}
              <div
                className="absolute inset-0 cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                aria-hidden="true"
              />

              {/* Visible slider line */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Slider handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-auto border-4 border-white/50">
                  <ArrowRight className="w-5 h-5 text-charcoal rotate-90" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                Before
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                After
              </div>
            </div>
          </div>
            </ScrollReveal>

            {/* Success Metrics */}
            {activeItem?.metrics && (
              <ScrollReveal direction="up" delay={0.4}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {activeItem.metrics.funding && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-accent-indigo/20 to-accent-indigo/5 p-6 rounded-2xl border border-accent-indigo/20"
                    >
                      <div className="text-3xl font-bold text-accent-indigo mb-2">
                        {activeItem.metrics.funding}
                      </div>
                      <div className="text-sm text-charcoal/70">Funding Secured</div>
                    </motion.div>
                  )}
                  {activeItem.metrics.timeline && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 p-6 rounded-2xl border border-accent-gold/20"
                    >
                      <div className="text-3xl font-bold text-accent-gold mb-2">
                        {activeItem.metrics.timeline}
                      </div>
                      <div className="text-sm text-charcoal/70">Timeline</div>
                    </motion.div>
                  )}
                  {activeItem.metrics.status && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-green-500/20 to-green-500/5 p-6 rounded-2xl border border-green-500/20"
                    >
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {activeItem.metrics.status}
                      </div>
                      <div className="text-sm text-charcoal/70">Status</div>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
            )}

          </>
        )}

        {/* Navigation Controls - Common to both modes */}
        {totalItems > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 hover:bg-charcoal/20 active:scale-95"
              aria-label={isSlideshowMode ? "Previous slide" : "Previous transformation"}
            >
              <ChevronLeft className="w-6 h-6 text-charcoal" />
            </button>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3" role="tablist" aria-label={isSlideshowMode ? "Slide navigation" : "Transformation navigation"}>
              {Array.from({ length: totalItems }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`View ${isSlideshowMode ? 'slide' : 'transformation'} ${index + 1} of ${totalItems}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  className={`rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 ${
                    index === activeIndex
                      ? 'bg-accent-indigo w-8 h-3'
                      : 'bg-charcoal/20 hover:bg-charcoal/40 w-3 h-3'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 hover:bg-charcoal/20 active:scale-95"
              aria-label={isSlideshowMode ? "Next slide" : "Next transformation"}
            >
              <ChevronRight className="w-6 h-6 text-charcoal" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
