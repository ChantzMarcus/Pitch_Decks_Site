# Implementation Plan for Advanced Enhancement Features

## Priority 1: High-Impact, Medium-Effort Features (Week 1-2)

### 1. Enhanced Video Previews & Cinematic UX
```tsx
// components/CinematicDeckViewer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';

interface CinematicDeckViewerProps {
  deck: any; // Using any for now
  onExit?: () => void;
}

export default function CinematicDeckViewer({ deck, onExit }: CinematicDeckViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add cinematic effects and transitions
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative w-full h-full max-w-7xl mx-auto"
      >
        {/* Video Player with cinematic controls */}
        <div className="relative w-full h-full flex items-center justify-center">
          <VideoPlayer 
            src={deck.promo_video_url || deck.cover_image_url}
            title={deck.title}
            autoPlay={false}
            loop={true}
            className="w-full h-full object-contain"
          />
          
          {/* Cinematic overlay controls */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Deck information overlay */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold mb-2"
          >
            {deck.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 mb-4"
          >
            {deck.logline}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 text-sm opacity-70"
          >
            <span>{deck.genre.join(', ')}</span>
            <span>•</span>
            <span>{deck.format}</span>
            <span>•</span>
            <span>{deck.budget_range}</span>
          </motion.div>
        </div>
        
        {/* Exit button */}
        <button 
          onClick={onExit}
          className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </motion.div>
    </div>
  );
}
```

