// components/EnhancedDeckCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Eye, Clock, Star } from 'lucide-react';
import { Deck } from '@/db';

interface EnhancedDeckCardProps {
  deck: Deck;
  index: number;
  onQuickView?: (deck: Deck) => void;
}

export default function EnhancedDeckCard({ deck, index, onQuickView }: EnhancedDeckCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={() => onQuickView?.(deck)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-charcoal/10 shadow-lg">
        {/* Cover Image */}
        <Image
          src={deck.cover_image_url}
          alt={deck.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="text-white w-6 h-6 ml-1" />
          </div>
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display text-lg font-bold truncate">{deck.title}</h3>
          <p className="text-xs opacity-90 truncate">{deck.logline}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {deck.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-xs px-2 py-1 bg-accent-indigo/50 backdrop-blur-sm rounded-full"
              >
                {g}
              </span>
            ))}
            {deck.genre.length > 2 && (
              <span className="text-xs px-2 py-1 bg-accent-indigo/50 backdrop-blur-sm rounded-full">
                +{deck.genre.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Metadata Below Card */}
      <div className="mt-3">
        <h3 className="font-display text-base font-semibold text-charcoal truncate">
          {deck.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-charcoal/60 mt-1">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{deck.view_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{deck.slide_count} slides</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{deck.production_status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}