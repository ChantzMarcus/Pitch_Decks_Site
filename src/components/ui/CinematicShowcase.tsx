// Cinematic Vintage Tech Theme
// Subtle integration of 1840s-1930s elegance with modern technology

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CinematicCard from '@/components/ui/CinematicCard';
import CinematicButton from '@/components/ui/CinematicButton';

interface CinematicShowcaseProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CinematicShowcase({ 
  title = "Cinematic Vintage Tech", 
  description = "Where 1840s-1930s elegance meets modern innovation",
  className = ""
}: CinematicShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Elegant Craftsmanship",
      description: "Handcrafted details with precision engineering from the golden age of innovation",
      icon: "⚙️"
    },
    {
      title: "Luxurious Materials",
      description: "Rich velvets, polished brass, and aged copper create an opulent experience",
      icon: "✨"
    },
    {
      title: "Modern Functionality",
      description: "Contemporary technology seamlessly integrated with vintage aesthetics",
      icon: "💻"
    },
    {
      title: "Timeless Design",
      description: "Classic elegance that transcends trends and remains perpetually stylish",
      icon: "🏛️"
    }
  ];

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
                  ? 'bg-gradient-to-r from-carnival-gold to-gas-light-yellow text-charcoal border-2 border-brass-dark'
                  : 'bg-ivory/20 text-ivory hover:bg-ivory/30'
              }`}
              onClick={() => setActiveFeature(index)}
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
          <CinematicCard variant="tech" className="h-96 steampunk-gear-pattern">
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
          </CinematicCard>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <CinematicButton variant="vintage" size="lg">
              Experience the Elegance
            </CinematicButton>
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
            <div className="text-4xl text-center mb-3">✨</div>
            <h4 className="font-bold text-center text-charcoal">Element {item}</h4>
            <p className="text-sm text-center text-charcoal/70">Elegant fusion</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}