### 2. Advanced Lead Scoring System
```tsx
// lib/advanced-lead-scoring.ts
export interface AdvancedLeadScore {
  baseScore: number; // 0-100 from initial questionnaire
  behavioralScore: number; // 0-100 from site behavior
  engagementScore: number; // 0-100 from interaction depth
  intentScore: number; // 0-100 from actions taken
  totalScore: number; // Combined weighted score
  qualificationLevel: 'hot' | 'warm' | 'cold' | 'exploring';
  recommendedAction: 'immediate_contact' | 'follow_up' | 'nurture' | 'monitor';
}

export class AdvancedLeadScoring {
  /**
   * Calculate advanced lead score based on multiple factors
   */
  static calculateAdvancedScore(
    baseData: any, // questionnaire responses
    behavioralData: any, // site behavior
    engagementData: any // interaction patterns
  ): AdvancedLeadScore {
    const baseScore = this.calculateBaseScore(baseData);
    const behavioralScore = this.calculateBehavioralScore(behavioralData);
    const engagementScore = this.calculateEngagementScore(engagementData);
    const intentScore = this.calculateIntentScore(behavioralData);

    // Weighted combination (adjust weights based on your business)
    const totalScore = (
      (baseScore * 0.3) + 
      (behavioralScore * 0.25) + 
      (engagementScore * 0.25) + 
      (intentScore * 0.2)
    );

    const qualificationLevel = this.getQualificationLevel(totalScore);
    const recommendedAction = this.getRecommendedAction(totalScore, intentScore);

    return {
      baseScore,
      behavioralScore,
      engagementScore,
      intentScore,
      totalScore: Math.round(totalScore),
      qualificationLevel,
      recommendedAction
    };
  }

  private static calculateBaseScore(data: any): number {
    // Use existing scoring logic from questionnaire
    let score = 0;
    
    // Budget qualification (higher weight)
    switch(data.budget) {
      case '$50K+': score += 25; break;
      case '$15-50K': score += 20; break;
      case '$5-15K': score += 15; break;
      case '<$5K': score += 5; break;
      default: score += 10;
    }
    
    // Timeline urgency
    switch(data.start_timing) {
      case 'ASAP – I\'m ready now': score += 20; break;
      case 'Within 1–3 months': score += 15; break;
      case 'This year – need to prepare first': score += 10; break;
      default: score += 5;
    }
    
    // Personal meaning (shows commitment)
    if (data.personal_meaning.includes('It\'s my baby – I\'ve poured my heart into it')) {
      score += 15;
    }
    
    // Materials completeness
    if (data.materials.includes('A script or draft') || data.materials.includes('A pitch deck')) {
      score += 10;
    }
    
    return Math.min(score, 100);
  }

  private static calculateBehavioralScore(data: any): number {
    // Track page views, time on site, pages visited
    let score = 0;
    
    // Time spent on site (more time = more interest)
    if (data.time_on_site > 300) score += 25; // 5+ minutes
    else if (data.time_on_site > 180) score += 20; // 3+ minutes
    else if (data.time_on_site > 60) score += 15; // 1+ minute
    
    // Pages viewed (deeper engagement)
    if (data.pages_viewed > 10) score += 25;
    else if (data.pages_viewed > 5) score += 20;
    else if (data.pages_viewed > 2) score += 15;
    
    // Specific actions taken
    if (data.actions.includes('viewed_deck_detail')) score += 10;
    if (data.actions.includes('downloaded_sample')) score += 15;
    if (data.actions.includes('watched_video')) score += 10;
    
    return Math.min(score, 100);
  }

  private static calculateEngagementScore(data: any): number {
    // Depth of interaction with content
    let score = 0;
    
    // How many slides viewed in lightbox
    if (data.slides_viewed > 15) score += 30;
    else if (data.slides_viewed > 8) score += 25;
    else if (data.slides_viewed > 3) score += 20;
    
    // Time spent in lightbox
    if (data.lightbox_time > 120) score += 25; // 2+ minutes
    else if (data.lightbox_time > 60) score += 20; // 1+ minute
    else if (data.lightbox_time > 30) score += 15; // 30+ seconds
    
    // Interactions with deck (zoom, navigation, etc.)
    if (data.interactions > 20) score += 25;
    else if (data.interactions > 10) score += 20;
    else if (data.interactions > 5) score += 15;
    
    return Math.min(score, 100);
  }

  private static calculateIntentScore(data: any): number {
    // Actions indicating purchase intent
    let score = 0;
    
    if (data.actions.includes('clicked_pricing')) score += 30;
    if (data.actions.includes('requested_consultation')) score += 35;
    if (data.actions.includes('downloaded_pitch_deck')) score += 25;
    if (data.actions.includes('contact_form_submitted')) score += 30;
    if (data.actions.includes('schedule_call_clicked')) score += 25;
    if (data.actions.includes('returned_visitor')) score += 20;
    
    return Math.min(score, 100);
  }

  private static getQualificationLevel(score: number): AdvancedLeadScore['qualificationLevel'] {
    if (score >= 80) return 'hot';
    if (score >= 60) return 'warm';
    if (score >= 40) return 'cold';
    return 'exploring';
  }

  private static getRecommendedAction(
    totalScore: number, 
    intentScore: number
  ): AdvancedLeadScore['recommendedAction'] {
    if (totalScore >= 80 && intentScore >= 70) return 'immediate_contact';
    if (totalScore >= 60) return 'follow_up';
    if (totalScore >= 40) return 'nurture';
    return 'monitor';
  }
}
```

