// src/components/ImmersiveDeckGallery.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';

interface Slide {
  id: string;
  image_url: string;
  title?: string;
  description?: string;
  caption?: string;
}

interface ImmersiveDeckGalleryProps {
  slides: Slide[];
  startIndex?: number;
  onClose: () => void;
  title?: string;
}

export default function ImmersiveDeckGallery({
  slides,
  startIndex = 0,
  onClose,
  title = "Pitch Deck Slides"
}: ImmersiveDeckGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
      }, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Navigation Controls */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="text-white/80 font-medium">
            {title}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                </svg>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm z-10">
          {currentIndex + 1} / {slides.length}
        </div>

        {/* Main Content */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={currentSlide.image_url}
                  alt={currentSlide.title || `Slide ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        {(currentSlide.title || currentSlide.caption || currentSlide.description) && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
            {currentSlide.title && (
              <h3 className="font-medium text-white mb-1">{currentSlide.title}</h3>
            )}
            {currentSlide.caption && (
              <p className="text-sm text-white/90">{currentSlide.caption}</p>
            )}
            {currentSlide.description && !currentSlide.caption && (
              <p className="text-sm text-white/90">{currentSlide.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}