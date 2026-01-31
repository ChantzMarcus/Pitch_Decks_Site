'use client';

import { motion } from 'framer-motion';

interface DeckCardSkeletonProps {
  horizontalLayout?: boolean;
  index?: number;
}

/**
 * Skeleton loader for DeckCard component
 * Shows a pulsing placeholder while deck data is loading
 * Matches the dark charcoal theme of the site
 */
export default function DeckCardSkeleton({
  horizontalLayout = false,
  index = 0,
}: DeckCardSkeletonProps) {
  const cardStyle = horizontalLayout
    ? 'aspect-[9/16] w-[280px]'
    : 'aspect-video w-full';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`${horizontalLayout ? '' : 'w-full'}`}
    >
      <div className="group relative">
        {/* Card skeleton */}
        <div className={`relative ${cardStyle} rounded-2xl bg-charcoal overflow-hidden`}>
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top-right slide count indicator skeleton */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-16 h-6 bg-black/60 backdrop-blur-md rounded-full animate-pulse" />
          </div>

          {/* Genre tag skeleton */}
          <div className="absolute bottom-16 left-4 z-10">
            <div className="w-16 h-6 bg-orange-500/50 rounded-full animate-pulse" />
          </div>

          {/* Title skeleton at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="w-3/4 h-5 bg-white/10 rounded animate-pulse" />
            <div className="w-1/2 h-4 bg-white/10 rounded animate-pulse" style={{ animationDelay: '0.15s' }} />
          </div>
        </div>

        {/* Project title below card (horizontal layout only) */}
        {horizontalLayout && (
          <div className="mt-4 text-center space-y-2">
            <div className="w-24 h-5 bg-paper/10 rounded mx-auto animate-pulse" />
            <div className="w-16 h-3 bg-paper/10 rounded mx-auto animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Grid of skeleton cards - use for loading states
 */
export function DeckCardSkeletonGrid({
  count = 6,
  horizontalLayout = false,
}: {
  count?: number;
  horizontalLayout?: boolean;
}) {
  return (
    <div className={horizontalLayout ? 'flex gap-4 overflow-x-auto pb-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
      {Array.from({ length: count }).map((_, i) => (
        <DeckCardSkeleton key={i} index={i} horizontalLayout={horizontalLayout} />
      ))}
    </div>
  );
}
