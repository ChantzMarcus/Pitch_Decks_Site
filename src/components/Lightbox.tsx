'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  slides: { id: string; image_url: string; caption?: string | null }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ 
  slides, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: LightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.2, 3));
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel(prev => Math.max(prev - 0.2, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const currentSlide = slides[currentIndex];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setIsZoomed(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleZoomReset}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Reset zoom"
          >
            {zoomLevel.toFixed(1)}x
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide counter */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
          {currentIndex + 1} / {slides.length}
        </div>

        {/* Main content */}
        <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            >
              <Image
                src={currentSlide.image_url}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-contain"
                onDoubleClick={() => {
                  if (isZoomed) {
                    handleZoomReset();
                  } else {
                    setZoomLevel(2);
                    setIsZoomed(true);
                  }
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        {currentSlide.caption && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
            {currentSlide.caption}
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto py-2 px-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                // Reset zoom when changing slides
                setZoomLevel(1);
                setIsZoomed(false);
              }}
              className={`relative w-16 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                index === currentIndex ? 'border-white' : 'border-transparent'
              }`}
            >
              <Image
                src={slide.image_url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}