// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ClerkProvider } from '@clerk/nextjs';

// Self-hosted fonts via Fontsource (no external network requests)
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import '@fontsource/jetbrains-mono';

export const metadata: Metadata = {
  title: {
    default: 'FilmDecks | Professional Pitch Packaging',
    template: '%s | FilmDecks'
  },
  description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
  keywords: ['pitch deck', 'film pitch deck', 'TV pitch deck', 'screenplay packaging', 'film financing', 'story analysis', 'pitch packaging'],
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
    url: 'https://filmdecks.biz',
    siteName: 'FilmDecks',
    title: 'FilmDecks | Professional Pitch Packaging',
    description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis—the industry\'s most trusted evaluation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FilmDecks - Professional Pitch Packaging',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FilmDecks | Professional Pitch Packaging',
    description: 'Transform your film concept into a compelling pitch deck. Get veteran industry feedback powered by proprietary data and ML analysis.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://filmdecks.biz'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StructuredData type="organization" />
          <StructuredData type="service" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}