# 📖 Quick Start Guide - Film Pitch Deck Showcase

**Created:** January 21, 2026  
**Status:** Documentation Complete - Ready for Tech Decisions

---

## 🎯 What You Just Got

A complete **single source of truth** documentation system for your Film Pitch Deck Showcase project. This prevents AI agents from creating chaos (conflicting implementations, duplicate docs, different tech choices).

---

## 📁 File Structure Overview

```
film-pitch-showcase/
├── .ai/                      # 🤖 AI Agent Command Center
│   ├── RULES.md              # ⚠️ START HERE - Agent guardrails
│   ├── CONTEXT.md            # 📊 Current project state (living doc)
│   ├── TODO.md               # ✅ Single task list
│   └── ARCHITECTURE.md       # 🏗️ System design (single source)
│
├── docs/                     # 📚 Project Documentation
│   ├── TECH-STACK.md         # 🔒 Technology decisions (what to use)
│   ├── DECISIONS.md          # 💡 Decision rationale (WHY we chose)
│   └── CHANGELOG.md          # 📝 All changes logged here
│
└── README.md                 # 📖 Project overview & entry point
```

---

## 🚀 How to Use This System

### Step 1: Set Up Your Project Folder

1. **Create your project folder:**
   ```bash
   mkdir film-pitch-showcase
   cd film-pitch-showcase
   ```

2. **Place these files** in the folder:
   - Copy the `.ai/` folder to your project root
   - Copy the `docs/` folder to your project root  
   - Copy `README.md` to your project root

3. **Initialize git** (important for syncing across machines):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: documentation system"
   ```

### Step 2: Lock Your Technology Decisions

**Current Status:** Core tech is locked (Next.js, TypeScript, Tailwind), but critical decisions are pending.

**What needs to be decided (HIGH PRIORITY):**
1. **Image Gallery/Lightbox** - PhotoSwipe vs lightGallery vs React Image Gallery
2. **Database** - Supabase vs PlanetScale vs Vercel Postgres vs Neon
3. **File Storage** - Supabase Storage vs Cloudinary vs UploadThing

**How to lock a decision:**

1. Open `docs/TECH-STACK.md`
2. Find the category (e.g., "Image Gallery / Lightbox")
3. Research the options listed
4. Choose ONE
5. Update the file:
   ```markdown
   - **Status:** 🔄 RESEARCH IN PROGRESS
   + **Status:** ✅ LOCKED
   + **Choice:** PhotoSwipe v5
   + **Install:** `pnpm add photoswipe`
   ```
6. Document WHY in `docs/DECISIONS.md`
7. Update `docs/CHANGELOG.md`
8. Commit: `git commit -m "lock: image gallery → PhotoSwipe"`

### Step 3: Work with AI Agents

**Give agents these instructions:**

```
Before starting work, read these files IN ORDER:
1. .ai/RULES.md (follow ALL rules)
2. .ai/CONTEXT.md (current state)
3. .ai/TODO.md (find your task)
4. docs/TECH-STACK.md (verify locked technologies)

