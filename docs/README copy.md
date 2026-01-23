# Film Pitch Deck Showcase

A professional Next.js website showcasing film and TV pitch decks with an elegant gallery interface, full-screen lightbox viewer, and lead capture system.

**Status:** 🚧 In Development - Documentation Phase  
**Version:** 0.1.0  
**Last Updated:** January 21, 2026

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a showcase website for film and TV pitch decks, designed to present projects in a professional, visually compelling way. Visitors can browse pitch decks in a gallery, view individual slides in a full-screen lightbox, and express interest through a lead capture form.

### Target Users
- **Primary:** Film producers, investors, studio executives
- **Secondary:** Production companies, film enthusiasts  
- **Admin:** Content managers who upload and manage pitch decks

### Key Goals
- **Professional presentation** of pitch deck materials
- **Fast, responsive** experience on all devices
- **Easy content management** through admin panel
- **Lead generation** from interested parties
- **SEO optimized** for discoverability

---

## Features

### Public Features
- ✅ **Gallery View** - Browse all pitch decks in a responsive grid
- ✅ **Individual Deck Pages** - Detailed view with logline, genre, comparable titles
- ✅ **Lightbox Viewer** - Full-screen slide browsing with keyboard/touch navigation
- ✅ **Lead Capture Form** - Collect contact info from interested producers/investors
- ✅ **Filtering** - Search and filter decks by genre, status, etc.
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop

### Admin Features (Protected)
- 🔄 **Authentication** - Secure admin login
- 🔄 **Upload Decks** - Add new pitch decks with metadata and slides
- 🔄 **Manage Content** - Edit deck information, reorder slides
- 🔄 **View Leads** - See all contact form submissions
- 🔄 **Analytics Dashboard** - Track deck views and lead conversions

**Legend:** ✅ Planned | 🔄 In Progress | ⏸️ On Hold | ❌ Cancelled

---

## Tech Stack

### Core (Locked ✅)
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (Free, MIT license)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

### Pending Decisions (Research Phase 🔄)
- **Component Library:** Researching Shadcn/ui, Radix UI, Headless UI
- **Image Gallery/Lightbox:** Researching PhotoSwipe, lightGallery, yet-another-react-lightbox
- **Database:** Researching Supabase, PlanetScale, Vercel Postgres, Neon
- **File Storage:** Researching Supabase Storage, Cloudinary, UploadThing
- **Authentication:** Researching Supabase Auth, NextAuth.js, Clerk

**See [`docs/TECH-STACK.md`](docs/TECH-STACK.md) for full details and decision criteria.**

---

## Project Structure

```
film-pitch-showcase/
├── .ai/                      # AI Agent Documentation
│   ├── RULES.md              # Agent workflow rules (READ FIRST)
│   ├── CONTEXT.md            # Current project state
│   ├── TODO.md               # Task list
│   └── ARCHITECTURE.md       # System design
│
├── docs/                     # Project Documentation
│   ├── TECH-STACK.md         # Technology decisions
│   ├── DECISIONS.md          # Decision rationale
│   ├── API.md                # API documentation (TBD)
│   └── CHANGELOG.md          # Change log
│
├── src/                      # Application Source (Not created yet)
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   ├── lib/                  # Utilities and services
│   └── types/                # TypeScript types
│
├── public/                   # Static assets (Not created yet)
├── README.md                 # This file
└── package.json              # Dependencies (Not created yet)
```

**Current Status:** Documentation phase complete, awaiting technology decisions before initializing Next.js project.

---

## Getting Started

### Prerequisites
- Node.js 20.x LTS or higher
- pnpm (recommended) or npm
- Git

### Installation

**⚠️ Note:** The Next.js project hasn't been initialized yet. We're currently in the research phase, making technology decisions.

Once technologies are locked, run:
```bash
# Clone the repository
git clone https://github.com/yourusername/film-pitch-showcase.git
cd film-pitch-showcase

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to view the app.

### Environment Variables

```bash
# Database
DATABASE_URL=your_database_url

# File Storage
STORAGE_KEY=your_storage_key
STORAGE_SECRET=your_storage_secret

# Authentication (Admin)
AUTH_SECRET=your_auth_secret
ADMIN_EMAIL=admin@example.com

