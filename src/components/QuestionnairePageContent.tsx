'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StoryQuestionnaire, { QuestionnaireData, TeaserScore } from '@/components/StoryQuestionnaire';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

type SubmissionState = 'form' | 'submitting' | 'success' | 'error';

export default function QuestionnairePageContent() {
  const [state, setState] = useState<SubmissionState>('form');
  const [submittedData, setSubmittedData] = useState<QuestionnaireData | null>(null);
  const [teaserScore, setTeaserScore] = useState<TeaserScore | null>(null);

  const handleSubmit = async (data: QuestionnaireData, score?: TeaserScore) => {
    setState('submitting');

    try {
      setSubmittedData(data);
      setTeaserScore(score || null);
      setState('success');
    } catch (error) {
      console.error('Submission error:', error);
      setState('error');
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-charcoal hover:text-accent-indigo transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          <span className="text-sm text-charcoal/50">848 Washington Media</span>
        </div>
      </header>

      {/* Main Content */}
      {state === 'form' && (
        <StoryQuestionnaire onComplete={handleSubmit} />
      )}

      {state === 'submitting' && (
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 border-4 border-accent-indigo/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 border-4 border-t-accent-indigo rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
              Analyzing Your Story...
            </h2>
            <p className="text-charcoal/60">This will just take a moment</p>
          </motion.div>
        </div>
      )}

      {state === 'success' && submittedData && (
        <div className="max-w-3xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Thank You, {submittedData.name}!
            </h1>
            <p className="text-xl text-charcoal/70 mb-12">
              We've received your story. Check your email for your full report.
            </p>

            {/* Teaser Score Card */}
            {teaserScore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-br from-accent-indigo to-accent-gold rounded-2xl p-1">
                  <div className="bg-white rounded-xl p-8">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <TrendingUp className="text-accent-indigo" size={24} />
                      <h2 className="font-display text-xl font-bold text-charcoal">
                        Your Story Potential Score
                      </h2>
                    </div>

                    {/* Score Display */}
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      {/* Circular progress */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="#f0f0f0"
                          strokeWidth="12"
                        />
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * teaserScore.overall) / 100 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="100%" stopColor="#F59E0B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="font-display text-5xl font-bold text-charcoal"
                          >
                            {teaserScore.overall}
                          </motion.span>
                          <span className="block text-sm text-charcoal/60">out of 100</span>
                        </div>
                      </div>
                    </div>

                    {/* Score Category */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-center"
                    >
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-accent-indigo/10 to-accent-gold/10 rounded-full">
                        <span className="font-semibold text-accent-indigo">
                          {teaserScore.category} Potential
                        </span>
                      </span>
                    </motion.div>

                    {/* Budget Tier Badge */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-center text-sm text-charcoal/60 mt-4"
                    >
                      Your project is in the <span className="font-medium text-charcoal">{teaserScore.budgetTier}</span> tier
                    </motion.p>

                    {/* Full report teaser */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="mt-6 pt-6 border-t border-charcoal/10 text-center"
                    >
                      <p className="text-charcoal/70 text-sm">
                        Your full detailed report is on its way to{' '}
                        <span className="font-medium text-charcoal">{submittedData.email}</span>
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-left mb-8">
              <h2 className="font-display text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Sparkles className="text-accent-indigo" size={20} />
                Your Story Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Format</span>
                  <span className="font-medium text-charcoal">{submittedData.format}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Timeline</span>
                  <span className="font-medium text-charcoal">{submittedData.timeline}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Investment Level</span>
                  <span className="font-medium text-accent-indigo">
                    {submittedData.budget === '<$5K' && 'Exploring'}
                    {submittedData.budget === '$5-15K' && 'Specific Parts'}
                    {submittedData.budget === '$15-50K' && 'Serious'}
                    {submittedData.budget === '$50K+' && 'Full Package'}
                    {submittedData.budget === 'unsure' && 'Discuss First'}
                  </span>
                </div>
                {submittedData.logline && (
                  <div className="py-3">
                    <span className="text-charcoal/60 block mb-2">Logline</span>
                    <p className="font-medium text-charcoal italic">"{submittedData.logline}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-accent-indigo/10 to-accent-gold/10 rounded-2xl p-8 text-left">
              <h3 className="font-display text-xl font-bold text-charcoal mb-4">
                What Happens Next?
              </h3>
              <ul className="space-y-3 text-charcoal/70">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent-indigo flex-shrink-0 mt-0.5" />
                  <span>We'll review your story and send your free professional score</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent-indigo flex-shrink-0 mt-0.5" />
                  <span>
                    {submittedData.wantConsult
                      ? 'We\'ll reach out to schedule your free consultation'
                      : 'We\'ll email you with personalized feedback'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-accent-indigo flex-shrink-0 mt-0.5" />
                  <span>We'll provide recommendations tailored to your budget and goals</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 border-2 border-charcoal text-charcoal font-medium rounded-lg hover:bg-charcoal hover:text-white transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {state === 'error' && (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
              Something Went Wrong
            </h2>
            <p className="text-charcoal/60 mb-8">
              We couldn't submit your story. Please try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setState('form')}
                className="px-6 py-3 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-charcoal text-charcoal font-medium rounded-lg hover:bg-charcoal hover:text-white transition-colors"
              >
                Go Home
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
