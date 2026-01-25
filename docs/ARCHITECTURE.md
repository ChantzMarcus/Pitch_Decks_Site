# Film Pitch Deck Showcase - Architecture

**Last Updated:** January 21, 2026
**Version:** 1.0
**Status:** 🚧 In Design Phase

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Folder Structure](#folder-structure)
4. [Data Model](#data-model)
5. [Component Architecture](#component-architecture)
6. [API Design](#api-design)
7. [Authentication & Authorization](#authentication--authorization)
8. [File Storage Strategy](#file-storage-strategy)
9. [Performance Optimization](#performance-optimization)
10. [Security Considerations](#security-considerations)

---

## System Overview

### Purpose
A professional showcase website for film and TV pitch decks, allowing visitors to browse projects in an elegant gallery, view slides in a full-screen lightbox, and express interest through a lead capture form.

### Target Users
- **Primary:** Film producers, investors, studio executives
- **Secondary:** Production companies, film enthusiasts
- **Admin:** Content managers (deck uploaders)

### Core Features
1. **Public Gallery** - Browse pitch decks with filtering
2. **Lightbox Viewer** - Full-screen slide browsing with keyboard/touch navigation
3. **Lead Capture** - Collect interested party information
4. **Admin Panel** - Upload/manage decks, view leads

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                 │
│                  (Global CDN + Hosting)                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Next.js 15 Application                 │
│                     (App Router)                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Pages (RSC - Server Components)                  │  │
│  │  • Home / Gallery                                 │  │
│  │  • Individual Deck Pages                          │  │
│  │  • Admin Dashboard                                │  │
│  └───────────────────────────────────────────────────┘  │
│                            │                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Client Components                                │  │
│  │  • Lightbox Viewer (Framer Motion animations)    │  │
│  │  • Lead Capture Form (React Hook Form + Zod)     │  │
│  │  • Interactive Gallery (hover effects)           │  │
│  └───────────────────────────────────────────────────┘  │
│                            │                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │  API Routes                                       │  │
│  │  • /api/decks (GET all, GET by ID)               │  │
│  │  • /api/leads (POST create)                      │  │
│  │  • /api/upload (POST - admin only)               │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
           ┌────────────────┴────────────────┐
           ↓                                 ↓
┌──────────────────────┐         ┌──────────────────────┐
│   Database           │         │   File Storage       │
│   [TBD]              │         │   [TBD]              │
│                      │         │                      │
│   Tables:            │         │   Buckets:           │
│   • decks            │         │   • pitch-decks/     │
│   • slides           │         │     - covers/        │
│   • leads            │         │     - slides/        │
│                      │         │     - pdfs/          │
└──────────────────────┘         └──────────────────────┘
```

### Technology Stack (Locked)
- **Framework:** Next.js 15.x (App Router, React Server Components)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

### Technology Stack (Pending)
- **Database:** [To be locked - see TECH-STACK.md]
- **File Storage:** [To be locked - see TECH-STACK.md]
- **Component Library:** [To be locked - see TECH-STACK.md]
- **Lightbox:** [To be locked - see TECH-STACK.md]
- **Authentication:** [To be locked - see TECH-STACK.md]

---

## Folder Structure

```
film-pitch-showcase/
├── .ai/                          # AI Agent documentation
│   ├── RULES.md                  # Agent guardrails
│   ├── CONTEXT.md                # Current project state
│   ├── TODO.md                   # Task list
│   └── ARCHITECTURE.md           # This file
│
├── docs/                         # Project documentation
│   ├── TECH-STACK.md             # Technology decisions
│   ├── DECISIONS.md              # Decision rationale
│   ├── API.md                    # API documentation
│   └── CHANGELOG.md              # Change log
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/             # Public pages group
│   │   │   ├── page.tsx          # Home page (/)
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx      # Gallery page (/gallery)
│   │   │   └── deck/
│   │   │       └── [id]/
│   │   │           └── page.tsx  # Individual deck (/deck/[id])
│   │   │
│   │   ├── (admin)/              # Admin pages group (protected)
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx
│   │   │       ├── decks/
│   │   │       │   └── new/
│   │   │       │       └── page.tsx
│   │   │       └── leads/
│   │   │           └── page.tsx
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── decks/
│   │   │   │   ├── route.ts      # GET all decks
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts  # GET deck by ID
│   │   │   ├── leads/
│   │   │   │   └── route.ts      # POST create lead
│   │   │   └── upload/
│   │   │       └── route.ts      # POST upload (admin)
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # Base UI components (from component library)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── gallery/              # Gallery-specific components
│   │   │   ├── DeckCard.tsx      # Individual deck card
│   │   │   ├── DeckGrid.tsx      # Grid of deck cards
│   │   │   └── Filters.tsx       # Genre/category filters
│   │   │
│   │   ├── deck/                 # Individual deck components
│   │   │   ├── DeckHeader.tsx    # Title, logline, metadata
│   │   │   ├── SlideGallery.tsx  # Grid of slides
│   │   │   └── Lightbox.tsx      # Full-screen viewer
│   │   │
│   │   ├── forms/                # Form components
│   │   │   ├── LeadForm.tsx      # Lead capture form
│   │   │   └── UploadForm.tsx    # Admin upload form
│   │   │
│   │   └── Hero.tsx              # Hero section
│   │
│   ├── lib/                      # Utilities and services
│   │   ├── db/                   # Database utilities
│   │   │   ├── client.ts         # Database client
│   │   │   ├── schema.ts         # Type definitions
│   │   │   └── queries.ts        # Query functions
│   │   │
│   │   ├── storage/              # File storage utilities
│   │   │   ├── client.ts         # Storage client
│   │   │   └── upload.ts         # Upload utilities
│   │   │
│   │   ├── auth/                 # Authentication utilities
│   │   │   └── middleware.ts     # Auth middleware
│   │   │
│   │   └── utils/                # General utilities
│   │       ├── cn.ts             # Class name utility
│   │       └── format.ts         # Date/string formatting
│   │
│   └── types/                    # TypeScript type definitions
│       ├── deck.ts               # Deck types
│       ├── slide.ts              # Slide types
│       └── lead.ts               # Lead types
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Env template (committed)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project overview
```

**⚠️ CRITICAL RULE:** This is the ONLY folder structure. Never create:
- `src-new/`, `src-v2/`, `components-updated/`
- Alternative implementations in parallel directories

---

## Data Model

### Database Schema

```typescript
// Deck (Pitch Deck)
type Deck = {
  id: string;                    // UUID
  title: string;                 // "The Last Astronaut"
  logline: string;               // Short pitch (1-2 sentences)
  description: string;           // Longer description
  genre: string[];               // ["Sci-Fi", "Thriller"]
  target_audience: string;       // "Adults 25-54"
  production_status: string;     // "Development" | "Pre-Production" | "Production"
  cover_image_url: string;       // URL to cover image
  pdf_url: string | null;        // URL to full PDF (optional)
  slide_count: number;           // Total number of slides
  view_count: number;            // Track popularity
  comparable_titles: string[];   // ["Interstellar", "The Martian"]
  created_at: Date;
  updated_at: Date;
};

// Slide (Individual pitch deck slide)
type Slide = {
  id: string;                    // UUID
  deck_id: string;               // Foreign key to Deck
  slide_number: number;          // Order (1, 2, 3...)
  image_url: string;             // URL to slide image
  caption: string | null;        // Optional caption/description
  created_at: Date;
};

// Lead (Contact form submission)
type Lead = {
  id: string;                    // UUID
  deck_id: string | null;        // Which deck they're interested in (nullable)
  full_name: string;             // Contact name
  email: string;                 // Contact email
  phone: string | null;          // Optional phone
  company: string | null;        // Optional company
  project_type: string[];        // ["Film", "TV Series", "Documentary"]
  user_type: string;             // "Producer" | "Investor" | "Studio Executive" | "Other"
  budget_range: string;          // "$1M-$5M" | "$5M-$20M" | "$20M+"
  timeline: string;              // "Immediate" | "3-6 months" | "6-12 months"
  project_description: string;   // What they're looking for
  lead_score: number;            // Auto-calculated (0-100)
  status: string;                // "New" | "Contacted" | "Qualified" | "Lost"
  referral_source: string;       // "Website" | "Social Media" | "Referral"
  created_at: Date;
  updated_at: Date;
};
```

### Relationships
- **Deck → Slides:** One-to-Many
- **Deck → Leads:** One-to-Many (optional)

### Indexes
```sql
-- Decks table
CREATE INDEX idx_decks_created_at ON decks(created_at DESC);
CREATE INDEX idx_decks_genre ON decks USING GIN(genre);

-- Slides table
CREATE INDEX idx_slides_deck_id ON slides(deck_id);
CREATE INDEX idx_slides_slide_number ON slides(deck_id, slide_number);

-- Leads table
CREATE INDEX idx_leads_deck_id ON leads(deck_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

---

## Component Architecture

### Server vs Client Components

**Server Components (Default):**
- Home page
- Gallery page
- Individual deck page (metadata)
- Admin pages (data fetching)

**Client Components (Interactive):**
- Hero (Framer Motion animations)
- DeckCard (hover effects)
- Lightbox (full interactivity)
- LeadForm (form state)
- Filters (UI state)

### Component Hierarchy

```
App
├── RootLayout
│   ├── Header
│   └── Footer
│
├── HomePage (/)
│   ├── Hero
│   └── DeckGrid
│       └── DeckCard × N
│
├── GalleryPage (/gallery)
│   ├── Filters
│   └── DeckGrid
│       └── DeckCard × N
│
├── DeckPage (/deck/[id])
│   ├── DeckHeader
│   ├── SlideGallery
│   │   └── Lightbox
│   └── LeadForm
│
└── AdminDashboard (/admin/dashboard)
    ├── StatsCards
    └── RecentLeads
```

### State Management Strategy

**Server State (Database):**
- Fetched in Server Components
- Passed as props to Client Components
- No client-side caching initially (use React Query/SWR later if needed)

**Client State (UI):**
- React Hook Form (form state)
- useState (lightbox open/closed, filters, etc.)
- No global state management needed initially

---

## API Design

### Public Endpoints

```typescript
// GET /api/decks
// Returns: All published decks
Response: {
  decks: Deck[];
  total: number;
}

// GET /api/decks/[id]
// Returns: Single deck with slides
Response: {
  deck: Deck;
  slides: Slide[];
}

// POST /api/leads
// Creates: New lead submission
Body: {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string[];
  user_type: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  deck_id?: string;
  referral_source: string;
}
Response: {
  success: boolean;
  leadId: string;
}
```

### Admin Endpoints (Protected)

```typescript
// POST /api/upload
// Uploads: New deck with slides
Body: FormData {
  title: string;
  logline: string;
  description: string;
  genre: string[];
  coverImage: File;
  slides: File[];
  pdf?: File;
}
Response: {
  success: boolean;
  deckId: string;
}

// GET /api/admin/leads
// Returns: All leads for admin
Response: {
  leads: Lead[];
  total: number;
}
```

### Error Handling

```typescript
// Standard error response
type ErrorResponse = {
  error: {
    message: string;
    code: string;  // "VALIDATION_ERROR" | "NOT_FOUND" | "UNAUTHORIZED"
    details?: any;
  };
}

// HTTP Status Codes
// 200 - Success
// 201 - Created
// 400 - Bad Request (validation errors)
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Server Error
```

---

## Authentication & Authorization

**Strategy:** [To be decided - see TECH-STACK.md]

**Protected Routes:**
- `/admin/*` - Requires authentication

**Public Routes:**
- `/` - Home
- `/gallery` - Gallery
- `/deck/[id]` - Individual deck

**Middleware:**
```typescript
// src/lib/auth/middleware.ts
export async function requireAuth() {
  // Check authentication
  // Redirect to /login if not authenticated
}
```

---

## File Storage Strategy

### Storage Structure

```
pitch-decks/
├── covers/
│   ├── {deck-id}-cover.webp     # Optimized cover images
│   └── {deck-id}-cover-og.jpg   # Original
│
├── slides/
│   ├── {deck-id}/
│   │   ├── slide-1.webp         # Optimized slides
│   │   ├── slide-2.webp
│   │   └── ...
│   └── ...
│
└── pdfs/
    ├── {deck-id}-full.pdf       # Full pitch deck PDF
    └── ...
```

### Image Optimization Pipeline

```typescript
// When uploading
1. Receive image from user
2. Validate (type, size, dimensions)
3. Generate WebP version (next/image handles this)
4. Upload both original + WebP to storage
5. Store URLs in database
6. Use next/image for automatic optimization
```

### Upload Limits
- Max file size: 10MB per image
- Max slides: 50 per deck
- Accepted formats: JPG, PNG, WebP
- PDF: Max 25MB

---

## Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component everywhere
import Image from 'next/image';

<Image
  src={deck.cover_image_url}
  alt={deck.title}
  width={800}
  height={1200}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // true for above-fold images
/>
```

### Code Splitting
- Automatic by Next.js App Router
- Lightbox component: Dynamic import when needed
```typescript
const Lightbox = dynamic(() => import('@/components/deck/Lightbox'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### Caching Strategy
```typescript
// Static pages (revalidate every hour)
export const revalidate = 3600;

// Dynamic pages
export const dynamic = 'force-dynamic'; // For admin pages

// API routes
export const runtime = 'edge'; // Where possible
```

### Performance Targets
- **Lighthouse Score:** >90 (all categories)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3.5s
- **Largest Contentful Paint:** <2.5s

---

## Security Considerations

### Environment Variables
```bash
# .env.local (NEVER commit)
DATABASE_URL=
STORAGE_KEY=
STORAGE_SECRET=
ADMIN_EMAIL=
AUTH_SECRET=
```

### Input Validation
```typescript
// Use Zod for all form inputs
import { z } from 'zod';

const LeadSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  // ... all fields validated
});
```

### Rate Limiting
```typescript
// API routes
import { ratelimit } from '@/lib/ratelimit';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Process request
}
```

### SQL Injection Prevention
- Use parameterized queries (ORM handles this)
- Never concatenate user input into SQL

### XSS Prevention
- React escapes by default
- Sanitize any dangerouslySetInnerHTML usage
- Content Security Policy headers

### File Upload Security
- Validate file types
- Scan for malware (if needed)
- Size limits enforced
- Rename uploaded files

---

## Deployment Strategy

### Environments
1. **Development** - Local (localhost:3000)
2. **Preview** - Vercel preview deployments (on PRs)
3. **Production** - Vercel production (main branch)

### Environment Variables
- Set in Vercel dashboard
- Preview and Production have separate values
- Never commit secrets to repo

### CI/CD Pipeline
```
Git Push → Vercel Auto Deploy
├─ Build Next.js app
├─ Run type checking
├─ Run linting
├─ Deploy to edge network
└─ Invalidate CDN cache
```

### Monitoring
- Vercel Analytics (built-in)
- Error tracking: [To be decided]
- Performance monitoring: Lighthouse CI

---

## Future Enhancements (Not in v1)

- [ ] Search functionality (full-text search)
- [ ] Advanced filtering (budget range, production status)
- [ ] User accounts (save favorite decks)
- [ ] Email notifications (when someone expresses interest)
- [ ] Analytics dashboard (admin can see deck performance)
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Video trailers (embedded in deck pages)

---

## 🔄 How to Update This Document

**Never create `ARCHITECTURE-v2.md` or similar**

To update:
1. Edit THIS file directly
2. Update "Last Updated" date
3. Increment version if major change
4. Log change in `docs/CHANGELOG.md`
5. Commit: `docs: update architecture - [what changed]`

---

**This architecture document is the single source of truth for system design.**
