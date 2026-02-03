# Testing Guide - Immersive View Button

**Date**: February 2, 2026  
**Feature**: Immersive View Button in DeckWalkthroughModal

---

## 🧪 **HOW TO TEST**

### Step 1: Start Development Server
```bash
cd /Users/chantzmarcus/Pitch_Decks_Site
npm run dev
```

### Step 2: Navigate to Homepage
1. Open browser to `http://localhost:3000`
2. Wait for page to load completely

### Step 3: Open a Deck Walkthrough
1. Scroll to "Featured Projects" section
2. Hover over any deck card
3. Click "Watch Deck" button (gold button)
4. DeckWalkthroughModal should open

### Step 4: Test Immersive View Button
1. Look at top-right controls in the modal
2. You should see 4 buttons:
   - **Play/Pause** (circular play icon)
   - **Fullscreen** (expand icon)
   - **Immersive View** (Maximize2 icon) ← **NEW BUTTON**
   - **Close** (X icon)
3. Click the **Immersive View** button (teal-colored)
4. Walkthrough should close smoothly
5. ImmersiveDeckGallery should open automatically
6. You should see full-screen deck viewing

### Step 5: Verify Immersive Gallery Features
- ✅ Full-screen viewing
- ✅ Slide navigation (arrow buttons)
- ✅ Play/pause controls
- ✅ Slide counter (e.g., "1 / 12")
- ✅ Caption display
- ✅ Close button works

---

## ✅ **WHAT TO VERIFY**

### Visual Verification:
- [ ] Immersive View button is visible
- [ ] Button has teal accent color
- [ ] Button shows Maximize2 icon
- [ ] Button appears next to fullscreen button
- [ ] Button has hover effect

### Functional Verification:
- [ ] Clicking button closes walkthrough
- [ ] Immersive gallery opens automatically
- [ ] Transition is smooth (no jarring jump)
- [ ] Current slide is preserved
- [ ] All slides are accessible

### User Experience:
- [ ] Button is easy to find
- [ ] Button tooltip is helpful
- [ ] Transition feels natural
- [ ] No console errors
- [ ] Works on mobile (if testing)

---

## 🐛 **TROUBLESHOOTING**

### Button Not Visible?
- Check if walkthrough modal is open
- Verify you're looking at top-right controls
- Check browser console for errors
- Verify component is imported correctly

### Button Doesn't Work?
- Check browser console for errors
- Verify `onImmersiveView` prop is passed
- Check if `handleImmersiveView` function exists
- Verify ImmersiveDeckGallery component is imported

### Transition Not Smooth?
- Check if there's a delay (should be 300ms)
- Verify both modals use same slide data
- Check for CSS conflicts
- Verify AnimatePresence is working

---

## 📊 **TESTING CHECKLIST**

### Desktop Testing:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Button visible
- [ ] Button clickable
- [ ] Transition smooth
- [ ] Immersive gallery works

### Mobile Testing:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Touch interactions work
- [ ] Button accessible
- [ ] Full-screen works

### Accessibility Testing:
- [ ] Keyboard navigation works
- [ ] Screen reader announces button
- [ ] Focus management correct
- [ ] ARIA labels present

---

## 🎯 **EXPECTED BEHAVIOR**

### When Button is Clicked:
1. Walkthrough modal starts closing animation
2. After 300ms delay, ImmersiveDeckGallery opens
3. Current slide index is preserved
4. User sees full-screen deck viewing
5. All immersive gallery controls work

### Visual Flow:
```
Walkthrough Modal (open)
    ↓ [Click Immersive View]
Walkthrough Modal (closing animation)
    ↓ [300ms delay]
Immersive Gallery (opening animation)
    ↓
Immersive Gallery (open, full-screen)
```

---

## 📝 **TEST RESULTS TEMPLATE**

```
Date: [Date]
Tester: [Name]
Browser: [Browser/Version]
Device: [Desktop/Mobile]

Visual:
- Button visible: ✅/❌
- Button styling: ✅/❌
- Icon correct: ✅/❌

Functional:
- Button clickable: ✅/❌
- Walkthrough closes: ✅/❌
- Gallery opens: ✅/❌
- Transition smooth: ✅/❌

Issues Found:
- [List any issues]

Notes:
- [Any observations]
```

---

## 🚀 **QUICK TEST COMMANDS**

```bash
# Check if component is imported
grep -r "onImmersiveView" src/components/

# Check if button is rendered
grep -r "Maximize2" src/components/DeckWalkthroughModal.tsx

# Check for TypeScript errors
npm run type-check

# Check for linter errors
npm run lint
```

---

**Ready to test!** Follow the steps above to verify the Immersive View button works correctly.
