// components/Hero.tsx
'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mouse tracking for subtle parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX / innerWidth - 0.5) * 15,
        y: (e.clientY / innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split text for word-by-word animation
  const heading = "Pitch Decks That";
  const subHeading = "Get Noticed";
  const words1 = heading.split(' ');
  const words2 = subHeading.split(' ');

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper">
      {/* Animated gradient blobs */}
      <motion.div
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, 80]),
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
        }}
        className="absolute inset-0 opacity-30 pointer-events-none"
      >
        <motion.div
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-indigo/30 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-gold/30 rounded-full filter blur-3xl"
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-accent-indigo"
          />
          <span className="text-sm font-medium text-accent-indigo">
            AI-Powered Story Analysis
          </span>
        </motion.div>

        {/* Main heading with word-by-word reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-charcoal leading-tight mb-6"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-gold"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto mb-10"
        >
          Transform your film concept into a compelling visual story. Get instant AI
          feedback on your logline and connect with industry professionals.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/questionnaire"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white rounded-full overflow-hidden"
          >
            <span className="relative z-10 font-medium">Get Your Free Score</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-indigo to-accent-gold"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-charcoal/20 text-charcoal rounded-full hover:border-charcoal/40 hover:bg-charcoal/5 transition-all group"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>View Examples</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-16 border-t border-charcoal/10"
        >
          {[
            { value: '500+', label: 'Decks Created' },
            { value: '85%', label: 'Success Rate' },
            { value: '24h', label: 'Avg Turnaround' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
            >
              <div className="font-display text-3xl md:text-4xl font-semibold text-charcoal">
                {stat.value}
              </div>
              <div className="text-sm text-charcoal/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-charcoal/20 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-charcoal/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
