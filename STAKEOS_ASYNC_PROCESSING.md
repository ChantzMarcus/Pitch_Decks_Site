# StakeOS Async Processing Implementation Guide

## Current Situation
- StakeOS analysis takes ~15 minutes to complete
- Current API route calls it synchronously (blocks for 15 minutes)
- Need async processing with proper UX

## Recommended Flow

### Option 1: Background Job (Recommended)
1. **API returns immediately** after saving lead
2. **Trigger background job** for StakeOS processing
3. **Frontend shows processing screen** with option to leave
4. **Poll API** or use webhook when results ready
5. **Email sent** when analysis complete

### Option 2: Webhook/Email Only
1. **API returns immediately** with teaser score
2. **Show processing screen** with "we'll email you" message
3. **StakeOS processes in background**
4. **Email sent** when complete with link to view results

## Implementation Steps

### 1. Update API Route (`/api/questionnaire/route.ts`)
```typescript
// Instead of waiting for StakeOS:
// - Save lead immediately
// - Return teaser score
// - Trigger background job for StakeOS
// - Update lead record when StakeOS completes
```

### 2. Create Background Job Handler
- Use Vercel Cron Jobs or similar
- Or use a queue system (BullMQ, etc.)
- Process StakeOS calls asynchronously
- Update database when complete
- Send email notification

### 3. Frontend Updates (Already Done)
- ✅ AsyncProcessingScreen component created
- ✅ Shows 15-minute estimate
- ✅ Option to leave after 30 seconds
- ✅ Progress indicators
- ✅ Email notification option

### 4. Polling Endpoint (Optional)
Create `/api/questionnaire/[leadId]/status` to check if StakeOS analysis is complete

## Current Frontend Implementation

The frontend now:
1. Shows **AsyncProcessingScreen** during StakeOS processing
2. Displays **15-minute estimate**
3. Shows **progress** (elapsed time)
4. Offers **"I'll Check My Email"** option after 30 seconds
5. Explains **what's happening** (querying database, comparing, etc.)

## Next Steps

1. **Update API route** to return immediately (don't wait for StakeOS)
2. **Set up background job** for StakeOS processing
3. **Add status endpoint** for polling (optional)
4. **Update email template** to include StakeOS results when ready
5. **Test async flow** end-to-end

## User Experience

**Immediate (0-30 seconds):**
- Submission confirmed
- Processing screen appears
- Shows what's happening

**After 30 seconds:**
- Option appears: "Don't want to wait? We'll email you"
- User can leave and check email later

**After 15 minutes:**
- Email sent with full StakeOS analysis
- Link to view results on site
- Complete breakdown available

This provides a smooth UX while StakeOS processes in the background.
