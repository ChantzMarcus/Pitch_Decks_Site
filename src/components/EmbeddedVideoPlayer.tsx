'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface EmbeddedVideoPlayerProps {
  videoSrc: string;
  thumbnail?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'vertical';
  togglePlayOnClick?: boolean; // Click anywhere on video to play/pause
  /**
   * Enable scroll-triggered autoplay (Apple-style)
   * Video plays when scrolled into viewport, pauses when scrolled out
   */
  scrollTriggered?: boolean;
  /**
   * Threshold for scroll-triggered playback (0-1)
   * 0.5 means video plays when 50% visible
   */
  playThreshold?: number;
  /**
   * Pause threshold - video pauses when less than this amount is visible
   */
  pauseThreshold?: number;
}

export default function EmbeddedVideoPlayer({
  videoSrc,
  thumbnail,
  title,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className = '',
  aspectRatio = 'video',
  togglePlayOnClick = true,
  scrollTriggered = false,
  playThreshold = 0.5,
  pauseThreshold = 0.3,
}: EmbeddedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay && !scrollTriggered);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    vertical: 'aspect-[9/16]',
  };

  // Update time and duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Scroll-triggered autoplay (Apple-style)
  useEffect(() => {
    if (!scrollTriggered) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          if (isIntersecting && intersectionRatio >= playThreshold && !hasUserInteracted) {
            // Video entered viewport - play it
            video
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                // Autoplay blocked - show controls
                setIsPlaying(false);
              });
          } else if (!isIntersecting || intersectionRatio < pauseThreshold) {
            // Video left viewport - pause it (unless user manually started it)
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
  }, [scrollTriggered, playThreshold, pauseThreshold, hasUserInteracted]);

  // Sync playing state with video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleMouseMove = () => {
    if (controls) {
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
    if (controls && isPlaying) {
      setShowControls(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onClick={togglePlayOnClick ? togglePlay : undefined}
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

      {/* Play/Pause Button Overlay */}
      {!isPlaying && !isLoading && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={togglePlay}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer"
          aria-label="Play video"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-6 md:p-8 group-hover:bg-white/30 transition-colors">
            <Play className="w-12 h-12 md:w-16 md:h-16 text-white ml-1" />
          </div>
        </motion.button>
      )}

      {/* Controls Overlay */}
      <AnimatePresence>
        {controls && (showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
          >
            {/* Progress Bar */}
            <div className="w-full px-4 pb-2 pointer-events-auto">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between px-4 pb-4 pointer-events-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-accent-indigo transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 text-white hover:text-accent-indigo transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {title && (
                  <span className="text-white text-sm font-medium truncate max-w-xs">
                    {title}
                  </span>
                )}
                <button
                  onClick={handleFullscreen}
                  className="p-2 text-white hover:text-accent-indigo transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
