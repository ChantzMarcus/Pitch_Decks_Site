<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# what are some of the best and most user friendly ways and tools to build a website with claude code, cursor, codex etc. I'm planning to make a website with existing content and I'm currently familiar with vercel, claude code, codex, and cursor and i have github.

I have 10 or so amazing TV/Film pitch decks with incredible designs, (saved as both jpeg's per slide and a pdf for the entire deck) I plan to make a website that can show case these designs on a nice polished website that is user friendly.

Most of my experience in in backend with python like building data pipeline, ai filter pipelines and scrapers.

What tools and languages, as well as db's should I consider using to build a nice site with current tech trends and layout styles?

Perfect! I now have comprehensive information to provide a detailed, actionable tech stack recommendation. Let me synthesize this into a practical guide.

## Modern Tech Stack for Your TV/Film Pitch Deck Showcase Website

Given your background in backend/Python development and your familiarity with Vercel, Claude, Cursor, and GitHub, here's the optimal tech stack for 2026:

***

## **Primary Recommendation: Next.js + TypeScript + Vercel**

This is genuinely the best choice for your use case—here's why:

### **Frontend Framework: Next.js (App Router)**

- **Why it's perfect for you:**
    - Works seamlessly with Vercel (zero-configuration deployments)
    - Built-in image optimization (crucial for high-quality pitch deck JPEGs)
    - Excellent for image galleries and media-heavy sites
    - TypeScript support reduces bugs
    - Server-side rendering for SEO (your pitch decks will be discoverable)
- **Key features for your project:**
    - **Next.js Image component**: Automatically optimizes, resizes, and lazy-loads images
    - **ISR (Incremental Static Regeneration)**: Pre-render gallery pages at build time, revalidate on demand
    - **App Router + nested layouts**: Organize projects by deck with clean URLs
    - **API routes**: Can build a lightweight backend if needed later

***

## **Styling: Tailwind CSS v4 + CSS Grid/Flexbox**

- **Tailwind CSS** is the modern standard (2026 best practice)
- Perfect for responsive image galleries
- Built-in dark mode support
- Tree-shaking ensures minimal bundle size

**Gallery layout approach:**

- CSS Grid with `auto-fit` and `minmax()` for masonry-style layouts
- Flexbox for navigation and controls
- Modern CSS properties: `aspect-ratio`, `object-fit` for aspect ratio consistency

***

## **Image Gallery Implementation**

### **Lightbox Library Options:**

1. **lightGallery.js** (Recommended)
    - Lightweight, modular, hardware-accelerated CSS3 transitions
    - Support for keyboard navigation, touch gestures, ARIA attributes
    - React wrapper available
    - Perfect for showcasing high-res pitch deck slides
2. **Framer Motion** (Alternative for animations)
    - Pairs well with Next.js
    - Beautiful, performant animations
    - Gesture support built-in

### **Image Optimization Strategy:**

```
Your workflow:
1. Upload JPEGs per slide + full PDF
2. Serve via Vercel's CDN with automatic WebP/AVIF conversion
3. Next.js Image component handles lazy-loading, responsive sizing
4. Lightbox displays full-res on click
5. Use srcset for thumbnail -> full-res flow
```


***

## **Database Recommendation: PostgreSQL (with Supabase)**

### **Why NOT MongoDB for this project:**

- Your data is **highly structured** (decks, projects, metadata)
- You need **ACID transactions** (reliability)
- MongoDB shines for unstructured content; yours is organized


### **Why PostgreSQL:**

✅ Most popular database among developers (2025 Stack Overflow survey)
✅ Battle-tested for production
✅ Strong relational model for: projects → decks → slides → metadata
✅ **Supabase** = PostgreSQL + Auth + Real-time + Vector search (if you add AI features later)

### **Schema example:**

```sql
projects (id, title, description, created_at)
  ├── pitch_decks (id, project_id, title, pdf_url, created_at)
  └── slides (id, deck_id, slide_number, image_url, description)
metadata (deck_id, genre, target_audience, production_status, etc.)
```

**Supabase hosting:** \$25/month for your use case, includes:

- PostgreSQL database
- File storage (PDFs, images)
- Built-in authentication (if you add admin features)
- Auto-scaling

***

## **Backend Framework: Lightweight or Serverless**

### **Option 1: Next.js API Routes + Supabase (Recommended)**

- Use Next.js API routes for gallery metadata queries
- Supabase handles database, auth, and file storage
- Minimal backend code needed
- Deploy everything on Vercel


### **Option 2: Python FastAPI (Leverage your strength)**

- If you want a separate Python backend for future pipelines
- Deploy on Render, Railway, or Fly.io
- Call from Next.js frontend via REST/GraphQL

**For your needs**, Option 1 is cleaner since your project is primarily a showcase.

***

## **Complete Tech Stack Summary**

| Layer | Technology | Why |
| :-- | :-- | :-- |
| **Hosting** | Vercel | Zero-config Next.js deployment, global CDN, preview URLs |
| **Frontend** | Next.js 16 + React 19 | Image optimization, ISR, TypeScript, ecosystem |
| **Styling** | Tailwind CSS v4 | Modern utility-first, responsive, production-ready |
| **UI Components** | Shadcn/ui or Radix UI | Accessible, headless components (pairs with Tailwind) |
| **Gallery** | lightGallery.js | Lightweight, keyboard-accessible, touch-friendly |
| **Database** | PostgreSQL (Supabase) | Structured data, ACID reliable, scalable |
| **Storage** | Supabase Storage or Vercel Blob | Image/PDF hosting with CDN integration |
| **Auth** | Supabase Auth (optional) | If you add admin features later |
| **Version Control** | GitHub | Already in your workflow |
| **IDE** | Cursor or Claude Code | AI pair programming with codebase understanding |


***

## **Modern Design Patterns for 2026**

Based on current trends in showcase sites:

1. **Hero Section**
    - Full-width image/video background
    - Minimal, bold typography
    - CTA to scroll/view gallery
2. **Responsive Image Gallery**
    - Grid layout (3-4 columns desktop, 1-2 mobile)
    - Aspect ratio preservation
    - Smooth hover effects
    - Click to open lightbox with full metadata
3. **Project Cards**
    - Deck title, genre, production status
    - Metadata tags (drama, sci-fi, indie, etc.)
    - Quick preview grid
    - Link to full presentation
4. **Lightbox Features**
    - Full-screen slide view
    - Arrow keys / swipe navigation
    - Slide counter
    - Download PDF button
    - Project metadata overlay
5. **Performance Optimizations**
    - Skeleton loaders while images load
    - Progressive enhancement (works without JS)
    - Core Web Vitals optimized
    - Mobile-first responsive design

***

## **Development Workflow (Claude + Cursor)**

### **Using Claude Code/Cursor effectively:**

1. **Initial Build:**
    - Upload your repo structure to Claude Projects
    - Ask: "Create a Next.js pitch deck gallery site with these features..."
    - Get multi-file understanding (no context loss)
2. **Image Optimization:**
    - Ask Claude to generate image processing helpers
    - Uses Next.js Image optimization built-ins
    - Custom hooks for gallery state management
3. **Database Integration:**
    - Claude can generate Supabase queries/types
    - TypeScript for type safety
    - Generated migrations included
4. **Styling:**
    - Cursor excels at live CSS editing
    - Use `@apply` in Tailwind for custom components
    - Real-time preview in Vercel preview deployments

***

## **Deployment Strategy**

```
Local Development → GitHub Commit → Vercel Auto-Deploy
                    ↓
                  Preview URL (test each PR)
                    ↓
                  Merge to main → Production deployment
```

**Benefits:**

- Zero downtime
- Instant rollbacks if needed
- Preview URLs for each pull request
- GitHub integration built-in

***

## **Why This Stack Over Alternatives**

| Alternative | Why Not |
| :-- | :-- |
| **Gatsby** | Slower builds, more complex for image-heavy sites |
| **Astro** | Overkill if you need dynamic features later; less React ecosystem |
| **WordPress + Elementor** | Not needed for this use case, less control |
| **Webflow** | Beautiful but harder to version control, not programmable |
| **Custom Python Flask/Django** | Overkill, slower, Vercel deployment less optimized |
| **MongoDB** | Wrong for structured relational data |


***

## **Quick Start Path**

1. **Create Next.js project** (5 min)

```bash
npx create-next-app@latest pitch-gallery --typescript --tailwind
```

2. **Set up Supabase** (10 min)
    - Create free project
    - Connect via env variables
    - Upload sample pitch deck PDFs
3. **Build gallery UI** (2-4 hours with Claude)
    - Use lightGallery.js integration
    - Create image grid component
    - Implement lightbox modal
4. **Deploy to Vercel** (2 min)
    - Push to GitHub
    - Vercel auto-detects Next.js
    - Get production URL

***

## **Future-Proofing**

This stack easily scales for:

- **AI features:** Anthropic API for pitch analysis/summaries
- **Analytics:** Vercel Analytics built-in
- **Real-time collaboration:** Add Socket.io if needed
- **Admin panel:** Build internal dashboard for deck management
- **Search:** PostgreSQL full-text search or add Algolia

Your background in Python pipelines means you can later add a separate service for thumbnail generation, AI-powered metadata extraction, or data pipelines—all connected via API.

***

## **Cost Estimate**

- **Vercel:** Free tier (generous), \$20/mo for Pro features
- **Supabase:** Free tier sufficient initially, \$25/mo when you scale
- **Domain:** \$10/year
- **Total:** **Free to \$55/month** depending on scale

***

This stack aligns perfectly with current 2026 best practices while leveraging your existing knowledge. Start with the Next.js + Tailwind foundation, add lightGallery for the showcase experience, and use Supabase for metadata management. Would you like me to create a working Next.js template to get you started?
<span style="display:none">[^1_1][^1_10][^1_11][^1_12][^1_13][^1_14][^1_15][^1_16][^1_17][^1_18][^1_19][^1_2][^1_20][^1_21][^1_22][^1_23][^1_24][^1_25][^1_26][^1_27][^1_28][^1_29][^1_3][^1_30][^1_31][^1_32][^1_33][^1_34][^1_35][^1_36][^1_37][^1_38][^1_39][^1_4][^1_40][^1_41][^1_42][^1_43][^1_44][^1_45][^1_46][^1_47][^1_48][^1_49][^1_5][^1_50][^1_51][^1_52][^1_53][^1_54][^1_55][^1_56][^1_57][^1_58][^1_59][^1_6][^1_60][^1_61][^1_62][^1_63][^1_64][^1_65][^1_66][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://ijsrem.com/download/personal-portfolio-builder-using-mern-stack-with-ai-integration/

[^1_2]: https://www.semanticscholar.org/paper/af02955d962d1454fdbb958d573eb35e868db9d7

[^1_3]: https://www.sciencepublishinggroup.com/article/10.11648/j.ijsspe.20251003.17

[^1_4]: https://link.springer.com/10.1245/s10434-023-13442-2

[^1_5]: https://arxiv.org/abs/2407.04732

[^1_6]: https://journals.sagepub.com/doi/10.1177/0269216319867424

[^1_7]: https://www.semanticscholar.org/paper/528330e09e61e27c0e198d068e1bb7c8ee83abe4

[^1_8]: https://www.semanticscholar.org/paper/8b479f05fbcbd5486c1adee4c506670712e6db2f

[^1_9]: https://www.semanticscholar.org/paper/f434213fc206ef8383160646bb18c7d06e4b0527

[^1_10]: https://systematicreviewsjournal.biomedcentral.com/articles/10.1186/s13643-018-0752-3

[^1_11]: https://arxiv.org/pdf/0801.2618.pdf

[^1_12]: https://arxiv.org/html/2502.15708v1

[^1_13]: https://ijsrcseit.com/paper/CSEIT217630.pdf

[^1_14]: https://www.ijert.org/research/a-survey-on-current-technologies-for-web-development-IJERTV9IS060267.pdf

[^1_15]: http://ijece.iaescore.com/index.php/IJECE/article/download/11732/11844

[^1_16]: https://arxiv.org/ftp/arxiv/papers/2304/2304.09568.pdf

[^1_17]: https://arxiv.org/pdf/2501.18225.pdf

[^1_18]: https://www.ejece.org/index.php/ejece/article/download/448/275

[^1_19]: https://www.shopify.com/blog/free-portfolio-website

[^1_20]: https://roadmap.sh/frontend/technologies

[^1_21]: https://vercel.com/docs/frameworks/full-stack/nextjs

[^1_22]: https://roadmap.sh/frontend/web-developer-portfolio

[^1_23]: https://www.talentelgia.com/blog/top-frontend-technologies-to-use-in-2026/

[^1_24]: https://vercel.com/templates/next.js/nextjs-portfolio

[^1_25]: https://uxplaybook.org/articles/best-ux-portfolio-website-builders-2026

[^1_26]: https://elementor.com/blog/best-web-developer-portfolio-examples/

[^1_27]: https://vercel.com/templates/portfolio

[^1_28]: https://webpeak.org/blog/best-portfolio-websites-for-web-developers

[^1_29]: https://dribbble.com/search/modern-developer-portfolio

[^1_30]: https://nextjs.org/showcase

[^1_31]: https://dev.to/abubakersiddique761/best-web-development-frameworks-for-2026-3h0m

[^1_32]: https://dev.to/highcenburg/brutal-efficiency-a-tech-breakdown-of-my-portfolio-1o2d

[^1_33]: https://www.youtube.com/watch?v=m79HgtXdFSE

[^1_34]: https://www.reddit.com/r/webdev/comments/112r7m5/whats_the_best_portfolio_website_youve_ever_seen/

[^1_35]: https://stock.adobe.com/search?k=front+end+developer+portfolio\&promoid=J7XBWPPS\&mv=other\&as_channel=adobe_com\&as_campclass=brand\&as_camptype=acquisition\&as_audience=users\&as_content=explore-more-adobe-stock

[^1_36]: https://peerlist.io/sanjayjoshi/articles/best-nextjs-blog-templates

[^1_37]: https://elementor.com/blog/how-to-pick-the-best-website-builder-in/

[^1_38]: https://www.hostinger.com/tutorials/web-developer-portfolio

[^1_39]: http://arxiv.org/pdf/2405.07868.pdf

[^1_40]: https://arxiv.org/html/2410.05645

[^1_41]: https://arxiv.org/pdf/2202.08409.pdf

[^1_42]: http://arxiv.org/pdf/2411.10659.pdf

[^1_43]: https://arxiv.org/html/2504.03884v1

[^1_44]: https://arxiv.org/pdf/2308.06725.pdf

[^1_45]: https://www.mdpi.com/1424-8220/24/16/5439

[^1_46]: https://arxiv.org/html/2310.02043v2

[^1_47]: https://procoder09.com/dynamic-photo-gallery/

[^1_48]: https://www.mongodb.com/solutions/industries/media-and-entertainment

[^1_49]: https://www.datastudios.org/post/claude-ai-for-coding-capabilities-environments-and-developer-workflows

[^1_50]: https://www.lightgalleryjs.com

[^1_51]: https://www.theregister.com/2025/12/02/mongodb_postgresql_scalability/

[^1_52]: https://research.aimultiple.com/agentic-coding/

[^1_53]: https://www.reddit.com/r/webdev/comments/1n7w4go/lightbox_image_gallery_with_javascript/

[^1_54]: https://www.datacamp.com/blog/postgresql-vs-mongodb

[^1_55]: https://www.igmguru.com/blog/claude-code

[^1_56]: https://www.jqueryscript.net/blog/best-lightbox-gallery.html

[^1_57]: https://www.linkedin.com/pulse/end-of-year-thoughts-postgresql-2026-franck-pachot-wka4e

[^1_58]: https://www.youtube.com/watch?v=Ffh9OeJ7yxw

[^1_59]: https://www.liquidweb.com/wordpress/images/click-enlarge/

[^1_60]: https://bachasoftware.com/blog/insights-2/most-popular-databases-management-systems-787

[^1_61]: https://dev.to/asad1/ai-coding-assistants-in-2026-understanding-claude-code-and-googles-tools-1a2h

[^1_62]: https://www.cssscript.com/photo-gallery-lumosaic/

[^1_63]: https://www.capterra.com/compare/48791-127374/PostgreSQL-vs-MongoDB

[^1_64]: https://www.reddit.com/r/ClaudeAI/comments/1pytn6r/what_is_the_best_way_to_code_with_claude/

[^1_65]: https://www.sliderrevolution.com/resources/css-gallery/

[^1_66]: https://www.theknowledgeacademy.com/blog/mongodb-vs-postgresql/


---

# I would like the site interactive as well. I would also like to be able to build scrapers that help us find clients, and collect consumer insights for ads etc, but is that a separate thing compared to the website? - I would like to have a form that collects potential clients wants possible budget and their contact information. Should I use any other tools in my tech stack?

Is this free, re: PostgreSQL

What about clerk, or Neon?

Do i not need any other build tools, how should I plan to attack/layout the site with claude code or cursor?

Additionally how long should this take to build?

Perfect! Here's your comprehensive guide to building the pitch deck showcase website with lead capture and scraper integration:

***

## 📊 Quick Answers to Your Questions

### **1. Is PostgreSQL Free?**

PostgreSQL itself is **completely free**—it's open-source. But you need to *host* it somewhere. Here are your options:


| Option | Cost | Best For |
| :-- | :-- | :-- |
| **Supabase (Recommended)** | \$0/month (free tier) → \$25/mo at scale | Your whole backend (auth + DB + storage + file uploads) |
| **Neon** | \$0/month (free tier) → \$5/mo minimum | Database only; great if workload is variable |
| **Render/Railway** | \$7-20/month minimum | If you want managed PostgreSQL without extras |

**For you:** Supabase free tier gives you **50,000 monthly active users, 500 MB database storage, 1 GB file storage—all completely free**. Perfect to launch.

***

### **2. Clerk vs Supabase Auth vs Neon**

**The confusion:** These serve different purposes.

- **Clerk** = Just authentication (signup/login UI). Costs more at scale (\$0.05/MAU overage).
- **Supabase** = Complete backend (auth + database + file storage + real-time). \$0 free, then \$25/mo.
- **Neon** = Database only (no auth, no storage). You'd need separate auth solution.

**My recommendation:** Use **Supabase Auth** because:

- ✅ It's already in Supabase (no vendor lock-in)
- ✅ Free tier is 5× larger than Clerk (50k vs 10k users)
- ✅ Better pricing long-term (\$10 compute credits included in \$25 Pro plan)
- ✅ Row-Level Security (RLS) for future admin dashboards

***

### **3. Scrapers Are Completely Separate**

Think of it like this:

```
Website (public showcase)           Scraper Service (internal tool)
├─ Next.js gallery                  ├─ Python FastAPI backend
├─ Lead capture form                ├─ Playwright (browser automation)
├─ Supabase auth                    ├─ BeautifulSoup (HTML parsing)
└─ Vercel hosting                   └─ Runs on schedule (daily/weekly)
```

They share the **same PostgreSQL database** (Supabase), but operate independently:

- Website = React UI responding to user actions
- Scraper = Background Python service finding clients on a schedule (via cron job)

When leads from your lead form come in, the scraper independently enriches them with data it collected.

***

### **4. No Extra Build Tools Needed**

You already have everything you need:

✅ **Vercel** → Handles Next.js deployment automatically
✅ **GitHub** → CI/CD pipeline built-in
✅ **Cursor/Claude Code** → Writes the code
✅ **Node.js** → Built into Next.js

You don't need Docker, Webpack, Prettier, ESLint, or any other tools for MVP. Next.js abstracts all of that.

***

### **5. How to Plan \& Build with Claude Code / Cursor**

**Optimal workflow:**

1. **Claude Code (Planning)** - 30 min
    - Write detailed requirements doc
    - Ask Claude: "What am I missing? How should I structure the database?"
    - Get database schema generated
2. **Cursor (Building)** - 6-8 hours
    - Use `@codebase` context to build components
    - Test locally with `npm run dev`
    - See changes in real-time
    - Make tweaks based on how it looks
3. **Vercel (Deploying)** - 2 min
    - Push to GitHub
    - Vercel automatically builds \& deploys
    - URL is live

**File structure to ask Claude Code to generate:**

```
- `/app` → Pages (home, gallery, [deckId], api routes)
- `/components` → Reusable UI (DeckCard, LeadForm, Lightbox)
- `/lib` → Database client, types, utilities
- `/public` → Your pitch deck images/PDFs
```


***

### **6. Timeline: 6-8 Hours Total**

**Real breakdown:**


| Phase | Time | What |
| :-- | :-- | :-- |
| Planning + Database | 50 min | Requirements, schema |
| Gallery component | 60 min | Grid, cards, filtering |
| Single deck viewer | 90 min | Lightbox, slide navigation |
| Lead form + API | 60 min | Form, validation, storage |
| Styling + polish | 60 min | Colors, spacing, mobile responsive |
| Testing + deploy | 30 min | Local testing, Vercel deploy |
| **TOTAL** | **6-8 hours** | Production-ready site |

**Someone literally built a complex production Next.js site in 4 hours using Claude Code + Cursor in December 2025.** You're looking at similar complexity.

***

## 📋 Your Updated Tech Stack

```
Frontend:       Next.js 16 + React 19 + Tailwind CSS
Database:       PostgreSQL (Supabase free tier)
Auth:           Supabase Auth (built-in)
Forms:          React Hook Form + Zod validation
Gallery:        lightGallery.js + Next.js Image optimization
Hosting:        Vercel (free)
Scraper:        Python FastAPI + Playwright (separate service)
Scheduling:     Vercel Cron or Render Cron Jobs
Storage:        Supabase File Storage (1 GB free)
IDE:            Cursor or Claude Code
Version:        GitHub
```

**Total starting cost: \$0/month** (everything free until 50k monthly users)

***

## 🚀 Immediate Next Steps

**Today (1 hour):**

1. Create Supabase project
2. Create Next.js app: `npx create-next-app@latest pitch-gallery`
3. Connect to GitHub
4. Write 1-page requirements doc

**This week (6-8 hours):**

1. Generate database schema with Claude Code
2. Build gallery with Cursor
3. Build lead form with Cursor
4. Deploy to Vercel (automatic)

**Next week:**

1. Add lightbox viewer
2. Polish animations/styling
3. Start scraper backend

***

I've saved a detailed 467-line reference guide to your workspace covering pricing, authentication, architecture, timeline, and step-by-step building process. Everything you need is in there.

**Bottom line:** You can launch a polished pitch deck showcase site for \$0 in one week, leveraging Claude/Cursor for code generation. The scraper is a completely separate Python service that runs on a schedule. Ready to start? 🎬
<span style="display:none">[^2_1][^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_16][^2_17][^2_18][^2_19][^2_2][^2_20][^2_21][^2_22][^2_23][^2_24][^2_25][^2_26][^2_27][^2_28][^2_29][^2_3][^2_30][^2_31][^2_32][^2_33][^2_34][^2_35][^2_36][^2_37][^2_38][^2_39][^2_4][^2_40][^2_41][^2_42][^2_43][^2_44][^2_45][^2_46][^2_47][^2_48][^2_49][^2_5][^2_6][^2_7][^2_8][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://www.ijfmr.com/papers/2022/6/1140.pdf

[^2_2]: https://arxiv.org/pdf/2311.12485.pdf

[^2_3]: http://arxiv.org/pdf/2408.03021.pdf

[^2_4]: https://arxiv.org/pdf/2301.01095.pdf

[^2_5]: http://arxiv.org/pdf/2409.01388.pdf

[^2_6]: https://zenodo.org/record/4314612/files/Low_Code_Platforms_Survey_SEAA2020_Author_Version.pdf

[^2_7]: https://www.leanware.co/insights/supabase-vs-neon

[^2_8]: https://hackceleration.com/supabase-review/

[^2_9]: https://www.zyte.com/learn/architecting-a-web-scraping-solution/

[^2_10]: https://xata.io/blog/neon-vs-supabase-vs-xata-postgres-branching-part-2

[^2_11]: https://vela.simplyblock.io/neon-vs-supabase/

[^2_12]: https://www.capsolver.com/blog/web-scraping/top-web-scraping-2026

[^2_13]: https://www.bytebase.com/blog/neon-vs-supabase/

[^2_14]: https://www.youtube.com/watch?v=K9HFoB4skOQ

[^2_15]: https://painonsocial.com/blog/web-scraping-best-practices

[^2_16]: https://vela.simplyblock.io/articles/neon-serverless-postgres-pricing-2026/

[^2_17]: https://www.gptbots.ai/blog/web-scraping-ai-agents

[^2_18]: https://chat2db.ai/resources/blog/neon-vs-supabase

[^2_19]: https://research.aimultiple.com/web-scraping-best-practices/

[^2_20]: https://www.reddit.com/r/nextjs/comments/1nsi0cc/any_good_db_service_like_supabase_which_offers/

[^2_21]: https://www.scrapingdog.com/blog/javascript-web-scraping/

[^2_22]: https://dev.to/syedsakhiakram66/7-best-authentication-frameworks-for-2025-free-paid-compared-159g

[^2_23]: https://brightdata.com/blog/web-data/fix-inaccurate-web-scraping-data

[^2_24]: https://www.freetiers.com/blog/supabase-vs-neon-comparison

[^2_25]: https://scrapfly.io/blog/posts/best-web-scraping-tools-in-2026

[^2_26]: https://blog.logrocket.com/11-planetscale-alternatives-free-tiers/

[^2_27]: http://arxiv.org/pdf/2403.14007.pdf

[^2_28]: http://arxiv.org/pdf/2305.19241.pdf

[^2_29]: https://arxiv.org/pdf/2402.03199.pdf

[^2_30]: https://peerj.com/articles/cs-569

[^2_31]: https://www.contentful.com/blog/clerk-authentication/

[^2_32]: https://www.leadsquared.com/learn/marketing/lead-capture-forms/

[^2_33]: https://www.youtube.com/watch?v=2qU3SPPojDA

[^2_34]: https://www.reddit.com/r/nextjs/comments/167pj2d/is_clerks_pricing_really_that_insane_or_am_i/

[^2_35]: https://www.growthmarketingpro.com/capture-email-leads/

[^2_36]: https://www.linkedin.com/posts/angyixin_ive-been-designing-directly-in-code-for-activity-7394303944010878976-zxv1

[^2_37]: https://clerk.com/articles/user-authentication-for-nextjs-top-tools-and-recommendations-for-2025

[^2_38]: https://www.nimble.com/blog/creating-a-lead-capture-form-with-crm-that-works-with-examples/

[^2_39]: https://dev.to/ujjavala/a-week-with-claude-code-lessons-surprises-and-smarter-workflows-23ip

[^2_40]: https://martal.ca/conversion-rate-statistics-lb/

[^2_41]: https://www.reddit.com/r/vibecoding/comments/1pacztj/built_a_production_nextjs_16_site_in_4_hours_0/

[^2_42]: https://clerk.com/pricing

[^2_43]: https://www.aidigital.com/blog/conversion-marketing

[^2_44]: https://www.youtube.com/watch?v=e6Ys2Kmwq0Q

[^2_45]: https://www.linkedin.com/posts/leadgenmanthan_if-youve-always-wanted-to-build-a-saas-but-activity-7370070803679272960-kJlk

[^2_46]: https://purpleplanet.com/blog/20-best-practices-to-boost-your-lead-capture-forms/

[^2_47]: https://forum.cursor.com/t/mastering-long-codebases-with-cursor-gemini-and-claude-a-practical-guide/38240

[^2_48]: https://www.youtube.com/watch?v=SW3W_aic-e8

[^2_49]: https://www.optimonk.com/lead-capture/


---

# Help me find existing repos or sites I should consider.

I would like to have a forum the client fills out that collects their data and routes them to the service best suited for them, and i would like my sales leads to be ablet to see their needs or desires before the sales call.

Where is this, re: I've saved a detailed 467-line reference guide to your workspace covering pricing, authentication, architecture, timeline, and step-by-step building process. Everything you need is in there.

Perfect! Now I have everything organized for you. Let me answer your questions directly and point you to the files.

***

## **Your Questions Answered**

### 1️⃣ **"Where is the reference guide I saved?"**

It's saved in your workspace in **TWO files:**

1. **`pitch_deck_website_tech_stack.md`** (467 lines)
    - Complete tech stack breakdown
    - Pricing comparisons
    - Timing estimates
    - Building workflow with Claude/Cursor
    - Architecture diagrams
2. **`existing_repos_lead_routing_guide.md`** (500 lines)
    - Concrete GitHub repos you can fork
    - Lead routing system design
    - Database schema
    - Form logic
    - Sales dashboard blueprint

**Both files are in your workspace** - they'll persist throughout your research session. You can reference them anytime.

***

### 2️⃣ **"What repos should I use?"**

**Top 3 Recommendations (in order):**


| Repo | Best For | Stars | Why |
| :-- | :-- | :-- | :-- |
| **said7388/developer-portfolio** | **FASTEST START** (6-8 hrs) | 2.2K | Already has contact form, email setup, environment variables. Just swap gallery. |
| **zxmodren/Point-of-sales-Nextjs** | **BEST ARCHITECTURE** (8-12 hrs) | 8 | Supabase + Prisma types, CRUD operations, dashboard UI. **Most relevant to your lead system.** |
| **ByteGrad/portfolio-website** | **BEAUTIFUL DESIGN** (7-10 hrs) | 735 | Great component structure, animations, modern patterns. |

**For YOUR specific use case (lead routing):** `zxmodren/Point-of-sales-Nextjs` is most similar because:

- ✅ Already shows how to store forms to database
- ✅ Has dashboard showing submitted data
- ✅ Uses Supabase + Prisma (your stack)
- ✅ Shows transaction/submission tracking (like your leads)

***

### 3️⃣ **"How does the lead routing work?"**

The flow I've documented:

```
CLIENT FILLS FORM
├─ Project type, budget, timeline, contact
└─ Submits

SCORING ENGINE (Automatic)
├─ Budget tier → points
├─ Timeline (ready to pitch = hot) → points
├─ Genre fit → points
├─ Detailed notes → points
└─ Total: 0-100 score

ROUTING DECISION
├─ If score > 80 → Urgent alert
├─ Match to rep's genre specialty
├─ Route to least-loaded rep
└─ Send Slack notification

SALES REP SEES DASHBOARD
├─ All client details before first call
├─ Lead score (tells them priority)
├─ Client's exact needs
├─ Project description
└─ Can filter by budget/type/status
```

I've included the complete database schema and scoring logic in the saved guide.

***

### 4️⃣ **"Is this separate from the website?"**

**YES and NO:**

- **Website:** React/Next.js gallery + lead form (Vercel hosted)
- **Scrapers:** Python FastAPI service (separate server)
- **Database:** Same PostgreSQL (Supabase) - they both read/write to it

The **lead form on website** stores to the database. The **scrapers** independently find prospects and enrich the database. Your **sales dashboard** shows both.

***

## 📋 Your Implementation Path

**Start here:**

1. ✅ Read `existing_repos_lead_routing_guide.md` - Part 1 \& 2
2. ✅ Fork `said7388/developer-portfolio` (easiest) OR `zxmodren/Point-of-sales-Nextjs` (best practice)
3. ✅ Copy database schema from Part 3 of guide
4. ✅ Modify their form component to capture lead data
5. ✅ Create `/api/leads` route that stores form data + calculates score
6. ✅ Deploy to Vercel

**Then add dashboard:**

1. Create `/dashboard/leads` page
2. Query leads from Supabase
3. Show as table/cards with filters
4. Add status tracking

***

## 🎯 Key Repos at a Glance

**Quick comparison table I included:**

- **said7388/developer-portfolio** → Fastest (has contact form ready-made, just customize)
- **zxmodren/Point-of-sales-Nextjs** → Most relevant (Supabase + forms + dashboard pattern)
- **ByteGrad/portfolio-website** → Best learning (clean code, great patterns)

All are on GitHub. Clone → Customize → Deploy.

***

## 💾 Files You Now Have

Your workspace contains:

1. **pitch_deck_website_tech_stack.md** - Full tech decisions, pricing, timeline
2. **existing_repos_lead_routing_guide.md** - Repos, lead routing logic, database schema

Both have everything you need to build this. The repos give you **working code** to start from. You're not building from scratch—you're customizing proven templates.

Ready to pick a repo and start building? 🚀
<span style="display:none">[^3_1][^3_10][^3_11][^3_12][^3_13][^3_14][^3_15][^3_16][^3_17][^3_18][^3_19][^3_2][^3_20][^3_21][^3_22][^3_23][^3_24][^3_25][^3_26][^3_27][^3_28][^3_29][^3_3][^3_30][^3_4][^3_5][^3_6][^3_7][^3_8][^3_9]</span>

<div align="center">⁂</div>

[^3_1]: https://arxiv.org/abs/2205.02499

[^3_2]: https://arxiv.org/abs/2307.09481

[^3_3]: https://arxiv.org/html/2410.05645

[^3_4]: https://arxiv.org/html/2411.01606v1

[^3_5]: https://arxiv.org/pdf/2205.06349v1.pdf

[^3_6]: https://arxiv.org/html/2504.03884v1

[^3_7]: https://arxiv.org/pdf/2407.20900.pdf

[^3_8]: https://arxiv.org/html/2410.14684v1

[^3_9]: https://medevel.com/18-next-js-portfolio-template-starter/

[^3_10]: https://www.saleswingsapp.com/salesforce/best-lead-routing-solutions-for-salesforce/

[^3_11]: https://www.youtube.com/watch?v=jddDenxtZpI

[^3_12]: https://nextjs.org/showcase

[^3_13]: https://monday.com/blog/crm-and-sales/how-to-qualify-sales-leads/

[^3_14]: https://www.youtube.com/watch?v=XbSCGe8JV2I

[^3_15]: https://www.youtube.com/watch?v=FTH6Dn3AyIQ

[^3_16]: https://www.default.com/post/automate-sales-process

[^3_17]: https://github.com/zxmodren/Point-of-sales-Nextjs

[^3_18]: https://nextjs.org

[^3_19]: https://directiveconsulting.com/blog/top-4-b2b-lead-generation-tools-to-grow-your-pipeline-in-2026/

[^3_20]: https://www.reddit.com/r/Supabase/comments/1c0hdjs/a_analytics_dashboard_built_on_top_of_supabase/

[^3_21]: https://github.com/topics/nextjs-portfolio

[^3_22]: https://getfieldy.com/blogs/best-lead-management-software

[^3_23]: https://posthog.com/tutorials/nextjs-supabase-signup-funnel

[^3_24]: https://github.com/topics/portfolio-template

[^3_25]: https://www.dialora.ai/blog/automated-lead-qualification

[^3_26]: https://www.tiktok.com/@supabase.com/video/7540385034222570808

[^3_27]: https://github.com/said7388/developer-portfolio

[^3_28]: https://www.leadangel.com/blog/operations/how-businesses-can-improve-sales-with-lead-routing-software/

[^3_29]: https://github.com/said7388/developer-portfolio/releases

[^3_30]: https://github.com/ByteGrad/portfolio-website/actions


---

# Can you access code from code pen, similar to cloning on GitHub?

Yes, you can get CodePen code in a way that’s very similar to cloning from GitHub, but the mechanism is different.

## How CodePen “export” works

- CodePen has an **Export** menu on each Pen that lets you:
    - Download a **ZIP** with:
        - `index.html`
        - `style.css`
        - `script.js`
        - plus a `README` and license for public Pens.[^4_1][^4_2]
    - Or **“Save as GitHub Gist”**, which sends the Pen’s source to a Gist on GitHub (public or secret, depending on the Pen).[^4_3][^4_4][^4_1]

Once you have that:

- You can unzip the export and treat it like a small project: open in VS Code/Cursor, commit to Git, and push to a normal GitHub repo.[^4_5][^4_6][^4_3]
- Or, if you used “Save as GitHub Gist,” you can later clone that Gist and move the files into a full GitHub repo.[^4_6][^4_3]


## How this compares to GitHub cloning

- **GitHub clone**: `git clone` gives you full history, branches, etc.
- **CodePen export**: You get only the **current snapshot** of the code as files (no Git history), which you then can put under version control yourself.[^4_2][^4_1][^4_6]

So functionally, yes: you can grab CodePen code and continue development locally or in a proper repo. It’s just a one-way export, not a live clone that stays linked.
<span style="display:none">[^4_10][^4_11][^4_12][^4_13][^4_14][^4_15][^4_16][^4_17][^4_18][^4_19][^4_20][^4_21][^4_22][^4_23][^4_24][^4_25][^4_26][^4_27][^4_28][^4_29][^4_30][^4_31][^4_32][^4_33][^4_34][^4_35][^4_36][^4_37][^4_38][^4_7][^4_8][^4_9]</span>

<div align="center">⁂</div>

[^4_1]: https://blog.codepen.io/documentation/exporting-pens/

[^4_2]: https://blog.codepen.io/docs/pens/exporting/

[^4_3]: https://code.likeagirl.io/how-to-move-from-codepen-to-github-44a65511048e

[^4_4]: https://forum.freecodecamp.org/t/connect-codepen-project-to-github/269031

[^4_5]: https://stackoverflow.com/questions/29876904/how-do-i-take-code-from-codepen-and-use-it-locally

[^4_6]: https://forum.freecodecamp.org/t/transporting-a-project-from-codepen-to-github/250246

[^4_7]: https://www.semanticscholar.org/paper/4c5fb7aab9ae6a0cce7a02ae80effd658b222d4d

[^4_8]: https://arxiv.org/abs/2506.01211

[^4_9]: https://upmonographs.up.ac.za/index.php/ESI/catalog/book/41

[^4_10]: https://www.semanticscholar.org/paper/2891d5e889f7697383ab84c1c215a080a1402e62

[^4_11]: https://s-lib.com/en/issues/eiu_2024_03_v5_a3/

[^4_12]: https://gmd.copernicus.org/articles/18/4455/2025/

[^4_13]: http://biorxiv.org/lookup/doi/10.64898/2025.12.15.694327

[^4_14]: https://www.semanticscholar.org/paper/7515afbe6c657d6e347eb5900e199a50c74ddd9a

[^4_15]: https://www.semanticscholar.org/paper/1170761ff94f93da0f66cc348bce2de38fc95548

[^4_16]: https://zenodo.org/record/204160

[^4_17]: https://arxiv.org/pdf/2312.09370.pdf

[^4_18]: http://arxiv.org/pdf/2405.04975.pdf

[^4_19]: https://arxiv.org/pdf/2401.14279.pdf

[^4_20]: http://arxiv.org/pdf/2401.06391.pdf

[^4_21]: https://arxiv.org/pdf/2308.12950.pdf

[^4_22]: https://arxiv.org/html/2404.06369v1

[^4_23]: http://arxiv.org/pdf/2409.18658.pdf

[^4_24]: https://arxiv.org/pdf/1907.04908.pdf

[^4_25]: https://www.youtube.com/watch?v=rtdGg4Ttb4M

[^4_26]: https://blog.codepen.io/2017/05/03/export-projects-zip/

[^4_27]: https://www.secondtalent.com/resources/perplexity-ai-for-coding/

[^4_28]: https://www.youtube.com/watch?v=hwK5trkROR8

[^4_29]: https://www.codecademy.com/article/how-to-use-perplexity-ai

[^4_30]: https://www.reddit.com/r/webdev/comments/ily6ls/could_i_use_code_from_codepen_in_projects_i_get/

[^4_31]: https://forum.freecodecamp.org/t/export-code-from-codepen-to-github/155363

[^4_32]: https://skywinds.tech/perplexity-ai-smarter-software-delivery/

[^4_33]: https://forum.freecodecamp.org/t/moving-codepen-portfolio-to-a-real-url/471059

[^4_34]: https://livecodes.io/docs/features/export/

[^4_35]: https://www.reddit.com/r/perplexity_ai/comments/1i979ya/do_you_guys_use_perplexity_for_coding/

[^4_36]: https://github.com/lostintangent/codeswing/issues/107

[^4_37]: https://www.perplexity.ai/help-center/en/articles/11144811-perplexity-labs

[^4_38]: https://www.facebook.com/groups/codingquestions/posts/1073397413061577/


---

# So if you clone and get hub repo and the owner of the repo updates it does it update your repo? I guess I’m unfamiliar how cloning works entirely.

Cloning does **not** auto‑update your repo when the original changes, but you *can* pull new changes from the original if you keep the connection.

## What “cloning a repo” actually does

When you run something like:

```bash
git clone https://github.com/owner/project.git
```

you get:

- A **full copy** of:
    - all files
    - full commit history
- A remote named **`origin`** pointing back to the original repo URL.

Your local repo is now independent: your commits don’t affect the original, and the original’s new commits don’t magically appear in yours.

## How updates from the original work

After cloning:

- The original repo keeps evolving (new commits).
- Your local clone stays where it is **until you pull**.

You can update your local clone with:

```bash
git pull origin main
```

(or `master` or whatever branch), which:

- Fetches new commits from `origin`
- Merges them into your local branch

So it’s “manually synced,” not auto-synced.

## What if you make your own GitHub copy?

Usually the flow is:

1. **Fork** on GitHub (button on repo page).
2. GitHub creates `yourname/project` (a full copy at that point).
3. You **clone *your* fork** locally:

```bash
git clone https://github.com/yourname/project.git
```

4. Now:
    - The original is called **“upstream”** (conventionally).
    - Your fork is **“origin.”**

To keep your fork updated:

```bash
# Once per repo: add upstream
git remote add upstream https://github.com/original-owner/project.git

# When you want updates:
git fetch upstream
git merge upstream/main  # or rebase, or use GitHub “Sync fork”
```

Your fork does **not** auto-follow the original; you explicitly sync.

## Mental model

- **Clone** = download + attach a remote (origin).
- **No auto-updates.** Changes flow only when you run `git pull` / `git fetch`.
- If you fork, you usually have:
    - `origin` → your GitHub repo
    - `upstream` → the original repo you forked from

If you tell me a repo you’re thinking of cloning, can walk you through the exact commands and what they’ll do step by step.

---

# What’s the difference from of forking a repo and cloning a repo?

Forking and cloning are related but happen in different places and serve slightly different purposes.

## Core idea in one line

- **Fork** = make **your own remote copy on GitHub**
- **Clone** = make a **local copy on your machine**

***

## Fork

- Happens **on GitHub**, in the browser.
- Creates a **new repo under your account** that starts as a copy of the original.
- You have **full control** over your fork: branches, settings, issues, etc.
- Common for:
    - Contributing to open-source when you don’t have write access.
    - Wanting to go your own direction without touching the original.
- You typically then **clone your fork** to your machine to work on it.

Effects:

- Your changes go to **your fork**.
- If you want them in the original, you open a **pull request** from your fork to the upstream repo.[^6_3][^6_5]

***

## Clone

- Happens **on your machine**, via `git clone ...`.
- Copies a repo (original or fork) from GitHub **to local disk**.
- Sets a remote named `origin` pointing to wherever you cloned from.
- You work locally, then:
    - `git push` sends changes back to **that** remote repo (if you have permission).
- Common for:
    - Working on a team repo you already have access to.
    - Working locally on your own projects.[^6_5][^6_8]

***

## How they work together in practice

Typical open‑source contribution flow:

1. **Fork** someone’s repo on GitHub → you now have `yourname/project`.
2. **Clone your fork**:

```bash
git clone https://github.com/yourname/project.git
```

3. Work locally, commit, then `git push` → changes go to **your fork**.
4. On GitHub, open a **pull request** from your fork → original repo.

So:

- **Fork** = remote copy under your account
- **Clone** = local copy of any remote (original or fork)

If you tell what you want to do (e.g., “I want to customize a template repo for my site but keep pulling fixes from the original”), a concrete recommended flow can be laid out for that scenario.
<span style="display:none">[^6_1][^6_10][^6_11][^6_12][^6_13][^6_14][^6_15][^6_16][^6_17][^6_18][^6_19][^6_2][^6_4][^6_6][^6_7][^6_9]</span>

<div align="center">⁂</div>

[^6_1]: https://graphite.com/guides/git-clone-vs-fork

[^6_2]: https://github.com/orgs/community/discussions/35849

[^6_3]: https://stackoverflow.com/questions/7057194/what-is-the-difference-between-forking-and-cloning-on-github

[^6_4]: https://www.theserverside.com/answer/Git-fork-vs-clone-Whats-the-difference

[^6_5]: https://www.geeksforgeeks.org/git/difference-between-fork-and-clone-in-github/

[^6_6]: https://www.reddit.com/r/learnprogramming/comments/ycge7h/is_there_a_difference_between_forking_a_repo_and/

[^6_7]: https://www.linkedin.com/pulse/what-difference-between-fork-branch-clone-korvage-hdpkc

[^6_8]: https://dev.to/danielasaboro/git-fork-and-clone-whats-the-difference-190c

[^6_9]: https://www.youtube.com/watch?v=rxh6MhK6Tbs

[^6_10]: https://www.youtube.com/watch?v=k0DWmw1nYnM

[^6_11]: https://dl.acm.org/doi/10.1145/3379597.3387496

[^6_12]: https://arxiv.org/pdf/1004.2889.pdf

[^6_13]: http://arxiv.org/pdf/2404.17964.pdf

[^6_14]: https://arxiv.org/pdf/2205.09931.pdf

[^6_15]: https://arxiv.org/pdf/2011.07821.pdf

[^6_16]: https://peerj.com/articles/cs-49

[^6_17]: https://arxiv.org/pdf/1504.07713.pdf

[^6_18]: https://arxiv.org/pdf/2002.02314.pdf

[^6_19]: https://arxiv.org/pdf/2002.01275.pdf


---

# can you summarize this in a code block for me so i can use it as a .md doc inside of my cursor terminal to kick this party off?

```markdown
# Pitch Deck Website Starter Notes

You’re building:
- A **showcase site** for TV/Film pitch decks (JPEG + PDF)
- With an **interactive intake form** that:
  - Collects client needs, budget, and contact info
  - Routes leads to the best service / sales rep
  - Lets sales see needs **before** the call
- Plus separate **scrapers** to find & enrich potential clients

---

## 1. Core Stack (MVP)

**Frontend**
- Next.js (App Router) + React
- TypeScript
- Tailwind CSS
- Optional UI kit: shadcn/ui or Radix UI

**Media / Gallery**
- Next.js `Image` component for optimization
- A lightbox/gallery lib (e.g. lightGallery)

**Backend / Data**
- PostgreSQL via Supabase
  - Auth (Supabase Auth)
  - Database (PostgreSQL)
  - Storage (for PDFs/images)
- Vercel for hosting + serverless API routes

**Scrapers (separate service)**
- Python + FastAPI
- Playwright / Requests + BeautifulSoup
- Writes into the same PostgreSQL (Supabase) or another DB

---

## 2. Website vs Scrapers (Separation of Concerns)

**Website (public)**
- Next.js app, deployed on Vercel
- Shows pitch deck gallery
- Intake form → sends data to `/api/leads`
- `/api/leads` validates + stores in Supabase

**Scraper Service (internal)**
- Separate codebase (Python)
- Runs on schedule (cron, worker, etc.)
- Scrapes lead sources, enriches data
- Writes into:
  - `leads` table (new prospects), or
  - `lead_enrichment` table (extra context for existing leads)

They share the **database**, not the runtime.

---

## 3. Database Sketch (Supabase / PostgreSQL)

Tables (high-level):

- `decks`
  - id, title, description, genre[], target_audience[], status
  - pdf_url, cover_image_url, created_at

- `slides`
  - id, deck_id → decks.id
  - slide_number, image_url, description

- `leads`
  - id
  - full_name, email, phone, company
  - project_type[], project_title, project_description
  - budget_range, timeline, target_audience[]
  - lead_score, assigned_to_rep, status
  - source, notes
  - created_at, updated_at, contacted_at, converted_at

- `sales_reps`
  - id, name, email
  - specialty[], territory
  - max_leads_per_week, current_workload, active
  - created_at

- `lead_activity`
  - id, lead_id → leads.id
  - action, notes, created_at

- `lead_enrichment`
  - id, lead_id → leads.id
  - source_company_data JSONB
  - industry_insights, competitor_analysis JSONB
  - recent_news TEXT[]
  - decision_makers JSONB
  - enriched_at

---

## 4. Lead Flow / Routing Logic (Conceptual)

1. Client fills form:
   - Contact: name, email, phone, company
   - Project: type(s), title, description
   - Budget range
   - Timeline (pre‑prod / in‑dev / ready‑to‑pitch)
   - Target audience
   - Notes

2. `/api/leads`:
   - Validate input (Zod)
   - Compute `lead_score` based on:
     - Budget (higher tiers → more points)
     - Timeline (ready‑to‑pitch → higher)
     - Detail richness (longer notes → more points)
     - Genre / audience fit
   - Choose `assigned_to_rep` by:
     - Matching rep `specialty` to `project_type`
     - Fallback to least loaded rep
   - Insert into `leads` table

3. Notifications:
   - Optional: send Slack / email notification to rep
   - Optional: confirmation email to client

4. Sales dashboard:
   - Query `leads` ordered by `lead_score` / `created_at`
   - Filters: status, budget, project type, timeline
   - Detail view: all client info + enrichment + activity
   - Actions: update `status`, log `lead_activity`

---

## 5. Git Basics: Fork vs Clone

**Fork**
- Done on GitHub (in browser)
- Creates **your own copy** of someone’s repo under your account
- Good when:
  - You don’t have write access to original
  - You want your own direction / custom version
- Usually followed by: `git clone` **your fork** locally

**Clone**
- Done on your machine:
  - `git clone https://github.com/user/repo.git`
- Creates a **local copy** of an existing remote repo
- Adds a remote called `origin`
- You pull updates from `origin` and push your changes back (if you have access)

**Combine them**
- Fork original → creates `yourname/project` on GitHub
- Clone your fork:
  - `git clone https://github.com/yourname/project.git`
- Optionally add upstream:
  - `git remote add upstream https://github.com/original/project.git`
- Get updates from upstream later:
  - `git fetch upstream`
  - `git merge upstream/main` (or rebase / GitHub “Sync fork”)

---

## 6. Suggested Workflow with Cursor + Claude

1. **Plan**
   - Create this `.md` file in the repo root
   - Add a more detailed `requirements.md`:
     - Pages, components, data model, API routes

2. **Bootstrap**
   - `npx create-next-app@latest pitch-gallery --typescript --tailwind`
   - Commit base project

3. **Wire up Supabase**
   - Create project on Supabase
   - Add env vars locally + on Vercel
   - Implement simple DB client in `lib/supabase.ts`

4. **Build incrementally**
   - Gallery layout + deck data (hard‑coded → then DB)
   - Lead form component + `/api/leads`
   - Read leads in a basic `/dashboard` page
   - Add scoring + rep assignment

5. **Scraper service (later)**
   - New repo: `pitch-scraper`
   - Python + FastAPI, hitting Supabase via PostgREST or direct driver
   - Schedule with cron / worker

---

## 7. First Tasks (Concrete)

- [ ] Init Next.js + Tailwind app
- [ ] Set up Supabase project & env vars
- [ ] Define DB schema (SQL or via Supabase UI)
- [ ] Create basic `DeckCard` + gallery page
- [ ] Build `LeadForm` component with validation
- [ ] Implement `/api/leads` to insert into `leads`
- [ ] Spin up simple `/dashboard/leads` page listing new leads
- [ ] Deploy to Vercel and test end‑to‑end

This doc is your starting compass inside Cursor: open it, keep it visible, and tick items off as you go.
```


---

# how should I bring in the deck jpeg files I need?

You have **three main options** for bringing in your deck JPEG files, each with different trade-offs:

***

## Option 1: Local `/public` folder (Simplest for MVP)

**How:**

1. Create `/public/decks/` folder in your Next.js project
2. Drop JPEG files in organized folders:

```
/public/decks/
  /deck-1-sci-fi-thriller/
    slide-01.jpg
    slide-02.jpg
    ...
  /deck-2-horror-drama/
    slide-01.jpg
    ...
```

3. Reference in code:

```tsx
<Image 
  src="/decks/deck-1-sci-fi-thriller/slide-01.jpg"
  width={1920}
  height={1080}
  alt="Slide 1"
/>
```


**Pros:**

- ✅ Zero setup, works immediately
- ✅ Next.js `Image` component auto-optimizes (WebP/AVIF conversion, lazy loading, responsive sizes)[^8_1][^8_2]
- ✅ Deployed with your app to Vercel's CDN automatically
- ✅ No extra cost

**Cons:**

- ⚠️ Increases Git repo size (10 decks × 10 slides × 2MB = ~200MB)
- ⚠️ Longer build times as images are optimized at build/runtime
- ⚠️ Not ideal for frequently changing content (requires redeployment)

**Best for:**

- MVP with <50 total images
- Static showcase that doesn't change often
- Getting started fast (literally drag-and-drop)

***

## Option 2: Supabase Storage (Recommended for your use case)

**How:**

1. In Supabase dashboard, create a `pitch-decks` bucket
2. Upload JPEGs via:
    - Supabase UI (manual), or
    - Script/API (programmatic)
3. Get public URLs or signed URLs
4. Store URLs in your `slides` table:

```sql
slides (
  id,
  deck_id,
  slide_number,
  image_url -- https://[project].supabase.co/storage/v1/...
)
```

5. Reference in Next.js:

```tsx
<Image 
  src={slide.image_url}
  width={1920}
  height={1080}
  alt="Slide"
  loader={supabaseLoader} // optional custom loader
/>
```


**Pros:**

- ✅ Separates content from code (cleaner Git repo)
- ✅ 1GB free storage on Supabase
- ✅ Easy to add/update decks without redeploying
- ✅ Can set access policies (public vs authenticated)
- ✅ Integrated with your database (deck metadata + images in one place)
- ✅ Still works with Next.js `Image` optimization[^8_3]

**Cons:**

- ⚠️ Requires initial upload step
- ⚠️ External domain needs to be allowlisted in `next.config.js`:

```js
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: '[project].supabase.co'
  }]
}
```


**Best for:**

- Dynamic content (adding new decks over time)
- You're already using Supabase
- Keeping repo lightweight

***

## Option 3: Vercel Blob Storage (Best performance at scale)

**How:**

1. Install: `npm install @vercel/blob`
2. Upload via API route or script:

```ts
import { put } from '@vercel/blob';

