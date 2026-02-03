// Seed script to populate database with mock deck data
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { MOCK_DECKS } from '@/lib/mock-decks';

// Valid UUID v4s for mock decks
const DECK_UUIDS: Record<string, string> = {
  'tcg': '00000000-0000-4000-8000-000000000001',
  'navy-divers': '00000000-0000-4000-8000-000000000002',
  'crude': '00000000-0000-4000-8000-000000000003',
  'hear-transplant': '00000000-0000-4000-8000-000000000004',
  'the-counterfeit': '00000000-0000-4000-8000-000000000005',
  'saving-earth-twice': '00000000-0000-4000-8000-000000000006',
};

async function seedDecks() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql as any);

  console.log('Seeding decks...');

  for (const deck of MOCK_DECKS) {
    const uuid = DECK_UUIDS[deck.id];
    await db.insert(schema.decks).values({
      id: uuid,
      title: deck.title,
      slug: deck.slug,
      description: deck.description,
      logline: deck.logline,
      genre: deck.genre,
      targetAudience: deck.target_audience,
      productionStatus: deck.production_status,
      coverImageUrl: deck.cover_image_url,
      pdfUrl: deck.pdf_url,
      slideCount: deck.slide_count,
      viewCount: deck.view_count,
      comparableTitles: deck.comparable_titles,
      featured: deck.id === 'tcg' || deck.id === 'navy-divers',
      createdAt: new Date(deck.created_at),
      updatedAt: new Date(deck.updated_at),
    }).onConflictDoNothing();
    console.log(`  ✓ Seeded: ${deck.title}`);
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seedDecks().catch((err) => {
  console.error('Error seeding:', err);
  process.exit(1);
});
