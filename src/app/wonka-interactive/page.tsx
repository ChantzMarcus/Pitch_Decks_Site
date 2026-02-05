import { Suspense } from 'react';
import InteractiveStory, { wonkaStory } from '@/components/ui/InteractiveStory';
import CandyCreator from '@/components/ui/CandyCreator';
import FactoryTour from '@/components/ui/FactoryTour';
import WonkaBanner from '@/components/ui/WonkaBanner';
import WonkaButton from '@/components/ui/WonkaButton';
import WonkaCard from '@/components/ui/WonkaCard';

export default function WonkaInteractiveExperience() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-wonka-purple to-wonka-pink py-8">
      <WonkaBanner 
        title="Willy Wonka Interactive Experience" 
        subtitle="Write your own destiny in the magical chocolate factory"
        variant="factory"
      >
        <p className="text-xl">Explore, create, and adventure through the most magical place on Earth!</p>
      </WonkaBanner>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <WonkaCard variant="chocolate" className="h-full">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown mb-4">Interactive Story</h3>
            <p className="text-charcoal mb-4">Make choices that shape your journey through Wonka's factory. Will you discover secrets, meet Oompa-Loompas, or create new candies?</p>
            <div className="mt-auto">
              <a href="#story-section">
                <WonkaButton variant="lollipop">Begin Story</WonkaButton>
              </a>
            </div>
          </WonkaCard>

          <WonkaCard variant="gummy" className="h-full">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown mb-4">Candy Creator</h3>
            <p className="text-charcoal mb-4">Design your own unique Wonka candy. Choose ingredients, shape, size, flavor, and more to create something truly magical.</p>
            <div className="mt-auto">
              <a href="#creator-section">
                <WonkaButton variant="gum">Create Candy</WonkaButton>
              </a>
            </div>
          </WonkaCard>

          <WonkaCard variant="lollipop" className="h-full">
            <h3 className="font-display text-2xl font-bold text-chocolate-brown mb-4">Factory Tour</h3>
            <p className="text-charcoal mb-4">Navigate through the magical rooms of Wonka's factory. Discover secrets, meet characters, and explore the wonders.</p>
            <div className="mt-auto">
              <a href="#tour-section">
                <WonkaButton variant="pop">Start Tour</WonkaButton>
              </a>
            </div>
          </WonkaCard>
        </div>

        <div id="story-section" className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center text-chocolate-brown mb-8">Write Your Own Story</h2>
          <Suspense fallback={<div className="text-center py-12">Loading story...</div>}>
            <InteractiveStory story={wonkaStory} startNodeId="start" />
          </Suspense>
        </div>

        <div id="creator-section" className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center text-chocolate-brown mb-8">Create Your Candy</h2>
          <Suspense fallback={<div className="text-center py-12">Loading candy creator...</div>}>
            <CandyCreator />
          </Suspense>
        </div>

        <div id="tour-section" className="mb-16">
          <h2 className="font-display text-3xl font-bold text-center text-chocolate-brown mb-8">Factory Adventure</h2>
          <Suspense fallback={<div className="text-center py-12">Loading factory tour...</div>}>
            <FactoryTour />
          </Suspense>
        </div>

        <div className="text-center py-12">
          <WonkaBanner variant="golden-ticket" className="py-8">
            <h2 className="font-display text-3xl font-bold mb-4">Thank You for Visiting Wonka's Factory!</h2>
            <p className="text-xl">Come back anytime to continue your magical adventure.</p>
          </WonkaBanner>
        </div>
      </div>
    </div>
  );
}