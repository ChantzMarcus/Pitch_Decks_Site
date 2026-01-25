<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Next.js Ecosystem 2026: Trending Libraries, Tools, and Frameworks

Below is a curated, opinionated landscape of Next.js-related projects that are trending on GitHub going into 2026, with emphasis on:

- Stars gained recently (directionally, via growth narratives and recent articles)
- Active maintenance (recent releases / docs updates)
- Production readiness
- TypeScript support

This is organized by use case rather than a single flat list, since “best” choices differ by what you’re building.

***

## 1. UI Component Libraries \& Design Systems

### 1.1 shadcn/ui

**Why it’s top of the list**

shadcn/ui has become the most starred React component library on GitHub, recently overtaking Material UI in stars by late 2025. The repo shows ~105k stars, 69 releases, and a fresh release in Jan 2026, with ~90% TypeScript. This is a strong signal of both popularity and active maintenance.[^1][^2]

**Fit for Next.js**

- Built around Next.js, Tailwind CSS, and Radix UI primitives.[^2][^3]
- Vercel uses it in production tools like v0; the author now works at Vercel.[^3]
- Pattern is “copy components into your codebase,” which plays nicely with the App Router and Server Components, avoiding opaque runtime dependencies.

**Evaluation against your criteria**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained (6–12 mo) | Extremely strong; fastest-growing React UI library, now >100k stars[^4][^2] |
| Active maintenance | Frequent releases; latest Jan 2026[^2] |
| Production-ready | Used by Vercel and many SaaS projects; battle‑tested[^3] |
| TypeScript support | First-class; codebase ~90% TS[^2] |

**When to choose**

- Building a modern SaaS/dashboard with Tailwind and App Router.
- You want a customizable design system, not a fixed “look.”

***

### 1.2 HeroUI (formerly NextUI)

HeroUI rebranded from “NextUI” in early 2025 to reflect its broader React focus, but remains optimized for Next.js and Tailwind-based workflows.[^4][^5]

- ~27k+ GitHub stars and ~120k weekly npm downloads as of Jan 2026, with strong growth.[^4]
- Written in TypeScript, Tailwind-variants based, and designed for modern SSR-compatible UIs.[^6][^5]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Strong upward trajectory; rapidly growing since rebrand[^4] |
| Active maintenance | Recent features and Tailwind v4 plans noted for 2026[^4] |
| Production-ready | Built for production UIs; SSR- and Next.js-optimized[^5] |
| TypeScript support | Fully TS-based library[^6][^5] |

**When to choose**

- You want a batteries-included, opinionated but modern design out of the box.
- You like Tailwind but prefer a cohesive component set and pre-made layouts.

***

### 1.3 Other mature UI choices heavily used with Next.js

These are not Next-specific, but widely used in Next.js apps in 2026:[^7][^8][^9]

- **Chakra UI** – Accessible, themeable, strong TS support, works well with SSR and Framer Motion.[^8]
- **Material UI (MUI)** – Enterprise-grade Material Design with robust TS types; still huge in adoption despite shadcn’s star lead.[^3]
- **Ant Design** – Enterprise UI with strong table/form components, SSR support, and TS typings.[^8]
- **Tailwind CSS** – Not a component library, but essentially the default styling layer in modern Next.js; official docs now recommend Tailwind for most styling needs.[^10][^11][^12]

For 2026, **shadcn/ui + Tailwind** is the most “trending” combo; **Chakra or HeroUI** are great if you want a more pre-styled system with fewer design decisions.

***

## 2. Auth \& Identity for Next.js

### 2.1 Auth.js (formerly NextAuth.js)

Auth.js (new branding) remains the de facto OSS auth library with first-class Next.js integration.[^13][^14]

**Signals**

- Official docs show tight integration with Next.js 13+ App Router and middleware, using `NextAuth` (or `auth`) helpers directly in `auth.ts`, `middleware.ts`, and route handlers.[^14]
- Actively updated; Auth.js site footer and docs are up to date for 2026.[^14]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Mature project; growth slower but still widely adopted, especially post-renaming |
| Active maintenance | Actively maintained, with current docs for App Router flows[^13][^14] |
| Production-ready | Used across countless production Next.js apps[^13][^15] |
| TypeScript support | Strong TS support and types across providers and callbacks[^13][^14] |

