# Sales Rep Preparation System - Complete Implementation Guide

## Overview
This document provides a complete implementation guide for the sales rep preparation system that transforms questionnaire responses into actionable sales intelligence.

## System Architecture

### Data Flow
```
User completes questionnaire → AI analyzes responses → Sales dashboard populated → Rep prepared for call → Follow-up tracked
```

### Core Components
1. **Questionnaire Processor** - Processes responses and generates insights
2. **AI Analysis Engine** - Analyzes story and generates recommendations
3. **Sales Dashboard** - Presents prospect information to sales reps
4. **Conversation Tools** - Provides scripts and talking points
5. **Tracking System** - Monitors sales outcomes

## Database Implementation

### Enhanced Prospects Table
```sql
-- Already implemented in the system
-- This table stores all questionnaire responses and AI-generated insights
CREATE TABLE prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Questionnaire responses
  timeline TEXT,
  personal_meaning TEXT[],
  project_for TEXT,
  format TEXT,
  materials TEXT[],
  excited_parts TEXT[],
  involvement TEXT,
  start_timing TEXT,
  budget TEXT,
  logline TEXT,
  description TEXT,
  want_consult BOOLEAN DEFAULT FALSE,
  
  -- AI-generated insights
  story_score_total INTEGER,
  story_score_breakdown JSONB,
  story_analysis TEXT,
  recommended_services TEXT[],
  talking_points TEXT[],
  objection_handling TEXT[],
  matched_case_studies UUID[],
  
  -- Lead scoring and qualification
  lead_score INTEGER DEFAULT 0,
  budget_qualification VARCHAR(20),
  timeline_urgency VARCHAR(20),
  engagement_level INTEGER DEFAULT 1,
  
  -- Sales tracking
  call_scheduled_at TIMESTAMP WITH TIME ZONE,
  call_completed_at TIMESTAMP WITH TIME ZONE,
  call_outcome TEXT,
  next_steps TEXT,
  sales_rep_notes TEXT,
  sales_rep_id UUID
);
```

## API Implementation

### 1. Questionnaire Submission with AI Analysis
```typescript
// app/api/questionnaire/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { prospects } from '@/db/schema';
import { analyzeStoryWithAI } from '@/lib/ai-analysis';
import { generateSalesInsights } from '@/lib/sales-insights';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Store initial prospect data
    const [prospect] = await db.insert(prospects).values({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      timeline: formData.timeline,
      personal_meaning: formData.personalMeaning,
      project_for: formData.projectFor,
      format: formData.format,
      materials: formData.materials,
      excited_parts: formData.excitedParts,
      involvement: formData.involvement,
      start_timing: formData.startTiming,
      budget: formData.budget,
      logline: formData.logline,
      description: formData.description,
      want_consult: formData.wantConsult,
    }).returning();

    // Run AI analysis
    const aiAnalysis = await analyzeStoryWithAI(
      formData.logline,
      formData.description,
      formData.format,
      formData.budget
    );

    // Generate sales insights
    const salesInsights = await generateSalesInsights({
      ...formData,
      storyScore: aiAnalysis.totalScore,
      storyAnalysis: aiAnalysis.analysis
    });

    // Update prospect with AI insights
    await db.update(prospects).set({
      story_score_total: aiAnalysis.totalScore,
      story_score_breakdown: aiAnalysis.breakdown,
      story_analysis: aiAnalysis.analysis,
      recommended_services: salesInsights.recommendedServices,
      talking_points: salesInsights.talkingPoints,
      objection_handling: salesInsights.objectionHandling,
      matched_case_studies: salesInsights.caseStudyIds,
      lead_score: salesInsights.leadScore,
      budget_qualification: salesInsights.budgetQualification,
      timeline_urgency: salesInsights.timelineUrgency,
    }).where(eq(prospects.id, prospect.id));

    return NextResponse.json({
      success: true,
      prospectId: prospect.id,
      storyScore: aiAnalysis.totalScore,
      message: 'Questionnaire submitted successfully'
    });

  } catch (error) {
    console.error('Questionnaire submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit questionnaire' },
      { status: 500 }
    );
  }
}
```