const blob = await put('decks/deck-1/slide-01.jpg', file, {
  access: 'public',
});
// blob.url = 'https://[hash].public.blob.vercel-storage.com/...'
```

3. Store blob URLs in database
4. Use in `Image` component (same as Supabase method)

**Pros:**

- ✅ 5GB free tier (10× more than Supabase)[^8_4]
- ✅ Built-in CDN optimized for Vercel deployments
- ✅ Fastest performance (same infra as your app)[^8_4]
- ✅ 2M monthly requests included
- ✅ Unified authentication/billing with Vercel

**Cons:**

- ⚠️ Vercel-specific (vendor lock-in)
- ⚠️ 4.5MB serverless function limit affects *uploads*, not storage[^8_5]
- ⚠️ Requires separate upload step (not as simple as `/public`)

**Best for:**

- High-traffic sites
- You're already all-in on Vercel
- Performance is critical

***

## My Recommendation for You

**Start with `/public` for MVP** (Option 1):

- Get the site working in 1 day
- 10 decks × 10-15 slides = ~150 images ≈ 200-300MB (manageable)
- Zero configuration, zero cost

**Migrate to Supabase Storage after launch** (Option 2):

- Once you validate the concept
- When you need to add decks without redeploying
- Keeps your existing Supabase stack unified

***

## Practical Implementation Steps

### Quick Start (Option 1 - `/public`):

```bash
# In your Next.js project root:
mkdir -p public/decks

