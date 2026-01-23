<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# What are the best open-source GitHub repositories for film/media showcase websites built with Next.js? Include:

- Full project examples
- Component libraries
- Starter templates
- Image gallery implementations
Sort by GitHub stars and recent activity (2024-2026).

Perfect! Now let me compile a comprehensive response with all the gathered information.

## 🎬 Best Open-Source Next.js Repositories for Film/Media Showcase Websites

Based on recent GitHub activity (2024-2026), here's a curated list of top repositories sorted by stars and community engagement:

***

## 📊 **TOP PROJECTS BY STARS**

### 🥇 **1. Magic Portfolio** ⭐ **917 stars**

**Repository:** `once-ui-system/magic-portfolio`
**Last Update:** Jan 12, 2025
**Forks:** 636 | **Contributors:** 24

**Perfect for:** Creative professionals, photographers, designers, and filmmakers

**Key Features:**

- Built with **Once UI design system** for seamless customization
- MDX-based content system for projects and media galleries
- SEO-optimized with automatic Open Graph image generation (`next/og`)
- Responsive design optimized for all screen sizes
- Gallery, blog, projects, and about/CV pages
- Password protection for URLs
- Timeless design without heavy animations
- Dark/light theme support with data attributes
- Schema and metadata generation

**Tech Stack:** TypeScript 70.2%, MDX 26.9%, SCSS 1.3%

**Best For:** Creating a professional portfolio with integrated media galleries without heavy animations. Great for showcasing film work, photography collections, and creative projects.

**Live Demo:** https://magic-portfolio.com

***

### 🥈 **2. PhotoCrate** ⭐ **139 stars**

**Repository:** `cloudinary-community/photocrate`
**Last Update:** Jun 21, 2024
**Forks:** 16 | **Contributors:** 3

**Perfect for:** Dynamic image galleries with AI-powered editing

**Key Features:**

- Google Photos-style interface
- **AI-powered image editing** with Cloudinary transformations
- Filters, effects, and creative creations (collages, animations, color pop)
- Media management and organization
- React Server Components for optimal performance
- Tanstack React Query for state management
- shadcn/ui components
- Tailwind CSS styling
- Suspense-based loading states
- Folder and tag organization

**Tech Stack:** TypeScript 98.3%, CSS 1.5%, JavaScript 0.2%

**Architecture Highlights:**

```
- Next.js App Router
- Cloudinary SDK integration
- Server Components + Client Components pattern
- Environment-based configuration
```

**Getting Started:**

```bash
npx create-next-app@latest -e https://github.com/cloudinary-community/photocrate photocrate
```

**Use Cases:** Photo libraries, media management dashboards, creative content platforms

***

### 🥉 **3. Galeria** ⭐ **463 stars** (React/React Native Image Viewer)

**Repository:** `nandorojo/galeria`
**Last Update:** Mar 21, 2025
**Forks:** 23 | **Contributors:** 6

**Perfect for:** Cross-platform image viewing (Web, iOS, Android)

**Key Features:**

- Works with **ANY image component** (Next.js Image, Expo, FastImage, etc.)
- Shared element transitions
- Pinch-to-zoom and double-tap zoom
- Pan-to-close gesture
- Multi-image support
- FlashList support for high-performance lists
- Native implementations (Swift for iOS, Kotlin for Android)
- Web support with Framer Motion
- Dark mode support
- Remote URLs and local images

**Tech Stack:** TypeScript 67.3%, Kotlin 18.3%, Swift 8.3%

**React Native + Web Example:**

```javascript
import { Galeria } from '@nandorojo/galeria'
import Image from 'next/image'

export const Gallery = ({ urls }) => (
  <Galeria urls={urls}>
    {urls.map((url, i) => (
      <Galeria.Image index={i} key={i}>
        <Image src={url} width={100} height={100} />
      </Galeria.Image>
    ))}
  </Galeria>
)
```


***

## 🎨 **COMPONENT LIBRARIES \& UTILITIES**

### **4. next-gallery** ⭐ **55 stars**

**Repository:** `fmkra/next-gallery`
**Last Update:** Oct 26, 2024
**Package:** `npm install next-gallery`

**Key Features:**

- **Server Component support** (no JS shipped to client!)
- Responsive layout with CSS-only image resizing
- Configurable aspect ratios per breakpoint
- Customizable gap and image loading
- Overlay support for annotations
- Last row behavior options (preserve, fill, match-previous)
- Image optimization with Next.js Image component