**When to choose**

- You’re on App Router and want a deeply integrated, OSS-first solution.
- You need multiple OAuth providers plus credential flows, but want to stay in the Next.js ecosystem.

***

### 2.2 Alternatives trending with Next.js

From community discussions and comparison posts:[^16][^17][^15]

- **Lucia Auth** – Minimalist, low-level TS-first auth, popular with devs who want more control and less magic; trending among advanced Next.js users.[^16]
- **Clerk** – Hosted auth with excellent DX; strong Next.js bindings and components.[^17]
- **Supabase Auth** – Very popular Next.js pairing (database + auth + storage), especially for early-stage products.[^17]

These are not necessarily GitHub-star-heavy (some are commercial), but they are trending in usage patterns around Next.js in 2025–26.

***

## 3. Data Fetching \& Server State

### 3.1 TanStack Query (React Query)

TanStack Query has evolved into the dominant React data synchronization library and is heavily used together with Next.js for client-side server state.[^18][^19][^20]

- Recognized in late-2025 and early-2026 comparisons as the most popular React data fetching library.[^20]
- TanStack ecosystem (Query, Router, Table, Form, Store, etc.) is expanding fast.[^21]
- Official site emphasizes TS-first API and async state management.[^19]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Continues strong star growth as part of broader TanStack ecosystem[^21][^19] |
| Active maintenance | Very active; multi-framework support and frequent releases[^19][^21] |
| Production-ready | Standard for dashboards, admin panels, complex apps[^18][^20] |
| TypeScript support | Excellent; advanced type inference noted as a differentiator[^20] |

**When to choose**

- You use Next.js App Router for server fetching, but need rich client-side data handling (infinite queries, optimistic UI, etc.).
- Building dashboards/admin UIs with frequent API calls and cache-invalidation needs.

***

### 3.2 SWR

SWR remains a lightweight alternative, backed by Vercel and designed with Next.js in mind.[^22][^20]

- Often recommended as the “simple” side of the SWR vs TanStack Query pair; especially good for smaller apps and simple patterns.[^22][^18][^20]
- Bundled heavily in Next.js examples and guides; built for React and Next SSR compatibility.

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Solid but slower growth than TanStack, still widely used in Next.js community |
| Active maintenance | Actively improved with new features and TS refinements[^20] |
| Production-ready | Used in many Next.js production apps, especially content-heavy and SaaS UIs |
| TypeScript support | Very good TS support[^20] |

**When to choose**

- Prefer minimal API, fewer concepts, and tight Vercel alignment.
- Most of your data loading is still server-first, and you only need client-side revalidation in a few places.

***

## 4. Forms \& Validation

### 4.1 React Hook Form + Zod

The combo of **React Hook Form (RHF)** + **Zod** is effectively the standard for robust, type-safe forms in modern Next.js applications.[^23][^24]

- RHF is widely documented in Next.js 13/14/15 examples, emphasizing minimal re-renders and performance.[^24][^23]
- Zod is a TypeScript-first schema validation library; type inference from schemas is a major selling point.[^23]
- Numerous 2025–26 guides show RHF + Zod specifically for Next.js App Router, SSR, and complex forms.[^25][^23]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Both projects have grown alongside TS adoption and RSC/App Router adoption |
| Active maintenance | Actively maintained with modern React/Next examples[^23][^24] |
| Production-ready | Common in large-scale apps needing complex forms and validation |
| TypeScript support | “TypeScript-first” for Zod; RHF integrates with Zod resolvers[^23] |

**When to choose**

- Large or complex forms with SSR, multi-step flows, or nested structures.
- You want one schema to power both frontend and backend validation.


### 4.2 Emerging: TanStack Form

- Mentioned in community threads as a “feature-rich and framework-agnostic” form library used in Next.js.[^26]
- Early but growing part of TanStack ecosystem.[^21]

RHF + Zod is currently more battle-tested; TanStack Form is one to watch in 2026 if you’re standardizing on TanStack.

***

## 5. ORMs \& Database Layer (App Router / Server Actions)

### 5.1 Prisma ORM

Prisma remains the default TypeScript ORM for Node.js, and continues to be heavily used with Next.js.[^27][^28][^29]

