-- Neon Database Schema for 848 Washington Media
-- Run this in the Neon SQL Editor to create your tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LEADS TABLE (Questionnaire submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),

  -- Story Details
  timeline VARCHAR(255),
  personal_meaning TEXT[], -- stored as array
  project_for VARCHAR(255),
  format VARCHAR(100),
  materials TEXT[], -- stored as array
  excited_parts TEXT[], -- stored as array
  involvement VARCHAR(255),

  -- Timing & Investment (Key qualification)
  start_timing VARCHAR(100),
  budget VARCHAR(50), -- <$5K, $5-15K, $15-50K, $50K+, unsure
  budget_category VARCHAR(50), -- exploring, specific, serious, full

  -- Story Content
  logline TEXT,
  description TEXT,

  -- Consultation
  want_consult BOOLEAN DEFAULT false,

  -- Scoring (from your AI software)
  overall_score INTEGER, -- 0-100
  originality_score INTEGER,
  emotional_score INTEGER,
  commercial_score INTEGER,
  format_score INTEGER,
  clarity_score INTEGER,

  -- Lead Scoring
  lead_score INTEGER DEFAULT 0, -- 0-100 calculated
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, closed

  -- Tracking
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  referrer VARCHAR(500),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT leads_email_unique UNIQUE (email, created_at)
);

-- Index for common queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_budget ON leads(budget);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- DECKS TABLE (Pitch deck metadata)
-- ============================================
CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Deck Info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logline TEXT,
  description TEXT,
  genre TEXT[], -- stored as array: ['Sci-Fi', 'Thriller']
  target_audience TEXT,
  production_status VARCHAR(100),

  -- Media
  cover_image_url TEXT,
  pdf_url TEXT,
  slide_count INTEGER DEFAULT 0,

  -- Comparable Titles
  comparable_titles TEXT[], -- stored as array

  -- Metrics
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_decks_slug ON decks(slug);
CREATE INDEX idx_decks_featured ON decks(featured) WHERE featured = true;
CREATE INDEX idx_decks_genre ON decks USING GIN(genre);
CREATE INDEX idx_decks_created_at ON decks(created_at DESC);

-- ============================================
-- SLIDES TABLE (Individual slide images)
-- ============================================
CREATE TABLE IF NOT EXISTS slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,

  slide_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(deck_id, slide_number)
);

CREATE INDEX idx_slides_deck_id ON slides(deck_id);
CREATE INDEX idx_slides_number ON slides(deck_id, slide_number);

-- ============================================
-- ANALYTICS EVENTS TABLE (Optional - for tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  session_id VARCHAR(255),
  event_name VARCHAR(255) NOT NULL,
  properties JSONB, -- flexible event properties

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decks_updated_at BEFORE UPDATE ON decks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Increment view count function
CREATE OR REPLACE FUNCTION increment_view_count(deck_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE decks
  SET view_count = view_count + 1,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = deck_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================
-- Insert a sample deck (comment out after testing)
/*
INSERT INTO decks (title, slug, logline, description, genre, production_status, cover_image_url, slide_count, featured) VALUES
  ('Neon Eclipse', 'neon-eclipse', 'In a future where dreams can be harvested, one hacker discovers the truth.', 'A sci-fi thriller set in a dystopian future where memories are currency.', ARRAY['Sci-Fi', 'Thriller', 'Neo-Noir'], 'In Development', '/images/neon-eclipse-cover.jpg', 12, true);
*/
