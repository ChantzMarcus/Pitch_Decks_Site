'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilmStripAssemblyLine() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance through frames
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 4); // 4 frames total
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const frames = [
    {
      id: 'script',
      title: 'Your Life Story',
      subtitle: 'Screenplay Format',
      content: (
        <div className="space-y-4">
          <div className="bg-ivory/20 p-4 rounded-lg border border-brass-dark/30">
            <p className="text-charcoal/90 italic">"FADE IN: A person with a dream..."</p>
          </div>
          <div className="text-sm text-charcoal/70">
            <p>• Character development</p>
            <p>• Story structure</p>
            <p>• Market positioning</p>
          </div>
        </div>
      ),
      icon: '📝'
    },
    {
      id: 'transition',
      title: 'Cinematic Transformation',
      subtitle: 'Magic in Progress',
      content: (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-charcoal font-bold">Converting to Film Format</p>
        </div>
      ),
      icon: '✨'
    },
    {
      id: 'projector',
      title: 'Vintage Projector',
      subtitle: 'Ready for Premiere',
      content: (
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-vintage-gold mb-2">00:00:10:00</div>
          <p className="text-charcoal/80">COUNTDOWN TO PREMIERE</p>
        </div>
      ),
      icon: '📽️'
    },
    {
      id: 'result',
      title: 'Your Story, Transformed',
      subtitle: 'Cinematic Reality',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-charcoal font-bold">Ready for the Big Screen</p>
          </div>
          <div className="text-sm text-charcoal/70 text-center">
            <p>From concept to cinematic reality</p>
          </div>
        </div>
      ),
      icon: '🏆'
    }
  ];

  const currentFrameData = frames[currentFrame];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold flex flex-col">
      {/* Header */}
      <header className="py-12 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold vintage-text-gold mb-6">
          From Script to Screen
        </h1>
        <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
          Watch your story transform through our cinematic assembly line
        </p>
      </header>

      {/* Film Strip Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Film Strip Track */}
          <div className="relative h-96 overflow-hidden mb-8">
            {/* Sprocket holes */}
            <div className="absolute left-0 right-0 h-full flex">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1/20 h-full flex flex-col justify-around">
                  <div className="w-3 h-3 bg-brass-dark/30 rounded-full mx-auto"></div>
                  <div className="w-3 h-3 bg-brass-dark/30 rounded-full mx-auto"></div>
                </div>
              ))}
            </div>

            {/* Moving Film Strip */}
            <div className="absolute inset-0 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFrame}
                  initial={{ x: '100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Film Frame */}
                  <div className="w-4/5 max-w-2xl h-4/5 bg-gradient-to-br from-ivory to-old-gold border-4 border-brass-dark rounded-lg shadow-2xl overflow-hidden relative">
                    {/* Frame borders */}
                    <div className="absolute inset-0 border-8 border-brass-dark pointer-events-none"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-brass-dark"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-brass-dark"></div>
                    
                    {/* Frame Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-6xl mb-6">{currentFrameData.icon}</div>
                      <h2 className="font-display text-3xl font-bold text-charcoal mb-2">
                        {currentFrameData.title}
                      </h2>
                      <p className="text-xl text-charcoal/70 mb-6">
                        {currentFrameData.subtitle}
                      </p>
                      <div className="w-full max-w-md">
                        {currentFrameData.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Frame Controls */}
          <div className="flex justify-center items-center gap-6">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-vintage-gold text-charcoal rounded-full font-bold hover:bg-carnival-gold transition-colors"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            
            <div className="flex gap-2">
              {frames.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFrame(index)}
                  className={`w-4 h-4 rounded-full ${
                    currentFrame === index 
                      ? 'bg-vintage-gold' 
                      : 'bg-charcoal/30'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentFrame((prev) => (prev - 1 + frames.length) % frames.length)}
              className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-lg hover:bg-charcoal/20 transition-colors"
            >
              ← Prev
            </button>
            <button 
              onClick={() => setCurrentFrame((prev) => (prev + 1) % frames.length)}
              className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-lg hover:bg-charcoal/20 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="py-8 text-center">
        <div className="inline-flex items-center gap-4 bg-ivory/50 rounded-full px-6 py-3 border border-brass-dark/30">
          {frames.map((frame, index) => (
            <div key={frame.id} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                currentFrame === index ? 'bg-vintage-gold' : 'bg-charcoal/30'
              }`}></div>
              {index < frames.length - 1 && (
                <div className="w-8 h-0.5 bg-charcoal/20"></div>
              )}
            </div>
          ))}
        </div>
        <p className="text-charcoal/80 mt-3 capitalize">
          Step {currentFrame + 1} of {frames.length}: {frames[currentFrame].id.replace('-', ' ')}
        </p>
      </div>
    </div>
  );
}