'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StoryQuestionnaire, { QuestionnaireData, TeaserScore } from '@/components/StoryQuestionnaire';
import EvaluationResult from '@/components/EvaluationResult';
import AIServiceStatus from '@/components/AIServiceStatus';
import StructuredData from '@/components/StructuredData';
import ScoreReveal from '@/components/ui/ScoreReveal';
import BlurredAnalysisPreview from '@/components/ui/BlurredAnalysisPreview';
import UrgencyCounter from '@/components/ui/UrgencyCounter';
import AsyncProcessingScreen from '@/components/ui/AsyncProcessingScreen';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Mail, Users, Calendar } from 'lucide-react';
import { getConsultationUrl } from '@/lib/constants';

type SubmissionState = 'form' | 'submitting' | 'processing' | 'revealing' | 'success' | 'error';

export default function QuestionnairePageContent() {
  const [state, setState] = useState<SubmissionState>('form');
  const [submittedData, setSubmittedData] = useState<QuestionnaireData | null>(null);
  const [teaserScore, setTeaserScore] = useState<TeaserScore | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleSubmit = async (data: QuestionnaireData, score?: TeaserScore, leadIdParam?: string) => {
    setState('submitting');

    try {
      setSubmittedData(data);
      setTeaserScore(score || null);
      if (leadIdParam) setLeadId(leadIdParam);
      
      // StakeOS processing takes ~15 minutes, so always show processing screen
      // If we have a teaser score, show quick reveal first, then processing
      if (score && score.overall) {
        // Quick teaser score available - show reveal then processing
        setState('revealing');
      } else {
        // No immediate score - go straight to processing
        setState('processing');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setState('error');
    }
  };

  const handleScoreRevealComplete = () => {
    // After reveal, show processing screen for full StakeOS analysis
    setState('processing');
  };

  const handleLeaveProcessing = () => {
    // User chooses to leave - they'll get email when ready
    setShowFullContent(true);
    setState('success');
  };

  return (
    <div className="min-h-screen bg-paper">
      <StructuredData
        type="webpage"
        data={{
          url: '/questionnaire',
          name: 'Free Story Analysis | 848 Washington Media',
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
          <span className="text-sm text-charcoal/50">848 Washington Media</span>
        </div>
      </header>

      {/* Main Content */}
      {state === 'form' && (
        <StoryQuestionnaire 
          onComplete={(data, score, leadId) => {
            if (leadId) setLeadId(leadId);
            handleSubmit(data, score);
          }} 
        />
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
              Processing Your Story...
            </h2>
            <p className="text-charcoal/60">Your story concept is being processed through our proprietary system and compared to similar success stories!</p>
          </motion.div>
        </div>
      )}

      {/* Score Reveal Animation */}
      {state === 'revealing' && submittedData && (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
          <ScoreReveal
            score={teaserScore?.overall || 70}
            userName={submittedData.name}
            onComplete={handleScoreRevealComplete}
          />
        </div>
      )}

      {state === 'success' && submittedData && showFullContent && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Social Proof - Urgency Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <UrgencyCounter variant="inline" className="justify-center" />
          </motion.div>

          {/* Main Evaluation Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EvaluationResult
              score={teaserScore?.overall || 70}
              isAIGenerated={!!teaserScore}
              userName={submittedData.name}
            />
          </motion.div>

          {/* Blurred Full Analysis Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <BlurredAnalysisPreview
              overallScore={teaserScore?.overall || 70}
              userEmail={submittedData.email}
              userName={submittedData.name}
            />
          </motion.div>

          {/* Email Delivery - No Account Needed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-accent-indigo/5 to-accent-gold/5 rounded-2xl border-2 border-accent-indigo/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-indigo/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-accent-indigo" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal mb-2">No Account Needed - Results Sent to Your Email</h3>
                  <p className="text-sm text-charcoal/70 mb-3">
                    Your complete StakeOS analysis will be emailed to <span className="font-medium text-charcoal">{submittedData.email}</span> within 15 minutes. 
                    You&apos;ll receive a secure link to view your full report - no login required.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-charcoal/10 mb-3">
                    <p className="text-xs text-charcoal/50 mb-2 font-medium">Your email will include:</p>
                    <ul className="space-y-1 text-sm text-charcoal/70">
                      <li className="flex items-center gap-2">
                        <span className="text-accent-indigo">✓</span>
                        Complete StakeOS analysis breakdown
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent-indigo">✓</span>
                        Market comparison data
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent-indigo">✓</span>
                        Production feasibility insights
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent-indigo">✓</span>
                        Secure link to view full report (no account needed)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-accent-gold/10 rounded-lg p-3 border border-accent-gold/20">
                    <p className="text-xs text-charcoal/70 mb-2">
                      <strong className="text-charcoal">Within 72 hours:</strong> An expert from our development team will personally review your story 
                      and reach out with personalized feedback and next steps.
                    </p>
                    <a
                      href={getConsultationUrl('questionnaire', 'email_preview')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent-gold hover:text-accent-gold/80 font-medium underline"
                    >
                      <Calendar size={12} />
                      Or book a consultation call now
                    </a>
                  </div>
                  <p className="text-xs text-charcoal/50 mt-3">
                    Don&apos;t see it? Check your spam folder or{' '}
                    <Link href="/contact" className="text-accent-indigo hover:underline">
                      contact us
                    </Link>
                    {' '}• Want to track multiple projects?{' '}
                    <Link href="/signup" className="text-accent-indigo hover:underline">
                      Create a free account (optional)
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
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

          {/* Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-8 py-4 border-2 border-charcoal/20 text-charcoal font-medium rounded-lg hover:bg-charcoal/5 transition-colors text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 border-2 border-charcoal/20 text-charcoal font-medium rounded-lg hover:bg-charcoal/5 transition-colors text-center"
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
