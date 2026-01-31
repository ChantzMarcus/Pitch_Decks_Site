import TestimonialVideoShowcase from '@/components/TestimonialVideoShowcase';
import { MOCK_TESTIMONIAL_VIDEOS } from '@/lib/mock-testimonials';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/animations';

export const metadata = {
  title: 'Client Testimonials | FilmDecks',
  description: 'Watch real testimonials from creators who transformed their projects with FilmDecks.',
};

export default function TestimonialsPage() {
  return (
    <>
      <main className="min-h-screen bg-charcoal">
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal direction="fade" className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-paper mb-6">
                Client Success Stories
              </h1>
              <p className="text-xl text-paper-muted max-w-3xl mx-auto">
                Hear from creators who transformed their projects with our professional pitch packaging
              </p>
            </ScrollReveal>

            <TestimonialVideoShowcase
              testimonials={MOCK_TESTIMONIAL_VIDEOS}
              title=""
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
