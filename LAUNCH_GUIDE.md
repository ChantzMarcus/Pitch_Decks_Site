# 🚀 Launch Guide - From Zero to Deployed

Complete guide to get your pitch deck site live.

---

## 📋 Prerequisites Checklist

- [ ] Node.js installed
- [ ] GitHub account
- [ ] Supabase account (free)
- [ ] Vercel account (free)
- [ ] Your 5 pitch decks ready (JPEGs in repo)

---

## 🎯 Step-by-Step Launch

### **Step 1: Create Supabase Project** (5 min)

1. Go to https://supabase.com
2. Click "New Project"
3. Name it: `pitch-deck-showcase`
4. Choose a region close to you
5. Save your password somewhere safe
6. Wait for project to be ready (~2 min)

**Get your credentials:**
- Go to Project Settings → API
- Copy these somewhere:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

### **Step 2: Set Up Database** (5 min)

1. In Supabase, go to **SQL Editor**
2. Copy the contents of `scripts/supabase-schema.sql`
3. Paste and click **Run**

This creates:
- ✅ `decks` table
- ✅ `slides` table
- ✅ `leads` table
- ✅ Indexes for performance
- ✅ Row Level Security

---

### **Step 3: Create Storage Buckets** (3 min)

1. In Supabase, go to **Storage**
2. Create 3 buckets:
   - `deck-covers`
   - `deck-slides`
   - `deck-pdfs`

3. For each bucket:
   - Click **Create bucket**
   - Make it **Public**
   - Go to **Policies** → Add policy: **Public read access**

---

### **Step 4: Configure Environment Variables** (2 min)

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **Never commit `.env.local` to git!**

---

### **Step 5: Edit Your Deck Metadata** (5-10 min)

Open `scripts/deck-metadata.ts` and fill in the real info for each deck:

```typescript
{
  id: 'tcg',
  title: 'TCG', // Or your actual title
  logline: 'A gripping thriller about...', // Real logline
  description: 'Full 2-3 paragraph description...',
  genre: ['Thriller', 'Drama'], // Real genres
  target_audience: 'Adults 25-54...',
  production_status: 'Development',
  comparable_titles: ['Similar Film 1', 'Similar Film 2'],
  source_folder: 'TCG',
}
```

---

### **Step 6: Organize Your Deck Files** (1 min)

Run this to copy/organize your slides into a standard structure:

```bash
npm run organize-decks
```

This creates:
```
public/decks/
├── tcg/
│   ├── cover.jpg
│   ├── slide-01.jpg
│   ├── slide-02.jpg
│   └── ...
├── hear-transplant/
├── navy-divers/
├── crude/
└── the-counterfeit/
```

✅ Check the organized files in `public/decks/` to make sure they look right.

---

### **Step 7: Upload to Supabase** (2-5 min)

```bash
npm run upload-decks
```

This will:
- Upload all images to Supabase Storage
- Create deck records in the database
- Create slide records in the database

You'll see progress like:
```
📤 Uploading: TCG
   Found 20 slides
   ✅ Cover uploaded
   ✅ Uploaded 20 files
   ✅ Database record created
   ✅ 20 slide records created
```

---

### **Step 8: Test Locally** (2 min)

```bash
npm run dev
```

Visit `http://localhost:3000`

You should see:
- ✅ Your hero section
- ✅ Your 5 pitch decks in the grid
- ✅ Click through to individual deck pages
- ✅ Slideshow/lightbox working

---

### **Step 9: Deploy to Vercel** (3 min)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready to launch"
   git push
   ```

2. Go to https://vercel.com
3. Click **"Import Project"**
4. Connect your GitHub repo
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

6. Click **Deploy**

Wait ~2 minutes, and... 🎉 **Your site is live!**

---

## 🎊 After Launch

### **Add Your Domain** (optional)

1. In Vercel, go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records

### **Set Up Email Notifications** (future)

1. Sign up for Resend (free tier)
2. Add API key to `.env.local`
3. Uncomment email code in lead form

### **Monitor Analytics**

1. Vercel has built-in analytics
2. Check Supabase dashboard for leads

---

## 🐛 Troubleshooting

### **"Module not found" error**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Supabase connection error**
- Check your `.env.local` has correct values
- Restart dev server after changing env vars

### **Images not loading**
- Check Supabase Storage buckets are Public
- Check bucket policies allow public read

### **Build fails**
```bash
npm run build
# Read the error and fix
```

---

## 📞 Need Help?

- **Supabase docs**: https://supabase.com/docs
- **Vercel docs**: https://vercel.com/docs
- **Next.js docs**: https://nextjs.org/docs

---

**Ready to launch? Start with Step 1! 🚀**