**Usage Example:**

```javascript
import { Gallery } from "next-gallery"

const images = [
  { src: "image1.jpg", aspect_ratio: 16/9 },
  { src: "image2.jpg", aspect_ratio: 4/3 },
]

export default function MyGallery() {
  return (
    <Gallery 
      images={images}
      widths={[500, 1000, 1600]}
      ratios={[2.2, 4, 6, 8]}
      gap="2px"
    />
  )
}
```

**Advantages:** Minimal JavaScript, server-side calculations, SEO-friendly

***

### **5. react-photo-album**

**Popular Choice for Responsive Galleries**

**Key Features:**

- Responsive grid/masonry layouts
- Lightbox integration
- Touch-friendly navigation
- Click outside to close
- Keyboard navigation
- Customizable theme
- Accessibility support (ARIA labels, semantic HTML)

**Perfect for:** Photo galleries, portfolio showcases, media feeds

***

## 🚀 **STARTER TEMPLATES**

### **6. Next.js Image Gallery Starter**

**Repository:** Vercel Official Template
**URL:** `vercel.com/templates/next.js/image-gallery-starter`

**Built With:** Next.js, Cloudinary, Tailwind CSS

**Features:**

- Image optimization with Cloudinary
- Responsive grid layout
- Search and filtering
- Dark/light mode
- SEO optimized
- Deployment-ready

***

### **7. Pixelize Portfolio Template** ⭐ Growing

**Repository:** `namanbarkiya/minimal-next-portfolio`
**Latest:** Next.js 16

**Features:**

- Modern, responsive design
- SEO-optimized
- Mobile-first approach
- Portfolio sections (projects, about, contact)
- Fast loading with image optimization
- Clean code structure

***

### **8. X100 Photography Portfolio**

**Repository:** `lilxyzz/X100`

**Features:**

- Next.js 15+ based
- Dynamic collections
- Smooth animations
- Dark/light theme
- Photography-focused design
- Beautiful gallery layouts

***

## 📋 **COMPARISON TABLE**

| Project | Stars | Type | Best Use Case | Last Updated |
| :-- | :-- | :-- | :-- | :-- |
| Magic Portfolio | 917 | Template | Professional portfolio + gallery | Jan 2025 |
| Galeria | 463 | Component | Cross-platform image viewer | Mar 2025 |
| PhotoCrate | 139 | Full App | Media management + editing | Jun 2024 |
| next-gallery | 55 | Component | Server-rendered galleries | Oct 2024 |
| react-photo-album | - | Component | Responsive layouts | Active |


***

## 🛠️ **TECH STACK RECOMMENDATIONS**

**For Maximum Performance:**

- **UI:** shadcn/ui, Magic UI, or Aceternity UI
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Motion.dev
- **Images:** Next.js Image + Cloudinary
- **State:** TanStack React Query
- **Database:** Prisma + PostgreSQL (for media metadata)

**Example Production Stack:**

```json
{
  "framework": "Next.js 16",
  "ui-system": "shadcn/ui + Magic UI",
  "styling": "Tailwind CSS 4",
  "animations": "Framer Motion",
  "images": "Next/image + Cloudinary",
  "forms": "React Hook Form",
  "state": "TanStack Query",
  "api": "tRPC",
  "deployment": "Vercel"
}
```


***

## 🎯 **QUICK START RECOMMENDATIONS**

**For Photographers/Filmmakers:**
→ Start with **Magic Portfolio** + `next-gallery`

**For Interactive Media Galleries:**
→ Build with **PhotoCrate** + Cloudinary

**For Cross-Platform Image Viewing:**
→ Use **Galeria** component library

**For Developer Portfolios:**
→ Fork **Magic Portfolio** or **X100**

***

## 📚 **Learning Resources**

- **Magic Portfolio Docs:** https://docs.once-ui.com
- **PhotoCrate Setup Guide:** GitHub README with env configuration
- **Galeria Examples:** GitHub repo includes React Native + Web examples
- **Next.js Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images

***