- Schema-driven, strong type safety, rich docs, Prisma Studio, and powerful migrations.[^28]
- Excellent TS types for queries and relations, nested writes, and relation filters.[^28]
- Very popular in Next.js SaaS starter kits and enterprise apps.[^29][^30][^27]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Mature but still growing; remains the most widely adopted TS ORM[^28][^29] |
| Active maintenance | High; continuous releases and comparison docs like Prisma vs Drizzle[^28] |
| Production-ready | Extremely; widely used across SaaS and enterprise[^27][^28][^29] |
| TypeScript support | Top-tier; TS-first client with deep type inference[^28] |

**Caveats**

- Not ideal for Edge runtime due to client bundle size and Node dependencies.[^27]

***

### 5.2 Drizzle ORM

Drizzle has seen strong adoption growth because it aligns well with modern frameworks and edge runtimes.[^29][^27]

- “Your schema is your code” – no separate DSL.[^29]
- Very lightweight, SQL-like APIs; good fit for Next.js App Router and Edge Functions.[^27][^29]
- Frequently mentioned in 2026-era SaaS starter kits as a modern alternative to Prisma.[^30][^29]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Rapid growth; widely discussed in 2025–26 Next.js ecosystem[^27][^29][^30] |
| Active maintenance | Very active; new guides, adapters, and starter kits[^27][^29][^30] |
| Production-ready | Suitable for production; used in modern SaaS starters with auth and multitenancy[^30] |
| TypeScript support | TS-first, with strong typing on schema and queries[^27][^29] |

**When to choose**

- You target Edge or serverless runtimes aggressively.
- You prefer SQL-like APIs with minimal overhead.

***

## 6. State Management

For local/shared state (distinct from server state), several libraries remain popular in React/Next ecosystems:[^31][^32]

- **Zustand** – Lightweight, simple store with hooks; well suited for small to mid-size shared state.[^32][^31]
- **Jotai** – Atom-based with fine-grained reactivity; actively maintained and authored by the same maintainer as Zustand.[^32]
- **XState** – For complex state machines and workflows.[^31]

These are broadly React-focused but widely used in Next.js 15/16 apps, especially when combined with RSC and Server Actions.[^33]

***

## 7. Testing \& QA

### 7.1 Vitest + React Testing Library

- Vitest is now effectively the recommended default for unit/component tests in ESM-based and Vite/Vitest-driven setups; 2026 articles call it the “clear frontrunner” for unit and component testing, often paired with Playwright for E2E.[^34][^35][^36]
- Works well with Next.js, especially for testing components and server logic in isolation.[^37][^34]


### 7.2 Playwright

- Recommended by both Next.js testing guides and third-party tutorials for full-stack E2E testing of App Router, Server Components, and auth flows.[^38][^39][^34]
- 2026 testing overviews recommend Vitest for fast unit tests and Playwright for cross-browser E2E as the “potent combination”.[^36]

**Evaluation (Playwright + Vitest)**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Both tools have seen rapid adoption since ~2023–2025, supplanting Jest + Cypress stacks[^38][^35][^36] |
| Active maintenance | Very active; new releases and docs around Next.js App Router support[^34][^39][^37] |
| Production-ready | Used heavily in CI for production apps, including Next.js projects[^34][^39][^35] |
| TypeScript support | First-class TS support and typings for both tooling stacks[^34][^39][^36] |


***

## 8. Animations \& Motion

### 8.1 Motion (formerly Framer Motion)

Motion remains the top React animation library in 2026; recent overviews list it as \#1 with ~30k+ stars and >8M weekly downloads.[^40][^41]

- Works well in Next.js apps for page transitions, scroll animations, and component-level micro-interactions.[^42][^43][^40]
- Many modern Next.js tutorials use Motion in TypeScript + Tailwind contexts.[^42][^40]

**Evaluation**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Continues to grow; top React animation library by stars and downloads[^41] |
| Active maintenance | Ongoing feature updates and docs; widely covered in 2025–26 guides[^40][^41] |
| Production-ready | Used across dashboards, marketing sites, and SaaS apps with Next.js[^42][^40] |
| TypeScript support | Strong TS typings for all APIs[^40][^41] |


***

## 9. Starter Kits, Templates, and Next.js-Specific Tools

While not “libraries” per se, several Next.js-focused starter repos and templates are trending in stars and usage; they encapsulate many of the above technologies.

