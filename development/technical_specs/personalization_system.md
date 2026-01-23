# Advanced Personalization System - Technical Specification

## Overview
This document details the technical implementation of the advanced personalization system that will customize the site experience based on questionnaire responses.

## System Architecture

### Data Flow
```
1. User completes questionnaire
2. Responses stored in user profile
3. Personalization engine analyzes responses
4. Dynamic content generated based on profile
5. User sees personalized experience
6. System tracks engagement and optimizes
```

## Database Schema

### User Profiles Table
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Questionnaire responses
  timeline TEXT, -- How long working on story
  personal_meaning TEXT[], -- What project means to them
  project_for TEXT, -- Who is project for
  format TEXT, -- Film, TV, Doc, etc.
  materials TEXT[], -- Current materials
  excited_parts TEXT[], -- Excited about which parts
  involvement TEXT, -- How involved they want to be
  start_timing TEXT, -- When starting
  budget TEXT, -- Budget range
  logline TEXT, -- Story logline
  description TEXT, -- Story description
  want_consult BOOLEAN DEFAULT FALSE,
  
  -- Personalization preferences
  preferred_format TEXT, -- Preferred content format
  preferred_genres TEXT[], -- Favorite genres
  engagement_level INTEGER DEFAULT 1, -- 1-5 scale
  last_engaged_at TIMESTAMP WITH TIME ZONE,
  
  -- Personalization tracking
  personalization_enabled BOOLEAN DEFAULT TRUE,
  personalization_score INTEGER DEFAULT 0, -- 0-100 scale
  personalization_opt_out BOOLEAN DEFAULT FALSE
);
```

### Content Personalization Table
```sql
CREATE TABLE personalized_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID REFERENCES user_profiles(id),
  content_type TEXT, -- hero, featured_projects, testimonials, etc.
  content_data JSONB, -- Personalized content data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  engagement_score INTEGER DEFAULT 0 -- How well this content performed
);
```

### Content Recommendations Table
```sql
CREATE TABLE content_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID REFERENCES user_profiles(id),
  content_id UUID, -- ID of recommended content
  content_type TEXT, -- deck, case_study, testimonial, etc.
  reason TEXT, -- Why this was recommended
  score FLOAT, -- Recommendation confidence score
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clicked_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE
);
```

## API Endpoints

### Profile Management
```
POST /api/profile
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "questionnaireData": {
    "timeline": "3+ years – this story has been in my heart a long time",
    "personal_meaning": ["It's my baby – I've poured my heart into it"],
    "project_for": "Me – I want to see it come to life",
    "format": "Feature Film",
    "materials": ["A script or draft", "A pitch deck"],
    "excited_parts": ["Packaging the full story into a complete project"],
    "involvement": "Very involved — I want to be part of every step",
    "start_timing": "ASAP – I'm ready now",
    "budget": "$15-50K",
    "logline": "In a world where...",
    "description": "Longer description...",
    "want_consult": true
  }
}

Response:
{
  "success": true,
  "profileId": "uuid",
  "personalization": {
    "enabled": true,
    "score": 85,
    "recommendations": [
      {
        "type": "featured_project",
        "id": "project-uuid",
        "reason": "Matches your interest in feature films",
        "confidence": 0.92
      }
    ]
  }
}
```

### Personalized Content API
```
GET /api/personalization/homepage
Headers:
- Authorization: Bearer {token}
- X-User-ID: {user-id}

Response:
{
  "hero": {
    "title": "Ready to Bring Your Feature Film to Life?",
    "subtitle": "Join 100+ creators who've transformed their vision into reality",
    "ctaText": "Get Your Free Story Analysis",
    "backgroundVideo": "/videos/feature-film-bg.mp4"
  },
  "featuredProjects": [
    {
      "id": "project-uuid",
      "title": "Sci-Fi Epic Success",
      "genre": ["Sci-Fi", "Adventure"],
      "format": "Feature Film",
      "logline": "When humanity faces extinction...",
      "matchReason": "Matches your interest in feature films",
      "confidence": 0.89
    }
  ],
  "testimonials": [
    {
      "id": "testimonial-uuid",
      "quote": "They turned my feature film idea into a funded project",
      "author": "Film Director",
      "projectType": "Feature Film",
      "matchReason": "Similar project type to yours",
      "confidence": 0.91
    }
  ],
  "services": [
    {
      "id": "service-uuid",
      "name": "Feature Film Pitch Deck",
      "description": "Studio-quality pitch deck for feature films",
      "highlight": true,
      "matchReason": "Based on your project format",
      "confidence": 0.95
    }
  ]
}
```

```
GET /api/personalization/recommendations
Query Params:
- type: [project, service, testimonial, resource]
- limit: number

