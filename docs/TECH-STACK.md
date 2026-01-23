# Technology Stack - Film Pitch Deck Showcase

**Last Updated:** January 21, 2026
**Research Phase Status:** 🔄 ACTIVE (research allowed)
**Lock Date:** TBD (when all decisions made)

---

## ⚠️ HOW THIS WORKS

### Current Phase: Research & Decision

**Phase 1: Research Phase (ACTIVE NOW)**
- ✅ Agents CAN research options
- ✅ Multiple options considered
- ✅ Nothing locked yet (except core framework)

**Phase 2: Lock Phase (NEXT)**
- 🔒 Choose ONE option per category
- 🔒 Lock it in this file
- 🔒 Document WHY in `DECISIONS.md`
- 🔒 NEVER GO BACK TO RESEARCH

**Phase 3: Build Phase (AFTER ALL LOCKED)**
- ✅ Use ONLY locked technologies
- ❌ NO researching alternatives
- ❌ NO "let me try a different library"

---

## 🔒 Locked Technologies

### Core Framework ✅
- **Framework:** Next.js 15.x
- **React:** 18.x
- **Runtime:** Node.js 20.x LTS
- **Package Manager:** pnpm (or npm - to be decided)
- **Status:** LOCKED ✅
- **Rationale:** Industry standard, React Server Components, great DX

### Language ✅
- **TypeScript:** 5.x
- **Config:** Strict mode enabled
- **Status:** LOCKED ✅
- **Rationale:** Type safety, better DX, catches errors early

### Styling ✅
- **CSS Framework:** Tailwind CSS 3.x
- **Utilities:** clsx/cn for conditional classes
- **Status:** LOCKED ✅
- **Rationale:** Rapid development, customizable, great with Next.js

### Animation ✅
- **Primary Library:** Framer Motion
- **License:** MIT (Free, open-source)
- **Status:** LOCKED ✅
- **Rationale:** Best-in-class React animations, great docs, free
- **Install:** `pnpm add framer-motion`

### Forms ✅
- **Form Library:** React Hook Form
- **Validation:** Zod
- **Status:** LOCKED ✅
- **Rationale:** Performant, great TypeScript support, industry standard
- **Install:** `pnpm add react-hook-form zod @hookform/resolvers`

### Deployment ✅
- **Platform:** Vercel
- **CDN:** Vercel Edge Network
- **Status:** LOCKED ✅
- **Rationale:** Made by Next.js team, best performance, generous free tier

---

## 🔄 Technologies Pending Decision

### Component Library
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** MEDIUM (Nice to have, not blocking)

**Options to Research:**
1. **Shadcn/ui** - Copy/paste components, full customization
2. **Radix UI** - Headless components, accessibility-first
3. **Headless UI** - Tailwind team's library

**Decision Criteria:**
- [ ] TypeScript support (must have)
- [ ] Tailwind CSS integration (must have)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Customization flexibility
- [ ] Bundle size
- [ ] Documentation quality
- [ ] Active maintenance

**Research Task:** Assigned to next agent
**When Locked:** Update this section + `DECISIONS.md`

---

### Image Gallery / Lightbox
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** HIGH (Core feature, blocking)

**Options to Research:**
1. **PhotoSwipe** - Popular, performant, mobile-friendly
2. **lightGallery.js** - Feature-rich, plugins available
3. **React Image Gallery** - React-specific, simpler
4. **yet-another-react-lightbox** - Modern, TypeScript, hooks

**Decision Criteria:**
- [ ] Performance (bundle size <50kb gzipped)
- [ ] Mobile support (touch gestures, swipe)
- [ ] Keyboard navigation (arrows, ESC)
- [ ] Accessibility (ARIA labels, screen reader)
- [ ] TypeScript support
- [ ] React 18 compatibility
- [ ] Zoom functionality
- [ ] License (commercial use OK)
- [ ] Active maintenance (updated in 2024-2025)

**Features Needed:**
- Full-screen mode
- Next/Previous navigation
- Thumbnail strip (optional)
- Keyboard shortcuts
- Touch/swipe gestures
- Image zoom
- Slide counter ("3 / 12")

**Research Task:** HIGH PRIORITY - Assigned to next agent
**When Locked:** Update this section + `DECISIONS.md`

---

### Database
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** HIGH (Core feature, blocking)

