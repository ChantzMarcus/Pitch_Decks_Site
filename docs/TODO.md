# Film Pitch Deck Showcase - TODO

**Last Updated:** January 21, 2026
**Status Key:** 🔄 In Progress | ⏸️ Blocked | ✅ Done | 📋 Todo

---

## 🚨 Current Sprint - Foundation Setup

### Phase 1: Documentation & Planning ✅
- [x] Create `.ai/RULES.md` - ✅ Completed Jan 21, 2026
- [x] Create `.ai/CONTEXT.md` - ✅ Completed Jan 21, 2026
- [x] Create `.ai/TODO.md` - ✅ Completed Jan 21, 2026
- [x] Create `.ai/ARCHITECTURE.md` - ✅ Completed Jan 21, 2026
- [x] Create `docs/TECH-STACK.md` - ✅ Completed Jan 21, 2026
- [x] Create `docs/DECISIONS.md` - ✅ Completed Jan 21, 2026
- [x] Create `docs/CHANGELOG.md` - ✅ Completed Jan 21, 2026
- [x] Create `README.md` - ✅ Completed Jan 21, 2026

---

## Phase 2: Technology Decisions 🔄

**Priority:** HIGH - Must complete before coding

### Core Feature Technologies (Must Lock First)

- [ ] 📋 **Image Gallery/Lightbox Library** - Dependencies: None
  - Research options: PhotoSwipe, lightGallery.js, React Image Gallery, yet-another-react-lightbox
  - Criteria: Bundle size, accessibility, mobile gestures, keyboard nav, TypeScript support
  - Lock in: `docs/TECH-STACK.md`
  - Document why: `docs/DECISIONS.md`
  - **Assignee:** Next agent to work on project
  - **Estimated time:** 1-2 hours research

- [ ] 📋 **Database** - Dependencies: None
  - Research options: Supabase (PostgreSQL), PlanetScale (MySQL), Vercel Postgres, Neon
  - Criteria: Free tier, Next.js integration, file storage capability, edge compatibility
  - Lock in: `docs/TECH-STACK.md`
  - Document why: `docs/DECISIONS.md`
  - **Assignee:** Next agent to work on project
  - **Estimated time:** 1-2 hours research

- [ ] 📋 **File Storage** - Dependencies: Database decision
  - Research options: Supabase Storage, Cloudinary, UploadThing, Vercel Blob Storage
  - Criteria: Pricing, image optimization, PDF support, CDN, Next.js integration
  - Lock in: `docs/TECH-STACK.md`
  - Document why: `docs/DECISIONS.md`
  - **Assignee:** Next agent to work on project
  - **Estimated time:** 1 hour research

### UI Enhancement Technologies (Can Lock Later)

- [ ] 📋 **Component Library** - Dependencies: None
  - Research options: Shadcn/ui, Radix UI, Headless UI
  - Criteria: TypeScript support, accessibility, Tailwind integration, customization
  - Lock in: `docs/TECH-STACK.md`
  - Document why: `docs/DECISIONS.md`
  - **Assignee:** Any agent
  - **Estimated time:** 1 hour research

- [ ] 📋 **Authentication** - Dependencies: Database decision
  - Research options: Supabase Auth, NextAuth.js, Clerk, Lucia Auth
  - Criteria: Next.js App Router support, pricing, social login, ease of use
  - Lock in: `docs/TECH-STACK.md`
  - Document why: `docs/DECISIONS.md`
  - **Assignee:** Any agent
  - **Estimated time:** 1 hour research

---

## Phase 3: Project Initialization ⏸️

**Blocked until:** Core technologies locked (Image gallery, Database, Storage)

- [ ] 📋 Initialize Next.js 15 project - Dependencies: Tech stack locked
  - Command: `npx create-next-app@latest film-pitch-showcase`
  - Options: TypeScript ✓, Tailwind CSS ✓, App Router ✓, src/ directory ✓
  - Files changed: Creates project structure
  - Update: `.ai/CONTEXT.md`, `docs/CHANGELOG.md`

- [ ] 📋 Configure TypeScript strict mode - Dependencies: Project initialized
  - Update: `tsconfig.json`
  - Enable: strict, noUncheckedIndexedAccess, noImplicitOverride
  - Files changed: `tsconfig.json`

- [ ] 📋 Set up Tailwind config with custom theme - Dependencies: Project initialized
  - Add custom colors: charcoal, paper, accent-indigo (from Hero.tsx reference)
  - Add custom fonts: display font, body font
  - Files changed: `tailwind.config.ts`

