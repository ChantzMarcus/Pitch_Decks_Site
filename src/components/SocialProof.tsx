'use client';

import { motion } from 'framer-motion';
import { StarIcon, AwardIcon, CheckIcon, ExternalLinkIcon } from '@/components/icons/FilmIcons';

/**
 * Social Proof Component
 * Showcases Hannah's Upwork profile with 50+ 5-star reviews
 * Builds trust for cold leads from scraping/outbound
 */
export default function SocialProof() {
  const stats = [
    { value: '50+', label: '5-Star Reviews' },
    { value: '100%', label: 'Job Success' },
    { value: '$100K+', label: 'Earnings' },
    { value: '100%', label: 'On-Time Delivery' },
  ];

  const clientTypes = [
    'First-time authors',
    'Published writers',
    'Independent producers',
    'Production companies',
    'Streaming platforms',
  ];

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-indigo/20 rounded-full text-accent-indigo font-medium mb-6">
            <AwardIcon size={18} />
            <span>Top-Rated on Upwork</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-6">
            Trusted by 50+ Happy Clients
          </h2>
          <p className="text-xl text-paper-muted max-w-2xl mx-auto">
            Our lead consultant, ScreenwriterHannah, has earned 50+ five-star reviews
            delivering professional pitch deck services for film and TV projects.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-charcoal-light rounded-2xl p-6 text-center border border-paper/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-indigo mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-paper-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Upwork Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal-light rounded-2xl p-8 md:p-12 border border-paper/10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Stars */}
            <div className="flex-shrink-0">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="fill-accent-gold text-accent-gold"
                    size={24}
                  />
                ))}
              </div>
              <p className="text-sm text-paper-muted font-medium">5.0 rating</p>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-paper mb-4">
                Studio-Caliber Packaging Team
              </h3>
              <p className="text-paper-muted mb-6">
                Professional pitch deck specialists with deep experience in film and TV packaging.
                Experts at transforming stories into compelling presentations that attract investors and distributors.
              </p>

              {/* Client Types */}
              <div className="mb-6">
                <p className="text-sm font-medium text-paper mb-3">
                  Trusted by:
                </p>
                <div className="flex flex-wrap gap-2">
                  {clientTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://www.upwork.com/freelancers/screenwriterhannahl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
              >
                <span>View Upwork Profile</span>
                <ExternalLinkIcon size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: CheckIcon, title: 'Verified Expert', text: 'Proven track record on Upwork' },
            { icon: CheckIcon, title: 'Fast Turnaround', text: 'Professional decks delivered on time' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckIcon className="text-accent-gold flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-paper">{item.title}</p>
                <p className="text-sm text-paper-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
