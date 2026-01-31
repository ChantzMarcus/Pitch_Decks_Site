// src/hooks/useGSAP.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for GSAP animations with proper cleanup
 * Returns a cleanup function to kill animations when component unmounts
 */
export const useGSAP = (
  callback: () => gsap.core.Tween | gsap.core.Timeline | (() => void) | void,
  dependencies?: any[]
) => {
  const hasInitialized = useRef(false);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | (() => void) | null>(null);

  useEffect(() => {
    // Cleanup previous animation
    if (animationRef.current) {
      if (typeof animationRef.current === 'function') {
        animationRef.current();
      } else if (animationRef.current.kill) {
        animationRef.current.kill();
      }
      animationRef.current = null;
    }

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const result = callback();
      if (result) {
        animationRef.current = result as any;
      }
    }

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        if (typeof animationRef.current === 'function') {
          animationRef.current();
        } else if (animationRef.current.kill) {
          animationRef.current.kill();
        }
        animationRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Cleanup previous animation
    if (animationRef.current) {
      if (typeof animationRef.current === 'function') {
        animationRef.current();
      } else if (animationRef.current.kill) {
        animationRef.current.kill();
      }
      animationRef.current = null;
    }

    // This effect runs when dependencies change
    if (hasInitialized.current && dependencies) {
      const result = callback();
      if (result) {
        animationRef.current = result as any;
      }
    }

    // Cleanup on dependency change or unmount
    return () => {
      if (animationRef.current) {
        if (typeof animationRef.current === 'function') {
          animationRef.current();
        } else if (animationRef.current.kill) {
          animationRef.current.kill();
        }
        animationRef.current = null;
      }
    };
  }, dependencies || []);
};