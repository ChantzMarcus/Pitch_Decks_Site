import { motion } from 'framer-motion';

/**
 * Skeleton loader for DeckCard component
 * Shows a pulsing placeholder while deck data is loading
 */
export default function DeckCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      role="status"
      aria-label="Loading project card"
    >
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-charcoal/5 to-charcoal/10 overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gradient-to-r from-charcoal/10 to-charcoal/5 rounded-lg animate-pulse" />
        <div className="h-6 w-3/4 bg-gradient-to-r from-charcoal/10 to-charcoal/5 rounded-lg animate-pulse" style={{ animationDelay: '0.1s' }} />

        {/* Genre Tags Skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-accent-indigo/10 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Budget Badge Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
          <div className="h-5 w-24 bg-charcoal/5 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="h-8 w-8 bg-accent-indigo/10 rounded-lg animate-pulse" style={{ animationDelay: '0.35s' }} />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Grid of skeleton cards - use for loading states
 */
export function DeckCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {Array.from({ length: count }).map((_, i) => (
        <DeckCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
