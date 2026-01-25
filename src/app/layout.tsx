import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import StructuredData from '@/components/StructuredData';

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
  title: {
    default: '848 Washington Media | Professional Pitch Deck Services',
    template: '%s | 848 Washington Media'
  },
  description: 'Transform your film concept into a compelling pitch deck. Get instant AI feedback on your logline and connect with industry professionals who can help bring your story to life.',
  keywords: ['pitch deck', 'film pitch deck', 'TV pitch deck', 'screenplay packaging', 'film financing', 'story analysis', 'AI story feedback'],
  authors: [{ name: 'FilmDecks' }],
  creator: 'FilmDecks',
  publisher: 'FilmDecks',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://848washington.com',
    siteName: '848 Washington Media',
    title: '848 Washington Media | Professional Pitch Deck Services',
    description: 'Transform your film concept into a compelling pitch deck. Get instant AI feedback on your logline and connect with industry professionals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '848 Washington Media - Professional Pitch Deck Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '848 Washington Media | Professional Pitch Deck Services',
    description: 'Transform your film concept into a compelling pitch deck. Get instant AI feedback on your logline.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://848washington.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <StructuredData type="organization" />
        <StructuredData type="service" />
        {children}
      </body>
    </html>
  );
}