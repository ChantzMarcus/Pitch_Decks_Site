import QuestionnairePageContent from '@/components/QuestionnairePageContent';

export default function QuestionnairePage() {
  return <QuestionnairePageContent />;
}

export const metadata = {
  title: 'Story Questionnaire',
  description: 'Get a free professional analysis of your film or TV story. Our AI-powered questionnaire evaluates your script\'s commercial potential, marketability, and pitch readiness. Receive actionable feedback in minutes.',
  keywords: ['story analysis', 'film script analysis', 'TV show evaluation', 'screenplay feedback', 'story score', 'pitch readiness', 'free script analysis'],
  openGraph: {
    title: 'Free Story Analysis | FilmDecks',
    description: 'Get a free professional analysis of your film or TV story. AI-powered evaluation of commercial potential and pitch readiness.',
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
