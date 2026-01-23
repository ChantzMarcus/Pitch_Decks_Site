# AI Agent Rules - Film Pitch Deck Showcase

## 🚨 CRITICAL RULES - NEVER VIOLATE

### Documentation Rules

**1. ONE DOCUMENT PER PURPOSE**
- `.ai/ARCHITECTURE.md` = ONLY architecture document
- `docs/TECH-STACK.md` = ONLY technology decisions document
- `.ai/TODO.md` = ONLY task list

**NEVER create:**
- ❌ `architecture-v2.md`, `architecture-updated.md`, `new-architecture.md`
- ❌ `tech-stack-final.md`, `updated-tech.md`
- ❌ `tasks.md`, `backlog.md`, `todo-new.md`
- ❌ Any duplicate or alternative versions

**2. UPDATE, DON'T CREATE**
- When architecture changes → UPDATE `.ai/ARCHITECTURE.md`
- When tech changes → UPDATE `docs/TECH-STACK.md`
- When tasks change → UPDATE `.ai/TODO.md`

---

## 📋 Mandatory Workflow - EVERY TIME

### BEFORE Starting ANY Work:

```
1. git pull origin main
2. Read .ai/CONTEXT.md
3. Read .ai/TODO.md (find your task)
4. Read docs/TECH-STACK.md (verify locked technologies)
5. Read .ai/ARCHITECTURE.md (understand system)
```

### AFTER Completing ANY Work:

```
1. Update .ai/CONTEXT.md (what changed)
2. Update .ai/TODO.md (mark task complete)
3. Update docs/CHANGELOG.md (log the change)
4. git commit with descriptive message
5. git push origin main
```

---

## 🔒 Technology Decision Protocol

### Before Installing ANY Library or Package:

**Step 1: Check `docs/TECH-STACK.md`**
```
Does this category have a locked choice?
├─ YES → Use that technology (STOP, don't research)
└─ NO → Continue to Step 2
```

**Step 2: Check Research Phase Status**
```
Look at TECH-STACK.md header:
├─ Research Phase: LOCKED 🔒 → Ask human to unlock
└─ Research Phase: ACTIVE 🔄 → Proceed to Step 3
```

**Step 3: Research and Lock**
```
1. Research options (use any available resources)
2. Choose ONE option
3. Lock in TECH-STACK.md
4. Document WHY in DECISIONS.md
5. Update CONTEXT.md
6. NEVER revisit this decision
```

---

## 🚫 Forbidden Actions

### NEVER Do These Things:

❌ Create alternative implementations side-by-side
❌ Install libraries not in `TECH-STACK.md` (after research phase locked)
❌ Create `components-new/` alongside `components/`
❌ Create `src-v2/` or any version folders
❌ Say "Let me try a different approach" without removing old code first
❌ Research alternatives after a technology is locked
❌ Create branches of documentation
❌ Skip updating CONTEXT.md or TODO.md

### If You Catch Yourself Doing This:

**STOP**
1. Read `TECH-STACK.md`
2. Use the locked technology
3. If genuinely blocked, document in `CONTEXT.md` under "🚫 Blocked"

---

## 📁 File Ownership Map

| Purpose | Single Source File | NEVER Create |
|---------|-------------------|--------------|
| **Agent Rules** | `.ai/RULES.md` | `rules-updated.md`, `new-rules.md` |
| **Tech Decisions** | `docs/TECH-STACK.md` | `tech-stack-v2.md`, `technologies.md` |
| **Why We Chose** | `docs/DECISIONS.md` | `rationale.md`, `choices.md` |
| **Architecture** | `.ai/ARCHITECTURE.md` | `arch-v2.md`, `system-design.md` |
| **Current State** | `.ai/CONTEXT.md` | `status.md`, `state.md`, `current.md` |
| **Task List** | `.ai/TODO.md` | `tasks.md`, `backlog.md`, `todos.md` |
| **Change Log** | `docs/CHANGELOG.md` | `changes.md`, `history.md` |
| **API Docs** | `docs/API.md` | `api-routes.md`, `endpoints.md` |

---

## 🔄 Cross-Machine Sync Protocol

### Working on Different Machines:

**Every Time You Start Work:**
```bash
1. git pull origin main
2. Read .ai/CONTEXT.md (what's the current state?)
3. Check .ai/TODO.md (what's next?)
```

**Every Time You Finish Work:**
```bash
1. Update all relevant docs
2. git add .
3. git commit -m "descriptive message"
4. git push origin main
```

