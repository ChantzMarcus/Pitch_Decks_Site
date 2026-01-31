#!/usr/bin/env tsx
// Generate poster images from videos using FFmpeg
// Run: tsx scripts/generate-video-posters.ts

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

interface VideoFile {
  path: string;
  name: string;
  size: number;
}

// Configuration
const CONFIG = {
  videosDir: join(process.cwd(), 'public', 'videos', 'testimonials'),
  postersDir: join(process.cwd(), 'public', 'videos', 'posters'),
  timestamp: '00:00:03', // Extract frame at 3 seconds (or use '50%' for middle)
  posterWidth: 1280,
  posterHeight: 720,
  posterQuality: 90,
};

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFFmpegInstalled(): boolean {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getVideoFiles(dir: string): VideoFile[] {
  if (!existsSync(dir)) {
    log(`⚠️  Videos directory not found: ${dir}`, 'yellow');
    log(`   Create it and add video files: ${dir}`, 'yellow');
    return [];
  }

  const files = readdirSync(dir);
  const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];

  return files
    .filter(file => videoExtensions.some(ext => file.toLowerCase().endsWith(ext)))
    .map(file => {
      const filePath = join(dir, file);
      const stats = statSync(filePath);
      return {
        path: filePath,
        name: file,
        size: stats.size,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function generatePoster(video: VideoFile): { success: boolean; posterPath?: string; error?: string } {
  try {
    const posterName = video.name.replace(/\.(mp4|mov|webm|avi|mkv)$/i, '.jpg');
    const posterPath = join(CONFIG.postersDir, posterName);

    // Ensure posters directory exists
    if (!existsSync(CONFIG.postersDir)) {
      execSync(`mkdir -p "${CONFIG.postersDir}"`, { stdio: 'ignore' });
    }

    // Skip if poster already exists
    if (existsSync(posterPath)) {
      return { success: true, posterPath };
    }

    // FFmpeg command to extract a single frame
    // -ss: timestamp to extract
    // -vframes 1: extract only one frame
    // -q:v 1: high quality (1-31 scale, lower is better)
    const ffmpegCmd = [
      'ffmpeg',
      `-i "${video.path}"`,
      `-ss ${CONFIG.timestamp}`,
      '-vframes 1',
      `-q:v ${Math.round((100 - CONFIG.posterQuality) / 3)}`, // Convert quality to FFmpeg scale
      `-vf "scale=${CONFIG.posterWidth}:${CONFIG.posterHeight}:force_original_aspect_ratio=decrease,pad=${CONFIG.posterWidth}:${CONFIG.posterHeight}:(ow-iw)/2:(oh-ih)/2"`,
      `"${posterPath}"`,
      '-y', // Overwrite if exists
    ].join(' ');

    execSync(ffmpegCmd, { stdio: 'ignore' });

    return { success: true, posterPath };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

function getVideoDuration(videoPath: string): number {
  try {
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
      { encoding: 'utf-8' }
    );
    return Math.round(parseFloat(output.trim()));
  } catch {
    return 0;
  }
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)}MB`;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function main() {
  log('\n🎬 Video Poster Generator', 'bright');
  log('=' .repeat(50), 'bright');

  // Check FFmpeg
  if (!checkFFmpegInstalled()) {
    log('\n❌ FFmpeg is not installed!', 'red');
    log('\nInstall it:', 'yellow');
    log('  macOS:   brew install ffmpeg', 'blue');
    log('  Ubuntu:  sudo apt install ffmpeg', 'blue');
    log('  Windows: https://ffmpeg.org/download.html', 'blue');
    process.exit(1);
  }

  log('✅ FFmpeg found\n', 'green');

  // Get video files
  log(`📁 Scanning: ${CONFIG.videosDir}`, 'blue');
  const videos = getVideoFiles(CONFIG.videosDir);

  if (videos.length === 0) {
    log('\n⚠️  No video files found!', 'yellow');
    log(`   Add .mp4, .mov, or .webm files to:`, 'yellow');
    log(`   ${CONFIG.videosDir}`, 'blue');
    process.exit(0);
  }

  log(`✅ Found ${videos.length} video file(s)\n`, 'green');

  // Process each video
  const results: Array<{
    videoName: string;
    videoSize: string;
    duration: string;
    posterName: string;
    success: boolean;
  }> = [];

  for (const video of videos) {
    log(`📹 Processing: ${video.name} (${formatFileSize(video.size)})`, 'blue');

    const duration = getVideoDuration(video.path);
    const result = generatePoster(video);

    if (result.success) {
      const posterName = video.name.replace(/\.(mp4|mov|webm|avi|mkv)$/i, '.jpg');
      log(`   ✅ Poster: ${posterName} (duration: ${formatDuration(duration)})\n`, 'green');
      results.push({
        videoName: video.name,
        videoSize: formatFileSize(video.size),
        duration: formatDuration(duration),
        posterName,
        success: true,
      });
    } else {
      log(`   ❌ Failed: ${result.error}\n`, 'red');
      results.push({
        videoName: video.name,
        videoSize: formatFileSize(video.size),
        duration: 'unknown',
        posterName: '',
        success: false,
      });
    }
  }

  // Summary
  log('=' .repeat(50), 'bright');
  const successCount = results.filter(r => r.success).length;
  log(`\n✨ Generated ${successCount}/${results.length} poster(s)`, 'bright');
  log(`📁 Posters saved to: ${CONFIG.postersDir}\n`, 'blue');

  // Generate metadata for frontend
  const metadata = results.filter(r => r.success).map(r => ({
    id: r.videoName.replace(/\.(mp4|mov|webm|avi|mkv)$/i, ''),
    videoUrl: `/videos/testimonials/${r.videoName}`,
    posterUrl: `/videos/posters/${r.posterName}`,
    duration: r.duration,
    size: r.videoSize,
  }));

  const metadataPath = join(process.cwd(), 'src', 'lib', 'mock-testimonials.ts');
  writeFileSync(
    metadataPath,
    `// Auto-generated testimonial video metadata
// Generated: ${new Date().toISOString()}

export const TESTIMONIAL_VIDEOS = ${JSON.stringify(metadata, null, 2)} as const;
`
  );

  log(`📝 Metadata saved to: ${metadataPath}\n`, 'green');
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
