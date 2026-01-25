import { getAllDecks } from '@/db';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const decks = await getAllDecks();
  return <HomeContent initialDecks={decks} />;
}

export const metadata = {
  title: '848 Washington Media | Film Pitch Decks & Creative Development',
  description: 'Professional pitch deck services for film and TV. Get your story funded with our expert packaging, financial analysis, and creative development.',
};
