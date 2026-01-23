# Technology Decisions - Rationale

**Purpose:** This document explains WHY we chose each technology in our stack.

**Last Updated:** January 21, 2026

---

## Decision Framework

For each technology category, we document:
1. **Options Considered** - What alternatives did we evaluate?
2. **Evaluation Criteria** - What factors mattered most?
3. **Final Choice** - What did we pick?
4. **Rationale** - Why this one over the others?
5. **Locked Date** - When was this decision final?

---

## Locked Decisions

### Core Framework
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- Next.js 15
- Remix
- Astro
- Vanilla React (CRA/Vite)

**Evaluation Criteria:**
- Server-side rendering (SEO critical)
- Image optimization (many images)
- File-based routing
- TypeScript support
- Production readiness
- Ecosystem/community
- Documentation quality

**Final Choice:** Next.js 15 (App Router)

**Rationale:**
- Industry leader for React frameworks
- React Server Components reduce client JS
- Excellent image optimization (next/image)
- Best-in-class Vercel deployment
- App Router is the future direction
- Huge ecosystem and community
- Perfect for content-heavy sites like ours
- Built-in API routes for backend logic

**Trade-offs Accepted:**
- More complex than simple React
- App Router has some learning curve
- Some features still stabilizing

---

### Language (TypeScript)
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- TypeScript
- JavaScript

**Evaluation Criteria:**
- Type safety (prevent bugs)
- Developer experience
- IDE support
- Refactoring confidence
- API contract clarity

**Final Choice:** TypeScript 5.x (Strict mode)

**Rationale:**
- Catches errors at compile time, not runtime
- Better autocomplete and IDE support
- Self-documenting code (types = documentation)
- Easier to refactor with confidence
- Industry best practice for larger projects
- Database schema types align with TS types

**Trade-offs Accepted:**
- Slightly more verbose code
- Learning curve for strict mode
- Build step required

---

### Styling (Tailwind CSS)
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- Tailwind CSS
- CSS Modules
- Styled Components
- Emotion
- Vanilla CSS

**Evaluation Criteria:**
- Development speed
- Consistency (design system)
- Bundle size
- Customization
- Dark mode support
- Mobile-first approach

**Final Choice:** Tailwind CSS 3.x

**Rationale:**
- Utility-first = rapid prototyping
- Built-in design system (spacing, colors)
- Automatic purging (small bundle size)
- JIT compiler (instant compilation)
- Mobile-first by default
- Great dark mode support (when needed)
- Excellent Next.js integration
- Huge community and component libraries

**Trade-offs Accepted:**
- HTML can look cluttered with many classes
- Learning curve for utility classes
- Need to configure design tokens upfront

---

### Animation (Framer Motion)
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- Framer Motion
- React Spring
- GSAP
- CSS animations (vanilla)
- Anime.js

**Evaluation Criteria:**
- React integration
- Declarative API
- Performance
- License (cost)
- Documentation
- TypeScript support
- Bundle size

**Final Choice:** Framer Motion

**Rationale:**
- **FREE and open-source** (MIT license) - user specifically asked
- Declarative, React-like API (`<motion.div>`)
- Excellent TypeScript support
- Performant (GPU-accelerated)
- Scroll-triggered animations built-in
- Gesture support (drag, hover, tap)
- Layout animations (shared element transitions)
- Best-in-class documentation
- Used by major companies (Stripe, Shopify, etc.)

**Trade-offs Accepted:**
- Adds ~50kb to bundle (reasonable for features)
- Overkill for simple animations (but we have complex needs)

**Note:** User confirmed asking about "Framer" (the paid design tool) vs "Framer Motion" (the free animation library). We're using Framer Motion which is completely free.

---

### Forms (React Hook Form + Zod)
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- React Hook Form + Zod
- Formik + Yup
- React Final Form
- TanStack Form
- Vanilla React state

**Evaluation Criteria:**
- Performance (re-renders)
- TypeScript support
- Validation library
- Developer experience
- Bundle size
- Community support

**Final Choice:** React Hook Form + Zod

**Rationale:**
- Minimal re-renders (better performance than Formik)
- Excellent TypeScript integration
- Zod provides runtime validation + type inference
- Small bundle size (~25kb)
- Best DX (simple API)
- Works great with Server Actions (Next.js)
- Industry standard in 2025-2026

**Why Zod over Yup:**
- TypeScript-first (Yup is JS-first)
- Type inference (types = runtime validation)
- Better error messages
- More modern API

