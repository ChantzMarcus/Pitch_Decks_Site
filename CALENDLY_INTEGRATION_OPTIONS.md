# Calendly Integration Options

## Current Setup
- **Calendly Link**: `https://cal.com/screenwriterhannah/pitch-deck-consultation`
- **Current Usage**: Direct links in `DualCTA` and `LeadLanding` components

## Integration Options

### Option 1: Direct Link (Current - Recommended ✅)
**What it is**: Simple `<a>` tag that opens Calendly in a new tab

**Pros:**
- ✅ Simplest to implement
- ✅ No additional dependencies
- ✅ Works everywhere
- ✅ Easy to update link if needed
- ✅ Calendly handles all booking logic

**Cons:**
- ❌ Opens in new tab (slight friction)
- ❌ Less integrated feel

**Where it's used:**
- ✅ `DualCTA.tsx` - "Book Strategy Call" button
- ✅ `LeadLanding.tsx` - Footer CTA
- ✅ `BlurredAnalysisPreview.tsx` - "Book Free Consultation" button
- ✅ `EvaluationResult.tsx` - 72-hour expert follow-up section
- ✅ `QuestionnairePageContent.tsx` - Email preview section

**Implementation:**
```tsx
<a
  href="https://cal.com/screenwriterhannah/pitch-deck-consultation"
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Book Consultation
</a>
```

---

### Option 2: Embedded Calendly Widget
**What it is**: Embed Calendly directly in a modal or page section

**Pros:**
- ✅ More integrated feel
- ✅ Stays on your site
- ✅ Better mobile experience
- ✅ Can customize styling

**Cons:**
- ❌ Requires Calendly embed script
- ❌ Adds page weight
- ❌ More complex implementation
- ❌ May need to handle popup/modal state

**Implementation:**
```tsx
// Install: npm install react-calendly
import { PopupButton } from 'react-calendly';

<PopupButton
  url="https://cal.com/screenwriterhannah/pitch-deck-consultation"
  rootElement={document.getElementById('__next')}
  text="Book Consultation"
  className="..."
/>
```

**Where to use:**
- Modal that opens when clicking "Book Consultation"
- Dedicated `/book-consultation` page
- Inline widget on success page

---

### Option 3: Conditional Display
**What it is**: Show Calendly link only after certain conditions

**Options:**
- **A) Show immediately** (current approach)
  - User can book anytime
  - Good for high-intent users

- **B) Show after 72 hours**
  - Wait for expert review first
  - More personalized approach
  - Requires tracking submission time

- **C) Show in email only**
  - Expert includes link when reaching out
  - Most personalized
  - Less immediate conversion

**Implementation (Option B):**
```tsx
const hoursSinceSubmission = (Date.now() - submissionTime) / (1000 * 60 * 60);

{hoursSinceSubmission >= 72 && (
  <a href="https://cal.com/..." className="...">
    Book Consultation
  </a>
)}
```

---

## Recommendation: **Option 1 (Direct Link) + Strategic Placement**

### Why?
1. **Lower Friction** - Users can book immediately if ready
2. **Simpler** - No extra dependencies or complexity
3. **Flexible** - Expert can still reach out first if preferred
4. **Proven** - Direct links convert well (22-32% higher than forms)

### Strategic Placement:
1. ✅ **Success Page** - After submission (immediate option)
2. ✅ **72-Hour Section** - "Or book a consultation call now" (soft CTA)
3. ✅ **Email** - Include link when expert reaches out (personalized)
4. ✅ **Blurred Analysis Preview** - "Book Free Consultation" button (upsell)

### Current Implementation:
- ✅ All consultation CTAs now use direct Calendly link
- ✅ Multiple touchpoints throughout the flow
- ✅ Clear messaging: "Expert will reach out within 72 hours" + "Or book now"

---

## Next Steps (Optional Enhancements)

### 1. Add Calendly to Email Templates
Update email templates to include Calendly link when expert reaches out:
```tsx
// In sendAnalysisReport or expert follow-up email
<a href="https://cal.com/screenwriterhannah/pitch-deck-consultation">
  Schedule Your Consultation Call
</a>
```

### 2. Track Calendly Conversions
Add UTM parameters to track which page/section drives bookings:
```tsx
href="https://cal.com/screenwriterhannah/pitch-deck-consultation?utm_source=questionnaire&utm_medium=success_page"
```

### 3. A/B Test Embedded Widget
Test embedded widget vs direct link to see which converts better:
- Direct link: Current implementation
- Embedded: Modal popup with Calendly widget

### 4. Conditional Messaging
Show different CTAs based on score:
- High score (80+): "Book consultation to discuss next steps"
- Medium score (60-79): "Book consultation to improve your story"
- Lower score (<60): "Book consultation to get expert guidance"

---

## Environment Variable (Optional)
If you want to make the Calendly link configurable:

```env
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/screenwriterhannah/pitch-deck-consultation
```

Then use:
```tsx
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://cal.com/screenwriterhannah/pitch-deck-consultation';
```
