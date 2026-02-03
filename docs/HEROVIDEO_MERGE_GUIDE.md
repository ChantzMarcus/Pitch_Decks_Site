# HeroVideo Merge Implementation Guide

**For Agents**: Step-by-step guide to merge HeroVideo features into Hero component

---

## 🎯 **OBJECTIVE**

Merge video background and cinematic effects from `HeroVideo.tsx` into `Hero.tsx` **WITHOUT** replacing Hero's current improvements (film icons, better text, gradient blobs).

**Key Principle**: **MERGE, DON'T REPLACE**

---

## ✅ **WHAT TO PRESERVE FROM HERO**

**DO NOT REMOVE:**
- ✅ Current text: "Pitch Decks That Get Noticed"
- ✅ Film-themed icons (FilmReelIcon, PlayButtonIcon)
- ✅ Gradient blob animations
- ✅ Current badge text: "Industry's Most Trusted Analysis"
- ✅ Current CTA buttons and styling
- ✅ Current stats section
- ✅ Current scroll indicator

---

## ✅ **WHAT TO ADD FROM HEROVIDEO**

**ADD THESE FEATURES:**
- ✅ Video background (Cloudinary URLs already configured)
- ⚠️ Particle system (HeroParticleBackground) - Optional
- ⚠️ Film grain overlay (FilmGrain) - Optional
- ⚠️ Company logo marquee - Optional (if space allows)

---

## 📋 **STEP-BY-STEP IMPLEMENTATION**

### Step 1: Add Video Background

**Location**: After opening `<section>` tag, before gradient blobs

**Add this code**:
```tsx
{/* Video Background */}
<div className="absolute inset-0 z-0">
  <motion.video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
    poster="/images/posters/hero-poster.jpg"
    style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
  >
    <source 
      src={process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_DESKTOP || 'https://res.cloudinary.com/dkhtswt1m/video/upload/v1/VF-LOOP-OK-OK.mp4'} 
      type="video/mp4" 
    />
  </motion.video>
  
  {/* Gradient Overlays for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
  <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/70" />
</div>
```

**Important**: 
- Use `motion.video` from framer-motion
- Add `videoScale` transform (zooms on scroll)
- Add gradient overlays for text readability
- Use Cloudinary URLs with env var fallback

---

### Step 2: Add Optional Particle System

**Location**: After video, before gradient blobs

**Add this code** (if you want particles):
```tsx
{/* Animated particle system - OPTIONAL */}
{isMounted && (
  <HeroParticleBackground
    particleCount={300}
    colors={['#F59E0B', '#14B8A6', '#6366F1']}
    opacity={0.15}
    className="z-[1]"
  />
)}
```

**Import needed**:
```tsx
import HeroParticleBackground from '@/components/animations/HeroParticleBackground';
```

**Note**: This is optional - particles can be heavy. Consider making it configurable.

---

### Step 3: Add Optional Film Grain

**Location**: After particles (if added)

**Add this code** (if you want film grain):
```tsx
{/* Film Grain Overlay - OPTIONAL */}
{isMounted && (
  <FilmGrain 
    opacity={0.02} 
    intensity="medium" 
    className="z-[1]" 
  />
)}
```

**Import needed**:
```tsx
import FilmGrain from '@/components/animations/FilmGrain';
```

**Note**: This is optional - very subtle effect.

---

### Step 4: Update Background Color

**Change**:
```tsx
// FROM:
className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper"

// TO:
className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
```

**Why**: Video background needs dark background, text is white/light

---

### Step 5: Update Text Colors (If Needed)

**Check**: If text becomes hard to read with video background

**May need to change**:
```tsx
// Text colors might need adjustment for video background
// Current: text-charcoal
// May need: text-paper or text-white
```

**Test**: Verify text is readable over video

---

### Step 6: Add Optional Logo Marquee

**Location**: Bottom of section, before closing `</section>`

**Add this code** (if you want logo marquee):
```tsx
{/* Company Logo Marquee - OPTIONAL */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 2 }}
  className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/95 to-transparent pb-8 pt-20"
>
  {/* Logo marquee code from HeroVideo.tsx */}
</motion.div>
```

**Note**: This is optional - may not fit with current design

---

## ✅ **CHECKLIST**

Before marking complete, verify:

- [ ] Video background added and working
- [ ] Video uses Cloudinary URLs (with fallback)
- [ ] Video has gradient overlays for readability
- [ ] Hero's current text preserved ("Pitch Decks That Get Noticed")
- [ ] Hero's film icons preserved
- [ ] Hero's gradient blobs still work
- [ ] Hero's CTA buttons preserved
- [ ] Hero's stats section preserved
- [ ] Text is readable over video
- [ ] Video loads on mobile (poster image shows)
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Tested in production

---

## 🚨 **COMMON MISTAKES TO AVOID**

1. ❌ **Don't replace Hero entirely** - Merge features
2. ❌ **Don't change text** - Keep "Pitch Decks That Get Noticed"
3. ❌ **Don't remove film icons** - Keep FilmReelIcon, PlayButtonIcon
4. ❌ **Don't remove gradient blobs** - They work with video
5. ❌ **Don't forget gradient overlays** - Text must be readable
6. ❌ **Don't forget mobile** - Use poster images

---

## 📊 **EXPECTED RESULT**

**What You Should See:**
- ✅ Video background playing
- ✅ Current Hero text ("Pitch Decks That Get Noticed")
- ✅ Film-themed icons
- ✅ Gradient blobs (may be subtle over video)
- ✅ Readable text (with gradient overlays)
- ✅ All Hero features working

---

## 🎯 **PERFORMANCE CONSIDERATIONS**

### Video Optimization:
- ✅ Use Cloudinary (CDN)
- ✅ Poster image for mobile
- ✅ Lazy load if possible
- ✅ Optimize video file size

### Mobile Considerations:
- ✅ Poster image shows immediately
- ✅ Video may not autoplay (browser policy)
- ✅ Consider disabling on mobile if heavy

---

## 📝 **FILES TO MODIFY**

**Primary File**:
- `src/components/Hero.tsx` - Add video background

**Imports Needed**:
```tsx
import HeroParticleBackground from '@/components/animations/HeroParticleBackground'; // Optional
import FilmGrain from '@/components/animations/FilmGrain'; // Optional
```

**Reference File** (for code examples):
- `src/components/HeroVideo.tsx` - See video implementation

---

## ✅ **VERIFICATION**

After implementation:

1. **Visual Check**:
   - [ ] Video plays in background
   - [ ] Text is readable
   - [ ] All Hero features visible

2. **Functional Check**:
   - [ ] Video loads from Cloudinary
   - [ ] Poster shows on mobile
   - [ ] Scroll parallax works
   - [ ] All buttons work

3. **Performance Check**:
   - [ ] Page load time acceptable
   - [ ] Video doesn't block rendering
   - [ ] Mobile performance OK

4. **Integration Checklist**:
   - [ ] Follow `FEATURE_INTEGRATION_CHECKLIST.md`
   - [ ] Test in production
   - [ ] Verify accessibility
   - [ ] Document changes

---

## 🎯 **SUCCESS CRITERIA**

**Merge is successful when:**
- ✅ Video background works
- ✅ Hero's improvements preserved
- ✅ Text readable over video
- ✅ Performance acceptable
- ✅ Mobile works
- ✅ No regressions

---

**Remember**: The goal is to **enhance** Hero with video, not replace it. Preserve all current improvements while adding cinematic video background.
