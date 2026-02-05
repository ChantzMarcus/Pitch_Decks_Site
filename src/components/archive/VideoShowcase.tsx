// components/VideoShowcase.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoShowcaseProps {
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  thumbnail?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function VideoShowcase({
  title = 'Our Process',
  subtitle = 'See how we transform your story into a compelling pitch',
  videoSrc = '/VF-LOOP-OK-OK.mp4', // Default to one of your videos
  thumbnail,
  autoPlay = false,
  loop = true,
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
            {title}
          </h2>
          <p className="text-xl text-paper/80 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              src={videoSrc}
              autoPlay={autoPlay}
              muted={isMuted}
              loop={loop}
              playsInline
              className={`w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              onLoadedData={() => setHasLoaded(true)}
              onClick={togglePlay}
            />
            
            {!hasLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-indigo"></div>
              </div>
            )}

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-6">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </motion.button>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <button
                onClick={togglePlay}
                className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-paper/70 max-w-2xl mx-auto">
            Our video showcases the transformation process from concept to compelling pitch. 
            See how we bring your story to life with cinematic quality and strategic presentation.
          </p>
          
          <div className="mt-8">
            <a 
              href="/questionnaire" 
              className="inline-block px-8 py-4 bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Story Transformation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}