**Trade-offs Accepted:**
- Two libraries instead of one all-in-one
- Zod has learning curve for complex schemas

---

### Deployment (Vercel)
**Date Locked:** January 21, 2026
**Locked By:** Project initialization

**Options Considered:**
- Vercel
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted (Railway, Fly.io)

**Evaluation Criteria:**
- Next.js optimization
- Free tier generosity
- Global CDN
- Preview deployments
- Domain management
- Analytics included
- Edge functions

**Final Choice:** Vercel

**Rationale:**
- Made by Next.js creators (best optimization)
- Generous free tier (plenty for this project)
- Automatic preview deployments on PRs
- Global edge network (fast worldwide)
- Built-in analytics (privacy-friendly)
- Zero config deployment (connect GitHub, done)
- Edge functions for API routes
- Industry standard for Next.js

**Trade-offs Accepted:**
- Vendor lock-in to some extent
- Less control than self-hosted
- Pricing can scale if traffic explodes (but free tier is generous)

---

## Pending Decisions

### Component Library
**Status:** 🔄 Research in progress

**Options to Consider:**
1. **Shadcn/ui**
   - Copy/paste components (no NPM dependency)
   - Built on Radix UI primitives
   - Full customization (you own the code)
   - Tailwind-based styling
   - Growing ecosystem
   
2. **Radix UI**
   - Headless components (unstyled)
   - Accessibility out of the box
   - Full control over styling
   - TypeScript-first
   
3. **Headless UI**
   - Made by Tailwind team
   - Unstyled by default
   - Tailwind-optimized
   - Simpler than Radix

**Evaluation Criteria:**
- [ ] TypeScript support (must have)
- [ ] Tailwind integration (must have)
- [ ] Accessibility (WCAG 2.1 AA minimum)
- [ ] Customization (need to match design)
- [ ] Bundle size (smaller is better)
- [ ] Documentation (clear examples)
- [ ] Maintenance (actively updated)

**Recommendation:** Shadcn/ui seems ideal for our use case (Tailwind + customization)

**To Lock This:**
1. Research all three
2. Build a test component with each
3. Choose based on criteria
4. Document decision here
5. Update TECH-STACK.md

---

### Image Gallery / Lightbox
**Status:** 🔄 Research in progress
**Priority:** HIGH (blocking)

**Options to Consider:**
1. **PhotoSwipe**
   - Pros: Battle-tested, 11k+ stars, mobile-optimized, swipe gestures
   - Cons: Not React-native, needs wrapper
   - Bundle: ~35kb gzipped
   
2. **lightGallery.js**
   - Pros: Feature-rich, plugins for zoom/video, 6k+ stars
   - Cons: Larger bundle, commercial license needed?
   - Bundle: ~50kb gzipped
   
3. **React Image Gallery**
   - Pros: Simple, React-native, 3.8k+ stars
   - Cons: Fewer features, less mobile-optimized
   - Bundle: ~20kb gzipped
   
4. **yet-another-react-lightbox**
   - Pros: Modern, TypeScript, hooks API, 800+ stars
   - Cons: Smaller community, newer (less battle-tested)
   - Bundle: ~25kb gzipped

**Evaluation Criteria:**
- [ ] **Performance** (bundle <50kb gzipped)
- [ ] **Mobile support** (swipe gestures, pinch-to-zoom)
- [ ] **Keyboard navigation** (arrows, ESC)
- [ ] **Accessibility** (ARIA, screen reader support)
- [ ] **TypeScript** (types included or available)
- [ ] **React 18 compatibility**
- [ ] **License** (commercial use OK, preferably MIT)
- [ ] **Maintenance** (updated in 2024-2025)
- [ ] **Features needed:**
  - Full-screen mode ✓
  - Next/Previous navigation ✓
  - Thumbnail strip (nice to have)
  - Keyboard shortcuts ✓
  - Touch/swipe gestures ✓
  - Image zoom ✓
  - Slide counter ✓

**Research Needed:**
- Test each library with our use case
- Check bundle size impact
- Test on mobile devices
- Review accessibility

**Recommendation Pending:** Need to test each option

**To Lock This:**
1. Install and test all 4 options
2. Build proof-of-concept with top 2
3. Test on mobile (iOS + Android)
4. Run Lighthouse audit
5. Choose based on criteria
6. Document decision here
7. Update TECH-STACK.md

---

### Database
**Status:** 🔄 Research in progress
**Priority:** HIGH (blocking)

