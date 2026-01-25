import { pgTable, text, integer, boolean, timestamp, uuid, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

// Leads table - questionnaire submissions
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  // Contact Info
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),

  // Story Details
  timeline: varchar('timeline', { length: 255 }),
  personalMeaning: text('personal_meaning').array(),
  projectFor: varchar('project_for', { length: 255 }),
  format: varchar('format', { length: 100 }),
  materials: text('materials').array(),
  excitedParts: text('excited_parts').array(),
  involvement: varchar('involvement', { length: 255 }),

  // Timing & Investment
  startTiming: varchar('start_timing', { length: 100 }),
  budget: varchar('budget', { length: 50 }),
  budgetCategory: varchar('budget_category', { length: 50 }),

  // Story Content
  logline: text('logline'),
  description: text('description'),

  // Consultation
  wantConsult: boolean('want_consult').default(false),

  // Scoring (from AI software)
  overallScore: integer('overall_score'),
  originalityScore: integer('originality_score'),
  emotionalScore: integer('emotional_score'),
  commercialScore: integer('commercial_score'),
  formatScore: integer('format_score'),
  clarityScore: integer('clarity_score'),

  // Lead Scoring
  leadScore: integer('lead_score').default(0),
  status: varchar('status', { length: 50 }).default('new'),

  // Tracking
  utmSource: varchar('utm_source', { length: 255 }),
  utmMedium: varchar('utm_medium', { length: 255 }),
  utmCampaign: varchar('utm_campaign', { length: 255 }),
  referrer: text('referrer'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Decks table - pitch deck metadata
export const decks = pgTable('decks', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Deck Info
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  logline: text('logline'),
  description: text('description'),
  genre: text('genre').array(),
  targetAudience: text('target_audience'),
  productionStatus: varchar('production_status', { length: 100 }),

  // Media
  coverImageUrl: text('cover_image_url'),
  pdfUrl: text('pdf_url'),
  slideCount: integer('slide_count').default(0),

  // Comparable Titles
  comparableTitles: text('comparable_titles').array(),

  // Metrics
  viewCount: integer('view_count').default(0),
  featured: boolean('featured').default(false),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Slides table - individual slide images
export const slides = pgTable('slides', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').notNull().references(() => decks.id, { onDelete: 'cascade' }),

  slideNumber: integer('slide_number').notNull(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),

  createdAt: timestamp('created_at').defaultNow(),
});

// Analytics events table
export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),

  sessionId: varchar('session_id', { length: 255 }),
  eventName: varchar('event_name', { length: 255 }).notNull(),
  properties: text('properties'),

  createdAt: timestamp('created_at').defaultNow(),
});

// Types for use in the app
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type DrizzleDeck = typeof decks.$inferSelect;
export type DrizzleSlide = typeof slides.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

// Deck type with snake_case for component compatibility (matches Supabase type)
export type Deck = {
  id: string;
  title: string;
  slug: string;
  description: string;
  logline: string;
  genre: string[];
  target_audience: string;
  production_status: string;
  cover_image_url: string;
  pdf_url: string;
  slide_count: number;
  view_count: number;
  comparable_titles: string[];
  created_at: string;
  updated_at: string;
};

// Slide type with snake_case
export type Slide = {
  id: string;
  deck_id: string;
  slide_number: number;
  image_url: string;
  caption: string | null;
  created_at: string;
};

// Helper to convert Drizzle Deck (camelCase) to component Deck (snake_case)
export function toDeck(drizzleDeck: DrizzleDeck): Deck {
  return {
    id: drizzleDeck.id,
    title: drizzleDeck.title,
    slug: drizzleDeck.slug,
    description: drizzleDeck.description ?? '',
    logline: drizzleDeck.logline ?? '',
    genre: drizzleDeck.genre ?? [],
    target_audience: drizzleDeck.targetAudience ?? '',
    production_status: drizzleDeck.productionStatus ?? '',
    cover_image_url: drizzleDeck.coverImageUrl ?? '',
    pdf_url: drizzleDeck.pdfUrl ?? '',
    slide_count: drizzleDeck.slideCount ?? 0,
    view_count: drizzleDeck.viewCount ?? 0,
    comparable_titles: drizzleDeck.comparableTitles ?? [],
    created_at: String(drizzleDeck.createdAt),
    updated_at: String(drizzleDeck.updatedAt),
  };
}

export function toSlide(drizzleSlide: DrizzleSlide): Slide {
  return {
    id: drizzleSlide.id,
    deck_id: drizzleSlide.deckId,
    slide_number: drizzleSlide.slideNumber,
    image_url: drizzleSlide.imageUrl,
    caption: drizzleSlide.caption,
    created_at: String(drizzleSlide.createdAt),
  };
}
