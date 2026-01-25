'use client';

import { useEffect, useRef } from 'react';
import { error } from '@/lib/analytics';

/**
 * Analytics Provider Component
 * Handles global error tracking and initializes analytics
 */
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Track JavaScript errors globally
    const handleError = (event: ErrorEvent) => {
      error.jsError(
        event.message,
        event.filename || 'unknown',
        event.lineno || 0,
        event.colno || 0
      );
    };

    // Track unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      error.jsError(
        event.reason?.message || 'Unhandled Promise Rejection',
        'promise',
        0,
        0
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
}
