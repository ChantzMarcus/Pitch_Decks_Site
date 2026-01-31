# Apple-Style Video Implementation

This document describes the video components inspired by Apple's Newsroom video implementation.

## Features Implemented

### 1. Scroll-Triggered Autoplay
- Videos automatically play when scrolled into viewport
- Videos pause when scrolled out of viewport
- Uses Intersection Observer API for efficient viewport detection
- Respects user preferences (reduced motion)

### 2. Apple-Style Controls
- "Continue playback" button when video is paused but was playing
- Smooth fade-in/fade-out animations
- Clean, minimal design with backdrop blur
- Auto-hide controls after 3 seconds of inactivity

### 3. Performance Optimizations
- Uses `preload="metadata"` for faster initial load
- Intersection Observer with configurable thresholds
- Respects browser autoplay policies
- Tracks user interaction to prevent unwanted pauses

## Components

### ScrollTriggeredVideo

A dedicated component for scroll-triggered video playback.

```tsx
import ScrollTriggeredVideo from '@/components/ScrollTriggeredVideo';

<ScrollTriggeredVideo
  videoSrc="/path/to/video.mp4"
  thumbnail="/path/to/thumbnail.jpg"
  title="Video Title"
  loop={true}
  muted={true}
  aspectRatio="video"
  playThreshold={0.5}  // Play when 50% visible
  pauseThreshold={0.3}  // Pause when less than 30% visible
  showAutoplayControls={true}
/>
```

**Props:**
- `videoSrc` (string, required): Path to video file
- `thumbnail` (string, optional): Thumbnail image path
- `title` (string, optional): Video title for accessibility
- `loop` (boolean, default: true): Loop video playback
- `muted` (boolean, default: true): Mute video (required for autoplay)
- `aspectRatio` ('video' | 'square' | 'vertical', default: 'video'): Aspect ratio
- `playThreshold` (number, default: 0.5): Intersection ratio to start playback (0-1)
- `pauseThreshold` (number, default: 0.3): Intersection ratio to pause playback (0-1)
- `showAutoplayControls` (boolean, default: true): Show autoplay control overlay

### Enhanced EmbeddedVideoPlayer

The existing `EmbeddedVideoPlayer` component now supports scroll-triggered autoplay.

```tsx
import EmbeddedVideoPlayer from '@/components/EmbeddedVideoPlayer';

<EmbeddedVideoPlayer
  videoSrc="/path/to/video.mp4"
  thumbnail="/path/to/thumbnail.jpg"
  title="Video Title"
  scrollTriggered={true}  // Enable scroll-triggered autoplay
  playThreshold={0.5}
  pauseThreshold={0.3}
  controls={true}
  loop={true}
  muted={true}
/>
```

**New Props:**
- `scrollTriggered` (boolean, default: false): Enable scroll-triggered autoplay
- `playThreshold` (number, default: 0.5): Intersection ratio to start playback
- `pauseThreshold` (number, default: 0.3): Intersection ratio to pause playback

### AppleStyleVideoGallery

A gallery component for showcasing multiple videos in an Apple-style layout.

```tsx
import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';

const videos = [
  {
    videoSrc: '/videos/video1.mp4',
    thumbnail: '/thumbnails/thumb1.jpg',
    title: 'Video Title 1',
    description: 'Video description',
  },
  // ... more videos
];

<AppleStyleVideoGallery
  videos={videos}
  title="Featured Videos"
/>
```

## Usage Examples

### Basic Scroll-Triggered Video

```tsx
'use client';

import ScrollTriggeredVideo from '@/components/ScrollTriggeredVideo';

export default function VideoSection() {
  return (
    <section className="py-16">
      <ScrollTriggeredVideo
        videoSrc="/videos/demo.mp4"
        thumbnail="/thumbnails/demo.jpg"
        title="Demo Video"
      />
    </section>
  );
}
```

### Video Gallery

```tsx
'use client';

import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';

const featuredVideos = [
  {
    videoSrc: '/videos/feature-1.mp4',
    thumbnail: '/thumbnails/feature-1.jpg',
    title: 'Feature Video 1',
    description: 'Watch how we transform your story',
  },
  {
    videoSrc: '/videos/feature-2.mp4',
    thumbnail: '/thumbnails/feature-2.jpg',
    title: 'Feature Video 2',
    description: 'See our process in action',
  },
];

export default function VideosPage() {
  return (
    <div>
      <AppleStyleVideoGallery
        videos={featuredVideos}
        title="Featured Videos"
      />
    </div>
  );
}
```

### Enhanced Existing Player

```tsx
'use client';

import EmbeddedVideoPlayer from '@/components/EmbeddedVideoPlayer';

export default function EnhancedVideo() {
  return (
    <EmbeddedVideoPlayer
      videoSrc="/videos/enhanced.mp4"
      thumbnail="/thumbnails/enhanced.jpg"
      title="Enhanced Video"
      scrollTriggered={true}  // Enable Apple-style scroll triggering
      controls={true}
      loop={true}
      muted={true}
    />
  );
}
```

## Key Differences from Apple's Implementation

### What We Implemented
✅ Scroll-triggered autoplay with Intersection Observer
✅ "Continue playback" button overlay
✅ Smooth fade animations
✅ Respects reduced motion preferences
✅ Configurable thresholds

### What Apple Uses (Not Implemented)
- Custom video player with advanced controls
- Multiple video sources (responsive video)
- Video quality switching
- Advanced analytics tracking
- Custom scroll animations library (`nr-scroll-animation`)

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (may require user interaction for autoplay)
- **Mobile**: Full support (respects autoplay policies)

## Performance Considerations

1. **Intersection Observer**: Efficient viewport detection without scroll listeners
2. **Preload Strategy**: Uses `preload="metadata"` to balance load time and bandwidth
3. **Lazy Loading**: Videos only load when needed
4. **Reduced Motion**: Respects user preferences for accessibility

## Accessibility

- ✅ Respects `prefers-reduced-motion` media query
- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ Focus management
- ✅ Semantic HTML structure

## Best Practices

1. **Always provide thumbnails**: Improves perceived performance
2. **Use muted videos**: Required for autoplay in most browsers
3. **Keep videos short**: Better for autoplay experience
4. **Test on mobile**: Autoplay policies vary by device
5. **Provide controls**: Allow users to pause/play manually

## Troubleshooting

### Videos not autoplaying
- Ensure videos are muted (`muted={true}`)
- Check browser autoplay policies
- Verify Intersection Observer is supported
- Check console for errors

### Videos pausing unexpectedly
- Adjust `pauseThreshold` value
- Check if user has interacted (prevents auto-pause)
- Verify scroll position calculations

### Performance issues
- Reduce number of videos on page
- Use lower quality videos for autoplay
- Implement lazy loading for off-screen videos
- Consider using video placeholders

## Future Enhancements

- [ ] Picture-in-picture support
- [ ] Video quality switching
- [ ] Advanced analytics integration
- [ ] Custom scroll animations
- [ ] Video preloading strategies
- [ ] Support for multiple video sources (responsive)
