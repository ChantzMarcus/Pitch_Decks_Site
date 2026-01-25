# Film Pitch Deck Showcase - Toolkit Reference

## 🛠️ Complete Technology Stack

### Frontend Technologies

#### **Next.js 15** - React Framework
- **Official Docs**: https://nextjs.org/docs
- **Why**: Server-side rendering, routing, API routes, image optimization
- **Installation**: `npx create-next-app@latest`
- **Key Features**:
  - App Router (new architecture)
  - Server & Client Components
  - Built-in Image Optimization
  - API Routes (serverless functions)
  - Incremental Static Regeneration (ISR)

**Quick Reference**:
```bash
# Create new project
npx create-next-app@latest my-app --typescript --tailwind --app

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

#### **React 19** - UI Library
- **Official Docs**: https://react.dev
- **Why**: Component-based architecture, virtual DOM, massive ecosystem
- **Key Concepts**:
  - Components (functional)
  - Hooks (useState, useEffect, useRef, useMemo, useCallback)
  - Context API (global state)
  - Suspense (loading states)

**Essential Hooks**:
```typescript
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// State management
const [count, setCount] = useState(0);

// Side effects
useEffect(() => {
  // Runs after render
  return () => {
    // Cleanup
  };
}, [dependencies]);

// DOM references
const divRef = useRef<HTMLDivElement>(null);

// Memoization
const expensiveValue = useMemo(() => computeExpensive(data), [data]);

// Callback memoization
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

---

#### **TypeScript** - Type-Safe JavaScript
- **Official Docs**: https://www.typescriptlang.org/docs
- **Why**: Catch errors at compile time, better IDE support, self-documenting code
- **Installation**: Included with Next.js setup

**Essential Types**:
```typescript
// Basic types
type User = {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional
};

// Union types
type Status = 'pending' | 'success' | 'error';

// Interface (similar to type)
interface DeckProps {
  deck: Deck;
  onSelect: (id: string) => void;
}

// Generic types
type ApiResponse<T> = {
  data: T;
  error: string | null;
};

// Utility types
type PartialDeck = Partial<Deck>; // All properties optional
type RequiredDeck = Required<Deck>; // All properties required
type DeckTitle = Pick<Deck, 'title' | 'id'>; // Pick specific properties
```

---

#### **Tailwind CSS v4** - Utility-First CSS
- **Official Docs**: https://tailwindcss.com/docs
- **Why**: Rapid development, consistent design, small bundle size
- **Installation**: Included with Next.js setup

**Configuration** (`tailwind.config.ts`):
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2B2B2B',
        paper: '#F8F8F6',
        'accent-indigo': '#4F46E5',
        'accent-red': '#DC2626',
        'accent-gold': '#F59E0B',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

**Common Classes Cheat Sheet**:
```bash
# Layout
flex, grid, block, inline-block, hidden
flex-row, flex-col, flex-wrap
justify-start, justify-center, justify-between
items-start, items-center, items-end
gap-4, space-x-4, space-y-4

# Sizing
w-full, w-1/2, w-screen, h-screen
max-w-7xl, min-h-screen
p-4, px-6, py-8, m-4, mx-auto

# Typography
text-sm, text-base, text-lg, text-xl, text-2xl
font-normal, font-medium, font-bold
text-center, text-left, text-right
leading-tight, leading-normal, leading-loose

# Colors
bg-charcoal, text-paper, border-gray-300
hover:bg-accent-indigo, focus:ring-2

# Effects
rounded-lg, shadow-md, opacity-50
transition-all, duration-300, ease-in-out
hover:scale-105, hover:shadow-xl

# Responsive
md:flex-row (applies on medium screens+)
lg:grid-cols-3 (3 columns on large screens+)
```

---

#### **Framer Motion** - Animation Library
- **Official Docs**: https://www.framer.com/motion
- **Why**: Declarative animations, gesture support, performant
- **Installation**: `npm install framer-motion`

**Core Concepts**:
```typescript
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover/tap animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Scroll-triggered animations
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Appears on scroll
</motion.div>

// Gesture animations
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 0 }}
  dragElastic={0.2}
>
  Draggable
</motion.div>

// List animations
<AnimatePresence>
  {items.map(item => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {item.name}
    </motion.li>
  ))}
</AnimatePresence>

// Scroll-based values
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

<motion.div style={{ opacity }}>
  Fades as you scroll
</motion.div>
```

