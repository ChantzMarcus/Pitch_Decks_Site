import QuestionnairePageContent from '@/components/QuestionnairePageContent';

export default function QuestionnairePage() {
  return <QuestionnairePageContent />;
}

export const metadata = {
  title: 'Story Questionnaire',
  description: 'Get a free professional analysis of your film or TV story. Our veteran industry feedback powered by proprietary data and ML analysis evaluates your script\'s commercial potential, marketability, and pitch readiness. Receive actionable feedback in minutes.',
  keywords: ['story analysis', 'film script analysis', 'TV show evaluation', 'screenplay feedback', 'story score', 'pitch readiness', 'free script analysis'],
  openGraph: {
    title: 'Free Story Analysis | FilmDecks',
    description: 'Get a free professional analysis of your film or TV story. Veteran industry feedback powered by proprietary data and ML analysis.',
    url: 'https://filmdecks.biz/questionnaire',
    images: [
      {
        url: '/og-questionnaire.png',
        width: 1200,
        height: 630,
        alt: 'Free Story Analysis - FilmDecks',
      },
    ],
  },
};
