'use client';

import { motion } from 'framer-motion';
import { Lock, Calendar, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AnalysisSection {
  title: string;
  score?: number;
  content: string;
  blurred?: boolean;
}

interface BlurredAnalysisPreviewProps {
  overallScore: number;
  sections?: AnalysisSection[];
  userEmail?: string;
  userName?: string;
}

/**
 * Blurred Analysis Preview Component
 * Shows full StakeOS analysis results but blurs most content
 * Creates desire to unlock full report
 */
export default function BlurredAnalysisPreview({
  overallScore,
  sections = [],
  userEmail,
  userName,
}: BlurredAnalysisPreviewProps) {
  // Default sections if none provided
  const defaultSections: AnalysisSection[] = [
    {
      title: 'Commercial Viability',
      score: 78,
      content: 'Your story demonstrates strong market appeal with clear commercial potential. The concept aligns well with current industry trends and has identifiable target demographics.',
      blurred: true,
    },
    {
      title: 'Character Development',
      score: 82,
      content: 'Well-developed characters with clear arcs and motivations. The protagonist journey is compelling and follows proven narrative structures.',
      blurred: true,
    },
    {
      title: 'Market Positioning',
      score: 75,
      content: 'Strong positioning within the genre. Comparable titles suggest healthy market demand. Competitive analysis shows differentiation opportunities.',
      blurred: true,
    },
    {
      title: 'Narrative Structure',
      score: 80,
      content: 'Solid three-act structure with clear inciting incident, rising action, and resolution. Pacing is well-balanced throughout.',
      blurred: true,
    },
    {
      title: 'Production Feasibility',
      score: 72,
      content: 'Realistic production scope with achievable budget parameters. Location and casting considerations are well-thought-out.',
      blurred: true,
    },
  ];

  const displaySections = sections.length > 0 ? sections : defaultSections;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white rounded-2xl border-2 border-charcoal/10 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-indigo to-accent-gold p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Sparkles size={24} />
            <h3 className="font-display text-2xl font-bold">Full Proprietary Analysis</h3>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <Lock size={16} />
            <span className="text-sm font-medium">Preview</span>
          </div>
        </div>
        <p className="text-white/90 text-sm">
          Complete StakeOS evaluation with detailed insights and recommendations
        </p>
      </div>

      {/* Overall Score - Visible */}
      <div className="p-6 border-b border-charcoal/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-charcoal">Overall Score</h4>
          <span className="text-3xl font-bold text-accent-indigo">{overallScore}/100</span>
        </div>
        <div className="h-3 bg-charcoal/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallScore}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-full bg-gradient-to-r from-accent-indigo to-accent-gold"
          />
        </div>
      </div>

      {/* Analysis Sections - Mostly Blurred */}
      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {displaySections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`relative p-4 rounded-lg border ${
              section.blurred 
                ? 'bg-charcoal/5 border-charcoal/10' 
                : 'bg-white border-accent-indigo/20'
            }`}
          >
            {section.blurred && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="mx-auto mb-2 text-charcoal/40" size={24} />
                  <p className="text-xs text-charcoal/50 font-medium">Unlock to view</p>
                </div>
              </div>
            )}
            
            <div className={`${section.blurred ? 'blur-sm' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-charcoal">{section.title}</h5>
                {section.score && (
                  <span className="text-sm font-bold text-accent-indigo">{section.score}/100</span>
                )}
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed">{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unlock CTA */}
      <div className="p-6 bg-gradient-to-r from-accent-indigo/5 to-accent-gold/5 border-t border-charcoal/10">
        <div className="mb-4 p-4 bg-white/60 rounded-lg border border-charcoal/10">
          <p className="text-sm text-charcoal/70 text-center">
            <strong className="text-charcoal">Your full analysis is being emailed to you.</strong> No account needed - 
            check your inbox for a secure link to view all results.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/analysis"
            className="flex-1 px-6 py-4 bg-gradient-to-r from-accent-indigo to-accent-gold text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-center shadow-lg"
          >
            View Full Analysis (Email Link)
          </Link>
          <Link
            href="/questionnaire?bookCall=true"
            className="flex-1 px-6 py-4 border-2 border-accent-indigo text-accent-indigo font-semibold rounded-lg hover:bg-accent-indigo hover:text-white transition-colors text-center flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            Book Free Consultation
          </Link>
        </div>
        <p className="text-xs text-charcoal/50 text-center mt-3">
          Full report includes: Detailed breakdowns, market comparisons, production insights, and actionable recommendations
        </p>
        <p className="text-xs text-charcoal/40 text-center mt-2">
          Want to track multiple projects? <Link href="/signup" className="text-accent-indigo hover:underline">Create a free account</Link> (optional)
        </p>
      </div>
    </motion.div>
  );
}
