import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({ 
  subsets: ['latin'], 
  variable: '--font-fraunces',
  display: 'swap'
});
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Film Pitch Deck Showcase',
  description: 'A collection of professionally crafted film and TV pitch decks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}