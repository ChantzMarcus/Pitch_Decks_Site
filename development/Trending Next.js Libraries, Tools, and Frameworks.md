<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Trending Next.js Libraries, Tools, and Frameworks in Early 2026

## 1. How this list is built (and limitations)

GitHub itself no longer exposes “stars gained in the last N months” directly in the UI or a simple API; that data has to be inferred from secondary services (OSS Insight, BestOfJS, JavaScript Rising Stars, etc.) and snapshots over time.[^1][^2][^3][^4]

This ranking therefore uses:

- **Star velocity (approx. last 3–12 months)** from:
    - JavaScript Rising Stars 2023/2024 (Nextra, shadcn/ui, etc.).[^2]
    - BestOfJS and topic pages showing “recently updated” and “popular” for Next.js, static-site-generator, and UI-kit categories.[^5][^6][^7]
    - Badge providers (badgen, shields) exposing current star counts for some repos (e.g., Nextra).[^8]
- **Active maintenance** from:
    - Recent releases and continuous commits (2024–2026) on GitHub.[^9][^10][^11][^12][^13]
- **Production readiness** from:
    - Documentation positioning (e.g., “enterprise-grade,” “Next.js native CMS,” “leading headless CMS”).[payload][strapi][^14][^15][^9]
    - Broad adoption metrics (“Used by” counts on GitHub).[prisma][strapi][^12]
- **TypeScript support** from:
    - Language stats and docs explicitly stating TypeScript-first design.[prisma][payload][strapi][^16][^17][^12]

Exact “stars gained in the last 6 months” cannot be given for every repo; instead, star velocity is rated qualitatively:

- **Explosive** – rapid adoption, typically thousands of new stars per quarter.
- **High** – sustained growth, hundreds to low thousands per quarter.
- **Steady/Mature** – growth, but slower relative to already large base.

All rankings reflect the state of the ecosystem around **January 2026**.

***

## 2. Snapshot: top-trending Next.js ecosystem projects

The table below focuses on projects that are either **Next.js-native** or heavily used in modern Next.js stacks.


