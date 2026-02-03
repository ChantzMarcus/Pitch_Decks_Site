'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';

interface DragNavigatorProps {
  children: ReactNode;
  /**
   * Callback when drag completes
   * Receives direction: 'left' | 'right' | 'up' | 'down'
   */
  onDragEnd?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  /**
   * Minimum drag distance to trigger navigation (in pixels)
   */
  threshold?: number;
  /**
   * Enable horizontal dragging
   */
  horizontal?: boolean;
  /**
   * Enable vertical dragging
   */
  vertical?: boolean;
  /**
   * Show visual feedback during drag
   */
  showFeedback?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * DragNavigator Component
 * 
 * Enables drag-to-navigate functionality inspired by siena.film
 * - Smooth drag interactions
 * - Visual feedback during drag
 * - Momentum scrolling
 * - Works on touch and mouse
 * 
 * Usage:
 * ```tsx
 * <DragNavigator 
 *   horizontal 
 *   onDragEnd={(direction) => navigate(direction)}
 * >
 *   <YourContent />
 * </DragNavigator>
 * ```
 */
export default function DragNavigator({
  children,
  onDragEnd,
  threshold = 50,
  horizontal = true,
  vertical = false,
  showFeedback = true,
  className = '',
}: DragNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Determine drag direction
    if (horizontal && Math.abs(offset.x) > Math.abs(offset.y)) {
      setDragDirection(offset.x > 0 ? 'right' : 'left');
    } else if (vertical && Math.abs(offset.y) > Math.abs(offset.x)) {
      setDragDirection(offset.y > 0 ? 'down' : 'up');
    }

    // Apply drag transform
    if (horizontal) {
      x.set(offset.x * 0.3); // Dampen the movement for visual feedback
    }
    if (vertical) {
      y.set(offset.y * 0.3);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);
    
    // Reset position with spring animation
    x.set(0);
    y.set(0);
    
    setIsDragging(false);
    setDragDirection(null);

    // Check if drag exceeds threshold
    if (horizontal && absX > threshold && absX > absY) {
      const direction = offset.x > 0 ? 'right' : 'left';
      onDragEnd?.(direction);
    } else if (vertical && absY > threshold && absY > absX) {
      const direction = offset.y > 0 ? 'down' : 'up';
      onDragEnd?.(direction);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      drag={horizontal || vertical ? (horizontal && vertical ? true : horizontal ? 'x' : 'y') : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x: horizontal ? xSpring : undefined,
        y: vertical ? ySpring : undefined,
        cursor: isDragging ? (horizontal ? 'grabbing' : 'ns-resize') : (horizontal ? 'grab' : 'ns-resize'),
      }}
      className={`drag-navigator ${className} ${isDragging ? 'dragging' : ''}`}
      whileDrag={{ scale: showFeedback ? 0.98 : 1 }}
    >
      {children}
      
      {/* Visual feedback indicator */}
      {showFeedback && isDragging && dragDirection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium text-sm flex items-center gap-2">
            {dragDirection === 'left' && (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </>
            )}
            {dragDirection === 'right' && (
              <>
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            {dragDirection === 'up' && (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>Scroll Up</span>
              </>
            )}
            {dragDirection === 'down' && (
              <>
                <span>Scroll Down</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
