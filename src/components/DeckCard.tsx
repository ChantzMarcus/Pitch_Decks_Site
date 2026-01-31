'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, TrendingUp, Clock, Play } from 'lucide-react';
import { Deck } from '@/db';
import { useState, useRef } from 'react';

interface DeckCardProps {
  deck: Deck;
  index: number;
  onQuickView?: (deck: Deck) => void;
  horizontalLayout?: boolean;
  videoPreviewUrl?: string; // Optional video preview URL
  successMetrics?: {
    funding?: string;
    timeline?: string;
    status?: string;
  };
}

export default function DeckCard({ 
  deck, 
  index, 
  onQuickView, 
  horizontalLayout = false,
  videoPreviewUrl,
  successMetrics,
}: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enhanced 3D tilt effect values with more sophisticated movements
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // Enhanced depth effect with more dramatic scale
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 25 });
  const z = useTransform(mouseYSpring, [-0.5, 0.5], [0, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / rect.width - 0.5) * 2);
    y.set((mouseY / rect.height - 0.5) * 2);
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);

    // Lazy load video preview on first hover
    if (videoPreviewUrl && !videoLoaded) {
      // Prefetch and load the video
      const video = document.createElement('video');
      video.src = videoPreviewUrl;
      video.preload = 'metadata';
      video.load();

      video.onloadeddata = () => {
        setVideoLoaded(true);
        setShowVideoPreview(true);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Autoplay blocked, ignore
          });
        }
      };

      video.onerror = () => {
        // Video failed to load, don't show preview
        console.warn(`Failed to load video preview: ${videoPreviewUrl}`);
      };
    } else if (videoPreviewUrl && videoLoaded && videoRef.current) {
      // Video already loaded, just play it
      setShowVideoPreview(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay blocked, ignore
      });
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    setIsHovered(false);
    setShowVideoPreview(false);
    videoRef.current?.pause();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onQuickView?.(deck);
    }
  };

  const genreTags = deck.genre.slice(0, 2).join(', ');
  const cardDescription = `${deck.title}. ${deck.slide_count} slides. ${deck.production_status}. Genres: ${genreTags}`;

  const primaryGenre = deck.genre[0] || 'project';
  const secondaryGenre = deck.genre[1];

  // Enhanced card styles
  const cardStyle = horizontalLayout
    ? 'aspect-[9/16] w-[280px]'
    : 'aspect-video w-full';

  const titleStyle = horizontalLayout ? 'text-lg' : 'text-xl md:text-2xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -10 }}
      style={{
        rotateX,
        rotateY,
        scale,
        z,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`${horizontalLayout ? '' : 'w-full'} [transform-style:preserve-3d]`}
    >
      <div
        className="group relative focus-within:ring-2 focus-within:ring-accent-indigo focus-within:ring-offset-2 rounded-2xl"
        role="article"
        aria-label={`Project: ${deck.title}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Card with enhanced 3D effect */}
        <motion.div
          className={`relative ${cardStyle} overflow-hidden rounded-2xl bg-charcoal`}
        >
          {/* Card image / Video preview */}
          <div className="relative w-full h-full">
            {/* Video Preview (plays on hover - lazy loaded) */}
            {videoPreviewUrl && (
              <AnimatePresence>
                {showVideoPreview && (
                  <motion.video
                    ref={videoRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    src={videoPreviewUrl}
                    aria-label={`Video preview for ${deck.title}`}
                  />
                )}
              </AnimatePresence>
            )}

            {/* Static Image */}
            <Image
              src={deck.cover_image_url}
              alt={`${deck.title} cover image`}
              fill
              className={`object-cover transition-all duration-700 ${
                showVideoPreview ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

            {/* Shine/gloss effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
              animate={
                isHovered
                  ? {
                      x: ['-100%', '100%'],
                      opacity: [0, 0.3, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.8,
                ease: 'linear',
              }}
            />

            {/* Top-right slide count indicator with glow */}
            <motion.div
              className="absolute top-4 right-4 z-10"
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-1.5 border border-white/10">
                <Eye className="w-3.5 h-3.5" />
                <span>{deck.slide_count} slides</span>
              </div>
            </motion.div>

            {/* Quick view button - appears on hover */}
            <motion.button
              onClick={() => onQuickView?.(deck)}
              onKeyDown={handleKeyDown}
              className="absolute top-4 left-4 z-10 px-4 py-2 bg-accent-indigo/90 backdrop-blur-md rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 flex items-center gap-2 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Quick view ${deck.title}`}
            >
              <Play className="w-3.5 h-3.5" />
              Quick View
            </motion.button>

            {/* Success Metrics Overlay - appears on hover */}
            {successMetrics && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-20 left-4 right-4 z-10 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {successMetrics.funding && (
                        <div className="text-center">
                          <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                          <div className="text-white font-bold text-sm">{successMetrics.funding}</div>
                          <div className="text-white/60 text-xs">Funding</div>
                        </div>
                      )}
                      {successMetrics.timeline && (
                        <div className="text-center">
                          <Clock className="w-5 h-5 text-accent-gold mx-auto mb-1" />
                          <div className="text-white font-bold text-sm">{successMetrics.timeline}</div>
                          <div className="text-white/60 text-xs">Timeline</div>
                        </div>
                      )}
                      {successMetrics.status && (
                        <div className="text-center">
                          <Eye className="w-5 h-5 text-accent-indigo mx-auto mb-1" />
                          <div className="text-white font-bold text-sm">{successMetrics.status}</div>
                          <div className="text-white/60 text-xs">Status</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Genre tags */}
            <div className="absolute bottom-16 left-4 z-10 flex flex-col gap-2">
              {primaryGenre && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="px-3 py-1.5 bg-orange-500/90 backdrop-blur-sm rounded-full border border-white/20"
                >
                  <span className="text-white text-xs font-medium capitalize">{primaryGenre}</span>
                </motion.div>
              )}
            </div>

            {secondaryGenre && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute bottom-16 right-4 z-10"
              >
                <div className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white text-xs font-medium lowercase">{secondaryGenre}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Card info overlay at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
          >
            <h3 className={`font-bold ${titleStyle} text-white mb-1 lowercase`}>
              {deck.title.toLowerCase()}
            </h3>
            <p className="text-white/70 text-sm line-clamp-2">{deck.logline}</p>
          </motion.div>
        </motion.div>

        {/* Project title and link below card (only for horizontal layout) */}
        {horizontalLayout && (
          <div className="mt-4 text-center">
            <h3 className="font-bold text-lg text-charcoal mb-2 lowercase" id={`deck-title-${deck.id}`}>
              {deck.title.toLowerCase()}
            </h3>
            <Link
              href={`/gallery/${deck.slug}`}
              className="text-charcoal/70 hover:text-charcoal underline text-sm transition-colors inline-block"
              aria-describedby={`deck-title-${deck.id}`}
            >
              View project
            </Link>
          </div>
        )}

        {/* Screen reader only description */}
        <span className="sr-only">{cardDescription}</span>
      </div>
    </motion.div>
  );
}
