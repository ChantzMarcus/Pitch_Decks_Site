'use client';

import { useState } from 'react';
import ScrollTriggeredVideo from './ScrollTriggeredVideo';
import { ScrollReveal } from '@/components/animations';

interface VideoItem {
  videoSrc: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface AppleStyleVideoGalleryProps {
  videos: VideoItem[];
  title?: string;
  className?: string;
}

/**
 * AppleStyleVideoGallery Component
 * 
 * A gallery component inspired by Apple's video showcase:
 * - Videos play automatically when scrolled into view
 * - Smooth scroll animations
 * - Clean, minimal design
 * - Responsive grid layout
 */
export default function AppleStyleVideoGallery({
  videos,
  title,
  className = '',
}: AppleStyleVideoGalleryProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      {title && (
        <ScrollReveal direction="up" className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            {title}
          </h2>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-6">
        {videos.map((video, index) => (
          <ScrollReveal
            key={index}
            direction="up"
            delay={index * 0.1}
            className="group"
          >
            <div className="relative">
              <ScrollTriggeredVideo
                videoSrc={video.videoSrc}
                thumbnail={video.thumbnail}
                title={video.title}
                loop={true}
                muted={true}
                aspectRatio="video"
                playThreshold={0.5}
                pauseThreshold={0.3}
                showAutoplayControls={true}
                className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
              />
              
              {video.title && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-charcoal mb-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-charcoal/70">
                      {video.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