---

#### **Shadcn/ui** - Component Library
- **Official Docs**: https://ui.shadcn.com
- **Why**: Copy-paste components (not npm package), accessible, customizable
- **Installation**: `npx shadcn-ui@latest init`

**Adding Components**:
```bash
# Add individual components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
```

**Usage Example**:
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default" size="lg">
      View Deck
    </Button>
  </CardContent>
</Card>
```

---

#### **lightGallery.js** - Image Gallery/Lightbox
- **Official Docs**: https://www.lightgalleryjs.com
- **Why**: Hardware-accelerated, keyboard accessible, touch gestures
- **Installation**: `npm install lightgallery lg-thumbnail lg-zoom`

**Implementation**:
```typescript
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

useEffect(() => {
  const gallery = lightGallery(galleryRef.current, {
    plugins: [lgThumbnail, lgZoom],
    speed: 500,
    thumbnail: true,
    animateThumb: true,
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
  });

  return () => {
    gallery.destroy();
  };
}, []);
```

---

### Backend Technologies

#### **Supabase** - Backend as a Service
- **Official Docs**: https://supabase.com/docs
- **Why**: PostgreSQL + Auth + Storage + Realtime in one platform
- **Dashboard**: https://app.supabase.com

**Setup**:
```bash
# Install client library
npm install @supabase/supabase-js

# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Client Configuration** (`lib/supabase.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe queries
export type Database = {
  public: {
    Tables: {
      decks: {
        Row: {
          id: string;
          title: string;
          description: string;
          // ... other fields
        };
        Insert: {
          title: string;
          description: string;
          // ...
        };
        Update: {
          title?: string;
          description?: string;
          // ...
        };
      };
    };
  };
};
```

**Common Operations**:
```typescript
// Fetch all decks
const { data: decks, error } = await supabase
  .from('decks')
  .select('*')
  .order('created_at', { ascending: false });

// Fetch single deck with slides
const { data: deck } = await supabase
  .from('decks')
  .select(`
    *,
    slides (*)
  `)
  .eq('id', deckId)
  .single();

// Insert new lead
const { data, error } = await supabase
  .from('leads')
  .insert([
    {
      full_name: 'John Doe',
      email: 'john@example.com',
      // ...
    }
  ]);

// Upload file to Storage
const { data, error } = await supabase.storage
  .from('deck-images')
  .upload(`deck-1/slide-01.jpg`, file);

// Get public URL
const { data } = supabase.storage
  .from('deck-images')
  .getPublicUrl('deck-1/slide-01.jpg');
```

---

#### **PostgreSQL** - Relational Database
- **Official Docs**: https://www.postgresql.org/docs
- **Why**: Industry-standard, ACID compliant, powerful querying
- **Access**: Via Supabase (managed PostgreSQL)

**SQL Cheat Sheet**:
```sql
-- Create table
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data
INSERT INTO decks (title, description)
VALUES ('Project Title', 'Description here');

-- Select data
SELECT * FROM decks
WHERE genre @> ARRAY['Sci-Fi']
ORDER BY created_at DESC
LIMIT 10;

-- Update data
UPDATE decks
SET view_count = view_count + 1
WHERE id = 'deck-uuid';

-- Delete data
DELETE FROM decks WHERE id = 'deck-uuid';

-- Join tables
SELECT decks.*, COUNT(slides.id) as slide_count
FROM decks
LEFT JOIN slides ON slides.deck_id = decks.id
GROUP BY decks.id;

-- Create index
CREATE INDEX idx_decks_genre ON decks USING GIN (genre);
```

---

### Development Tools

#### **VS Code / Cursor** - Code Editor
- **VS Code**: https://code.visualstudio.com
- **Cursor**: https://cursor.sh (AI-powered fork of VS Code)

**Essential Extensions**:
```
ES7+ React/Redux/React-Native snippets
Tailwind CSS IntelliSense
Prettier - Code formatter
ESLint
TypeScript Vue Plugin (Volar)
GitLens
Error Lens
Auto Rename Tag
Path Intellisense
Import Cost
```

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

#### **Claude Code** - AI Coding Assistant
- **Access**: Via Claude Projects or API
- **Usage**: Integrated into terminal workflow

**Workflow**:
```bash
# 1. Create project in Claude
# 2. Upload your codebase
# 3. Use prompts like:

