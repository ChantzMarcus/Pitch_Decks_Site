'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VintageCard from '@/components/ui/VintageCard';
import VintageButton from '@/components/ui/VintageButton';

interface SteampunkCircusProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function SteampunkCircusShowcase({ 
  title = "Steampunk Circus Extravaganza", 
  description = "Where Victorian innovation meets carnival wonder",
  className = ""
}: SteampunkCircusProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const features = [
    {
      title: "Mechanical Marvels",
      description: "Witness the incredible steampunk contraptions that power our circus acts",
      icon: "⚙️"
    },
    {
      title: "Gaslight Glamour",
      description: "Be amazed by performances illuminated with warm, flickering gaslight",
      icon: "💡"
    },
    {
      title: "Brass Band Spectacular",
      description: "Hear the magnificent sounds of our brass ensemble playing vintage tunes",
      icon: "🎺"
    },
    {
      title: "Victorian Vaudeville",
      description: "Enjoy classic performances in the style of the 1890s",
      icon: "🎭"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveFeature(prev => (prev + 1) % features.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className={`p-6 ${className}`}>
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 vintage-text-gold">
          {title}
        </h1>
        <p className="text-xl text-ivory max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                activeFeature === index
                  ? 'bg-gradient-to-r from-steampunk-brass to-carnival-gold text-charcoal border-2 border-brass-dark'
                  : 'bg-ivory/20 text-ivory hover:bg-ivory/30'
              }`}
              onClick={() => {
                setIsAnimating(true);
                setActiveFeature(index);
                setTimeout(() => setIsAnimating(false), 300);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start">
                <span className="text-4xl mr-4">{feature.icon}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className={activeFeature === index ? 'text-charcoal' : 'text-ivory'}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <VintageCard variant="steampunk" className="h-96 steampunk-gear-pattern">
            <div className="h-full flex flex-col justify-center items-center text-center">
              <motion.div
                className="mechanical-gauge w-64 h-64 mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <h3 className="font-display text-2xl font-bold text-ivory mb-2">
                {features[activeFeature].title}
              </h3>
              <p className="text-ivory max-w-md">
                {features[activeFeature].description}
              </p>
            </div>
          </VintageCard>

          <AnimatePresence>
            {isAnimating && (
              <motion.div
                className="absolute inset-0 rounded-xl border-8 border-carnival-gold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <VintageButton variant="gaslight" size="lg">
              Experience the Wonder
            </VintageButton>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            className="vintage-card bg-ivory p-4 rounded-lg border-2 border-carnival-gold"
            whileHover={{ y: -10, rotate: item % 2 === 0 ? -2 : 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-4xl text-center mb-3">🎪</div>
            <h4 className="font-bold text-center text-charcoal">Attraction {item}</h4>
            <p className="text-sm text-center text-charcoal/70">Vintage charm</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}