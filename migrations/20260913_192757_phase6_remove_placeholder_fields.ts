import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // Edited by hand: the generator drops tables with CASCADE (which removes
  // the foreign keys pointing at them) and then drops those same keys by
  // name, which fails. IF EXISTS makes the key drops safe either way.
  await db.execute(sql`
   ALTER TABLE "programmes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "impact_stories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_impact_stories_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_albums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_albums_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_albums_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_albums_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "statistics_manual_figures" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "_programmes_v_rels" CASCADE;
  DROP TABLE "impact_stories_rels" CASCADE;
  DROP TABLE "_impact_stories_v_rels" CASCADE;
  DROP TABLE "gallery_albums" CASCADE;
  DROP TABLE "gallery_albums_rels" CASCADE;
  DROP TABLE "_gallery_albums_v" CASCADE;
  DROP TABLE "_gallery_albums_v_rels" CASCADE;
  DROP TABLE "statistics_manual_figures" CASCADE;
  ALTER TABLE "programmes" DROP CONSTRAINT IF EXISTS "programmes_hero_image_id_media_id_fk";
  
  ALTER TABLE "_programmes_v" DROP CONSTRAINT IF EXISTS "_programmes_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "impact_stories" DROP CONSTRAINT IF EXISTS "impact_stories_featured_image_id_media_id_fk";
  
  ALTER TABLE "impact_stories" DROP CONSTRAINT IF EXISTS "impact_stories_programme_id_programmes_id_fk";
  
  ALTER TABLE "_impact_stories_v" DROP CONSTRAINT IF EXISTS "_impact_stories_v_version_featured_image_id_media_id_fk";
  
  ALTER TABLE "_impact_stories_v" DROP CONSTRAINT IF EXISTS "_impact_stories_v_version_programme_id_programmes_id_fk";
  
  ALTER TABLE "leadership" DROP CONSTRAINT IF EXISTS "leadership_photo_id_media_id_fk";
  
  ALTER TABLE "_leadership_v" DROP CONSTRAINT IF EXISTS "_leadership_v_version_photo_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gallery_albums_fk";
  
  DROP INDEX "programmes_hero_image_idx";
  DROP INDEX "_programmes_v_version_version_hero_image_idx";
  DROP INDEX "impact_stories_featured_image_idx";
  DROP INDEX "impact_stories_programme_idx";
  DROP INDEX "_impact_stories_v_version_version_featured_image_idx";
  DROP INDEX "_impact_stories_v_version_version_programme_idx";
  DROP INDEX "leadership_photo_idx";
  DROP INDEX "_leadership_v_version_version_photo_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_albums_id_idx";
  ALTER TABLE "programmes" DROP COLUMN "name";
  ALTER TABLE "programmes" DROP COLUMN "body";
  ALTER TABLE "programmes" DROP COLUMN "hero_image_id";
  ALTER TABLE "programmes" DROP COLUMN "featured";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_name";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_body";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_featured";
  ALTER TABLE "impact_stories" DROP COLUMN "body";
  ALTER TABLE "impact_stories" DROP COLUMN "featured_image_id";
  ALTER TABLE "impact_stories" DROP COLUMN "programme_id";
  ALTER TABLE "impact_stories" DROP COLUMN "date";
  ALTER TABLE "impact_stories" DROP COLUMN "beneficiaries_reached";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_body";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_featured_image_id";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_programme_id";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_date";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_beneficiaries_reached";
  ALTER TABLE "leadership" DROP COLUMN "photo_id";
  ALTER TABLE "_leadership_v" DROP COLUMN "version_photo_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_albums_id";
  ALTER TABLE "foundation" DROP COLUMN "founder_story";
  ALTER TABLE "foundation" DROP COLUMN "history";
  DROP TYPE "public"."enum_gallery_albums_status";
  DROP TYPE "public"."enum__gallery_albums_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_albums_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_albums_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_programmes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "impact_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_impact_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "gallery_albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"cover_id" integer,
  	"programme_id" integer,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gallery_albums_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "gallery_albums_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_gallery_albums_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_cover_id" integer,
  	"version_programme_id" integer,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gallery_albums_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_gallery_albums_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "statistics_manual_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"verified_at" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "programmes" ADD COLUMN "name" varchar;
  ALTER TABLE "programmes" ADD COLUMN "body" jsonb;
  ALTER TABLE "programmes" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "programmes" ADD COLUMN "featured" boolean;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_body" jsonb;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_featured" boolean;
  ALTER TABLE "impact_stories" ADD COLUMN "body" jsonb;
  ALTER TABLE "impact_stories" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "impact_stories" ADD COLUMN "programme_id" integer;
  ALTER TABLE "impact_stories" ADD COLUMN "date" timestamp(3) with time zone;
  ALTER TABLE "impact_stories" ADD COLUMN "beneficiaries_reached" numeric;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_body" jsonb;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_featured_image_id" integer;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_programme_id" integer;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_date" timestamp(3) with time zone;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_beneficiaries_reached" numeric;
  ALTER TABLE "leadership" ADD COLUMN "photo_id" integer;
  ALTER TABLE "_leadership_v" ADD COLUMN "version_photo_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_albums_id" integer;
  ALTER TABLE "foundation" ADD COLUMN "founder_story" jsonb;
  ALTER TABLE "foundation" ADD COLUMN "history" jsonb;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_albums_rels" ADD CONSTRAINT "gallery_albums_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_albums_rels" ADD CONSTRAINT "gallery_albums_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_parent_id_gallery_albums_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_version_programme_id_programmes_id_fk" FOREIGN KEY ("version_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v_rels" ADD CONSTRAINT "_gallery_albums_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_gallery_albums_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v_rels" ADD CONSTRAINT "_gallery_albums_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statistics_manual_figures" ADD CONSTRAINT "statistics_manual_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statistics_manual"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_media_id_idx" ON "programmes_rels" USING btree ("media_id");
  CREATE INDEX "_programmes_v_rels_order_idx" ON "_programmes_v_rels" USING btree ("order");
  CREATE INDEX "_programmes_v_rels_parent_idx" ON "_programmes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_rels_path_idx" ON "_programmes_v_rels" USING btree ("path");
  CREATE INDEX "_programmes_v_rels_media_id_idx" ON "_programmes_v_rels" USING btree ("media_id");
  CREATE INDEX "impact_stories_rels_order_idx" ON "impact_stories_rels" USING btree ("order");
  CREATE INDEX "impact_stories_rels_parent_idx" ON "impact_stories_rels" USING btree ("parent_id");
  CREATE INDEX "impact_stories_rels_path_idx" ON "impact_stories_rels" USING btree ("path");
  CREATE INDEX "impact_stories_rels_media_id_idx" ON "impact_stories_rels" USING btree ("media_id");
  CREATE INDEX "_impact_stories_v_rels_order_idx" ON "_impact_stories_v_rels" USING btree ("order");
  CREATE INDEX "_impact_stories_v_rels_parent_idx" ON "_impact_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_impact_stories_v_rels_path_idx" ON "_impact_stories_v_rels" USING btree ("path");
  CREATE INDEX "_impact_stories_v_rels_media_id_idx" ON "_impact_stories_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "gallery_albums_slug_idx" ON "gallery_albums" USING btree ("slug");
  CREATE INDEX "gallery_albums_cover_idx" ON "gallery_albums" USING btree ("cover_id");
  CREATE INDEX "gallery_albums_programme_idx" ON "gallery_albums" USING btree ("programme_id");
  CREATE INDEX "gallery_albums_updated_at_idx" ON "gallery_albums" USING btree ("updated_at");
  CREATE INDEX "gallery_albums_created_at_idx" ON "gallery_albums" USING btree ("created_at");
  CREATE INDEX "gallery_albums__status_idx" ON "gallery_albums" USING btree ("_status");
  CREATE INDEX "gallery_albums_rels_order_idx" ON "gallery_albums_rels" USING btree ("order");
  CREATE INDEX "gallery_albums_rels_parent_idx" ON "gallery_albums_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_albums_rels_path_idx" ON "gallery_albums_rels" USING btree ("path");
  CREATE INDEX "gallery_albums_rels_media_id_idx" ON "gallery_albums_rels" USING btree ("media_id");
  CREATE INDEX "_gallery_albums_v_parent_idx" ON "_gallery_albums_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_albums_v_version_version_slug_idx" ON "_gallery_albums_v" USING btree ("version_slug");
  CREATE INDEX "_gallery_albums_v_version_version_cover_idx" ON "_gallery_albums_v" USING btree ("version_cover_id");
  CREATE INDEX "_gallery_albums_v_version_version_programme_idx" ON "_gallery_albums_v" USING btree ("version_programme_id");
  CREATE INDEX "_gallery_albums_v_version_version_updated_at_idx" ON "_gallery_albums_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_albums_v_version_version_created_at_idx" ON "_gallery_albums_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_albums_v_version_version__status_idx" ON "_gallery_albums_v" USING btree ("version__status");
  CREATE INDEX "_gallery_albums_v_created_at_idx" ON "_gallery_albums_v" USING btree ("created_at");
  CREATE INDEX "_gallery_albums_v_updated_at_idx" ON "_gallery_albums_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_albums_v_latest_idx" ON "_gallery_albums_v" USING btree ("latest");
  CREATE INDEX "_gallery_albums_v_rels_order_idx" ON "_gallery_albums_v_rels" USING btree ("order");
  CREATE INDEX "_gallery_albums_v_rels_parent_idx" ON "_gallery_albums_v_rels" USING btree ("parent_id");
  CREATE INDEX "_gallery_albums_v_rels_path_idx" ON "_gallery_albums_v_rels" USING btree ("path");
  CREATE INDEX "_gallery_albums_v_rels_media_id_idx" ON "_gallery_albums_v_rels" USING btree ("media_id");
  CREATE INDEX "statistics_manual_figures_order_idx" ON "statistics_manual_figures" USING btree ("_order");
  CREATE INDEX "statistics_manual_figures_parent_id_idx" ON "statistics_manual_figures" USING btree ("_parent_id");
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_programme_id_programmes_id_fk" FOREIGN KEY ("version_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leadership" ADD CONSTRAINT "leadership_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leadership_v" ADD CONSTRAINT "_leadership_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_albums_fk" FOREIGN KEY ("gallery_albums_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "programmes_hero_image_idx" ON "programmes" USING btree ("hero_image_id");
  CREATE INDEX "_programmes_v_version_version_hero_image_idx" ON "_programmes_v" USING btree ("version_hero_image_id");
  CREATE INDEX "impact_stories_featured_image_idx" ON "impact_stories" USING btree ("featured_image_id");
  CREATE INDEX "impact_stories_programme_idx" ON "impact_stories" USING btree ("programme_id");
  CREATE INDEX "_impact_stories_v_version_version_featured_image_idx" ON "_impact_stories_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_impact_stories_v_version_version_programme_idx" ON "_impact_stories_v" USING btree ("version_programme_id");
  CREATE INDEX "leadership_photo_idx" ON "leadership" USING btree ("photo_id");
  CREATE INDEX "_leadership_v_version_version_photo_idx" ON "_leadership_v" USING btree ("version_photo_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_albums_id");`)
}
