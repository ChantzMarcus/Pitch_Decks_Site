'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import DeckGrid from '@/components/DeckGrid';
import QuickViewModal from '@/components/QuickViewModal';
import DeckWalkthroughModal from '@/components/DeckWalkthroughModal';
import ServicesShowcase from '@/components/ServicesShowcase';
import StructuredData from '@/components/StructuredData';
import { Footer } from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import DualCTA from '@/components/DualCTA';
import { EDUCATIONAL_VIDEOS } from '@/components/EducationalVideoCard';
import { ScrollReveal } from '@/components/animations';
import TrustBadges from '@/components/ui/TrustBadges';
import TrustedBrands from '@/components/TrustedBrands';
import FAQ from '@/components/ui/FAQ';
import PhysicsStats from '@/components/PhysicsStats';
import { FloatingStickyCTA } from '@/components/StickyCTA';
import TestimonialReviews from '@/components/TestimonialReviews';
import DeckShowcase3D from '@/components/DeckShowcase3D';
import type { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';
import { ArrowRightIcon, StoryIcon, StarIcon, TrendingUpIcon } from '@/components/icons/FilmIcons';
import { getDeckSlideUrls as getDeckSlideUrlsOriginal } from '@/lib/mock-decks';

// Re-export with slides for our new component
interface DeckWithSlidesExtended extends Deck {
  slides?: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
}

interface HomeContentProps {
  initialDecks: Deck[];
}

export default function HomeContentClean({ initialDecks }: HomeContentProps) {
  const [selectedDeck, setSelectedDeck] = useState<DeckWithSlides | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walkthroughDeck, setWalkthroughDeck] = useState<DeckWithSlides | null>(null);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  // Prepare decks with slides for the 3D showcase
  const decksWithSlides: DeckWithSlidesExtended[] = initialDecks.map(deck => ({
    ...deck,
    slides: getDeckSlideUrlsOriginal(deck.id).map((url, index) => ({
      id: `${deck.id}-slide-${index + 1}`,
      url,
      caption: `Slide ${index + 1} of ${deck.title}`,
    })),
  }));

  const handleQuickView = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrlsOriginal(deck.id),
    };
    setSelectedDeck(deckWithSlides);
    setIsModalOpen(true);
  };

  const handleWalkthrough = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrlsOriginal(deck.id),
    };
    setWalkthroughDeck(deckWithSlides);
    setIsWalkthroughOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDeck(null), 300);
  };

  const handleCloseWalkthrough = () => {
    setIsWalkthroughOpen(false);
    setTimeout(() => setWalkthroughDeck(null), 300);
  };

  const handleDeckClick = (deck: Deck) => {
    handleWalkthrough(deck);
  };

  return (
    <>
      <main className="min-h-screen bg-charcoal">
        <StructuredData
          type="webpage"
          data={{
            url: '',
            name: 'FilmDecks | Professional Pitch Packaging',
            description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
          }}
        />

        {/* 1. Hero Section */}
        <Hero decks={initialDecks} />

        {/* 2. Stats - Social Proof */}
        <PhysicsStats
          title="Our Impact"
          subtitle="Numbers that speak to our success"
          stats={[
            {
              value: "500+",
              label: "Pitch Decks Delivered",
              icon: <StarIcon className="w-8 h-8 text-accent-indigo mx-auto" />
            },
            {
              value: "$300M+",
              label: "Funding Secured",
              icon: <TrendingUpIcon className="w-8 h-8 text-accent-gold mx-auto" />
            },
            {
              value: "100+",
              label: "Success Stories",
              icon: <StoryIcon className="w-8 h-8 text-accent-teal mx-auto" />
            }
          ]}
        />

        {/* 3. Trust Bar */}
        <TrustedBrands
          title="Trusted by Industry Leaders"
          subtitle="Our work has been featured at major studios and streaming platforms"
          variant="dark"
        />

        {/* 4. 3D Deck Showcase - THE MAIN FEATURE */}
        <DeckShowcase3D
          decks={decksWithSlides}
          onDeckClick={handleDeckClick}
        />

        {/* 5. Services Section */}
        <ServicesShowcase />

        {/* 6. Two Paths CTA */}
        <section className="py-20 bg-charcoal">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal direction="fade" className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-6">
                Which Path Are You?
              </h2>
              <p className="text-xl text-paper-muted">
                We help both creators and investors bring projects to life
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Creator Path */}
              <div className="bg-gradient-to-br from-accent-indigo/20 to-transparent p-8 rounded-2xl border border-accent-indigo/30">
                <h3 className="font-display text-2xl font-bold text-paper mb-4">
                  I Have a Story
                </h3>
                <p className="text-paper-muted mb-6">
                  Get your story scored by industry experts using our proprietary evaluation system.
                </p>
                <Link
                  href="/questionnaire"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo-glow transition-colors"
                >
                  Get Your Story Scored
                  <ArrowRightIcon size={18} />
                </Link>
                <TrustBadges variant="inline" className="mt-6" />
              </div>

              {/* Investor Path */}
              <div className="bg-gradient-to-br from-accent-gold/20 to-transparent p-8 rounded-2xl border border-accent-gold/30">
                <h3 className="font-display text-2xl font-bold text-paper mb-4">
                  I'm Looking for Projects
                </h3>
                <p className="text-paper-muted mb-6">
                  Browse our curated portfolio of professionally packaged projects.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-white font-medium rounded-lg hover:bg-accent-gold/90 transition-colors"
                >
                  Browse Projects
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Testimonials */}
        <TestimonialReviews />

        {/* 8. Social Proof */}
        <SocialProof />

        {/* 9. FAQ */}
        <FAQ />

        {/* 10. Main CTA */}
        <DualCTA />

        {/* 11. Floating CTA - Always Visible */}
        <FloatingStickyCTA
          ctaText="Get Your Free Score"
          ctaHref="/questionnaire"
        />
      </main>

      <Footer />

      {/* Modals */}
      {selectedDeck && (
        <QuickViewModal
          deck={selectedDeck}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {walkthroughDeck && (
        <DeckWalkthroughModal
          deck={walkthroughDeck}
          isOpen={isWalkthroughOpen}
          onClose={handleCloseWalkthrough}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      )}
    </>
  );
}
