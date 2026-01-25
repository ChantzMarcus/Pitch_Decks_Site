'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import BackToTop from '@/components/ui/BackToTop';
import { ToastProvider } from '@/components/ui/Toast';

/**
 * Client-side UI Components Wrapper
 * Contains all interactive components that need to run on the client
 */
export default function ClientUI({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ProgressBar />
      <BackToTop />
      {children}
    </ToastProvider>
  );
}