- [ ] 📋 Install locked dependencies - Dependencies: Tech stack locked, project initialized
  - Core: framer-motion, react-hook-form, zod
  - Image: [Locked lightbox library]
  - Database: [Locked database client]
  - Storage: [Locked storage client]
  - Component: [Locked component library]
  - Files changed: `package.json`

- [ ] 📋 Set up environment variables - Dependencies: Database/storage accounts created
  - Create: `.env.local`
  - Add: Database URL, Storage keys, API keys
  - Update: `.env.example` (template for other devs)
  - Files changed: `.env.local`, `.env.example`
  - ⚠️ Never commit `.env.local`

---

## Phase 4: Database Setup ⏸️

**Blocked until:** Database technology locked, project initialized

- [ ] 📋 Create database account - Dependencies: Database choice locked
  - Platform: [Locked database provider]
  - Project name: film-pitch-showcase
  - Save credentials to: `.env.local`

- [ ] 📋 Design database schema - Dependencies: Database account created
  - Tables: decks, slides, leads
  - Relationships: decks → slides (one-to-many)
  - Update: `docs/API.md` with schema
  - Files changed: Create `src/lib/db/schema.ts`

- [ ] 📋 Create database migrations - Dependencies: Schema designed
  - Create: `decks` table
  - Create: `slides` table
  - Create: `leads` table
  - Files changed: Migration files (depends on database choice)

- [ ] 📋 Set up database client - Dependencies: Database created
  - Create: `src/lib/db/client.ts`
  - Export: Typed client
  - Files changed: `src/lib/db/client.ts`, `src/lib/db/index.ts`

- [ ] 📋 Create database query functions - Dependencies: Database client set up
  - Create: `src/lib/db/queries.ts`
  - Functions: getAllDecks, getDeckById, createLead, etc.
  - Files changed: `src/lib/db/queries.ts`

---

## Phase 5: File Storage Setup ⏸️

**Blocked until:** Storage technology locked, project initialized

- [ ] 📋 Create storage account/bucket - Dependencies: Storage choice locked
  - Platform: [Locked storage provider]
  - Bucket name: pitch-deck-images
  - Configure: Public read access, CORS

- [ ] 📋 Set up storage client - Dependencies: Storage account created
  - Create: `src/lib/storage/client.ts`
  - Export: Upload, download, delete functions
  - Files changed: `src/lib/storage/client.ts`

- [ ] 📋 Create image upload utilities - Dependencies: Storage client set up
  - Create: `src/lib/storage/upload.ts`
  - Functions: uploadImage, optimizeImage, deleteImage
  - Support: PNG, JPG, WebP, PDF
  - Files changed: `src/lib/storage/upload.ts`

---

## Phase 6: Core Components ⏸️

**Blocked until:** Project initialized, locked component library installed

- [ ] 📋 Create layout components - Dependencies: Project initialized
  - Create: `src/components/layout/Header.tsx`
  - Create: `src/components/layout/Footer.tsx`
  - Create: `src/app/layout.tsx`
  - Files changed: Layout components

- [ ] 📋 Build Hero component - Dependencies: Layout created
  - Reference: Existing Hero.tsx design
  - Animation: Framer Motion fade-in
  - CTA: "View Our Projects" button
  - Files changed: `src/components/Hero.tsx`

- [ ] 📋 Build DeckCard component - Dependencies: Layout created
  - Display: Cover image, title, genre tags
  - Hover: Show logline, slide count
  - Link: To individual deck page
  - Files changed: `src/components/DeckCard.tsx`

- [ ] 📋 Build DeckGrid component - Dependencies: DeckCard created
  - Layout: Responsive grid (1 col mobile, 2 tablet, 3 desktop)
  - Animation: Stagger fade-in on scroll
  - Empty state: "No projects found"
  - Files changed: `src/components/DeckGrid.tsx`

- [ ] 📋 Implement lightbox viewer - Dependencies: Locked lightbox library installed
  - Library: [Locked lightbox choice]
  - Features: Full-screen, keyboard nav, swipe gestures, zoom
  - Component: `src/components/Lightbox.tsx`
  - Files changed: Lightbox component

- [ ] 📋 Build lead capture form - Dependencies: React Hook Form + Zod installed
  - Fields: Name, email, company, message
  - Validation: Zod schema
  - Success: Thank you message
  - Files changed: `src/components/LeadForm.tsx`

---

## Phase 7: Pages ⏸️

**Blocked until:** Core components built

- [ ] 📋 Create home page - Dependencies: Hero, DeckGrid components
  - Route: `/`
  - Components: Hero, DeckGrid
  - Data: Fetch all decks
  - Files changed: `src/app/page.tsx`

