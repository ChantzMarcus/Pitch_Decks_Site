'use client';

import { motion } from 'framer-motion';
import CalendlyEmbed from './CalendlyEmbed';

interface EvaluationResultProps {
  score: number;
  isAIGenerated: boolean;
  userName?: string;
  userEmail?: string;
}

/**
 * Get the potential tier based on score
 */
function getPotentialTier(score: number): {
  tier: string;
  color: string;
  bgColor: string;
  message: string;
  emoji: string;
} {
  if (score >= 80) {
    return {
      tier: 'Exceptional Potential',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      message: 'Your story shows remarkable commercial viability and creative depth.',
      emoji: '🌟',
    };
  }
  if (score >= 65) {
    return {
      tier: 'High Potential',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      message: 'Your concept demonstrates strong market appeal and originality.',
      emoji: '✨',
    };
  }
  if (score >= 50) {
    return {
      tier: 'Promising',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      message: 'Your story has solid foundations with room for strategic development.',
      emoji: '💡',
    };
  }
  return {
    tier: 'Under Review',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 border-slate-200',
    message: 'Our team will provide personalized feedback to help refine your concept.',
    emoji: '📋',
  };
}

export default function EvaluationResult({
  score,
  isAIGenerated,
  userName,
  userEmail,
}: EvaluationResultProps) {
  const { tier, color, bgColor, message, emoji } = getPotentialTier(score);
  const firstName = userName?.split(' ')[0] || 'there';
  const isQualified = score >= 75;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-2xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h2 className="font-display text-3xl font-bold text-charcoal mb-2">
          Thank You, {firstName}!
        </h2>
        <p className="text-charcoal/70">
          Your story has been successfully submitted for evaluation.
        </p>
      </div>

      {/* Evaluation Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`rounded-2xl border-2 p-6 mb-6 ${bgColor}`}
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl">{emoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`font-display text-2xl font-bold ${color}`}>
                {tier}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color} bg-white/60`}>
                Score: {score}/100
              </span>
            </div>
            <p className="text-charcoal/80 mb-4">{message}</p>

            {/* Proprietary System Badge */}
            <div className="flex items-center gap-2 text-sm text-charcoal/60">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>
                {isAIGenerated
                  ? 'Evaluated by our proprietary AI analysis system'
                  : 'Preliminary assessment - full review pending'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Calendly CTA for Qualified Leads */}
      {isQualified && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <CalendlyEmbed
            prefillName={userName}
            prefillEmail={userEmail}
          />
        </motion.div>
      )}

      {/* What's Next Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isQualified ? 0.6 : 0.5 }}
        className="bg-white rounded-2xl border border-charcoal/10 p-6 mb-6"
      >
        <h4 className="font-display text-xl font-bold text-charcoal mb-4">
          What Happens Next?
        </h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-indigo/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent-indigo font-bold text-sm">1</span>
            </div>
            <div>
              <p className="font-medium text-charcoal">Manual Review (Within 72 Hours)</p>
              <p className="text-sm text-charcoal/60">
                Our story development team will personally review your submission and provide detailed feedback.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-indigo/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent-indigo font-bold text-sm">2</span>
            </div>
            <div>
              <p className="font-medium text-charcoal">Personalized Analysis Report</p>
              <p className="text-sm text-charcoal/60">
                You&apos;ll receive a comprehensive breakdown of your story&apos;s strengths and opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-indigo/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent-indigo font-bold text-sm">3</span>
            </div>
            <div>
              <p className="font-medium text-charcoal">Strategy Consultation</p>
              <p className="text-sm text-charcoal/60">
                If your story qualifies, we&apos;ll schedule a call to discuss next steps for bringing it to market.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Check Email Reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-accent-indigo/5 rounded-xl p-4 flex items-center gap-3"
      >
        <svg className="w-6 h-6 text-accent-indigo flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-charcoal/80">
          <span className="font-medium">Check your inbox!</span> We&apos;ve sent a confirmation email with your preliminary results.
          Be sure to check your spam folder.
        </p>
      </motion.div>
    </motion.div>
  );
}
