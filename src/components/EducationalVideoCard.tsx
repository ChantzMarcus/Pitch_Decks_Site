'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Lightbulb, Users, Video } from 'lucide-react';
import EmbeddedVideoPlayer from './EmbeddedVideoPlayer';

interface EducationalVideoCardProps {
  title: string;
  description?: string;
  duration?: string;
  category: 'Education' | 'Testimonial' | 'Insight' | string;
  thumbnail?: string;
  videoUrl?: string;
  tag?: string; // Bottom-left tag (like "netflix", "kfc", "smoothiebox")
  extraTag?: string; // Top-left tag with icon (like "+ 360")
  index?: number;
  onClick?: () => void;
}

const DEFAULT_THUMBNAIL = '/images/video-placeholder.jpg';

// Category icons mapping
const categoryIcons = {
  Education: BookOpen,
  Testimonial: Users,
  Insight: Lightbulb,
  Video: Video,
};

// Category colors for tags
const categoryTagColors = {
  Education: 'bg-gray-500/80',
  Testimonial: 'bg-green-500/80',
  Insight: 'bg-orange-500/80',
  Video: 'bg-blue-500/80',
};

export default function EducationalVideoCard({
  title,
  description,
  duration,
  category,
  thumbnail = DEFAULT_THUMBNAIL,
  videoUrl,
  tag,
  extraTag,
  index = 0,
  onClick,
}: EducationalVideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine aspect ratio - vertical for mobile-style cards
  const aspectRatio = 'aspect-[9/16]';
  const cardWidth = 'w-[280px]';

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / rect.width - 0.5) * 2);
    y.set((mouseY / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || Video;
  const tagColor = categoryTagColors[category as keyof typeof categoryTagColors] || 'bg-gray-500/80';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        zIndex: 10 - index as any,
        marginLeft: index > 0 ? '-60px' : '0',
      } as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0"
    >
      <div className={`relative ${cardWidth} ${aspectRatio} overflow-hidden rounded-2xl bg-charcoal shadow-2xl`}>
        {/* Video Player or Thumbnail */}
        {videoUrl ? (
          <EmbeddedVideoPlayer
            videoSrc={videoUrl}
            thumbnail={thumbnail}
            title={title}
            aspectRatio="vertical"
            togglePlayOnClick={true}
            controls={true}
            muted={false}
            loop={false}
            className="rounded-2xl"
          />
        ) : (
          <>
            <div className="absolute inset-0">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </>
        )}

        {/* Top-right badge (duration or extra tag) */}
        {(duration || extraTag) && (
          <div className="absolute top-4 right-4 z-50 pointer-events-none">
            <div className="px-2 py-1 bg-gray-500/80 backdrop-blur-sm rounded text-white text-xs flex items-center gap-1">
              {extraTag ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{extraTag}</span>
                </>
              ) : (
                <span>{duration}</span>
              )}
            </div>
          </div>
        )}

        {/* Top-left category tag with icon */}
        {category && (
          <div className="absolute top-4 left-4 z-50 pointer-events-none">
            <div className={`px-2.5 py-1 ${tagColor} backdrop-blur-sm rounded-full flex items-center gap-1.5`}>
              <CategoryIcon className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium lowercase">{category}</span>
            </div>
          </div>
        )}

        {/* Bottom-left tag (like "netflix", "kfc", "smoothiebox") */}
        {tag && (
          <div className="absolute bottom-20 left-4 z-50 pointer-events-none">
            <div className="px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white text-xs font-medium lowercase">{tag}</span>
            </div>
          </div>
        )}

        {/* Title - bottom center (bold white text) */}
        <div className="absolute bottom-6 left-0 right-0 px-4 z-50 pointer-events-none">
          <h3 className="text-white font-bold text-base text-center line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Title and link below card */}
      <div className="mt-4 text-center">
        <h3 className="font-bold text-lg text-charcoal mb-2 lowercase">
          {title.toLowerCase()}
        </h3>
        {videoUrl && (
          <button
            onClick={onClick}
            className="text-charcoal/70 hover:text-charcoal underline text-sm transition-colors"
          >
            Watch video
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Video data - use this to populate your video section
export const EDUCATIONAL_VIDEOS = [
  {
    id: 'why-pitch-fails',
    title: 'Why Your Pitch Fails',
    description: '90% of pitch decks never get read. Here\'s why yours will.',
    duration: '60s',
    category: 'Education' as const,
    thumbnail: '/images/why-pitch-fails.jpg',
    videoUrl: '/videos/educational/why-pitch-fails.mp4',
  },
  {
    id: 'investors-look-for',
    title: 'What Investors Actually Look For',
    description: 'A former studio CFO reveals the numbers that matter.',
    duration: '90s',
    category: 'Insight' as const,
    thumbnail: '/images/investors-look-for.jpg',
    videoUrl: '/videos/educational/investors-look-for.mp4',
  },
  {
    id: 'book-to-script',
    title: 'From Book to Script',
    description: 'How we adapt your story for the screen.',
    duration: '75s',
    category: 'Education' as const,
    thumbnail: '/images/book-to-script.jpg',
    videoUrl: '/videos/educational/book-to-script.mp4',
  },
  {
    id: '5-elements',
    title: 'The 5 Elements Every Story Needs',
    description: 'Does your project have what it takes?',
    duration: '90s',
    category: 'Education' as const,
    thumbnail: '/images/5-elements.jpg',
    videoUrl: '/videos/educational/5-elements.mp4',
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
