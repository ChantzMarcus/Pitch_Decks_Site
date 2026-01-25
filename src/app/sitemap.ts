import type { MetadataRoute } from 'next';
import { getAllDecks } from '@/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://filmdecks.biz';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/questionnaire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic deck pages
  let deckPages: MetadataRoute.Sitemap = [];

  try {
    const decks = await getAllDecks();

    deckPages = decks.map((deck) => ({
      url: `${baseUrl}/gallery/${deck.slug}`,
      lastModified: new Date(deck.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    // If database is unavailable, just return static pages
    console.warn('Could not fetch decks for sitemap:', error);
  }

  return [...staticPages, ...deckPages];
}