**Options to Consider:**
1. **Supabase (PostgreSQL)**
   - Pros: Full backend (DB + auth + storage), generous free tier, great DX
   - Cons: Vendor lock-in, less control
   - Pricing: Free up to 500MB DB + 1GB storage
   
2. **PlanetScale (MySQL)**
   - Pros: Serverless, database branching, good DX
   - Cons: No free tier anymore (2023 change), MySQL not PostgreSQL
   - Pricing: Paid plans start at $29/month
   
3. **Vercel Postgres (Powered by Neon)**
   - Pros: Integrated with Vercel, serverless
   - Cons: Newer, pricing unclear, limited features vs Supabase
   - Pricing: Integrated with Vercel pricing
   
4. **Neon (PostgreSQL)**
   - Pros: Serverless Postgres, generous free tier, branching
   - Cons: Newer platform (less battle-tested)
   - Pricing: Free up to 3GB storage

**Evaluation Criteria:**
- [ ] **Pricing** (free tier for small projects)
- [ ] **Database type** (PostgreSQL preferred for JSON support)
- [ ] **Next.js integration** (official SDK/docs)
- [ ] **Edge compatibility** (query from edge functions)
- [ ] **File storage** (included or need separate service)
- [ ] **Real-time** (for admin dashboard - nice to have)
- [ ] **Connection pooling** (important for serverless)
- [ ] **Type safety** (TypeScript SDK or Prisma)
- [ ] **Backups** (automatic backups included)
- [ ] **Developer experience** (dashboard, logs, etc.)

**Data Needs:**
- Tables: decks, slides, leads
- Relationships: decks → slides (one-to-many)
- Query pattern: Read-heavy (95% reads, 5% writes)
- Scale: 100 decks, 5000 slides initially, 10k slides in a year
- Storage: <100MB database initially

**Research Needed:**
- Compare pricing for our scale
- Test TypeScript integration
- Check edge function compatibility
- Review migration tools (if we outgrow free tier)

**Recommendation Pending:** 
- Leaning toward Supabase (full backend solution, includes storage)
- But need to verify free tier limits work for us

**To Lock This:**
1. Calculate projected costs for our scale
2. Test TypeScript DX with each option
3. Check if file storage is included (affects storage decision)
4. Review vendor lock-in risks
5. Choose based on criteria
6. Document decision here
7. Update TECH-STACK.md

---

### File Storage
**Status:** 🔄 Research in progress
**Priority:** HIGH (blocking)

**Options to Consider:**
1. **Supabase Storage**
   - Pros: Integrated if using Supabase DB, simple API, CDN included
   - Cons: Vendor lock-in, limited features vs Cloudinary
   - Pricing: Free tier 1GB, $0.021/GB after
   
2. **Cloudinary**
   - Pros: Advanced optimization, transformations, CDN, mature
   - Cons: Pricing complexity, can get expensive, overkill?
   - Pricing: Free tier 25 credits/month (~25GB bandwidth)
   
3. **UploadThing**
   - Pros: Built for Next.js, simple pricing, great DX
   - Cons: Newer (less battle-tested), smaller ecosystem
   - Pricing: Free tier 2GB storage + 10GB bandwidth
   
4. **Vercel Blob Storage**
   - Pros: Integrated with Vercel, simple
   - Cons: Limited features, pricing unclear
   - Pricing: Integrated with Vercel pricing
   
5. **AWS S3 + CloudFront**
   - Pros: Industry standard, very cheap, scalable
   - Cons: Complex setup, AWS learning curve, not optimized for Next.js
   - Pricing: Extremely cheap ($0.023/GB storage, $0.085/GB transfer)

**Evaluation Criteria:**
- [ ] **Pricing** (free tier or cheap for 3-10GB)
- [ ] **Image optimization** (automatic WebP, resizing)
- [ ] **CDN** (global delivery, low latency)
- [ ] **PDF support** (need to store full pitch deck PDFs)
- [ ] **Next.js integration** (easy to use from API routes)
- [ ] **Upload API** (direct from client or server)
- [ ] **Security** (signed URLs, access control)
- [ ] **Developer experience** (simple API, good docs)
- [ ] **Migration** (easy to move if we outgrow)

**Storage Needs:**
- Cover images: 100 decks × 2MB = 200MB
- Slide images: 100 decks × 20 slides × 1MB = 2GB
- PDFs: 100 decks × 5MB = 500MB
- **Total:** ~3GB initially
- **Bandwidth:** Estimate 100GB/month (with CDN caching)

**Research Needed:**
- Calculate costs for our scale
- Test upload/download speed
- Check image optimization features
- Review Next.js integration examples

