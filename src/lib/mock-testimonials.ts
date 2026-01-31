// Mock testimonial video metadata
// Replace with real data or use the FFmpeg script to generate

import { TestimonialVideo } from '@/components/TestimonialVideoShowcase';

// Placeholder testimonial data - Replace these with your actual videos
export const MOCK_TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  {
    id: 'pat-riley',
    title: 'Pat Riley - Bestselling Author',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    videoUrl: '/videos/testimonials/pat-riley.mp4',
    videoType: 'cloudinary',
    duration: '0:45',
    orientation: 'vertical',
  },
  {
    id: 'julian-bannon',
    title: 'Julian Bannon - Producer',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
    videoUrl: '/videos/testimonials/julian-bannon.mp4',
    videoType: 'cloudinary',
    duration: '1:00',
    extraTag: '+ 360',
    orientation: 'horizontal',
  },
  {
    id: 'mark-howie',
    title: 'Mark Howie - Crude Series',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    videoUrl: '/videos/testimonials/mark-howie.mp4',
    videoType: 'cloudinary',
    duration: '0:50',
    orientation: 'vertical',
  },
];

// For Cloudinary-hosted videos, use this format:
export const CLOUDINARY_TESTIMONIALS: TestimonialVideo[] = [
  {
    id: 'testimonial-1',
    title: 'Client Testimonial #1',
    thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/snapshot.jpg', // Cloudinary poster
    videoUrl: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/video.mp4',
    videoType: 'cloudinary',
    duration: '1:30',
    orientation: 'horizontal',
  },
];

// For YouTube videos:
export const YOUTUBE_TESTIMONIALS: TestimonialVideo[] = [
  {
    id: 'youtube-1',
    title: 'Client Testimonial - YouTube',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg', // YouTube thumbnail
    videoUrl: 'VIDEO_ID', // Just the video ID
    videoType: 'youtube',
    duration: '2:15',
    orientation: 'horizontal',
  },
];