After completing work:
1. Update .ai/CONTEXT.md (what changed)
2. Update .ai/TODO.md (mark task complete)
3. Update docs/CHANGELOG.md (log the change)
4. Commit with descriptive message
```

**Golden Rule for Agents:**
- ONE implementation per feature
- Never create `architecture-v2.md`, `components-new/`, or any alternatives
- Update existing files, don't create new ones

### Step 4: Working Across Multiple Machines

**Every time you switch machines or start a session:**

1. Pull latest: `git pull origin main`
2. Read `.ai/CONTEXT.md` (what's the current state?)
3. Read `.ai/TODO.md` (what's next?)

**After working:**
1. Update relevant docs
2. Commit: `git commit -m "descriptive message"`
3. Push: `git push origin main`

**Result:** Any machine has the exact same context and locked technologies.

---

## 📋 What Each File Does

### `.ai/RULES.md` ⚠️ START HERE
**Purpose:** Agent guardrails - prevents chaos

**Critical Rules:**
- ONE document per purpose (no alternatives)
- UPDATE existing files, don't create new ones
- Use ONLY locked technologies
- Always update CONTEXT.md and CHANGELOG.md after changes

**Read this first** before giving work to any agent.

### `.ai/CONTEXT.md` 📊
**Purpose:** Living document of current project state

**Shows:**
- Current phase (research, development, etc.)
- What's working, what's not
- What's being worked on right now
- Locked vs pending technology decisions
- Blocked items and questions

**Always check this** before starting work.

### `.ai/TODO.md` ✅
**Purpose:** Single task list (prevents multiple todo files)

**Contains:**
- All tasks organized by phase
- Dependencies between tasks
- Who's working on what
- Completed tasks (for history)

**Never create** a separate `tasks.md` or `backlog.md`.

### `.ai/ARCHITECTURE.md` 🏗️
**Purpose:** System design (single source of truth)

**Contains:**
- High-level architecture diagram
- Folder structure (the ONE structure)
- Data model / database schema
- Component hierarchy
- API design
- Performance targets

**Never create** `architecture-v2.md` or similar.

### `docs/TECH-STACK.md` 🔒
**Purpose:** Technology decisions (WHAT to use)

**Shows:**
- Locked technologies (use these, no alternatives)
- Pending decisions (research in progress)
- Install commands for each library

**This is the law** - once something is locked, use it.

### `docs/DECISIONS.md` 💡
**Purpose:** Decision rationale (WHY we chose)

**For each technology:**
- Options considered
- Evaluation criteria
- Final choice
- Rationale (why this over others)
- Locked date

**Prevents** "let me try a different library" syndrome.

### `docs/CHANGELOG.md` 📝
**Purpose:** Log ALL changes

**After any change:**
- Add entry under [Unreleased]
- Include what changed, files modified, who did it
- Use categories: Added, Changed, Fixed, Locked, etc.

**Keeps history** without cluttering other docs.

### `README.md` 📖
**Purpose:** Project overview (entry point for humans)

**Contains:**
- What the project is
- Features
- Tech stack summary
- How to get started
- Links to all other documentation

**First thing anyone sees** when opening the repo.

---

## ⚡ Common Workflows

### Starting a New Feature
1. Check `.ai/CONTEXT.md` (current state)
2. Add task to `.ai/TODO.md`
3. Give agent these files to read: RULES.md, CONTEXT.md, TODO.md, TECH-STACK.md
4. Agent builds the feature
5. Agent updates CONTEXT.md, TODO.md, CHANGELOG.md
6. Review and commit

### Locking a Technology Decision
1. Research options (listed in TECH-STACK.md)
2. Choose ONE option
3. Update TECH-STACK.md (change 🔄 to ✅)
4. Document WHY in DECISIONS.md
5. Update CONTEXT.md (increment locked count)
6. Log in CHANGELOG.md
7. Commit: `lock: [category] → [choice]`
8. Never revisit this decision

### Switching Machines
1. `git pull origin main`
2. Read CONTEXT.md (current state?)
3. Read TODO.md (what's next?)
4. Do work
5. Update docs
6. `git commit` and `git push`

### Reviewing Agent Work
1. Did they update CONTEXT.md? (should show what changed)
2. Did they update TODO.md? (task marked complete)
3. Did they update CHANGELOG.md? (change logged)
4. Did they use only locked technologies? (check TECH-STACK.md)
5. Did they create any alternative files? (should be NO)

---

## 🎯 Your Next Steps

**Immediate (Today):**
1. ✅ Copy these files to your project folder
2. ✅ Initialize git repository
3. ✅ Commit documentation system
4. 🔄 Start making technology decisions (database, storage, lightbox)

**This Week:**
1. Lock all HIGH PRIORITY technologies (see TECH-STACK.md)
2. Initialize Next.js 15 project (after tech is locked)
3. Set up database and storage accounts
4. Start building core features

**Check:**
- [ ] Files copied to project folder
- [ ] Git initialized
- [ ] Read RULES.md
- [ ] Understand the system
- [ ] Ready to make tech decisions

---

## 🆘 Troubleshooting

**Problem:** Agent created `architecture-v2.md`
**Solution:** Delete it, update `ARCHITECTURE.md` in place, remind agent of RULES.md

**Problem:** Agent used a library not in TECH-STACK.md
**Solution:** Check if category is locked. If yes, remove the code and use locked library. Remind agent of RULES.md

**Problem:** CONTEXT.md is outdated
**Solution:** Update it now, remind agents to update after changes

**Problem:** Multiple TODO files exist
**Solution:** Consolidate into `.ai/TODO.md`, delete others, remind agents

**Problem:** Can't remember current state
**Solution:** Read `.ai/CONTEXT.md` - that's literally its purpose

---

## 💡 Pro Tips

**For Humans:**
- Always read CONTEXT.md before assigning work
- Keep TECH-STACK.md locked as much as possible (prevents chaos)
- Use DECISIONS.md to remind yourself why you chose something
- CHANGELOG.md is your friend for finding when something changed

**For AI Agents:**
- RULES.md is not a suggestion - follow it religiously
- When in doubt, ask the human (don't guess)
- If you want to change a locked technology, document in CONTEXT.md and ask
- Update docs AFTER every change, not before

**General:**
- This system takes 5 minutes to learn, saves hours of cleanup
- The stricter you are with the rules, the less chaos you'll have
- One source of truth > multiple conflicting sources
- Documentation is code - treat it seriously

---

## 📊 Success Metrics

**You're using this correctly if:**
- ✅ Only ONE architecture document exists
- ✅ Only ONE tech stack document exists
- ✅ Every technology has ONE locked choice
- ✅ CONTEXT.md is always current
- ✅ No duplicate implementations
- ✅ You can switch machines seamlessly
- ✅ Agents never ask "what library should I use?"

**Warning signs:**
- ⚠️ Multiple files with similar names
- ⚠️ Directories with version numbers (v2, new, updated)
- ⚠️ Outdated CONTEXT.md
- ⚠️ Uncommitted changes piling up
- ⚠️ Agents choosing different libraries each session

---

## 🎬 You're Ready!

You now have a **bulletproof system** for building your Film Pitch Deck Showcase with AI agents across multiple sessions and machines.

**What makes this special:**
- Single source of truth for everything
- Locked technology decisions (no flip-flopping)
- Clear current state (CONTEXT.md)
- Agent guardrails (RULES.md)
- Change tracking (CHANGELOG.md)

**Your chaos problems are solved.** 🎉

**Next action:** Lock your technology decisions and start building!

---

**Questions?** 
- Check the relevant doc file first
- Most answers are in RULES.md or TECH-STACK.md
- Still stuck? Ask for help with specific questions

**Good luck with your project!** 🚀