### 3. Enhanced Personalization Engine
```tsx
// lib/enhanced-personalization.ts
export interface PersonalizationProfile {
  demographic: {
    user_type: 'creator' | 'producer' | 'investor' | 'distributor' | 'talent';
    experience_level: 'new' | 'intermediate' | 'experienced' | 'professional';
    budget_range: '$0-10K' | '$10-50K' | '$50-100K' | '$100K+' | 'unknown';
  };
  content_preferences: {
    preferred_genres: string[];
    preferred_formats: string[];
    content_depth: 'surface' | 'moderate' | 'deep';
    interaction_style: 'quick_browse' | 'detailed_exploration' | 'comparative_analysis';
  };
  behavioral_signals: {
    viewing_patterns: string[]; // ['feature_films', 'documentaries', 'tv_series']
    engagement_level: 'low' | 'medium' | 'high' | 'very_high';
    decision_timeline: 'immediate' | 'short_term' | 'medium_term' | 'exploring';
  };
  personalization_scores: {
    content_relevance: number; // 0-100
    format_suitability: number; // 0-100
    timing_appropriateness: number; // 0-100
  };
}

export class EnhancedPersonalizationEngine {
  /**
   * Generate personalization profile based on user data
   */
  static generateProfile(userData: any): PersonalizationProfile {
    return {
      demographic: {
        user_type: this.inferUserType(userData),
        experience_level: this.assessExperienceLevel(userData),
        budget_range: this.estimateBudgetRange(userData)
      },
      content_preferences: {
        preferred_genres: this.identifyGenrePreferences(userData),
        preferred_formats: this.identifyFormatPreferences(userData),
        content_depth: this.assessContentDepthPreference(userData),
        interaction_style: this.identifyInteractionStyle(userData)
      },
      behavioral_signals: {
        viewing_patterns: this.extractViewingPatterns(userData),
        engagement_level: this.assessEngagementLevel(userData),
        decision_timeline: this.assessDecisionTimeline(userData)
      },
      personalization_scores: {
        content_relevance: this.calculateContentRelevance(userData),
        format_suitability: this.calculateFormatSuitability(userData),
        timing_appropriateness: this.calculateTimingAppropriateness(userData)
      }
    };
  }

  private static inferUserType(userData: any): PersonalizationProfile['demographic']['user_type'] {
    // Infer user type from questionnaire responses and behavior
    if (userData.project_for === 'Me – I want to see it come to life') return 'creator';
    if (userData.excited_parts.includes('Talent attachment')) return 'producer';
    if (userData.budget.includes('$50K+')) return 'investor';
    return 'creator'; // Default assumption
  }

  private static assessExperienceLevel(userData: any): PersonalizationProfile['demographic']['experience_level'] {
    // Assess based on materials and timeline
    if (userData.timeline.includes('3+ years')) return 'professional';
    if (userData.materials.includes('A script or draft')) return 'experienced';
    if (userData.materials.includes('A pitch deck')) return 'intermediate';
    return 'new';
  }

  private static estimateBudgetRange(userData: any): PersonalizationProfile['demographic']['budget_range'] {
    return userData.budget as any || 'unknown';
  }

  private static identifyGenrePreferences(userData: any): string[] {
    // This would come from questionnaire or behavior
    return userData.genre || [];
  }

  private static identifyFormatPreferences(userData: any): string[] {
    return [userData.format] || [];
  }

  private static assessContentDepthPreference(userData: any): PersonalizationProfile['content_preferences']['content_depth'] {
    // Based on time spent and pages viewed
    if (userData.behavior?.time_on_site > 300) return 'deep';
    if (userData.behavior?.time_on_site > 120) return 'moderate';
    return 'surface';
  }

  private static identifyInteractionStyle(userData: any): PersonalizationProfile['content_preferences']['interaction_style'] {
    // Based on navigation patterns
    if (userData.behavior?.pages_viewed > 10) return 'detailed_exploration';
    if (userData.behavior?.comparison_views > 2) return 'comparative_analysis';
    return 'quick_browse';
  }

  private static extractViewingPatterns(userData: any): string[] {
    // Extract from behavior tracking
    return userData.behavior?.viewed_categories || [];
  }

  private static assessEngagementLevel(userData: any): PersonalizationProfile['behavioral_signals']['engagement_level'] {
    const score = userData.engagement_score || 0;
    if (score > 80) return 'very_high';
    if (score > 60) return 'high';
    if (score > 40) return 'medium';
    return 'low';
  }

  private static assessDecisionTimeline(userData: any): PersonalizationProfile['behavioral_signals']['decision_timeline'] {
    if (userData.start_timing?.includes('ASAP')) return 'immediate';
    if (userData.start_timing?.includes('1–3 months')) return 'short_term';
    if (userData.start_timing?.includes('This year')) return 'medium_term';
    return 'exploring';
  }

  private static calculateContentRelevance(userData: any): number {
    // Calculate how relevant our content is to this user
    return Math.min(100, (userData.match_score || 0) * 20);
  }

  private static calculateFormatSuitability(userData: any): number {
    // Calculate how suitable our format is for this user
    return Math.min(100, (userData.format_score || 0) * 20);
  }

  private static calculateTimingAppropriateness(userData: any): number {
    // Calculate how appropriate our timing is for this user
    return Math.min(100, (userData.timing_score || 0) * 20);
  }
}
```