**Options to Research:**
1. **Supabase** (PostgreSQL)
   - Pros: Full backend (auth, storage, realtime), generous free tier
   - Cons: Vendor lock-in
   
2. **PlanetScale** (MySQL)
   - Pros: Serverless, branching, good DX
   - Cons: No free tier anymore?
   
3. **Vercel Postgres** (Powered by Neon)
   - Pros: Integrated with Vercel, serverless
   - Cons: Pricing unclear, newer
   
4. **Neon** (PostgreSQL)
   - Pros: Serverless Postgres, generous free tier
   - Cons: Newer platform

**Decision Criteria:**
- [ ] Pricing (free tier for small projects)
- [ ] Next.js integration (official SDK/docs)
- [ ] Edge compatibility (can query from edge functions)
- [ ] File storage included? (or separate service needed)
- [ ] Real-time capabilities (for admin dashboard)
- [ ] Connection pooling (for serverless)
- [ ] Backup/restore features
- [ ] Type safety (TypeScript SDK)
- [ ] Developer experience
- [ ] Migration tools

**Data Needs:**
- Tables: decks, slides, leads
- Relationships: decks → slides (one-to-many)
- Queries: Read-heavy (95% reads, 5% writes)
- Scale: Estimate 100 decks, 5000 slides initially

**Research Task:** HIGH PRIORITY - Assigned to next agent
**When Locked:** Update this section + `DECISIONS.md`

**If Supabase chosen:** Install `@supabase/supabase-js`
**If PlanetScale chosen:** Install `@planetscale/database`
**If Vercel Postgres chosen:** Install `@vercel/postgres`
**If Neon chosen:** Install `@neondatabase/serverless`

---

### File Storage (Images, PDFs)
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** HIGH (Core feature, blocking)

**Options to Research:**
1. **Supabase Storage**
   - Pros: Integrated if using Supabase DB, simple, good DX
   - Cons: Vendor lock-in
   
2. **Cloudinary**
   - Pros: Advanced image optimization, CDN, transformations
   - Cons: Pricing can scale quickly, complexity
   
3. **UploadThing**
   - Pros: Built for Next.js, good DX, simple pricing
   - Cons: Newer, smaller ecosystem
   
4. **Vercel Blob Storage**
   - Pros: Integrated with Vercel, simple
   - Cons: Pricing, limited features
   
5. **AWS S3 + CloudFront**
   - Pros: Industry standard, scalable, cheap
   - Cons: Complex setup, AWS learning curve

**Decision Criteria:**
- [ ] Pricing (free tier or cheap for 10-100GB)
- [ ] Image optimization (automatic WebP conversion)
- [ ] CDN (global delivery)
- [ ] PDF support (store full pitch deck PDFs)
- [ ] Next.js integration
- [ ] Upload API (direct from client or server?)
- [ ] Security (signed URLs, access control)
- [ ] Developer experience
- [ ] Migration path (if we outgrow it)

**Storage Needs:**
- Cover images: 100 decks × 2MB = 200MB
- Slide images: 100 decks × 20 slides × 1MB = 2GB
- PDFs: 100 decks × 5MB = 500MB
- **Total estimate:** 3GB initially, 10-20GB within a year

**Research Task:** HIGH PRIORITY - Assigned to next agent
**When Locked:** Update this section + `DECISIONS.md`

---

### Authentication
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** MEDIUM (Admin panel feature, not blocking MVP)

**Options to Research:**
1. **Supabase Auth**
   - Pros: Integrated if using Supabase, social login, magic links
   - Cons: Vendor lock-in
   
2. **NextAuth.js / Auth.js**
   - Pros: Open-source, flexible, many providers
   - Cons: More complex setup
   
3. **Clerk**
   - Pros: Beautiful UI, easy setup, feature-rich
   - Cons: Paid (free tier limited)
   
4. **Lucia Auth**
   - Pros: Lightweight, TypeScript-first, framework agnostic
   - Cons: More manual setup

**Decision Criteria:**
- [ ] Next.js App Router compatibility
- [ ] Pricing (free tier for 1-2 admin users)
- [ ] Social login (Google, GitHub - nice to have)
- [ ] Email/password auth (must have)
- [ ] Session management
- [ ] TypeScript support
- [ ] Middleware support (protect routes)
- [ ] Developer experience

