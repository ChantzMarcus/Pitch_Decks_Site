'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';
import DeckCard from './DeckCard';
import QuickViewModal from './QuickViewModal';
import DeckWalkthroughModal from './DeckWalkthroughModal';

interface DeckBrowserOverlayProps {
  decks: Deck[];
  isOpen: boolean;
  onClose: () => void;
}

export default function DeckBrowserOverlay({ decks, isOpen, onClose }: DeckBrowserOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState<DeckWithSlides | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [walkthroughDeck, setWalkthroughDeck] = useState<DeckWithSlides | null>(null);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

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

  const handleQuickView = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setSelectedDeck(deckWithSlides);
    setIsQuickViewOpen(true);
  };

  const handleWalkthrough = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setWalkthroughDeck(deckWithSlides);
    setIsWalkthroughOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedDeck(null), 300);
  };

  const handleCloseWalkthrough = () => {
    setIsWalkthroughOpen(false);
    setTimeout(() => setWalkthroughDeck(null), 300);
  };

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* Overlay Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
            >
              <div
                className="relative w-full max-w-7xl max-h-[90vh] bg-charcoal/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-paper mb-2">
                      Browse Our Projects
                    </h2>
                    <p className="text-paper/60">
                      Explore our portfolio of compelling stories ready for production
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-paper transition-colors"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Scrollable Deck Cards */}
                <div className="relative p-6">
                  {/* Navigation arrows */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scroll('left')}
                      disabled={!canScrollLeft}
                      onMouseEnter={checkScrollButtons}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        canScrollLeft
                          ? 'bg-white/10 text-paper hover:bg-white/20 backdrop-blur-sm'
                          : 'bg-white/5 text-paper/30 cursor-not-allowed'
                      }`}
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scroll('right')}
                      disabled={!canScrollRight}
                      onMouseEnter={checkScrollButtons}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        canScrollRight
                          ? 'bg-white/10 text-paper hover:bg-white/20 backdrop-blur-sm'
                          : 'bg-white/5 text-paper/30 cursor-not-allowed'
                      }`}
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </div>

                  {/* Cards container */}
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
                    {decks.map((deck, index) => {
                      return (
                        <DeckCard
                          key={deck.id}
                          deck={deck}
                          index={index}
                          onQuickView={() => handleQuickView(deck)}
                          onWalkthrough={() => handleWalkthrough(deck)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      {selectedDeck && (
        <QuickViewModal
          deck={selectedDeck}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      )}

      {/* Walkthrough Modal */}
      {walkthroughDeck && (
        <DeckWalkthroughModal
          deck={walkthroughDeck}
          isOpen={isWalkthroughOpen}
          onClose={handleCloseWalkthrough}
          autoPlay={false}
        />
      )}

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
    </>
  );
}
