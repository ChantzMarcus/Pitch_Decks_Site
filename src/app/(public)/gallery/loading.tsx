import { DeckCardSkeletonGrid } from '@/components/DeckCardSkeleton';

export default function GalleryLoading() {
  return (
    <main className="min-h-screen bg-paper py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-charcoal/10 rounded-2xl mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-charcoal/5 rounded-lg mx-auto animate-pulse" style={{ animationDelay: '0.1s' }} />
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-charcoal/5 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>

        {/* Results Count Skeleton */}
        <div className="text-center mb-8">
          <div className="h-5 w-32 bg-charcoal/5 rounded-full mx-auto animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <DeckCardSkeletonGrid count={6} />
      </div>
    </main>
  );
}