| Rank (overall) | Project | Category | Approx. star trend (2025→early‑2026) | Maintenance | Production‑ready | TypeScript support |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 1 | **shadcn/ui** (`shadcn-ui/ui`) | UI components / design system | **Explosive** – crossed ~100k+ stars by late 2025[^17] | Very active; frequent releases into 2026[^17][^18] | Widely used in production dashboards, SaaS UIs[^19][^20] | **TS‑first** components, docs recommend TS[^16] |
| 2 | **Nextra** (`shuding/nextra`) | Docs / static site framework on Next.js | **High** – +4.2k stars in 2023 alone; ~13.6k total by 2025[^2][^8][^5] | Very active; v4 with App Router \& RSC support in 2025[^21][^22] | De facto standard for many modern docs sites | TS support, RSC‑ready, strong Next 13+/15 story[^21][^22] |
| 3 | **Payload** (`payloadcms/payload`) | Next.js‑native CMS / app framework | **High** – surged in popularity 2024–25 as “first Next.js‑native CMS”[payload] | Frequent 3.x releases through late 2025[payload] | Used as fullstack framework and headless CMS | **TS‑first**; automatic types for data models[payload] |
| 4 | **Next.js Enterprise Boilerplate** (`Blazity/next-enterprise`) | Enterprise app boilerplate | **High** – ~7.3k stars with strong growth 2024–25[^9][^23][^24] | Actively maintained by a commercial Next consultancy[^9][^14] | Positioned explicitly for production enterprise apps[^9][^25] | Strict TS config, ts‑reset, T3 Env, etc.[^9] |
| 5 | **Prisma** (`prisma/prisma`) | ORM for Next.js backends | **Steady/High** – ~45k stars by late 2025[prisma] | Very active; 7.x releases in Dec 2025[prisma] | Core building block in many production Next stacks | **TS‑first** ORM, type‑safe client[prisma] |
| 6 | **create‑t3‑app** (`t3-oss/create-t3-app`) | Full‑stack Next.js starter CLI | **High** – ~28k stars and still trending[^13] | Very active; frequent releases in 2025[^13] | Used widely as production starter for “T3 stack” apps | Strong TS, tRPC, Prisma, NextAuth integration[^13] |
| 7 | **Auth.js / NextAuth.js** (`nextauthjs/next-auth`) | Auth for Next.js \& web | **Steady/High** – ~20k+ stars by 2024–25[^26][^15] | Continuous releases across many adapters into late 2025[^15] | Default choice for many Next apps; also controversial DX[^27][^26] | TS types throughout; “type safety in mind”[^15] |
| 8 | **Strapi** (`strapi/strapi`) | Headless CMS used with Next.js | **Steady/High** – ~70k+ stars by 2025[strapi] | Very active v5.x releases in late 2025[strapi] | Mature, widely deployed multi‑framework CMS | 100% JS/TS; strong TS coverage[strapi] |
| 9 | **SWR** (`vercel/swr`) | Data fetching / caching | **Steady** – ~32.3k stars[^12] | Continuous active issues \& updates through 2025[^10][^12] | Stable, production‑grade, widely used[^12][^28] | Implemented in TS; strong type inference[^12] |
| 10 | **next-themes** (`pacocoursey/next-themes`) | Theming / dark mode for Next | **Steady** – ~6k stars; massive “Used by” count[ next-themes ] | Recent releases in 2025; active maintenance | Very widely deployed (hundreds of thousands of dependents) | 100% TypeScript in repo[ next-themes ] |
| 11 | **better-auth** (`better-auth/better-auth`) | Next‑friendly auth framework | **Explosive** – quickly accumulating thousands of stars 2024–25; dozens of issues per week show high adoption[better-auth] | Extremely active roadmap and maintenance into late 2025[better-auth] | Production‑ready for many, still evolving fast | TS‑first; focused on type‑safe APIs[better-auth][next-auth] |
| 12 | **next-sitemap** (`iamvishnusankar/next-sitemap`) | Sitemaps / robots.txt | **Mature** – ~3.6k stars; used by 48k+ repos[next-sitemap] | Releases through 2023; still widely depended on[next-sitemap] | Very battle‑tested; used by tens of thousands[next-sitemap] | 99% TypeScript[next-sitemap] |
| 13 | **next-seo** (`garmeeh/next-seo`) | SEO helper for Next | **Mature** – large install base, moderate star growth[garmeeh] | Ongoing CI and dependency updates with Next 15 support[garmeeh] | Production‑grade SEO helper, stable | TS typings; modern Next 15 examples[garmeeh] |

Where multiple projects are in the same functional space, the analysis below calls that out explicitly.

***

## 3. UI \& Design Systems

### 3.1 shadcn/ui – de facto standard for modern Next.js UI

**What it is.** shadcn/ui is a set of copy‑and‑own UI components built on Radix UI + Tailwind, distributed as source code you pull into your own project instead of a binary component library. It is framework‑agnostic React UI, but the docs and tooling heavily target Next.js.[^19][^18]

**Star growth.**

- GitHub shows **~105k stars** by late 2025 with rapid growth, and issues pages reflect that number.[^17]
- It is now one of the top UI kits on GitHub and regularly appears near the top of UI framework rankings.[^29]

**Maintenance.**

- Frequent tagged releases (e.g., `shadcn@3.7.0` in Jan 2026) and active contributions from hundreds of maintainers.[^17]
- Official docs show ongoing Next.js integration improvements and monorepo setups.[^18]

**Production readiness.**

- Strong usage in real‑world admin dashboards and SaaS products; educational content from major channels (e.g., admin dashboards with Next.js + shadcn/ui) indicates real‑world maturity.[^20][^19]
- Built on Radix primitives, which are accessibility‑focused and battle‑tested.

**TypeScript.**

- The project and components are explicitly written in TypeScript; docs “recommend using TypeScript for your project as well.”[^16]

**Verdict for a Next.js app (2026).**
shadcn/ui is the **top‑trending UI choice** for serious Next.js applications: explosive star growth, very active maintenance, production‑proven, and TypeScript‑first.

***

### 3.2 next-themes – standard solution for dark mode \& theming

**What it is.** `next-themes` provides a Next‑optimized abstraction for color themes, handling SSR, system preference, and flashing, and integrates cleanly with Tailwind.[next-themes]

**Trend \& usage.**

- Roughly **6k stars** and, more importantly, over **700k dependents** on GitHub, indicating enormous production usage across the ecosystem.[next-themes]
- Tutorials for shadcn dashboards and modern Next.js templates commonly standardize on `next-themes` for theme toggling.[^19]

