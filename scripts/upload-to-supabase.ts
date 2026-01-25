#!/usr/bin/env tsx
// scripts/upload-to-supabase.ts
// Uploads deck images to Supabase Storage and creates database records

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { DECK_METADATA } from './deck-metadata';

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for uploads

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DECKS_DIR = join(process.cwd(), 'public', 'decks');

interface SlideFile {
  path: string;
  name: string;
  number: number;
  isCover: boolean;
  size: number;
}

function getDeckSlides(deckId: string): SlideFile[] {
  const deckPath = join(DECKS_DIR, deckId);

  try {
    const files = readdirSync(deckPath);
    const slides: SlideFile[] = [];

    for (const file of files) {
      const filePath = join(deckPath, file);
      const stats = statSync(filePath);

      // Check for cover
      if (file === 'cover.jpg' || file === 'cover.jpeg' || file === 'cover.png') {
        slides.push({
          path: filePath,
          name: file,
          number: 0,
          isCover: true,
          size: stats.size,
        });
        continue;
      }

      // Check for slides (slide-01.jpg, etc.)
      const match = file.match(/^slide-(\d+)\.(jpg|jpeg|png)$/i);
      if (match) {
        slides.push({
          path: filePath,
          name: file,
          number: parseInt(match[1], 10),
          isCover: false,
          size: stats.size,
        });
      }
    }

    return slides.sort((a, b) => a.number - b.number);
  } catch (error) {
    console.error(`Error reading deck folder: ${deckPath}`);
    return [];
  }
}

async function uploadFile(
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return urlData.publicUrl;
}

async function uploadDeck(deck: typeof DECK_METADATA[0]) {
  console.log(`\n📤 Uploading: ${deck.title}`);

  // Get slides from local folder
  const slides = getDeckSlides(deck.id);

  if (slides.length === 0) {
    console.log(`   ⚠️  No slides found for ${deck.id}`);
    return false;
  }

  console.log(`   Found ${slides.length} slides`);

  let coverUrl: string | null = null;
  const slideUrls: Array<{ number: number; url: string }> = [];
  let uploaded = 0;

  // Upload cover
  const cover = slides.find((s) => s.isCover);
  if (cover) {
    try {
      const file = readFileSync(cover.path);
      const ext = cover.name.split('.').pop();
      const contentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

      coverUrl = await uploadFile(
        'deck-covers',
        `${deck.id}/cover.${ext}`,
        file,
        contentType
      );

      console.log(`   ✅ Cover uploaded`);
      uploaded++;
    } catch (error) {
      console.error(`   ❌ Error uploading cover:`, error);
    }
  }

  // Upload slides
  for (const slide of slides) {
    if (slide.isCover) continue;

    try {
      const file = readFileSync(slide.path);
      const ext = slide.name.split('.').pop();
      const contentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

      const url = await uploadFile(
        'deck-slides',
        `${deck.id}/slide-${String(slide.number).padStart(2, '0')}.${ext}`,
        file,
        contentType
      );

      slideUrls.push({ number: slide.number, url });
      uploaded++;
    } catch (error) {
      console.error(`   ❌ Error uploading slide ${slide.number}:`, error);
    }
  }

  console.log(`   ✅ Uploaded ${uploaded} files`);

  // Create or update deck record
  try {
    const { error: dbError } = await supabase
      .from('decks')
      .upsert(
        {
          id: deck.id,
          title: deck.title,
          logline: deck.logline,
          description: deck.description,
          genre: deck.genre,
          target_audience: deck.target_audience,
          production_status: deck.production_status,
          cover_image_url: coverUrl,
          slide_count: slideUrls.length,
          comparable_titles: deck.comparable_titles,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (dbError) {
      throw dbError;
    }

    console.log(`   ✅ Database record created`);
  } catch (error) {
    console.error(`   ❌ Error creating deck record:`, error);
    return false;
  }

  // Create slide records
  for (const slide of slideUrls) {
    try {
      const { error: slideError } = await supabase.from('slides').insert({
        deck_id: deck.id,
        slide_number: slide.number,
        image_url: slide.url,
      });

      if (slideError) {
        console.error(`   ❌ Error creating slide record for ${slide.number}:`, slideError);
      }
    } catch (error) {
      console.error(`   ❌ Error creating slide record for ${slide.number}:`, error);
    }
  }

  console.log(`   ✅ ${slideUrls.length} slide records created`);
  return true;
}

async function main() {
  console.log('🚀 Pitch Deck Uploader to Supabase');
  console.log('=' .repeat(50));
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Decks directory: ${DECKS_DIR}`);

  // Check if decks directory exists
  try {
    readdirSync(DECKS_DIR);
  } catch {
    console.error(`\n❌ Decks directory not found: ${DECKS_DIR}`);
    console.log('Run npm run organize-decks first!');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const deck of DECK_METADATA) {
    const success = await uploadDeck(deck);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Upload complete!`);
  console.log(`✅ Success: ${successCount} decks`);
  console.log(`❌ Failed: ${failCount} decks`);
  console.log('\nNext steps:');
  console.log('1. Check your Supabase Storage dashboard');
  console.log('2. Verify deck records in Supabase Table Editor');
  console.log('3. Test your site locally: npm run dev');
  console.log('4. Deploy to Vercel when ready!');
}

main().catch(console.error);
