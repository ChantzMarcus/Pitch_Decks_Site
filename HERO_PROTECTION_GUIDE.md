# Hero Component Protection Guide

**CRITICAL**: This file keeps getting reverted. Here's how to prevent it.

---

## 🚨 **THE PROBLEM**

Hero component keeps reverting to:
- ❌ White background (`bg-paper`)
- ❌ No animations
- ❌ Basic styling

**Root Cause**: Something is overwriting the file or reverting changes.

---

## ✅ **CORRECT HERO STATE**

### Must Have:
- ✅ `bg-charcoal` (dark background for video)
- ✅ Video background (Cloudinary URLs)
- ✅ Gradient overlays (for text readability)
- ✅ Text colors: `text-paper` (white/light for dark background)
- ✅ All animations working
- ✅ Film icons (FilmReelIcon, PlayButtonIcon)

### Current Correct State:
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
  {/* Video background */}
  {/* Gradient overlays */}
  {/* Particles (optional) */}
  {/* Film grain (optional) */}
  {/* Content with text-paper colors */}
</section>
```

---

## 🔒 **PROTECTION MECHANISMS**

### 1. **Lock File Created**
- `src/components/Hero.tsx.LOCKED` - Documents correct state
- Read this before modifying Hero.tsx

### 2. **Verification Checklist**
Before any changes to Hero.tsx:
- [ ] Read `Hero.tsx.LOCKED`
- [ ] Verify current state
- [ ] Don't change `bg-charcoal`
- [ ] Don't remove video background
- [ ] Don't change text colors to `text-charcoal` (use `text-paper`)

### 3. **Git Protection**
```bash
# Before making changes, create backup
cp src/components/Hero.tsx src/components/Hero.tsx.backup

# After changes, verify:
grep "bg-charcoal" src/components/Hero.tsx
grep "motion.video" src/components/Hero.tsx
grep "text-paper" src/components/Hero.tsx
```

---

## 🎯 **QUICK FIX IF REVERTED**

If Hero reverts to white background:

1. **Check background color**:
   ```tsx
   // WRONG:
   className="... bg-paper"
   
   // CORRECT:
   className="... bg-charcoal"
   ```

2. **Check text colors**:
   ```tsx
   // WRONG (for dark background):
   className="... text-charcoal"
   
   // CORRECT:
   className="... text-paper"
   ```

3. **Check video exists**:
   ```tsx
   // Should have:
   <motion.video>...</motion.video>
   ```

4. **Check animations**:
   ```tsx
   // Should have:
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   ```

---

## 🚨 **COMMON REVERT PATTERNS**

### Pattern 1: Background Reverts
**Symptom**: `bg-paper` appears instead of `bg-charcoal`
**Fix**: Change `bg-paper` → `bg-charcoal`

### Pattern 2: Text Colors Revert
**Symptom**: Text invisible (charcoal on charcoal)
**Fix**: Change `text-charcoal` → `text-paper`

### Pattern 3: Video Removed
**Symptom**: No video background
**Fix**: Add video element from HeroVideo.tsx

### Pattern 4: Animations Removed
**Symptom**: No motion animations
**Fix**: Ensure `motion.div` and animation props present

---

## 📋 **VERIFICATION COMMANDS**

```bash
# Check background
grep "bg-charcoal" src/components/Hero.tsx

# Check video
grep "motion.video" src/components/Hero.tsx

# Check text colors
grep "text-paper" src/components/Hero.tsx

# Check animations
grep "initial.*opacity" src/components/Hero.tsx
```

---

## 🎯 **IF IT KEEPS HAPPENING**

### Possible Causes:
1. **Another agent overwriting** - Check git log
2. **Build cache** - Clear `.next` folder
3. **Browser cache** - Hard refresh (Cmd+Shift+R)
4. **File watcher issue** - Restart dev server

### Solutions:
1. **Lock the file** - Add to `.gitignore` temporarily
2. **Create backup** - Keep `Hero.tsx.backup`
3. **Document state** - Update `Hero.tsx.LOCKED`
4. **Check git** - See who's changing it

---

## ✅ **CURRENT CORRECT STATE**

**File**: `src/components/Hero.tsx`
**Background**: `bg-charcoal` ✅
**Video**: Present ✅
**Text Colors**: `text-paper` ✅
**Animations**: All present ✅

**If you see `bg-paper` in DOM**: File was reverted, restore from backup or fix manually.

---

**Last Verified**: February 2, 2026
