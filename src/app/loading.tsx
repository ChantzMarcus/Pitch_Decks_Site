import { DeckCardSkeletonGrid } from '@/components/DeckCardSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Skeleton */}
      <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-accent-indigo/5 via-transparent to-accent-gold/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="h-16 w-80 bg-charcoal/10 rounded-3xl mx-auto mb-6 animate-pulse" />
          <div className="space-y-3 mb-8">
            <div className="h-8 w-full max-w-2xl bg-charcoal/5 rounded-xl mx-auto animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="h-8 w-3/4 max-w-xl bg-charcoal/5 rounded-xl mx-auto animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
          <div className="h-12 w-48 bg-accent-indigo/20 rounded-xl mx-auto animate-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>

      {/* Trust Bar Skeleton */}
      <div className="py-8 border-y border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 h-6 w-48 bg-charcoal/5 rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-charcoal/10 rounded-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-charcoal/5 rounded-lg mx-auto animate-pulse" style={{ animationDelay: '0.1s' }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="h-12 w-12 bg-accent-indigo/10 rounded-xl mb-4 animate-pulse" />
                <div className="h-7 w-3/4 bg-charcoal/10 rounded-lg mb-3 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-charcoal/5 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-charcoal/5 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-charcoal/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Skeleton */}
      <section className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-charcoal/10 rounded-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-charcoal/5 rounded-lg mx-auto animate-pulse" />
          </div>

          <DeckCardSkeletonGrid count={3} />
        </div>
      </section>
    </main>
  );
}
