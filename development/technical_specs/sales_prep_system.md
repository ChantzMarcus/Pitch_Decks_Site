# Sales Rep Preparation System - Technical Specification

## Overview
This document details the technical implementation of the sales rep preparation system that will use questionnaire data to provide comprehensive prospect information and conversation tools.

## System Architecture

### Data Flow
```
1. User completes questionnaire
2. Data stored in database with prospect profile
3. AI analyzes responses and generates insights
4. Sales dashboard populated with prospect information
5. Sales rep accesses dashboard before calling
6. System tracks call outcomes and optimizes future recommendations
```

## Database Schema

### Prospects Table
```sql
CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
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
  
  -- AI-generated insights
  story_score_total INTEGER,
  story_score_breakdown JSONB, -- {originality: 7, emotional_impact: 8, ...}
  story_analysis TEXT, -- AI-generated analysis
  recommended_services TEXT[], -- Services to recommend
  talking_points TEXT[], -- Key talking points
  objection_handling TEXT[], -- Pre-prepared responses
  
  -- Sales tracking
  call_scheduled_at TIMESTAMP WITH TIME ZONE,
  call_completed_at TIMESTAMP WITH TIME ZONE,
  call_outcome TEXT, -- Successful, no_show, etc.
  next_steps TEXT, -- Recommended next steps
  sales_rep_notes TEXT
);
```

### Case Studies Table (for matching)
```sql
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  genre TEXT[],
  format TEXT, -- Film, TV, Doc, etc.
  budget_range TEXT, -- $50K-$100K, etc.
  outcome TEXT, -- Funding secured, sold to studio, etc.
  success_metrics JSONB, -- {funding_raised: "$2M", ...}
  testimonial TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Questionnaire Submission
```
POST /api/questionnaire
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
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

Response:
{
  "success": true,
  "prospectId": "uuid",
  "storyScore": {
    "total": 36,
    "breakdown": {
      "originality": 7,
      "emotional_impact": 8,
      "commercial_potential": 6,
      "format_readiness": 5,
      "clarity_of_vision": 10
    }
  }
}
```

### Sales Dashboard API
```
GET /api/sales/prospects
Query Params:
- status: [new, contacted, scheduled, closed]
- sort: [newest, highest_score, urgent_timeline]
- limit: number
- offset: number

Response:
{
  "prospects": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "createdAt": "2023-01-01T00:00:00Z",
      "storyScore": 36,
      "format": "Feature Film",
      "budget": "$15-50K",
      "timeline": "ASAP",
      "callScheduledAt": null,
      "callCompletedAt": null
    }
  ],
  "total": 100
}
```

```
GET /api/sales/prospect/{id}
Response:
{
  "prospect": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "createdAt": "2023-01-01T00:00:00Z",
    
    // Questionnaire responses
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
    "want_consult": true,
    
    // AI-generated insights
    "storyScore": {
      "total": 36,
      "breakdown": {
        "originality": 7,
        "emotional_impact": 8,
        "commercial_potential": 6,
        "format_readiness": 5,
        "clarity_of_vision": 10
      }
    },
    "storyAnalysis": "This story has strong emotional impact and originality...",
    "recommendedServices": ["Pitch Deck Creation", "Package Development"],
    "talkingPoints": [
      "They've been working on this for 3+ years - deep personal investment",
      "Ready to invest $15-50K - serious about this project",
      "Wants to be very involved - collaborative approach needed"
    ],
    "objectionHandling": [
      "If budget concern: We have flexible payment plans for serious creators",
      "If timeline concern: We can expedite the process for urgent projects"
    ],
    "matchedCaseStudies": [
      {
        "id": "case-study-uuid",
        "title": "Similar Feature Film Success",
        "outcome": "Secured $2M funding",
        "testimonial": "They delivered beyond expectations..."
      }
    ],
    
    // Sales tracking
    "callScheduledAt": null,
    "callCompletedAt": null,
    "callOutcome": null,
    "nextSteps": "Schedule consultation call",
    "salesRepNotes": ""
  }
}
```

```
PUT /api/sales/prospect/{id}/schedule-call
Request Body:
{
  "scheduledAt": "2023-01-02T14:00:00Z",
  "notes": "Called to schedule consultation"
}

Response:
{
  "success": true,
  "scheduledAt": "2023-01-02T14:00:00Z"
}
```

```
PUT /api/sales/prospect/{id}/update-call-status
Request Body:
{
  "outcome": "successful",
  "notes": "Prospect interested in full package, sent proposal",
  "nextSteps": "Follow up with proposal in 2 days"
}

Response:
{
  "success": true
}
```

## Frontend Components

### Sales Dashboard
```tsx
// components/sales/SalesDashboard.tsx
interface SalesDashboardProps {
  prospects: Prospect[];
  onProspectSelect: (prospectId: string) => void;
}

// components/sales/ProspectCard.tsx
interface ProspectCardProps {
  prospect: Prospect;
  onClick: () => void;
}

// components/sales/ProspectDetail.tsx
interface ProspectDetailProps {
  prospect: Prospect;
  onUpdate: (updates: Partial<Prospect>) => void;
}
```

### AI Analysis Service
```ts
// lib/ai-analysis.ts
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
  recommendations: string[];
}

async function analyzeStory(logline: string, description: string): Promise<StoryAnalysis> {
  // Call AI API to analyze story
}
```

## AI Integration

### Claude API Integration
```ts
// lib/claude.ts
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

async function analyzeStory(logline: string, description: string) {
  const prompt = `
    Analyze this story concept and provide a high-level evaluation using a 5-factor scoring system:
    
    1. Originality (1-10)
    2. Emotional Impact (1-10) 
    3. Commercial Potential (1-10)
    4. Format Readiness (1-10)
    5. Clarity of Vision (1-10)
    
    Return a numerical score for each factor, along with a brief one-line comment for each factor — no more than 10 words per comment.
    
    Story Logline: ${logline}
    Story Description: ${description}
  `;

  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  return parseAnalysis(response.content[0].text);
}
```

## Security & Privacy

### Data Protection
- All prospect data encrypted at rest
- GDPR/CCPA compliance for data handling
- Role-based access control for sales reps
- Audit logging for data access
- Secure API authentication

### Access Controls
- Sales reps only see prospects assigned to them
- Admins can view all prospects
- Data anonymization for analytics
- Regular security audits

## Performance Requirements

### Response Times
- API endpoints: <200ms
- Dashboard loading: <1s
- AI analysis: <5s
- Search/filtering: <300ms

### Scalability
- Support 1000+ prospects in dashboard
- Handle 50 concurrent sales reps
- Process 1000+ questionnaire submissions daily

## Testing Strategy

### Unit Tests
- API endpoint functionality
- AI analysis parsing
- Data validation
- Business logic

### Integration Tests
- End-to-end questionnaire flow
- Dashboard functionality
- AI service integration
- Database operations

### Performance Tests
- Load testing for dashboard
- API rate limiting
- Database query optimization
- AI service rate limits

## Deployment

### Environment Setup
- Development: Local development environment
- Staging: Pre-production testing environment
- Production: Live customer-facing environment

### CI/CD Pipeline
- Automated testing on pull requests
- Staging deployment for validation
- Production deployment with rollback capability
- Database migration management

## Monitoring & Maintenance

### Health Checks
- API endpoint monitoring
- Database connectivity
- AI service availability
- Dashboard uptime

### Error Tracking
- API error logging
- AI service failures
- Database errors
- User experience issues

### Performance Monitoring
- API response times
- Dashboard load times
- AI analysis times
- Database query performance