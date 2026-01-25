'use client';

import { motion } from 'framer-motion';

type ServiceStatus = 'analyzing' | 'success' | 'degraded' | 'manual_review';

interface AIServiceStatusProps {
  status: ServiceStatus;
  onRetry?: () => void;
}

const statusConfig = {
  analyzing: {
    icon: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8"
      >
        <svg className="w-full h-full text-accent-indigo" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </motion.div>
    ),
    title: 'Analyzing Your Story',
    message: 'Our AI is evaluating your concept across multiple dimensions...',
    bgColor: 'bg-accent-indigo/5 border-accent-indigo/20',
    textColor: 'text-accent-indigo',
  },
  success: {
    icon: (
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Analysis Complete',
    message: 'Your story has been successfully evaluated.',
    bgColor: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-600',
  },
  degraded: {
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'Limited Analysis Available',
    message: 'We\'re experiencing high demand. Your submission has been saved and will receive a full analysis within 72 hours.',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-600',
  },
  manual_review: {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Queued for Expert Review',
    message: 'Your story is being prioritized for manual review by our development team. Expect personalized feedback within 72 hours.',
    bgColor: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-600',
  },
};

export default function AIServiceStatus({ status, onRetry }: AIServiceStatusProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${config.bgColor}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="flex-1">
          <h4 className={`font-medium ${config.textColor}`}>{config.title}</h4>
          <p className="text-sm text-charcoal/70 mt-1">{config.message}</p>

          {status === 'degraded' && onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-amber-700 hover:text-amber-800 underline underline-offset-2"
            >
              Try again
            </button>
          )}

          {(status === 'degraded' || status === 'manual_review') && (
            <div className="mt-3 flex items-center gap-2 text-xs text-charcoal/50">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Your submission is saved - no action needed</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Banner component for site-wide service degradation
 */
export function ServiceDegradationBanner({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-amber-50 border-b border-amber-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm text-amber-800">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>High demand notice:</strong> AI analysis may take longer than usual.
            All submissions are saved and will receive full analysis.
          </span>
        </div>
      </div>
    </motion.div>
  );
}