**Maintenance \& production.**

- Recent releases (e.g., v0.4.6 in March 2025) and compatibility notes for Next 13 `app/` and beyond[next-themes] show ongoing support.
- The API is intentionally small and stable; most real‑world issues are around hydration edge cases, which the docs address thoroughly[next-themes].

**TypeScript.**

- 100% TypeScript codebase per GitHub language stats, with strong typings for the `useTheme` hook and `ThemeProvider` props.[next-themes]

**When to pick it.**
Use `next-themes` together with shadcn/ui or your own design system whenever you want **reliable dark mode and theme switching** in Next.js.

***

## 4. Documentation \& Site Frameworks

### 4.1 Nextra – Next.js‑based documentation / content framework

**What it is.** Nextra is a “simple, powerful and flexible site generation framework with everything you love from Next.js,” focused on documentation and content-heavy sites.[^7][^2]

**Star trend.**

- JavaScript Rising Stars 2023 ranked Nextra as a top static-site generator with **+4.2k stars that year** alone.[^2]
- Badgen and BestOfJS show **~13.4–13.6k stars** by 2025.[^8][^5]

**Maintenance \& features.**

- Nextra v4 (2025) adds **full Next.js App Router support, Turbopack, RSC + i18n, and a new Rust‑based search engine (Pagefind)**.[^21][^22]
- The repo shows thousands of workflow runs and automated dependency updates, indicating heavy ongoing development.[^21]

**Production readiness.**

- Widely used by OSS projects for docs; The Guild’s migration guide and detailed upgrade documentation reflect a stable, versioned release process.[^22]

**TypeScript.**

- Built on Next.js with TS; examples and framework internals are TypeScript‑centric.

**When to choose it.**
If you are building **Next.js‑based docs or a content site in 2026**, Nextra is one of the clearest, trending defaults.

***

## 5. App Starters \& Enterprise Boilerplates

### 5.1 Next.js Enterprise Boilerplate – enterprise-grade Next starter

**What it is.** `Blazity/next-enterprise` is an **“enterprise-grade Next.js boilerplate”** optimized for large apps: App Router, Tailwind v4, Radix UI, strict TS, comprehensive testing, observability, and Terraform-based infra.[^25][^9][^14]

**Star trend.**

- GitHub topics and profiles show **~7.3k stars** and substantial interest growth during 2024–25.[^23][^24][^9]
- It is listed among leading Next.js boilerplates in curated directories.[^30][^31]

**Maintenance.**

- Maintained by Blazity, a consultancy specializing in large Next.js systems; the README lists named maintainers and emphasizes ongoing security and feature updates.[^9][^14]
- Releases track Next.js 15, modern ESLint/Prettier, Radix UI, and advanced infra patterns.[^9]

**Production readiness.**

- Explicitly designed for enterprise use: CI pipelines, health checks for Kubernetes, OpenTelemetry, Sentry, semantic‑release, component coupling/cohesion graph, etc.[^9]

**TypeScript.**

- Uses **strict TypeScript** with `ts-reset` and a TS‑first approach across the stack.[^9]

**Best use.**
If you are building a **large, enterprise Next.js system** and want a highly opinionated but production‑ready baseline, this is one of the highest‑signal starters in 2026.

***

### 5.2 create‑t3‑app – full‑stack typesafe Next app generator

**What it is.** `create-t3-app` is an interactive CLI that scaffolds a **full‑stack, type‑safe Next.js application** using the T3 stack: Next.js, tRPC, Prisma/Drizzle, Tailwind, NextAuth.js, and TypeScript.[^13]

**Trend \& adoption.**

- The project has **tens of thousands of stars** and is frequently recommended in the Next community as a default for new full‑stack apps.[^32][^13]
- GitHub activity shows continuous merges and releases across 2024–25, including version bumps for Prisma v6 and Next 15 ecosystem updates.[^13]

**Maintenance \& production.**

- Maintainers ship regular releases and run a release pipeline based on changesets, with automation and PR queues visible in the activity log.[^13]
- The stack explicitly prioritizes “bleeding responsibly” and type safety, which resonates strongly with modern Next practices.[^13]

**TypeScript.**

- TS is a first‑class citizen; the stack is intentionally type‑driven end‑to‑end (tRPC, Prisma, Next).[^13]

