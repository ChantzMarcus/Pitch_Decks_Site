import { Suspense } from 'react';
import VintageBanner from '@/components/ui/VintageBanner';
import VintageCard from '@/components/ui/VintageCard';
import VintageButton from '@/components/ui/VintageButton';
import SteampunkCircusShowcase from '@/components/ui/SteampunkCircusShowcase';

export default function VintageCircusHomepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-big-top-navy to-steampunk-steel text-ivory">
      {/* Hero Section */}
      <VintageBanner 
        title="The Grand Victorian Circus" 
        subtitle="A Steampunk Spectacle of Mechanical Marvels and Vintage Wonder"
        variant="big-top"
      >
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Step into a world where Victorian innovation meets carnival magic. 
          Experience the wonder of gaslight illumination and brass machinery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <VintageButton variant="gaslight">Book Tickets</VintageButton>
          <VintageButton variant="circus">View Acts</VintageButton>
        </div>
      </VintageBanner>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Acts Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 vintage-text-gold">
              Featured Acts
            </h2>
            <p className="text-xl text-ivory max-w-2xl mx-auto">
              Witness the incredible performances that blend vintage charm with mechanical precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <VintageCard variant="steampunk" title="The Mechanical Marionettes">
                <p className="text-ivory mb-4">
                  Watch as brass and copper puppets perform an enchanting ballet powered by steam.
                </p>
                <VintageButton variant="steampunk" size="sm">Learn More</VintageButton>
              </VintageCard>
            </Suspense>

            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <VintageCard variant="circus" title="The Gaslight Aerialists">
                <p className="text-ivory mb-4">
                  Graceful performers illuminated by warm gaslight, defying gravity with elegance.
                </p>
                <VintageButton variant="gaslight" size="sm">Learn More</VintageButton>
              </VintageCard>
            </Suspense>

            <Suspense fallback={<div className="h-80 bg-ivory/10 rounded-xl animate-pulse"></div>}>
              <VintageCard variant="vintage" title="The Brass Band Orchestra">
                <p className="text-ivory mb-4">
                  A magnificent ensemble of brass instruments from the 1890s performing timeless melodies.
                </p>
                <VintageButton variant="vintage" size="sm">Learn More</VintageButton>
              </VintageCard>
            </Suspense>
          </div>
        </section>

        {/* Steampunk Showcase */}
        <section className="mb-20">
          <SteampunkCircusShowcase 
            title="Steampunk Wonders"
            description="Where Victorian innovation meets carnival spectacle"
          />
        </section>

        {/* Vintage Attractions */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 vintage-text-gold">
              Vintage Attractions
            </h2>
            <p className="text-xl text-ivory max-w-2xl mx-auto">
              Explore the many wonders of our traveling circus from the golden age of entertainment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <VintageCard variant="big-top" title="The Crystal Palace Carousel">
                <p className="text-ivory mb-4">
                  Hand-carved horses and brass fixtures illuminate with gaslight magic.
                </p>
              </VintageCard>
              
              <VintageCard variant="steampunk" title="The Mechanical Fortune Teller">
                <p className="text-ivory mb-4">
                  Ask the brass automaton your fortune in this marvel of Victorian engineering.
                </p>
              </VintageCard>
              
              <VintageCard variant="circus" title="The Vanishing Elephant Act">
                <p className="text-ivory mb-4">
                  Watch as our pachyderm disappears through ingenious mechanical means.
                </p>
              </VintageCard>
            </div>
            
            <div className="vintage-card p-8 bg-gradient-to-br from-vintage-velvet to-circus-red">
              <h3 className="font-display text-3xl font-bold text-ivory mb-6 text-center">
                The Grand Finale
              </h3>
              <div className="text-center mb-8">
                <div className="gas-light-effect inline-block p-4 rounded-full bg-gradient-to-r from-gas-light-yellow to-carnival-gold">
                  <span className="text-6xl">🎪</span>
                </div>
              </div>
              <p className="text-ivory text-center mb-8">
                Our spectacular finale combines fireworks, mechanical marvels, and gaslight illumination 
                to create an unforgettable experience.
              </p>
              <div className="text-center">
                <VintageButton variant="gaslight">Reserve Your Seat</VintageButton>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6 vintage-text-gold">
              Experience the Magic
            </h2>
            <p className="text-xl text-ivory mb-8">
              Join us for an unforgettable journey into the golden age of entertainment, 
              where Victorian innovation meets carnival wonder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VintageButton variant="gaslight" size="lg">Purchase Tickets</VintageButton>
              <VintageButton variant="circus" size="lg">Schedule</VintageButton>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-steampunk-steel to-mechanical-gear py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="vintage-text-gold text-3xl font-display font-bold mb-4">
            The Grand Victorian Circus
          </div>
          <p className="text-ivory mb-6">
            Bringing wonder and innovation to audiences since 1847
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">About</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Acts</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Schedule</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Tickets</a>
            <a href="#" className="text-ivory hover:text-carnival-gold transition-colors">Contact</a>
          </div>
          <p className="text-ivory/70">
            © 1847-1930 The Grand Victorian Circus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}