// components/Hero.tsx
'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FilmReelIcon, PlayButtonIcon } from './icons/FilmIcons';
import HeroParticleBackground from '@/components/animations/HeroParticleBackground';
import FilmGrain from '@/components/animations/FilmGrain';
import DeckBrowserOverlay from './DeckBrowserOverlay';
import type { Deck } from '@/db';

interface HeroProps {
  decks?: Deck[];
  onViewExamples?: () => void;
}

export default function Hero({ decks = [], onViewExamples }: HeroProps) {
  const [isDeckBrowserOpen, setIsDeckBrowserOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only use scroll hooks on client side to avoid SSR issues
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Enhanced parallax effects with more sophisticated movements
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '2deg']);

  // Sticky/pinned effects for subtitle and buttons - move slower (follow scroll)
  // These elements will "stick" longer as you scroll, creating a pinned effect
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']); // Moves slower
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]); // Fades slower
  const buttonsY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']); // Moves even slower
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Stays visible longer
  
  // Scroll-driven gradient overlay opacity for button
  const buttonGradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.2, 0]);

  // Video scale effect - zooms in slightly on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const blobX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse tracking for sophisticated parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split text for enhanced word-by-word animation
  const heading = "Pitch Decks That";
  const subHeading = "Get Noticed";
  const words1 = heading.split(' ');
  const words2 = subHeading.split(' ');

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory to-old-gold">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/posters/hero-poster.jpg"
          style={{ scale: videoScale }}
        >
          <source
            src={process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || '/VF-LOOP-OK-OK.mp4'}
            type="video/mp4"
          />
          {/* Fallback to Cloudinary if local file fails */}
          <source
            src="https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4"
            type="video/mp4"
          />
        </motion.video>

        {/* Gradient Overlays for readability (glassmorphism-friendly) */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/70" />
      </div>

      {/* Animated particle system for cinematic texture - OPTIONAL */}
      {isMounted && (
        <HeroParticleBackground
          particleCount={300}
          colors={['#F59E0B', '#14B8A6', '#6366F1']}
          opacity={0.15}
          className="z-[1]"
        />
      )}

      {/* Film Grain Overlay - Authentic cinematic texture - OPTIONAL */}
      {isMounted && (
        <FilmGrain
          opacity={0.02}
          intensity="medium"
          className="z-[1]"
        />
      )}

      {/* Enhanced animated gradient blobs with more sophisticated movement */}
      {isMounted && (
        <motion.div
          style={{
            x: blobX,
            y: blobY,
          }}
          className="absolute inset-0 opacity-30 pointer-events-none z-[2]"
        >
          <motion.div
            animate={{
              x: mousePosition.x * 0.8,
              y: mousePosition.y * 0.8,
              scale: [1, 1.05, 1],
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              scale: { duration: 4, repeat: Infinity, repeatType: "reverse" }
            }}
            className="absolute top-1/4 -left-40 w-[32rem] h-[32rem] bg-accent-indigo/30 rounded-full filter blur-[100px]"
          />
          <motion.div
            animate={{
              x: mousePosition.x * -0.5,
              y: mousePosition.y * -0.5,
              scale: [1, 1.1, 1],
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 12,
              scale: { duration: 5, repeat: Infinity, repeatType: "reverse" }
            }}
            className="absolute bottom-1/4 -right-40 w-[32rem] h-[32rem] bg-accent-gold/30 rounded-full filter blur-[100px]"
          />
        </motion.div>
      )}

      {/* Enhanced main content with more sophisticated animations */}
      <motion.div
        style={{
          y,
          opacity,
          scale,
          rotate,
        } as any}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Enhanced badge with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-charcoal/20 shadow-lg mb-10"
          style={{ transform: 'translateZ(20px)' } as any}
        >
          <motion.span
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="w-3 h-3 rounded-full bg-accent-indigo shadow-lg"
          />
          <span className="text-sm font-medium text-paper">
            Industry's Most Trusted Analysis
          </span>
        </motion.div>

        {/* Enhanced main heading with sophisticated reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-paper leading-tight mb-6"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-gold origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Enhanced subheading with sticky/pinned scroll effect - follows you as you scroll */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            y: subtitleY,
            opacity: subtitleOpacity,
          } as any}
          className="text-lg md:text-xl text-paper/80 max-w-2xl mx-auto mb-12 relative z-20"
        >
          Transform your film concept into a compelling visual story. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.
        </motion.p>

        {/* Enhanced CTA Buttons with sticky/pinned scroll effect - follows you as you scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{
            y: buttonsY,
            opacity: buttonsOpacity,
          } as any}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 relative z-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              href="/questionnaire"
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl overflow-hidden shadow-2xl
                bg-gradient-to-br from-ivory/20 to-old-gold/10 backdrop-blur-xl border border-brass-dark/50
                hover:bg-gradient-to-br hover:from-ivory/30 hover:to-old-gold/20 hover:border-brass-dark/70
                transition-all duration-300"
            >
              {/* Vintage tech texture */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-carnival-gold/5 to-transparent pointer-events-none" />

              {/* Subtle gear pattern */}
              <div className="absolute inset-0 steampunk-gear-pattern opacity-5 pointer-events-none" />

              {/* Gradient overlay with scroll-driven animation - follows you as you scroll */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-vintage-velvet/30 to-carnival-gold/30 pointer-events-none group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  opacity: buttonGradientOpacity,
                } as any}
              />

              <span className="relative z-10 font-medium text-lg text-charcoal">Get Your Free Score</span>
              <ArrowRight className="relative z-10 w-6 h-6 text-charcoal group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <button
              onClick={() => {
                if (onViewExamples) {
                  onViewExamples();
                } else {
                  setIsDeckBrowserOpen(true);
                }
              }}
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl overflow-hidden
                bg-gradient-to-br from-ivory/20 to-old-gold/10 backdrop-blur-xl border-2 border-brass-dark/50
                hover:bg-gradient-to-br hover:from-ivory/30 hover:to-old-gold/20 hover:border-brass-dark/70
                transition-all duration-300 shadow-lg"
            >
              {/* Vintage tech texture */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-carnival-gold/5 to-transparent pointer-events-none" />

              {/* Subtle gear pattern */}
              <div className="absolute inset-0 steampunk-gear-pattern opacity-5 pointer-events-none" />

              <PlayButtonIcon className="relative z-10 w-6 h-6 text-charcoal group-hover:scale-125 transition-transform" />
              <span className="relative z-10 text-lg text-charcoal">View Examples</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Deck Browser Overlay - Browse decks without leaving hero */}
      {decks.length > 0 && (
        <DeckBrowserOverlay
          decks={decks}
          isOpen={isDeckBrowserOpen}
          onClose={() => setIsDeckBrowserOpen(false)}
        />
      )}
    </section>
  );
}
