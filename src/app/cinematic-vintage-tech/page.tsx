'use client';

import { Suspense } from 'react';
import CinematicBanner from '@/components/ui/CinematicBanner';
import CinematicCard from '@/components/ui/CinematicCard';
import CinematicButton from '@/components/ui/CinematicButton';
import CinematicShowcase from '@/components/ui/CinematicShowcase';

export default function CinematicHomepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold text-charcoal">
      {/* Hero Section */}
      <CinematicBanner 
        title="Cinematic Vintage Tech" 
        subtitle="Where 1840s-1930s elegance meets modern innovation"
        variant="elegant"
      >
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of vintage craftsmanship and contemporary technology.
          Elegant design with sophisticated functionality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CinematicButton variant="vintage">Explore Collection</CinematicButton>
          <CinematicButton variant="elegant">Learn More</CinematicButton>
        </div>
      </CinematicBanner>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Elements Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 vintage-text-gold">
              Elegant Fusion
            </h2>
            <p className="text-xl text-charcoal max-w-2xl mx-auto">
              Where timeless design meets modern functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <CinematicCard variant="tech" title="Precision Engineering">
                <p className="text-charcoal mb-4">
                  Meticulous craftsmanship with modern technological precision.
                </p>
                <CinematicButton variant="tech" size="sm">Discover</CinematicButton>
              </CinematicCard>
            </Suspense>

            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <CinematicCard variant="vintage" title="Timeless Aesthetics">
                <p className="text-charcoal mb-4">
                  Classic elegance that transcends trends and remains perpetually stylish.
                </p>
                <CinematicButton variant="vintage" size="sm">Explore</CinematicButton>
              </CinematicCard>
            </Suspense>

            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <CinematicCard variant="luxury" title="Premium Materials">
                <p className="text-charcoal mb-4">
                  Rich textures and luxurious materials for an elevated experience.
                </p>
                <CinematicButton variant="luxury" size="sm">Experience</CinematicButton>
              </CinematicCard>
            </Suspense>
          </div>
        </section>

        {/* Cinematic Showcase */}
        <section className="mb-20">
          <CinematicShowcase 
            title="Elegant Innovation"
            description="Sophisticated design with contemporary functionality"
          />
        </section>

        {/* Subtle Elements */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 vintage-text-gold">
              Refined Elements
            </h2>
            <p className="text-xl text-charcoal max-w-2xl mx-auto">
              Carefully curated details that elevate the entire experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <CinematicCard variant="elegant" title="Artisanal Craftsmanship">
                <p className="text-charcoal mb-4">
                  Each element meticulously designed with attention to detail.
                </p>
              </CinematicCard>
              
              <CinematicCard variant="tech" title="Modern Innovation">
                <p className="text-charcoal mb-4">
                  Contemporary functionality seamlessly integrated with classic aesthetics.
                </p>
              </CinematicCard>
              
              <CinematicCard variant="vintage" title="Historical Inspiration">
                <p className="text-charcoal mb-4">
                  Drawing from the golden age of design and engineering.
                </p>
              </CinematicCard>
            </div>
            
            <div className="vintage-card p-8 bg-gradient-to-br from-ivory to-old-gold">
              <h3 className="font-display text-3xl font-bold text-charcoal mb-6 text-center">
                The Perfect Blend
              </h3>
              <div className="text-center mb-8">
                <div className="gas-light-effect inline-block p-4 rounded-full bg-gradient-to-r from-gas-light-yellow to-carnival-gold">
                  <span className="text-6xl">✨</span>
                </div>
              </div>
              <p className="text-charcoal text-center mb-8">
                Experience the harmony of vintage elegance and modern sophistication. 
                Every detail thoughtfully designed to create a cohesive and refined experience.
              </p>
              <div className="text-center">
                <CinematicButton variant="elegant">Begin Journey</CinematicButton>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6 vintage-text-gold">
              Experience Elegance
            </h2>
            <p className="text-xl text-charcoal mb-8">
              Discover the perfect blend of timeless design and contemporary functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CinematicButton variant="vintage" size="lg">Explore Collection</CinematicButton>
              <CinematicButton variant="elegant" size="lg">Learn More</CinematicButton>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-steampunk-steel to-mechanical-gear py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="vintage-text-gold text-3xl font-display font-bold mb-4">
            Cinematic Vintage Tech
          </div>
          <p className="text-ivory mb-6">
            Blending timeless elegance with modern innovation since 2026
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">About</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Collections</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Craftsmanship</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Innovation</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Contact</a>
          </div>
          <p className="text-ivory/70">
            © 2026 Cinematic Vintage Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}