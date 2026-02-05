// Preview page for the clean homepage with stacked cards
import { getAllDecks } from '@/db';
import HomeContentClean from '@/components/HomeContentClean';

export default async function CleanPreviewPage() {
  const decks = await getAllDecks();
  return <HomeContentClean initialDecks={decks} />;
}

export const metadata = {
  title: 'Clean Preview | FilmDecks',
  description: 'Preview of the simplified homepage with 3D stacked cards',
};