**NEVER assume you know the current state** - always read CONTEXT.md first.

---

## 🎯 Code Organization Rules

### ONE Implementation Per Feature

**WRONG:**
```
components/
├── Gallery.tsx
├── GalleryNew.tsx
├── GalleryUpdated.tsx
└── gallery-v2/
```

**RIGHT:**
```
components/
└── Gallery.tsx  (updated in place)
```

### Removing Old Code

**When updating architecture:**
1. DELETE old implementation files completely
2. Don't comment out old code
3. Don't create backups in the repo
4. Git history preserves everything

---

## 🎬 Project-Specific Rules

### For This Film Pitch Deck Project:

**1. Component Library**
- Once chosen, use ONLY that library
- Don't mix Shadcn + Radix + Headless UI
- One choice, locked forever

**2. Image Gallery/Lightbox**
- One library only (PhotoSwipe OR lightGallery OR React Image Gallery)
- No switching mid-project
- No "let me try another one"

**3. Database**
- One database (Supabase OR PlanetScale OR Vercel Postgres)
- No multiple ORMs
- No alternative database clients

**4. Animations**
- Framer Motion is locked ✅
- Additional libraries only with explicit approval
- Document in TECH-STACK.md

**5. Forms**
- React Hook Form is locked ✅
- Zod for validation is locked ✅
- No alternatives

---

## 🎨 Design System Consistency

### Color Palette
- Define once in `tailwind.config.js`
- Use ONLY these colors throughout
- No hardcoded hex values in components

### Typography
- Define font families once
- Use ONLY defined font classes
- No inline font styles

### Spacing
- Use Tailwind spacing scale
- No arbitrary values unless absolutely necessary
- Consistent spacing patterns

---

## 📝 Documentation Standards

### Commit Messages

**Format:**
```
<type>: <description>

<optional body>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance
- `lock:` Locking a technology decision

**Examples:**
```
lock: image gallery → PhotoSwipe
feat: add pitch deck lightbox viewer
fix: mobile swipe gesture in gallery
docs: update architecture with new database schema
```

### Code Comments

**DO Comment:**
- Why something is done a certain way
- Complex business logic
- Workarounds for known issues

**DON'T Comment:**
- What the code does (code should be self-explanatory)
- Obvious things
- Commented-out code (delete it)

---

## 🧪 Testing Before Committing

### Pre-Commit Checklist:

- [ ] Code compiles (`npm run build` or `pnpm build`)
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Tested locally
- [ ] Updated relevant docs (CONTEXT.md, TODO.md, etc.)
- [ ] Descriptive commit message

---

## 🆘 When Something Goes Wrong

### If You Created Conflicting Code:

1. **Stop immediately**
2. Identify which implementation is correct (check TECH-STACK.md)
3. Delete all alternative implementations
4. Update CONTEXT.md explaining what happened
5. Update TODO.md with cleanup task if needed

### If Tech Stack Needs to Change:

1. **Don't change it yourself**
2. Document the issue in CONTEXT.md under "🚫 Blocked"
3. Explain why the locked tech won't work
4. Wait for human approval
5. If approved:
   - Remove ALL old implementation
   - Update TECH-STACK.md
   - Update DECISIONS.md with new rationale
   - Update CHANGELOG.md

---

## 🎯 Success Metrics

### You're Following the Rules If:

✅ Only ONE architecture document exists
✅ Only ONE tech stack document exists
✅ Every technology has ONE locked choice
✅ No duplicate implementations
✅ CONTEXT.md is always current
✅ TODO.md shows real progress
✅ All commits reference what docs were updated

### Warning Signs You're Breaking Rules:

⚠️ Multiple files with similar names
⚠️ Directories with version numbers (v2, new, updated)
⚠️ Multiple libraries for the same purpose
⚠️ Outdated CONTEXT.md
⚠️ Uncommitted changes piling up

---

## 📖 How to Use This Document

**For Human:**
- Give this to every agent working on the project
- Reference this when agents go off track
- Update only if fundamental workflow changes

**For Agents:**
- Read this FIRST before any work
- Follow EVERY rule
- When in doubt, ask human rather than guess
- This document overrides other instructions

---

## 🔄 Version

**Version:** 1.0
**Last Updated:** January 2026
**Status:** Active

**This document itself follows the same rules:**
- Never create `RULES-v2.md`
- Update THIS file in place
- Log changes in CHANGELOG.md

---

**Remember: Single source of truth prevents chaos. Follow these rules religiously.**
