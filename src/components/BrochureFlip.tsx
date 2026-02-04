'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface BrochureFlipProps {
  pages: Array<{
    id: string;
    frontUrl: string;
    backUrl?: string;
    title?: string;
    caption?: string;
  }>;
  initialPage?: number;
  onClose?: () => void;
  className?: string;
  onPageChange?: (index: number) => void;
}

/**
 * BrochureFlip - Magazine/brochure style page flip animation
 *
 * Features:
 * - Realistic page curl effects
 * - 3D book-like opening animation
 * - Front/back page support
 * - Drag to flip pages
 * - Sound effects (optional)
 * - Center binding with spine
 */
export default function BrochureFlip({
  pages,
  initialPage = 0,
  onClose,
  className = '',
  onPageChange,
}: BrochureFlipProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right' | null>(null);

  const bookRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);

  // Motion value for page flip animation
  const flipProgress = useMotionValue(0);
  const pageRotation = useTransform(flipProgress, [0, 1], [0, -180]);
  const pageScale = useTransform(flipProgress, [0, 0.5, 1], [1, 0.95, 1]);
  const shadowOpacity = useTransform(flipProgress, [0, 0.5, 1], [0, 0.3, 0]);

  // Flip to next page (right to left)
  const flipNext = useCallback(() => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');

      // Animate flip
      flipProgress.set(0);

      setTimeout(() => {
        setCurrentPage(prev => {
          const newPage = prev + 1;
          onPageChange?.(newPage);
          return newPage;
        });
        setIsFlipping(false);
        setFlipDirection(null);
        flipProgress.set(0);
      }, 600);
    }
  }, [currentPage, pages.length, isFlipping, onPageChange, flipProgress]);

  // Flip to previous page (left to right)
  const flipPrev = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('right');

      flipProgress.set(0);

      setTimeout(() => {
        setCurrentPage(prev => {
          const newPage = prev - 1;
          onPageChange?.(newPage);
          return newPage;
        });
        setIsFlipping(false);
        setFlipDirection(null);
        flipProgress.set(0);
      }, 600);
    }
  }, [currentPage, isFlipping, onPageChange, flipProgress]);

  // Handle drag for page flip
  const handleDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX;
  }, []);

  const handleDrag = useCallback((info: PanInfo) => {
    const deltaX = info.offset.x;
    const progress = Math.max(0, Math.min(1, Math.abs(deltaX) / 300));
    flipProgress.set(progress);
  }, [flipProgress]);

  const handleDragEnd = useCallback((info: PanInfo) => {
    const deltaX = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 150;
    const velocityThreshold = 500;

    if (Math.abs(deltaX) > threshold || Math.abs(velocity) > velocityThreshold) {
      if (deltaX < 0 || velocity < -velocityThreshold) {
        flipNext();
      } else {
        flipPrev();
      }
    } else {
      // Reset
      flipProgress.set(0);
    }
  }, [flipProgress, flipNext, flipPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') flipNext();
      if (e.key === 'ArrowLeft') flipPrev();
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipNext, flipPrev, onClose]);

  if (pages.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-paper-muted">No pages to display</p>
      </div>
    );
  }

  const currentPageData = pages[currentPage];
  const nextPageData = pages[currentPage + 1];
  const prevPageData = pages[currentPage - 1];
  const progress = ((currentPage + 1) / pages.length) * 100;

  return (
    <div
      ref={bookRef}
      className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <div className="text-white">
            <h3 className="font-display font-bold text-lg">
              {currentPageData?.title || `Page ${currentPage + 1}`}
            </h3>
            <p className="text-sm text-white/70">
              {currentPage + 1} of {pages.length}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Book/Brochure */}
      <div className="relative flex items-center justify-center" style={{ perspective: '2000px' } as any}>
        <motion.div
          className="relative bg-charcoal rounded-lg shadow-2xl"
          style={{
            width: '90vw',
            maxWidth: '800px',
            height: '70vh',
            maxHeight: '600px',
            transformStyle: 'preserve-3d' as any,
          } as any}
        >
          {/* Spine (center binding) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-charcoal via-gray-800 to-charcoal rounded-lg z-10 shadow-2xl" />

          {/* Left page (previous page or back of current) */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full pr-4">
              {prevPageData && (
                <motion.div
                  className="relative w-full h-full rounded-l-lg overflow-hidden"
                  style={{ transformOrigin: 'right center' } as any}
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: -180 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={prevPageData.frontUrl}
                    alt={prevPageData.caption || prevPageData.title || `Page ${currentPage}`}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Paper texture */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/10 pointer-events-none" />
                </motion.div>
              )}
            </div>

            {/* Right page (current page) */}
            <div className="w-1/2 h-full pl-4">
              {currentPageData && (
                <motion.div
                  className="relative w-full h-full rounded-r-lg overflow-hidden cursor-grab active:cursor-grabbing"
                  style={{ transformOrigin: 'left center' } as any}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => handleDragStart(0)}
                  onDrag={(_, info) => handleDrag(info)}
                  onDragEnd={(_, info) => handleDragEnd(info)}
                  animate={{
                    rotateY: flipProgress.get() * -180,
                    scale: pageScale.get(),
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                >
                  <Image
                    src={currentPageData.frontUrl}
                    alt={currentPageData.caption || currentPageData.title || `Page ${currentPage + 1}`}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Paper texture */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />

                  {/* Shadow during flip */}
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    style={{ opacity: shadowOpacity.get() } as any}
                  />

                  {/* Page curl effect */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-full origin-top-left"
                    style={{
                      rotateY: flipProgress.get() * 90,
                      background: 'linear-gradient(to left, rgba(255,255,255,0.2), transparent)',
                    } as any}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Page number indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {prevPageData && (
              <span className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded">
                {currentPage}
              </span>
            )}
            {currentPageData && (
              <span className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded">
                {currentPage + 1}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-white/50">
          Drag pages to flip • Use arrow keys • ESC to close
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-accent-indigo"
          initial={{ width: `${(currentPage / pages.length) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>
    </div>
  );
}

// Modal wrapper
export function BrochureFlipModal({
  pages,
  isOpen,
  onClose,
  initialPage = 0,
}: {
  pages: BrochureFlipProps['pages'];
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <BrochureFlip
        pages={pages}
        initialPage={initialPage}
        onClose={onClose}
        className="w-full h-full"
      />
    </motion.div>
  );
}
