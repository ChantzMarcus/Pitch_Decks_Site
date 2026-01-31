'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import DeckGrid from '@/components/DeckGrid';
import QuickViewModal from '@/components/QuickViewModal';
import ServicesShowcase from '@/components/ServicesShowcase';
import VideoShowcase from '@/components/VideoShowcase';
import StructuredData from '@/components/StructuredData';
import { Preloader } from '@/components/Preloader';
import { Footer } from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import DualCTA from '@/components/DualCTA';
import TestimonialReviews from '@/components/TestimonialReviews';
import TestimonialVideoShowcase from '@/components/TestimonialVideoShowcase';
import EducationalVideoShowcase from '@/components/EducationalVideoShowcase';
import { EDUCATIONAL_VIDEOS } from '@/components/EducationalVideoCard';
import { MOCK_TESTIMONIAL_VIDEOS } from '@/lib/mock-testimonials';
import { ScrollReveal } from '@/components/animations';
import type { Deck } from '@/db';
import { getDeckSlideUrls, type DeckWithSlides } from '@/lib/mock-decks';
import { ArrowRightIcon, StoryIcon } from '@/components/icons/FilmIcons';
import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';
import LayeredImagesShowcase from '@/components/LayeredImagesShowcase';
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';

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

  const handleQuickView = (deck: Deck) => {
    // Attach slides to the deck when opening quick view
    const deckWithSlides: DeckWithSlides = {
      ...deck,
      slides: getDeckSlideUrls(deck.id),
    };
    setSelectedDeck(deckWithSlides);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDeck(null), 300);
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
        {/* Hero Section with Video Background */}
        <HeroVideo />

      {/* Trust Bar */}
      <section className="py-8 border-y border-paper/10 bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-paper-muted text-sm">
            <div className="flex items-center gap-2">
              <StarIcon className="fill-current" size={18} />
              <span>500+ Pitch Decks Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUpIcon size={18} />
              <span>$300M+ Funding Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <StoryIcon size={18} />
              <span>100+ Success Stories</span>
            </div>
          </div>
        </div>
      </section>

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

      {/* Before/After Transformation Showcase - Show Results FIRST */}
      <BeforeAfterShowcase
        items={[
          {
            id: '1',
            before: {
              title: 'Raw Concept',
              description: 'Initial story idea without professional packaging',
              image: '/images/posters/hero-poster.jpg',
              issues: [
                'Unclear market positioning',
                'Missing key visual elements',
                'No industry-standard structure',
              ],
            },
            after: {
              title: 'Production-Ready Deck',
              description: 'Professionally packaged with veteran industry insights',
              image: '/images/posters/hero-poster.jpg',
              improvements: [
                'Clear market positioning',
                'Compelling visual narrative',
                'Industry-standard structure',
                'Veteran feedback integrated',
              ],
            },
            metrics: {
              funding: '$2.5M',
              timeline: '3 months',
              status: 'In Production',
            },
          },
          {
            id: '2',
            before: {
              title: 'Early Draft',
              description: 'Basic outline without professional refinement',
              image: '/images/posters/hero-poster.jpg',
              issues: [
                'Weak visual storytelling',
                'Missing competitive analysis',
                'Unclear value proposition',
              ],
            },
            after: {
              title: 'Polished Presentation',
              description: 'Ready for investor meetings and production',
              image: '/images/posters/hero-poster.jpg',
              improvements: [
                'Strong visual narrative',
                'Comprehensive market analysis',
                'Clear value proposition',
                'Investor-ready format',
              ],
            },
            metrics: {
              funding: '$1.8M',
              timeline: '2 months',
              status: 'Funded',
            },
          },
        ]}
        title="See the Transformation"
        subtitle="Watch how we transform raw concepts into production-ready pitch decks"
      />

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

          <DeckGrid decks={initialDecks} onQuickView={handleQuickView} horizontalScroll={true} />

          <ScrollReveal direction="up" delay={0.3} className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-paper/20 text-paper font-medium rounded-lg hover:bg-paper hover:text-charcoal transition-all"
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
            videos={EDUCATIONAL_VIDEOS.slice(0, 3)}
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

      {/* Text Testimonials - Reinforcement */}
      <TestimonialReviews
        title="What Creators Say"
        subtitle="Real reviews from real creators who transformed their projects"
      />

      {/* Social Proof - Upwork Profile - Lower for Additional Trust */}
      <SocialProof />

      {/* Dual CTA - Primary Conversion Section */}
      <DualCTA />

      {/* Apple-Style Scroll-Triggered Video Gallery */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="fade" className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
              See Our Process in Action
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Watch how we transform stories into production-ready pitch decks
            </p>
          </ScrollReveal>

          <AppleStyleVideoGallery
            videos={[
              {
                videoSrc: '/VF-LOOP-OK-OK.mp4',
                thumbnail: '/images/posters/hero-poster.jpg',
                title: 'Our Process',
                description: 'From concept to production-ready deck',
              },
              {
                videoSrc: '/new-mobile-okok.mp4',
                thumbnail: '/images/posters/hero-poster-mobile.jpg',
                title: 'Client Success Stories',
                description: 'Real results from real creators',
              },
              {
                videoSrc: '/VF-LOOP-OK-OK.mp4',
                thumbnail: '/images/posters/hero-poster.jpg',
                title: 'Industry Insights',
                description: 'Veteran feedback and analysis',
              },
            ]}
          />
        </div>
      </section>

      {/* Layered Images Showcase - Apple Style */}
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

      {/* Quick View Modal */}
      {selectedDeck && (
        <QuickViewModal
          deck={selectedDeck}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

    </main>
    <Footer />
  </>
  );
}
