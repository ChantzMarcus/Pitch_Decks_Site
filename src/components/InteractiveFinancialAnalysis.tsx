'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Target, 
  Users,
  Calendar,
  Award,
  Zap,
  Eye,
  Download,
  Share2,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FinancialMetric {
  id: string;
  name: string;
  value: string;
  previous?: string;
  change?: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  category: string;
  icon?: React.ReactNode;
}

interface FinancialProjection {
  year: string;
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
}

interface InvestmentRound {
  round: string;
  amount: string;
  valuation: string;
  date: string;
  investors: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface FinancialAnalysisProps {
  projectName: string;
  metrics: FinancialMetric[];
  projections: FinancialProjection[];
  investmentRounds: InvestmentRound[];
  roiData: {
    year: number;
    roi: number;
  }[];
}

export default function InteractiveFinancialAnalysis({ 
  projectName = "Project Title",
  metrics = [],
  projections = [],
  investmentRounds = [],
  roiData = []
}: FinancialAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projections' | 'investment' | 'roi'>('overview');
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality for metrics
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay && metrics.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % metrics.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, metrics.length]);

  const toggleMetric = (id: string) => {
    setExpandedMetric(expandedMetric === id ? null : id);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-rose-500 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch(trend) {
      case 'up': return 'text-emerald-500';
      case 'down': return 'text-rose-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-old-gold p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold vintage-text-gold mb-4">
            Financial Analysis: {projectName}
          </h1>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
            Studio-grade financial modeling with investor-grade projections and ROI analysis
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-ivory/50 p-2 rounded-2xl border border-brass-dark/30">
          {(['overview', 'projections', 'investment', 'roi'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab
                  ? 'bg-vintage-gold text-charcoal shadow-lg'
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-ivory/70'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics Carousel */}
                <section className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-2xl font-bold text-charcoal">Key Financial Metrics</h2>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className="flex items-center gap-2"
                      >
                        {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isAutoPlay ? 'Pause' : 'Auto'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + metrics.length) % metrics.length)}
                      >
                        ←
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % metrics.length)}
                      >
                        →
                      </Button>
                    </div>
                  </div>

                  <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-r from-ivory to-old-gold border border-brass-dark/30 p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="h-full flex flex-col justify-center items-center text-center"
                      >
                        {metrics.length > 0 && (
                          <>
                            <div className="text-6xl mb-4">{metrics[currentSlide].icon}</div>
                            <h3 className="font-display text-3xl font-bold text-charcoal mb-2">
                              {metrics[currentSlide].name}
                            </h3>
                            <p className="text-4xl font-bold text-vintage-gold mb-2">
                              {metrics[currentSlide].value}
                            </p>
                            <p className="text-charcoal/80 max-w-md">
                              {metrics[currentSlide].description}
                            </p>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Metric Indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {metrics.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentSlide === index ? 'bg-vintage-gold' : 'bg-charcoal/30'
                        }`}
                      />
                    ))}
                  </div>
                </section>

                {/* Detailed Metrics Grid */}
                <section>
                  <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Detailed Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          onClick={() => toggleMetric(metric.id)}
                          className={`p-6 cursor-pointer transition-all hover:shadow-xl rounded-xl border ${
                            expandedMetric === metric.id
                              ? 'bg-gradient-to-br from-vintage-gold/30 to-brass-dark/20 border-2 border-vintage-gold'
                              : 'bg-gradient-to-br from-ivory/80 to-old-gold/60 border border-brass-dark/30'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="text-3xl">{metric.icon}</div>
                            <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                              {getTrendIcon(metric.trend)}
                              {metric.change !== undefined && (
                                <span className="text-sm font-medium">
                                  {metric.change > 0 ? '+' : ''}{metric.change}%
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                            {metric.name}
                          </h3>
                          
                          <p className="text-2xl font-bold text-vintage-gold mb-3">
                            {metric.value}
                          </p>
                          
                          <AnimatePresence>
                            {expandedMetric === metric.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pt-3 border-t border-brass-dark/30"
                              >
                                <p className="text-charcoal/80 text-sm">
                                  {metric.description}
                                </p>
                                {metric.previous && (
                                  <p className="text-charcoal/60 text-xs mt-2">
                                    Previous: {metric.previous}
                                  </p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-charcoal/60 bg-ivory/50 px-2 py-1 rounded">
                              {metric.category}
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 text-charcoal/60 transition-transform ${
                                expandedMetric === metric.id ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'projections' && (
              <section>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Revenue Projections</h2>
                <div className="bg-gradient-to-br from-ivory/80 to-old-gold/60 rounded-2xl border border-brass-dark/30 p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-brass-dark/30">
                          <th className="text-left py-3 text-charcoal font-bold">Year</th>
                          <th className="text-right py-3 text-charcoal font-bold">Revenue</th>
                          <th className="text-right py-3 text-charcoal font-bold">Expenses</th>
                          <th className="text-right py-3 text-charcoal font-bold">Profit</th>
                          <th className="text-right py-3 text-charcoal font-bold">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projections.map((proj, index) => (
                          <motion.tr 
                            key={proj.year} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-brass-dark/20 last:border-0"
                          >
                            <td className="py-4 text-charcoal font-medium">{proj.year}</td>
                            <td className="py-4 text-right text-vintage-gold font-bold">{formatCurrency(proj.revenue)}</td>
                            <td className="py-4 text-right text-rose-600">{formatCurrency(proj.expenses)}</td>
                            <td className={`py-4 text-right font-bold ${
                              proj.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {formatCurrency(proj.profit)}
                            </td>
                            <td className="py-4 text-right">
                              <span className={`inline-flex items-center gap-1 ${
                                proj.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'
                              }`}>
                                {getTrendIcon(proj.growth >= 0 ? 'up' : 'down')}
                                {Math.abs(proj.growth)}%
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Projection Visualization */}
                  <div className="mt-8 h-64 flex items-end justify-between gap-2">
                    {projections.map((proj, index) => (
                      <motion.div
                        key={proj.year}
                        initial={{ height: 0 }}
                        animate={{ height: `${(proj.revenue / Math.max(...projections.map(p => p.revenue))) * 80}%` }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div 
                          className="w-full bg-gradient-to-t from-vintage-gold to-carnival-gold rounded-t-lg"
                          style={{ height: `${(proj.revenue / Math.max(...projections.map(p => p.revenue))) * 80}%` }}
                        />
                        <span className="text-xs text-charcoal mt-2">{proj.year}</span>
                        <span className="text-xs text-vintage-gold font-bold">
                          {formatCurrency(proj.revenue).slice(0, -3)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'investment' && (
              <section>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Investment Rounds</h2>
                <div className="space-y-6">
                  {investmentRounds.map((round, index) => (
                    <motion.div
                      key={round.round}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-ivory/80 to-old-gold/60 rounded-2xl border border-brass-dark/30 p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-charcoal">{round.round}</h3>
                          <p className="text-charcoal/60">{round.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          round.status === 'completed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : round.status === 'in-progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {round.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-charcoal/60 text-sm">Amount Raised</p>
                          <p className="text-xl font-bold text-vintage-gold">{round.amount}</p>
                        </div>
                        <div>
                          <p className="text-charcoal/60 text-sm">Post-Money Valuation</p>
                          <p className="text-xl font-bold text-vintage-gold">{round.valuation}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-charcoal/60 text-sm mb-2">Lead Investors</p>
                        <div className="flex flex-wrap gap-2">
                          {round.investors.map((investor, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-ivory/50 text-charcoal text-sm rounded-full border border-brass-dark/30"
                            >
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'roi' && (
              <section>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">ROI Projections</h2>
                <div className="bg-gradient-to-br from-ivory/80 to-old-gold/60 rounded-2xl border border-brass-dark/30 p-6">
                  <div className="h-64 flex items-end justify-between gap-2 mb-6">
                    {roiData.map((data, index) => (
                      <motion.div
                        key={data.year}
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.roi / Math.max(...roiData.map(d => d.roi))) * 80}%` }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg"
                          style={{ height: `${(data.roi / Math.max(...roiData.map(d => d.roi))) * 80}%` }}
                        />
                        <span className="text-xs text-charcoal mt-2">{data.year}</span>
                        <span className="text-xs text-emerald-600 font-bold">
                          {data.roi}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-ivory/50 p-4 rounded-xl border border-brass-dark/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-vintage-gold" />
                        <h3 className="font-bold text-charcoal">Target ROI</h3>
                      </div>
                      <p className="text-2xl font-bold text-vintage-gold">300%</p>
                      <p className="text-sm text-charcoal/70">3-Year Projection</p>
                    </div>
                    
                    <div className="bg-ivory/50 p-4 rounded-xl border border-brass-dark/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-bold text-charcoal">Peak ROI</h3>
                      </div>
                      <p className="text-2xl font-bold text-emerald-500">425%</p>
                      <p className="text-sm text-charcoal/70">Year 4 Projection</p>
                    </div>
                    
                    <div className="bg-ivory/50 p-4 rounded-xl border border-brass-dark/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h3 className="font-bold text-charcoal">IRR</h3>
                      </div>
                      <p className="text-2xl font-bold text-amber-500">85%</p>
                      <p className="text-sm text-charcoal/70">Internal Rate of Return</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button className="bg-vintage-gold text-charcoal hover:bg-carnival-gold px-8 py-6 font-bold text-lg">
            <Download className="w-5 h-5 mr-2" />
            Download Full Analysis
          </Button>
          <Button variant="outline" className="border-brass-dark/50 text-charcoal px-8 py-6 font-bold text-lg">
            <Share2 className="w-5 h-5 mr-2" />
            Share Analysis
          </Button>
          <Button variant="outline" className="border-brass-dark/50 text-charcoal px-8 py-6 font-bold text-lg">
            <Eye className="w-5 h-5 mr-2" />
            View Detailed Report
          </Button>
        </div>
      </div>
    </div>
  );
}