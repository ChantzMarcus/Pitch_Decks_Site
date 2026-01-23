#!/usr/bin/env tsx
// scripts/organize-decks.ts
// Standardizes pitch deck folder structure and renames files consistently

import { readdirSync, renameSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { DECK_METADATA } from './deck-metadata';

const REPO_ROOT = process.cwd();
const DECKS_SOURCE_DIR = join(REPO_ROOT);
const DECKS_DEST_DIR = join(REPO_ROOT, 'public', 'decks');

// File pattern matching to identify slides
const SLIDE_PATTERNS = [
  /^\d+\.(jpg|jpeg|png)$/i,           // 1.jpg, 2.png, etc.
  /^page-\d+/i,                        // page-01, page-02, etc.
  /^Cover\.(png|jpg|jpeg)$/i,          // Cover.png
  /^cover\.(jpg|jpeg|png)$/i,          // cover.jpg
];

interface SlideFile {
  path: string;
  name: string;
  number: number;
  isCover: boolean;
  extension: string;
}

function parseSlideFile(fileName: string): SlideFile | null {
  const ext = fileName.match(/\.(jpg|jpeg|png)$/i)?.[1];
  if (!ext) return null;

  // Check for cover (multiple formats)
  if (/^cover\.?$/i.test(fileName) || /^Cover\.png$/i.test(fileName)) {
    return {
      path: fileName,
      name: fileName,
      number: 0,
      isCover: true,
      extension: ext,
    };
  }

  // Try to extract slide number from various formats:

  // 01_Title.jpg, 02_Introduction.jpg, etc. (numbered with underscore)
  const numUnderscoreMatch = fileName.match(/^(\d+)_/i);
  if (numUnderscoreMatch) {
    return {
      path: fileName,
      name: fileName,
      number: parseInt(numUnderscoreMatch[1], 10),
      isCover: false,
      extension: ext,
    };
  }

  // 1.jpg, 2.jpg, etc. (just numbers)
  const numMatch = fileName.match(/^(\d+)\.(jpg|jpeg|png)$/i);
  if (numMatch) {
    return {
      path: fileName,
      name: fileName,
      number: parseInt(numMatch[1], 10),
      isCover: false,
      extension: ext,
    };
  }

  // page-01-Upwork.jpg, etc.
  const pageMatch = fileName.match(/page-(\d+)/i);
  if (pageMatch) {
    return {
      path: fileName,
      name: fileName,
      number: parseInt(pageMatch[1], 10),
      isCover: false,
      extension: ext,
    };
  }

  return null;
}

function getSlidesFromFolder(folderPath: string): SlideFile[] {
  try {
    const files = readdirSync(folderPath);
    const slides: SlideFile[] = [];

    for (const file of files) {
      const parsed = parseSlideFile(file);
      if (parsed) {
        parsed.path = join(folderPath, file);
        slides.push(parsed);
      }
    }

    // Sort by slide number
    return slides.sort((a, b) => a.number - b.number);
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error);
    return [];
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function organizeDeck(deck: typeof DECK_METADATA[0]) {
  const sourcePath = join(DECKS_SOURCE_DIR, deck.source_folder);
  const destPath = join(DECKS_DEST_DIR, deck.id);

  console.log(`\n📁 Processing: ${deck.title} (${deck.id})`);
  console.log(`   Source: ${deck.source_folder}`);

  // Check if source exists
  if (!existsSync(sourcePath)) {
    console.log(`   ❌ Source folder not found: ${sourcePath}`);
    return false;
  }

  // Get all slides
  const slides = getSlidesFromFolder(sourcePath);
  console.log(`   Found ${slides.length} slides`);

  if (slides.length === 0) {
    console.log(`   ⚠️  No slides found in folder`);
    return false;
  }

  // Create destination folder
  if (!existsSync(destPath)) {
    mkdirSync(destPath, { recursive: true });
  }

  // Copy and rename slides
  let copied = 0;
  for (const slide of slides) {
    if (slide.isCover) {
      const destFile = join(destPath, `cover.${slide.extension}`);
      copyFileSync(slide.path, destFile);
      copied++;
    } else if (slide.number > 0) {
      const destFile = join(destPath, `slide-${String(slide.number).padStart(2, '0')}.${slide.extension}`);
      copyFileSync(slide.path, destFile);
      copied++;
    }
  }

  console.log(`   ✅ Copied ${copied} files to public/decks/${deck.id}/`);
  return true;
}

function main() {
  console.log('🎬 Pitch Deck Organizer');
  console.log('=' .repeat(50));

  // Create destination directory
  if (!existsSync(DECKS_DEST_DIR)) {
    mkdirSync(DECKS_DEST_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const deck of DECK_METADATA) {
    const success = organizeDeck(deck);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Complete! ${successCount} decks organized, ${failCount} failed`);
  console.log(`📂 Decks are now in: ${DECKS_DEST_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Review the organized files in public/decks/');
  console.log('2. Edit scripts/deck-metadata.ts with your real content');
  console.log('3. Run npm run upload-decks to upload to Supabase');
}

main();
