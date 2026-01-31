'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { BookOpen, Lightbulb, Users, Video, Award, Building2, Play, CheckCircle2 } from 'lucide-react';
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
  // Professional information for industry experts
  professionalName?: string; // e.g., "Sarah Johnson"
  professionalTitle?: string; // e.g., "Former Studio Executive"
  company?: string; // e.g., "Warner Bros", "Netflix"
  stepNumber?: number; // For packaging steps series (e.g., Step 1, Step 2)
  index?: number;
  onClick?: () => void;
  // Completion state
  isCompleted?: boolean; // Whether user has watched this video
  onCardClick?: () => void; // Click handler for entire card
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
  professionalName,
  professionalTitle,
  company,
  stepNumber,
  index = 0,
  onClick,
  isCompleted = false,
  onCardClick,
}: EducationalVideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Determine aspect ratio - vertical for mobile-style cards
  // Improved mobile touch targets: min 44x44px (WCAG 2.5.5)
  const aspectRatio = 'aspect-[9/16]';
  const cardWidth = 'w-[280px] md:w-[280px] min-w-[280px]'; // Ensure minimum width for touch

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
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onCardClick}
      className="relative flex-shrink-0 cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`${title}${professionalName ? ` by ${professionalName}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick?.();
        }
      }}
    >
      <div 
        className={`relative ${cardWidth} ${aspectRatio} overflow-hidden rounded-2xl bg-charcoal shadow-2xl transition-all duration-300 ${
          isHovered 
            ? 'ring-2 ring-accent-indigo/60 ring-offset-2 ring-offset-charcoal shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
            : 'ring-0'
        }`}
      >
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
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="280px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Play Button Overlay - Enhanced for mobile touch targets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white/20 backdrop-blur-md rounded-full p-4 md:p-6 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 min-w-[64px] min-h-[64px] flex items-center justify-center">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 fill-white" />
              </div>
            </motion.div>
          </>
        )}

        {/* Completion Indicator - Top right */}
        {isCompleted && (
          <div className="absolute top-4 right-4 z-50 pointer-events-none">
            <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-white" aria-label="Video completed" />
            </div>
          </div>
        )}

        {/* Top-right badge (duration, step number, or extra tag) */}
        {(duration || extraTag || stepNumber) && (
          <div className={`absolute top-4 z-50 pointer-events-none ${isCompleted ? 'right-12' : 'right-4'}`}>
            <div className={`px-2.5 py-1.5 ${
              stepNumber ? 'bg-accent-indigo/90' : 'bg-gray-500/80'
            } backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg`}>
              {stepNumber ? (
                <>
                  <span className="text-[10px] opacity-80">STEP</span>
                  <span className="text-sm font-bold">{stepNumber}</span>
                </>
              ) : extraTag ? (
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

        {/* Professional Information - Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
          {/* Enhanced gradient overlay for better text readability (WCAG AA contrast) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/85 to-black/40" />
          
          {/* Professional credentials - shown prominently */}
          {professionalName && (
            <div className="relative px-4 pt-6 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-3.5 h-3.5 text-accent-gold flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {professionalName}
                  </p>
                  {professionalTitle && (
                    <p className="text-white/90 text-xs leading-tight truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      {professionalTitle}
                    </p>
                  )}
                </div>
              </div>
              {company && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Building2 className="w-3 h-3 text-white/80 flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/90 text-xs font-medium truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{company}</span>
                </div>
              )}
            </div>
          )}

          {/* Bottom-left tag (company/studio name) - only if no professional info */}
          {tag && !professionalName && (
            <div className="absolute bottom-20 left-4 z-50 pointer-events-none">
              <div className="px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-xs font-medium lowercase">{tag}</span>
              </div>
            </div>
          )}

          {/* Video Title - bottom center - Enhanced contrast */}
          <div className={`relative px-4 ${professionalName ? 'pb-4' : 'pb-6'} z-50 pointer-events-none`}>
            <h3 className="text-white font-bold text-base text-center line-clamp-2 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
              {title}
            </h3>
            {description && !professionalName && (
              <p className="text-white/90 text-xs text-center mt-1 line-clamp-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Title and link below card */}
      <div className="mt-4 text-center">
        {stepNumber && (
          <div className="text-accent-indigo text-xs font-semibold mb-1 uppercase tracking-wide">
            Step {stepNumber}
          </div>
        )}
        <h3 className="font-bold text-lg text-charcoal mb-1 lowercase">
          {title.toLowerCase()}
        </h3>
        {professionalName && (
          <p className="text-charcoal/60 text-sm mb-2">
            {professionalName}{professionalTitle && ` • ${professionalTitle}`}
          </p>
        )}
        {description && (
          <p className="text-charcoal/50 text-xs mb-2 max-w-[280px] mx-auto line-clamp-2">
            {description}
          </p>
        )}
        {videoUrl && (
          <button
            onClick={onClick}
            className="text-charcoal/70 hover:text-charcoal underline text-sm transition-colors min-h-[44px] min-w-[120px] px-4 py-2 rounded-lg hover:bg-charcoal/5 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2"
            aria-label={`Watch ${title}`}
          >
            {isCompleted ? 'Watch again' : 'Watch video'}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Video data - use this to populate your video section
// Example for packaging steps with industry professionals
export const EDUCATIONAL_VIDEOS = [
  {
    id: 'packaging-step-1',
    title: 'The Foundation: Story Structure',
    description: 'Why 90% of pitch decks never get read. Here\'s how to structure yours for success.',
    duration: '3:45',
    category: 'Education' as const,
    thumbnail: '/images/packaging-step-1.jpg',
    videoUrl: '/videos/educational/packaging-step-1.mp4',
    professionalName: 'Sarah Johnson',
    professionalTitle: 'Former Studio Executive',
    company: 'Warner Bros',
    stepNumber: 1,
  },
  {
    id: 'packaging-step-2',
    title: 'Visual Storytelling That Sells',
    description: 'A former studio CFO reveals the visual elements that matter most.',
    duration: '4:20',
    category: 'Insight' as const,
    thumbnail: '/images/packaging-step-2.jpg',
    videoUrl: '/videos/educational/packaging-step-2.mp4',
    professionalName: 'Michael Chen',
    professionalTitle: 'Former Development Executive',
    company: 'Netflix',
    stepNumber: 2,
  },
  {
    id: 'packaging-step-3',
    title: 'The Pitch Deck Formula',
    description: 'How we adapt your story for maximum investor impact.',
    duration: '5:15',
    category: 'Education' as const,
    thumbnail: '/images/packaging-step-3.jpg',
    videoUrl: '/videos/educational/packaging-step-3.mp4',
    professionalName: 'Emma Rodriguez',
    professionalTitle: 'Former VP of Development',
    company: 'Paramount',
    stepNumber: 3,
  },
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
