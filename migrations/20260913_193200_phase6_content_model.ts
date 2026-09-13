import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_photos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_photos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_volunteer_profiles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__volunteer_profiles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_volunteer_opportunities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__volunteer_opportunities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_volunteer_benefits_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__volunteer_benefits_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_in_kind_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__in_kind_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_featured_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__featured_events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_video_highlights_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__video_highlights_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_campaign_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campaign_stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "impact_stories_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "impact_stories_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_impact_stories_v_version_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_impact_stories_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "gallery_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gallery_photos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_gallery_photos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_category" varchar,
  	"version_image" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gallery_photos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "volunteer_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"image" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_volunteer_profiles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_volunteer_profiles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_image" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__volunteer_profiles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "volunteer_opportunities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_volunteer_opportunities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_volunteer_opportunities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__volunteer_opportunities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "volunteer_benefits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_volunteer_benefits_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_volunteer_benefits_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__volunteer_benefits_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "in_kind_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_in_kind_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_in_kind_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__in_kind_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "featured_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image" varchar,
  	"link" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_featured_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_featured_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_category" varchar,
  	"version_image" varchar,
  	"version_link" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__featured_events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "video_highlights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"thumbnail" varchar,
  	"link" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_video_highlights_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_video_highlights_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_category" varchar,
  	"version_description" varchar,
  	"version_thumbnail" varchar,
  	"version_link" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__video_highlights_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "campaign_stories_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "campaign_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"age" numeric,
  	"tagline" varchar,
  	"headline" varchar,
  	"hero_image" varchar,
  	"why_story_matters_title" varchar,
  	"why_story_matters" varchar,
  	"video_link" varchar,
  	"featured" boolean,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_campaign_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "campaign_stories_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_campaign_stories_v_version_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_age" numeric,
  	"version_tagline" varchar,
  	"version_headline" varchar,
  	"version_hero_image" varchar,
  	"version_why_story_matters_title" varchar,
  	"version_why_story_matters" varchar,
  	"version_video_link" varchar,
  	"version_featured" boolean,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__campaign_stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_campaign_stories_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "foundation_founder_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image" varchar,
  	"button_text" varchar,
  	"button_link" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "apply_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "apply_page_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "donate_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "donate_page_causes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "donate_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "programmes" ADD COLUMN "title" varchar;
  ALTER TABLE "programmes" ADD COLUMN "icon" varchar;
  ALTER TABLE "programmes" ADD COLUMN "hero_image" varchar;
  ALTER TABLE "programmes" ADD COLUMN "why" varchar;
  ALTER TABLE "programmes" ADD COLUMN "approach" varchar;
  ALTER TABLE "programmes" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "programmes" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_icon" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_hero_image" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_why" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_approach" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_cta_title" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_cta_text" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "category" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "summary" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "beneficiaries" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "featured" boolean;
  ALTER TABLE "impact_stories" ADD COLUMN "donation_program" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "date" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "image" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "challenge" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "response" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "impact" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "quote_text" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "quote_author" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "order" numeric;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_category" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_beneficiaries" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_featured" boolean;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_donation_program" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_date" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_challenge" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_response" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_impact" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_quote_text" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_quote_author" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_order" numeric;
  ALTER TABLE "leadership" ADD COLUMN "image" varchar;
  ALTER TABLE "_leadership_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_photos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "volunteer_profiles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "volunteer_opportunities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "volunteer_benefits_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "in_kind_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "featured_events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "video_highlights_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "campaign_stories_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "bank_bank_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "bank_account_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "bank_account_name" varchar;
  ALTER TABLE "foundation" ADD COLUMN "badge" varchar;
  ALTER TABLE "foundation" ADD COLUMN "title" varchar;
  ALTER TABLE "foundation" ADD COLUMN "description" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_badge" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_title" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_name" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_position" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_organization" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_image" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_quote" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_children_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_widows_supported" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_educational_beneficiaries" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_communities_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_years_of_compassion" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_lives_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_outreach_activities" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_countries_represented" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_widows_supported" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_children_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_community_outreach_events" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_lives_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_lives_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_outreach_events" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_communities_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_years_of_service" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "verified_at" timestamp(3) with time zone;
  ALTER TABLE "impact_stories_story" ADD CONSTRAINT "impact_stories_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_texts" ADD CONSTRAINT "impact_stories_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_story" ADD CONSTRAINT "_impact_stories_v_version_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_texts" ADD CONSTRAINT "_impact_stories_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_photos_v" ADD CONSTRAINT "_gallery_photos_v_parent_id_gallery_photos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_photos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_volunteer_profiles_v" ADD CONSTRAINT "_volunteer_profiles_v_parent_id_volunteer_profiles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."volunteer_profiles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_volunteer_opportunities_v" ADD CONSTRAINT "_volunteer_opportunities_v_parent_id_volunteer_opportunities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."volunteer_opportunities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_volunteer_benefits_v" ADD CONSTRAINT "_volunteer_benefits_v_parent_id_volunteer_benefits_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."volunteer_benefits"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_in_kind_categories_v" ADD CONSTRAINT "_in_kind_categories_v_parent_id_in_kind_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."in_kind_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featured_events_v" ADD CONSTRAINT "_featured_events_v_parent_id_featured_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."featured_events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_video_highlights_v" ADD CONSTRAINT "_video_highlights_v_parent_id_video_highlights_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."video_highlights"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_stories_description" ADD CONSTRAINT "campaign_stories_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_stories_texts" ADD CONSTRAINT "campaign_stories_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campaign_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v_version_description" ADD CONSTRAINT "_campaign_stories_v_version_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v" ADD CONSTRAINT "_campaign_stories_v_parent_id_campaign_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campaign_stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v_texts" ADD CONSTRAINT "_campaign_stories_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_campaign_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_founder_message" ADD CONSTRAINT "foundation_founder_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides" ADD CONSTRAINT "homepage_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "apply_page_texts" ADD CONSTRAINT "apply_page_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."apply_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donate_page_stats" ADD CONSTRAINT "donate_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donate_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donate_page_causes" ADD CONSTRAINT "donate_page_causes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donate_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impact_stories_story_order_idx" ON "impact_stories_story" USING btree ("_order");
  CREATE INDEX "impact_stories_story_parent_id_idx" ON "impact_stories_story" USING btree ("_parent_id");
  CREATE INDEX "impact_stories_texts_order_parent" ON "impact_stories_texts" USING btree ("order","parent_id");
  CREATE INDEX "_impact_stories_v_version_story_order_idx" ON "_impact_stories_v_version_story" USING btree ("_order");
  CREATE INDEX "_impact_stories_v_version_story_parent_id_idx" ON "_impact_stories_v_version_story" USING btree ("_parent_id");
  CREATE INDEX "_impact_stories_v_texts_order_parent" ON "_impact_stories_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "gallery_photos_updated_at_idx" ON "gallery_photos" USING btree ("updated_at");
  CREATE INDEX "gallery_photos_created_at_idx" ON "gallery_photos" USING btree ("created_at");
  CREATE INDEX "gallery_photos__status_idx" ON "gallery_photos" USING btree ("_status");
  CREATE INDEX "_gallery_photos_v_parent_idx" ON "_gallery_photos_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_photos_v_version_version_updated_at_idx" ON "_gallery_photos_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_photos_v_version_version_created_at_idx" ON "_gallery_photos_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_photos_v_version_version__status_idx" ON "_gallery_photos_v" USING btree ("version__status");
  CREATE INDEX "_gallery_photos_v_created_at_idx" ON "_gallery_photos_v" USING btree ("created_at");
  CREATE INDEX "_gallery_photos_v_updated_at_idx" ON "_gallery_photos_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_photos_v_latest_idx" ON "_gallery_photos_v" USING btree ("latest");
  CREATE INDEX "volunteer_profiles_updated_at_idx" ON "volunteer_profiles" USING btree ("updated_at");
  CREATE INDEX "volunteer_profiles_created_at_idx" ON "volunteer_profiles" USING btree ("created_at");
  CREATE INDEX "volunteer_profiles__status_idx" ON "volunteer_profiles" USING btree ("_status");
  CREATE INDEX "_volunteer_profiles_v_parent_idx" ON "_volunteer_profiles_v" USING btree ("parent_id");
  CREATE INDEX "_volunteer_profiles_v_version_version_updated_at_idx" ON "_volunteer_profiles_v" USING btree ("version_updated_at");
  CREATE INDEX "_volunteer_profiles_v_version_version_created_at_idx" ON "_volunteer_profiles_v" USING btree ("version_created_at");
  CREATE INDEX "_volunteer_profiles_v_version_version__status_idx" ON "_volunteer_profiles_v" USING btree ("version__status");
  CREATE INDEX "_volunteer_profiles_v_created_at_idx" ON "_volunteer_profiles_v" USING btree ("created_at");
  CREATE INDEX "_volunteer_profiles_v_updated_at_idx" ON "_volunteer_profiles_v" USING btree ("updated_at");
  CREATE INDEX "_volunteer_profiles_v_latest_idx" ON "_volunteer_profiles_v" USING btree ("latest");
  CREATE INDEX "volunteer_opportunities_updated_at_idx" ON "volunteer_opportunities" USING btree ("updated_at");
  CREATE INDEX "volunteer_opportunities_created_at_idx" ON "volunteer_opportunities" USING btree ("created_at");
  CREATE INDEX "volunteer_opportunities__status_idx" ON "volunteer_opportunities" USING btree ("_status");
  CREATE INDEX "_volunteer_opportunities_v_parent_idx" ON "_volunteer_opportunities_v" USING btree ("parent_id");
  CREATE INDEX "_volunteer_opportunities_v_version_version_updated_at_idx" ON "_volunteer_opportunities_v" USING btree ("version_updated_at");
  CREATE INDEX "_volunteer_opportunities_v_version_version_created_at_idx" ON "_volunteer_opportunities_v" USING btree ("version_created_at");
  CREATE INDEX "_volunteer_opportunities_v_version_version__status_idx" ON "_volunteer_opportunities_v" USING btree ("version__status");
  CREATE INDEX "_volunteer_opportunities_v_created_at_idx" ON "_volunteer_opportunities_v" USING btree ("created_at");
  CREATE INDEX "_volunteer_opportunities_v_updated_at_idx" ON "_volunteer_opportunities_v" USING btree ("updated_at");
  CREATE INDEX "_volunteer_opportunities_v_latest_idx" ON "_volunteer_opportunities_v" USING btree ("latest");
  CREATE INDEX "volunteer_benefits_updated_at_idx" ON "volunteer_benefits" USING btree ("updated_at");
  CREATE INDEX "volunteer_benefits_created_at_idx" ON "volunteer_benefits" USING btree ("created_at");
  CREATE INDEX "volunteer_benefits__status_idx" ON "volunteer_benefits" USING btree ("_status");
  CREATE INDEX "_volunteer_benefits_v_parent_idx" ON "_volunteer_benefits_v" USING btree ("parent_id");
  CREATE INDEX "_volunteer_benefits_v_version_version_updated_at_idx" ON "_volunteer_benefits_v" USING btree ("version_updated_at");
  CREATE INDEX "_volunteer_benefits_v_version_version_created_at_idx" ON "_volunteer_benefits_v" USING btree ("version_created_at");
  CREATE INDEX "_volunteer_benefits_v_version_version__status_idx" ON "_volunteer_benefits_v" USING btree ("version__status");
  CREATE INDEX "_volunteer_benefits_v_created_at_idx" ON "_volunteer_benefits_v" USING btree ("created_at");
  CREATE INDEX "_volunteer_benefits_v_updated_at_idx" ON "_volunteer_benefits_v" USING btree ("updated_at");
  CREATE INDEX "_volunteer_benefits_v_latest_idx" ON "_volunteer_benefits_v" USING btree ("latest");
  CREATE INDEX "in_kind_categories_updated_at_idx" ON "in_kind_categories" USING btree ("updated_at");
  CREATE INDEX "in_kind_categories_created_at_idx" ON "in_kind_categories" USING btree ("created_at");
  CREATE INDEX "in_kind_categories__status_idx" ON "in_kind_categories" USING btree ("_status");
  CREATE INDEX "_in_kind_categories_v_parent_idx" ON "_in_kind_categories_v" USING btree ("parent_id");
  CREATE INDEX "_in_kind_categories_v_version_version_updated_at_idx" ON "_in_kind_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_in_kind_categories_v_version_version_created_at_idx" ON "_in_kind_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_in_kind_categories_v_version_version__status_idx" ON "_in_kind_categories_v" USING btree ("version__status");
  CREATE INDEX "_in_kind_categories_v_created_at_idx" ON "_in_kind_categories_v" USING btree ("created_at");
  CREATE INDEX "_in_kind_categories_v_updated_at_idx" ON "_in_kind_categories_v" USING btree ("updated_at");
  CREATE INDEX "_in_kind_categories_v_latest_idx" ON "_in_kind_categories_v" USING btree ("latest");
  CREATE INDEX "featured_events_updated_at_idx" ON "featured_events" USING btree ("updated_at");
  CREATE INDEX "featured_events_created_at_idx" ON "featured_events" USING btree ("created_at");
  CREATE INDEX "featured_events__status_idx" ON "featured_events" USING btree ("_status");
  CREATE INDEX "_featured_events_v_parent_idx" ON "_featured_events_v" USING btree ("parent_id");
  CREATE INDEX "_featured_events_v_version_version_updated_at_idx" ON "_featured_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_featured_events_v_version_version_created_at_idx" ON "_featured_events_v" USING btree ("version_created_at");
  CREATE INDEX "_featured_events_v_version_version__status_idx" ON "_featured_events_v" USING btree ("version__status");
  CREATE INDEX "_featured_events_v_created_at_idx" ON "_featured_events_v" USING btree ("created_at");
  CREATE INDEX "_featured_events_v_updated_at_idx" ON "_featured_events_v" USING btree ("updated_at");
  CREATE INDEX "_featured_events_v_latest_idx" ON "_featured_events_v" USING btree ("latest");
  CREATE INDEX "video_highlights_updated_at_idx" ON "video_highlights" USING btree ("updated_at");
  CREATE INDEX "video_highlights_created_at_idx" ON "video_highlights" USING btree ("created_at");
  CREATE INDEX "video_highlights__status_idx" ON "video_highlights" USING btree ("_status");
  CREATE INDEX "_video_highlights_v_parent_idx" ON "_video_highlights_v" USING btree ("parent_id");
  CREATE INDEX "_video_highlights_v_version_version_updated_at_idx" ON "_video_highlights_v" USING btree ("version_updated_at");
  CREATE INDEX "_video_highlights_v_version_version_created_at_idx" ON "_video_highlights_v" USING btree ("version_created_at");
  CREATE INDEX "_video_highlights_v_version_version__status_idx" ON "_video_highlights_v" USING btree ("version__status");
  CREATE INDEX "_video_highlights_v_created_at_idx" ON "_video_highlights_v" USING btree ("created_at");
  CREATE INDEX "_video_highlights_v_updated_at_idx" ON "_video_highlights_v" USING btree ("updated_at");
  CREATE INDEX "_video_highlights_v_latest_idx" ON "_video_highlights_v" USING btree ("latest");
  CREATE INDEX "campaign_stories_description_order_idx" ON "campaign_stories_description" USING btree ("_order");
  CREATE INDEX "campaign_stories_description_parent_id_idx" ON "campaign_stories_description" USING btree ("_parent_id");
  CREATE INDEX "campaign_stories_updated_at_idx" ON "campaign_stories" USING btree ("updated_at");
  CREATE INDEX "campaign_stories_created_at_idx" ON "campaign_stories" USING btree ("created_at");
  CREATE INDEX "campaign_stories__status_idx" ON "campaign_stories" USING btree ("_status");
  CREATE INDEX "campaign_stories_texts_order_parent" ON "campaign_stories_texts" USING btree ("order","parent_id");
  CREATE INDEX "_campaign_stories_v_version_description_order_idx" ON "_campaign_stories_v_version_description" USING btree ("_order");
  CREATE INDEX "_campaign_stories_v_version_description_parent_id_idx" ON "_campaign_stories_v_version_description" USING btree ("_parent_id");
  CREATE INDEX "_campaign_stories_v_parent_idx" ON "_campaign_stories_v" USING btree ("parent_id");
  CREATE INDEX "_campaign_stories_v_version_version_updated_at_idx" ON "_campaign_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_campaign_stories_v_version_version_created_at_idx" ON "_campaign_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_campaign_stories_v_version_version__status_idx" ON "_campaign_stories_v" USING btree ("version__status");
  CREATE INDEX "_campaign_stories_v_created_at_idx" ON "_campaign_stories_v" USING btree ("created_at");
  CREATE INDEX "_campaign_stories_v_updated_at_idx" ON "_campaign_stories_v" USING btree ("updated_at");
  CREATE INDEX "_campaign_stories_v_latest_idx" ON "_campaign_stories_v" USING btree ("latest");
  CREATE INDEX "_campaign_stories_v_texts_order_parent" ON "_campaign_stories_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "foundation_founder_message_order_idx" ON "foundation_founder_message" USING btree ("_order");
  CREATE INDEX "foundation_founder_message_parent_id_idx" ON "foundation_founder_message" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_slides_order_idx" ON "homepage_hero_slides" USING btree ("_order");
  CREATE INDEX "homepage_hero_slides_parent_id_idx" ON "homepage_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "apply_page_texts_order_parent" ON "apply_page_texts" USING btree ("order","parent_id");
  CREATE INDEX "donate_page_stats_order_idx" ON "donate_page_stats" USING btree ("_order");
  CREATE INDEX "donate_page_stats_parent_id_idx" ON "donate_page_stats" USING btree ("_parent_id");
  CREATE INDEX "donate_page_causes_order_idx" ON "donate_page_causes" USING btree ("_order");
  CREATE INDEX "donate_page_causes_parent_id_idx" ON "donate_page_causes" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk" FOREIGN KEY ("gallery_photos_id") REFERENCES "public"."gallery_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_profiles_fk" FOREIGN KEY ("volunteer_profiles_id") REFERENCES "public"."volunteer_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_opportunities_fk" FOREIGN KEY ("volunteer_opportunities_id") REFERENCES "public"."volunteer_opportunities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_benefits_fk" FOREIGN KEY ("volunteer_benefits_id") REFERENCES "public"."volunteer_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_in_kind_categories_fk" FOREIGN KEY ("in_kind_categories_id") REFERENCES "public"."in_kind_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_featured_events_fk" FOREIGN KEY ("featured_events_id") REFERENCES "public"."featured_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_video_highlights_fk" FOREIGN KEY ("video_highlights_id") REFERENCES "public"."video_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaign_stories_fk" FOREIGN KEY ("campaign_stories_id") REFERENCES "public"."campaign_stories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_photos_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_opportunities_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_opportunities_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_benefits_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_benefits_id");
  CREATE INDEX "payload_locked_documents_rels_in_kind_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("in_kind_categories_id");
  CREATE INDEX "payload_locked_documents_rels_featured_events_id_idx" ON "payload_locked_documents_rels" USING btree ("featured_events_id");
  CREATE INDEX "payload_locked_documents_rels_video_highlights_id_idx" ON "payload_locked_documents_rels" USING btree ("video_highlights_id");
  CREATE INDEX "payload_locked_documents_rels_campaign_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("campaign_stories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_stories_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_impact_stories_v_version_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_impact_stories_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_photos_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "volunteer_profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_volunteer_profiles_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "volunteer_opportunities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_volunteer_opportunities_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "volunteer_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_volunteer_benefits_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "in_kind_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_in_kind_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_featured_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_video_highlights_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_stories_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_stories_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_stories_v_version_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_stories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_stories_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_founder_message" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "apply_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "apply_page_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donate_page_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donate_page_causes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donate_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "impact_stories_story" CASCADE;
  DROP TABLE "impact_stories_texts" CASCADE;
  DROP TABLE "_impact_stories_v_version_story" CASCADE;
  DROP TABLE "_impact_stories_v_texts" CASCADE;
  DROP TABLE "gallery_photos" CASCADE;
  DROP TABLE "_gallery_photos_v" CASCADE;
  DROP TABLE "volunteer_profiles" CASCADE;
  DROP TABLE "_volunteer_profiles_v" CASCADE;
  DROP TABLE "volunteer_opportunities" CASCADE;
  DROP TABLE "_volunteer_opportunities_v" CASCADE;
  DROP TABLE "volunteer_benefits" CASCADE;
  DROP TABLE "_volunteer_benefits_v" CASCADE;
  DROP TABLE "in_kind_categories" CASCADE;
  DROP TABLE "_in_kind_categories_v" CASCADE;
  DROP TABLE "featured_events" CASCADE;
  DROP TABLE "_featured_events_v" CASCADE;
  DROP TABLE "video_highlights" CASCADE;
  DROP TABLE "_video_highlights_v" CASCADE;
  DROP TABLE "campaign_stories_description" CASCADE;
  DROP TABLE "campaign_stories" CASCADE;
  DROP TABLE "campaign_stories_texts" CASCADE;
  DROP TABLE "_campaign_stories_v_version_description" CASCADE;
  DROP TABLE "_campaign_stories_v" CASCADE;
  DROP TABLE "_campaign_stories_v_texts" CASCADE;
  DROP TABLE "foundation_founder_message" CASCADE;
  DROP TABLE "homepage_hero_slides" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "apply_page" CASCADE;
  DROP TABLE "apply_page_texts" CASCADE;
  DROP TABLE "donate_page_stats" CASCADE;
  DROP TABLE "donate_page_causes" CASCADE;
  DROP TABLE "donate_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_photos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_volunteer_profiles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_volunteer_opportunities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_volunteer_benefits_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_in_kind_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_featured_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_video_highlights_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_campaign_stories_fk";
  
  DROP INDEX "payload_locked_documents_rels_gallery_photos_id_idx";
  DROP INDEX "payload_locked_documents_rels_volunteer_profiles_id_idx";
  DROP INDEX "payload_locked_documents_rels_volunteer_opportunities_id_idx";
  DROP INDEX "payload_locked_documents_rels_volunteer_benefits_id_idx";
  DROP INDEX "payload_locked_documents_rels_in_kind_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_featured_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_video_highlights_id_idx";
  DROP INDEX "payload_locked_documents_rels_campaign_stories_id_idx";
  ALTER TABLE "programmes" DROP COLUMN "title";
  ALTER TABLE "programmes" DROP COLUMN "icon";
  ALTER TABLE "programmes" DROP COLUMN "hero_image";
  ALTER TABLE "programmes" DROP COLUMN "why";
  ALTER TABLE "programmes" DROP COLUMN "approach";
  ALTER TABLE "programmes" DROP COLUMN "cta_title";
  ALTER TABLE "programmes" DROP COLUMN "cta_text";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_title";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_icon";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_hero_image";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_why";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_approach";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_cta_title";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_cta_text";
  ALTER TABLE "impact_stories" DROP COLUMN "category";
  ALTER TABLE "impact_stories" DROP COLUMN "summary";
  ALTER TABLE "impact_stories" DROP COLUMN "beneficiaries";
  ALTER TABLE "impact_stories" DROP COLUMN "featured";
  ALTER TABLE "impact_stories" DROP COLUMN "donation_program";
  ALTER TABLE "impact_stories" DROP COLUMN "date";
  ALTER TABLE "impact_stories" DROP COLUMN "image";
  ALTER TABLE "impact_stories" DROP COLUMN "challenge";
  ALTER TABLE "impact_stories" DROP COLUMN "response";
  ALTER TABLE "impact_stories" DROP COLUMN "impact";
  ALTER TABLE "impact_stories" DROP COLUMN "quote_text";
  ALTER TABLE "impact_stories" DROP COLUMN "quote_author";
  ALTER TABLE "impact_stories" DROP COLUMN "order";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_category";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_summary";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_beneficiaries";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_featured";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_donation_program";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_date";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_image";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_challenge";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_response";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_impact";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_quote_text";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_quote_author";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_order";
  ALTER TABLE "leadership" DROP COLUMN "image";
  ALTER TABLE "_leadership_v" DROP COLUMN "version_image";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_photos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "volunteer_profiles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "volunteer_opportunities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "volunteer_benefits_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "in_kind_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "featured_events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "video_highlights_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "campaign_stories_id";
  ALTER TABLE "site_settings" DROP COLUMN "bank_bank_name";
  ALTER TABLE "site_settings" DROP COLUMN "bank_account_number";
  ALTER TABLE "site_settings" DROP COLUMN "bank_account_name";
  ALTER TABLE "foundation" DROP COLUMN "badge";
  ALTER TABLE "foundation" DROP COLUMN "title";
  ALTER TABLE "foundation" DROP COLUMN "description";
  ALTER TABLE "foundation" DROP COLUMN "founder_badge";
  ALTER TABLE "foundation" DROP COLUMN "founder_title";
  ALTER TABLE "foundation" DROP COLUMN "founder_name";
  ALTER TABLE "foundation" DROP COLUMN "founder_position";
  ALTER TABLE "foundation" DROP COLUMN "founder_organization";
  ALTER TABLE "foundation" DROP COLUMN "founder_image";
  ALTER TABLE "foundation" DROP COLUMN "founder_quote";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_children_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_widows_supported";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_educational_beneficiaries";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_communities_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_years_of_compassion";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_lives_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_outreach_activities";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_countries_represented";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_widows_supported";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_children_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_community_outreach_events";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_lives_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_lives_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_outreach_events";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_communities_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_years_of_service";
  ALTER TABLE "statistics_manual" DROP COLUMN "source";
  ALTER TABLE "statistics_manual" DROP COLUMN "verified_at";
  DROP TYPE "public"."enum_gallery_photos_status";
  DROP TYPE "public"."enum__gallery_photos_v_version_status";
  DROP TYPE "public"."enum_volunteer_profiles_status";
  DROP TYPE "public"."enum__volunteer_profiles_v_version_status";
  DROP TYPE "public"."enum_volunteer_opportunities_status";
  DROP TYPE "public"."enum__volunteer_opportunities_v_version_status";
  DROP TYPE "public"."enum_volunteer_benefits_status";
  DROP TYPE "public"."enum__volunteer_benefits_v_version_status";
  DROP TYPE "public"."enum_in_kind_categories_status";
  DROP TYPE "public"."enum__in_kind_categories_v_version_status";
  DROP TYPE "public"."enum_featured_events_status";
  DROP TYPE "public"."enum__featured_events_v_version_status";
  DROP TYPE "public"."enum_video_highlights_status";
  DROP TYPE "public"."enum__video_highlights_v_version_status";
  DROP TYPE "public"."enum_campaign_stories_status";
  DROP TYPE "public"."enum__campaign_stories_v_version_status";`)
}
