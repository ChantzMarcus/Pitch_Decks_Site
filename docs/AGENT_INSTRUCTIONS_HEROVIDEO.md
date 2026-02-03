# Agent Instructions: HeroVideo Merge

**For**: Agent implementing HeroVideo merge  
**Priority**: High  
**Estimated Time**: 30-60 minutes

---

## 🎯 **TASK**

Merge video background from `HeroVideo.tsx` into `Hero.tsx` **WITHOUT** replacing Hero's current improvements.

**Key Principle**: **MERGE, DON'T REPLACE**

---

## ✅ **CRITICAL REQUIREMENTS**

### DO NOT REMOVE FROM HERO:
- ❌ Current text: "Pitch Decks That Get Noticed"
- ❌ Film-themed icons (FilmReelIcon, PlayButtonIcon)
- ❌ Gradient blob animations
- ❌ Current badge: "Industry's Most Trusted Analysis"
- ❌ Current CTA buttons
- ❌ Current stats section

### DO ADD FROM HEROVIDEO:
- ✅ Video background (Cloudinary URLs)
- ✅ Gradient overlays for text readability
- ⚠️ Particles (optional)
- ⚠️ Film grain (optional)

---

## 📋 **STEP-BY-STEP GUIDE**

**Follow**: `docs/HEROVIDEO_MERGE_GUIDE.md` for detailed instructions

**Quick Summary**:
1. Add video element after `<section>` tag
2. Add gradient overlays for readability
3. Update background color to `bg-charcoal`
4. Test text readability
5. Optional: Add particles/film grain

---

## ✅ **VERIFICATION CHECKLIST**

Before marking complete:

- [ ] Video background works
- [ ] Hero's text preserved
- [ ] Hero's icons preserved
- [ ] Text readable over video
- [ ] No console errors
- [ ] Tested in production
- [ ] Mobile works (poster image)
- [ ] Performance acceptable

**Use**: `docs/guides/FEATURE_INTEGRATION_CHECKLIST.md`

---

## 🚨 **COMMON MISTAKES**

1. ❌ Replacing Hero entirely
2. ❌ Changing Hero's text
3. ❌ Removing film icons
4. ❌ Forgetting gradient overlays
5. ❌ Not testing on mobile

---

## 📝 **REFERENCE FILES**

- **Guide**: `docs/HEROVIDEO_MERGE_GUIDE.md`
- **Current Hero**: `src/components/Hero.tsx`
- **Reference**: `src/components/HeroVideo.tsx`
- **Checklist**: `docs/guides/FEATURE_INTEGRATION_CHECKLIST.md`

---

## 🎯 **SUCCESS CRITERIA**

✅ Video background works  
✅ Hero improvements preserved  
✅ Text readable  
✅ Performance OK  
✅ Mobile works

---

**Remember**: Enhance Hero with video, don't replace it!