### 9.1 Notable template ecosystems

From curated lists like `awesome-nextjs` and UI-ecosystem blogs:[^44][^45][^30][^8]

- **Next Forge / Next Shadcn Dashboard Starter / various SaaS starters** – combine Next.js 14/15 App Router, shadcn/ui, Prisma or Drizzle, Auth.js or Better Auth, and deployment presets.[^45][^44][^30]
- **MakerKit SaaS kits (Next.js + Drizzle / Prisma + Better Auth)** – launched Jan 2026 with production-grade architecture and multi-tenancy.[^30]
- **Next.js + Tailwind + TypeScript starter boilerplates** – very popular, updated frequently with App Router and RSC support.[^11][^12][^44][^45]

These are often the fastest-growing repos in the Next.js ecosystem because they showcase full-stack patterns (Server Actions, RSC, auth, billing) rather than a single library.

**Evaluation (as a class)**


| Criterion | Assessment |
| :-- | :-- |
| Stars gained | Many have spiked with the adoption of App Router and full-stack Next.js in 2024–26[^44][^46][^30] |
| Active maintenance | Top starters are updated to support Next.js 14/15/16 and new features like Server Actions[^30] |
| Production-ready | Several explicitly position themselves as “production-grade SaaS starters”[^44][^30] |
| TypeScript support | Almost all modern starters are TS-first by default[^44][^45][^30] |


***

## 10. Putting It Together: Recommended “Trending Stack” for 2026

If you want a stack that is:

- Popular and gaining stars
- Actively maintained
- Proven in production
- TypeScript-first

Then a 2026 “sweet spot” Next.js stack looks like:

- **Framework:** Next.js 15/16 with App Router and Server Actions[^46][^47][^48]
- **Styling:** Tailwind CSS as base[^12][^10][^11]
- **UI Components:** shadcn/ui or HeroUI[^5][^2][^8][^4][^3]
- **Auth:** Auth.js (NextAuth) or Lucia/Clerk depending on your control vs SaaS preference[^13][^16][^17][^14]
- **Data Fetching:** Built-in server fetching + TanStack Query or SWR for client-side state[^18][^19][^20][^22]
- **Forms:** React Hook Form + Zod[^24][^23]
- **ORM/DB:** Prisma for maximal DX and ecosystem, or Drizzle for Edge-native and lighter footprint[^28][^27][^29]
- **State Management:** Zustand or Jotai for local/shared state where needed[^31][^32]
- **Animations:** Motion (Framer Motion) for page transitions and interactions[^41][^40]
- **Testing:** Vitest + React Testing Library for units; Playwright for E2E[^39][^35][^34][^36]
- **Deployment:** Vercel for tightest integration, or platforms like Kuberns/AWS Amplify for alternative cost profiles[^49][^50][^51][^52][^53]

***

## 11. How to Prioritize Based on Your Goals

To translate this into choices:

1. **If you care most about community momentum + long-term viability**
    - **shadcn/ui**, **TanStack Query**, **Prisma**, **Auth.js**, **Motion**, **Playwright**.

These all show strong community usage, growth, and ongoing investments from maintainers and companies.[^2][^19][^20][^39][^40][^36][^41][^3][^21][^28]
2. **If you care most about bleeding-edge Next.js patterns and Edge compatibility**
    - **Drizzle ORM**, **SWR**, **Zod**, **Lucia Auth**, **HeroUI**, and Next.js Edge functions as first-class citizens.[^48][^46][^5][^4][^22][^23][^27][^29]
3. **If you care most about fast time-to-market with production-ready scaffolding**
    - Pick a reputable SaaS starter using Next.js 15+, shadcn/ui, Auth.js, and Prisma or Drizzle.[^44][^45][^30]
    - This lets you adopt the “trending stack” with wiring already done.

***

If you share what you’re building (SaaS, content, e‑commerce, internal tools) and your hosting constraints, a more tailored short list can be constructed from this ecosystem snapshot.
<span style="display:none">[^100][^101][^102][^103][^104][^105][^106][^107][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86][^87][^88][^89][^90][^91][^92][^93][^94][^95][^96][^97][^98][^99]</span>

<div align="center">⁂</div>

[^1]: https://www.reddit.com/r/reactjs/comments/1o213vc/shadcnui_just_overtook_material_ui/