# Optional: Analytics, Email, etc.
```

See `.env.example` for full list (file will be created after tech stack is locked).

---

## Documentation

### For Developers

**Essential Reading (in order):**
1. **[`.ai/RULES.md`](.ai/RULES.md)** ← **START HERE** - Agent workflow and rules
2. **[`.ai/CONTEXT.md`](.ai/CONTEXT.md)** - Current project state
3. **[`.ai/TODO.md`](.ai/TODO.md)** - What needs to be done
4. **[`.ai/ARCHITECTURE.md`](.ai/ARCHITECTURE.md)** - System design

### For Technology Research
5. **[`docs/TECH-STACK.md`](docs/TECH-STACK.md)** - Technology decisions
6. **[`docs/DECISIONS.md`](docs/DECISIONS.md)** - Why we chose each tech

### For History & Changes
7. **[`docs/CHANGELOG.md`](docs/CHANGELOG.md)** - All project changes

---

## Development Workflow

### For AI Agents Working on This Project

**MANDATORY: Read `.ai/RULES.md` FIRST**

**Before starting work:**
1. `git pull origin main`
2. Read `.ai/CONTEXT.md` (current state)
3. Read `.ai/TODO.md` (find your task)
4. Check `docs/TECH-STACK.md` (verify locked technologies)

**After completing work:**
1. Update `.ai/CONTEXT.md` (what changed)
2. Update `.ai/TODO.md` (mark task complete)
3. Update `docs/CHANGELOG.md` (log the change)
4. Commit with descriptive message
5. `git push origin main`

**Golden Rule:** ONE implementation per feature. Never create `components-v2/` or `architecture-updated.md`. Update files in place.

### For Humans

**Starting a new feature:**
1. Review current state in `.ai/CONTEXT.md`
2. Add task to `.ai/TODO.md`
3. Brief the agent with relevant documentation

**Reviewing agent work:**
1. Check if `.ai/CONTEXT.md` was updated
2. Check if `docs/CHANGELOG.md` was updated
3. Verify only locked technologies were used (see `docs/TECH-STACK.md`)

---

## Project Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Create documentation system
- [x] Lock core technologies (Next.js, TypeScript, Tailwind, etc.)
- [x] Define architecture
- [x] Set up agent guardrails

### Phase 2: Technology Decisions 🔄 IN PROGRESS
- [ ] Lock image gallery/lightbox library
- [ ] Lock database platform
- [ ] Lock file storage solution
- [ ] Lock component library
- [ ] Lock authentication solution

### Phase 3: Project Setup ⏸️ BLOCKED
*Blocked until Phase 2 complete*
- [ ] Initialize Next.js 15 project
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind CSS
- [ ] Install all locked dependencies

### Phase 4: Core Features ⏸️ BLOCKED
- [ ] Build gallery view
- [ ] Implement lightbox viewer
- [ ] Create lead capture form
- [ ] Set up database schema

### Phase 5: Admin Panel ⏸️ BLOCKED
- [ ] Implement authentication
- [ ] Create admin dashboard
- [ ] Build deck upload interface
- [ ] Build lead management interface

### Phase 6: Polish & Deploy ⏸️ BLOCKED
- [ ] Animations and transitions
- [ ] Image optimization
- [ ] SEO implementation
- [ ] Performance audit
- [ ] Deploy to production

**See [`.ai/TODO.md`](.ai/TODO.md) for detailed task breakdown.**

---

## Current Status

**What's Done:**
- ✅ Complete documentation system
- ✅ Core technologies locked (Next.js, TypeScript, Tailwind, Framer Motion)
- ✅ Architecture defined
- ✅ Agent workflow established

**What's Next:**
- 🔄 Lock remaining technologies (database, storage, lightbox)
- ⏸️ Initialize Next.js project (blocked until technologies locked)
- ⏸️ Start building features (blocked until project initialized)

**Current Focus:** Making technology decisions for image gallery, database, and file storage.

---

## Contributing

### For AI Agents
1. **ALWAYS read `.ai/RULES.md` before starting**
2. Follow the workflow defined in that document
3. Use only locked technologies (no research after tech stack is locked)
4. Update all relevant documentation after changes
5. Commit descriptively

### For Humans
1. Review `.ai/CONTEXT.md` for current state
2. Add tasks to `.ai/TODO.md` before assigning to agents
3. Approve any technology changes (locked stack should stay locked)
4. Review agent work against documentation

### Rules for Everyone
- ❌ Never create alternative implementations
- ❌ Never create duplicate documentation files
- ❌ Never skip updating CONTEXT.md and CHANGELOG.md
- ✅ Always use locked technologies
- ✅ Always update documentation
- ✅ Always commit with clear messages

---

## Why This Documentation System?

This project uses an extensive documentation system to prevent common AI agent chaos:

**Problems we're solving:**
- ❌ Agents creating conflicting implementations (both X and Y library)
- ❌ Multiple architecture documents (architecture.md, arch-v2.md, final-arch.md)
- ❌ Different tech choices across sessions/machines
- ❌ No clear "source of truth" for current state
- ❌ Work getting lost between sessions

**Our solution:**
- ✅ Single source of truth for everything
- ✅ Locked technology decisions (can't change without process)
- ✅ Current state tracking (CONTEXT.md)
- ✅ Clear rules for agents (RULES.md)
- ✅ Change tracking (CHANGELOG.md)

**Result:** Any agent (or human) can pick up exactly where the last one left off, using the same technologies and architecture.

---

## License

[MIT](LICENSE) (or specify your license)

---

## Contact

**Project Maintainer:** [Your Name]
**Email:** [your.email@example.com]
**GitHub:** [@yourusername](https://github.com/yourusername)

---

## Acknowledgments

- **Next.js Team** - Amazing framework
- **Vercel** - Hosting and deployment
- **Anthropic** - AI assistance with documentation
- **Open Source Community** - All the great libraries we use

---

**Last Updated:** January 21, 2026  
**Next Milestone:** Lock all technology decisions and initialize Next.js project

**For questions or issues, please file a GitHub issue or check the documentation in `.ai/` and `docs/` folders.**
