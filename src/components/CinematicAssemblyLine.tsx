'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicAssemblyLine() {
  const [currentStage, setCurrentStage] = useState<'screenplay' | 'transition' | 'projector'>('screenplay');
  const [countdown, setCountdown] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-progression through stages
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStage('transition');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStage === 'transition') {
      const timer = setTimeout(() => {
        setCurrentStage('projector');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  useEffect(() => {
    if (currentStage === 'projector') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold flex flex-col">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold vintage-text-gold">
          From Script to Screen
        </h1>
        <p className="text-xl text-charcoal/80 mt-4">
          Watch your story transform through our cinematic process
        </p>
      </header>

      {/* Assembly Line Container */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl h-96 relative overflow-hidden">
          {/* Assembly Line Track */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-2 bg-brass-dark/30 rounded-full relative">
              {/* Moving Conveyor Belt Effect */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg,transparent,rgba(184,115,51,0.3)_50%,transparent)',
                  backgroundSize: '200px 100%',
                  animation: 'moveRight 2s linear infinite',
                }}
              ></div>
            </div>
          </div>

          {/* Assembly Line Items */}
          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              {currentStage === 'screenplay' && (
                <motion.div
                  key="screenplay"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute w-full max-w-2xl mx-auto"
                >
                  <div className="bg-ivory/80 backdrop-blur-sm rounded-2xl border border-brass-dark/50 p-8 shadow-xl">
                    <div className="text-center mb-6">
                      <h2 className="font-display text-3xl font-bold text-charcoal mb-2">Your Story</h2>
                      <p className="text-charcoal/70">Screenplay Format</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-vintage-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-vintage-gold font-bold">1</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-charcoal">Concept Development</h3>
                          <p className="text-charcoal/80">Your raw idea transformed into structured narrative</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-vintage-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-vintage-gold font-bold">2</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-charcoal">Character Arcs</h3>
                          <p className="text-charcoal/80">Well-developed characters with clear motivations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-vintage-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-vintage-gold font-bold">3</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-charcoal">Market Positioning</h3>
                          <p className="text-charcoal/80">Strategic placement in the entertainment landscape</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <div className="inline-block bg-ivory/50 border border-brass-dark/30 rounded-lg p-4">
                        <p className="text-charcoal/90 italic">
                          "Your story begins as a simple idea, but we craft it into a compelling screenplay..."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStage === 'transition' && (
                <motion.div
                  key="transition"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute w-full text-center"
                >
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-2xl font-bold text-charcoal">Transforming to Film...</p>
                  <p className="text-charcoal/70">Cinematic magic in progress</p>
                </motion.div>
              )}

              {currentStage === 'projector' && (
                <motion.div
                  key="projector"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute w-full max-w-2xl mx-auto"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-8 border-gray-900 p-8 shadow-2xl">
                    {/* Vintage Projector Screen */}
                    <div className="relative bg-black h-64 rounded overflow-hidden mb-6">
                      {/* Film Reel Elements */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-4 border-gray-600 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-gray-500 animate-spin" style={{ animationDuration: '8s' }}></div>
                      </div>
                      
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-4 border-gray-600 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-gray-500 animate-spin" style={{ animationDuration: '6s' }}></div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl font-mono font-bold text-green-400 mb-4 animate-pulse">
                            {countdown}
                          </div>
                          <div className="text-green-400 font-mono text-lg tracking-widest">
                            COUNTDOWN TO PREMIERE
                          </div>
                        </div>
                        
                        {/* Scan Lines Effect */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          background: `repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0.15),
                            rgba(0, 0, 0, 0.15) 1px,
                            transparent 1px,
                            transparent 2px
                          )`
                        }}></div>
                      </div>
                    </div>
                    
                    {/* Projector Controls */}
                    <div className="bg-gray-900 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-gray-300 text-sm font-mono">VINTAGE FILM PROJECTOR 3000</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="font-display text-2xl font-bold text-ivory mb-2">Your Story, Transformed</h3>
                      <p className="text-gray-300">
                        From screenplay to cinematic reality. Ready for the big screen.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stage Indicator */}
      <div className="py-8 text-center">
        <div className="inline-flex items-center gap-4 bg-ivory/50 rounded-full px-6 py-3 border border-brass-dark/30">
          <div className={`w-3 h-3 rounded-full ${currentStage === 'screenplay' ? 'bg-vintage-gold' : 'bg-charcoal/30'}`}></div>
          <div className={`w-3 h-3 rounded-full ${currentStage === 'transition' ? 'bg-vintage-gold' : currentStage === 'projector' ? 'bg-vintage-gold' : 'bg-charcoal/30'}`}></div>
          <div className={`w-3 h-3 rounded-full ${currentStage === 'projector' ? 'bg-vintage-gold' : 'bg-charcoal/30'}`}></div>
        </div>
        <p className="text-charcoal/80 mt-2 capitalize">
          Current stage: {currentStage.replace('-', ' ')}
        </p>
      </div>
    </div>
  );
}