'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import HeroSonarStyle from '@/components/HeroSonarStyle';
import QuickViewModal from '@/components/QuickViewModal';
import DeckWalkthroughModal from '@/components/DeckWalkthroughModal';
import ImmersiveDeckGallery from '@/components/ImmersiveDeckGallery';
import FeaturedDeckWalkthrough from '@/components/FeaturedDeckWalkthrough';
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
import TrustedBrands, { TrustedBrandsMarquee } from '@/components/TrustedBrands';
import FAQ from '@/components/ui/FAQ';
import UrgencyCounter from '@/components/ui/UrgencyCounter';
import PhysicsStats from '@/components/PhysicsStats';
import { FloatingStickyCTA } from '@/components/StickyCTA';
import { Preloader } from '@/components/Preloader';
import TestimonialReviews from '@/components/TestimonialReviews';
import { FloatingParticlesBackground } from '@/components/effects/GoldenTicketSparkles';
import dynamic from 'next/dynamic';

import type { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';
import { ArrowRightIcon, StoryIcon, ClockIcon, FilmReelIcon, AwardIcon, TVIcon, GlobeIcon, BoxOfficeChartIcon, FilmProjectorIcon } from '@/components/icons/FilmIcons';
import ServicesShowcase from '@/components/ServicesShowcase';
import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';
import TextAssemblyLine from '@/components/TextAssemblyLine';
import LayeredImagesShowcase from '@/components/LayeredImagesShowcase';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import MetallicDeckCarousel from '@/components/MetallicDeckCarousel';

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

      <main className="min-h-screen">
        <StructuredData
          type="webpage"
          data={{
            url: '',
            name: 'FilmDecks | Professional Pitch Packaging',
            description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
          }}
        />
        {/* Hero Section with Video Background & Animations */}
        <Hero decks={initialDecks} />

        {/* Stats Bar - Our Impact */}
        <PhysicsStats
        title="Our Impact"
        subtitle="Numbers that speak to our success"
        stats={[
          {
            value: "500+",
            label: "Pitch Decks Delivered",
            icon: <StarIcon className="w-8 h-8 text-amber-400 mx-auto" />,
            texture: 'gold'
          },
          {
            value: "$300M+",
            label: "Funding Secured",
            icon: <TrendingUpIcon className="w-8 h-8 text-purple-400 mx-auto" />,
            texture: 'silver'
          },
          {
            value: "100+",
            label: "Success Stories",
            icon: <StoryIcon className="w-8 h-8 text-rose-400 mx-auto" />,
            texture: 'platinum'
          },
          {
            value: "85%",
            label: "Success Rate",
            icon: <AwardIcon className="w-8 h-8 text-amber-500 mx-auto" />,
            texture: 'bronze'
          },
          {
            value: "24h",
            label: "Avg Turnaround",
            icon: <ClockIcon className="w-8 h-8 text-amber-300 mx-auto" />,
            texture: 'copper'
          },
          {
            value: "15+",
            label: "Years Experience",
            icon: <FilmReelIcon className="w-8 h-8 text-gray-300 mx-auto" />,
            texture: 'gold'
          }
        ]}
      />

      {/* Trust Bar with Animated Marquee Logos - After Stats */}
      <TrustedBrandsMarquee 
        title="Trusted by Industry Leaders"
        subtitle="Our work has been featured at major studios and streaming platforms"
        variant="dark"
      />

      {/* Section 3: Services Section */}
      <ServicesShowcase />

      {/* Section 4: Two Paths CTA */}
      <section className="relative py-24 bg-charcoal overflow-hidden">

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Golden Gallery style heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
              <div className="w-3 h-3 rotate-45 border border-amber-400 bg-amber-400/20" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-br from-amber-200 via-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                    style={{ textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
                Which Path Are You?
              </span>
            </h2>

            <p className="text-xl text-amber-200/70 max-w-2xl mx-auto">
              We help both creators and investors bring projects to life
            </p>

            {/* Decorative bottom lines */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-indigo-400 to-indigo-500" />
              <div className="w-2 h-2 rotate-45 border border-indigo-400 bg-indigo-400/20" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Path - Indigo/Story Path */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative backdrop-blur-xl rounded-3xl p-10 border-2 border-indigo-500/30 h-full overflow-hidden
                bg-gradient-to-br from-indigo-950/60 via-indigo-900/40 to-violet-950/30
                hover:scale-[1.02] hover:border-indigo-400/50 transition-all duration-500 shadow-lg hover:shadow-indigo-500/20">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating particles decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-100" />
                <div className="absolute bottom-8 right-4 w-1 h-1 bg-violet-400 rounded-full animate-pulse delay-200" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-400/30 to-transparent rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-br-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon container with glow */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center
                        shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow"
                    >
                      <SparklesIcon className="text-white" size={28} />
                    </motion.div>
                    <h3 className="font-display text-3xl font-bold text-transparent bg-clip-text
                      bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300">
                      I Have a Story
                    </h3>
                  </div>

                  <p className="text-indigo-100/80 text-lg leading-relaxed mb-8">
                    See if your story is approved by our expert team. Get your story scored using the same
                    proprietary system trusted by top-tier producers and executives.
                  </p>

                  {/* CTA Button with enhanced styling */}
                  <Link
                    href="/getting-started"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600
                      text-white font-semibold rounded-xl hover:from-indigo-400 hover:to-purple-500
                      transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 group/btn"
                  >
                    Get Your Story Scored
                    <ArrowRightIcon size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {/* Trust Badges */}
                  <TrustBadges variant="inline" className="mt-8" />
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
              </div>
            </motion.div>

            {/* Investor Path - Gold/Projects Path */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative backdrop-blur-xl rounded-3xl p-10 border-2 border-amber-500/30 h-full overflow-hidden
                bg-gradient-to-br from-amber-950/40 via-yellow-900/30 to-amber-950/30
                hover:scale-[1.02] hover:border-amber-400/50 transition-all duration-500 shadow-lg hover:shadow-amber-500/20">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating particles decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-100" />
                <div className="absolute bottom-8 right-4 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-200" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-400/30 to-transparent rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-br-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon container with glow */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center
                        shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow"
                    >
                      <BarChart3Icon className="text-white" size={28} />
                    </motion.div>
                    <h3 className="font-display text-3xl font-bold text-transparent bg-clip-text
                      bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200"
                      style={{ textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
                      I'm Looking for Projects
                    </h3>
                  </div>

                  <p className="text-amber-100/80 text-lg leading-relaxed mb-8">
                    You're an investor, producer, or industry professional looking for your next hit.
                    Browse our curated portfolio of professionally packaged projects.
                  </p>

                  {/* CTA Button with enhanced styling */}
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-3 px-8 py-4 relative rounded-xl font-semibold
                      transition-all hover:scale-105 hover:shadow-xl group/btn overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
                      border: '2px solid rgba(212, 175, 55, 0.6)',
                      color: '#1a1a1a',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    {/* Metallic shine overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                    </div>
                    <span className="relative z-10">Browse Projects</span>
                    <ArrowRightIcon size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {/* Stats preview */}
                  <div className="flex items-center gap-6 mt-8 pt-6 border-t border-amber-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-300">500+</div>
                      <div className="text-xs text-amber-200/60">Projects</div>
                    </div>
                    <div className="w-px h-10 bg-amber-500/20" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-300">$300M+</div>
                      <div className="text-xs text-amber-200/60">Funding</div>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Educational Videos - Why Packaging Matters */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="fade" className="text-center mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-3">
              Why Packaging Matters
            </h2>
            <p className="text-paper-muted text-lg max-w-2xl mx-auto mb-6">
              Learn from industry experts who greenlit films at major studios
            </p>
          </ScrollReveal>
          
          <EducationalVideoShowcase
            videos={EDUCATIONAL_VIDEOS.slice(0, 6)}
            title=""
          />
          
          {/* Partnership Banner - Moved here to be with Educational Videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 md:p-12 text-center border border-amber-400/30 shadow-2xl"
          >
            <p className="text-amber-400 font-medium mb-4">In Partnership With</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Tomayto Tomato
            </h3>
            <p className="text-gray-200 max-w-3xl mx-auto mb-6">
              The same people who greenlit films at Paramount, Sony, Fox, and Lionsgate
              — the team behind <em className="text-white font-semibold">Arrival</em>,{' '}
              <em className="text-white font-semibold">Transformers</em>, <em className="text-white font-semibold">True Grit</em>,
              and <em className="text-white font-semibold">The Curious Case of Benjamin Button</em> —
              now working on YOUR project.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <span>Production Package</span>
              <span>•</span>
              <span>Talent Attachment</span>
              <span>•</span>
              <span>Sales & Distribution</span>
            </div>
          </motion.div>
          
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-6">
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

      {/* Urgency Counter - Social Proof Numbers */}
      <section className="py-12 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <UrgencyCounter variant="compact" className="justify-center" />
        </div>
      </section>

      {/* Metallic Golden Ticket Carousel - Circus/Vintage Theme */}
      <section className="py-8">
        <MetallicDeckCarousel
          decks={initialDecks}
          onDeckClick={(deck) => handleWalkthrough(deck)}
        />
      </section>

      {/* Social Proof - Upwork Profile - Lower for Additional Trust */}
      <SocialProof />

      {/* Testimonials - Social Proof with Reviews */}
      <TestimonialReviews />

      {/* FAQ Section - Address Objections */}
      <FAQ />

      {/* Dual CTA - Primary Conversion Section with Sparkles */}
      <section className="relative py-20 overflow-hidden">
        <FloatingParticlesBackground count={25} />
        <DualCTA />
      </section>

      {/* Cinematic Assembly Line Process */}
      <TextAssemblyLine
        title="From Script to Screen"
        subtitle="Watch your story transform through our cinematic assembly line"
      />

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

      {/* Floating CTA - Subtle glassmorphism button appears on scroll */}
      <FloatingStickyCTA
        ctaText="Get Your Free Score"
        ctaHref="/getting-started"
      />

      {/* Creator Community - Final Section - Discord/Community Section */}
      <section className="py-16 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal border-y border-indigo-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Discord/community icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-paper mb-4">
              Creator Community
            </h2>
            <p className="text-xl text-paper/70 mb-8 max-w-2xl mx-auto">
              Join our community of filmmakers and creators for support, feedback, and resources
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                All Levels Welcome
              </span>
              <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                Instant Access
              </span>
              <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                Free to Join
              </span>
            </div>

            {/* CTA Button - will need actual Discord link */}
            <a
              href="https://discord.gg/YOUR_INVITE_CODE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord Community
              <ArrowRightIcon size={18} />
            </a>

            <p className="text-paper/50 text-sm mt-4">
              Get feedback on your pitch, connect with other creators, and access exclusive resources
            </p>
          </motion.div>
        </div>
      </section>

    </main>
    <Footer />
  </>
  );
}
