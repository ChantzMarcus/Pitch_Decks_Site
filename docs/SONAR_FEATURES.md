# Sonar Music Features - Integration Guide

All components have been created! Here's how to integrate them into your pitch deck site.

---

## 📦 New Components Created

| Component | File | Purpose |
|-----------|------|---------|
| LoadingScreen | `src/components/LoadingScreen.tsx` | Animated loading screen |
| VideoPlayer | `src/components/VideoPlayer.tsx` | Plyr.io video player wrapper |
| VideoCard | `src/components/VideoCard.tsx` | Video card with 3D hover + preview |
| HorizontalScrollShowcase | `src/components/HorizontalScrollShowcase.tsx` | Horizontal scroll gallery |
| ThemeProvider | `src/components/ThemeProvider.tsx` | Dark/light mode context |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Theme toggle button |
| SVGFilters | `src/components/SVGFilters.tsx` | Gooey/glitch effects |
| MarqueeBackground | `src/components/MarqueeBackground.tsx` | Animated backgrounds |
| SmoothScrollStyles | `src/components/SmoothScrollStyles.tsx` | Global scroll styles |
| HeroSonarStyle | `src/components/HeroSonarStyle.tsx` | Enhanced Hero with all effects |

---

## 🚀 Quick Integration

### 1. Update Root Layout (`src/app/layout.tsx`)

```tsx
import { ThemeProvider } from '@/components/ThemeProvider';
import { SmoothScrollStyles } from '@/components/SmoothScrollStyles';
import { SVGFilters } from '@/components/SVGFilters';
import { ScrollProgress } from '@/components/MarqueeBackground';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScrollStyles />
          <SVGFilters />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Update Home Page (`src/app/page.tsx`)

```tsx
import HeroSonarStyle from '@/components/HeroSonarStyle';
import DeckGrid from '@/components/DeckGrid';
import HorizontalScrollShowcase from '@/components/HorizontalScrollShowcase';
import { getAllDecks } from '@/lib/supabase';

export default async function Home() {
  const decks = await getAllDecks();

  // Sample video data (replace with real data)
  const videoItems = [
    {
      id: '1',
      title: 'Behind the Scenes: Christy',
      category: 'BTS',
      thumbnail: '/images/christy-thumb.jpg',
      videoId: 'dQw4w9WgXcQ', // YouTube ID
      duration: '1:24',
    },
    // ... more videos
  ];

  return (
    <main className="min-h-screen bg-paper">
      <HeroSonarStyle />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalScrollShowcase
            items={videoItems}
            title="Behind the Scenes"
            onCardClick={(item) => console.log('Clicked:', item)}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-5xl font-bold text-charcoal mb-16">
            Featured Projects
          </h2>
          <DeckGrid decks={decks} />
        </div>
      </section>
    </main>
  );
}
```

### 3. Add Theme Toggle to Header

```tsx
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Logo />
      <nav>...</nav>
      <ThemeToggle />
    </header>
  );
}
```

---

## 🎨 Tailwind Config Update

Add to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        charcoal: '#2B2B2B',
        'accent-indigo': '#4F46E5',
        paper: '#F8F8F6',
      },
    },
  },
};
```

---

## 📊 Feature Comparison

| Sonar Feature | Our Implementation | Status |
|---------------|-------------------|--------|
| Custom Video Player | VideoPlayer (Plyr.io) | ✅ |
| Loading Animations | LoadingScreen | ✅ |
| 3D Card Tilt | DeckCard with useMotionValue | ✅ |
| Horizontal Scroll | HorizontalScrollShowcase | ✅ |
| Dark/Light Mode | ThemeProvider + ThemeToggle | ✅ |
| Hidden Scrollbars | SmoothScrollStyles | ✅ |
| SVG Filters | SVGFilters component | ✅ |
| Marquee Background | MarqueeBackground | ✅ |
| Parallax Effects | ParallaxContainer | ✅ |

---

## 🎯 Next Steps

1. **Install CSS for Plyr**
   ```bash
   # Already installed via npm
   # Just add import to your globals.css:
   @import 'plyr/dist/plyr.css';
   ```

2. **Add sample video data**
   - Create a CMS or API endpoint for video metadata
   - Use YouTube Data API for video thumbnails

3. **Customize colors**
   - Update `tailwind.config.js` with your brand colors

4. **Test on mobile**
   - Ensure horizontal scrolling works with touch

---

## 🎬 Demo: YouTube Shorts Integration

```tsx
import VideoCard from '@/components/VideoCard';

export function YouTubeShortsGrid({ videos }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          category="Shorts"
          thumbnail={video.thumbnail}
          videoId={video.youtubeId}
          duration={video.duration}
          onClick={() => openModal(video)}
        />
      ))}
    </div>
  );
}
```

---

All features are ready to use! Let me know if you want me to:
1. Create a demo page with all components
2. Set up the YouTube Data API integration
3. Build a video modal component
4. Customize the styling further
