'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import HeroParticleBackground from '@/components/animations/HeroParticleBackground';
import FilmGrain from '@/components/animations/FilmGrain';
import { PlayButtonIcon, MovieStarIcon, FilmReelIcon } from './icons/FilmIcons';

interface CompanyLogo {
  name: string;
  logo: string;
  alt: string;
}

const DEFAULT_COMPANY_LOGOS: CompanyLogo[] = [
  { name: 'CAA', logo: '/logos/caa.svg', alt: 'Creative Artists Agency' },
  { name: 'Vertical Entertainment', logo: '/logos/vertical.svg', alt: 'Vertical Entertainment' },
  { name: 'Paramount', logo: '/logos/paramount.svg', alt: 'Paramount Pictures' },
  { name: 'BBC', logo: '/logos/bbc.svg', alt: 'BBC Studios' },
  { name: 'Lionsgate', logo: '/logos/lionsgate.svg', alt: 'Lionsgate' },
  { name: 'Netflix', logo: '/logos/netflix.svg', alt: 'Netflix' },
  { name: 'HBO', logo: '/logos/hbo.svg', alt: 'HBO' },
  { name: 'Apple', logo: '/logos/apple.svg', alt: 'Apple Studios' },
];

interface HeroVideoProps {
  videoSrc?: string;
  mobileVideoSrc?: string;
  posterSrc?: string;
  mobilePosterSrc?: string;
  companyLogos?: CompanyLogo[];
}

export default function HeroVideo({
  videoSrc = process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4', // Desktop video from Cloudinary
  mobileVideoSrc = process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_MOBILE || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/new-mobile-okok.mp4', // Mobile video from Cloudinary
  posterSrc = '/images/posters/hero-poster.jpg',
  mobilePosterSrc = '/images/posters/hero-poster-mobile.jpg',
  companyLogos = DEFAULT_COMPANY_LOGOS,
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll-linked parallax effects (modern 2025 trend)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // Video zooms in slightly on scroll

  // Mouse-tracking parallax (cinematic effect)
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

  // Staggered word animation (sophisticated reveal)
  const heading = "Transform Your Story";
  const subHeading = "Into Production";
  const words1 = heading.split(' ');
  const words2 = subHeading.split(' ');

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Video Element */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={posterSrc}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient Overlays for readability (glassmorphism-friendly) */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/70" />

        {/* Animated particle system for cinematic texture */}
        {isMounted && (
          <HeroParticleBackground
            particleCount={300}
            colors={['#F59E0B', '#14B8A6', '#6366F1']} // Wes Anderson/Willy Wonka: Gold, Teal, Indigo
            opacity={0.15}
            className="z-[1]"
          />
        )}
        
        {/* Film Grain Overlay - Authentic cinematic texture */}
        {isMounted && (
          <FilmGrain 
            opacity={0.02} 
            intensity="medium" 
            className="z-[1]" 
          />
        )}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ 
          y, 
          scale,
          // @ts-ignore - opacity is valid MotionValue from useTransform
          opacity 
        }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-10"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-accent-gold shadow-lg shadow-accent-gold/50"
          />
          <span className="text-sm font-medium text-paper/90">
            Veteran Industry Feedback
          </span>
        </motion.div>

        {/* Main Heading with sophisticated word-by-word reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-paper leading-tight mb-6"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.12,
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
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-indigo to-accent-teal origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subheading with depth effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg md:text-xl text-paper/80 max-w-2xl mx-auto mb-12"
        >
          The industry's most trusted pitch packaging and story evaluation platform.
          Powered by veteran industry insights and proprietary ML analysis.
        </motion.p>

        {/* CTA Buttons with modern hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/questionnaire"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent-indigo to-accent-gold text-white rounded-2xl overflow-hidden shadow-2xl shadow-accent-indigo/30"
            >
              <span className="relative z-10 font-medium text-lg">See If Your Story Is Approved</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all group backdrop-blur-sm"
            >
              <PlayButtonIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">View Projects</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats with glassmorphism cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: '500+', label: 'Pitch Decks' },
            { value: '$300M+', label: 'Funding Secured' },
            { value: '85%', label: 'Success Rate' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-paper mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-paper/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Company Logo Marquee (Animated Strip) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/95 to-transparent pb-8 pt-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Animated Logo Marquee */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 items-center"
            >
              {[...companyLogos, ...companyLogos].map((company, i) => (
                <motion.div
                  key={`${company.name}-${i}`}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                >
                  {/* Logo image or fallback text */}
                  {company.logo.startsWith('/') ? (
                    <Image
                      src={company.logo}
                      alt={company.alt}
                      width={100}
                      height={40}
                      className="opacity-60 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                        const textFallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (textFallback) textFallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="text-paper/60 group-hover:text-paper font-semibold text-sm hidden">
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Fade edges for seamless look */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center pt-3 bg-white/10 backdrop-blur-sm"
        >
          <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
