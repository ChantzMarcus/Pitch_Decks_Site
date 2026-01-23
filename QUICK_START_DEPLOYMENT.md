# Quick Start for Deployment

## Deploy to Vercel in 5 Minutes

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Navigate to Project Directory
```bash
cd /path/to/Pitch_Decks_Site
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Deploy to Vercel
```bash
vercel --prod
```

### Step 5: Set Environment Variables
After deployment, go to your [Vercel dashboard](https://vercel.com/dashboard) and set these environment variables:

**Required:**
- `DATABASE_URL` - Your Neon database URL
- `DIRECT_URL` - Your Neon direct URL  
- `YOUR_AI_SERVICE_API_KEY` - Your AI service API key
- `YOUR_AI_SERVICE_ENDPOINT` - Your AI service endpoint
- `ADMIN_PASSWORD` - Password for admin access

### Step 6: Connect Your AI Service
In `/src/app/api/ai-analysis/route.ts`, replace the `callExternalAIAnalysis` function with your actual AI service call.

---

## That's It! 
Your application will be live at your Vercel URL. Share the `/admin/sales-dashboard` with your sales team!