**When to use.**
If you want to **start a new SaaS or full‑stack app today** and are comfortable with the T3 philosophy, `create-t3-app` remains one of the strongest and most actively maintained Next.js starters.

***

## 6. Auth \& User Management

### 6.1 Auth.js / NextAuth.js – the incumbent standard

**What it is.** Auth.js (the evolution of NextAuth.js) is a set of auth packages for “any framework on any platform,” with deep heritage in Next.js.[^15]

**Trend.**

- Widely cited as having **20k+ GitHub stars** and hundreds of thousands of users by mid‑2020s.[^27][^26]

**Maintenance \& ecosystem.**

- The monorepo includes a very large set of adapters (databases, frameworks) and has over **1,800 releases**, with active releases into late 2025.[^15]
- It remains the default auth recommendation in much of the Next.js ecosystem, though there is rising criticism around complexity and edge cases.[^26][^27]

**Production readiness.**

- Extensively deployed, but criticism highlights rough edges (e.g., token rotation, session race conditions) in complex scenarios.[^27]
- For standard OAuth + Next apps, it is still a well-understood, production option.

**TypeScript.**

- The libraries are “written with type safety in mind” and expose TS types across all major APIs.[^15]

***

### 6.2 better-auth – trending, TS‑native alternative (and successor)

**What it is.** `better-auth` is a **modern TypeScript‑first auth framework** that Auth.js now recommends as the default for new projects (“Auth.js is now part of Better Auth; we recommend new projects start with Better Auth”).[next-auth]

**Trend \& activity.**

- The issue tracker shows **hundreds of open issues and thousands closed**, with detailed release and iteration plans for v1.3.x and v1.4.x in late 2025.[better-auth]
- This level of activity and the recommendation from Auth.js create a strong signal that better‑auth is becoming the **new default** for TS‑heavy stacks, including Next.js.

**Production \& TS.**

- The library is used in production across multiple frameworks; its API design is centered around type‑safety and extensibility (e.g., plugins for Stripe, captcha, etc.).[better-auth]

**When to use which.**

- **Greenfield projects in 2026**: strongly consider **better-auth** if you want a modern, TS‑native auth layer and are comfortable with fast‑moving projects.
- **Legacy or standardized stacks**: **Auth.js** remains viable and widely supported, but expect more emphasis on better‑auth over time.

***

## 7. Data Layer \& ORMs

### 7.1 Prisma – default ORM in Next stacks

**What it is.** Prisma is a **“next-generation ORM”** for Node.js/TypeScript, used extensively in Next applications, especially with `create-t3-app`.[prisma][^13]

**Trend.**

- Around **45k stars** and over **760k dependent repositories**, indicating enormous adoption.[prisma]
- Its popularity has remained high and relatively steady rather than spiking, reflecting a mature, entrenched tool.

**Maintenance \& releases.**

- Frequent releases (e.g., 7.2.0 in December 2025).[prisma]
- Strong migration tooling, CLI, and a rich ecosystem around drivers and adapters.

**Production readiness \& TS.**

- Prisma is one of the most battle‑tested ORMs in the TS/Node universe and is used in many large production deployments, including with Next.js.[prisma]
- The schema‑driven approach and generated TS client give **strong end‑to‑end type safety**, which aligns with modern Next best practices.

**Verdict.**
For **relational databases in a Next.js app**, Prisma remains the **dominant, production‑ready choice** with very active maintenance and powerful TS support.

***

## 8. CMS \& Content Frameworks for Next.js

### 8.1 Payload – Next.js‑native headless CMS \& app framework

**What it is.** Payload is branded as **“the open-source, fullstack Next.js framework…Use Payload as a headless CMS or for building powerful applications.”**[payload] It runs inside your Next `/app` folder and tightly couples backend + admin UI with Next.

**Trend.**

- Payload has **rapidly gained tens of thousands of stars** and is now one of the most talked‑about CMS options in the Next community.[payload][^33]
- One‑click templates for websites and ecommerce, plus tight Next + Vercel + Cloudflare integrations, have driven adoption.[payload]

**Maintenance \& features.**

- Frequent 3.x releases through late 2025, with support for RSC, Tailwind, and advanced features like granular access control, field‑level hooks, and Lexical‑based rich text.[payload]

