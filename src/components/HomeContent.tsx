'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import HeroSonarStyle from '@/components/HeroSonarStyle';
import DeckGrid from '@/components/DeckGrid';
import QuickViewModal from '@/components/QuickViewModal';
import DeckWalkthroughModal from '@/components/DeckWalkthroughModal';
import ImmersiveDeckGallery from '@/components/ImmersiveDeckGallery';
import FeaturedDeckWalkthrough from '@/components/FeaturedDeckWalkthrough';
import ServicesShowcase from '@/components/ServicesShowcase';
import VideoShowcase from '@/components/VideoShowcase';
import StructuredData from '@/components/StructuredData';
import { Footer } from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import SideNavigation from '@/components/navigation/SideNavigation';
import DualCTA from '@/components/DualCTA';
import EducationalVideoShowcase from '@/components/EducationalVideoShowcase';
import { EDUCATIONAL_VIDEOS } from '@/components/EducationalVideoCard';
import { ScrollReveal, ParallaxSection, ScrollUnlock } from '@/components/animations';
import { motion } from 'framer-motion';
import TrustBadges from '@/components/ui/TrustBadges';
import TrustedBrands from '@/components/TrustedBrands';
import FAQ from '@/components/ui/FAQ';
import UrgencyCounter from '@/components/ui/UrgencyCounter';
import PhysicsStats from '@/components/PhysicsStats';
import StickyCTA, { FloatingStickyCTA } from '@/components/StickyCTA';
import { Preloader } from '@/components/Preloader';
import TestimonialReviews from '@/components/TestimonialReviews';
import dynamic from 'next/dynamic';

