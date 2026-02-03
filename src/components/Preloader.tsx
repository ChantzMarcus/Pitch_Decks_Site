'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

/**
 * N64 Mario Kart-style preloader
 * Dramatic spinning silver/gold oval logo that scales up from center
 * Like the Mario Kart 64 intro with the spinning logo
 */
export function Preloader({ onComplete, duration = 3500 }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    // Phase 1: Show spinning logo (starts at 300ms)
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Phase 2: Logo completes spinning and scales up (at 2.5s)
    const completeTimer = setTimeout(() => setShowComplete(true), 2500);

    // Phase 3: Entire preloader fades out (at 3.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative">
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ rotate: -180, scale: 0, opacity: 0 }}
                  animate={
                    showComplete
                      ? {
                          rotate: 720,
                          scale: [0, 0.5, 0.8, 1.5, 1],
                          opacity: [0, 1, 1, 1, 1],
                        }
                      : {
                          rotate: [0, 180, 360, 540],
                          scale: [0, 0.3, 0.6, 0.9],
                          opacity: [0, 1, 1, 1],
                        }
                  }
                  exit={{
                    scale: 5,
                    opacity: 0,
                    transition: { duration: 0.6 }
                  }}
                  transition={
                    showComplete
                      ? {
                          rotate: {
                            duration: 2.2,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          scale: {
                            duration: 2.2,
                            times: [0, 0.2, 0.4, 0.7, 1],
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          opacity: {
                            duration: 2.2,
                          }
                        }
                      : {
                          rotate: {
                            duration: 2.5,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          scale: {
                            duration: 2.5,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          opacity: {
                            duration: 0.8
                          }
                        }
                  }
                  className="relative"
                  style={{ perspective: '1000px' }}
                >
                  {/* Large Oval Logo Container - N64 Mario Kart style */}
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                    {/* Outer rotating ring */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        rotate: {
                          duration: 4,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                      }}
                      className="absolute inset-0"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full"
                        style={{ filter: 'drop-shadow(0 0 50px rgba(212, 175, 55, 0.8))' }}
                      >
                        <defs>
                          {/* Premium silver-gold metallic gradient */}
                          <linearGradient id="silverGoldPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E8E8E8">
                              <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="20%" stopColor="#C0C0C0" />
                            <stop offset="40%" stopColor="#FFD700" />
                            <stop offset="60%" stopColor="#D4AF37">
                              <animate attributeName="offset" values="0.6;0.4;0.6" dur="2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="80%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#E8E8E8" />
                          </linearGradient>

                          {/* Animated shimmer */}
                          <linearGradient id="shimmerAnim" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)">
                              <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                          </linearGradient>

                          {/* Inner shadow for depth */}
                          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                          </radialGradient>
                        </defs>

                        {/* Main oval ring - Mario Kart style */}
                        <ellipse
                          cx="100"
                          cy="100"
                          rx="90"
                          ry="90"
                          fill="none"
                          stroke="url(#silverGoldPremium)"
                          strokeWidth="16"
                        />

                        {/* Inner shimmer that animates */}
                        <ellipse
                          cx="100"
                          cy="100"
                          rx="82"
                          ry="82"
                          fill="none"
                          stroke="url(#shimmerAnim)"
                          strokeWidth="4"
                          opacity="0.8"
                        />

                        {/* Outer glow ring */}
                        <ellipse
                          cx="100"
                          cy="100"
                          rx="96"
                          ry="96"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="2"
                          opacity="0.6"
                        />

                        {/* Spinning decorative elements */}
                        <g opacity="0.5">
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                            <g key={i} transform={`rotate(${angle} 100 100)`}>
                              <rect
                                x="98"
                                y="5"
                                width="4"
                                height="15"
                                fill="#FFD700"
                                opacity="0.8"
                              >
                                <animate
                                  attributeName="opacity"
                                  values="0.8;0.3;0.8"
                                  dur="1s"
                                  begin={`${i * 0.1}s`}
                                  repeatCount="indefinite"
                                />
                              </rect>
                            </g>
                          ))}
                        </g>
                      </svg>
                    </motion.div>

                    {/* Center Logo - scales up dramatically */}
                    <motion.div
                      animate={
                        showComplete
                          ? {
                              scale: [0, 0.5, 1, 1.2, 1],
                              opacity: [0, 0, 1, 1, 1],
                            }
                          : {
                              scale: [0, 0.3, 0.5],
                              opacity: [0, 0.8, 1],
                            }
                      }
                      transition={
                        showComplete
                          ? {
                              scale: {
                                duration: 2.2,
                                times: [0, 0.2, 0.5, 0.8, 1],
                                ease: [0.25, 0.1, 0.34, 1.2]
                              },
                              opacity: {
                                duration: 2.2,
                                times: [0, 0.2, 0.5, 0.8, 1],
                              }
                            }
                          : {
                              scale: {
                                duration: 2.5,
                                times: [0, 0.3, 0.7, 1],
                                ease: [0.25, 0.1, 0.25, 0.1]
                              },
                              opacity: {
                                duration: 1,
                              }
                            }
                      }
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center">
                        {/* 848 - Large and bold */}
                        <motion.div
                          initial={{ letterSpacing: '0.5em' }}
                          animate={{ letterSpacing: '0em' }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                          className="font-display font-black text-white leading-none"
                        >
                          <span className="text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-2xl">
                            848
                          </span>
                        </motion.div>

                        {/* Washington Media - appears after */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: showComplete ? 1 : 0, y: 0 }}
                          transition={{
                            opacity: { delay: 1.8, duration: 0.4 },
                            y: { delay: 1.8, duration: 0.4 }
                          }}
                          className="mt-2"
                        >
                          <span className="text-xs md:text-sm tracking-[0.3em] text-gray-300 uppercase font-medium">
                            Washington Media
                          </span>
                        </motion.div>

                        {/* Tagline - appears last */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showComplete ? 1 : 0 }}
                          transition={{ delay: 2.2, duration: 0.5 }}
                          className="mt-4"
                        >
                          <span className="text-[10px] md:text-xs tracking-[0.2em] text-accent-gold uppercase">
                            Professional Pitch Packaging
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Particle effects radiating outward */}
                    {showComplete && [...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2 h-2"
                        style={{ transformOrigin: '0 0' }}
                        initial={{ rotate: i * 30, scale: 0 }}
                        animate={{
                          rotate: i * 30,
                          scale: [0, 1.5, 0],
                          x: [0, Math.cos((i * 30 * Math.PI) / 180) * 150],
                          y: [0, Math.sin((i * 30 * Math.PI) / 180) * 150],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 2.5 + (i * 0.02),
                          ease: 'easeOut'
                        }}
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Minimal preloader variant
interface MinimalPreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export function MinimalPreloader({ onComplete, duration = 1200 }: MinimalPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white origin-bottom"
          style={{ transformOrigin: 'bottom' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl md:text-3xl text-charcoal"
          >
            848 Washington Media
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
