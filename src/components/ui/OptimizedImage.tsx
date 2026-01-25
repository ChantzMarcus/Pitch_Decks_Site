'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: string;
  shimmerColor?: string;
}

/**
 * Optimized Image Component
 * - Lazy loading with blur placeholder
 * - Progressive loading
 * - Error handling with fallback
 * - Accessibility with loading states
 */
export default function OptimizedImage({
  fallback = '/placeholder.jpg',
  shimmerColor = '#e5e7eb',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-charcoal/10 flex items-center justify-center ${className}`}
        style={{ backgroundColor: shimmerColor }}
        role="img"
        aria-label={props.alt as string}
      >
        <span className="text-charcoal/40 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer placeholder */}
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: shimmerColor }}
          aria-hidden="true"
        />
      )}

      <Image
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        loading="lazy"
      />
    </div>
  );
}
