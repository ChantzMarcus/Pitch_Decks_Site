# Neon Setup Guide

## Step 1: Create Neon Account (2 minutes)

1. Go to https://neon.tech
2. Click "Sign In" → Continue with GitHub (easiest)
3. Authorize with your GitHub account
4. You'll be redirected to the Neon dashboard

## Step 2: Create a Project (1 minute)

1. Click "Create a project"
2. Project name: `848-washington-media` (or your preference)
3. Region: Choose closest to your users (US East, EU West, etc.)
4. PostgreSQL version: 16
5. Click "Create project"

## Step 3: Create Database (30 seconds)

Your project is created with a default database named `neondb`.

1. Click "SQL Editor" in the left sidebar
2. Copy the entire contents of `prisma/schema.sql` from this repo
3. Paste it into the SQL Editor
4. Click "Run" (or press Cmd/Ctrl+Enter)
5. You should see: "Success. No rows were returned" (tables created)

## Step 4: Get Connection String (30 seconds)

1. In your Neon project, click "Connection Details"
2. Find "Connection string" (looks like `postgresql://user:pass@ep-xyz.aws.neon.tech/dbname...`)
3. Copy it (click "Copy" button)

## Step 5: Add to Environment Variables

Create a file named `.env.local` in your project root:

```bash
# Database
DATABASE_URL=your_neon_connection_string_here

# Cloudinary (add later if needed)
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=

# Resend (add later if needed)
# RESEND_API_KEY=
```

## Step 6: Install Drizzle ORM

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

## What This Gives You

✅ Free tier: 3GB storage, 100 hours compute/month
✅ Fast: Edge-ready, ~100ms cold starts
✅ Scalable: Pay only for what you use
✅ Developer-friendly: Great dashboard, branching, CLI

---

Need help? Let me know!
