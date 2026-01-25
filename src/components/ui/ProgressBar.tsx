'use client';

import { useEffect, useState } from 'react';

/**
 * Progress Bar Component
 * Shows reading progress at the top of the page - 2025 trend
 */
export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-charcoal/5 z-50">
      <div
        className="h-full bg-gradient-to-r from-accent-indigo via-accent-gold to-accent-indigo transition-transform duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
