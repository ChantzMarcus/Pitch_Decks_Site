'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the story scoring work?',
    answer: 'Our proprietary evaluation system uses industry-trusted data and veteran expert analysis to score your story across multiple dimensions including commercial potential, market viability, and pitch readiness. The same methodology trusted by top-tier producers and executives.',
  },
  {
    question: 'How long does it take to get my story scored?',
    answer: 'You\'ll receive your proprietary score and analysis within minutes of submitting your story. Our expert team uses automated analysis combined with industry insights to provide comprehensive feedback quickly.',
  },
  {
    question: 'Is my story kept confidential?',
    answer: 'Absolutely. Your story is protected with enterprise-grade security. We never share your content with third parties, and all submissions are handled with strict confidentiality. Your intellectual property is safe with us.',
  },
  {
    question: 'What makes your scoring system different?',
    answer: 'Our proprietary system is trained on decades of industry data and uses the same methodology trusted by major studios and top-tier producers. It\'s not a generic AI wrapper—it\'s an exclusive evaluation system built specifically for the entertainment industry.',
  },
  {
    question: 'Do I need to pay to get my story scored?',
    answer: 'The initial story evaluation is free. You\'ll receive your proprietary score and see if your story is approved by our expert team. If you want the full comprehensive report with detailed recommendations, that\'s available as an upgrade.',
  },
  {
    question: 'Can I use this for TV shows, not just films?',
    answer: 'Yes! Our system evaluates both film and TV projects. Whether you have a feature film concept, a TV series, a documentary, or a streaming project, we can provide professional evaluation and packaging.',
  },
  {
    question: 'What happens after I get my score?',
    answer: 'After receiving your score, you\'ll see if your story is approved and get actionable insights. If you\'re ready to move forward, we can help you create a production-ready pitch deck, secure funding, and connect with industry professionals.',
  },
  {
    question: 'Who evaluates my story?',
    answer: 'Your story is evaluated by our expert team of veteran industry professionals who have greenlit projects at major studios. Combined with our proprietary AI system trained on industry data, you get the best of both worlds: human expertise and data-driven insights.',
  },
];

/**
 * FAQ Accordion Component
 * Addresses common objections and questions
 * Reduces support burden and builds trust
 */
export default function FAQ({ 
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our story evaluation system',
  className = '' 
}: { 
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-paper mb-4">
            {title}
          </h2>
          <p className="text-paper-muted text-lg">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-charcoal-light border border-paper/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-paper/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-paper pr-4">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 text-paper-muted transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-paper-muted leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
