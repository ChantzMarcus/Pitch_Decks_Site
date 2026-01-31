// Mock deck data - uses Cloudinary URLs
import type { Deck } from '@/db/schema';
import cloudinaryUrlsData from '../../cloudinary-urls.json';

// Cloudinary slide URLs type
interface CloudinarySlide {
  number: number;
  url: string;
}

interface CloudinaryDeck {
  deckId: string;
  coverUrl: string | null;
  slideCount: number;
  slides: CloudinarySlide[];
}

// Type assertion for imported JSON data
const cloudinaryData: CloudinaryDeck[] = cloudinaryUrlsData as CloudinaryDeck[];

// Cloudinary URLs from upload
const CLOUDINARY_URLS = {
  tcg: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821740/pitch-decks/pitch-decks/tcg/cover.png',
    slide_count: 18,
  },
  hear_transplant: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821095/pitch-decks/pitch-decks/hear-transplant/cover.jpg',
    slide_count: 23,
  },
  navy_divers: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821200/pitch-decks/pitch-decks/navy-divers/cover.jpg',
    slide_count: 17,
  },
  crude: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821241/pitch-decks/pitch-decks/crude/cover.jpg',
    slide_count: 12,
  },
  the_counterfeit: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821567/pitch-decks/pitch-decks/the-counterfeit/cover.jpg',
    slide_count: 22,
  },
  saving_earth_twice: {
    cover_image_url: 'https://res.cloudinary.com/dkhtswt1m/image/upload/v1769821668/pitch-decks/pitch-decks/saving-earth-twice/cover.jpg',
    slide_count: 20,
  },
};

export const MOCK_DECKS: Deck[] = [
  {
    id: 'tcg',
    title: 'TCG',
    slug: 'tcg',
    description: 'A gripping drama about the competitive world of trading card games, where one player\'s dream of becoming a world champion threatens to destroy everything he holds dear.',
    logline: 'When a prodigy player risks everything for glory, he must decide if winning is worth the cost.',
    genre: ['Drama', 'Thriller'],
    target_audience: 'Adults 25-54, fans of psychological dramas',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.tcg.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.tcg.slide_count,
    view_count: 142,
    comparable_titles: ['Queen\'s Gambit', 'Moneyball'],
    created_at: '2024-01-15T10:00:00.000Z',
    updated_at: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 'navy-divers',
    title: 'Navy Divers',
    slug: 'navy-divers',
    description: 'Based on true events, this action thriller follows an elite team of Navy divers who must undertake a perilous mission to defuse underwater mines during World War II.',
    logline: 'Under pressure. Under fire. Under water. The impossible mission that changed history.',
    genre: ['Action', 'Thriller'],
    target_audience: 'Adults 18-45',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.navy_divers.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.navy_divers.slide_count,
    view_count: 215,
    comparable_titles: ['The Hunter Killer', 'Greyhound'],
    created_at: '2024-01-08T10:00:00.000Z',
    updated_at: '2024-01-08T10:00:00.000Z',
  },
  {
    id: 'crude',
    title: 'CRUDE',
    slug: 'crude',
    description: 'An environmental thriller set against the backdrop of an oil spill, where a whistleblower uncovers a conspiracy that goes all the way to the top.',
    logline: 'One whistleblower. An environmental catastrophe. A conspiracy that reaches the highest levels of power.',
    genre: ['Drama', 'Thriller'],
    target_audience: 'Adults 25-54',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.crude.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.crude.slide_count,
    view_count: 98,
    comparable_titles: ['Deepwater Horizon', 'Erin Brockovich'],
    created_at: '2024-01-10T10:00:00.000Z',
    updated_at: '2024-01-10T10:00:00.000Z',
  },
  {
    id: 'the-counterfeit',
    title: 'The Counterfeit',
    slug: 'the-counterfeit',
    description: 'A tense crime thriller about a master forger who gets pulled into a world of international espionage and must use his skills to survive.',
    logline: 'He forged documents for a living. Until he had to forge his own survival.',
    genre: ['Thriller', 'Crime'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.the_counterfeit.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.the_counterfeit.slide_count,
    view_count: 156,
    comparable_titles: ['Catch Me If You Can', 'The Italian Job'],
    created_at: '2024-01-01T10:00:00.000Z',
    updated_at: '2024-01-01T10:00:00.000Z',
  },
  {
    id: 'hear-transplant',
    title: 'Hear Transplant',
    slug: 'hear-transplant',
    description: 'A powerful medical drama about a pioneering surgeon who performs the world\'s first successful heart transplant, battling institutional skepticism and his own demons.',
    logline: 'To save a life, he had to risk everything. The true story of medical\'s impossible breakthrough.',
    genre: ['Drama', 'Medical'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.hear_transplant.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.hear_transplant.slide_count,
    view_count: 187,
    comparable_titles: ['The Good Doctor', 'Something the Lord Made'],
    created_at: '2024-01-05T10:00:00.000Z',
    updated_at: '2024-01-05T10:00:00.000Z',
  },
  {
    id: 'saving-earth-twice',
    title: 'Saving Earth Twice',
    slug: 'saving-earth-twice',
    description: 'A thrilling sci-fi action story about humanity\'s desperate attempts to save Earth from destruction—twice. When the first solution fails, a new team must find an even more radical approach.',
    logline: 'They saved Earth once. Now they must do it again—or lose everything.',
    genre: ['Sci-Fi', 'Action'],
    target_audience: 'Adults 18-49',
    production_status: 'Development',
    cover_image_url: CLOUDINARY_URLS.saving_earth_twice.cover_image_url,
    pdf_url: '',
    slide_count: CLOUDINARY_URLS.saving_earth_twice.slide_count,
    view_count: 203,
    comparable_titles: ['Interstellar', 'The Day After Tomorrow'],
    created_at: '2024-01-10T10:00:00.000Z',
    updated_at: '2024-01-10T10:00:00.000Z',
  },
];

// Extend Deck type to include slides
export interface DeckWithSlides extends Deck {
  slides?: string[];
}

// Helper to get slide URLs for a deck
function getDeckSlides(deckId: string): string[] {
  const deckSlides = cloudinaryData.find((d: CloudinaryDeck) => d.deckId === deckId);
  if (!deckSlides) return [];
  return deckSlides.slides.map((s: CloudinarySlide) => s.url);
}

// Get decks with their slide URLs
export function getDecksWithSlides(): DeckWithSlides[] {
  return MOCK_DECKS.map(deck => ({
    ...deck,
    slides: getDeckSlides(deck.id),
  }));
}

export async function getMockDecks(): Promise<Deck[]> {
  return MOCK_DECKS;
}

export async function getMockDeckBySlug(slug: string): Promise<Deck | null> {
  return MOCK_DECKS.find((deck) => deck.slug === slug) || null;
}

// Get slide URLs for a specific deck (by id or slug)
export function getDeckSlideUrls(deckId: string): string[] {
  return getDeckSlides(deckId);
}
