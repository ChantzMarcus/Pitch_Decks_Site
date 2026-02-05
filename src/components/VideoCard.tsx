// components/VideoCard.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface VideoCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoId?: string;
  duration?: string;
  onClick?: () => void;
  index?: number;
}

export default function VideoCard({
  title,
  category,
  thumbnail,
  videoId,
  duration,
  onClick,
  index = 0,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width - 0.5) * 2);
    y.set((mouseY / height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    videoRef.current?.pause();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Auto-play video preview on hover (muted)
    if (videoRef.current && videoId) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Auto-play blocked, ignore
      });
    }
  };

  // Calculate flying entrance from different directions based on index
  const getEntranceAnimation = (idx: number) => {
    const positions = [
      { x: -150, y: 100, z: -200, scale: 0.4, rotate: -15 },   // from left-bottom
      { x: 150, y: -80, z: -180, scale: 0.5, rotate: 15 },      // from right-top
      { x: -120, y: -90, z: -250, scale: 0.35, rotate: 10 },    // from left-top
      { x: 130, y: 110, z: -220, scale: 0.45, rotate: -10 },    // from right-bottom
    ];
    return positions[idx % positions.length];
  };

  const entranceStart = getEntranceAnimation(index);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: entranceStart.x,
        y: entranceStart.y,
        z: entranceStart.z,
        scale: entranceStart.scale,
        rotateY: entranceStart.rotate,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotateY: 0,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      // Continuous floating animation when not hovering
      animate={
        isHovered
          ? {}
          : {
              y: [0, -12, 0],
              transition: {
                duration: 4 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.15,
              }
            }
      }
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d' as any,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      <div className="relative aspect-[9/16] md:aspect-video overflow-hidden rounded-lg bg-charcoal">
        {/* Video preview (hidden by default, plays on hover) */}
        {videoId && (
          <video
            ref={videoRef}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            poster={thumbnail}
          >
            <source
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}
              type="video/mp4"
            />
          </video>
        )}

        {/* Thumbnail image */}
        <motion.div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded backdrop-blur-sm">
            {duration}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-accent-indigo text-white text-xs rounded font-medium">
          {category}
        </div>

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            animate={{
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-display font-bold text-lg line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