Response:
{
  "recommendations": [
    {
      "id": "resource-uuid",
      "type": "resource",
      "title": "Feature Film Development Guide",
      "description": "Complete guide to developing your feature film",
      "url": "/resources/feature-film-guide",
      "matchReason": "Based on your project format and stage",
      "confidence": 0.87,
      "engagementRate": 0.72
    }
  ]
}
```

```
POST /api/personalization/interaction
Content-Type: application/json

Request Body:
{
  "contentId": "content-uuid",
  "contentType": "featured_project",
  "action": "click", // click, view, engage, convert
  "duration": 12000, // milliseconds engaged
  "feedback": "positive" // positive, negative, neutral
}

Response:
{
  "success": true,
  "updatedProfile": {
    "engagementLevel": 3,
    "personalizationScore": 88
  }
}
```

## Frontend Components

### Personalization Provider
```tsx
// components/personalization/PersonalizationProvider.tsx
interface PersonalizationProviderProps {
  children: React.ReactNode;
  userId?: string;
}

// Context for accessing personalization data
interface PersonalizationContext {
  data: PersonalizationData;
  isLoading: boolean;
  updateInteraction: (interaction: InteractionData) => void;
  refresh: () => void;
}
```

### Dynamic Content Components
```tsx
// components/personalization/DynamicHero.tsx
interface DynamicHeroProps {
  defaultContent: HeroContent;
}

// components/personalization/DynamicProjectGrid.tsx
interface DynamicProjectGridProps {
  defaultProjects: Project[];
}

// components/personalization/DynamicTestimonials.tsx
interface DynamicTestimonialsProps {
  defaultTestimonials: Testimonial[];
}

// components/personalization/DynamicServices.tsx
interface DynamicServicesProps {
  defaultServices: Service[];
}
```

### Recommendation Engine
```ts
// lib/recommendation-engine.ts
interface RecommendationEngine {
  generateRecommendations(userId: string, context: RequestContext): Promise<Recommendation[]>;
  updateModel(interaction: InteractionData): Promise<void>;
  getPersonalizationScore(userId: string): Promise<number>;
}
```

## AI/ML Implementation

### Content Matching Algorithm
```ts
// lib/content-matching.ts
interface ContentMatcher {
  matchContent(userProfile: UserProfile, content: Content): Promise<MatchResult>;
  calculateConfidence(matchFactors: MatchFactor[]): number;
  generateMatchReason(matchFactors: MatchFactor[]): string;
}

class ContentMatcherImpl implements ContentMatcher {
  async matchContent(userProfile: UserProfile, content: Content): Promise<MatchResult> {
    const factors: MatchFactor[] = [];
    
    // Format matching
    if (userProfile.format === content.format) {
      factors.push({ type: 'format_match', score: 0.3 });
    }
    
    // Genre matching
    const genreMatch = userProfile.preferred_genres?.filter(genre => 
      content.genres?.includes(genre)
    ).length || 0;
    factors.push({ type: 'genre_match', score: genreMatch * 0.1 });
    
    // Budget alignment
    if (this.matchesBudgetRange(userProfile.budget, content.budget)) {
      factors.push({ type: 'budget_match', score: 0.2 });
    }
    
    // Timeline alignment
    if (this.matchesTimeline(userProfile.start_timing, content.timeline)) {
      factors.push({ type: 'timeline_match', score: 0.15 });
    }
    
    const confidence = this.calculateConfidence(factors);
    const reason = this.generateMatchReason(factors);
    
    return {
      confidence,
      reason,
      factors
    };
  }
}
```

### Machine Learning Model
```ts
// lib/ml-personalization.ts
class MLPersonalizationModel {
  private model: any; // ML model instance
  
  async train(userData: UserInteractionData[]): Promise<void> {
    // Train model on user interaction data
    // Features: user profile, content attributes, interaction outcomes
    // Target: engagement/conversion probability
  }
  
  async predictEngagement(userProfile: UserProfile, content: Content): Promise<number> {
    // Predict likelihood of engagement
    return this.model.predict(this.prepareFeatures(userProfile, content));
  }
  