"Create a Hero component with Framer Motion animations"
"Add SEO meta tags to the homepage"
"Optimize images in the gallery for faster loading"
"Fix TypeScript errors in DeckCard component"
"Add error handling to the lead submission form"
```

---

#### **Git & GitHub** - Version Control
- **Git Docs**: https://git-scm.com/doc
- **GitHub**: https://github.com

**Essential Commands**:
```bash
# Initialize repo
git init

# Stage changes
git add .
git add specific-file.ts

# Commit changes
git commit -m "Add deck viewer component"

# View status
git status
git log --oneline

# Branching
git branch feature/new-gallery
git checkout feature/new-gallery
git checkout -b feature/lead-form  # Create and switch

# Merge
git checkout main
git merge feature/new-gallery

# Remote operations
git remote add origin https://github.com/username/repo.git
git push -u origin main
git pull origin main

# Undo changes
git restore file.ts           # Discard changes
git reset --soft HEAD~1       # Undo last commit (keep changes)
git reset --hard HEAD~1       # Undo last commit (discard changes)

# Stash changes
git stash                     # Save uncommitted changes
git stash pop                 # Restore stashed changes
```

**Recommended Workflow**:
```
main (production)
  └── develop (staging)
        ├── feature/gallery-redesign
        ├── feature/lead-scoring
        └── bugfix/lightbox-mobile
```

---

#### **Vercel** - Hosting Platform
- **Dashboard**: https://vercel.com
- **CLI**: `npm install -g vercel`

**Deployment**:
```bash
# Login
vercel login

# Deploy
vercel          # Preview deployment
vercel --prod   # Production deployment

# Environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

**vercel.json** (optional config):
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://yoursite.com"
  }
}
```

---

### Utility Libraries

#### **clsx** - Conditional Classnames
- **NPM**: `npm install clsx`
- **Why**: Combine classnames conditionally

```typescript
import clsx from 'clsx';

const buttonClass = clsx(
  'px-4 py-2 rounded',
  isPrimary && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className // Accept additional classes
);
```

---

#### **class-variance-authority (CVA)** - Variant Components
- **NPM**: `npm install class-variance-authority`
- **Why**: Create component variants easily

```typescript
import { cva } from 'class-variance-authority';

const button = cva('px-4 py-2 rounded font-medium', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    },
    size: {
      small: 'text-sm py-1 px-2',
      medium: 'text-base py-2 px-4',
      large: 'text-lg py-3 px-6',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

// Usage
<button className={button({ intent: 'danger', size: 'large' })}>
  Delete
</button>
```

---

#### **Zod** - Schema Validation
- **NPM**: `npm install zod`
- **Why**: Type-safe runtime validation

```typescript
import { z } from 'zod';

// Define schema
const LeadFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  projectDescription: z.string().min(50, 'Please provide more details'),
});

// Validate data
try {
  const validData = LeadFormSchema.parse(formData);
  // Submit to database
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(error.errors);
  }
}

// Type inference
type LeadFormData = z.infer<typeof LeadFormSchema>;
```

---

#### **React Hook Form** - Form Management
- **NPM**: `npm install react-hook-form`
- **Why**: Performant, minimal re-renders

```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email', { required: true })} />
  {errors.email && <span>Email is required</span>}
  
  <button type="submit">Submit</button>
