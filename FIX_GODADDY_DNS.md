# 🔧 Fix Your GoDaddy DNS Records

## Current Issue:
Your CNAME record is pointing `www` → `filmdecks.biz` (this creates a loop!)

## What You Need to Change:

### 1. Update the Existing CNAME Record:

**Current (WRONG):**
```
Type: CNAME
Name: www
Data: filmdecks.biz  ❌
TTL: 1 Hour
```

**Change to (CORRECT):**
```
Type: CNAME
Name: www
Data: cname.vercel-dns.com  ✅
TTL: 1 Hour
```

### 2. Add a New A Record:

**Add this NEW record:**
```
Type: A
Name: @ (or leave blank/empty)
Data: 216.198.79.1
TTL: 1 Hour
```

## Step-by-Step in GoDaddy:

### Step 1: Update the CNAME Record

1. Go to GoDaddy → My Products → Domains → `filmdecks.biz` → DNS
2. Find the CNAME record with Name: `www`
3. Click the **pencil/edit icon** next to it
4. Change the **Data/Value** field from `filmdecks.biz` to `cname.vercel-dns.com`
5. Click **Save**

### Step 2: Add the A Record

1. In the same DNS page, click **Add** button
2. Select **Type: A**
3. **Name:** Type `@` or leave it blank/empty
4. **Data/Value:** Type `216.198.79.1`
5. **TTL:** Select `1 Hour` (or 600 seconds)
6. Click **Save**

## What Your DNS Should Look Like:

```
Type    Name    Data/Value              TTL
----    ----    ----------              ---
A       @       216.198.79.1            1 Hour
CNAME   www     cname.vercel-dns.com    1 Hour
```

## After Making Changes:

1. **Wait 15-30 minutes** for DNS propagation
2. Go to Vercel → Settings → Domains
3. Status should change from "Invalid Configuration" to **"Valid Configuration"** ✅
4. SSL certificate will auto-generate
5. Visit `https://filmdecks.biz` - should work!

## Why This Matters:

- **A Record (@)** = Makes `filmdecks.biz` point to Vercel's server
- **CNAME (www)** = Makes `www.filmdecks.biz` point to Vercel's server
- Your current CNAME pointing to `filmdecks.biz` creates a redirect loop

---

**Quick Checklist:**
- [ ] Update CNAME: `www` → `cname.vercel-dns.com`
- [ ] Add A Record: `@` → `216.198.79.1`
- [ ] Wait 15-30 minutes
- [ ] Check Vercel dashboard for "Valid Configuration"
- [ ] Test: Visit `https://filmdecks.biz`

