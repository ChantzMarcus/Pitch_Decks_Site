'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import BackToTop from '@/components/ui/BackToTop';
import StickyCTA from '@/components/ui/StickyCTA';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';
import SocialProofNotification from '@/components/ui/SocialProofNotification';
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
      <StickyCTA />
      <ExitIntentPopup />
      <SocialProofNotification />
      {children}
    </ToastProvider>
  );
}