- [ ] 📋 Create gallery page - Dependencies: DeckGrid component
  - Route: `/gallery`
  - Components: Header, DeckGrid, filters
  - Data: Fetch all decks with filters
  - Files changed: `src/app/gallery/page.tsx`

- [ ] 📋 Create individual deck page - Dependencies: Lightbox component
  - Route: `/deck/[id]`
  - Components: Deck info, lightbox, lead form
  - Data: Fetch deck by ID with slides
  - Files changed: `src/app/deck/[id]/page.tsx`

- [ ] 📋 Create API routes - Dependencies: Database queries created
  - Route: `/api/decks` (GET all decks)
  - Route: `/api/decks/[id]` (GET deck by ID)
  - Route: `/api/leads` (POST create lead)
  - Files changed: API route files

---

## Phase 8: Admin Panel ⏸️

**Blocked until:** Authentication locked, core features working

- [ ] 📋 Set up authentication - Dependencies: Auth choice locked
  - Provider: [Locked auth choice]
  - Routes: `/login`, `/logout`
  - Protected routes: `/admin/*`
  - Files changed: Auth components and middleware

- [ ] 📋 Create admin dashboard - Dependencies: Auth set up
  - Route: `/admin/dashboard`
  - Display: Stats, recent leads
  - Files changed: `src/app/admin/dashboard/page.tsx`

- [ ] 📋 Create deck upload page - Dependencies: Storage setup
  - Route: `/admin/decks/new`
  - Form: Title, logline, genre, slides upload
  - Files changed: `src/app/admin/decks/new/page.tsx`

- [ ] 📋 Create leads management page - Dependencies: Database set up
  - Route: `/admin/leads`
  - Display: Table of leads, export CSV
  - Files changed: `src/app/admin/leads/page.tsx`

---

## Phase 9: Polish & Optimization ⏸️

**Blocked until:** Core features working

- [ ] 📋 Add page transitions - Dependencies: Core pages built
  - Library: Framer Motion
  - Effect: Smooth fade between pages
  - Files changed: Layout and page components

- [ ] 📋 Optimize images - Dependencies: Images uploaded
  - Use: next/image component
  - Formats: WebP, AVIF
  - Lazy loading: Enabled
  - Files changed: Image components

- [ ] 📋 Add SEO metadata - Dependencies: Pages created
  - Title tags, descriptions, Open Graph
  - Sitemap.xml, robots.txt
  - Files changed: Layout, metadata files

- [ ] 📋 Performance audit - Dependencies: Site functional
  - Run: Lighthouse
  - Target: >90 score
  - Fix: Any issues found

---

## Phase 10: Deployment ⏸️

**Blocked until:** All features working, tests passing

- [ ] 📋 Create Vercel project - Dependencies: Code ready
  - Connect: GitHub repo
  - Configure: Environment variables
  - Deploy: Production

- [ ] 📋 Set up custom domain (optional) - Dependencies: Deployed
  - Domain: [TBD]
  - DNS: Configure
  - SSL: Auto via Vercel

- [ ] 📋 Monitor analytics - Dependencies: Deployed
  - Tool: Vercel Analytics (or chosen tool)
  - Track: Page views, form submissions

---

## 📦 Completed Tasks

### January 21, 2026
- ✅ Created documentation system (RULES, CONTEXT, TODO, ARCHITECTURE)
- ✅ Created tech decision system (TECH-STACK, DECISIONS)
- ✅ Created changelog and README
- ✅ Locked core technologies (Next.js, TypeScript, Tailwind, Framer Motion, React Hook Form, Zod)
- **Files created:** All `.ai/` and `docs/` documentation files

---

## 🗑️ Deprecated Tasks

(Tasks that are no longer relevant - kept for history)

**None yet**

---

## 📌 Task Management Rules

### When Starting a Task:
1. Move it from 📋 to 🔄
2. Add your name as assignee
3. Add start date
4. Update `.ai/CONTEXT.md` with current focus

### When Completing a Task:
1. Change 🔄 to ✅
2. Add completion date
3. List files changed
4. Move to "Completed Tasks" section
5. Update `.ai/CONTEXT.md`
6. Log in `docs/CHANGELOG.md`
7. Mark next task as 🔄

### When Blocked:
1. Change to ⏸️
2. Document why in `.ai/CONTEXT.md` under "🚫 Blocked"
3. Move to next unblocked task

### Never:
- ❌ Create a new TODO file
- ❌ Create separate task lists
- ❌ Leave tasks unmarked after completion
- ❌ Skip updating CONTEXT.md

---

**Next Action Required:** Lock image gallery, database, and storage technologies to unblock Phase 3.
