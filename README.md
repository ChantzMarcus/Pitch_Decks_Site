# Film Pitch Deck Showcase

A professional showcase website for film and TV pitch decks with cinematic quality presentation and lead generation capabilities.

## Overview

This platform presents professionally crafted film and TV pitch decks through an elegant, user-friendly interface optimized for industry professionals, investors, and collaborators.

### Features

- **Cinematic Presentation**: Elegant showcase of pitch deck projects
- **Interactive Gallery**: Filterable and searchable project grid
- **Quick View**: Preview pitch deck slides without leaving gallery
- **Detailed View**: Full-screen lightbox for comprehensive slide viewing
- **Lead Capture**: Form for interested parties to express interest
- **Responsive Design**: Optimized for all device sizes

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (public)/        # Public-facing pages
│   │   ├── page.tsx     # Homepage
│   │   ├── gallery/     # Gallery page
│   │   └── deck/[id]/   # Individual deck pages
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   ├── gallery/         # Gallery-specific components
│   ├── deck/            # Deck viewing components
│   └── forms/           # Form components
├── lib/                 # Utilities and services
│   ├── supabase.ts      # Database client and queries
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Supabase credentials
```

3. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

## Database Setup

Run these SQL commands in your Supabase SQL editor to create the required tables:

```sql
-- Create decks table
CREATE TABLE decks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  logline TEXT,
  genre TEXT[],
  target_audience VARCHAR(255),
  production_status VARCHAR(100),
  cover_image_url TEXT,
  pdf_url TEXT,
  slide_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  comparable_titles TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create slides table
CREATE TABLE slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  slide_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type TEXT[],
  user_type VARCHAR(50) NOT NULL,
  budget_range VARCHAR(20) NOT NULL,
  timeline VARCHAR(20) NOT NULL,
  project_description TEXT NOT NULL,
  lead_score INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'new',
  referral_source VARCHAR(50) DEFAULT 'website',
  deck_id UUID REFERENCES decks(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_decks_created_at ON decks(created_at DESC);
CREATE INDEX idx_decks_genre ON decks USING GIN(genre);
CREATE INDEX idx_slides_deck_id ON slides(deck_id);
CREATE INDEX idx_slides_slide_number ON slides(deck_id, slide_number);
CREATE INDEX idx_leads_deck_id ON leads(deck_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Decks are viewable by everyone" ON decks FOR
  SELECT USING (true);

CREATE POLICY "Anyone can submit leads" ON leads FOR
  INSERT WITH CHECK (true);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed for internal use.