**Auth Needs:**
- Simple: 1-2 admin users initially
- Routes to protect: `/admin/*`
- No user accounts for public (just admin)

**Research Task:** MEDIUM PRIORITY - Can wait until core features work
**When Locked:** Update this section + `DECISIONS.md`

---

### ORM / Database Client (If Needed)
**Status:** 🔄 PENDING (Depends on database choice)
**Priority:** HIGH (If database doesn't have native client)

**Options:**
1. **Prisma** - Type-safe ORM, great DX
2. **Drizzle ORM** - Lightweight, TypeScript-first
3. **Kysely** - Type-safe SQL query builder
4. **Native client** - If database provides (e.g., Supabase SDK)

**Decision:** Wait until database is locked, then decide if ORM is needed.

---

### Email Service (For Lead Notifications)
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** LOW (Nice to have, not blocking)

**Options to Research:**
1. **Resend** - Modern, Next.js friendly, generous free tier
2. **SendGrid** - Industry standard, feature-rich
3. **Mailgun** - Reliable, good APIs
4. **Postmark** - Transactional email specialist

**Decision Criteria:**
- [ ] Free tier (100-1000 emails/month)
- [ ] Next.js integration
- [ ] API simplicity
- [ ] Deliverability reputation
- [ ] Template support

**Email Needs:**
- Notify admin when new lead submits form
- Low volume (5-10 emails per day initially)

**Research Task:** LOW PRIORITY - Can add later
**When Locked:** Update this section + `DECISIONS.md`

---

### Analytics
**Status:** 🔄 RESEARCH IN PROGRESS
**Priority:** LOW (Nice to have, not blocking)

**Options to Research:**
1. **Vercel Analytics** - Built-in, privacy-friendly, simple
2. **Plausible** - Privacy-first, no cookies, paid
3. **Google Analytics 4** - Free, powerful, privacy concerns
4. **PostHog** - Product analytics, open-source option

**Decision Criteria:**
- [ ] Privacy compliance (GDPR)
- [ ] Pricing (free or cheap)
- [ ] Vercel integration
- [ ] Real-time data
- [ ] Simple setup

**Analytics Needs:**
- Page views
- Most viewed decks
- Lead form conversions
- Simple dashboard

**Research Task:** LOW PRIORITY - Can add later
**When Locked:** Update this section + `DECISIONS.md`

---

## 🚨 Agent Instructions

### To Lock a Technology Decision:

1. **Research the options** (use any available resources)
2. **Evaluate against criteria** listed above
3. **Choose ONE option** - no hedging
4. **Update this file:**
   ```diff
   - **Status:** 🔄 RESEARCH IN PROGRESS
   + **Status:** ✅ LOCKED
   + **Choice:** [Library Name] [Version]
   + **Install:** `pnpm add [package]`
   + **Locked by:** [Agent name]
   + **Locked on:** [Date]
   ```
5. **Document rationale** in `docs/DECISIONS.md`
6. **Update** `.ai/CONTEXT.md` (increment locked count)
7. **Commit:** `lock: [category] → [choice]`

### After ALL Technologies Locked:

1. Update header: `Research Phase Status: 🔒 LOCKED`
2. Update header: `Lock Date: [Date]`
3. Commit: `lock: research phase complete, tech stack frozen`
4. **From this point:** NO MORE RESEARCH, use locked stack only

---

## 📊 Decision Status Tracker

| Category | Status | Priority | Blocking? |
|----------|--------|----------|-----------|
| Core Framework | ✅ Locked | - | No |
| Language | ✅ Locked | - | No |
| Styling | ✅ Locked | - | No |
| Animation | ✅ Locked | - | No |
| Forms | ✅ Locked | - | No |
| Deployment | ✅ Locked | - | No |
| Component Library | 🔄 Research | Medium | No |
| **Lightbox** | 🔄 Research | **HIGH** | **YES** |
| **Database** | 🔄 Research | **HIGH** | **YES** |
| **File Storage** | 🔄 Research | **HIGH** | **YES** |
| Authentication | 🔄 Research | Medium | No |
| Email Service | 🔄 Research | Low | No |
| Analytics | 🔄 Research | Low | No |

**Next Action:** Lock the 3 HIGH priority items (Lightbox, Database, Storage)

---

## 🔄 Version History

**v1.0** - January 21, 2026 - Initial tech stack defined

---

**This document is the single source of truth for technology decisions.**
