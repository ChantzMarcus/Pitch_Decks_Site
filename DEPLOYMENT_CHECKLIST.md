# 🚀 Deployment Checklist for filmdecks.biz

## ✅ What's Already Done
- ✅ Next.js app configured
- ✅ Database schema (Neon PostgreSQL)
- ✅ Tailwind CSS configured
- ✅ All components built
- ✅ Branding updated to FilmDecks
- ✅ Routes configured
- ✅ API routes set up

## 🔧 What You Need to Deploy

### 1. **Environment Variables** (Required)

Set these in Vercel Dashboard → Settings → Environment Variables:

#### Database (Neon)
```
DATABASE_URL=postgresql://... (from Neon dashboard)
DIRECT_URL=postgresql://... (from Neon dashboard)
```

#### Email (Resend)
```
RESEND_API_KEY=re_... (from resend.com)
REPLY_TO_EMAIL=hello@filmdecks.biz
LEAD_NOTIFICATION_EMAIL=hello@filmdecks.biz
```

#### Base URL
```
NEXT_PUBLIC_BASE_URL=https://filmdecks.biz
```

#### Supabase (if using for storage)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### AI Analysis (Optional - for questionnaire scoring)
```
OPENAI_API_KEY=sk-... (or your AI provider)
ANTHROPIC_API_KEY=sk-ant-... (or your AI provider)
GROQ_API_KEY=gsk_... (or your AI provider)
```

### 2. **Domain Configuration**

1. **In Vercel:**
   - Go to your project → Settings → Domains
   - Add `filmdecks.biz`
   - Follow DNS instructions

2. **In Your DNS Provider:**
   - Add CNAME record: `filmdecks.biz` → `cname.vercel-dns.com`
   - Or A record as instructed by Vercel

### 3. **Database Setup**

1. **Neon Database:**
   - Ensure your Neon database is running
   - Run migrations: `npm run db:push` (or migrations are auto-run)
   - Verify connection works

2. **Supabase Storage (if using):**
   - Create storage buckets: `deck-covers`, `deck-slides`, `deck-pdfs`
   - Set public access policies
   - Upload your deck images

### 4. **Deploy to Vercel**

#### Option A: Via Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo: `ChantzMarcus/Pitch_Decks_Site`
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add all environment variables (from step 1)
6. Click "Deploy"

#### Option B: Via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 5. **Post-Deployment Checklist**

- [ ] Test homepage: `https://filmdecks.biz`
- [ ] Test questionnaire: `https://filmdecks.biz/questionnaire`
- [ ] Test form submission
- [ ] Verify emails are sending (check Resend dashboard)
- [ ] Test database connection (check Neon dashboard)
- [ ] Verify images load (if using Supabase Storage)
- [ ] Check browser console for errors
- [ ] Test on mobile device

### 6. **Optional: Custom Domain SSL**

Vercel automatically provides SSL certificates for custom domains. Just add the domain and Vercel handles the rest.

## 🐛 Common Issues

### Issue: Styles not loading
**Fix:** Already fixed! Tailwind config updated to scan `src/` directory.

### Issue: Database connection fails
**Fix:** 
- Check `DATABASE_URL` is correct
- Ensure Neon database is active
- Check connection string format

### Issue: Emails not sending
**Fix:**
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for errors
- Verify email addresses are correct

### Issue: Form submissions fail
**Fix:**
- Check API route: `/api/questionnaire/route.ts`
- Verify database connection
- Check browser console for errors

## 📝 Quick Deploy Commands

```bash
# 1. Ensure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy to Vercel
vercel --prod

# 3. Or use Vercel dashboard (easier)
# Just connect your GitHub repo
```

## 🎯 What Happens After Deployment

1. Vercel builds your Next.js app
2. Your site goes live at `filmdecks.biz`
3. All API routes work automatically
4. Database connections use your Neon URL
5. Emails send via Resend
6. Forms submit and save to database

## 💡 Pro Tips

- Use Vercel's preview deployments to test before going live
- Set up Vercel Analytics to track visitors
- Enable Vercel Speed Insights for performance monitoring
- Use Vercel's Edge Functions if you need serverless functions

---

**You're ready to deploy!** 🚀

Just connect your GitHub repo to Vercel, add the environment variables, and you're live!

