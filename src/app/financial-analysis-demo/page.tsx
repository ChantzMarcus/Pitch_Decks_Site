import InteractiveFinancialAnalysis from '@/components/InteractiveFinancialAnalysis';

// Sample financial data
const sampleMetrics = [
  {
    id: 'revenue',
    name: 'Annual Revenue',
    value: '$2.4M',
    change: 142,
    trend: 'up' as const,
    description: 'Total revenue generated in the last fiscal year',
    category: 'Revenue',
    icon: '💰'
  },
  {
    id: 'profit',
    name: 'Net Profit Margin',
    value: '28%',
    change: 12,
    trend: 'up' as const,
    description: 'Percentage of revenue remaining after all expenses',
    category: 'Profitability',
    icon: '📊'
  },
  {
    id: 'users',
    name: 'Active Users',
    value: '45,000',
    change: 35,
    trend: 'up' as const,
    description: 'Monthly active users across all platforms',
    category: 'Growth',
    icon: '👥'
  },
  {
    id: 'roi',
    name: 'ROI',
    value: '340%',
    change: 45,
    trend: 'up' as const,
    description: 'Return on investment for investors',
    category: 'Returns',
    icon: '📈'
  },
  {
    id: 'valuation',
    name: 'Company Valuation',
    value: '$18M',
    change: 65,
    trend: 'up' as const,
    description: 'Current estimated company valuation',
    category: 'Valuation',
    icon: '🏢'
  },
  {
    id: 'burn',
    name: 'Monthly Burn',
    value: '$85K',
    change: -8,
    trend: 'down' as const,
    description: 'Monthly operational expenses',
    category: 'Costs',
    icon: '💸'
  }
];

const sampleProjections = [
  { year: '2024', revenue: 2400000, expenses: 1500000, profit: 900000, growth: 142 },
  { year: '2025', revenue: 4200000, expenses: 1800000, profit: 2400000, growth: 75 },
  { year: '2026', revenue: 7500000, expenses: 2200000, profit: 5300000, growth: 79 },
  { year: '2027', revenue: 12000000, expenses: 2800000, profit: 9200000, growth: 60 },
  { year: '2028', revenue: 18000000, expenses: 3500000, profit: 14500000, growth: 50 }
];

const sampleRounds = [
  {
    round: 'Seed Round',
    amount: '$500K',
    valuation: '$2.5M',
    date: 'Jan 2023',
    investors: ['Alpha Ventures', 'Tech Fund'],
    status: 'completed' as const
  },
  {
    round: 'Series A',
    amount: '$2.5M',
    valuation: '$15M',
    date: 'Jun 2024',
    investors: ['Beta Capital', 'Growth Partners'],
    status: 'completed' as const
  },
  {
    round: 'Series B',
    amount: '$8M',
    valuation: '$45M',
    date: 'Dec 2025',
    investors: ['Gamma Ventures', 'Strategic Investors'],
    status: 'upcoming' as const
  }
];

const sampleRoiData = [
  { year: 2024, roi: 125 },
  { year: 2025, roi: 210 },
  { year: 2026, roi: 340 },
  { year: 2027, roi: 425 },
  { year: 2028, roi: 380 }
];

export default function FinancialAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-old-gold">
      <InteractiveFinancialAnalysis 
        projectName="Cinematic Ventures"
        metrics={sampleMetrics}
        projections={sampleProjections}
        investmentRounds={sampleRounds}
        roiData={sampleRoiData}
      />
    </div>
  );
}