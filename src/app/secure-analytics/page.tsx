// src/app/sales-dashboard/page.tsx
import SalesDashboard from '@/components/SalesDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Analytics | FilmDecks',
  description: 'Comprehensive prospect information and conversation tools to close deals faster',
};

export default function SalesDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-charcoal/5 py-20">
      <SalesDashboard userRole="sales-rep" />
    </div>
  );
}
