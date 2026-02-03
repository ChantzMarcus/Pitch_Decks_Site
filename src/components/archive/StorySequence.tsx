// src/components/StorySequence.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Square, Circle } from 'lucide-react';

interface StoryStep {
  id: string;
  image_url: string;
  title: string;
  description: string;
  order: number;
  duration?: number; // Duration in seconds for this step
}

interface StorySequenceProps {
  sequence: StoryStep[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function StorySequence({ 
  sequence, 
  title = "Project Journey",
  subtitle = "A visual walkthrough of our process",
  autoPlay = true,
  loop = true
}: StorySequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepDuration = sequence[currentIndex]?.duration || 4000; // Default 4 seconds per step

  // Auto-advance sequence
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      // Set up step advancement
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % sequence.length;
          setProgress(0); // Reset progress when advancing
          return nextIndex;
        });
      }, stepDuration);

      // Set up progress indicator
      const progressIncrement = 100 / (stepDuration / 100); // Update every 100ms
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return Math.min(prev + progressIncrement, 100);
        });
      }, 100);
    } else {
      // Clear intervals when paused
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, sequence.length, stepDuration]);

  const goToStep = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sequence.length);
    setProgress(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sequence.length) % sequence.length);
    setProgress(0);
  };

  const currentStep = sequence[currentIndex];

  return (
    <div className="bg-gradient-to-br from-paper to-charcoal/5 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-2">
            {title}
          </h2>
          <p className="text-lg text-charcoal/70">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Visual Area */}
          <div className="lg:col-span-2 relative">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/10">
              <Image
                src={currentStep.image_url}
                alt={currentStep.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 67vw"
              />

              {/* Progress indicators */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-center gap-2">
                  {sequence.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-accent-gold scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Progress bar for current step */}
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={goToPrev}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-charcoal hover:bg-white/20 transition-colors"
                aria-label="Previous step"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 19 2 12 11 5 11 19" />
                  <polygon points="22 19 13 12 22 5 22 19" />
                </svg>
              </button>

              <button
                onClick={togglePlayback}
                className="p-3 bg-accent-indigo text-white rounded-full hover:bg-accent-indigo/90 transition-colors"
                aria-label={isPlaying ? "Pause sequence" : "Play sequence"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={goToNext}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-charcoal hover:bg-white/20 transition-colors"
                aria-label="Next step"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 19 22 12 13 5 13 19" />
                  <polygon points="2 19 11 12 2 5 2 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Narrative Area */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                  {currentStep.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-charcoal/60">
                  <span>Step {currentStep.order || currentIndex + 1} of {sequence.length}</span>
                  <span>•</span>
                  <span>{currentIndex + 1}/{sequence.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-charcoal/40'}`} />
                <span className="text-sm text-charcoal/60">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>
            </div>

            <p className="text-charcoal/80 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="pt-4 border-t border-charcoal/10">
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Auto-advance: {autoPlay ? 'On' : 'Off'}</span>
                <span>Loop: {loop ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}