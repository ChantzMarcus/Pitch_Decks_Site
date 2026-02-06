// Preview page for large flat grid deck showcase
import { getAllDecks } from '@/db';
import HomeContentLarge from '@/components/HomeContentLarge';

export default async function LargePreviewPage() {
  const decks = await getAllDecks();
  return <HomeContentLarge initialDecks={decks} />;
}

export const metadata = {
  title: 'Large Grid Preview | FilmDecks',
  description: 'Preview of the large flat grid deck showcase',
};
