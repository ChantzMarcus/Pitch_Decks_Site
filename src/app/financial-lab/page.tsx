'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, TrendingUp, TrendingDown, DollarSign, Film, BarChart3, PieChart } from 'lucide-react';

// Film data structure matching the TCG Financial Analysis
interface FilmScenario {
  name: string;
  color: string;
  streaming: number;
  theatrical: number;
  foreign: number;
  totalRevenue: number;
  productionBudget: number;
  pAndA: number;
  residuals: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  roi: number;
}

const calculateScenario = (budget: number, pAndA: number, streamingMultiple: number, theatricalMultiple: number, foreignMultiple: number): FilmScenario => {
  const streaming = Math.round(budget * streamingMultiple);
  const theatrical = Math.round(budget * theatricalMultiple);
  const foreign = Math.round(budget * foreignMultiple);
  const totalRevenue = streaming + theatrical + foreign;
  const residuals = Math.round(totalRevenue * 0.12);
  const totalCosts = budget + pAndA + residuals;
  const netProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const roi = totalCosts > 0 ? ((netProfit - totalCosts) / totalCosts) * 100 : 0;

  return {
    name: '',
    color: '',
    streaming,
    theatrical,
    foreign,
    totalRevenue,
    productionBudget: budget,
    pAndA,
    residuals,
    totalCosts,
    netProfit,
    profitMargin,
    roi,
  };
};

const predefinedScenarios: FilmScenario[] = [
  {
    name: 'Best Case',
    color: '#10B981',
    streaming: 3073509,
    theatrical: 1876091,
    foreign: 2333595,
    totalRevenue: 7283195,
    productionBudget: 2500000,
    pAndA: 350000,
    residuals: 874775,
    totalCosts: 3724775,
    netProfit: 3558420,
    profitMargin: 48.9,
    roi: 221.7,
  },
  {
    name: 'Target Case',
    color: '#F59E0B',
    streaming: 1876091,
    theatrical: 1125654,
    foreign: 1407068,
    totalRevenue: 4408813,
    productionBudget: 2500000,
    pAndA: 350000,
    residuals: 528838,
    totalCosts: 3378838,
    netProfit: 1029975,
    profitMargin: 23.4,
    roi: 42.9,
  },
  {
    name: 'Worst Case',
    color: '#EF4444',
    streaming: 702486,
    theatrical: 421491,
    foreign: 526864,
    totalRevenue: 1650841,
    productionBudget: 2500000,
    pAndA: 350000,
    residuals: 197881,
    totalCosts: 3047881,
    netProfit: -1397040,
    profitMargin: -84.6,
    roi: -146.4,
  },
];

const platforms = [
  { name: 'Amazon', color: '#00A8E1', avgMultiple: 0.35 },
  { name: 'Netflix', color: '#E50914', avgMultiple: 0.42 },
  { name: 'Hulu', color: '#1CE783', avgMultiple: 0.28 },
  { name: 'HBO Max', color: '#8B5CF6', avgMultiple: 0.38 },
  { name: 'Apple', color: '#555555', avgMultiple: 0.31 },
];

