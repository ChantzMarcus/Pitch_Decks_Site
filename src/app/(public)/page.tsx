import { getAllDecks } from '@/db';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const decks = await getAllDecks();
  return <HomeContent initialDecks={decks} />;
}

export const metadata = {
  title: 'Home',
  description: 'Professional pitch deck services for film and TV. Get your story funded with our expert packaging, financial analysis, and creative development. Browse our gallery of successful pitch decks and start your project today.',
  keywords: ['pitch deck services', 'film financing', 'TV pitch deck', 'screenplay packaging', 'entertainment pitch deck', 'film development'],
  openGraph: {
    title: 'FilmDecks | Film Pitch Decks & Creative Development',
    description: 'Professional pitch deck services for film and TV. Get your story funded with our expert packaging, financial analysis, and creative development.',
    url: 'https://filmdecks.biz',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'FilmDecks - Professional Pitch Deck Services',
      },
    ],
  },
};
