# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Initial project setup and documentation system
- AI agent guardrails (`.ai/RULES.md`)
- Current context tracking (`.ai/CONTEXT.md`)
- Task management system (`.ai/TODO.md`)
- System architecture documentation (`.ai/ARCHITECTURE.md`)
- Technology stack tracking (`docs/TECH-STACK.md`)
- Decision rationale documentation (`docs/DECISIONS.md`)
- This changelog

### Locked
- Core framework: Next.js 15 (App Router)
- Language: TypeScript 5.x (strict mode)
- Styling: Tailwind CSS 3.x
- Animation: Framer Motion (MIT license, free)
- Forms: React Hook Form + Zod validation
- Deployment: Vercel

### Pending
- Component library decision (researching Shadcn/ui, Radix, Headless UI)
- Image gallery/lightbox library decision (HIGH PRIORITY)
- Database platform decision (HIGH PRIORITY)
- File storage solution decision (HIGH PRIORITY)
- Authentication solution decision
- Email service decision
- Analytics platform decision

---

## [0.1.0] - 2026-01-21

### Project Initialization

**Type:** Setup
**By:** Initial setup
**Date:** January 21, 2026

**Files Created:**
- `.ai/RULES.md` - Agent guardrails and workflow rules
- `.ai/CONTEXT.md` - Current project state tracking
- `.ai/TODO.md` - Single source of truth for tasks
- `.ai/ARCHITECTURE.md` - System design documentation
- `docs/TECH-STACK.md` - Technology decisions
- `docs/DECISIONS.md` - Decision rationale
- `docs/CHANGELOG.md` - This file
- `README.md` - Project overview

**Purpose:**
Establish single source of truth documentation system to prevent:
- Multiple conflicting implementations
- Duplicate documentation files
- Agent confusion across different machines
- Architectural drift

**What This Enables:**
- Any agent can read current state and continue work seamlessly
- Technology decisions are locked and cannot be changed without process
- All changes are tracked in one place
- Cross-machine consistency

---

## How to Use This Changelog

### After Making ANY Change:

1. **Add entry under `[Unreleased]`**
2. **Use these categories:**
   - `Added` - New features, files, functionality
   - `Changed` - Changes to existing functionality
   - `Deprecated` - Features that will be removed
   - `Removed` - Removed features or files
   - `Fixed` - Bug fixes
   - `Locked` - Technology decisions that are now final
   - `Security` - Security-related changes

3. **Format:**
   ```markdown
   ### Category
   - Brief description - Files: [list] - By: [agent/human]
   ```

4. **Include WHY if not obvious:**
   ```markdown
   - Switched from X to Y because Z was causing performance issues
   ```

### Example Entries:

```markdown
### Added
- Lightbox component using PhotoSwipe - Files: `src/components/deck/Lightbox.tsx` - By: Agent-XYZ
- Database schema for decks and slides - Files: `src/lib/db/schema.ts` - By: Human

### Changed
- Updated gallery layout from 2 columns to 3 - Files: `src/components/DeckGrid.tsx` - By: Agent-ABC
- Reason: Better use of screen space on desktop

### Fixed
- Mobile swipe gestures not working in lightbox - Files: `src/components/deck/Lightbox.tsx` - By: Agent-XYZ
- Issue: Touch events were being blocked by parent container

### Locked
- Image gallery library: PhotoSwipe v5 - Reason: Best mobile support and accessibility
```

---

## Version Guidelines

**[Unreleased]** - Work in progress, not deployed
**[0.x.x]** - Pre-release versions (before launch)
**[1.0.0]** - First production release
**[1.x.x]** - Minor updates, new features
**[2.0.0+]** - Major versions (breaking changes)

---

## Change Categories Explained

### Added
New features, components, pages, functionality added to the project.
Example: "Gallery filtering by genre"

### Changed
Modifications to existing features without removing them.
Example: "Updated hero animation timing from 0.5s to 0.8s"

### Deprecated
Features marked for removal in future versions (warnings added).
Example: "Old API endpoint /api/v1/decks (use /api/decks instead)"

### Removed
Features, files, or functionality completely removed.
Example: "Removed unused animation library (replaced with Framer Motion)"

### Fixed
Bug fixes, corrections, error resolutions.
Example: "Fixed form validation not triggering on submit"

### Locked
Technology decisions that are now final (from TECH-STACK.md).
Example: "Database: Supabase (PostgreSQL)"

### Security
Security-related updates, patches, fixes.
Example: "Updated dependencies to patch security vulnerabilities"

---

## Integration with Other Docs

This changelog works together with:
- **`.ai/CONTEXT.md`** - Shows current state, this shows history
- **`.ai/TODO.md`** - Shows planned work, this shows completed work
- **`docs/TECH-STACK.md`** - Shows locked decisions, this logs when they were locked

**Workflow:**
1. Task completed in TODO.md
2. Files changed
3. Context updated in CONTEXT.md
4. Change logged here in CHANGELOG.md
5. Commit with descriptive message

---

## Commit Message Reference

When committing, reference this changelog:
```
feat: add gallery filtering by genre

- Added genre filter component
- Updated API to support genre queries
- See CHANGELOG.md [Unreleased] section
```

---

**Keep this file updated after every significant change!**
