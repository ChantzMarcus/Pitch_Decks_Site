'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface ScrollTriggeredVideoProps {
  videoSrc: string;
  thumbnail?: string;
  title?: string;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'vertical';
  /**
   * Threshold for when video should start playing (0-1)
   * 0.5 means video plays when 50% visible
   */
  playThreshold?: number;
  /**
   * Pause threshold - video pauses when less than this amount is visible
   */
  pauseThreshold?: number;
  /**
   * Show autoplay controls overlay
   */
  showAutoplayControls?: boolean;
}

/**
 * ScrollTriggeredVideo Component
 * 
 * Inspired by Apple's video implementation:
 * - Plays automatically when scrolled into viewport
 * - Pauses when scrolled out of viewport
 * - Smooth autoplay controls with "Continue playback" button
 * - Intersection Observer for efficient viewport detection
 * - Respects user preferences (reduced motion, etc.)
 */
export default function ScrollTriggeredVideo({
  videoSrc,
  thumbnail,
  title,
  loop = true,
  muted = true,
  className = '',
  aspectRatio = 'video',
  playThreshold = 0.5,
  pauseThreshold = 0.3,
  showAutoplayControls = true,
}: ScrollTriggeredVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    vertical: 'aspect-[9/16]',
  };

  // Intersection Observer for scroll-triggered playback
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Don't autoplay if user prefers reduced motion
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          setIsInView(isIntersecting);

          if (isIntersecting && intersectionRatio >= playThreshold && !hasUserInteracted) {
            // Video entered viewport - play it
            video
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                // Autoplay blocked or failed - show controls
                console.log('Autoplay prevented:', error);
                setIsPlaying(false);
              });
          } else if (!isIntersecting || intersectionRatio < pauseThreshold) {
            // Video left viewport or is mostly out of view - pause it
            if (!hasUserInteracted) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0, pauseThreshold, playThreshold, 1],
        rootMargin: '0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [playThreshold, pauseThreshold, hasUserInteracted]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);
    };
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasUserInteracted(true);

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  const handleMouseMove = () => {
    if (showAutoplayControls) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (showAutoplayControls && isPlaying) {
      setShowControls(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectClasses[aspectRatio]} bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Thumbnail/Poster Overlay */}
      {thumbnail && !isPlaying && (
        <div className="absolute inset-0 z-10">
          <Image
            src={thumbnail}
            alt={title || 'Video thumbnail'}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Autoplay Controls Overlay (Apple-style) */}
      <AnimatePresence>
        {showAutoplayControls && (showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            {/* Play/Pause Button */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={togglePlay}
                className="pointer-events-auto bg-white/20 backdrop-blur-md rounded-full p-6 md:p-8 group-hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <Play className="w-12 h-12 md:w-16 md:h-16 text-white ml-1" />
              </motion.button>
            )}

            {/* Continue Playback Button (shown when paused but was playing) */}
            {isInView && !isPlaying && hasUserInteracted && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={togglePlay}
                className="pointer-events-auto bg-white/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 group-hover:bg-white/30 transition-colors"
                aria-label="Continue playback"
              >
                <Play className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Continue playback</span>
              </motion.button>
            )}

            {/* Pause Button (shown when playing and controls are visible) */}
            {isPlaying && showControls && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={togglePlay}
                className="pointer-events-auto bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
                aria-label="Pause video"
              >
                <Pause className="w-6 h-6 text-white" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar (always visible when video is loaded) */}
      {!isLoading && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-40">
          <motion.div
            className="h-full bg-accent-indigo"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          {/* Progress indicator dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 -ml-1.5 bg-white rounded-full shadow-lg"
            style={{ left: `${progress}%` } as React.CSSProperties}
          >
            <motion.div
              animate={{ scale: isPlaying ? 1 : 0.8 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
