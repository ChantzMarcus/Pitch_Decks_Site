# 🔧 GoDaddy DNS Setup for filmdecks.biz

## Step 1: Add Domain to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. **Remove** `pitchdecks.biz` (if you don't need it)
3. **Add** `filmdecks.biz`
4. **Add** `www.filmdecks.biz`

## Step 2: Configure DNS at GoDaddy

### Go to GoDaddy DNS Management:

1. Log into GoDaddy
2. Go to **My Products** → **Domains**
3. Click on `filmdecks.biz`
4. Click **DNS** or **Manage DNS**

### Add These Records:

#### For Root Domain (filmdecks.biz):

**A Record:**
```
Type: A
Name: @
Value: 216.198.79.1
TTL: 600 seconds (or 1 hour)
```

#### For www Subdomain (www.filmdecks.biz):

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 seconds (or 1 hour)
```

### Step-by-Step in GoDaddy:

1. In DNS Management, scroll to **Records** section
2. Click **Add** button
3. For A record:
   - Type: Select **A**
   - Name: Type `@` or leave blank
   - Value: Type `216.198.79.1`
   - TTL: Select `600 seconds` or `1 hour`
   - Click **Save**
4. For CNAME record:
   - Click **Add** again
   - Type: Select **CNAME**
   - Name: Type `www`
   - Value: Type `cname.vercel-dns.com`
   - TTL: Select `600 seconds` or `1 hour`
   - Click **Save**

### Remove Conflicting Records:

- If there are any existing A or CNAME records for `@` or `www`, delete them first
- Keep any MX records (for email) if you have them
- Keep any TXT records (for verification) if you have them

## Step 3: Wait for DNS Propagation

- Usually takes 15-30 minutes
- Can take up to 48 hours (rare)
- Check status: https://dnschecker.org/#A/filmdecks.biz

## Step 4: Verify in Vercel

After DNS propagates:
1. Go back to Vercel → Settings → Domains
2. Status should change from "Invalid Configuration" to **"Valid Configuration"** ✅
3. SSL certificate will auto-generate (usually instant)

## Step 5: Test Your Site

Once DNS is valid:
- Visit: `https://filmdecks.biz`
- Visit: `https://www.filmdecks.biz`
- Both should load your site!

## Troubleshooting:

**Still showing "Invalid Configuration"?**
- Double-check DNS records match exactly
- Make sure you saved the records in GoDaddy
- Wait at least 30 minutes
- Check https://dnschecker.org to see if DNS has propagated globally

**Site loads but shows "Not Secure"?**
- SSL auto-generates after DNS validates
- Wait a few minutes after DNS shows valid
- Check Vercel dashboard for SSL status

**www subdomain not working?**
- Make sure CNAME record is added correctly
- Value should be exactly: `cname.vercel-dns.com`
- Wait for DNS propagation

---

**Your code already references `filmdecks.biz` correctly!** ✅
Just need to:
1. Add domain to Vercel
2. Configure DNS at GoDaddy
3. Wait for propagation

