'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlassCard from './GlassCard';
import {
  FilmReelIcon,
  SpotlightIcon,
  ScriptIcon,
  DirectorsChairIcon,
  MovieStarIcon,
  CameraLensIcon,
  FilmSlateIcon,
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
    description: '500+ decks delivered. We create cinematic sales weapons that move investors emotionally and convince them logically. From visuals to financials, decks that get funded.',
    icon: <FilmReelIcon size={32} />,
    cta: 'View Examples',
    href: '/gallery',
    badge: 'Most Popular',
  },
  {
    title: 'Financial Analysis',
    description: 'Investor-grade models from a former studio CFO. We break down every revenue stream, maximize ROI, and give backers the confidence that your project has been vetted at the highest level.',
    icon: <BoxOfficeChartIcon size={32} />,
    cta: 'Learn More',
    href: '/questionnaire',
  },
  {
    title: 'Creative Development',
    description: 'Shape your story with executives who greenlit films at major studios. We analyze structure, character, and market positioning to make your project irresistible.',
    icon: <SpotlightIcon size={32} />,
    cta: 'Get Feedback',
    href: '/questionnaire',
  },
  {
    title: 'Screenwriting',
    description: 'Award-winning British and American writers with 70+ years combined experience. From drafts to polishes, we craft screenplays that bridge art and commerce.',
    icon: <ScriptIcon size={32} />,
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
    <section className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
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
                <GlassCard
                  index={index}
                >
                  {/* Content container to maintain proper spacing */}
                  <div className="relative">
                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute -top-3 right-0 px-4 py-1 bg-accent-indigo text-white text-xs font-medium rounded-full">
                        {service.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-16 h-16 bg-accent-indigo/10 rounded-2xl flex items-center justify-center text-accent-indigo mb-6 group-hover:bg-accent-indigo group-hover:text-white transition-colors">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-bold text-paper mb-3 group-hover:text-accent-indigo transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-paper/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-2 text-accent-indigo font-medium group-hover:gap-3 transition-all">
                      {service.cta}
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-charcoal rounded-2xl p-8 md:p-12 text-center"
        >
          <p className="text-accent-indigo font-medium mb-4">In Partnership With</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Tomayto Tomato
          </h3>
          <p className="text-paper/70 max-w-3xl mx-auto mb-6">
            The same people who greenlit films at Paramount, Sony, Fox, and Lionsgate
            — the team behind <em className="text-white">Arrival</em>,{' '}
            <em className="text-white">Transformers</em>, <em className="text-white">True Grit</em>,
            and <em className="text-white">The Curious Case of Benjamin Button</em> —
            now working on YOUR project.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-paper/50">
            <span>Production Package</span>
            <span>•</span>
            <span>Talent Attachment</span>
            <span>•</span>
            <span>Sales & Distribution</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