export default function FinancialLabPage() {
  const [activeTab, setActiveTab] = useState<'demo' | 'calculator'>('demo');
  const [selectedScenario, setSelectedScenario] = useState<number>(1); // Default to Target
  const [animationPhase, setAnimationPhase] = useState<number>(0);

  // Calculator state
  const [budget, setBudget] = useState(2500000);
  const [pAndA, setPAndA] = useState(350000);
  const [streamingMultiple, setStreamingMultiple] = useState(0.75);
  const [theatricalMultiple, setTheatricalMultiple] = useState(0.45);
  const [foreignMultiple, setForeignMultiple] = useState(0.56);

  const customScenario = calculateScenario(budget, pAndA, streamingMultiple, theatricalMultiple, foreignMultiple);
  customScenario.name = 'Your Projection';
  customScenario.color = '#3B82F6';

  const displayScenario = activeTab === 'calculator' ? customScenario : predefinedScenarios[selectedScenario];

  // Auto-animate through scenarios in demo mode
  useEffect(() => {
    if (activeTab === 'demo') {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 3);
        setSelectedScenario(prev => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full text-amber-400 text-sm mb-6">
            <BarChart3 size={16} />
            <span>Interactive Financial Modeling</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Cinema Financial Lab
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore film financing scenarios with our interactive ROI calculator. Adjust variables and see real-time projections.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-800/50 rounded-full p-1">
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'demo'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Demo Scenarios
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Build Your Own
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Scenario Selector or Calculator */}
          <div className="lg:col-span-1 space-y-6">
            {activeTab === 'demo' ? (
              <motion.div
                key="demo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
              >
                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <Film size={20} className="text-amber-400" />
                  Select Scenario
                </h3>
                <div className="space-y-3">
                  {predefinedScenarios.map((scenario, index) => (
                    <button
                      key={scenario.name}
                      onClick={() => setSelectedScenario(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedScenario === index
                          ? 'bg-slate-700 ring-2 ring-amber-500'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{scenario.name}</span>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: scenario.color }}
                        />
                      </div>
                      <div className="text-sm text-slate-400">
                        ROI: <span className={scenario.roi > 0 ? 'text-green-400' : 'text-red-400'}>
                          {formatPercent(scenario.roi)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
              >
                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <RefreshCw size={20} className="text-amber-400" />
                  Model Parameters
                </h3>
                <div className="space-y-6">
                  {/* Budget Slider */}
                  <div>
                    <label className="flex items-center justify-between text-sm mb-2">
                      <span>Production Budget</span>
                      <span className="text-amber-400 font-mono">{formatCurrency(budget)}</span>
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="100000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* P&A Slider */}
                  <div>
                    <label className="flex items-center justify-between text-sm mb-2">
                      <span>P&A Budget</span>
                      <span className="text-amber-400 font-mono">{formatCurrency(pAndA)}</span>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="5000000"
                      step="50000"
                      value={pAndA}
                      onChange={(e) => setPAndA(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Streaming Multiple */}
                  <div>
                    <label className="flex items-center justify-between text-sm mb-2">
                      <span>Streaming Revenue Multiple</span>
                      <span className="text-amber-400 font-mono">{streamingMultiple}x</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.05"
                      value={streamingMultiple}
                      onChange={(e) => setStreamingMultiple(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Theatrical Multiple */}
                  <div>
                    <label className="flex items-center justify-between text-sm mb-2">
                      <span>Theatrical Multiple</span>
                      <span className="text-amber-400 font-mono">{theatricalMultiple}x</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={theatricalMultiple}
                      onChange={(e) => setTheatricalMultiple(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Foreign Multiple */}
                  <div>
                    <label className="flex items-center justify-between text-sm mb-2">
                      <span>Foreign Multiple</span>
                      <span className="text-amber-400 font-mono">{foreignMultiple}x</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1.5"
                      step="0.05"
                      value={foreignMultiple}
                      onChange={(e) => setForeignMultiple(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Platform Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <PieChart size={18} className="text-amber-400" />
                Platform Averages
              </h3>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      <span>{platform.name}</span>
                    </div>
                    <span className="text-slate-400">{platform.avgMultiple}x budget</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={displayScenario.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <MetricCard
                  label="Total Revenue"
                  value={formatCurrency(displayScenario.totalRevenue)}
                  trend={displayScenario.totalRevenue > displayScenario.totalCosts ? 'up' : 'down'}
                  color="amber"
                />
                <MetricCard
                  label="Net Profit"
                  value={formatCurrency(displayScenario.netProfit)}
                  trend={displayScenario.netProfit > 0 ? 'up' : 'down'}
                  color={displayScenario.netProfit > 0 ? 'green' : 'red'}
                />
                <MetricCard
                  label="Profit Margin"
                  value={formatPercent(displayScenario.profitMargin)}
                  trend={displayScenario.profitMargin > 0 ? 'up' : 'down'}
                  color={displayScenario.profitMargin > 0 ? 'green' : 'red'}
                />
                <MetricCard
                  label="ROI"
                  value={formatPercent(displayScenario.roi)}
                  trend={displayScenario.roi > 0 ? 'up' : 'down'}
                  color={displayScenario.roi > 0 ? 'green' : 'red'}
                />
              </motion.div>
            </AnimatePresence>

            {/* Revenue Breakdown Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart3 size={18} className="text-amber-400" />
                Revenue Breakdown
              </h3>
              <div className="space-y-4">
                <RevenueBar
                  label="Streaming"
                  value={displayScenario.streaming}
                  total={displayScenario.totalRevenue}
                  color="#3B82F6"
                  formatCurrency={formatCurrency}
                />
                <RevenueBar
                  label="Theatrical"
                  value={displayScenario.theatrical}
                  total={displayScenario.totalRevenue}
                  color="#8B5CF6"
                  formatCurrency={formatCurrency}
                />
                <RevenueBar
                  label="Foreign"
                  value={displayScenario.foreign}
                  total={displayScenario.totalRevenue}
                  color="#EC4899"
                  formatCurrency={formatCurrency}
                />
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Revenue</span>
                  <span className="text-2xl font-bold text-amber-400">
                    {formatCurrency(displayScenario.totalRevenue)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Cost Waterfall */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                <DollarSign size={18} className="text-amber-400" />
                Cost Waterfall
              </h3>
              <div className="space-y-3">
                <WaterfallStep
                  label="Gross Revenue"
                  value={displayScenario.totalRevenue}
                  cumulative={displayScenario.totalRevenue}
                  isPositive={true}
                  formatCurrency={formatCurrency}
                />
                <WaterfallStep
                  label="Less: Production Budget"
                  value={-displayScenario.productionBudget}
                  cumulative={displayScenario.totalRevenue - displayScenario.productionBudget}
                  isPositive={false}
                  formatCurrency={formatCurrency}
                />
                <WaterfallStep
                  label="Less: P&A"
                  value={-displayScenario.pAndA}
                  cumulative={displayScenario.totalRevenue - displayScenario.productionBudget - displayScenario.pAndA}
                  isPositive={false}
                  formatCurrency={formatCurrency}
                />
                <WaterfallStep
                  label="Less: Residuals (12%)"
                  value={-displayScenario.residuals}
                  cumulative={displayScenario.totalRevenue - displayScenario.totalCosts}
                  isPositive={false}
                  formatCurrency={formatCurrency}
                />
                <div className="pt-3 border-t-2 border-slate-600 mt-3">
                  <WaterfallStep
                    label="Net Profit"
                    value={displayScenario.netProfit}
                    cumulative={displayScenario.netProfit}
                    isPositive={displayScenario.netProfit > 0}
                    formatCurrency={formatCurrency}
                    isFinal={true}
                  />
                </div>
              </div>
            </motion.div>

            {/* Scenario Comparison */}
            {activeTab === 'demo' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
              >
                <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp size={18} className="text-amber-400" />
                  Scenario Comparison
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {predefinedScenarios.map((scenario) => (
                    <div
                      key={scenario.name}
                      className={`p-4 rounded-xl transition-all cursor-pointer ${
                        selectedScenario === predefinedScenarios.indexOf(scenario)
                          ? 'bg-slate-700 ring-2 ring-amber-500'
                          : 'bg-slate-700/30'
                      }`}
                      onClick={() => setSelectedScenario(predefinedScenarios.indexOf(scenario))}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: scenario.color }}
                        />
                        <span className="text-sm font-medium">{scenario.name}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Revenue</span>
                          <span>{formatCurrency(scenario.totalRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Profit</span>
                          <span className={scenario.netProfit > 0 ? 'text-green-400' : 'text-red-400'}>
                            {formatCurrency(scenario.netProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">ROI</span>
                          <span className={scenario.roi > 0 ? 'text-green-400' : 'text-red-400'}>
                            {formatPercent(scenario.roi)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-8 border border-amber-500/30">
            <h3 className="font-display text-2xl font-bold mb-4">
              Get Your Custom Financial Analysis
            </h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Our team creates comprehensive financial models for your film project, with detailed ROI projections
              across multiple distribution scenarios.
            </p>
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-colors">
              Request Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  trend,
  color,
}: {
  label: string;
  value: string;
  trend: 'up' | 'down';
  color: 'amber' | 'green' | 'red';
}) {
  const colorClasses = {
    amber: 'bg-amber-500/20 text-amber-400',
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-4`}>
      <div className="text-sm opacity-70 mb-1">{label}</div>
      <div className="text-xl font-bold mb-1">{value}</div>
      <div className="flex items-center justify-end">
        {trend === 'up' ? (
          <TrendingUp size={14} className="text-green-400" />
        ) : (
          <TrendingDown size={14} className="text-red-400" />
        )}
      </div>
    </div>
  );
}

function RevenueBar({
  label,
  value,
  total,
  color,
  formatCurrency,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  formatCurrency: (value: number) => string;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono">{formatCurrency(value)}</span>
      </div>
      <div className="h-8 bg-slate-700 rounded-lg overflow-hidden">
        <motion.div
          key={label + value}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-lg"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="text-right text-xs text-slate-400 mt-1">{percentage.toFixed(1)}%</div>
    </div>
  );
}

function WaterfallStep({
  label,
  value,
  cumulative,
  isPositive,
  formatCurrency,
  isFinal = false,
}: {
  label: string;
  value: number;
  cumulative: number;
  isPositive: boolean;
  formatCurrency: (value: number) => string;
  isFinal?: boolean;
}) {
  const maxVal = Math.abs(cumulative) * 1.2;

  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-sm text-slate-300 text-right">{label}</div>
      <div className="flex-1 flex items-center">
        <div className="flex-1 h-8 bg-slate-700/50 rounded relative">
          <motion.div
            key={label + value}
            initial={{ width: 0 }}
            animate={{
              width: `${Math.max(0, (Math.abs(cumulative) / maxVal) * 100)}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full rounded ${
              isFinal
                ? isPositive
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                  : 'bg-gradient-to-r from-red-500 to-rose-400'
                : isPositive
                  ? 'bg-slate-500'
                  : 'bg-red-500/50'
            }`}
          />
        </div>
      </div>
      <div className="w-28 text-sm font-mono text-right">
        <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
          {formatCurrency(value)}
        </span>
      </div>
    </div>
  );
}