# Copy your deck folders:
cp -r ~/path/to/deck-exports/* public/decks/

# Commit to Git
git add public/decks
git commit -m "Add pitch deck images"
git push
```


### Migration to Supabase (Option 2 - later):

```typescript
// scripts/upload-to-supabase.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function uploadDecks() {
  const decksDir = './public/decks';
  const folders = fs.readdirSync(decksDir);
  
  for (const folder of folders) {
    const deckPath = path.join(decksDir, folder);
    const files = fs.readdirSync(deckPath);
    
    for (const file of files) {
      const filePath = path.join(deckPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      const { data, error } = await supabase.storage
        .from('pitch-decks')
        .upload(`${folder}/${file}`, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: false
        });
      
      if (error) console.error(`Failed: ${file}`, error);
      else console.log(`Uploaded: ${file}`);
    }
  }
}

uploadDecks();
```


***

## Next.js Image Optimization Tips (all options)

Regardless of where you store images, use these patterns:

```tsx
// components/SlideViewer.tsx
import Image from 'next/image';

export function SlideViewer({ slide }) {
  return (
    <Image
      src={slide.image_url} // or `/decks/...` for local
      alt={`Slide ${slide.slide_number}`}
      width={1920}  // actual dimensions
      height={1080}
      quality={85}  // 75-90 is sweet spot
      priority={slide.slide_number === 1} // LCP optimization for first slide
      placeholder="blur" // optional: requires blurDataURL
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

**Key optimizations:**

- `priority` for above-the-fold images (first slide of each deck)[^8_3]
- `sizes` tells Next.js which responsive sizes to generate[^8_1]
- `quality={85}` balances file size vs visual quality[^8_3]
- Lazy loading is automatic for all non-priority images[^8_2]

***

**TL;DR:** Drop JPEGs in `/public/decks/` today, deploy in 5 minutes. Migrate to Supabase Storage when you need dynamic updates later.[^8_6][^8_1][^8_4]
<span style="display:none">[^8_10][^8_11][^8_12][^8_13][^8_14][^8_15][^8_16][^8_17][^8_18][^8_7][^8_8][^8_9]</span>

<div align="center">⁂</div>

[^8_1]: https://nextjs.org/docs/14/app/building-your-application/optimizing/images

[^8_2]: https://nextjs.org/docs/app/getting-started/images

[^8_3]: https://geekyants.com/en-us/blog/optimizing-image-performance-in-nextjs-best-practices-for-fast-visual-web-apps

[^8_4]: https://manishsaraan.com/blog/why-i-migrated-from-supabase-to-vercel-blob-storage

[^8_5]: https://github.com/payloadcms/payload/discussions/7569

[^8_6]: https://uploadcare.com/blog/image-optimization-in-nextjs/

[^8_7]: https://arxiv.org/html/2504.03884v1

[^8_8]: https://arxiv.org/pdf/2310.00560.pdf

[^8_9]: http://arxiv.org/pdf/2412.09474.pdf

[^8_10]: https://arxiv.org/html/2401.03613v1

[^8_11]: https://arxiv.org/html/2503.22643

[^8_12]: https://arxiv.org/html/2402.16262v1

[^8_13]: https://arxiv.org/pdf/1807.01147.pdf

[^8_14]: https://arxiv.org/pdf/2402.17111.pdf

[^8_15]: https://strapi.io/blog/nextjs-image-optimization-developers-guide

[^8_16]: https://www.debugbear.com/blog/nextjs-image-optimization

[^8_17]: https://www.reddit.com/r/nextjs/comments/1d1usuj/image_optimization_public_folder_vs_other_folders/

[^8_18]: https://nextjs.org/docs/app/api-reference/components/image


---

# I would also like ti to be more artistic in approach and take inspiration from this guy: [https://www.google.com/url?sa=t\&source=web\&rct=j\&opi=89978449\&url=https://www.niccolomiranda.com/\&ved=2ahUKEwjUjfT0qZuSAxWvJUQIHR8bGbgQFnoECBsQAQ\&usg=AOvVaw3W_3gym4U43WkhPQQvtXDL](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.niccolomiranda.com/&ved=2ahUKEwjUjfT0qZuSAxWvJUQIHR8bGbgQFnoECBsQAQ&usg=AOvVaw3W_3gym4U43WkhPQQvtXDL)

Perfect! Niccolò Miranda's site is a masterclass in artistic portfolio design. Here's how to capture that aesthetic for your pitch deck showcase:

***

## **Key Design Elements from Niccolò Miranda's Style**

Based on his award-winning "Paper Portfolio":[^9_1]

### **1. Typography as Art**

- **Huge, bold headlines** that dominate the screen
- Mixed case, artistic typefaces (not corporate sans-serif)
- Text becomes the visual hero, not just content
- Layered typography with depth


### **2. Scroll-Based Storytelling**

- **Parallax effects** — different layers move at different speeds[^9_2]
- Spiral/circular animations that respond to scroll[^9_3]
- Revealed content as you progress down the page
- Smooth, buttery scroll interactions (likely GSAP ScrollTrigger)


### **3. Paper/Texture Aesthetic**

- "Paper Portfolio" concept — tactile, handcrafted feel
- Subtle grain, shadows, and depth
- Not flat material design — more dimensional
- Cream/off-white backgrounds (not stark white)


### **4. Bold Color Accents**

- Strategic pops of color against neutral base
- High contrast for emphasis
- Vibrant hover states


### **5. Interactive Motion**

- Elements that react to mouse movement
- Custom cursor animations[^9_4]
- Smooth page transitions with Framer Motion[^9_3][^9_4]
- Micro-interactions on hover (rotation, scale, color shift)[^9_5]

***

## **Tech Stack to Achieve This Style**

### **Animation Libraries (Essential)**

| Library | What Niccolò Uses It For | Your Use Case |
| :-- | :-- | :-- |
| **Framer Motion** | Page transitions, element reveals, smooth scroll animations [^9_3][^9_4] | Deck card entrance animations, page transitions, gallery reveals |
| **GSAP** (GreenSock) | Custom cursor, complex scroll-triggered animations, spiral effect [^9_3][^9_2] | Parallax slide reveals, custom scroll interactions, 3D transforms |
| **Locomotive Scroll** | Smooth scroll engine (alternative to native scroll) [^9_2] | Buttery smooth scrolling experience like Miranda's site |

### **3D \& Depth Effects**

- **Spline** for 3D elements (Miranda uses this)[^9_4]
- **Three.js + React Three Fiber** for WebGL 3D scenes[^9_6][^9_4]
- CSS `transform: perspective()` for layered depth


### **Typography**

- **Variable fonts** (adjustable weight, width on scroll)
- **Large display fonts**: Try Caudex, Spectral, Fraunces, or custom display faces
- **Kinetic typography** (text that moves/morphs on interaction)

***

## **Specific Techniques to Implement**

### **1. Hero Section (Miranda-Style)**

```tsx
// components/Hero.tsx
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background layer - slower parallax */}
      <motion.div 
        className="absolute inset-0 bg-[#f5f3ed]" // paper-like cream
        style={{ y: useParallax(0.5) }} // custom hook for scroll-based movement
      />
      
      {/* Main headline - artistic typography */}
      <motion.h1 
        className="text-[20vw] font-display leading-[0.85] text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        <span className="block">Pitch</span>
        <span className="block italic text-indigo-600">Decks</span>
        <span className="block">Reimagined</span>
      </motion.h1>
      
      {/* Floating accent element */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
```


### **2. Parallax Gallery Grid**

```tsx
// components/DeckGrid.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function DeckGrid({ decks }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {decks.map((deck, i) => {
        // Each card at different parallax speed
        const y = useTransform(scrollYProgress, [0, 1], [100 * (i % 3), -100 * (i % 3)]);
        
        return (
          <motion.div
            key={deck.id}
            style={{ y }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={deck.cover_image_url}
                alt={deck.title}
                width={600}
                height={800}
                className="transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-3xl font-display mb-2">{deck.title}</h3>
                  <p className="text-sm opacity-80">{deck.genre.join(', ')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
```


### **3. Custom Animated Cursor (Miranda Signature)**

```tsx
// components/CustomCursor.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-indigo-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
```


### **4. Scroll-Triggered Section Reveals**

```tsx
// components/AboutSection.tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h2 className="text-7xl font-display mb-8 leading-tight">
          Think, Create<br />
          <span className="italic text-indigo-600">Deliver</span>
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          A strong project is created by deep collaboration. We design, develop, 
          and deliver pitch decks that drive results and win attention.
        </p>
      </motion.div>
    </section>
  );
}
```


***

## **Design System Inspired by Miranda**

### **Color Palette**

```css
/* Base (Paper aesthetic) */
--paper: #f5f3ed;
--charcoal: #2a2a2a;
--soft-black: #1a1a1a;

/* Accent */
--indigo: #4f46e5;
--purple: #7c3aed;
--coral: #ff6b6b;

/* Depth */
--shadow-soft: 0 10px 50px rgba(0,0,0,0.08);
--shadow-strong: 0 20px 80px rgba(0,0,0,0.15);
```


### **Typography Scale**

```css
/* Display (headlines) */
font-family: 'Fraunces', 'Spectral', serif; /* Variable font */
font-size: clamp(3rem, 15vw, 12rem); /* Responsive huge text */
line-height: 0.9; /* Tight leading */

/* Body */
font-family: 'Inter', 'Space Grotesk', sans-serif;
font-size: 1.125rem;
line-height: 1.7;
```


### **Spacing (Generous whitespace)**

```css
/* Miranda uses LOTS of breathing room */
section {
  padding: 10vh 8vw; /* Percentage-based for responsiveness */
}
```


***

## **Tailwind Config for Miranda-Style**

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'], // Artistic headlines
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        paper: '#f5f3ed',
        charcoal: '#2a2a2a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    }
  }
}
```


***

## **Updated Tech Stack (Artistic Edition)**

```markdown
Frontend:       Next.js + React + TypeScript
Styling:        Tailwind CSS + Custom CSS for animations
Animation:      Framer Motion + GSAP (ScrollTrigger, custom cursor)
Scroll:         Locomotive Scroll (optional, for ultra-smooth scrolling)
3D (optional):  Spline or Three.js (for accent elements)
Typography:     Google Fonts Variable Fonts (Fraunces, Inter)
Database:       Supabase (same as before)
Hosting:        Vercel
```


***

## **Portfolio Layout Inspiration**

### **Page Structure (Miranda-inspired)**

1. **Hero** — Full-screen bold typography + subtle animated background
2. **Featured Work** — 2-3 standout decks with large imagery
3. **All Decks Grid** — Parallax grid with staggered scroll reveals
4. **Process Section** — "Think, Create, Deliver" methodology
5. **Lead Form** — Artistic modal/overlay (not boring contact form)
6. **Footer** — Minimal, elegant social links

### **Deck Detail Page**

```
- Hero image (full bleed)
- Project metadata (genre, budget, audience)
- Lightbox gallery with slide-by-slide navigation
- Scroll-triggered slide reveals (each slide fades in as you scroll)
- Download PDF CTA
- Next/Previous deck navigation
```


***

## **Resources to Study**

**Sites to analyze:**

- Awwwards (search "Niccolò Miranda" for his featured work)
- Dribbble (niccolomiranda profile for design explorations)[^9_7]

**Tutorials:**

- Awwwards Academy — Miranda's course "Creative Portfolios"[^9_8][^9_9]
- YouTube: "Build 3D Portfolio with Framer Motion GSAP"[^9_4]
- YouTube: "Niccolò Miranda Paper Portfolio - Made in Webflow"[^9_3]

***

## **Implementation Timeline**

**Phase 1: Core Structure (4 hours)**

- Next.js setup + Tailwind
- Typography system
- Basic layout (hero, grid, footer)

**Phase 2: Animation Layer (6-8 hours)**

- Install Framer Motion + GSAP
- Implement parallax scroll effects
- Add custom cursor
- Scroll-triggered reveals

**Phase 3: Polish (3-4 hours)**

- Fine-tune easing curves
- Add micro-interactions
- Optimize performance (lazy load animations)
- Mobile responsiveness

***

**Bottom line:** Miranda's style is **motion + typography + space**. Focus on making text huge and beautiful, add smooth scroll interactions with Framer Motion/GSAP, use generous whitespace, and give everything depth through parallax. Your pitch decks will feel like art pieces, not just documents.[^9_10][^9_9][^9_3]
<span style="display:none">[^9_11][^9_12][^9_13][^9_14][^9_15][^9_16][^9_17][^9_18][^9_19][^9_20][^9_21][^9_22][^9_23][^9_24][^9_25][^9_26][^9_27][^9_28][^9_29]</span>

<div align="center">⁂</div>

[^9_1]: https://arxiv.org/html/2504.03884v1

[^9_2]: https://muffingroup.com/blog/parallax-scrolling-websites/

[^9_3]: https://www.youtube.com/watch?v=3be-fwHS7Z8

[^9_4]: https://www.youtube.com/watch?v=UN4yepTMF9I

[^9_5]: https://www.divi-pixel.com/web-design-trends-2026/

[^9_6]: https://orpetron.com/blog/10-stunning-websites-using-framer-motion-for-next-level-web-animation/

[^9_7]: https://dribbble.com/niccolomiranda

[^9_8]: https://www.youtube.com/watch?v=ZvnztwtISFg

[^9_9]: https://www.awwwards.com/design-for-code-awwwards-academy-free-lesson-from-niccolo-miranda.html

[^9_10]: https://www.niccolomiranda.com

[^9_11]: https://dl.acm.org/doi/10.1145/3587424.3595586

[^9_12]: https://dl.acm.org/doi/10.1145/3532724.3535612

[^9_13]: https://sloap.org/journals/index.php/irjeis/article/view/2274

[^9_14]: https://www.semanticscholar.org/paper/6c058de17328f991ab42d9f90ff79508b4067432

[^9_15]: https://ieeexplore.ieee.org/document/10820320/

[^9_16]: https://www.semanticscholar.org/paper/a1173820f64f84819d5e8c69102b17000ebd908c

[^9_17]: https://ieeexplore.ieee.org/document/9197016/

[^9_18]: https://academic.oup.com/bjs/article/doi/10.1093/bjs/znad370/7455707

[^9_19]: https://onlinelibrary.wiley.com/doi/10.1111/cgf.13435

[^9_20]: http://ieeexplore.ieee.org/document/7177784/

[^9_21]: https://arxiv.org/html/2501.16550v1

[^9_22]: https://arxiv.org/html/2411.08656v2

[^9_23]: https://arxiv.org/html/2411.10818v1

[^9_24]: http://arxiv.org/pdf/2310.10079.pdf

[^9_25]: https://arxiv.org/html/2411.19381

[^9_26]: https://arxiv.org/abs/1712.06654

[^9_27]: https://arxiv.org/html/2503.19351v1

[^9_28]: https://pdf.blucher.com.br/designproceedings/7spdesign/030.pdf

[^9_29]: https://www.youtube.com/watch?v=7Vilz35UhXM


---

# give me another code block to use inside my repo so we can execute this quickly.

```markdown
# Artistic Pitch Deck Showcase — Build Guide (Niccolò Miranda Style)

## Design Philosophy
- **Typography as hero** — Huge, bold, artistic fonts dominate
- **Parallax depth** — Layers move at different speeds
- **Buttery smooth** — GSAP + Framer Motion for premium feel
- **Paper aesthetic** — Cream backgrounds, tactile shadows, dimensional
- **Generous whitespace** — Let content breathe (10vh+ padding)

---

## Tech Stack (Artistic Edition)

**Core**
- Next.js 15 App Router + React 19
- TypeScript
- Tailwind CSS v4

**Animation**
- Framer Motion (page transitions, reveals, parallax)
- GSAP + ScrollTrigger (custom cursor, complex scroll animations)
- Locomotive Scroll (optional: ultra-smooth scrolling)

**3D/Visual (Optional Phase 2)**
- Spline (3D elements) OR Three.js + React Three Fiber

**Typography**
- Google Fonts Variable: Fraunces (display), Inter (body)

**Backend**
- Supabase (PostgreSQL + Auth + Storage)
- Vercel (hosting + CDN)

---

## Installation Commands

```bash
# 1. Create Next.js project
npx create-next-app@latest pitch-decks --typescript --tailwind --app --no-src-dir
cd pitch-decks

# 2. Install animation libraries
npm install framer-motion gsap @gsap/react

# 3. Install Supabase client
npm install @supabase/supabase-js

# 4. Install form validation
npm install react-hook-form zod @hookform/resolvers

# 5. Install optional libraries
npm install locomotive-scroll @studio-freight/lenis # smooth scroll
npm install @react-three/fiber @react-three/drei three # 3D (optional)

# 6. Install dev dependencies
npm install -D @types/locomotive-scroll
```


---

## Project Structure

```
pitch-decks/
├── app/
│   ├── layout.tsx              # Root layout + font setup
│   ├── page.tsx                # Homepage (hero + featured decks)
│   ├── gallery/
│   │   └── page.tsx            # All decks grid (parallax)
│   ├── decks/
│   │   └── [id]/
│   │       └── page.tsx        # Single deck viewer (lightbox)
│   ├── contact/
│   │   └── page.tsx            # Lead form (artistic modal)
│   └── api/
│       └── leads/
│           └── route.ts        # POST endpoint for form
│
├── components/
│   ├── CustomCursor.tsx        # GSAP animated cursor
│   ├── Hero.tsx                # Full-screen hero with huge typography
│   ├── DeckGrid.tsx            # Parallax grid of deck cards
│   ├── DeckCard.tsx            # Single deck card with hover effects
│   ├── LightboxViewer.tsx      # Full-screen slide viewer
│   ├── LeadForm.tsx            # Artistic intake form
│   ├── SmoothScroll.tsx        # Locomotive/Lenis wrapper
│   └── PageTransition.tsx      # Framer Motion page transitions
│
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── types.ts                # TypeScript types
│   └── animations.ts           # Reusable animation variants
│
├── hooks/
│   ├── useParallax.ts          # Scroll-based parallax hook
│   ├── useCursor.ts            # Custom cursor logic
│   └── useDecks.ts             # Fetch decks from DB
│
├── public/
│   └── decks/                  # JPEG files (MVP approach)
│       ├── deck-1/
│       │   ├── slide-01.jpg
│       │   └── slide-02.jpg
│       └── deck-2/
│
├── styles/
│   └── globals.css             # Custom CSS + Tailwind overrides
│
├── .env.local                  # Supabase keys
├── tailwind.config.ts          # Custom theme (colors, fonts, animations)
└── next.config.ts              # Image domains, etc.
```


---

## File Templates (Copy-Paste Ready)

### 1. `tailwind.config.ts` (Artistic Theme)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f5f3ed',      // Cream background
        charcoal: '#2a2a2a',   // Dark text
        soft: '#f9f8f4',       // Lighter variant
        accent: {
          indigo: '#4f46e5',
          purple: '#7c3aed',
          coral: '#ff6b6b',
        }
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 15vw, 12rem)',    // Responsive huge text
        'display': 'clamp(2rem, 8vw, 6rem)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'soft': '0 10px 50px rgba(0,0,0,0.08)',
        'strong': '0 20px 80px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}

export default config
```


---

### 2. `app/layout.tsx` (Font Setup + Cursor)

```typescript
import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pitch Decks — Reimagined',
  description: 'Award-winning TV & Film pitch deck showcase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-paper font-body text-charcoal antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
```


---

### 3. `components/CustomCursor.tsx` (GSAP Animated Cursor)

```typescript
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-accent-indigo rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-accent-indigo rounded-full pointer-events-none z-50 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
```


---

### 4. `components/Hero.tsx` (Full-Screen Hero)

```typescript
'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden px-8">
      {/* Animated background gradient blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent-indigo/20 to-accent-purple/20 blur-3xl"
        animate={{
          x: ,
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-display text-hero leading-[0.85] mb-8">
          <span className="block">Pitch</span>
          ```
          <span className="block italic text-accent-indigo">Decks</span>
          ```
          <span className="block">Reimagined</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-charcoal/70 max-w-2xl mx-auto"
        >
          Award-winning TV & Film presentations that captivate, inspire, and win deals
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <a
            href="/gallery"
            className="inline-block px-8 py-4 bg-charcoal text-paper rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
          >
            View Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y:  }}[^10_1]
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-charcoal/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
```


---

### 5. `hooks/useParallax.ts` (Scroll Parallax Hook)

```typescript
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

export function useParallax(
  ref: RefObject<HTMLElement>,
  distance: number = 100
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return useTransform(scrollYProgress,, [-distance, distance])[^10_2]
}
```


---

### 6. `components/DeckCard.tsx` (Interactive Card)

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface DeckCardProps {
  deck: {
    id: string
    title: string
    genre: string[]
    cover_image_url: string
  }
  index: number
}

export default function DeckCard({ deck, index }: DeckCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="group cursor-pointer"
    >
      <Link href={`/decks/${deck.id}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-strong transition-shadow duration-500">
          <div className="aspect-[3/4] relative">
            <Image
              src={deck.cover_image_url}
              alt={deck.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent flex items-end p-6"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white">
              ```
              <h3 className="font-display text-3xl mb-2">{deck.title}</h3>
              ```
              ```
              <p className="text-sm opacity-80">{deck.genre.join(', ')}</p>
              ```
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
```


---

### 7. `.env.local` (Supabase Config)

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```


---

### 8. `lib/supabase.ts` (Database Client)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type-safe queries
export type Deck = {
  id: string
  title: string
  description: string
  genre: string[]
  cover_image_url: string
  pdf_url: string
  created_at: string
}

export type Lead = {
  id: string
  full_name: string
  email: string
  phone?: string
  project_type: string[]
  budget_range: string
  timeline: string
  project_description: string
  lead_score: number
  status: string
  created_at: string
}
```


---

### 9. `styles/globals.css` (Custom Styles)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-paper text-charcoal;
    cursor: none; /* Hide default cursor for custom one */
  }

  /* Hide custom cursor on mobile */
  @media (max-width: 768px) {
    body {
      cursor: auto;
    }
  }
}

@layer utilities {
  /* Text selection */
  ::selection {
    @apply bg-accent-indigo/20 text-charcoal;
  }

  /* Smooth scrollbar (optional) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-paper;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-charcoal/20 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-charcoal/40;
  }
}
```


---

## Build Sequence (Step-by-Step)

### Phase 1: Foundation (30 min)

```bash
# 1. Run installation commands (see above)
# 2. Copy all file templates into project
# 3. Set up Supabase project (supabase.com)
# 4. Add env vars to .env.local
# 5. Test dev server
npm run dev
# Visit http://localhost:3000
```


### Phase 2: Database (20 min)

```sql
-- In Supabase SQL Editor, run:
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT[],
  cover_image_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT[],
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,
  lead_score INT DEFAULT 0,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```


### Phase 3: Content (15 min)

```bash
# Copy your deck JPEGs
mkdir -p public/decks
# Drag folders into public/decks/

# Add sample data via Supabase UI or SQL:
INSERT INTO decks (title, description, genre, cover_image_url)
VALUES 
  ('Sci-Fi Thriller', 'A mind-bending journey', ARRAY['Sci-Fi', 'Thriller'], '/decks/deck-1/slide-01.jpg'),
  ('Horror Drama', 'Psychological terror', ARRAY['Horror', 'Drama'], '/decks/deck-2/slide-01.jpg');
```


### Phase 4: Build Pages (2-3 hours)

```bash
# 1. Use Hero component in app/page.tsx
# 2. Create gallery page (map DeckCard over fetched decks)
# 3. Build single deck viewer with lightbox
# 4. Add lead form component
# 5. Create /api/leads route (validate + insert)
```


### Phase 5: Animation Polish (1-2 hours)

```bash
# 1. Add parallax to DeckGrid
# 2. Implement scroll-triggered reveals (useInView)
# 3. Test custom cursor
# 4. Fine-tune easing curves
```


### Phase 6: Deploy (5 min)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main

# In Vercel:
# - Import GitHub repo
# - Add env vars (SUPABASE_URL, SUPABASE_ANON_KEY)
# - Deploy automatically
```


---

## Performance Checklist

- [ ] Image optimization: all images use Next.js `<Image>` component
- [ ] Priority loading: first slide of each deck has `priority` prop
- [ ] Lazy animations: use `whileInView` instead of `animate` for off-screen elements
- [ ] Font optimization: `display: swap` in font config
- [ ] Code splitting: dynamic imports for heavy components
- [ ] Lighthouse score: aim for 90+ on mobile/desktop

---

## Quick Reference Commands

```bash
# Dev server
npm run dev

# Production build test
npm run build && npm start

# Type check
npx tsc --noEmit

# Deploy to Vercel
vercel --prod
```


---

## Design Resources

**Fonts**

- Fraunces (display): google.com/fonts/specimen/Fraunces
- Inter (body): google.com/fonts/specimen/Inter

**Inspiration**

- niccolomiranda.com (study scroll behavior)
- awwwards.com/websites/portfolio (browse award winners)
- dribbble.com/niccolomiranda (visual exploration)

**Animation Easing**

- easings.net (visualize easing curves)
- Use `ease: [0.6, 0.01, 0.05, 0.95]` for smooth entrance animations

---

This is your complete build guide. Open this in Cursor, follow step-by-step, and you'll have an award-worthy artistic portfolio in 6-8 hours.

```


<div align="center">⁂</div>

[^10_1]: https://strapi.io/blog/nextjs-image-optimization-developers-guide
[^10_2]: https://arxiv.org/html/2504.03884v1```

