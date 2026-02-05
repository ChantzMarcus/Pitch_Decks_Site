'use client';

import { useState, useMemo } from 'react';
import { Deck } from '@/db';
import DeckGrid from '@/components/DeckGrid';
import CategoryFilter from '@/components/CategoryFilter';
import QuickViewModal from '@/components/QuickViewModal';
import StructuredData from '@/components/StructuredData';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/animations';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';

interface GalleryContentProps {
  initialDecks: Deck[];
}

export default function GalleryContent({ initialDecks }: GalleryContentProps) {
  const [selectedDeck, setSelectedDeck] = useState<DeckWithSlides | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract all unique genres
  const categories = useMemo(() => {
    const genres = new Set<string>();
    initialDecks.forEach((deck) => {
      deck.genre.forEach((g) => genres.add(g));
    });
    return ['All', ...Array.from(genres).sort()];
  }, [initialDecks]);

  // Filter decks by category
  const filteredDecks = useMemo(() => {
    if (activeCategory === 'All') return initialDecks;
    return initialDecks.filter((deck) =>
      deck.genre.includes(activeCategory)
    );
  }, [initialDecks, activeCategory]);

  const handleQuickView = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setSelectedDeck(deckWithSlides);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing deck
    setTimeout(() => setSelectedDeck(null), 300);
  };

  return (
    <main className="min-h-screen bg-charcoal py-20">
      <StructuredData
        type="collection"
        data={{
          items: initialDecks.map((deck) => ({
            name: deck.title,
            description: deck.logline || `A ${deck.genre.join(', ')} film`,
            url: `/gallery/${deck.slug}`,
          })),
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal direction="fade" className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-paper mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-paper/70 max-w-2xl mx-auto">
            Explore our portfolio of compelling stories ready for production
          </p>
        </ScrollReveal>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Results count */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-paper/50 mb-8"
        >
          {filteredDecks.length} project{filteredDecks.length !== 1 ? 's' : ''} found
        </motion.p>

        {/* Grid */}
        <DeckGrid
          decks={filteredDecks}
          onQuickView={handleQuickView}
        />

        {/* Quick View Modal */}
        {selectedDeck && (
          <QuickViewModal
            deck={selectedDeck}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}
