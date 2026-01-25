'use client';

import { Deck } from '@/db';
import DeckCard from './DeckCard';
import { motion, AnimatePresence } from 'framer-motion';

interface DeckGridProps {
  decks: Deck[];
  onQuickView?: (deck: Deck) => void;
}

export default function DeckGrid({ decks, onQuickView }: DeckGridProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      <AnimatePresence mode="popLayout">
        {decks.map((deck, index) => (
          <motion.div
            key={deck.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: { type: 'spring', stiffness: 300, damping: 30 },
            }}
          >
            <DeckCard deck={deck} index={index} onQuickView={onQuickView} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
