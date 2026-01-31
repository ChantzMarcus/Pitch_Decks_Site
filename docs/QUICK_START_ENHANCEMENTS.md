# Quick Start: Component Enhancements

## 🚀 5-Minute Setup

### 1. Before/After Showcase

```tsx
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';

// Basic usage
<BeforeAfterShowcase
  items={[
    {
      id: '1',
      before: {
        title: 'Before',
        description: 'Raw concept',
        image: '/before.jpg',
        issues: ['Issue 1', 'Issue 2'],
      },
      after: {
        title: 'After',
        description: 'Polished deck',
        image: '/after.jpg',
        improvements: ['Improvement 1', 'Improvement 2'],
      },
      metrics: {
        funding: '$2.5M',
        timeline: '3 months',
        status: 'In Production',
      },
    },
  ]}
/>

// With auto-advance (optional)
<BeforeAfterShowcase
  items={items}
  autoAdvanceInterval={6000} // 6 seconds
/>
```

**Features:**
- ✅ Touch drag on mobile
- ✅ Arrow keys to navigate
- ✅ Auto-advance with pause on hover
- ✅ Smooth animations

---

### 2. Scroll-Triggered Videos

```tsx
import ScrollTriggeredVideo from '@/components/ScrollTriggeredVideo';

<ScrollTriggeredVideo
  videoSrc="/videos/demo.mp4"
  thumbnail="/thumbnails/demo.jpg"
  title="Demo Video"
/>
```

**Features:**
- ✅ Auto-plays when scrolled into view
- ✅ Progress bar shows playback
- ✅ Pauses when scrolled out
- ✅ "Continue playback" button

---

### 3. Enhanced Deck Cards

```tsx
import DeckGrid from '@/components/DeckGrid';

// With video previews and success metrics
<DeckGrid
  decks={decks}
  horizontalScroll={true}
  videoPreviewUrls={{
    [deckId]: '/videos/preview.mp4',
  }}
  successMetrics={{
    [deckId]: {
      funding: '$2.5M',
      timeline: '3 months',
      status: 'In Production',
    },
  }}
/>
```

**Features:**
- ✅ Video previews on hover
- ✅ Success metrics overlay
- ✅ Lazy loading (videos load on hover)
- ✅ 3D tilt effects

---

### 4. Loading Skeletons

```tsx
import { DeckCardSkeletonGrid } from '@/components/DeckCardSkeleton';

// While loading
{isLoading && (
  <DeckCardSkeletonGrid count={6} horizontalLayout={true} />
)}

// When loaded
{!isLoading && (
  <DeckGrid decks={decks} horizontalScroll={true} />
)}
```

---

## 🎯 Common Patterns

### Pattern 1: Featured Projects Section

```tsx
<section className="py-20 bg-charcoal">
  <div className="max-w-7xl mx-auto px-6">
    <h2>Featured Projects</h2>
    
    {isLoading ? (
      <DeckCardSkeletonGrid count={3} horizontalLayout={true} />
    ) : (
      <DeckGrid
        decks={decks}
        onQuickView={handleQuickView}
        horizontalScroll={true}
        videoPreviewUrls={videoUrls}
        successMetrics={metrics}
      />
    )}
  </div>
</section>
```

### Pattern 2: Transformation Showcase

```tsx
<BeforeAfterShowcase
  items={transformations}
  title="See the Transformation"
  subtitle="From concept to production-ready"
  autoAdvanceInterval={6000}
/>
```

### Pattern 3: Video Gallery

```tsx
import AppleStyleVideoGallery from '@/components/AppleStyleVideoGallery';

<AppleStyleVideoGallery
  videos={[
    {
      videoSrc: '/videos/video1.mp4',
      thumbnail: '/thumbnails/thumb1.jpg',
      title: 'Video Title',
      description: 'Description',
    },
  ]}
  title="Featured Videos"
/>
```

---

## ⚡ Quick Wins

### Enable Auto-Advance
```tsx
<BeforeAfterShowcase autoAdvanceInterval={6000} />
```

### Add Video Previews
```tsx
<DeckGrid videoPreviewUrls={{ [id]: '/video.mp4' }} />
```

### Add Success Metrics
```tsx
<DeckGrid successMetrics={{ [id]: { funding: '$2M' } }} />
```

### Use Loading Skeletons
```tsx
{loading ? <DeckCardSkeletonGrid /> : <DeckGrid />}
```

---

## 🐛 Quick Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Videos not autoplaying | Ensure `muted={true}` |
| Slider not dragging | Check touch handlers attached |
| Keyboard not working | Verify component has focus |
| Performance slow | Enable lazy loading |

---

## 📋 Copy-Paste Checklist

```tsx
// ✅ Import components
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase';
import ScrollTriggeredVideo from '@/components/ScrollTriggeredVideo';
import DeckGrid from '@/components/DeckGrid';
import { DeckCardSkeletonGrid } from '@/components/DeckCardSkeleton';

// ✅ Add loading state
const [isLoading, setIsLoading] = useState(true);

// ✅ Use skeletons while loading
{isLoading && <DeckCardSkeletonGrid count={6} />}

// ✅ Render components when ready
{!isLoading && (
  <DeckGrid
    decks={decks}
    horizontalScroll={true}
    videoPreviewUrls={videoUrls}
    successMetrics={metrics}
  />
)}
```

---

## 🎨 Styling Notes

All components use your existing design system:
- Colors: `accent-indigo`, `accent-gold`, `charcoal`, `paper`
- Spacing: Tailwind defaults
- Animations: Framer Motion
- Responsive: Mobile-first

No additional CSS needed! 🎉

---

## 📚 Next Steps

1. **Read Full Docs**: See `docs/COMPONENT_ENHANCEMENTS.md`
2. **Test Components**: Use the testing checklist
3. **Customize**: Adjust props to fit your needs
4. **Monitor**: Check performance metrics

---

## 💡 Pro Tips

1. **Start Simple**: Use basic props first, add features later
2. **Test Mobile**: Always test touch interactions
3. **Monitor Performance**: Check Network tab for lazy loading
4. **Accessibility**: Test with keyboard only
5. **Progressive Enhancement**: Features degrade gracefully

---

**Ready to go!** All components are production-ready and fully tested. 🚀
