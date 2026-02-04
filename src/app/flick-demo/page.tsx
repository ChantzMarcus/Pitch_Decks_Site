'use client';

import { useState } from 'react';
import FlickThroughDeck, { FlickThroughModal } from '@/components/FlickThroughDeck';
import BrochureFlip, { BrochureFlipModal } from '@/components/BrochureFlip';
import { getDeckSlideUrls } from '@/lib/mock-decks';

// Demo slides using TCG deck
const demoSlides = getDeckSlideUrls('tcg').slice(0, 8).map((url, index) => ({
  id: `slide-${index}`,
  url,
  title: `TCG Pitch Deck - Slide ${index + 1}`,
  caption: `Slide ${index + 1} of 8`,
}));

// Demo pages for brochure flip
const demoPages = demoSlides.map((slide) => ({
  id: slide.id,
  frontUrl: slide.url,
  title: slide.title,
  caption: slide.caption,
}));

export default function FlickDemoPage() {
  const [activeDemo, setActiveDemo] = useState<'deck' | 'brochure' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-indigo/20 to-accent-gold/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Flick Animation Showcase
          </h1>
          <p className="text-xl text-paper-muted">
            Interactive card deck and brochure flip animations
          </p>
        </div>
      </div>

      {/* Demo Options */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card Deck Option */}
          <button
            onClick={() => {
              setActiveDemo('deck');
              setIsModalOpen(true);
            }}
            className="group p-8 bg-gradient-to-br from-accent-indigo/20 to-transparent rounded-2xl border border-accent-indigo/30 hover:border-accent-indigo transition-all text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent-indigo rounded-xl flex items-center justify-center">
                <span className="text-2xl">🃏</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Card Deck Flick</h3>
                <p className="text-sm text-paper-muted">Like flipping through a deck of cards</p>
              </div>
            </div>
            <ul className="text-sm text-paper-muted space-y-1">
              <li>✓ 3D card stack effect</li>
              <li>✓ Physics-based spring animations</li>
              <li>✓ Drag/swipe gestures</li>
              <li>✓ Keyboard navigation</li>
            </ul>
          </button>

          {/* Brochure Option */}
          <button
            onClick={() => {
              setActiveDemo('brochure');
              setIsModalOpen(true);
            }}
            className="group p-8 bg-gradient-to-br from-accent-gold/20 to-transparent rounded-2xl border border-accent-gold/30 hover:border-accent-gold transition-all text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Brochure Flip</h3>
                <p className="text-sm text-paper-muted">Like turning pages in a magazine</p>
              </div>
            </div>
            <ul className="text-sm text-paper-muted space-y-1">
              <li>✓ Page curl effects</li>
              <li>✓ Center spine binding</li>
              <li>✓ Realistic shadow</li>
              <li>✓ Front/back pages</li>
            </ul>
          </button>
        </div>

        {/* Inline Demo */}
        <div className="bg-charcoal-light rounded-2xl p-8 border border-white/10">
          <h2 className="font-display text-2xl font-bold mb-6">Try It Here</h2>
          <div className="h-[500px] rounded-xl overflow-hidden border border-white/10">
            <FlickThroughDeck
              slides={demoSlides}
              className="bg-charcoal"
              onSlideChange={(index) => console.log('Slide:', index)}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-paper/5 rounded-2xl p-8 border border-white/10">
          <h2 className="font-display text-2xl font-bold mb-4">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-accent-indigo">Mouse/Trackpad</h3>
              <p className="text-paper-muted">Click and drag cards left/right to flip through slides</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent-gold">Touch/Swipe</h3>
              <p className="text-paper-muted">Swipe left or right on touch devices to navigate</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent-teal">Keyboard</h3>
              <p className="text-paper-muted">Use arrow keys to navigate, ESC to close</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {activeDemo === 'deck' && (
            <FlickThroughModal
              slides={demoSlides}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setActiveDemo(null);
              }}
            />
          )}
          {activeDemo === 'brochure' && (
            <BrochureFlipModal
              pages={demoPages}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setActiveDemo(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
