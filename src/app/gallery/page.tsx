import { getAllDecks } from '@/db';
import GalleryContent from '@/components/GalleryContent';

// Server component wrapper
export default async function GalleryPage() {
  const decks = await getAllDecks();

  return <GalleryContent initialDecks={decks} />;
}

export const metadata = {
  title: 'Gallery',
  description: 'Browse our collection of award-winning film and TV pitch decks. See real examples of professional pitch decks that helped secure financing and distribution for independent films and television projects.',
  keywords: ['pitch deck gallery', 'film pitch deck examples', 'TV pitch deck samples', 'pitch deck inspiration', 'successful pitch decks', 'independent film pitch decks'],
  openGraph: {
    title: 'Pitch Deck Gallery | 848 Washington Media',
    description: 'Browse our collection of award-winning film and TV pitch decks. See real examples of professional pitch decks that helped secure financing.',
    url: 'https://848washington.com/gallery',
    images: [
      {
        url: '/og-gallery.png',
        width: 1200,
        height: 630,
        alt: 'Pitch Deck Gallery - 848 Washington Media',
      },
    ],
  },
};
