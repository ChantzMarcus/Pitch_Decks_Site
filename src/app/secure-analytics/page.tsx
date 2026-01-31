// src/app/secure-analytics/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import SalesDashboard from '@/components/SalesDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Analytics | FilmDecks',
  description: 'Comprehensive prospect information and conversation tools to close deals faster',
};

export default async function SecureAnalyticsPage() {
  const user = await currentUser();

  // Check if user has appropriate role (admin or sales-rep)
  const hasAccess = user?.publicMetadata?.role === 'admin' ||
                   user?.publicMetadata?.role === 'sales-rep' ||
                   process.env.NODE_ENV === 'development'; // Allow access in development

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-paper to-charcoal/5">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="font-display text-2xl font-bold text-charcoal mb-2">
            Access Denied
          </h1>
          <p className="text-charcoal/70 mb-6">
            You don't have permission to access the secure analytics dashboard.
          </p>
          <a
            href="/"
            className="inline-block bg-accent-indigo text-white py-2 px-6 rounded-lg font-medium hover:bg-accent-indigo/90 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20">
      <SalesDashboard userRole={user?.publicMetadata?.role || 'sales-rep'} />
    </div>
  );
}