</form>
```

---

### Design & Prototyping Tools

#### **Figma** - Design Tool (Optional)
- **Website**: https://figma.com
- **Why**: Wireframe layouts, design system, collaborate
- **Free Tier**: 3 Figma files, unlimited drafts

**Use Cases**:
- Sketch component layouts before coding
- Create responsive grid templates
- Design color palette/typography system
- Share mockups with stakeholders

---

#### **Dribbble / Awwwards** - Design Inspiration
- **Dribbble**: https://dribbble.com/search/pitch-deck
- **Awwwards**: https://awwwards.com/websites/portfolio

**Search Terms**:
- "pitch deck website"
- "portfolio gallery"
- "project showcase"
- "creative agency"
- "film production"

---

### Analytics & Monitoring

#### **Vercel Analytics**
- **Docs**: https://vercel.com/docs/analytics
- **Installation**: `npm install @vercel/analytics`

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Metrics Tracked**:
- Page views
- Unique visitors
- Top pages
- Referral sources
- Device/browser breakdown
- Core Web Vitals

---

#### **Sentry** - Error Monitoring (Optional)
- **Website**: https://sentry.io
- **Installation**: `npm install @sentry/nextjs`

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

### SEO Tools

#### **Next.js Metadata API**
```typescript
// app/page.tsx
export const metadata = {
  title: 'Award-Winning Film Pitch Decks | Your Company',
  description: 'Explore our collection of professionally crafted TV and film pitch decks. Discover compelling stories ready for production.',
  openGraph: {
    title: 'Award-Winning Film Pitch Decks',
    description: 'Explore our collection...',
    url: 'https://yoursite.com',
    siteName: 'Your Company',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Award-Winning Film Pitch Decks',
    description: 'Explore our collection...',
    images: ['https://yoursite.com/twitter-image.jpg'],
  },
};
```

---

#### **Google Search Console**
- **Website**: https://search.google.com/search-console
- **Purpose**: Monitor search performance, submit sitemap

**Setup**:
1. Verify domain ownership
2. Submit sitemap: `https://yoursite.com/sitemap.xml`
3. Monitor impressions, clicks, rankings

---

### Testing Tools

#### **Playwright** - E2E Testing (Optional)
- **Docs**: https://playwright.dev
- **Installation**: `npm init playwright@latest`

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('heading', { name: 'Award-Winning Stories' })).toBeVisible();
});

test('can open deck viewer', async ({ page }) => {
  await page.goto('http://localhost:3000/gallery');
  await page.getByRole('link', { name: 'Neon Eclipse' }).click();
  await expect(page).toHaveURL(/\/deck\/.+/);
});
```

---

## 📦 Package Manager Comparison

### npm (Default)
```bash
npm install package-name
npm run dev
npm run build
```

### pnpm (Faster, disk-efficient)
```bash
npm install -g pnpm
pnpm install package-name
pnpm dev
pnpm build
```

### yarn (Alternative)
```bash
npm install -g yarn
yarn add package-name
yarn dev
yarn build
```

**Recommendation**: Stick with **npm** for simplicity unless you have specific performance needs.

---

## 🔧 Configuration Files

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-project.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 🚀 Quick Reference Commands

```bash
# Project Setup
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm install

# Development
npm run dev                  # Start dev server
npm run build                # Build for production
npm run start                # Run production build locally
npm run lint                 # Run ESLint

# Git
git status
git add .
git commit -m "message"
git push

# Vercel
vercel                       # Preview deployment
vercel --prod                # Production deployment
vercel env add VAR_NAME      # Add environment variable

# Supabase (via CLI - optional)
npx supabase init
npx supabase start
npx supabase db push
```

---

## 📚 Learning Resources

### Official Documentation
- **Next.js**: https://nextjs.org/learn
- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/handbook/intro.html
- **Tailwind**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs

### Video Tutorials
- **Next.js 14 Tutorial** (Vercel): https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw
- **Tailwind Crash Course** (Traversy Media): https://www.youtube.com/watch?v=UBOj6rqRUME
- **Framer Motion** (The Net Ninja): https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i

### Interactive Learning
- **TypeScript Exercises**: https://typescript-exercises.github.io
- **Flexbox Froggy**: https://flexboxfroggy.com
- **Grid Garden**: https://cssgridgarden.com

---

## 🛡️ Best Practices

1. **Type Everything**: Use TypeScript strictly
2. **Component Composition**: Break down into reusable pieces
3. **Semantic HTML**: Use proper tags (nav, article, section)
4. **Accessibility**: Add ARIA labels, keyboard navigation
5. **Performance**: Lazy load, optimize images, minimize bundles
6. **Security**: Sanitize inputs, use environment variables
7. **Version Control**: Commit often with clear messages
8. **Testing**: Test on multiple devices/browsers
9. **Documentation**: Comment complex logic, update README
10. **Monitoring**: Track errors and performance in production

---

**This toolkit covers everything you need to build a production-ready film pitch deck showcase. Bookmark this file and refer back as needed!**
