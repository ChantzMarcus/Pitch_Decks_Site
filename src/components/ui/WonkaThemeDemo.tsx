'use client';

import { useState } from 'react';
import WonkaCard from '@/components/ui/WonkaCard';
import WonkaButton from '@/components/ui/WonkaButton';
import WonkaBanner from '@/components/ui/WonkaBanner';
import WonkaModal from '@/components/ui/WonkaModal';
import WonkaAnimation, { WonkaText } from '@/components/ui/WonkaAnimation';

export default function WonkaThemeDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wonka-purple to-wonka-pink p-4 md:p-8">
      <WonkaBanner 
        title="Willy Wonka Theme Demo" 
        subtitle="Experience the magical candy factory redesign"
        variant="factory"
      >
        <WonkaButton 
          variant="lollipop" 
          onClick={() => setIsModalOpen(true)}
        >
          Enter the Factory
        </WonkaButton>
      </WonkaBanner>

      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WonkaAnimation type="candy-bounce" delay={0.2}>
            <WonkaCard 
              title="Chocolate Room" 
              variant="chocolate"
            >
              <p>Swimming pools of liquid chocolate as far as the eye can see.</p>
              <WonkaButton 
                size="sm" 
                variant="chocolate"
                className="mt-4"
                onClick={() => setCounter(counter + 1)}
              >
                Take a sip
              </WonkaButton>
            </WonkaCard>
          </WonkaAnimation>

          <WonkaAnimation type="golden-ticket" delay={0.4}>
            <WonkaCard 
              title="Inventing Room" 
              variant="gummy"
            >
              <p>Where new candies are dreamed up and tested.</p>
              <WonkaButton 
                size="sm" 
                variant="gum"
                className="mt-4"
              >
                Invent something
              </WonkaButton>
            </WonkaCard>
          </WonkaAnimation>

          <WonkaAnimation type="fizzy-lifting" delay={0.6}>
            <WonkaCard 
              title="Nut Room" 
              variant="lollipop"
            >
              <p>Where squirrels sort the good nuts from the bad nuts.</p>
              <WonkaButton 
                size="sm" 
                variant="pop"
                className="mt-4"
              >
                Sort nuts
              </WonkaButton>
            </WonkaCard>
          </WonkaAnimation>
        </div>

        <div className="mt-16 text-center">
          <WonkaText type="candy-bounce" className="text-4xl font-display font-bold mb-6">
            Welcome to the Sweetest Place on Earth!
          </WonkaText>
          
          <div className="bg-cream p-8 rounded-2xl border-4 border-wonka-yellow max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-chocolate-brown mb-4">
              Candy Counter
            </h2>
            <p className="text-5xl font-bold text-wonka-purple mb-6">{counter}</p>
            <WonkaButton 
              variant="caramel"
              onClick={() => setCounter(counter + 1)}
            >
              Make More Candy
            </WonkaButton>
          </div>
        </div>
      </div>

      <WonkaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Golden Ticket Invitation"
        variant="golden-ticket"
      >
        <div className="text-center">
          <WonkaText type="candy-bounce" className="text-2xl font-bold mb-4">
            Congratulations!
          </WonkaText>
          <p className="mb-6">
            You've found a golden ticket! Step inside the magical world of Willy Wonka's chocolate factory.
          </p>
          <WonkaButton 
            variant="caramel"
            onClick={() => setIsModalOpen(false)}
          >
            Enter the Factory
          </WonkaButton>
        </div>
      </WonkaModal>
    </div>
  );
}