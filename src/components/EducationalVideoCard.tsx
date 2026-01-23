'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface EducationalVideoCardProps {
  title: string;
  description: string;
  duration: string;
  category: 'Education' | 'Testimonial' | 'Insight';
  thumbnail?: string;
  videoUrl?: string;
  index?: number;
  onClick?: () => void;
}

const DEFAULT_THUMBNAIL = '/images/video-placeholder.jpg';

export default function EducationalVideoCard({
  title,
  description,
  duration,
  category,
  thumbnail = DEFAULT_THUMBNAIL,
  videoUrl,
  index = 0,
  onClick,
}: EducationalVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const categoryColors = {
    Education: 'bg-accent-indigo',
    Testimonial: 'bg-accent-gold',
    Insight: 'bg-accent-red',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-charcoal shadow-lg">
        {/* Thumbnail / Video preview */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          style={{ backgroundImage: `url(${thumbnail})` }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 ${categoryColors[category]} text-white text-xs font-medium rounded-full`}
          >
            {category}
          </span>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded">
          {duration}
        </div>

        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: isHovered ? 1 : 0.9 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            animate={{
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0.8,
            }}
          >
            <Play size={28} className="text-white fill-white ml-1" />
          </motion.div>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-display font-bold text-lg line-clamp-2 group-hover:text-accent-indigo transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Video data - use this to populate your video section
export const EDUCATIONAL_VIDEOS = [
  {
    title: 'Why Your Pitch Fails',
    description: '90% of pitch decks never get read. Here\'s why yours will.',
    duration: '60s',
    category: 'Education' as const,
    thumbnail: '/images/why-pitch-fails.jpg',
  },
  {
    title: 'What Investors Actually Look For',
    description: 'A former studio CFO reveals the numbers that matter.',
    duration: '90s',
    category: 'Insight' as const,
    thumbnail: '/images/investors-look-for.jpg',
  },
  {
    title: 'From Book to Script',
    description: 'How we adapt your story for the screen.',
    duration: '75s',
    category: 'Education' as const,
    thumbnail: '/images/book-to-script.jpg',
  },
  {
    title: 'The 5 Elements Every Story Needs',
    description: 'Does your project have what it takes?',
    duration: '90s',
    category: 'Education' as const,
    thumbnail: '/images/5-elements.jpg',
  },
];

export const TESTIMONIAL_VIDEOS = [
  {
    title: 'Pat Riley - Bestselling Author',
    description: '"Hannah-May is a true gem. Her services propelled my project to new heights."',
    duration: '45s',
    category: 'Testimonial' as const,
    thumbnail: '/images/testimonial-pat.jpg',
  },
  {
    title: 'Julian Bannon - Producer',
    description: '"Delivered beyond expectations. Highly recommend for any creative endeavor."',
    duration: '60s',
    category: 'Testimonial' as const,
    thumbnail: '/images/testimonial-julian.jpg',
  },
  {
    title: 'Mark Howie - Crude Series',
    description: '"A true 5 stars. Took our pilot and pitch deck to the next level."',
    duration: '50s',
    category: 'Testimonial' as const,
    thumbnail: '/images/testimonial-mark.jpg',
  },
];