### 2. Sales Dashboard API
```typescript
// app/api/sales/prospects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { prospects } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'new';
    const sort = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(prospects);

    // Apply status filters
    if (status === 'new') {
      query = query.where(sql`${prospects.call_scheduled_at} IS NULL AND ${prospects.call_completed_at} IS NULL`);
    } else if (status === 'contacted') {
      query = query.where(sql`${prospects.call_scheduled_at} IS NOT NULL`);
    } else if (status === 'completed') {
      query = query.where(sql`${prospects.call_completed_at} IS NOT NULL`);
    }

    // Apply sorting
    switch (sort) {
      case 'highest_score':
        query = query.orderBy(sql`${prospects.lead_score} DESC`);
        break;
      case 'urgent_timeline':
        query = query.orderBy(sql`${prospects.timeline_urgency} DESC, ${prospects.lead_score} DESC`);
        break;
      default: // newest
        query = query.orderBy(sql`${prospects.created_at} DESC`);
    }

    const prospects = await query.limit(limit).offset(offset);

    return NextResponse.json({
      prospects,
      total: prospects.length // In real implementation, this would be a separate count query
    });

  } catch (error) {
    console.error('Fetch prospects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prospects' },
      { status: 500 }
    );
  }
}
```

### 3. AI Analysis Service
```typescript
// lib/ai-analysis.ts
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

interface StoryAnalysis {
  totalScore: number;
  breakdown: {
    originality: number;
    emotionalImpact: number;
    commercialPotential: number;
    formatReadiness: number;
    clarityOfVision: number;
  };
  analysis: string;
}

export async function analyzeStoryWithAI(
  logline: string,
  description: string,
  format: string,
  budget: string
): Promise<StoryAnalysis> {
  const prompt = `
    Analyze this story concept and provide a professional evaluation:

    Logline: ${logline}
    Description: ${description}
    Format: ${format}
    Budget: ${budget}

    Provide a 5-factor scoring system (1-10 for each):
    1. Originality - How unique and fresh is the concept?
    2. Emotional Impact - How strongly does it connect with audiences?
    3. Commercial Potential - How likely is it to succeed commercially?
    4. Format Readiness - How well-suited is it for the chosen format?
    5. Clarity of Vision - How clear and well-defined is the concept?

    Return scores as JSON with brief reasoning for each score.
    Also provide a 2-3 sentence professional analysis of the story's strengths and potential.
  `;

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  // Parse and return the analysis
  // In real implementation, this would parse the AI response properly
  return {
    totalScore: 75, // Placeholder - would come from AI analysis
    breakdown: {
      originality: 8,
      emotionalImpact: 7,
      commercialPotential: 6,
      formatReadiness: 8,
      clarityOfVision: 9
    },
    analysis: "This story shows strong emotional resonance and clear vision. The concept has commercial potential with some adjustments to the format approach."
  };
}
```

