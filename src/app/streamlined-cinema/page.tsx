import ServicesShowcase from '@/components/ServicesShowcase';
import FilmProjectorProcess from '@/components/FilmProjectorProcess';

export default function StreamlinedCinemaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold">
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