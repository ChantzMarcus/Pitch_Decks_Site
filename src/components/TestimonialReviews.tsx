'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { StarIcon, QuoteIcon } from '@/components/icons/FilmIcons';

export interface Review {
  id: string;
  author: string;
  role: string;
  project?: string;
  rating: number;
  content: string;
  avatar?: string;
  verified?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Pat Riley',
    role: 'Bestselling Author',
    project: 'Untitled Thriller',
    rating: 5,
    content: '848 Washington Media transformed my book concept into a compelling visual pitch deck. The industry feedback was incredible - they "got it" immediately. Worth every penny.',
    verified: true,
  },
  {
    id: '2',
    author: 'Julian Bannon',
    role: 'Producer',
    project: 'Indie Feature',
    rating: 5,
    content: 'As a producer, I see hundreds of pitch decks. 848 Washington Media created one that actually stood out and got our project funded. Their understanding of what investors need is unmatched.',
    verified: true,
  },
  {
    id: '3',
    author: 'Mark Howie',
    role: 'Creator',
    project: 'Crude Series',
    rating: 5,
    content: 'The AI story analysis alone was worth it - they identified weaknesses I never knew I had. The final pitch deck helped me secure meetings with major networks.',
    verified: true,
  },
  {
    id: '4',
    author: 'Sarah Chen',
    role: 'Screenwriter',
    project: 'Drama Series',
    rating: 5,
    content: 'Finally, a service that understands both creative AND business. My deck went from "nice try" to "let\'s talk". The visual storytelling made all the difference.',
    verified: true,
  },
  {
    id: '5',
    author: 'Michael Torres',
    role: 'Director',
    project: 'Documentary Feature',
    rating: 5,
    content: 'The attention to detail is remarkable. Every slide serves the story, every image earns its place. My investors commented on how professional the presentation was.',
    verified: true,
  },
  {
    id: '6',
    author: 'Emma Williams',
    role: 'First-Time Filmmaker',
    project: 'Short Film → Feature',
    rating: 5,
    content: 'I had no idea how to pitch my film. 848 Washington Media not only created the deck but taught me what to focus on. Now I\'m developing my short into a feature.',
    verified: true,
  },
];

interface TestimonialReviewsProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          size={16}
          className={i < rating ? 'fill-accent-gold text-accent-gold' : 'text-gray-600'}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="bg-charcoal-light rounded-2xl p-8 h-full border border-paper/10 hover:border-accent-indigo/30 transition-colors">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <QuoteIcon size={48} className="text-paper" />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={review.rating} />
        </div>

        {/* Content */}
        <p className="text-paper text-lg leading-relaxed mb-6">
          "{review.content}"
        </p>

        {/* Author */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-indigo/20 to-accent-gold/20 flex items-center justify-center">
              <span className="text-paper font-semibold text-lg">
                {review.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-paper font-semibold">{review.author}</h4>
                {review.verified && (
                  <span className="text-accent-gold text-xs">✓ Verified</span>
                )}
              </div>
              <p className="text-paper-muted text-sm">{review.role}</p>
              {review.project && (
                <p className="text-accent-indigo text-xs mt-0.5">{review.project}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialReviews({
  reviews = DEFAULT_REVIEWS,
  title = 'What Creators & Customers Say',
  subtitle = 'Real reviews from creators and customers who transformed their projects',
}: TestimonialReviewsProps) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
              {title}
            </h2>
            <p className="text-paper-muted text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={index}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent-gold mb-1">50+</div>
              <div className="text-paper-muted text-sm">5-Star Reviews</div>
            </div>
            <div className="w-px h-12 bg-paper/20 hidden md:block" />
            <div>
              <div className="text-3xl font-bold text-accent-indigo mb-1">100%</div>
              <div className="text-paper-muted text-sm">Would Recommend</div>
            </div>
            <div className="w-px h-12 bg-paper/20 hidden md:block" />
            <div>
              <div className="text-3xl font-bold text-accent-teal mb-1">$300K+</div>
              <div className="text-paper-muted text-sm">Client Funding</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { DEFAULT_REVIEWS };
