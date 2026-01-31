import EducationalVideoShowcase from '@/components/EducationalVideoShowcase';
import { EDUCATIONAL_VIDEOS } from '@/components/EducationalVideoCard';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/animations';

export const metadata = {
  title: 'Educational Resources | FilmDecks',
  description: 'Learn from industry experts about pitch packaging, storytelling, and what investors look for.',
};

export default function LearnPage() {
  return (
    <>
      <main className="min-h-screen bg-charcoal">
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal direction="fade" className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-paper mb-6">
                Why Packaging Matters
              </h1>
              <p className="text-xl text-paper-muted max-w-3xl mx-auto">
                Short videos from the team who greenlit films at major studios. Learn what makes a pitch deck successful.
              </p>
            </ScrollReveal>

            <EducationalVideoShowcase
              videos={EDUCATIONAL_VIDEOS}
              title=""
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
