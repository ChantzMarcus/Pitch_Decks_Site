import FilmProjectorProcess from '@/components/FilmProjectorProcess';
import ServicesShowcase from '@/components/ServicesShowcase';

export default function SimplifiedCinematicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold">
      <FilmProjectorProcess />
      
      <div className="py-20">
        <ServicesShowcase 
          title="Our Streamlined Services" 
          subtitle="Simple, elegant solutions for your cinematic needs"
        />
      </div>
    </div>
  );
}