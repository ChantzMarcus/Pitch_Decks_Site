'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { useState } from 'react';

export interface Brand {
  id: string;
  name: string;
  logo: string; // Can be text, emoji, or image URL (e.g., '/logos/netflix.svg')
  alt: string;
}

const DEFAULT_BRANDS: Brand[] = [
  { id: '1', name: 'Netflix', logo: '/logos/netflix.svg', alt: 'Netflix' },
  { id: '2', name: 'CAA', logo: '/logos/caa.svg', alt: 'Creative Artists Agency' },
  { id: '3', name: 'Paramount', logo: '/logos/paramount.svg', alt: 'Paramount Pictures' },
  { id: '4', name: 'BBC', logo: '/logos/bbc.svg', alt: 'BBC Studios' },
  { id: '5', name: 'Lionsgate', logo: '/logos/lionsgate.svg', alt: 'Lionsgate' },
  { id: '6', name: 'Vertical Entertainment', logo: '/logos/vertical.svg', alt: 'Vertical Entertainment' },
  { id: '7', name: 'HBO', logo: '/logos/hbo.svg', alt: 'HBO' },
  { id: '8', name: 'Apple', logo: '/logos/apple.svg', alt: 'Apple Studios' },
];

interface TrustedBrandsProps {
  brands?: Brand[];
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
}

function BrandLogo({ brand, index }: { brand: Brand; index: number }) {
  const [imageError, setImageError] = useState(false);

  // Check if logo is an image path (starts with /) or text/emoji
  const isImagePath = brand.logo.startsWith('/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex items-center justify-center p-6"
    >
      <div className="relative group cursor-pointer">
        {/* Logo container with hover effect */}
        <div className="flex items-center justify-center">
          {isImagePath && !imageError ? (
            // Image logo with Next.js Image optimization
            <div className="relative w-24 h-12 flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.alt}
                width={96}
                height={48}
                className="opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            // Text-based logo fallback
            <span className="font-display text-xl md:text-2xl font-bold tracking-wider text-paper/40 group-hover:text-paper/80 transition-all duration-300 group-hover:scale-110">
              {brand.name}
            </span>
          )}
        </div>

        {/* Optional: Tooltip on hover */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <span className="text-xs text-paper-muted bg-charcoal-medium px-2 py-1 rounded">
            {brand.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrustedBrands({
  brands = DEFAULT_BRANDS,
  title = 'Trusted by Industry Leaders',
  subtitle = 'Our work has been featured at major studios and streaming platforms',
  variant = 'dark',
}: TrustedBrandsProps) {
  const bgColor = variant === 'dark' ? 'bg-charcoal' : 'bg-charcoal-light';
  const textColor = variant === 'dark' ? 'text-paper-muted' : 'text-paper/60';

  return (
    <section className={`relative py-16 ${bgColor} overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Trusted By
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-paper mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className={textColor + ' text-sm max-w-2xl mx-auto mt-2'}>
                {subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {brands.map((brand, index) => (
            <BrandLogo
              key={brand.id}
              brand={brand}
              index={index}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-indigo" />
              <div className="w-2 h-2 rounded-full bg-accent-gold" />
              <div className="w-2 h-2 rounded-full bg-accent-teal" />
            </div>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Alternative: Marquee version for infinite scroll
export function TrustedBrandsMarquee({
  brands = DEFAULT_BRANDS,
  title = 'Trusted by Industry Leaders',
}: {
  brands?: Brand[];
  title?: string;
}) {
  return (
    <section className="relative py-16 bg-charcoal-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Trusted By
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-paper">
            {title}
          </h2>
        </div>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 items-center animate-marquee">
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <span className="font-display text-2xl font-bold tracking-wider text-paper/30 hover:text-paper/60 transition-colors">
                  {brand.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal-light to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal-light to-transparent pointer-events-none" />
    </section>
  );
}

export { DEFAULT_BRANDS };
