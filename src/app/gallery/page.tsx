import { getAllDecks } from '@/db';
import GalleryContent from '@/components/GalleryContent';

// Server component wrapper
export default async function GalleryPage() {
  const decks = await getAllDecks();

  return <GalleryContent initialDecks={decks} />;
}

export const metadata = {
  title: 'Gallery | Film Pitch Decks',
  description: 'Browse our collection of award-winning film and TV pitch decks',
};