[^2]: https://github.com/shadcn-ui/ui

[^3]: https://blog.logrocket.com/shadcn-ui-adoption-guide/

[^4]: https://dev.to/ansonch/5-best-react-ui-libraries-for-2026-and-when-to-use-each-1p4j

[^5]: https://heroui.com

[^6]: https://prismic.io/blog/react-component-libraries

[^7]: https://www.untitledui.com/blog/react-component-libraries

[^8]: https://themeselection.com/ui-components-library-nextjs/

[^9]: https://www.builder.io/blog/react-component-libraries-2026

[^10]: https://nextjs.org/docs/app/getting-started/css

[^11]: https://nextjs.org/docs/app/guides/tailwind-v3-css

[^12]: https://tailwindcss.com/docs/guides/nextjs

[^13]: https://www.contentful.com/blog/nextjs-authentication/

[^14]: https://authjs.dev

[^15]: https://supertokens.com/blog/nextauth-alternatives

[^16]: https://www.youtube.com/watch?v=58EKWXzzJQk

[^17]: https://www.reddit.com/r/nextjs/comments/1ivktp2/best_authentication_libraries_for_nextjs_app_2025/

[^18]: https://www.9thco.com/labs/using-tanstack-query-for-data-fetching-caching

[^19]: https://tanstack.com/query

[^20]: https://refine.dev/blog/react-query-vs-tanstack-query-vs-swr-2025/

[^21]: https://codewithseb.com/blog/tanstack-ecosystem-complete-guide-2026

[^22]: https://www.linkedin.com/posts/sidra-maqbool-51a22789_reactjs-nextjs-frontenddevelopment-activity-7370055171113996289-sAdm

[^23]: https://peerlist.io/jagss/articles/building-efficient-forms-in-nextjs-with-react-hook-form-and-

[^24]: https://blog.croct.com/post/best-react-form-libraries

[^25]: https://clerk.com/blog/nextjs-sign-up-form

[^26]: https://www.reddit.com/r/nextjs/comments/1krpw9y/current_best_way_to_work_with_forms_in_nextjs/

[^27]: https://shinagawa-web.com/en/blogs/nextjs-app-router-orm-comparison

[^28]: https://www.prisma.io/docs/orm/more/comparisons/prisma-and-drizzle

[^29]: https://supastarter.dev/blog/prisma-vs-drizzle

[^30]: https://makerkit.dev/blog/changelog/announcing-drizzle-prisma-better-auth-kits

[^31]: https://codingcops.com/react-state-management-libraries/

[^32]: https://www.developerway.com/posts/react-state-management-2025

[^33]: https://dev.to/emiliodominguez/i-built-a-state-management-library-after-fighting-react-server-components-for-6-months-52k7

[^34]: https://strapi.io/blog/nextjs-testing-guide-unit-and-e2e-tests-with-vitest-and-playwright

[^35]: https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies

[^36]: https://dev.to/dataformathub/vitest-vs-jest-30-why-2026-is-the-year-of-browser-native-testing-2fgb

[^37]: https://nextjs.org/docs/pages/guides/testing

[^38]: https://annals-csis.org/Volume_40/drp/pdf/3747.pdf

[^39]: https://www.getautonoma.com/blog/nextjs-playwright-testing-guide

[^40]: https://jb.desishub.com/blog/framer-motion

[^41]: https://www.syncfusion.com/blogs/post/top-react-animation-libraries

[^42]: https://www.youtube.com/watch?v=THUpdZGA7f0

[^43]: https://nextstepjs.com/docs/nextjs/animations

[^44]: https://github.com/bytefer/awesome-nextjs

[^45]: https://github.com/officialrajdeepsingh/awesome-nextjs

[^46]: https://www.flex.com.ph/articles/nextjs-2026-the-full-stack-framework-revolutionizing-web-development

[^47]: https://sam-solutions.com/blog/react-vs-nextjs/

[^48]: https://naturaily.com/blog/nextjs-benefits

[^49]: https://nextjs.org/learn/pages-router/deploying-nextjs-app-deploy

[^50]: https://kuberns.com/blogs/post/deploy-nextjs-app/

[^51]: https://nextjs.org/docs/pages/getting-started/deploying

