CREATE TABLE IF NOT EXISTS "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" varchar(255),
	"event_name" varchar(255) NOT NULL,
	"properties" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "decks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"logline" text,
	"description" text,
	"genre" text[],
	"target_audience" text,
	"production_status" varchar(100),
	"cover_image_url" text,
	"pdf_url" text,
	"slide_count" integer DEFAULT 0,
	"comparable_titles" text[],
	"view_count" integer DEFAULT 0,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "decks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"timeline" varchar(255),
	"personal_meaning" text[],
	"project_for" varchar(255),
	"format" varchar(100),
	"materials" text[],
	"excited_parts" text[],
	"involvement" varchar(255),
	"start_timing" varchar(100),
	"budget" varchar(50),
	"budget_category" varchar(50),
	"logline" text,
	"description" text,
	"want_consult" boolean DEFAULT false,
	"overall_score" integer,
	"originality_score" integer,
	"emotional_score" integer,
	"commercial_score" integer,
	"format_score" integer,
	"clarity_score" integer,
	"lead_score" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'new',
	"utm_source" varchar(255),
	"utm_medium" varchar(255),
	"utm_campaign" varchar(255),
	"referrer" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" uuid NOT NULL,
	"slide_number" integer NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "slides" ADD CONSTRAINT "slides_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