// Dynamically import 3D component to reduce initial bundle size
const ThreeDPitchDeckShowcase = dynamic(
  () => import('@/components/ThreeDPitchDeckShowcase'),
  { 
    ssr: false, // Disable SSR for Three.js component
    loading: () => (
      <div className="h-[600px] flex items-center justify-center">
        <div className="text-paper/50">Loading 3D showcase...</div>
      </div>
    )
  }
);
import type { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';
import { ArrowRightIcon, StoryIcon } from '@/components/icons/FilmIcons';
import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';
import LayeredImagesShowcase from '@/components/LayeredImagesShowcase';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import PitchDeckCardShowcase from '@/components/PitchDeckCardShowcase';

// Custom chart icon
function BarChart3Icon({ className = '', size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

// Custom sparkles icon
function SparklesIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );
}

// Custom star icon
function StarIcon({ className = '', size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.13 2 9.27l6.91-7.26L12 2z" />
    </svg>
  );
}

// Custom trending up icon
function TrendingUpIcon({ className = '', size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

interface HomeContentProps {
  initialDecks: Deck[];
}

export default function HomeContent({ initialDecks }: HomeContentProps) {
  const [selectedDeck, setSelectedDeck] = useState<DeckWithSlides | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walkthroughDeck, setWalkthroughDeck] = useState<DeckWithSlides | null>(null);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [immersiveDeck, setImmersiveDeck] = useState<DeckWithSlides | null>(null);
  const [isImmersiveOpen, setIsImmersiveOpen] = useState(false);

  // Create featured deck data from initial decks (sorted by view count for best decks first)
  const featuredDecks = useMemo(() => {
    const sorted = [...initialDecks]
      .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
      .slice(0, 3);
    return sorted.map(deck => ({
      deck,
      slides: getDeckSlideUrls(deck.id),
      highlightText: deck.logline,
      ctaText: 'Watch Full Deck',
    }));
  }, [initialDecks]);

  const handleQuickView = (deck: Deck) => {
    // Attach slides to the deck when opening quick view
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setSelectedDeck(deckWithSlides);
    setIsModalOpen(true);
  };

  const handleWalkthrough = (deck: Deck) => {
    // Attach slides to the deck when opening walkthrough
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
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

  const handleImmersiveView = (deck: Deck) => {
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setImmersiveDeck(deckWithSlides);
    setIsImmersiveOpen(true);
  };

  const handleCloseImmersive = () => {
    setIsImmersiveOpen(false);
    setTimeout(() => setImmersiveDeck(null), 300);
  };

  return (
    <>
      {/* Preloader - N64 Mario Kart-style animation */}
      <Preloader duration={3500} />

      {/* Side Navigation */}
      <SideNavigation decks={initialDecks} />

      <main className="min-h-screen bg-charcoal">
        <StructuredData
          type="webpage"
          data={{
            url: '',
            name: 'FilmDecks | Professional Pitch Packaging',
            description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
          }}
        />
        {/* Hero Section with Video Background & Animations */}
        <Hero />

        {/* Scroll to Unlock - Featured Decks Section with Engagement */}
        {featuredDecks.length > 0 && (
          <ScrollUnlock
            lockedContent={
              <div className="min-h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal-light">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-6">
                    Featured Projects
                  </h2>
                  <p className="text-xl text-paper/80 max-w-2xl mx-auto mb-12">
                    Explore our portfolio of compelling stories ready for production
                  </p>
                  <div className="text-paper/60 text-sm flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                    </svg>
                    Scroll to explore
                  </div>
                </motion.div>
              </div>
            }
            unlockedContent={
              <FeaturedDeckWalkthrough
                featuredDecks={featuredDecks}
                autoRotateInterval={15000}
                slideInterval={4000}
                onWatchFullDeck={handleWalkthrough}
              />
            }
            unlockDistance={500}
            unlockMessage="Scroll to explore featured projects"
            onUnlock={() => console.log('Featured decks unlocked')}
          />
        )}

      {/* Trust Bar with Logos */}
      <TrustedBrands 
        title="Trusted by Industry Leaders"
        subtitle="Our work has been featured at major studios and streaming platforms"
        variant="dark"
      />

      {/* Stats Bar */}
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

      {/* Video Showcase - Our Process in Action */}
      <VideoShowcase
        title="See Our Process in Action"
        subtitle="Watch how we transform your story into a compelling pitch deck with cinematic quality"
        videoSrc={process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4'}
        autoPlay={false}
        loop={true}
      />

      {/* Two Paths CTA */}
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
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-gradient-to-br from-accent-indigo/20 to-transparent p-8 rounded-2xl border border-accent-indigo/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent-indigo rounded-xl flex items-center justify-center">
                    <SparklesIcon className="text-white" size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-paper">
                    I Have a Story
                  </h3>
                </div>
                <p className="text-paper-muted mb-6">
                  See if your story is approved by our expert team. Get your story scored using the same proprietary system trusted by top-tier producers and executives.
                </p>
                <Link
                  href="/questionnaire"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo-glow transition-colors"
                >
                  Get Your Story Scored by Experts
                  <ArrowRightIcon size={18} />
                </Link>
                
                {/* Trust Badges */}
                <TrustBadges variant="inline" className="mt-6" />
              </div>
            </ScrollReveal>

            {/* Investor Path */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-accent-gold/20 to-transparent p-8 rounded-2xl border border-accent-gold/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center">
                    <BarChart3Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-paper">
                    I'm Looking for Projects
                  </h3>
                </div>
                <p className="text-paper-muted mb-6">
                  You're an investor, producer, or industry professional looking for your next hit.
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Urgency Counter - Social Proof Numbers */}
      <section className="py-12 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6">
          <UrgencyCounter variant="compact" className="justify-center" />
        </div>
      </section>

      {/* Pitch Deck Cards Showcase - Dribbble-style overlapping cards showing ALL decks */}
      <ParallaxSection speed={0.3}>
        <PitchDeckCardShowcase
          decks={initialDecks}
          onCardClick={(deck) => handleWalkthrough(deck)}
          onQuickView={(deck) => handleQuickView(deck)}
        />
      </ParallaxSection>

      {/* Services Section - After Trust is Built */}
      <ServicesShowcase />

      {/* Featured Projects - Portfolio Proof */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="fade" className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-paper-muted max-w-2xl mx-auto">
              Explore our portfolio of compelling stories ready for production
            </p>
          </ScrollReveal>

          <DeckGrid
            decks={initialDecks}
            onQuickView={handleQuickView}
            onWalkthrough={handleWalkthrough}
            horizontalScroll={true}
          />

          {/* 3D Pitch Deck Showcase */}
          <div className="mt-16">
            <h3 className="font-display text-3xl font-bold text-paper mb-8 text-center">
              Our Portfolio in 3D
            </h3>
            <ThreeDPitchDeckShowcase decks={initialDecks} />
          </div>

          <ScrollReveal direction="up" delay={0.3} className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-paper/20 text-paper font-medium rounded-lg hover:bg-paper/10 hover:text-paper transition-all"
            >
              View All Projects
              <ArrowRightIcon size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Educational Videos - Teaser with Link to Full Page */}
      <section className="py-20 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="fade" className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              Why Packaging Matters
            </h2>
            <p className="text-paper-muted text-lg max-w-2xl mx-auto mb-8">
              Learn from industry experts who greenlit films at major studios
            </p>
          </ScrollReveal>
          
          <EducationalVideoShowcase
            videos={EDUCATIONAL_VIDEOS.slice(0, 6)}
            title=""
          />
          
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-8">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-accent-indigo hover:text-accent-indigo-glow font-medium transition-colors"
            >
              Explore All Educational Resources
              <ArrowRightIcon size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Proof - Upwork Profile - Lower for Additional Trust */}
      <SocialProof />

      {/* Testimonials - Social Proof with Reviews */}
      <TestimonialReviews />

      {/* FAQ Section - Address Objections */}
      <FAQ />

      {/* Dual CTA - Primary Conversion Section */}
      <DualCTA />

      {/* Apple-Style Scroll-Triggered Video Gallery */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="fade" className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-6">
              See Our Process in Action
            </h2>
            <p className="text-xl text-paper/80 max-w-2xl mx-auto">
              Watch how we transform stories into production-ready pitch decks
            </p>
          </ScrollReveal>

          <AppleStyleVideoGallery
            videos={[
              {
                videoSrc: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4',
                thumbnail: '/images/posters/hero-poster.jpg',
                title: 'Our Process',
                description: 'From concept to production-ready deck',
              },
              {
                videoSrc: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_MOBILE || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/new-mobile-okok.mp4',
                thumbnail: '/images/posters/hero-poster-mobile.jpg',
                title: 'Client Success Stories',
                description: 'Real results from real creators',
              },
              {
                videoSrc: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4',
                thumbnail: '/images/posters/hero-poster.jpg',
                title: 'Industry Insights',
                description: 'Veteran feedback and analysis',
              },
            ]}
          />
        </div>
      </section>

      {/* Layered Images Showcase - Apple Style with Parallax */}
      <ParallaxSection speed={0.2}>
        <LayeredImagesShowcase
          images={[
            {
              src: '/images/posters/hero-poster.jpg',
              alt: 'Pitch deck slide 1',
              zIndex: 3,
              offsetX: 0,
              offsetY: -5,
              scale: 0.95,
            },
            {
              src: '/images/posters/hero-poster.jpg',
              alt: 'Pitch deck slide 2',
              zIndex: 2,
              offsetX: -3,
              offsetY: 0,
              scale: 0.9,
            },
            {
              src: '/images/posters/hero-poster.jpg',
              alt: 'Pitch deck slide 3',
              zIndex: 1,
              offsetX: 3,
              offsetY: 5,
              scale: 0.85,
            },
          ]}
          title="Professional Pitch Decks"
          description="Multiple layers of expertise come together to create compelling, production-ready pitch decks that stand out in the industry."
          deviceFrame="macbook"
        />
      </ParallaxSection>

      {/* Quick View Modal */}
      {selectedDeck && (
        <QuickViewModal
          deck={selectedDeck}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Walkthrough Modal - Auto-playing slideshow */}
      {walkthroughDeck && (
        <DeckWalkthroughModal
          deck={walkthroughDeck}
          isOpen={isWalkthroughOpen}
          onClose={handleCloseWalkthrough}
          autoPlay={true}
          autoPlayInterval={4000}
          onImmersiveView={handleImmersiveView}
        />
      )}

      {/* Immersive Deck Gallery - Full-screen immersive viewing */}
      {immersiveDeck && immersiveDeck.slides && isImmersiveOpen && (
        <ImmersiveDeckGallery
          slides={immersiveDeck.slides.map((url, index) => ({
            id: `${immersiveDeck.id}-slide-${index + 1}`,
            image_url: url,
            title: immersiveDeck.title,
            caption: `Slide ${index + 1} of ${immersiveDeck.title}`,
          }))}
          startIndex={0}
          onClose={handleCloseImmersive}
          title={immersiveDeck.title}
        />
      )}

      {/* Sticky CTA - Appears after scrolling */}
      <StickyCTA
        title="Ready to Transform Your Story?"
        description="See if your story qualifies for our professional pitch packaging"
        ctaText="Get Your Story Scored"
        ctaHref="/questionnaire"
        showAfterScroll={500}
        dismissible={true}
        position="bottom"
        variant="primary"
      />

      {/* Floating CTA - Always visible in corner */}
      <FloatingStickyCTA
        ctaText="Get Started"
        ctaHref="/questionnaire"
      />

    </main>
    <Footer />
  </>
  );
}
