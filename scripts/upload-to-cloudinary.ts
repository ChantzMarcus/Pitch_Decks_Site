#!/usr/bin/env tsx
// Upload deck images to Cloudinary

import { v2 as cloudinary } from 'cloudinary';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { DECK_METADATA } from './deck-metadata';

// Load environment variables from .env.local
try {
  const envFile = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  console.warn('⚠️  Could not read .env.local, using system environment variables');
}

// Parse CLOUDINARY_URL
// Format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
const cloudinaryUrl = process.env.CLOUDINARY_URL || '';
if (!cloudinaryUrl) {
  console.error('❌ CLOUDINARY_URL not found in .env.local');
  process.exit(1);
}

const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
if (!match) {
  console.error('❌ Invalid CLOUDINARY_URL format');
  process.exit(1);
}

const [, apiKey, apiSecret, cloudName] = match;

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

console.log(`🔧 Using Cloudinary: ${cloudName}`);

interface UploadResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

async function uploadImage(
  filePath: string,
  publicId: string,
  folder: string
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: `${folder}/${publicId}`,
    folder: folder,
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good', fetch_format: 'auto' },
      { width: 1200, crop: 'limit' },
    ],
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
  };
}

async function uploadDeck(deck: typeof DECK_METADATA[0]) {
  console.log(`\n📤 Uploading: ${deck.title} (${deck.id})`);

  const sourcePath = join(process.cwd(), deck.source_folder);
  const files = readdirSync(sourcePath);

  // Filter for images
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`   Found ${imageFiles.length} images`);

  let coverUrl: string | null = null;
  let slideCount = 0;
  const uploads: Array<{ number: number; url: string }> = [];

  // Sort files to ensure correct order
  imageFiles.sort((a, b) => {
    // Extract numbers from filenames - try multiple patterns
    // Pattern 1: number at start (e.g., "01.jpg")
    // Pattern 2: number after "page-" (e.g., "page-01.jpg")
    // Pattern 3: any 2-digit number (e.g., "Copy of HT-page-01.jpg")
    const aMatch = a.match(/(?:^|page-|page_)(\d{1,2})/i) || a.match(/(\d{1,2})(?=\D*\.(jpg|jpeg|png)$)/i);
    const bMatch = b.match(/(?:^|page-|page_)(\d{1,2})/i) || b.match(/(\d{1,2})(?=\D*\.(jpg|jpeg|png)$)/i);
    const aNum = aMatch ? parseInt(aMatch[1], 10) : 999;
    const bNum = bMatch ? parseInt(bMatch[1], 10) : 999;
    return aNum - bNum;
  });

  for (const file of imageFiles) {
    try {
      const filePath = join(sourcePath, file);
      const stats = statSync(filePath);

      // Skip if file is too large (>10MB)
      if (stats.size > 10 * 1024 * 1024) {
        console.log(`   ⚠️  Skipping ${file} (too large: ${Math.round(stats.size / 1024 / 1024)}MB)`);
        continue;
      }

      // Extract slide number from various filename patterns
      // Handles: "page-01", "page_01", "01.jpg", "Copy of HT-page-01.jpg"
      const slideMatch = file.match(/(?:page[-_]|^)(\d{1,2})/i) || file.match(/(\d{1,2})(?=\D*\.(jpg|jpeg|png)$)/i);
      const slideNum = slideMatch ? parseInt(slideMatch[1], 10) : 0;
      
      // Determine if this is a cover image
      const isCover = file.toLowerCase().includes('cover') || 
                      file.toLowerCase().includes('title') || 
                      (!coverUrl && slideNum === 1);
      
      const fileBase = file.replace(/\.(jpg|jpeg|png)$/i, '').replace(/[^a-zA-Z0-9]/g, '-');
      const publicId = isCover ? `${deck.id}/cover` : `${deck.id}/slide-${slideNum.toString().padStart(2, '0')}`;

      console.log(`   Uploading ${file}...`);

      const result = await uploadImage(filePath, publicId, 'pitch-decks');

      if (isCover) {
        coverUrl = result.url;
        console.log(`   ✅ Cover uploaded: ${result.url}`);
      } else if (slideNum > 0) {
        uploads.push({ number: slideNum, url: result.url });
        slideCount++;
        console.log(`   ✅ Slide ${slideNum} uploaded: ${result.url}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error);
      console.error(`   ❌ Error uploading ${file}:`, errorMessage);
      if (errorDetails && errorDetails !== errorMessage) {
        console.error(`   Details:`, errorDetails);
      }
    }
  }

  console.log(`   ✅ Total: ${slideCount} slides uploaded`);

  return {
    deckId: deck.id,
    coverUrl,
    slideCount,
    slides: uploads.sort((a, b) => a.number - b.number),
  };
}

async function main() {
  console.log('🚀 Uploading Deck Images to Cloudinary');
  console.log('=' .repeat(50));

  const results: Array<{
    deckId: string;
    coverUrl: string | null;
    slideCount: number;
    slides: Array<{ number: number; url: string }>;
  }> = [];

  for (const deck of DECK_METADATA) {
    const result = await uploadDeck(deck);
    results.push(result);
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Upload Complete!');
  console.log('\nGenerated Cloudinary URLs:');
  console.log('Copy this into mock-decks.ts:\n');

  for (const result of results) {
    const deck = DECK_METADATA.find(d => d.id === result.deckId);
    console.log(`// ${deck?.title || result.deckId}`);
    console.log(`{`);
    console.log(`  id: '${result.deckId}',`);
    console.log(`  title: '${deck?.title || ''}',`);
    console.log(`  cover_image_url: '${result.coverUrl}',`);
    console.log(`  slide_count: ${result.slideCount},`);
    console.log(`},`);
    console.log('');
  }

  // Save results to a file
  const { writeFileSync } = await import('fs');
  const outputPath = join(process.cwd(), 'cloudinary-urls.json');
  writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`📁 Full results saved to: ${outputPath}`);

  // Generate TypeScript code for mock-decks.ts
  console.log('\n' + '='.repeat(50));
  console.log('📝 Update mock-decks.ts with these cover_image_url values:\n');

  for (const result of results) {
    if (result.coverUrl) {
      console.log(`  ${result.deckId}: {`);
      console.log(`    cover_image_url: '${result.coverUrl}',`);
      console.log(`    slide_count: ${result.slideCount},`);
      console.log(`  },`);
    }
  }
}

main().catch(console.error);