[^52]: https://www.agilesoftlabs.com/blog/2026/01/aws-amplify-vs-vercel-2026-complete

[^53]: https://vercel.com

[^54]: https://onlinelibrary.wiley.com/doi/10.1002/ece3.11603

[^55]: https://arxiv.org/pdf/1607.04342.pdf

[^56]: https://arxiv.org/pdf/2205.15086.pdf

[^57]: https://arxiv.org/abs/2109.09850

[^58]: http://arxiv.org/abs/2411.15895

[^59]: https://arxiv.org/abs/2410.06107

[^60]: https://arxiv.org/pdf/2211.15733.pdf

[^61]: https://arxiv.org/pdf/1901.05350.pdf

[^62]: https://www.crossover.com/resources/8-leading-web-development-frameworks-in-2026-updated

[^63]: https://www.articsledge.com/post/nextjs

[^64]: https://thebcms.com/blog/nextjs-alternatives

[^65]: https://strapi.io/blog/nextjs-libraries

[^66]: https://encore.dev/articles/best-typescript-backend-frameworks

[^67]: https://gist.github.com/devinschumacher/66c4f6d7680f89211951c27ca5d95bb5

[^68]: https://madelinemiller.dev/blog/2025-javascript-ecosystem/

[^69]: https://prismic.io/blog/nextjs-example-projects

[^70]: https://dev.to/this-is-learning/javascript-frameworks-heading-into-2026-2hel

[^71]: https://www.reddit.com/r/webdev/comments/1q8xbnz/is_learning_nextjs_still_worth_it_for_jobs_in/

[^72]: https://arxiv.org/pdf/1903.08113.pdf

[^73]: https://arxiv.org/pdf/1606.04984.pdf

[^74]: http://arxiv.org/abs/2501.12799

[^75]: https://arxiv.org/abs/2410.15391

[^76]: http://arxiv.org/pdf/2303.09177.pdf

[^77]: https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/spe.3238

[^78]: https://www.youtube.com/watch?v=vCIsrOGNhas

[^79]: https://www.reddit.com/r/nextjs/comments/1iw6j4g/what_are_your_goto_ui_component_libraries_for/

[^80]: https://nextjs.org/docs/app/guides/third-party-libraries

[^81]: https://github.com/EvanLi/Github-Ranking/blob/master/Top100/JavaScript.md

[^82]: https://arxiv.org/abs/2201.05989

[^83]: https://arxiv.org/html/2411.17465

[^84]: http://arxiv.org/pdf/2502.00058.pdf

[^85]: https://arxiv.org/html/2504.03884v1

[^86]: https://arxiv.org/html/2406.16386v1

[^87]: https://arxiv.org/pdf/1811.07643.pdf

[^88]: https://arxiv.org/pdf/2312.17587.pdf

[^89]: https://flowbite.com/docs/getting-started/next-js/

[^90]: https://dev.to/sudiip__17/how-to-set-up-tailwind-css-in-nextjs-complete-guide-for-2025-2232

[^91]: https://www.jqueryscript.net/blog/best-shadcn-ui-date-picker.html

[^92]: http://arxiv.org/pdf/2203.16697.pdf

[^93]: https://arxiv.org/pdf/2201.04868v1.pdf

[^94]: https://arxiv.org/pdf/2310.14666.pdf

[^95]: https://arxiv.org/html/2501.05006v1

[^96]: https://arxiv.org/html/2503.00714v1

[^97]: https://arxiv.org/pdf/1809.08319.pdf

[^98]: https://nextjs.org/docs/app/guides/forms

[^99]: https://www.reddit.com/r/nextjs/comments/1p0e5tk/drizzle_vs_prisma_which_one_to_choose/

[^100]: https://arxiv.org/pdf/2306.05895.pdf

[^101]: http://arxiv.org/pdf/2407.09018.pdf

[^102]: http://arxiv.org/pdf/2209.06315v1.pdf

[^103]: http://arxiv.org/pdf/2305.04764.pdf

[^104]: http://arxiv.org/pdf/2404.19614.pdf

[^105]: http://arxiv.org/pdf/2503.14713.pdf

[^106]: https://arxiv.org/html/2408.03095v2

[^107]: https://dev.to/jameswallis/animating-next-js-page-transitions-with-framer-motion-1g9j