  async prepareFeatures(userProfile: UserProfile, content: Content): Promise<number[]> {
    // Convert user profile and content to feature vector
    // Normalize and encode categorical variables
    return [];
  }
}
```

## Personalization Algorithms

### Collaborative Filtering
```ts
// lib/collaborative-filtering.ts
class CollaborativeFiltering {
  async findSimilarUsers(targetUserId: string, limit: number = 10): Promise<User[]> {
    // Find users with similar profiles and preferences
    // Recommend content liked by similar users
  }
  
  async recommendBasedOnSimilarity(userId: string, content: Content[]): Promise<Content[]> {
    // Recommend content based on similar users' preferences
  }
}
```

### Content-Based Filtering
```ts
// lib/content-based-filtering.ts
class ContentBasedFiltering {
  async calculateContentSimilarity(content1: Content, content2: Content): Promise<number> {
    // Calculate similarity based on attributes
  }
  
  async recommendSimilarContent(contentId: string, limit: number): Promise<Content[]> {
    // Recommend content similar to what user engaged with
  }
}
```

## Performance Optimization

### Caching Strategy
```ts
// lib/cache.ts
interface CacheManager {
  getPersonalizedContent(userId: string, page: string): Promise<any>;
  setPersonalizedContent(userId: string, page: string, content: any): Promise<void>;
  invalidateUserCache(userId: string): Promise<void>;
}

// Cache layers:
// 1. In-memory cache (Redis) for active users
// 2. CDN cache for static personalized content
// 3. Database cache for historical personalization
```

### Pre-computation
```ts
// lib/precompute.ts
class PersonalizationPrecomputer {
  async precomputeForUser(userId: string): Promise<void> {
    // Pre-compute common personalization scenarios
    // Run during off-peak hours
  }
  
  async precomputeForSegment(segment: UserSegment): Promise<void> {
    // Pre-compute for user segments
  }
  
  async schedulePrecomputations(): Promise<void> {
    // Schedule regular pre-computations
  }
}
```

## A/B Testing Framework

### Experiment Management
```ts
// lib/ab-testing.ts
interface ABTest {
  id: string;
  name: string;
  variants: Variant[];
  trafficAllocation: number;
  startDate: Date;
  endDate: Date;
  winner?: string;
}

class ABTestingFramework {
  async assignVariant(userId: string, testName: string): Promise<string> {
    // Assign user to variant based on hash of user ID
  }
  
  async trackConversion(userId: string, testName: string, variant: string): Promise<void> {
    // Track conversion for statistical analysis
  }
  
  async analyzeResults(testName: string): Promise<TestResults> {
    // Analyze test results and determine winner
  }
}
```

## Security & Privacy

### Data Protection
- All user profile data encrypted
- GDPR/CCPA compliance for personalization
- Opt-out mechanism for personalization
- Data retention policies
- Secure API authentication

### Privacy Controls
- Granular privacy settings
- Data portability
- Right to deletion
- Consent management
- Audit logging

## Performance Requirements

### Response Times
- Personalization API: <100ms
- Content rendering: <500ms
- Recommendation updates: <1s
- Profile updates: <200ms

### Scalability
- Support 100,000+ users
- Handle 10,000+ concurrent sessions
- Process 1M+ interactions daily
- Adapt to traffic spikes

## Testing Strategy

### Unit Tests
- Personalization algorithms
- Content matching logic
- Data processing functions
- API endpoint functionality

### Integration Tests
- End-to-end personalization flow
- Database operations
- AI/ML model integration
- Caching layer functionality

### Performance Tests
- Load testing for personalization API
- Database query optimization
- Caching effectiveness
- ML model performance

## Monitoring & Analytics

### Key Metrics
- Personalization engagement rate
- Conversion rate improvement
- User satisfaction scores
- Content relevance scores
- System performance metrics

### Tracking
- User interaction tracking
- Content performance metrics
- Personalization effectiveness
- A/B test results
- Error rates and performance

## Deployment

### Environment Setup
- Development: Local personalization simulation
- Staging: Pre-production testing
- Production: Live personalization system

### Rollout Strategy
- Gradual rollout to users
- Feature flags for personalization
- A/B testing during rollout
- Monitoring during deployment

## Maintenance & Evolution

### Model Updates
- Regular model retraining
- Performance monitoring
- Continuous optimization
- Feature experimentation
- User feedback integration