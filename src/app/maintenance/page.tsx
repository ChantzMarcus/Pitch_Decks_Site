// src/app/maintenance/page.tsx
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
          Coming Soon
        </h1>
        <p className="text-charcoal/70 mb-8">
          We're working on something exciting! This site will be available soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}