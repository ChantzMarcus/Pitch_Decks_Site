'use client';

import { Deck } from '@/db';
import DeckCard from './DeckCard';
import EnhancedDeckCard from './EnhancedDeckCard';
import { DragNavigator } from '@/components/animations';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface DeckGridProps {
  decks: Deck[];
  onQuickView?: (deck: Deck) => void;
  onWalkthrough?: (deck: Deck) => void; // NEW: Callback for walkthrough mode
  horizontalScroll?: boolean; // Option to use horizontal scroll layout
  videoPreviewUrls?: Record<string, string>; // Map of deck ID to video URL
  successMetrics?: Record<string, { funding?: string; timeline?: string; status?: string }>; // Map of deck ID to metrics
}

export default function DeckGrid({
  decks,
  onQuickView,
  onWalkthrough,
  horizontalScroll = false,
  videoPreviewUrls = {},
  successMetrics = {},
}: DeckGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  if (decks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <p className="text-charcoal/60 text-lg">No projects found.</p>
      </motion.div>
    );
  }

  // Horizontal scroll layout (like the image style)
  if (horizontalScroll) {
    return (
      <div className="relative">
        {/* Navigation arrows */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            onMouseEnter={checkScrollButtons}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              canScrollLeft
                ? 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20 backdrop-blur-sm'
                : 'bg-charcoal/5 text-charcoal/30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            onMouseEnter={checkScrollButtons}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              canScrollRight
                ? 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20 backdrop-blur-sm'
                : 'bg-charcoal/5 text-charcoal/30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Horizontal scrollable container with drag navigation */}
        <DragNavigator
          horizontal
          threshold={50}
          showFeedback={true}
          onDragEnd={(direction) => {
            if (direction === 'left') {
              scroll('left');
            } else if (direction === 'right') {
              scroll('right');
            }
            // Ignore vertical drags for horizontal scroll
          }}
        >
          <div
            ref={containerRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: '60px',
            }}
          >
            {decks.map((deck, index) => (
              <div key={deck.id} className="flex-shrink-0 w-[320px]">
                <EnhancedDeckCard
                  deck={deck}
                  index={index}
                  onQuickView={onQuickView}
                  videoPreviewUrl={videoPreviewUrls[deck.id]}
                />
              </div>
            ))}
          </div>
        </DragNavigator>

        {/* Hide scrollbar styles */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    );
  }

  // Traditional grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {decks.map((deck, index) => (
        <EnhancedDeckCard
          key={deck.id}
          deck={deck}
          index={index}
          onQuickView={onQuickView}
          videoPreviewUrl={videoPreviewUrls[deck.id]}
        />
      ))}
    </div>
  );
}
