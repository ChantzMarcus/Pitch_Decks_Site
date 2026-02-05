import FilmProjectorProcess from '@/components/FilmProjectorProcess';
import ServicesShowcase from '@/components/ServicesShowcase';

export default function SimplifiedCinematicPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <FilmProjectorProcess />

        <div className="py-20">
          <ServicesShowcase
            title="Our Streamlined Services"
            subtitle="Simple, elegant solutions for your cinematic needs"
          />
        </div>
      </div>
    </div>
  );
}