-- scripts/supabase-schema.sql
-- Run this in your Supabase SQL Editor
-- Creates the database schema for the Pitch Deck Showcase website

-- ============================================
-- DECKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS decks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  logline TEXT NOT NULL,
  description TEXT,
  genre TEXT[] DEFAULT '{}',
  target_audience TEXT,
  production_status TEXT CHECK (production_status IN ('Development', 'Pre-Production', 'Production', 'Completed')),
  cover_image_url TEXT,
  pdf_url TEXT,
  slide_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  comparable_titles TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SLIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS slides (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  slide_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id TEXT REFERENCES decks(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT[] DEFAULT '{}',
  user_type TEXT CHECK (user_type IN ('Producer', 'Investor', 'Studio Executive', 'Agent', 'Other')),
  budget_range TEXT CHECK (budget_range IN ('<$1M', '$1M-$5M', '$5M-$20M', '$20M+')),
  timeline TEXT CHECK (timeline IN ('Immediate', '3-6 months', '6-12 months', 'Exploring')),
  project_description TEXT,
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Closed', 'Lost')),
  referral_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_decks_created_at ON decks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_decks_genre ON decks USING GIN(genre);
CREATE INDEX IF NOT EXISTS idx_slides_deck_id ON slides(deck_id);
CREATE INDEX IF NOT EXISTS idx_slides_deck_number ON slides(deck_id, slide_number);
CREATE INDEX IF NOT EXISTS idx_leads_deck_id ON leads(deck_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public can read all decks
CREATE POLICY "Decks are viewable by everyone"
ON decks FOR SELECT
USING (true);

-- Public can read slides for decks
CREATE POLICY "Slides are viewable by everyone"
ON slides FOR SELECT
USING (true);

-- Anyone can submit leads
CREATE POLICY "Anyone can create leads"
ON leads FOR INSERT
WITH CHECK (true);

-- Only authenticated users can update/delete (optional, for future admin)
-- CREATE POLICY "Only authenticated users can update decks"
-- ON decks FOR UPDATE
-- USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKETS (run in Supabase Storage section, not SQL)
-- ============================================
-- Create these buckets in Supabase Storage:
-- 1. deck-covers - for cover images
-- 2. deck-slides - for slide images
-- 3. deck-pdfs - for full PDF downloads

-- Make them public for read access

-- ============================================
-- HELPER FUNCTION FOR LEAD SCORING
-- ============================================
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := 0;

  -- Budget score
  IF NEW.budget_range IN ('$5M-$20M', '$20M+') THEN
    NEW.lead_score := NEW.lead_score + 30;
  END IF;

  -- Timeline score
  IF NEW.timeline = 'Immediate' THEN
    NEW.lead_score := NEW.lead_score + 25;
  ELSIF NEW.timeline = '3-6 months' THEN
    NEW.lead_score := NEW.lead_score + 15;
  END IF;

  -- User type score
  IF NEW.user_type IN ('Producer', 'Studio Executive', 'Investor') THEN
    NEW.lead_score := NEW.lead_score + 20;
  END IF;

  -- Multiple projects interest
  IF array_length(NEW.project_type, 1) > 1 THEN
    NEW.lead_score := NEW.lead_score + 15;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_lead_score
BEFORE INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION calculate_lead_score();

-- ============================================
-- UPDATED AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decks_updated_at
BEFORE UPDATE ON decks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SAMPLE DATA (optional - remove in production)
-- ============================================
-- Uncomment to insert sample data:

-- INSERT INTO decks (id, title, logline, description, genre, target_audience, production_status, slide_count, comparable_titles) VALUES
-- ('tcg', 'TCG', 'A gripping drama about...', 'Full description here...', ARRAY['Drama', 'Thriller'], 'Adults 25-54', 'Development', 20, ARRAY['Film A', 'Film B']),
-- ('hear-transplant', 'Hear Transplant', 'A medical drama...', 'Full description here...', ARRAY['Drama', 'Medical'], 'Adults 18-49', 'Development', 24, ARRAY['Film A', 'Film B']);
