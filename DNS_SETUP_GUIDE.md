# 🔧 DNS Setup Guide for pitchdecks.biz

## Current Status
- ✅ Domain added to Vercel: `pitchdecks.biz`
- ❌ DNS not configured (showing "Invalid Configuration")
- ❌ Domain mismatch: Code uses `filmdecks.biz` but domain is `pitchdecks.biz`

## Step 1: Fix Domain Mismatch

You have two options:

### Option A: Use pitchdecks.biz (Recommended - Already in Vercel)
Update all code references from `filmdecks.biz` to `pitchdecks.biz`

### Option B: Switch to filmdecks.biz
Remove `pitchdecks.biz` from Vercel and add `filmdecks.biz` instead

**I recommend Option A** since you already have `pitchdecks.biz` set up.

## Step 2: Configure DNS Records

Go to your DNS provider (where you bought `pitchdecks.biz`) and add these records:

### For Root Domain (pitchdecks.biz):

**Option 1: A Record (Easiest)**
```
Type: A
Name: @ (or leave blank, or use "pitchdecks.biz")
Value: 216.198.79.1
TTL: 3600 (or Auto)
```

**Option 2: CNAME (Alternative)**
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600
```

### For www Subdomain (www.pitchdecks.biz):

**Option 1: CNAME Record**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Option 2: Use Vercel DNS (Recommended)**
1. In Vercel → Settings → Domains → `www.pitchdecks.biz`
2. Click "Use Vercel DNS"
3. Update your domain's nameservers at your registrar to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

## Step 3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually takes 15-30 minutes
- Check status: https://dnschecker.org/#A/pitchdecks.biz

## Step 4: Verify in Vercel

After DNS propagates:
1. Go back to Vercel → Settings → Domains
2. Status should change from "Invalid Configuration" to "Valid Configuration"
3. SSL certificate will auto-generate (usually instant)

## Common DNS Providers:

### Namecheap
1. Go to Domain List → Manage → Advanced DNS
2. Add A record: Host `@`, Value `216.198.79.1`
3. Add CNAME: Host `www`, Value `cname.vercel-dns.com`

### GoDaddy
1. Go to DNS Management
2. Add A record: Type `A`, Name `@`, Value `216.198.79.1`
3. Add CNAME: Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`

### Cloudflare
1. Go to DNS → Records
2. Add A record: Name `@`, IPv4 `216.198.79.1`, Proxy off
3. Add CNAME: Name `www`, Target `cname.vercel-dns.com`, Proxy off

### Google Domains
1. Go to DNS → Custom records
2. Add A record: Name `@`, IPv4 `216.198.79.1`
3. Add CNAME: Name `www`, Domain name `cname.vercel-dns.com`

## Quick Checklist:

- [ ] Decide: Use `pitchdecks.biz` or `filmdecks.biz`
- [ ] Update code if switching domains
- [ ] Add A record for root domain (`@` → `216.198.79.1`)
- [ ] Add CNAME for www (`www` → `cname.vercel-dns.com`)
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Check Vercel dashboard - should show "Valid Configuration"
- [ ] Test: Visit `https://pitchdecks.biz` (should load your site)

## Troubleshooting:

**Still showing "Invalid Configuration" after 30 minutes?**
- Double-check DNS records match exactly
- Use https://dnschecker.org to verify propagation globally
- Make sure no conflicting records exist

**Site loads but shows "Not Secure"?**
- SSL certificate auto-generates after DNS is valid
- Wait a few minutes after DNS validates
- Check Vercel dashboard for SSL status

**www subdomain not working?**
- Make sure CNAME record is added
- Or switch to Vercel DNS nameservers

---

**Need help?** Tell me:
1. Which DNS provider you're using
2. Which domain you want to use (`pitchdecks.biz` or `filmdecks.biz`)
3. Any errors you're seeing

