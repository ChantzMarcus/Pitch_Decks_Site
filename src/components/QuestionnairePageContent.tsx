'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StoryQuestionnaire, { QuestionnaireData, TeaserScore } from '@/components/StoryQuestionnaire';
import EvaluationResult from '@/components/EvaluationResult';
import AIServiceStatus from '@/components/AIServiceStatus';
import StructuredData from '@/components/StructuredData';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

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
      <StructuredData
        type="webpage"
        data={{
          url: '/questionnaire',
          name: 'Free Story Analysis | FilmDecks',
          description: 'Get a free professional analysis of your film or TV story. Our AI-powered questionnaire evaluates your script\'s commercial potential, marketability, and pitch readiness.',
        }}
      />
      {/* Header */}
      <header className="border-b border-charcoal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-charcoal hover:text-accent-indigo transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          <span className="text-sm text-charcoal/50">FilmDecks</span>
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
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Main Evaluation Result with sales messaging */}
          <EvaluationResult
            score={teaserScore?.overall || 70}
            isAIGenerated={!!teaserScore}
            userName={submittedData.name}
          />

          {/* AI Analysis Status - show if analysis was limited */}
          {!teaserScore && (
            <div className="mt-6 max-w-2xl mx-auto">
              <AIServiceStatus status="manual_review" />
            </div>
          )}

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-left">
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
                    <p className="font-medium text-charcoal italic">&quot;{submittedData.logline}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-8 py-4 bg-accent-indigo text-white font-medium rounded-lg hover:bg-accent-indigo/90 transition-colors text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 border-2 border-charcoal text-charcoal font-medium rounded-lg hover:bg-charcoal hover:text-white transition-colors text-center"
            >
              View Our Work
            </Link>
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
