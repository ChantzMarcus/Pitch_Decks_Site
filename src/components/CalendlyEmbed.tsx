'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CalendlyEmbedProps {
  url?: string;
  prefillName?: string;
  prefillEmail?: string;
  minimal?: boolean;
}

/**
 * Calendly integration component
 *
 * Set NEXT_PUBLIC_CALENDLY_URL in .env to enable
 * Example: NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-company/30min
 */
export default function CalendlyEmbed({
  url,
  prefillName,
  prefillEmail,
  minimal = false,
}: CalendlyEmbedProps) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL;

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  if (!calendlyUrl) {
    return null;
  }

  // Build URL with prefill parameters
  const buildUrl = () => {
    const baseUrl = calendlyUrl;
    const params = new URLSearchParams();
    if (prefillName) params.set('name', prefillName);
    if (prefillEmail) params.set('email', prefillEmail);
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  if (minimal) {
    return (
      <motion.a
        href={buildUrl()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Book Your Strategy Call</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 text-center sm:text-left">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal mb-1">
            You Qualify for a Strategy Call!
          </h3>
          <p className="text-charcoal/70 text-sm">
            Your story shows strong potential. Let&apos;s discuss how we can help bring it to life.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3 text-sm text-charcoal/70 mb-3">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>30-minute call with our story development team</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-charcoal/70 mb-3">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Personalized feedback on your story concept</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-charcoal/70">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Clear next steps to move forward</span>
        </div>
      </div>

      <a
        href={buildUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Schedule Your Free Strategy Call</span>
      </a>

      <p className="text-center text-xs text-charcoal/50 mt-3">
        No obligation • Pick a time that works for you
      </p>
    </motion.div>
  );
}

/**
 * Inline Calendly popup trigger
 */
export function CalendlyButton({
  url,
  prefillName,
  prefillEmail,
  children,
  className = '',
}: CalendlyEmbedProps & { children: React.ReactNode; className?: string }) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL;

  const handleClick = () => {
    if (!calendlyUrl || typeof window === 'undefined') return;

    // Build URL with prefill
    const params = new URLSearchParams();
    if (prefillName) params.set('name', prefillName);
    if (prefillEmail) params.set('email', prefillEmail);
    const queryString = params.toString();
    const fullUrl = queryString ? `${calendlyUrl}?${queryString}` : calendlyUrl;

    // Open Calendly popup if widget is loaded
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: fullUrl });
    } else {
      // Fallback to opening in new tab
      window.open(fullUrl, '_blank');
    }
  };

  if (!calendlyUrl) {
    return null;
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