**Production readiness \& TS.**

- Fully open‑source, with real‑world deployments as both CMS and general backend framework.
- Fully TypeScript with **automatic types** generated from your config, giving end‑to‑end type safety for admins and APIs.[payload]

**When to pick it.**
If you want a **Next‑native CMS/app framework with TS‑first ergonomics**, Payload is one of the most aggressively trending options going into 2026.

***

### 8.2 Strapi – mature, framework-agnostic headless CMS

**What it is.** Strapi is “the leading open-source headless CMS, 100% JavaScript/TypeScript, flexible and fully customizable,” usable with any frontend (including Next.js).[strapi]

**Trend.**

- Around **70k+ stars** and over **28k dependent repos** by 2025.[strapi]
- Its growth is more **mature** than Payload’s, but still high relative to most CMSs.

**Maintenance \& production.**

- Very active v5 line with frequent releases and enterprise features (SSO, workflows, etc.).[strapi]
- A large plugin ecosystem and extensive documentation.

**TypeScript.**

- Strapi 5 leans heavily into TypeScript, with ~86% TS in the repo.[strapi]

**When to pick it.**
If you want a **battle‑tested headless CMS** that is **not locked to Next** but integrates well with it, Strapi remains a top production choice.

***

## 9. Data Fetching \& Caching

### 9.1 SWR – React hooks for data fetching (from Vercel)

**What it is.** SWR is a React hooks library for data fetching, cache revalidation, and client‑side state, originating at Vercel.[^12]

**Trend.**

- ~**32.3k stars**, with “React Hooks for Data Fetching” widely used beyond Next, but strongly associated with Vercel’s stack.[^12]

**Maintenance \& production.**

- Continuous issues and discussions through 2024–25 on topics like React 19, Suspense, Expo, and Next.js integration.[^10][^34]
- New capabilities (mutations, subscriptions, suspense support) show ongoing active development.

**TypeScript.**

- Implemented in TS with extensive generics; type inference is a selling point and a common topic in issues.[^10][^12]

**When to use it.**
In 2026, many teams lean more heavily on **Next’s built‑in data fetching in RSC**, but SWR remains valuable for **client‑side or hybrid data fetching**, especially in existing codebases and for patterns not easily expressed with plain `fetch` in server components.

***

## 10. SEO \& Sitemaps

### 10.1 next-sitemap – standard sitemap/robots generator

**What it is.** `next-sitemap` generates `sitemap.xml` and `robots.txt` for **static, pre‑rendered, dynamic, and server‑side** Next.js pages.[next-sitemap]

**Trend \& adoption.**

- Around **3.6k stars** but more importantly **48k+ repositories depend on it**, showing massive production usage.[next-sitemap]

**Maintenance \& production.**

- Active through v4.2.x releases and widely referenced in tutorials and starter kits.[next-sitemap]
- Supports advanced configurations (index sitemaps, Google News, image/video sitemaps, dynamic server‑side generation, TS JSDoc support).[next-sitemap]

**TypeScript.**

- ~99% TypeScript in the repo.[next-sitemap]

**Role in a Next stack.**
For any **public Next.js site that cares about SEO**, `next-sitemap` remains the de facto standard.

***

### 10.2 next-seo – SEO utilities for Next

**What it is.** `next-seo` provides a high‑level API for managing `<head>` metadata, Open Graph tags, structured data, etc., in Next.js apps.[garmeeh]

**Maintenance.**

- Continuous CI runs and dependency updates in 2025, with examples updated to Next 15 and App Router.[garmeeh]

**TypeScript.**

- Exposes TS types for its config objects and works well in TS projects.[garmeeh]

**When to pair it.**
Combine **`next-seo`** with **`next-sitemap`** for a complete SEO and sitemap solution in production Next.js apps.

***

## 11. Putting it together: recommendations by priority

If you are building or modernizing a **Next.js application in 2026**, and want to optimize for star‑momentum, maintenance, production‑readiness, and TypeScript, a pragmatic stack would be:

1. **UI \& Theming**
    - **shadcn/ui** for components + **next-themes** for dark mode.[next-themes][^16][^17]
2. **Structure \& Starter**
    - **Next.js Enterprise Boilerplate** for enterprise apps, or **create‑t3‑app** for full‑stack greenfield builds with strong type safety.[^9][^13]