**Recommendation Pending:**
- If using Supabase DB → likely Supabase Storage (simplicity)
- If NOT using Supabase → UploadThing or AWS S3

**Decision Dependencies:** Should lock Database first (affects this decision)

**To Lock This:**
1. Lock database decision first
2. Calculate costs for our needs
3. Test upload process with top 2 options
4. Test image optimization (WebP conversion)
5. Choose based on criteria
6. Document decision here
7. Update TECH-STACK.md

---

### Authentication
**Status:** 🔄 Research in progress
**Priority:** MEDIUM (not blocking MVP)

**Options to Consider:**
1. **Supabase Auth**
   - Pros: Integrated if using Supabase DB, social login, magic links
   - Cons: Vendor lock-in
   - Pricing: Included in Supabase free tier
   
2. **NextAuth.js / Auth.js**
   - Pros: Open-source, flexible, many providers, no vendor lock-in
   - Cons: More complex setup, middleware can be tricky
   - Pricing: Free (self-hosted)
   
3. **Clerk**
   - Pros: Beautiful UI, easy setup, feature-rich, great DX
   - Cons: Paid (free tier limited to 10k MAU)
   - Pricing: Free up to 10k MAU, then $25/month
   
4. **Lucia Auth**
   - Pros: Lightweight, TypeScript-first, framework agnostic
   - Cons: More manual setup, smaller community
   - Pricing: Free (library only)

**Evaluation Criteria:**
- [ ] **Next.js App Router** (must support)
- [ ] **Pricing** (free for 1-2 admin users)
- [ ] **Social login** (Google, GitHub - nice to have)
- [ ] **Email/password** (must have)
- [ ] **Session management**
- [ ] **TypeScript support**
- [ ] **Middleware** (protect routes easily)
- [ ] **Developer experience**

**Auth Needs:**
- Simple: 1-2 admin users initially
- Routes to protect: `/admin/*`
- No public user accounts needed
- Maybe expand to user accounts later (favorites, etc.)

**Research Needed:**
- Test App Router middleware integration
- Review session management
- Check migration path if we need to scale

**Recommendation Pending:**
- If using Supabase → Supabase Auth (simplicity)
- If NOT using Supabase → NextAuth.js (flexibility) or Clerk (DX)

**Decision Dependencies:** Should lock Database first (affects this decision)

**To Lock This:**
1. Lock database decision first
2. Test middleware with top 2 options
3. Build simple login flow with each
4. Choose based on criteria
5. Document decision here
6. Update TECH-STACK.md

---

## Decision Making Process

### How to Lock a Technology:

1. **Research Phase**
   - Read documentation for each option
   - Check GitHub stars, issues, last commit
   - Review pricing thoroughly
   - Search for "X vs Y" comparisons
   - Read recent discussions (Reddit, Twitter, etc.)

2. **Testing Phase** (for critical choices)
   - Install top 2-3 options
   - Build small proof-of-concept
   - Test on mobile (if relevant)
   - Run performance benchmarks
   - Check bundle size impact

3. **Evaluation Phase**
   - Score each option against criteria
   - Consider future needs (scaling, features)
   - Factor in team familiarity
   - Think about migration difficulty

4. **Decision Phase**
   - Choose ONE option
   - No hedging ("we'll use X but maybe Y later")
   - Commit to the choice

5. **Documentation Phase**
   - Fill out this template
   - Update TECH-STACK.md
   - Update CONTEXT.md
   - Commit changes

6. **Lock Phase**
   - Mark as ✅ LOCKED
   - Add lock date
   - Never revisit unless critical issue

---

## When to Reconsider a Locked Decision

**Only in these cases:**
1. **Security vulnerability** (library is compromised)
2. **Abandonment** (library no longer maintained, critical bugs unfixed)
3. **Showstopper bug** (library cannot support our use case)
4. **Major cost issue** (pricing model changes, becomes unaffordable)

**Process for changing:**
1. Document the issue in `.ai/CONTEXT.md`
2. Get human approval
3. Remove ALL code using old tech
4. Update this document with new rationale
5. Update TECH-STACK.md
6. Log in CHANGELOG.md

**Never change because:**
- ❌ "I found a cooler library"
- ❌ "This has more stars on GitHub"
- ❌ "I prefer library X over Y"
- ❌ "This is more popular now"

---

## Version History

**v1.0** - January 21, 2026 - Initial decisions documented

---

**This document explains WHY, TECH-STACK.md shows WHAT.**