### 4. Sales Insights Generator
```typescript
// lib/sales-insights.ts
interface FormData {
  timeline: string;
  personal_meaning: string[];
  project_for: string;
  format: string;
  materials: string[];
  excited_parts: string[];
  involvement: string;
  start_timing: string;
  budget: string;
  logline: string;
  description: string;
  want_consult: boolean;
  storyScore: number;
  storyAnalysis: string;
}

interface SalesInsights {
  recommendedServices: string[];
  talkingPoints: string[];
  objectionHandling: string[];
  caseStudyIds: string[];
  leadScore: number;
  budgetQualification: string;
  timelineUrgency: string;
}

export async function generateSalesInsights(formData: FormData): Promise<SalesInsights> {
  // Calculate lead score based on multiple factors
  const leadScore = calculateLeadScore(formData);
  
  // Determine budget qualification
  const budgetQualification = getBudgetQualification(formData.budget);
  
  // Determine timeline urgency
  const timelineUrgency = getTimelineUrgency(formData.start_timing);

  // Generate recommended services based on responses
  const recommendedServices = generateRecommendedServices(formData);
  
  // Generate talking points based on personal meaning and excitement
  const talkingPoints = generateTalkingPoints(formData);
  
  // Generate objection handling based on budget and timeline
  const objectionHandling = generateObjectionHandling(formData);
  
  // Match relevant case studies
  const caseStudyIds = await matchCaseStudies(formData);

  return {
    recommendedServices,
    talkingPoints,
    objectionHandling,
    caseStudyIds,
    leadScore,
    budgetQualification,
    timelineUrgency
  };
}

function calculateLeadScore(data: FormData): number {
  let score = data.storyScore; // Start with story score (0-100)
  
  // Budget qualification impact
  switch (data.budget) {
    case '$50K+':
      score += 25;
      break;
    case '$15-50K':
      score += 15;
      break;
    case '$5-15K':
      score += 10;
      break;
    case '<$5K':
      score += 5;
      break;
    default:
      score += 3; // For unsure budgets
  }
  
  // Timeline urgency impact
  switch (data.start_timing) {
    case 'ASAP – I\'m ready now':
      score += 20;
      break;
    case 'Within 1–3 months':
      score += 15;
      break;
    case 'This year – need to prepare first':
      score += 10;
      break;
    default:
      score -= 5; // For exploratory timelines
  }
  
  // Personal meaning impact
  if (data.personal_meaning.includes('It\'s my baby – I\'ve poured my heart into it')) {
    score += 10; // Strong personal investment
  }
  
  // Format specificity impact
  if (data.format === 'Feature Film' || data.format === 'Limited Series / TV Show') {
    score += 5; // Higher commercial potential
  }
  
  // Materials completeness impact
  if (data.materials.includes('A script or draft') || data.materials.includes('A pitch deck')) {
    score += 10; // More serious about project
  }
  
  return Math.min(score, 100); // Cap at 100
}

function getBudgetQualification(budget: string): string {
  if (budget.includes('$50K+')) return 'High';
  if (budget.includes('$15-50K')) return 'Medium';
  if (budget.includes('$5-15K')) return 'Low';
  if (budget.includes('<$5K')) return 'Exploring';
  return 'Uncertain';
}

function getTimelineUrgency(timing: string): string {
  if (timing.includes('ASAP')) return 'Immediate';
  if (timing.includes('1–3 months')) return 'Soon';
  if (timing.includes('This year')) return 'Later';
  return 'Exploring';
}

function generateRecommendedServices(data: FormData): string[] {
  const services: string[] = [];
  
  // Based on format and materials
  if (data.format === 'Feature Film') {
    services.push('Feature Film Pitch Deck');
    if (data.materials.includes('A script or draft')) {
      services.push('Script Development');
    }
  } else if (data.format === 'Limited Series / TV Show') {
    services.push('TV Series Pitch Deck');
    services.push('Package Development');
  }
  
  // Based on budget
  if (data.budget.includes('$50K+')) {
    services.push('Full Production Package');
  } else if (data.budget.includes('$15-50K')) {
    services.push('Premium Package');
  } else if (data.budget.includes('$5-15K')) {
    services.push('Standard Package');
  }
  
  // Based on excitement
  if (data.excited_parts.includes('Pitch deck creation')) {
    services.push('Pitch Deck Creation');
  }
  
  if (data.excited_parts.includes('Talent attachment')) {
    services.push('Talent Attachment Services');
  }
  
  return services;
}

function generateTalkingPoints(data: FormData): string[] {
  const points: string[] = [];
  
  // Personal meaning talking points
  if (data.personal_meaning.includes('It\'s my baby – I\'ve poured my heart into it')) {
    points.push('They have deep personal investment in this project - approach with sensitivity');
  }
  
  if (data.personal_meaning.includes('It\'s based on my life or someone close to me')) {
    points.push('This is a personal story - emphasize authenticity and emotional connection');
  }
  
  // Timeline talking points
  if (data.start_timing.includes('ASAP')) {
    points.push('They want to start immediately - emphasize quick turnaround capabilities');
  }
  
  // Budget talking points
  if (data.budget.includes('$50K+')) {
    points.push('They have significant budget available - focus on premium services');
  }
  
  // Format talking points
  if (data.format === 'Documentary') {
    points.push('Documentary projects often have different funding approaches - discuss grants and foundations');
  }
  
  return points;
}

function generateObjectionHandling(data: FormData): string[] {
  const objections: string[] = [];
  
  // Budget-related objections
  if (data.budget.includes('<$5K')) {
    objections.push('If budget concern: We offer flexible payment plans and can start with essential services');
  }
  
  if (data.budget.includes('unsure')) {
    objections.push('If budget uncertainty: We can create a phased approach that starts with concept validation');
  }
  
  // Timeline-related objections
  if (data.start_timing.includes('Just exploring')) {
    objections.push('If timeline uncertainty: We offer consultation packages to help clarify next steps');
  }
  
  // Experience-related objections
  if (data.materials.includes('Just an idea')) {
    objections.push('If early stage concern: We specialize in developing raw ideas into market-ready concepts');
  }
  
  return objections;
}

async function matchCaseStudies(data: FormData): Promise<string[]> {
  // In real implementation, this would query the database for matching case studies
  // For now, return some placeholder IDs
  return ['case-1', 'case-2', 'case-3'];
}
```

