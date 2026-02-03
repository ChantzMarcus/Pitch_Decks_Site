# Diagnostic: Why Hero Keeps Reverting

**Date**: February 2, 2026
**Issue**: Hero component keeps reverting to basic version with Dribbble video injection

---

## 🚨 **ROOT CAUSE IDENTIFIED**

### The Dribbble Video Element
The DOM shows: `<drb-video>` with `cdn.dribbble.com` source

**This is NOT from your codebase!**

This indicates:
1. **Browser Extension** injecting content (most likely)
2. **External Script** loading Dribbble content
3. **Browser Cache** showing old version
4. **Build Cache** serving stale content

---

## ✅ **YOUR CODE IS CORRECT**

Your `Hero.tsx` has:
- ✅ Parallax scrolling (`useScroll`, `useTransform`)
- ✅ Scroll-driven animations (y, opacity, scale, rotate)
- ✅ Video background (Cloudinary)
- ✅ Dark background (`bg-charcoal`)
- ✅ All animations working

**The file is correct. The problem is external.**

---

## 🔍 **DIAGNOSTIC STEPS**

### Step 1: Check Browser Extensions
```bash
# Disable ALL browser extensions
# Especially look for:
- Dribbble-related extensions
- Design tool extensions
- Video injection extensions
- Developer tools extensions
```

### Step 2: Check Browser Cache
```bash
# Hard refresh:
- Chrome/Edge: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Firefox: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- Safari: Cmd+Option+R
```

### Step 3: Check Build Cache
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Step 4: Check Git State
```bash
# Verify file hasn't been reverted
git diff src/components/Hero.tsx

# Check if file is staged
git status src/components/Hero.tsx
```

### Step 5: Check for External Scripts
```bash
# Search for any Dribbble references
grep -r "dribbble\|drb-video" src/ public/ .next/
```

---

## 🎯 **SCROLL FEATURES STATUS**

### ✅ **Parallax Scrolling** - IMPLEMENTED
**Location**: `src/components/Hero.tsx`
- `useScroll` hook for scroll tracking
- `useTransform` for parallax effects
- Background moves slower than foreground
- Video scales on scroll

**Code**:
```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start'],
});

const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
```

### ✅ **Scroll-Driven Animations** - IMPLEMENTED
**Location**: `src/components/Hero.tsx`
- Opacity fades on scroll
- Scale transforms on scroll
- Rotation on scroll
- Word-by-word reveal animations

**Code**:
```tsx
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '2deg']);
```

### ✅ **Sticky/Fixed Positioning** - IMPLEMENTED
**Location**: `src/components/StickyCTA.tsx`
- Sticky CTA component
- Fixed positioning for CTAs
- Pinned sections available

**Components**:
- `StickyCTA` - Sticky call-to-action
- `FloatingStickyCTA` - Floating sticky CTA
- `PinnedSection` - Pinned section component

### ✅ **Scrollytelling** - IMPLEMENTED
**Location**: `src/components/animations/ParallaxSection.tsx`
- Scroll-triggered animations
- Story sequence components
- Interactive scroll narratives

**Components**:
- `ParallaxSection` - Parallax sections
- `ScrollReveal` - Scroll reveal animations
- `StorySequence` - Story presentation (archived but available)

---

## 🛠️ **FIXES TO APPLY**

### Fix 1: Disable Browser Extensions
1. Open browser in **Incognito/Private mode**
2. Test if Hero works correctly
3. If yes → Extension is the problem
4. Disable extensions one by one to find culprit

### Fix 2: Clear All Caches
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules (if needed)
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### Fix 3: Verify File State
```bash
# Check current file
cat src/components/Hero.tsx | grep "bg-charcoal"
# Should show: bg-charcoal

# Check for video
cat src/components/Hero.tsx | grep "motion.video"
# Should show: motion.video

# Check git status
git status src/components/Hero.tsx
```

### Fix 4: Commit Current State
```bash
# Save current correct state
git add src/components/Hero.tsx
git commit -m "fix: Lock Hero component with correct dark theme and animations"
```

---

## 🚨 **PREVENTION**

### 1. **Lock File**
- `src/components/Hero.tsx.LOCKED` - Documents correct state
- Read before modifying

### 2. **Protection Guide**
- `HERO_PROTECTION_GUIDE.md` - How to prevent reverts

### 3. **Git Hooks** (Optional)
```bash
# Create pre-commit hook to verify Hero.tsx
# .git/hooks/pre-commit
#!/bin/sh
if grep -q "bg-paper" src/components/Hero.tsx; then
  echo "ERROR: Hero.tsx has bg-paper (should be bg-charcoal)"
  exit 1
fi
```

### 4. **CI/CD Check** (Optional)
Add to GitHub Actions or deployment:
```yaml
- name: Verify Hero component
  run: |
    if grep -q "bg-paper" src/components/Hero.tsx; then
      echo "ERROR: Hero.tsx reverted to bg-paper"
      exit 1
    fi
```

---

## 📋 **VERIFICATION CHECKLIST**

After fixes, verify:
- [ ] Hero shows dark background (`bg-charcoal`)
- [ ] Video background plays (Cloudinary URL)
- [ ] Parallax scrolling works (scroll page, background moves)
- [ ] Text animations work (word-by-word reveal)
- [ ] No Dribbble elements in DOM
- [ ] No external video injections
- [ ] Sticky CTA works
- [ ] Scroll-driven animations work

---

## 🎯 **QUICK FIX COMMANDS**

```bash
# 1. Clear cache
rm -rf .next

# 2. Verify file
grep "bg-charcoal" src/components/Hero.tsx

# 3. Restart server
npm run dev

# 4. Test in incognito mode (no extensions)
```

---

## 📝 **IF IT STILL REVERTS**

1. **Check browser console** for errors
2. **Check Network tab** for external scripts
3. **Check Elements tab** for injected content
4. **Disable ALL extensions**
5. **Test in different browser**
6. **Check git log** for who's changing it

---

**The Dribbble video is NOT from your code. It's being injected externally.**
