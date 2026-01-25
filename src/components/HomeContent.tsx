'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';
import DeckGrid from '@/components/DeckGrid';
import QuickViewModal from '@/components/QuickViewModal';
import ServicesShowcase from '@/components/ServicesShowcase';
import VideoShowcase from '@/components/VideoShowcase';
import StructuredData from '@/components/StructuredData';
import { Preloader } from '@/components/Preloader';
import { Footer } from '@/components/Footer';
import type { Deck } from '@/db';
import { ArrowRight, FileText, BarChart3, Sparkles, Star, TrendingUp } from 'lucide-react';

interface HomeContentProps {
  initialDecks: Deck[];
}

export default function HomeContent({ initialDecks }: HomeContentProps) {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleQuickView = (deck: Deck) => {
    setSelectedDeck(deck);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDeck(null), 300);
  };

  return (
    <>
      <Preloader />
      <main className="min-h-screen bg-paper">
        <StructuredData
          type="webpage"
          data={{
            url: '',
            name: 'FilmDecks | Professional Pitch Packaging',
            description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
          }}
        />
        {/* Hero Section */}
        <Hero />

      {/* Trust Bar */}
      <section className="py-8 border-y border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-charcoal/40 text-sm">
            <div className="flex items-center gap-2">
              <Star className="fill-current" size={18} />
              <span>500+ Pitch Decks Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              <span>$300M+ Funding Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>100+ Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Paths CTA */}
      <section className="py-20 bg-paper">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Which Path Are You?
            </h2>
            <p className="text-xl text-charcoal/70">
              We help both creators and investors bring projects to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Path */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent-indigo/10 to-transparent p-8 rounded-2xl border border-accent-indigo/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-indigo rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal">
                  I Have a Story
                </h3>
              </div>
              <p className="text-charcoal/70 mb-6">
                You're a writer, author, or creator with a project that deserves to be on screen.
                Get a free professional score and see how we can help. We help you get everything you need to go to market.
              </p>
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
              >
                Get Free Story Score
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Investor Path */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent-gold/10 to-transparent p-8 rounded-2xl border border-accent-gold/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-gold rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-charcoal">
                  I'm Looking for Projects
                </h3>
              </div>
              <p className="text-charcoal/70 mb-6">
                You're an investor, producer, or industry professional looking for your next hit.
                Browse our curated portfolio of professionally packaged projects.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-white font-medium rounded-lg hover:bg-accent-gold/90 transition-colors"
              >
                Browse Projects
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Videos */}
      <VideoShowcase
        title="Why Packaging Matters"
        subtitle="Short videos from the team who greenlit films at major studios"
      />

      {/* Services Section */}
      <ServicesShowcase />

      {/* Featured Projects */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Explore our portfolio of compelling stories ready for production
            </p>
          </motion.div>

          <DeckGrid decks={initialDecks} onQuickView={handleQuickView} />

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-medium rounded-lg hover:bg-charcoal hover:text-white transition-all"
            >
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <VideoShowcase
        title="What Creators Say"
        subtitle="Hear from the 100+ creators we've helped"
        videoSrc="/VF-LOOP-OK-OK.mp4"
        autoPlay={false}
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