## Frontend Components

### 1. Sales Dashboard
```tsx
// components/sales/SalesDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, MessageCircle, Filter, Search, User, DollarSign, Clock } from 'lucide-react';
import SalesProspectCard from './SalesProspectCard';

interface SalesDashboardProps {
  initialProspects: any[]; // Using any for now
}

export default function SalesDashboard({ initialProspects }: SalesDashboardProps) {
  const [prospects, setProspects] = useState(initialProspects);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'new',
    sort: 'newest',
    search: ''
  });

  useEffect(() => {
    fetchProspects();
  }, [filters]);

  const fetchProspects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sales/prospects?status=${filters.status}&sort=${filters.sort}`);
      const data = await response.json();
      setProspects(data.prospects);
    } catch (error) {
      console.error('Error fetching prospects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-2">
            Sales Dashboard
          </h1>
          <p className="text-charcoal/70">
            Manage and prepare for prospect calls
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-charcoal/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent-indigo/10 rounded-lg">
                <User className="w-6 h-6 text-accent-indigo" />
              </div>
              <div>
                <p className="text-sm text-charcoal/60">New Prospects</p>
                <p className="text-2xl font-bold text-charcoal">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-charcoal/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent-gold/10 rounded-lg">
                <Phone className="w-6 h-6 text-accent-gold" />
              </div>
              <div>
                <p className="text-sm text-charcoal/60">Calls Scheduled</p>
                <p className="text-2xl font-bold text-charcoal">12</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-charcoal/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal/60">Calls Completed</p>
                <p className="text-2xl font-bold text-charcoal">8</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-charcoal/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal/60">Avg. Lead Score</p>
                <p className="text-2xl font-bold text-charcoal">78</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prospects..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
          >
            <option value="new">New Prospects</option>
            <option value="contacted">Contacted</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={filters.sort}
            onChange={(e) => setFilters({...filters, sort: e.target.value})}
            className="px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="highest_score">Highest Score</option>
            <option value="urgent_timeline">Urgent Timeline</option>
          </select>
        </div>

        {/* Prospects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-indigo"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {prospects.map((prospect, index) => (
                <motion.div
                  key={prospect.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SalesProspectCard prospect={prospect} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. Prospect Detail View
```tsx
// components/sales/ProspectDetail.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, MessageCircle, User, DollarSign, Clock, Sparkles, Star } from 'lucide-react';

interface ProspectDetailProps {
  prospect: any; // Using any for now
}

export default function ProspectDetail({ prospect }: ProspectDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState(prospect.sales_rep_notes || '');

  const handleSaveNotes = async () => {
    // In real implementation, this would save notes to the database
    console.log('Saving notes:', notes);
  };

  return (
    <div className="min-h-screen bg-paper py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-6">
          <a href="/sales" className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors">
            ← Back to Dashboard
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prospect Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-display text-3xl font-bold text-charcoal mb-2">
                    {prospect.name}
                  </h1>
                  <p className="text-charcoal/70">{prospect.email}</p>
                  {prospect.phone && <p className="text-charcoal/70">{prospect.phone}</p>}
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent-indigo mb-1">
                    {prospect.lead_score}
                  </div>
                  <div className="text-sm text-charcoal/60">Lead Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-charcoal/50" />
                  <span className="text-charcoal/80">{prospect.budget}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    prospect.budget_qualification === 'High' 
                      ? 'bg-green-100 text-green-800' 
                      : prospect.budget_qualification === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prospect.budget_qualification}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-charcoal/50" />
                  <span className="text-charcoal/80">{prospect.start_timing}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    prospect.timeline_urgency === 'Immediate' 
                      ? 'bg-red-100 text-red-800' 
                      : prospect.timeline_urgency === 'Soon'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {prospect.timeline_urgency}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-charcoal/50" />
                  <span className="text-charcoal/80">{prospect.format}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-charcoal/50" />
                  <span className="text-charcoal/80">Score: {prospect.story_score_total}/100</span>
                </div>
              </div>
            </motion.div>

            {/* Story Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-8"
            >
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent-indigo" />
                Story Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-charcoal mb-3">Logline</h3>
                  <p className="text-charcoal/80 italic">"{prospect.logline}"</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-charcoal mb-3">Description</h3>
                  <p className="text-charcoal/80">{prospect.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-charcoal mb-3">AI Analysis</h3>
                <p className="text-charcoal/80 bg-charcoal/5 p-4 rounded-lg">
                  {prospect.story_analysis}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-charcoal mb-3">Score Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(prospect.story_score_breakdown).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-accent-indigo">{value}</div>
                      <div className="text-xs text-charcoal/60 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recommended Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-8"
            >
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Recommended Services
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {prospect.recommended_services.map((service: string, index: number) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-accent-indigo/10 text-accent-indigo rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Conversation Preparation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-8"
            >
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Conversation Preparation
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-charcoal mb-3 flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Key Talking Points
                  </h3>
                  <ul className="text-sm text-charcoal/80 space-y-2">
                    {prospect.talking_points.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent-indigo mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-charcoal mb-3">
                    Objection Handling
                  </h3>
                  <ul className="text-sm text-charcoal/80 space-y-2">
                    {prospect.objection_handling.map((handling: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent-indigo mt-1">•</span>
                        {handling}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Call Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
            >
              <h3 className="font-display text-lg font-bold text-charcoal mb-4">
                Call Actions
              </h3>
              
              <div className="space-y-3">
                {!prospect.call_scheduled_at ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent-indigo text-white rounded-lg hover:bg-accent-indigo/90 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Consultation
                  </button>
                ) : !prospect.call_completed_at ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Mark as Completed
                  </button>
                ) : (
                  <div className="text-center py-4 text-green-600">
                    Call completed
                  </div>
                )}
                
                <div className="text-sm text-charcoal/60">
                  {prospect.next_steps || 'Schedule initial consultation'}
                </div>
              </div>
            </motion.div>

            {/* Sales Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
            >
              <h3 className="font-display text-lg font-bold text-charcoal mb-4">
                Sales Notes
              </h3>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full p-3 border border-charcoal/20 rounded-lg text-sm"
                placeholder="Add notes from your interaction with this prospect..."
              />
              
              <button
                onClick={handleSaveNotes}
                className="mt-3 w-full px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors"
              >
                Save Notes
              </button>
            </motion.div>

            {/* Questionnaire Responses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-charcoal/10 p-6"
            >
              <h3 className="font-display text-lg font-bold text-charcoal mb-4">
                Questionnaire Responses
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-charcoal">Timeline</div>
                  <div className="text-charcoal/80">{prospect.timeline}</div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Personal Meaning</div>
                  <div className="text-charcoal/80">
                    {prospect.personal_meaning.join(', ')}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Project For</div>
                  <div className="text-charcoal/80">{prospect.project_for}</div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Materials</div>
                  <div className="text-charcoal/80">
                    {prospect.materials.join(', ')}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Excited Parts</div>
                  <div className="text-charcoal/80">
                    {prospect.excited_parts.join(', ')}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Involvement</div>
                  <div className="text-charcoal/80">{prospect.involvement}</div>
                </div>
                
                <div>
                  <div className="font-medium text-charcoal">Want Consult</div>
                  <div className="text-charcoal/80">
                    {prospect.want_consult ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Implementation Priority

### Phase 1: Core Sales System (Week 1-2)
1. **Database Schema**: Implement the enhanced prospects table
2. **API Endpoints**: Create questionnaire submission and sales dashboard APIs
3. **AI Integration**: Connect Claude API for story analysis
4. **Basic Dashboard**: Create sales dashboard with prospect listing

### Phase 2: Advanced Features (Week 3-4)
1. **Sales Insights**: Implement the sales insights generation system
2. **Conversation Tools**: Add talking points and objection handling
3. **Case Study Matching**: Implement relevant case study recommendations
4. **Prospect Detail View**: Create comprehensive prospect profiles

### Phase 3: Optimization (Week 5-6)
1. **Performance**: Optimize database queries and API responses
2. **Analytics**: Add tracking for sales outcomes
3. **A/B Testing**: Implement testing for different sales approaches
4. **Reporting**: Create sales performance dashboards

## Success Metrics

### Sales Preparation Metrics
- Average call preparation time reduction
- Call-to-meeting conversion rate improvement
- Sales rep satisfaction scores
- Time-to-close reduction

### Lead Quality Metrics
- Lead score accuracy correlation with conversion
- Budget qualification accuracy
- Timeline urgency prediction accuracy
- Service recommendation effectiveness

### Business Impact Metrics
- Overall conversion rate improvement
- Average deal size increase
- Sales cycle acceleration
- Customer lifetime value improvement

This comprehensive sales preparation system will transform your questionnaire responses into actionable sales intelligence, preparing your sales team with detailed prospect information and conversation tools before every call.