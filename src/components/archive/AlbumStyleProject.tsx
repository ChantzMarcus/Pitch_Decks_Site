// src/components/AlbumStyleProject.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Heart, Share2, Volume2, Star } from 'lucide-react';

interface ProjectTrack {
  id: string;
  title: string;
  duration: string;
  preview_url?: string;
}

interface AlbumStyleProjectProps {
  project: {
    id: string;
    title: string;
    cover_image_url: string;
    genre: string[];
    duration: string;
    tracks: ProjectTrack[];
    description: string;
    release_date: string;
    rating?: number;
    producer?: string;
    cast?: string[];
  };
}

export default function AlbumStyleProject({ project }: AlbumStyleProjectProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-charcoal/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Album Art & Controls */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl mb-6">
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 256px"
            />
          </div>

          <div className="flex gap-4">
            <button className="p-3 bg-accent-indigo/10 text-accent-indigo rounded-full hover:bg-accent-indigo/20 transition-colors">
              <Heart size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-accent-indigo text-white rounded-full hover:bg-accent-indigo/90 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="p-3 bg-charcoal/10 text-charcoal rounded-full hover:bg-charcoal/20 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-charcoal mb-2">
                  {project.title}
                </h2>
                
                {project.producer && (
                  <p className="text-lg text-accent-indigo mb-2">
                    {project.producer}
                  </p>
                )}
              </div>

              {project.rating && (
                <div className="flex items-center gap-1 bg-accent-indigo/10 text-accent-indigo px-3 py-1 rounded-full">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium">{project.rating}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.genre.map((g, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-indigo/10 text-accent-indigo rounded-full text-sm font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-charcoal/80 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-charcoal/60">
              <div>
                <span className="font-medium text-charcoal">Release:</span> {project.release_date}
              </div>
              <div>
                <span className="font-medium text-charcoal">Duration:</span> {project.duration}
              </div>
              {project.cast && project.cast.length > 0 && (
                <div>
                  <span className="font-medium text-charcoal">Cast:</span> {project.cast.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Track List */}
          <div className="bg-charcoal/5 rounded-xl p-6">
            <h3 className="font-display text-xl font-semibold text-charcoal mb-4">Project Elements</h3>

            <div className="space-y-3">
              {project.tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                    currentTrack === index && isPlaying 
                      ? 'bg-accent-indigo/10 border-l-4 border-accent-indigo' 
                      : 'hover:bg-charcoal/10'
                  }`}
                  onClick={() => setCurrentTrack(index)}
                >
                  <div className="w-10 text-center text-charcoal/60">
                    {currentTrack === index && isPlaying ? (
                      <div className="flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-accent-indigo animate-pulse" style={{ animationDelay: '0ms' }} />
                          <div className="w-1 h-3 bg-accent-indigo animate-pulse" style={{ animationDelay: '100ms' }} />
                          <div className="w-1 h-3 bg-accent-indigo animate-pulse" style={{ animationDelay: '200ms' }} />
                        </div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-charcoal truncate">{track.title}</div>
                    <div className="text-sm text-charcoal/60">{track.duration}</div>
                  </div>

                  {track.preview_url && (
                    <button className="p-2 text-charcoal/60 hover:text-accent-indigo transition-colors">
                      <Volume2 size={16} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}