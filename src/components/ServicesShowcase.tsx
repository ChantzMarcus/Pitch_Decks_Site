'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SimpleCard from '@/components/SimpleCard';
import {
  FilmReelIcon,
  SpotlightIcon,
  ScriptIcon,
  BoxOfficeChartIcon
} from '@/components/icons/FilmIcons';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  href: string;
  badge?: string;
}

const services: Service[] = [
  {
    title: 'Pitch Decks',
    description: 'Transform your concept into a compelling visual story that moves investors emotionally and convinces them logically.',
    icon: <FilmReelIcon size={32} className="text-charcoal" />,
    cta: 'View Examples',
    href: '/gallery',
    badge: 'Most Popular',
  },
  {
    title: 'Financial Analysis',
    description: 'Investor-grade models that break down every revenue stream and maximize ROI.',
    icon: <BoxOfficeChartIcon size={32} className="text-accent-gold" />,
    cta: 'Try Interactive Demo',
    href: '/financial-lab',
    badge: 'Interactive Demo',
  },
  {
    title: 'Creative Development',
    description: 'Shape your story with executives who greenlit films at major studios.',
    icon: <SpotlightIcon size={32} className="text-charcoal" />,
    cta: 'Get Feedback',
    href: '/questionnaire',
  },
  {
    title: 'Screenwriting',
    description: 'Award-winning writers craft screenplays that bridge art and commerce.',
    icon: <ScriptIcon size={32} className="text-accent-gold" />,
    cta: 'See Work',
    href: '/questionnaire',
  },
];

interface ServicesShowcaseProps {
  title?: string;
  subtitle?: string;
}

export default function ServicesShowcase({
  title = 'Our Services',
  subtitle = 'Studio-caliber packaging that turns pages into premieres',
}: ServicesShowcaseProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-old-gold">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold vintage-text-gold mb-4">
            {title}
          </h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={service.href as any}
                className="block group h-full"
              >
                <SimpleCard index={index}>
                  <div className="relative">
                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute -top-3 right-0 px-4 py-1 bg-vintage-gold text-charcoal text-xs font-medium rounded-full">
                        {service.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-vintage-gold/20 to-brass-dark/20 rounded-2xl flex items-center justify-center text-vintage-gold mb-6 group-hover:from-vintage-gold/30 group-hover:to-brass-dark/30 transition-colors">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-bold text-charcoal mb-3 group-hover:text-vintage-gold transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-charcoal/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-2 text-vintage-gold font-medium group-hover:gap-3 transition-all">
                      {service.cta}
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </SimpleCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}