3. **Docs \& Marketing Sites**
    - **Nextra** for docs or content sites that live in the same monorepo as your app.[^21][^2]
4. **Backend \& Data**
    - **Prisma** for ORM; **Payload** or **Strapi** as CMS depending on whether you prefer a Next‑native or framework‑agnostic solution.[prisma][payload][strapi]
5. **Auth**
    - For new TS‑heavy projects: **better-auth**; for existing or conservative stacks: **Auth.js / NextAuth.js**.[next-auth][better-auth][^27]
6. **SEO \& Data Fetching**
    - **next-sitemap** + **next-seo** for crawlability and SERP performance, and **SWR** for client‑side data fetching where RSC primitives are not sufficient.[next-sitemap][garmeeh][^12]

This combination aligns with where **GitHub star trends, community attention, and vendor support** are concentrated as of early 2026, while staying firmly within **actively maintained, production‑ready, TypeScript‑first** territory.
<span style="display:none">[^100][^101][^102][^103][^104][^105][^106][^107][^108][^109][^110][^111][^112][^113][^114][^115][^116][^117][^118][^119][^120][^121][^122][^123][^124][^125][^126][^127][^128][^129][^130][^131][^132][^133][^134][^135][^136][^137][^138][^139][^140][^141][^142][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div align="center">⁂</div>

[^1]: https://ossinsight.io/collections/static-site-generator/

[^2]: https://risingstars.js.org/2023/en

[^3]: https://ossinsight.io/collections/javascript-framework/trends/

[^4]: https://ossinsight.io/docs/api/list-trending-repos/

[^5]: https://bestofjs.org/projects?page=18\&limit=30\&query=\&sort=total

[^6]: https://pcbbc.site.mobi/templates/mobile/facade_transcoder_iframe.php?u=%2Ftopics%2Fstatic-site-generator%3Fimz_st\&lang=en

[^7]: https://github.com/topics/static-site-generator

[^8]: https://badgen.net/github/stars/shuding/nextra

[^9]: https://github.com/HigorAlves/next-enterprise

[^10]: https://github.com/vercel/swr/issues

[^11]: https://github.com/vercel/turbo/tree/main/examples

[^12]: https://github.com/vercel/swr

[^13]: https://github.com/t3-oss/create-t3-app/activity

[^14]: https://blazity.com/blog/selecting-the-right-tech-stack-for-large-scale-reactjs-project

[^15]: https://www.npmjs.com/package/next-auth

[^16]: https://ui.shadcn.com/docs/javascript

[^17]: https://github.com/shadcn-ui/ui/issues/2235

[^18]: https://ui.shadcn.com/docs/installation/next

[^19]: https://www.traversymedia.com/blog/nextjs-admin-dashboard-project

[^20]: https://www.reddit.com/r/nextjs/comments/1kfztuz/250_nextjs_ui_components_from_shadcn_ui/

[^21]: https://nextra.likemashang.com/en/upgrade

[^22]: https://the-guild.dev/blog/nextra-4

[^23]: https://github.com/bmstefanski

[^24]: https://github.com/topics/next-theme

[^25]: https://oppositeofnorth.com/?_=%2FBlazity%2Fnext-enterprise%23NpZ%2FcdvQaILgLgJ6rorzPjGP

[^26]: https://www.linkedin.com/posts/steven-koehnke_github-nextauthjsnext-auth-authentication-activity-7213846397119328256-YAWH

[^27]: https://www.reddit.com/r/nextjs/comments/1crn50l/why_is_nextauth_or_authjs_so_popular/

[^28]: https://github.com/vercel/swr-site

[^29]: https://ossinsight.io/collections/ui-framework-and-u-ikit/

[^30]: https://www.boilercode.app/nextjs

[^31]: https://www.reddit.com/r/nextjs/comments/18riglc/all_133_nextjs_boilerplates_starters/

[^32]: https://www.reddit.com/r/nextjs/comments/10edkdg/just_hit_3000_stars_on_github_for_my_nextjs/

[^33]: https://github.com/bytefer/awesome-shadcn-ui

[^34]: https://github.com/vercel/swr/discussions/categories/q-a

[^35]: https://ieeexplore.ieee.org/document/11303497/

[^36]: https://account.jdrra.sljol.info/index.php/sljo-j-jdrra/article/view/93

[^37]: https://arxiv.org/abs/2506.12014

[^38]: https://ashpublications.org/blood/article/146/Supplement 1/2086/554906/A-mutational-grouping-involving-SRSF2-TET2-ASXL1

[^39]: https://arxiv.org/abs/2509.21891

[^40]: https://www.semanticscholar.org/paper/59bbe382b85ceef85b5480e3dd17002524f85c5d

[^41]: https://academic.oup.com/bioinformatics/article/doi/10.1093/bioinformatics/btaf508/8256687

[^42]: https://www.semanticscholar.org/paper/23b4fc0ac9cc4ecb1d908c5a1235b7d4df095248

[^43]: https://arxiv.org/pdf/1607.04342.pdf

[^44]: http://arxiv.org/pdf/2411.05087.pdf

[^45]: http://arxiv.org/pdf/2502.00058.pdf

[^46]: https://online-journals.org/index.php/i-jet/article/download/2916/2882

[^47]: https://arxiv.org/abs/1902.05216v1

[^48]: https://arxiv.org/pdf/2205.15086.pdf

[^49]: https://arxiv.org/abs/2201.07207

[^50]: https://arxiv.org/html/2504.03884v1

[^51]: https://www.youtube.com/watch?v=HqqzOZA8Hs0

[^52]: https://www.reddit.com/r/nextjs/comments/1i7ticd/is_there_an_awesome_github_repository_with_all/

[^53]: https://themeselection.com/ui-components-library-nextjs/

[^54]: https://www.reddit.com/r/nextjs/comments/1hwdk1u/looking_for_modern_nextjs_15_open_source_projects/

[^55]: https://github.com/lior-amsalem/awesome-nextjs-resources-awesome

[^56]: https://strapi.io/blog/nextjs-libraries

[^57]: https://nextjs.org/blog

[^58]: https://github.com/officialrajdeepsingh/awesome-nextjs

[^59]: https://www.reddit.com/r/javascript/comments/1ha7qds/askjs_which_javascript_libraries_are_you_ready_to/

[^60]: https://github.com/topics/nextjs

[^61]: https://github.com/bytefer/awesome-nextjs

[^62]: https://dev.to/shaahzaibrehman/top-10-react-nextjs-ui-libraries-to-use-in-2025-11j6

[^63]: https://github.com/topics/nextjs-project

[^64]: https://github.com/topics/nextjs-awesome

[^65]: https://graygrids.com/blog/javascript-frameworks-libraries

[^66]: https://www.semanticscholar.org/paper/95885ae4134e093d40be281087495cde98499d5e

[^67]: https://arxiv.org/abs/2310.06770

[^68]: https://dl.acm.org/doi/10.1145/3641554.3701800

[^69]: https://arxiv.org/abs/2402.19173

[^70]: https://link.springer.com/10.1007/s10664-025-10745-8

[^71]: https://ieeexplore.ieee.org/document/10992485/

[^72]: https://journals.mmupress.com/index.php/jiwe/article/view/1062

[^73]: https://ieeexplore.ieee.org/document/10172792/

[^74]: https://www.semanticscholar.org/paper/1bc624f655c1598e408db854912f3fc157e224bc

[^75]: https://dl.acm.org/doi/10.1145/3698205.3729544

[^76]: https://www.mdpi.com/1424-8220/21/17/5716

[^77]: https://arxiv.org/pdf/2403.04651.pdf

[^78]: https://www.mdpi.com/1424-8220/25/9/2779

[^79]: http://arxiv.org/pdf/2407.07205.pdf

[^80]: https://arxiv.org/pdf/2401.09488.pdf

[^81]: https://arxiv.org/pdf/2211.04980.pdf

[^82]: https://www.mdpi.com/2076-3417/13/19/10871/pdf?version=1696061166

[^83]: https://arxiv.org/abs/2402.02242

[^84]: https://www.telerik.com/blogs/using-github-nextauthjs-single-sign-on-nextjs

[^85]: https://github.com/emanuelefavero/next-auth

[^86]: https://github.com/nextauthjs/next-auth

[^87]: https://www.reddit.com/r/nextjs/comments/1818tdb/i_build_a_github_repo_traffic_history_tracker/

[^88]: https://next-auth.js.org/providers/github

[^89]: https://betterstack.com/community/guides/scaling-nodejs/better-auth-vs-nextauth-authjs-vs-autho/

[^90]: https://github.com/nextauthjs/next-auth-example

[^91]: https://github.com/nextauthjs/docs

[^92]: https://next-auth.js.org/v3/providers/github

[^93]: https://github.com/t3dotgg/next-auth-v4-prisma-demo

[^94]: https://github.com/nextauthjs

[^95]: https://github.com/riad-azz/next-auth-example

[^96]: https://next-auth.js.org/v3/getting-started/example

[^97]: https://github.com/nextauthjs/adapters

[^98]: https://authjs.dev/getting-started/providers/github

[^99]: https://ieeexplore.ieee.org/document/10988972/

[^100]: https://arxiv.org/abs/2504.19335

[^101]: https://ieeexplore.ieee.org/document/11185939/

[^102]: https://www.ijisrt.com/development-of-a-user-friendly-mobile-application-for-campus-navigation-leveraging-google-maps-api-and-uiux-strategies

[^103]: https://ieeexplore.ieee.org/document/10923955/

[^104]: https://www.semanticscholar.org/paper/8a68c1a27aa641a07937407cda6eaa93c397970c

[^105]: https://ieeexplore.ieee.org/document/10266161/

[^106]: https://journals.sagepub.com/doi/full/10.3233/SW-210428

[^107]: http://ieeexplore.ieee.org/document/7965248/

[^108]: https://beei.org/index.php/EEI/article/view/3030

[^109]: https://arxiv.org/html/2411.17465

[^110]: https://arxiv.org/abs/2208.02043

[^111]: https://arxiv.org/pdf/2312.17587.pdf

[^112]: https://arxiv.org/html/2404.13521v1

[^113]: https://arxiv.org/html/2402.06795v1

[^114]: https://dl.acm.org/doi/pdf/10.1145/3613904.3642822

[^115]: https://dl.acm.org/doi/pdf/10.1145/3613904.3642350

[^116]: https://arxiv.org/pdf/2212.05517.pdf

[^117]: https://github.com/shadcn-ui/ui

[^118]: https://create.t3.gg

[^119]: https://www.reddit.com/r/reactjs/comments/1o213vc/shadcnui_just_overtook_material_ui/

[^120]: https://ui.shadcn.com/docs/blocks

[^121]: https://github.com/t3-oss/create-t3-app

[^122]: https://redmonk.com/kholterhoff/2025/04/22/ui-component-libraries-shadcn-ui-and-the-revenge-of-copypasta/

[^123]: https://www.reddit.com/r/nextjs/comments/1l33ylb/the_biggest_list_of_shadcnui_related_stuff_on/

[^124]: https://github.com/t3-oss

[^125]: https://api.star-history.com/svg?repos=shadcn-ui%2Fui\&amp%3Btype=Date

[^126]: https://github.com/shadcn

[^127]: https://github.com/topics/create-t3-app?o=asc\&s=stars

[^128]: https://ui.shadcn.com

[^129]: https://github.com/topics/shadcn

[^130]: https://github.com/t3-oss/create-t3-app-diffs

[^131]: https://www.star-history.com/blog/agent-sdk-framework

[^132]: http://archinte.jamanetwork.com/article.aspx?doi=10.1001/jamainternmed.2017.1494

[^133]: https://www.acpjournals.org/doi/10.7326/0003-4819-123-8-199510150-00002

[^134]: https://meetingorganizer.copernicus.org/EPSC2021/EPSC2021-740.html

[^135]: https://onlinelibrary.wiley.com/doi/10.1002/(SICI)1097-4571(199712)48:12<1150::AID-ASI11>3.0.CO;2-9

[^136]: https://papers.academic-conferences.org/index.php/ecgbl/article/view/3972

[^137]: https://journal.media-culture.org.au/index.php/mcjournal/article/view/2953

[^138]: https://www.semanticscholar.org/paper/d33aefd82bc8a1027d1e1b834442416f5ed20280

[^139]: http://proceedings-online.com/proceedings_series/article/artId/307.html

[^140]: https://www.semanticscholar.org/paper/797e812f37898f6e17fce127ba21185bd88472e0

[^141]: https://www.semanticscholar.org/paper/54c6e1695b9314f668f5d1a1baa7ac22429f8cd0

[^142]: https://arxiv.org/html/2306.02469v3

