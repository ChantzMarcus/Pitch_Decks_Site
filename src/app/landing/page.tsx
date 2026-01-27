import { Suspense } from 'react';
import LeadLanding from '@/components/LeadLanding';

interface SearchParams {
  source?: string;
  topic?: string;
  message?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

export default function LandingPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper flex items-center justify-center">Loading...</div>}>
      <LeadLanding
        source={searchParams.source}
        topic={searchParams.topic}
        customMessage={searchParams.message}
      />
    </Suspense>
  );
}

export const metadata = {
  title: 'Get Your Story Funded | FilmDecks',
  description: 'Free professional assessment of your film or TV project. Our expert team has helped 50+ creators get their stories funded.',
  robots: {
    index: true,
    follow: true,
  },
};
