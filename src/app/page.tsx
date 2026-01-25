import { getAllDecks } from '@/db';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const decks = await getAllDecks();
  return <HomeContent initialDecks={decks} />;
}

export const metadata = {
  title: 'Home',
  description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry's most trusted evaluation.',
  keywords: ['pitch deck', 'film pitch deck', 'TV pitch deck', 'screenplay packaging', 'film financing', 'story analysis', 'pitch packaging'],
  openGraph: {
    title: 'FilmDecks | Professional Pitch Packaging',
    description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry's most trusted evaluation.',
    url: 'https://filmdecks.biz',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'FilmDecks - Professional Pitch Packaging',
      },
    ],
  },
};
