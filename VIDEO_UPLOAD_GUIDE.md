# Video Upload Guide

This guide explains how to upload videos for the testimonial video showcase component.

## Current Setup

The testimonial video showcase supports:
- **Vertical videos** (9:16 aspect ratio) - Story/reel format
- **Horizontal videos** (16:9 aspect ratio) - Standard video format
- Videos from **Cloudinary**, **YouTube**, or **Vimeo**

## Using Placeholder Videos

Currently, the component uses placeholder videos from Cloudinary's demo account. These are temporary and should be replaced with your actual videos.

### Placeholder Video Sources

The component includes placeholder videos in `TestimonialVideoShowcase.tsx`:
- Vertical placeholders: Cloudinary demo videos
- Horizontal placeholders: Cloudinary demo videos
- YouTube placeholders: Sample YouTube video IDs

## How to Upload Videos

### Option 1: Upload to Cloudinary (Recommended)

Your application is already set up with Cloudinary. Here's how to upload videos:

#### Method A: Using the Upload API

1. **Via the FileUpload Component** (if you have an admin interface):
   ```typescript
   import { FileUpload } from '@/components/FileUpload';
   
   <FileUpload
     accept="video/*"
     folder="testimonial-videos"
     resourceType="video"
     onUploadComplete={(file) => {
       console.log('Video URL:', file.url);
       // Use file.url in your testimonial data
     }}
   />
   ```

2. **Via API Endpoint** (`/api/upload`):
   ```javascript
   const formData = new FormData();
   formData.append('file', videoFile);
   formData.append('folder', 'testimonial-videos');
   formData.append('resourceType', 'video');
   
   const response = await fetch('/api/upload', {
     method: 'POST',
     body: formData,
   });
   
   const result = await response.json();
   // result.data.url contains the Cloudinary video URL
   ```

#### Method B: Direct Cloudinary Upload

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to Media Library
3. Click "Upload" → Select your video file
4. Copy the **Secure URL** from the uploaded video
5. Use this URL in your testimonial data

### Option 2: Use YouTube Videos

1. Upload your video to YouTube
2. Get the video ID from the YouTube URL (e.g., `dQw4w9WgXcQ` from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. Set `videoType: 'youtube'` and use the video ID as `videoUrl`

### Option 3: Use Vimeo Videos

1. Upload your video to Vimeo
2. Get the video ID from the Vimeo URL
3. Set `videoType: 'vimeo'` and use the video ID as `videoUrl`

## Updating Testimonial Videos

### Step 1: Prepare Your Videos

- **Vertical videos**: 9:16 aspect ratio (e.g., 1080x1920px)
- **Horizontal videos**: 16:9 aspect ratio (e.g., 1920x1080px)
- **Format**: MP4 recommended
- **Thumbnail**: Create a thumbnail image (JPG/PNG) for each video

### Step 2: Upload Videos

Upload your videos using one of the methods above. Make sure to:
- Note the video URL
- Note the thumbnail URL (or create thumbnails separately)

### Step 3: Update the Data

Edit `src/components/HomeContent.tsx` and update the `testimonialVideos` array:

```typescript
const testimonialVideos: TestimonialVideo[] = [
  {
    id: '1',
    title: 'Pat Riley - Bestselling Author',
    thumbnail: 'https://your-cloudinary-url.com/image.jpg', // Thumbnail image
    videoUrl: 'https://your-cloudinary-url.com/video.mp4', // Video URL
    videoType: 'cloudinary', // or 'youtube' or 'vimeo'
    duration: '45s',
    orientation: 'vertical', // or 'horizontal'
  },
  {
    id: '2',
    title: 'Julian Bannon - Producer',
    thumbnail: 'https://your-cloudinary-url.com/image2.jpg',
    videoUrl: 'youtube-video-id', // Just the ID if using YouTube
    videoType: 'youtube',
    duration: '60s',
    orientation: 'horizontal',
  },
  // ... more videos
];
```

## Video Modal Integration

When a user clicks on a testimonial video card, the `VideoModal` component will open. Make sure your `videoUrl` and `videoType` are set correctly:

- **Cloudinary**: Use full URL, set `videoType: 'cloudinary'`
- **YouTube**: Use video ID only, set `videoType: 'youtube'`
- **Vimeo**: Use video ID only, set `videoType: 'vimeo'`

## Best Practices

1. **Optimize Videos**: Compress videos before uploading to reduce file size
2. **Thumbnails**: Use high-quality thumbnails (at least 400x600px for vertical, 800x450px for horizontal)
3. **Duration**: Keep testimonial videos concise (30-90 seconds recommended)
4. **Format**: MP4 with H.264 codec for best compatibility
5. **File Size**: Keep videos under 100MB for faster loading

## Example: Complete Upload Workflow

```typescript
// 1. Upload video to Cloudinary
const videoResponse = await fetch('/api/upload', {
  method: 'POST',
  body: formData, // Contains video file
});

const { data: videoData } = await videoResponse.json();
// videoData.url = "https://res.cloudinary.com/your-cloud/video/upload/v123/video.mp4"

// 2. Upload thumbnail to Cloudinary
const thumbnailResponse = await fetch('/api/upload', {
  method: 'POST',
  body: thumbnailFormData, // Contains thumbnail image
});

const { data: thumbnailData } = await thumbnailResponse.json();
// thumbnailData.url = "https://res.cloudinary.com/your-cloud/image/upload/v123/thumb.jpg"

// 3. Add to testimonial videos array
const newTestimonial: TestimonialVideo = {
  id: 'new-id',
  title: 'Client Name - Title',
  thumbnail: thumbnailData.url,
  videoUrl: videoData.url,
  videoType: 'cloudinary',
  duration: '45s',
  orientation: 'vertical',
};
```

## Troubleshooting

### Videos Not Playing
- Check that `videoUrl` is correct and accessible
- Verify `videoType` matches the video source
- Ensure CORS is enabled if hosting videos externally

### Thumbnails Not Showing
- Verify thumbnail URL is accessible
- Check image format (JPG/PNG recommended)
- Ensure image dimensions match video orientation

### Upload Errors
- Check file size limits (Cloudinary free tier: 10MB)
- Verify Cloudinary credentials in `.env`
- Ensure video format is supported (MP4, MOV, etc.)

## Need Help?

- Cloudinary Documentation: https://cloudinary.com/documentation
- Upload API: See `src/app/api/upload/route.ts`
- FileUpload Component: See `src/components/FileUpload.tsx`
