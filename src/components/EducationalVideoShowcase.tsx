'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import EducationalVideoCard from './EducationalVideoCard';

export interface EducationalVideo {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  category: 'Education' | 'Testimonial' | 'Insight' | string;
  thumbnail?: string;
  videoUrl?: string;
  tag?: string; // Bottom-left tag
  extraTag?: string; // Top-left tag with icon
}

interface EducationalVideoShowcaseProps {
  videos: EducationalVideo[];
  title?: string;
}

export default function EducationalVideoShowcase({
  videos,
  title = 'Educational Videos',
}: EducationalVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 320; // Card width + gap
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-20 bg-charcoal-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              {title}
            </h2>
            <p className="text-paper-muted text-lg">
              Click any video to watch and learn
            </p>
          </motion.div>
        )}

        {/* Scrollable container */}
        <div className="relative">
          {/* Navigation arrows */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              onMouseEnter={checkScrollButtons}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                canScrollLeft
                  ? 'bg-paper/10 text-paper hover:bg-paper/20 backdrop-blur-sm'
                  : 'bg-paper/5 text-paper/30 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              onMouseEnter={checkScrollButtons}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                canScrollRight
                  ? 'bg-paper/10 text-paper hover:bg-paper/20 backdrop-blur-sm'
                  : 'bg-paper/5 text-paper/30 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Cards container */}
          <div
            ref={containerRef}
            onScroll={checkScrollButtons}
            className="flex gap-0 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: '60px', // Offset for first card overlap
            }}
          >
            {videos.map((video, index) => (
              <EducationalVideoCard
                key={video.id}
                title={video.title}
                description={video.description}
                duration={video.duration}
                category={video.category}
                thumbnail={video.thumbnail}
                videoUrl={video.videoUrl}
                tag={video.tag}
                extraTag={video.extraTag}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
