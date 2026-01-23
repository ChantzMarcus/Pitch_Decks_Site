// components/HorizontalScrollShowcase.tsx
'use client';

import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import VideoCard from './VideoCard';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoId?: string;
  duration?: string;
}

interface HorizontalScrollShowcaseProps {
  items: VideoItem[];
  title?: string;
  onCardClick?: (item: VideoItem) => void;
}

export default function HorizontalScrollShowcase({
  items,
  title,
  onCardClick,
}: HorizontalScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const x = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener('scroll', checkScrollButtons);
    checkScrollButtons();

    return () => container.removeEventListener('scroll', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    // Only capture horizontal scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      container.scrollLeft += e.deltaX;
    }
  };

  return (
    <section className="relative py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-charcoal"
            >
              {title}
            </motion.h2>

            {/* Navigation arrows */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  canScrollLeft
                    ? 'bg-charcoal text-paper hover:bg-accent-indigo'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  canScrollRight
                    ? 'bg-charcoal text-paper hover:bg-accent-indigo'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        )}

        {/* Scrollable container */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-80 md:w-96 snap-start"
            >
              <VideoCard
                {...item}
                index={index}
                onClick={() => onCardClick?.(item)}
              />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-6 gap-2"
        >
          {items.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-charcoal/20"
              style={{
                width: i === 0 ? '32px' : '8px',
                backgroundColor: i === 0 ? '#4F46E5' : 'rgba(43,43,43,0.2)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Add CSS for hiding scrollbar
const style = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
