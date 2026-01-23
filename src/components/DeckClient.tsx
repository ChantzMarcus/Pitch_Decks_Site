'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Lightbox from '@/components/Lightbox';
import LeadForm from '@/components/LeadForm';
import Image from 'next/image';
import { Download, Eye } from 'lucide-react';

interface DeckClientProps {
  deck: any; // Using any for now since we'll pass the server-fetched data
}

export default function DeckClient({ deck }: DeckClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === deck.slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === 0 ? deck.slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Deck Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={deck.cover_image_url}
                alt={deck.title}
                width={400}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
              {deck.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {deck.genre.map((g: string) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-accent-indigo/10 text-accent-indigo rounded-full text-sm font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-lg text-charcoal/80 mb-6 italic">
              "{deck.logline}"
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-medium text-charcoal/60 mb-1">Status</h3>
                <p className="font-medium">{deck.production_status}</p>
              </div>

              <div>
                <h3 className="font-medium text-charcoal/60 mb-1">Target Audience</h3>
                <p className="font-medium">{deck.target_audience}</p>
              </div>

              <div>
                <h3 className="font-medium text-charcoal/60 mb-1">Slides</h3>
                <p className="font-medium">{deck.slide_count}</p>
              </div>

              <div>
                <h3 className="font-medium text-charcoal/60 mb-1">Comparable Titles</h3>
                <p className="font-medium">{deck.comparable_titles.join(', ')}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                className="flex items-center gap-2"
                onClick={() => openLightbox(0)}
              >
                <Eye className="w-4 h-4" />
                View Deck
              </Button>

              {deck.pdf_url && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Deck Description */}
      <section className="mb-16">
        <h2 className="font-display text-3xl font-bold text-charcoal mb-6">Synopsis</h2>
        <div className="prose prose-lg max-w-none text-charcoal/80">
          <p>{deck.description}</p>
        </div>
      </section>

      {/* Slide Gallery */}
      <section>
        <h2 className="font-display text-3xl font-bold text-charcoal mb-8">Pitch Deck</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {deck.slides.map((slide: any, index: number) => (
            <div
              key={slide.id}
              className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={slide.image_url}
                alt={`Slide ${index + 1}`}
                width={300}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section className="my-20">
        <LeadForm deckId={deck.id} />
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          slides={deck.slides}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </>
  );
}