import { getAllDecks } from '@/db';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const decks = await getAllDecks();
  return <HomeContent initialDecks={decks} />;
}

export const metadata = {
  title: 'Home',
  description: 'Transform your film concept into a compelling pitch deck. Get instant AI feedback on your logline and connect with industry professionals who can help bring your story to life.',
  keywords: ['pitch deck', 'film pitch deck', 'TV pitch deck', 'screenplay packaging', 'film financing', 'story analysis', 'AI story feedback'],
  openGraph: {
    title: 'FilmDecks | AI-Powered Pitch Deck Analysis',
    description: 'Transform your film concept into a compelling pitch deck. Get instant AI feedback on your logline and connect with industry professionals.',
    url: 'https://filmdecks.biz',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'FilmDecks - AI-Powered Pitch Deck Analysis',
      },
    ],
  },
};
