'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import EmbeddedVideoPlayer from './EmbeddedVideoPlayer';

export interface TestimonialVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string; // Cloudinary URL or YouTube/Vimeo ID
  videoType?: 'cloudinary' | 'youtube' | 'vimeo'; // How to handle the video
  duration?: string;
  extraTag?: string; // For things like "+ 360" or other special tags
  orientation?: 'vertical' | 'horizontal'; // Video orientation
}

interface TestimonialVideoCardProps {
  testimonial: TestimonialVideo;
  index: number;
}

function TestimonialVideoCard({ testimonial, index }: TestimonialVideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine aspect ratio based on orientation
  const isVertical = testimonial.orientation !== 'horizontal';
  const cardWidth = isVertical ? 'w-[280px]' : 'w-[400px]';
  const videoAspectRatio = isVertical ? 'vertical' : 'video';

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / rect.width - 0.5) * 2);
    y.set((mouseY / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Only show video if videoUrl exists
  if (!testimonial.videoUrl) {
    return null;
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        zIndex: 10 - index as any, // Overlapping effect - later cards appear on top
        marginLeft: index > 0 ? '-60px' : '0', // Overlap cards
      } as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0"
    >
      <div className={`relative ${cardWidth} overflow-hidden rounded-2xl bg-charcoal shadow-2xl`}>
        {/* Embedded Video Player */}
        <div className="relative w-full h-full">
          <EmbeddedVideoPlayer
            videoSrc={testimonial.videoUrl}
            thumbnail={testimonial.thumbnail}
            title={testimonial.title}
            aspectRatio={videoAspectRatio as 'video' | 'vertical'}
            togglePlayOnClick={true}
            controls={true}
            muted={false}
            loop={false}
            className="rounded-2xl"
          />
        </div>

        {/* Top-right badge (like "360" or duration) */}
        {(testimonial.extraTag || testimonial.duration) && (
          <div className="absolute top-4 right-4 z-50 pointer-events-none">
            <div className="px-2 py-1 bg-gray-500/80 backdrop-blur-sm rounded text-white text-xs flex items-center gap-1">
              {testimonial.extraTag ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{testimonial.extraTag}</span>
                </>
              ) : (
                <span>{testimonial.duration}</span>
              )}
            </div>
          </div>
        )}

        {/* Bottom-left tag (client name or category) */}
        {testimonial.title && (
          <div className="absolute bottom-20 left-4 z-50 pointer-events-none">
            <div className="px-3 py-1.5 bg-orange-500/90 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white text-xs font-medium capitalize">
                {testimonial.title.split(' - ')[0] || testimonial.title}
              </span>
            </div>
          </div>
        )}

        {/* Bottom-center title */}
        <div className="absolute bottom-6 left-0 right-0 px-4 z-50 pointer-events-none">
          <h3 className="text-white font-bold text-base text-center line-clamp-2">
            {testimonial.title.includes(' - ') ? testimonial.title.split(' - ')[1] : testimonial.title}
          </h3>
        </div>
      </div>

      {/* Title and link below card */}
      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg text-paper mb-2 lowercase">
          {testimonial.title.includes(' - ') ? testimonial.title.split(' - ')[1] : testimonial.title}
        </h3>
        {testimonial.videoUrl && (
          <button
            onClick={() => {
              // Video plays inline, but we can add a click handler if needed
            }}
            className="text-paper/70 hover:text-paper underline text-sm transition-colors"
          >
            Watch video
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface TestimonialVideoShowcaseProps {
  testimonials: TestimonialVideo[];
  title?: string;
}

export default function TestimonialVideoShowcase({
  testimonials,
  title = 'Client Testimonials',
}: TestimonialVideoShowcaseProps) {
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
              Click any video to play inline and watch client success stories
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
            {testimonials.map((testimonial, index) => (
              <TestimonialVideoCard
                key={testimonial.id}
                testimonial={testimonial}
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

// Placeholder video URLs - Replace these with your actual videos
// Using sample videos from various sources for demonstration
export const PLACEHOLDER_VIDEOS = {
  // Vertical placeholder videos (9:16)
  vertical: [
    'https://res.cloudinary.com/demo/video/upload/v1685633753/samples/vertical-video-1.mp4',
    'https://res.cloudinary.com/demo/video/upload/v1685633753/samples/vertical-video-2.mp4',
  ],
  // Horizontal placeholder videos (16:9)
  horizontal: [
    'https://res.cloudinary.com/demo/video/upload/v1685633753/samples/elephants.mp4',
    'https://res.cloudinary.com/demo/video/upload/v1685633753/samples/sea-turtle.mp4',
    'https://res.cloudinary.com/demo/video/upload/v1685633753/samples/bike.mp4',
  ],
  // YouTube sample video IDs (you can use these as placeholders)
  youtube: [
    'jNQXAC9IVRw', // Sample YouTube video
    'dQw4w9WgXcQ', // Another sample
  ],
};

// Sample testimonial data with placeholders
export const SAMPLE_TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  {
    id: '1',
    title: 'Pat Riley - Bestselling Author',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    videoUrl: PLACEHOLDER_VIDEOS.vertical[0],
    videoType: 'cloudinary',
    duration: '45s',
    orientation: 'vertical',
  },
  {
    id: '2',
    title: 'Julian Bannon - Producer',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
    videoUrl: PLACEHOLDER_VIDEOS.horizontal[0],
    videoType: 'cloudinary',
    duration: '60s',
    extraTag: '+ 360',
    orientation: 'horizontal',
  },
  {
    id: '3',
    title: 'Mark Howie - Crude Series',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    videoUrl: PLACEHOLDER_VIDEOS.vertical[1],
    videoType: 'cloudinary',
    duration: '50s',
    orientation: 'vertical',
  },
];