## Priority 2: Advanced Features (Week 3-4)

### 4. Interactive Story Mapping
```tsx
// components/InteractiveStoryMap.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Play, Info } from 'lucide-react';

interface StoryNode {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  type: 'character' | 'location' | 'plot_point' | 'theme';
  connections: string[]; // IDs of connected nodes
}

interface InteractiveStoryMapProps {
  storyNodes: StoryNode[];
  deckId: string;
}

export default function InteractiveStoryMap({ storyNodes, deckId }: InteractiveStoryMapProps) {
  const [selectedNode, setSelectedNode] = useState<StoryNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<StoryNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-charcoal/20 to-paper rounded-xl overflow-hidden">
      <div 
        ref={containerRef}
        className="absolute inset-0"
      >
        {/* Render story nodes */}
        {storyNodes.map((node) => (
          <motion.div
            key={node.id}
            className={`absolute cursor-pointer rounded-full p-3 backdrop-blur-sm transition-all ${
              hoveredNode?.id === node.id 
                ? 'bg-accent-indigo/30 scale-125' 
                : selectedNode?.id === node.id
                ? 'bg-accent-indigo/50 scale-110'
                : 'bg-white/20'
            }`}
            style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedNode(node)}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                node.type === 'character' ? 'bg-accent-indigo' :
                node.type === 'location' ? 'bg-accent-gold' :
                node.type === 'plot_point' ? 'bg-accent-red' : 'bg-accent-purple'
              }`} />
              <span className="text-xs mt-1 text-white/80">{node.title}</span>
            </div>
          </motion.div>
        ))}

        {/* Render connections between nodes */}
        {storyNodes.flatMap((node) => 
          node.connections.map((connectedId) => {
            const connectedNode = storyNodes.find(n => n.id === connectedId);
            if (!connectedNode) return null;
            
            return (
              <svg key={`${node.id}-${connectedId}`} className="absolute inset-0 pointer-events-none">
                <line
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${connectedNode.position.x}%`}
                  y2={`${connectedNode.position.y}%`}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                />
              </svg>
            );
          })
        ).filter(Boolean)}
      </div>

      {/* Node information panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute right-4 top-4 bottom-4 w-80 bg-paper/90 backdrop-blur-md rounded-xl p-6 shadow-xl border border-charcoal/20"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display text-xl font-bold text-charcoal">{selectedNode.title}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-charcoal/50 hover:text-charcoal"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-accent-indigo uppercase tracking-wide">
                  {selectedNode.type}
                </span>
                <p className="mt-2 text-charcoal/80">{selectedNode.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-charcoal mb-2">Connected Elements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.connections.map((id) => {
                    const connected = storyNodes.find(n => n.id === id);
                    return connected ? (
                      <span 
                        key={id}
                        className="px-3 py-1 bg-charcoal/10 rounded-full text-sm"
                      >
                        {connected.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 5. Advanced Filtering & Discovery
```tsx
// components/AdvancedDeckFilter.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, TrendingUp, DollarSign, Clock, Sparkles } from 'lucide-react';

interface AdvancedDeckFilterProps {
  decks: any[];
  onFilterChange: (filteredDecks: any[]) => void;
}

export default function AdvancedDeckFilter({ decks, onFilterChange }: AdvancedDeckFilterProps) {
  const [filters, setFilters] = useState({
    genres: [] as string[],
    formats: [] as string[],
    budgetRanges: [] as string[],
    timeline: [] as string[],
    mood: [] as string[],
    investmentReadiness: [] as string[],
    sort: 'relevance' as 'relevance' | 'newest' | 'highest_score' | 'most_viewed'
  });

  const filteredDecks = useMemo(() => {
    let result = [...decks];

    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter(deck => 
        filters.genres.some(genre => deck.genre.includes(genre))
      );
    }

    // Apply format filter
    if (filters.formats.length > 0) {
      result = result.filter(deck => 
        filters.formats.includes(deck.format)
      );
    }

    // Apply budget range filter
    if (filters.budgetRanges.length > 0) {
      result = result.filter(deck => 
        filters.budgetRanges.includes(deck.budget_range)
      );
    }

    // Apply timeline filter
    if (filters.timeline.length > 0) {
      result = result.filter(deck => 
        filters.timeline.includes(deck.timeline)
      );
    }

    // Apply mood filter
    if (filters.mood.length > 0) {
      result = result.filter(deck => 
        filters.mood.some(mood => deck.mood?.includes(mood))
      );
    }

    // Apply investment readiness filter
    if (filters.investmentReadiness.length > 0) {
      result = result.filter(deck => 
        filters.investmentReadiness.includes(deck.readiness_level)
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'highest_score':
        result.sort((a, b) => (b.story_score_total || 0) - (a.story_score_total || 0));
        break;
      case 'most_viewed':
        result.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      default:
        // Relevance sorting would require more complex algorithm
        break;
    }

    return result;
  }, [decks, filters]);

  // Update parent when filters change
  useMemo(() => {
    onFilterChange(filteredDecks);
  }, [filteredDecks, onFilterChange]);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? (prev[category] as string[]).filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="bg-paper rounded-xl p-6 border border-charcoal/10">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-5 h-5 text-accent-indigo" />
        <h3 className="font-display text-xl font-bold text-charcoal">Advanced Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Genre Filter */}
        <div>
          <h4 className="font-medium text-charcoal mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Genres
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Documentary', 'Thriller'].map(genre => (
              <button
                key={genre}
                type="button"
                onClick={() => toggleFilter('genres', genre)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.genres.includes(genre)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div>
          <h4 className="font-medium text-charcoal mb-3 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Format
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Feature Film', 'TV Series', 'Documentary', 'Animation', 'Short Film'].map(format => (
              <button
                key={format}
                type="button"
                onClick={() => toggleFilter('formats', format)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.formats.includes(format)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range Filter */}
        <div>
          <h4 className="font-medium text-charcoal mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Budget Range
          </h4>
          <div className="flex flex-wrap gap-2">
            {['<$100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M+'].map(range => (
              <button
                key={range}
                type="button"
                onClick={() => toggleFilter('budgetRanges', range)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.budgetRanges.includes(range)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Filter */}
        <div>
          <h4 className="font-medium text-charcoal mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Timeline
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Development', 'Pre-Production', 'Production', 'Post-Production', 'Completed'].map(timeline => (
              <button
                key={timeline}
                type="button"
                onClick={() => toggleFilter('timeline', timeline)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.timeline.includes(timeline)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {timeline}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Filter */}
        <div>
          <h4 className="font-medium text-charcoal mb-3">Mood</h4>
          <div className="flex flex-wrap gap-2">
            {['Dark', 'Uplifting', 'Intense', 'Whimsical', 'Suspenseful', 'Heartwarming'].map(mood => (
              <button
                key={mood}
                type="button"
                onClick={() => toggleFilter('mood', mood)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.mood.includes(mood)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Investment Readiness */}
        <div>
          <h4 className="font-medium text-charcoal mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Readiness
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Concept', 'Developing', 'Ready', 'Funding Secured'].map(readiness => (
              <button
                key={readiness}
                type="button"
                onClick={() => toggleFilter('investmentReadiness', readiness)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.investmentReadiness.includes(readiness)
                    ? 'bg-accent-indigo text-white'
                    : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
                }`}
              >
                {readiness}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sorting Options */}
      <div className="mt-6 pt-6 border-t border-charcoal/10">
        <h4 className="font-medium text-charcoal mb-3">Sort By</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'relevance', label: 'Relevance' },
            { value: 'newest', label: 'Newest' },
            { value: 'highest_score', label: 'Highest Score' },
            { value: 'most_viewed', label: 'Most Viewed' }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, sort: option.value as any }))}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filters.sort === option.value
                  ? 'bg-accent-indigo text-white'
                  : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4">
        <h4 className="font-medium text-charcoal mb-2">Active Filters</h4>
        <div className="flex flex-wrap gap-2">
          {[...filters.genres, ...filters.formats, ...filters.budgetRanges, ...filters.timeline, ...filters.mood, ...filters.investmentReadiness].map(filter => (
            <span 
              key={filter}
              className="px-3 py-1 bg-accent-indigo/10 text-accent-indigo rounded-full text-sm flex items-center gap-1"
            >
              {filter}
              <button 
                onClick={() => {
                  // Remove from whichever category it belongs to
                  Object.keys(filters).forEach(key => {
                    if (Array.isArray((filters as any)[key])) {
                      const category = key as keyof typeof filters;
                      if ((filters[category] as string[]).includes(filter)) {
                        setFilters(prev => ({
                          ...prev,
                          [category]: (prev[category] as string[]).filter(f => f !== filter)
                        }));
                      }
                    }
                  });
                }}
                className="ml-1"
              >
                ×
              </button>
            </span>
          ))}
          {([...filters.genres, ...filters.formats, ...filters.budgetRanges, ...filters.timeline, ...filters.mood, ...filters.investmentReadiness].length === 0) && (
            <span className="text-charcoal/50 text-sm">No active filters</span>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Priority 3: Advanced UX Features (Week 5-6)

### 6. Virtual Screening Room
```tsx
// components/VirtualScreeningRoom.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import { Deck } from '@/types/deck';

interface VirtualScreeningRoomProps {
  deck: Deck;
  participants?: number;
  isPrivate?: boolean;
  onComment?: (comment: string) => void;
}

export default function VirtualScreeningRoom({ 
  deck, 
  participants = 0, 
  isPrivate = false, 
  onComment 
}: VirtualScreeningRoomProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [comments, setComments] = useState<{id: string; text: string; timestamp: Date; user: string}[]>([]);
  const [newComment, setNewComment] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        text: newComment,
        timestamp: new Date(),
        user: 'Current User' // In real implementation, this would be the actual user
      };
      setComments([...comments, comment]);
      setNewComment('');
      onComment?.(newComment);
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
      {/* Video Player */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src={deck.promo_video_url || deck.cover_image_url}
          className="w-full h-full object-contain"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      </div>

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-display text-xl font-bold text-white">{deck.title}</h3>
            {isPrivate && (
              <span className="px-2 py-1 bg-red-500/80 text-white text-xs rounded">Private</span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <Users size={16} />
              <span className="text-sm">{participants} viewers</span>
            </div>
            
            <button 
              onClick={() => setShowChat(!showChat)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handlePlayPause}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
          </motion.button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          {/* Progress Bar */}
          <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-accent-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePlayPause}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
                {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
              </span>
              
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Heart size={20} />
              </button>
              
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-80 bg-paper/95 backdrop-blur-lg border-l border-charcoal/20 flex flex-col"
          >
            <div className="p-4 border-b border-charcoal/10">
              <h4 className="font-medium text-charcoal">Live Comments</h4>
              <p className="text-sm text-charcoal/60">{comments.length} comments</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-charcoal/5 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-charcoal">{comment.user}</span>
                    <span className="text-xs text-charcoal/50">
                      {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-charcoal/80">{comment.text}</p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleCommentSubmit} className="p-4 border-t border-charcoal/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-charcoal/20 rounded-lg text-sm focus:ring-2 focus:ring-accent-indigo focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-accent-indigo text-white rounded-lg hover:bg-accent-indigo/90 transition-colors text-sm"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}