// components/VideoModal.tsx - Full screen video modal like Sonar
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string; // Video URL or ID
  title?: string;
  type?: 'youtube' | 'vimeo' | 'cloudinary';
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
  title,
  type = 'cloudinary',
}: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-[9998] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-12 right-0 md:-top-16 md:right-0 w-12 h-12 flex items-center justify-center text-white hover:text-accent-indigo transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* Title */}
              {title && (
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-12 left-0 md:-top-16 text-white font-display text-xl md:text-2xl font-bold"
                >
                  {title}
                </motion.h3>
              )}

              {/* Video player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <VideoPlayer
                  src={
                    type === 'youtube'
                      ? `https://www.youtube.com/watch?v=${videoId}`
                      : type === 'vimeo'
                      ? `https://vimeo.com/${videoId}`
                      : videoId // Cloudinary or direct video URL
                  }
                  autoPlay
                  controls
                  className="w-full h-full"
                />
              </div>

              {/* Video info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center justify-between text-white/80"
              >
                <p className="text-sm">Press ESC or click outside to close</p>
                <div className="flex gap-4">
                  <button className="hover:text-accent-indigo transition-colors">
                    Share
                  </button>
                  <button className="hover:text-accent-indigo transition-colors">
                    Info
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for managing video modal state
export function useVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{
    id: string;
    title?: string;
    type?: 'youtube' | 'vimeo';
  } | null>(null);

  const openModal = (video: {
    id: string;
    title?: string;
    type?: 'youtube' | 'vimeo';
  }) => {
    setCurrentVideo(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentVideo(null);
  };

  return {
    isOpen,
    currentVideo,
    openModal,
    closeModal,
  };
}
