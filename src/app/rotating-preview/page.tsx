// Preview page for the rotating carousel homepage
import { getAllDecks } from '@/db';
import HomeContentRotating from '@/components/HomeContentRotating';

export default async function RotatingPreviewPage() {
  const decks = await getAllDecks();
  return <HomeContentRotating initialDecks={decks} />;
}

export const metadata = {
  title: 'Rotating Carousel Preview | FilmDecks',
  description: 'Preview of the new rotating carousel deck showcase',
};
