import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq, desc, sql } from 'drizzle-orm';
import * as schema from './schema';
import type { Deck, Slide, Lead, NewLead } from './schema';

// Re-export types for convenience
export type { Deck, Slide, Lead, NewLead, DrizzleDeck, DrizzleSlide } from './schema';

// Create Neon serverless driver
// This connects directly to Neon without needing a server
// Lazy initialization to avoid issues during build time
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    const sqlClient = neon(process.env.DATABASE_URL);
    _db = drizzle(sqlClient as any, { schema });
  }
  return _db;
}

export const db = new Proxy({} as any, {
  get(_target, prop) {
    const dbInstance = getDb();
    if (!dbInstance) {
      throw new Error('Database not initialized. Please set DATABASE_URL environment variable.');
    }
    return dbInstance[prop as keyof typeof dbInstance];
  },
});

// Helper functions for common queries

// Leads
export async function createLead(lead: Omit<schema.NewLead, 'id' | 'createdAt' | 'updatedAt'>) {
  const [newLead] = await db.insert(schema.leads)
    .values(lead)
    .returning();

  return newLead;
}

export async function getLeadByEmail(email: string) {
  const leads = await db.select()
    .from(schema.leads)
    .where(eq(schema.leads.email, email))
    .orderBy(desc(schema.leads.createdAt))
    .limit(1);

  return leads[0] || null;
}

export async function getLeads(options?: { status?: string; limit?: number }) {
  let query = db.select().from(schema.leads);

  if (options?.status) {
    query = query.where(eq(schema.leads.status, options.status)) as typeof query;
  }

  if (options?.limit) {
    query = query.limit(options.limit) as typeof query;
  }

  return await query.orderBy(desc(schema.leads.createdAt));
}

// Decks
export async function getAllDecks(): Promise<Deck[]> {
  const drizzleDecks = await db.select().from(schema.decks).orderBy(desc(schema.decks.createdAt));
  return drizzleDecks.map(schema.toDeck);
}

export async function getDeckBySlug(slug: string): Promise<Deck | null> {
  const decks = await db.select()
    .from(schema.decks)
    .where(eq(schema.decks.slug, slug))
    .limit(1);

  return decks[0] ? schema.toDeck(decks[0]) : null;
}

export async function getDeckWithSlides(id: string) {
  const decks = await db.select()
    .from(schema.decks)
    .where(eq(schema.decks.id, id))
    .limit(1);

  const deck = decks[0];
  if (!deck) return null;

  const slides = await db.select()
    .from(schema.slides)
    .where(eq(schema.slides.deckId, id))
    .orderBy(schema.slides.slideNumber);

  return { ...schema.toDeck(deck), slides: slides.map(schema.toSlide) };
}

export async function incrementViewCount(deckId: string) {
  await db.update(schema.decks)
    .set({ viewCount: sql`${schema.decks.viewCount} + 1` })
    .where(eq(schema.decks.id, deckId));
}

// Analytics
export async function trackEvent(eventName: string, properties: Record<string, any>) {
  await db.insert(schema.analyticsEvents).values({
    sessionId: crypto.randomUUID(),
    eventName,
    properties: JSON.stringify(properties),
  });
}
