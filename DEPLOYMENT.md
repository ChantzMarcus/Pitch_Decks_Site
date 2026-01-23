# Deployment Guide

This document provides instructions for deploying the Film Pitch Deck Showcase application.

## Prerequisites

- Node.js 18+ installed
- Vercel account ([signup](https://vercel.com/signup))
- Neon account ([signup](https://neon.tech/signup))
- Your AI analysis service credentials

## Environment Variables

Before deployment, you need to set up the following environment variables:

### Required Variables
- `DATABASE_URL` - Your Neon database connection string
- `DIRECT_URL` - Your Neon direct connection string
- `YOUR_AI_SERVICE_API_KEY` - API key for your AI analysis service
- `YOUR_AI_SERVICE_ENDPOINT` - URL for your AI analysis service
- `ADMIN_PASSWORD` - Password for admin dashboard access

### Optional Variables
- `NEXT_PUBLIC_BASE_URL` - Your deployed application URL
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (if using Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key (if using Supabase)

## Database Setup

1. Create a new project in [Neon](https://console.neon.tech/)
2. Create a new database in your Neon project
3. Copy the connection string and direct URL for use in environment variables
4. The schema will be automatically applied during deployment

## Deployment Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file with your environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 4. Deploy to Vercel
```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### 5. Configure Environment Variables in Vercel
After deployment, set your environment variables in the Vercel dashboard:
1. Go to your project in the [Vercel dashboard](https://vercel.com/dashboard)
2. Navigate to Settings → Environment Variables
3. Add all required environment variables

## Post-Deployment Steps

### 1. Verify Database Connection
- Check that the application can connect to your Neon database
- Verify that data is being stored correctly

### 2. Test AI Integration
- Submit a test questionnaire
- Verify that AI analysis is working and scores are stored
- Check that results appear in the sales dashboard

### 3. Test Sales Dashboard
- Access the admin dashboard at `/admin/sales-dashboard`
- Verify that prospects appear with AI analysis results
- Test all dashboard functionality

## Troubleshooting

### Common Issues

#### Database Connection Errors
- Verify that your `DATABASE_URL` and `DIRECT_URL` are correct
- Check that your Neon database is active
- Ensure your database connection pool settings are appropriate

#### AI Service Errors
- Verify that your AI service credentials are correct
- Check that your AI service endpoint is accessible
- Ensure your AI service returns data in the expected format

#### Admin Dashboard Access
- Verify that your `ADMIN_PASSWORD` is set correctly
- Check that basic authentication is working
- Ensure middleware is properly protecting admin routes

### Debugging Tips

#### Check Application Logs
- View logs in the Vercel dashboard
- Look for error messages related to database connections
- Check for AI service integration errors

#### Database Verification
- Use Neon's SQL editor to verify data is being stored
- Check that all required tables exist
- Verify that AI analysis fields are being populated

## Environment-Specific Notes

### Development
- Use `http://localhost:3000` as your base URL
- Database can be local or Neon
- AI service can be mocked for testing

### Production
- Use your Vercel deployment URL as the base URL
- Use Neon for database
- Connect to your actual AI service

## Rollback Procedure

If you need to rollback to a previous version:
1. Go to your project in the Vercel dashboard
2. Navigate to Deployments
3. Click "Rollback" on the deployment you want to revert to

## Support

For support issues:
- Check the application logs in Vercel
- Verify all environment variables are set correctly
- Ensure your database and AI service are accessible
- Contact the development team if issues persist