All these projects are actively maintained with MIT or CC licenses, making them perfect for commercial and personal use. The repositories with the most stars indicate strong community adoption and ongoing support! 🎬✨
<span style="display:none">[^1][^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^2][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^3][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^4][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^5][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^6][^60][^61][^62][^63][^64][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://arxiv.org/html/2504.02004v1

[^2]: https://arxiv.org/html/2407.20962v1

[^3]: https://arxiv.org/html/2410.05586

[^4]: https://arxiv.org/html/2412.12223

[^5]: https://arxiv.org/html/2501.01427v1

[^6]: http://arxiv.org/pdf/1807.11627.pdf

[^7]: https://arxiv.org/html/2503.04720v1

[^8]: http://arxiv.org/pdf/2410.19760.pdf

[^9]: https://dev.to/leamsigc/top-10-trending-github-repositories-january-2025-1f24

[^10]: https://dev.to/blamsa0mine/building-a-modern-image-gallery-with-nextjs-16-typescript-unsplash-api-629

[^11]: https://www.reddit.com/r/tailwindcss/comments/1lbbpwg/open_source_animated_nextjs_portfolio_agency/

[^12]: https://www.youtube.com/watch?v=7bfTpZxRGto

[^13]: https://www.youtube.com/watch?v=BSoRXk1FIw8

[^14]: https://dev.to/isanjayjoshi/pixelize-open-source-nextjs-template-for-portfolio-32co

[^15]: https://thebcms.com/blog/nextjs-websites-examples

[^16]: https://cloudinary.com/documentation/nextjs_image_component_tutorial

[^17]: https://magicui.design/blog/nextjs-portfolio-template

[^18]: https://www.reddit.com/r/nextjs/comments/1i91mp7/weekly_showoff_thread_share_what_youve_created/

[^19]: https://github.com/fmkra/next-gallery

[^20]: https://www.sanity.io/projects/nextjs-portfolio

[^21]: https://github.com/topics/movie-app-nextjs

[^22]: https://vercel.com/templates/next.js/image-gallery-starter

[^23]: https://github.com/namanbarkiya/minimal-next-portfolio

[^24]: https://arxiv.org/abs/2503.07314

[^25]: https://arxiv.org/html/2408.09333v2

[^26]: https://arxiv.org/html/2412.10714v1

[^27]: https://arxiv.org/abs/2502.07737

[^28]: http://arxiv.org/pdf/2404.03477.pdf

[^29]: https://arxiv.org/abs/2310.19512

[^30]: https://www.mdpi.com/2076-3417/12/21/10777/pdf?version=1667285019

[^31]: https://github.com/topics/nextjs-template

[^32]: https://github.com/brillout/awesome-react-components

[^33]: https://github.com/bytefer/awesome-nextjs

[^34]: https://github.com/ManUtopiK/awesome-stars

[^35]: https://github.com/ChanMeng666/ChanMeng666

[^36]: https://github.com/oracle-samples/oce-nextjs-gallery-sample

[^37]: https://github.com/topics/nextjs-portfolio-template

[^38]: https://github.com/ixartz/Next-js-Boilerplate

[^39]: https://github.com/cloudinary-community/photocrate

[^40]: https://github.com/themefisher/andromeda-light-nextjs

[^41]: https://github.com/younho9/awesome-stars

[^42]: https://github.com/codesweetly/react-image-grid-gallery

[^43]: https://github.com/shadcnblocks/mainline-nextjs-template

[^44]: https://arxiv.org/html/2401.11061v3

[^45]: https://arxiv.org/html/2411.07772

[^46]: https://arxiv.org/pdf/2110.00601.pdf

[^47]: https://www.aclweb.org/anthology/D17-1101.pdf

[^48]: https://arxiv.org/abs/2502.09411

[^49]: https://arxiv.org/abs/2312.04461

[^50]: https://turcomat.org/index.php/turkbilmat/article/download/1667/1413

[^51]: http://arxiv.org/pdf/1707.05911.pdf

[^52]: https://github.com/svg153/awesome-stars

[^53]: https://github.com/once-ui-system/magic-portfolio

[^54]: https://github.com/ddanninger/awesome-stars

[^55]: https://github.com/topics/magicui

[^56]: https://github.com/lilxyzz/X100

[^57]: https://github.com/ddresch/ddresch-stars

[^58]: https://github.com/Allunan/Portfolio-Basic-Motion

[^59]: https://github.com/nandorojo/galeria

[^60]: https://github.com/simonecorsi/awesome

[^61]: https://github.com/kinhdev24/kinhdev24-portfolio

[^62]: https://github.com/prabhuignoto/react-visual-grid

[^63]: https://github.com/KBLLR/git-stars

[^64]: https://github.com/Oseni03/Spaark

