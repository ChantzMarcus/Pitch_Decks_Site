// Local deck data - serves from public/decks folder
// This matches the Deck type from db/schema.ts
import { DECK_METADATA } from '../../scripts/deck-metadata';
import type { Deck } from '@/db/schema';

export async function getAllLocalDecks(): Promise<Deck[]> {
  const { readdirSync } = await import('fs');
  const { join } = await import('path');

  return DECK_METADATA.map((deck) => {
    // Get slide count from file system
    let slideCount = 0;
    try {
      const deckPath = join(process.cwd(), 'public', 'decks', deck.id);
      const files = readdirSync(deckPath);
      slideCount = files.filter(f => f.startsWith('slide-')).length;
    } catch {
      slideCount = 0;
    }

    return {
      id: deck.id,
      title: deck.title,
      slug: deck.id, // Using id as slug
      description: deck.description,
      logline: deck.logline,
      genre: deck.genre,
      target_audience: deck.target_audience,
      production_status: deck.production_status,
      cover_image_url: `/decks/${deck.id}/cover.jpg`,
      pdf_url: '',
      slide_count: slideCount,
      view_count: 0,
      comparable_titles: deck.comparable_titles,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

export async function getLocalDeckBySlug(slug: string): Promise<Deck | null> {
  const decks = await getAllLocalDecks();
  return decks.find((deck) => deck.slug === slug) || null;
}

export function getLocalDeckSlides(deckId: string): Array<{
  slide_number: number;
  image_url: string;
  caption: string | null;
}> {
  const slides: Array<{ slide_number: number; image_url: string; caption: string | null }> = [];

  // Generate slide URLs up to 30 (max reasonable slides)
  for (let i = 1; i <= 30; i++) {
    const slideNum = String(i).padStart(2, '0');
    slides.push({
      slide_number: i,
      image_url: `/decks/${deckId}/slide-${slideNum}.jpg`,
      caption: null,
    });
  }

  return slides;
}
