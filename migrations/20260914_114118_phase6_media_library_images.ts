import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE TABLE "campaign_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_campaign_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "programmes" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "impact_stories" ADD COLUMN "image_id" integer;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "leadership" ADD COLUMN "image_id" integer;
  ALTER TABLE "_leadership_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_video" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_image_text" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_video" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "gallery_photos" ADD COLUMN "image_id" integer;
  ALTER TABLE "_gallery_photos_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "volunteer_profiles" ADD COLUMN "image_id" integer;
  ALTER TABLE "_volunteer_profiles_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "featured_events" ADD COLUMN "image_id" integer;
  ALTER TABLE "_featured_events_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "video_highlights" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "_video_highlights_v" ADD COLUMN "version_thumbnail_id" integer;
  ALTER TABLE "campaign_stories" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "_campaign_stories_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "foundation" ADD COLUMN "founder_image_id" integer;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_stories_rels" ADD CONSTRAINT "campaign_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campaign_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_stories_rels" ADD CONSTRAINT "campaign_stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v_rels" ADD CONSTRAINT "_campaign_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_campaign_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v_rels" ADD CONSTRAINT "_campaign_stories_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impact_stories_rels_order_idx" ON "impact_stories_rels" USING btree ("order");
  CREATE INDEX "impact_stories_rels_parent_idx" ON "impact_stories_rels" USING btree ("parent_id");
  CREATE INDEX "impact_stories_rels_path_idx" ON "impact_stories_rels" USING btree ("path");
  CREATE INDEX "impact_stories_rels_media_id_idx" ON "impact_stories_rels" USING btree ("media_id");
  CREATE INDEX "_impact_stories_v_rels_order_idx" ON "_impact_stories_v_rels" USING btree ("order");
  CREATE INDEX "_impact_stories_v_rels_parent_idx" ON "_impact_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_impact_stories_v_rels_path_idx" ON "_impact_stories_v_rels" USING btree ("path");
  CREATE INDEX "_impact_stories_v_rels_media_id_idx" ON "_impact_stories_v_rels" USING btree ("media_id");
  CREATE INDEX "campaign_stories_rels_order_idx" ON "campaign_stories_rels" USING btree ("order");
  CREATE INDEX "campaign_stories_rels_parent_idx" ON "campaign_stories_rels" USING btree ("parent_id");
  CREATE INDEX "campaign_stories_rels_path_idx" ON "campaign_stories_rels" USING btree ("path");
  CREATE INDEX "campaign_stories_rels_media_id_idx" ON "campaign_stories_rels" USING btree ("media_id");
  CREATE INDEX "_campaign_stories_v_rels_order_idx" ON "_campaign_stories_v_rels" USING btree ("order");
  CREATE INDEX "_campaign_stories_v_rels_parent_idx" ON "_campaign_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_campaign_stories_v_rels_path_idx" ON "_campaign_stories_v_rels" USING btree ("path");
  CREATE INDEX "_campaign_stories_v_rels_media_id_idx" ON "_campaign_stories_v_rels" USING btree ("media_id");
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leadership" ADD CONSTRAINT "leadership_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leadership_v" ADD CONSTRAINT "_leadership_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_slides" ADD CONSTRAINT "pages_blocks_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_photos_v" ADD CONSTRAINT "_gallery_photos_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "volunteer_profiles" ADD CONSTRAINT "volunteer_profiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_volunteer_profiles_v" ADD CONSTRAINT "_volunteer_profiles_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_events" ADD CONSTRAINT "featured_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featured_events_v" ADD CONSTRAINT "_featured_events_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "video_highlights" ADD CONSTRAINT "video_highlights_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_video_highlights_v" ADD CONSTRAINT "_video_highlights_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_stories" ADD CONSTRAINT "campaign_stories_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v" ADD CONSTRAINT "_campaign_stories_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_founder_image_id_media_id_fk" FOREIGN KEY ("founder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "programmes_hero_image_idx" ON "programmes" USING btree ("hero_image_id");
  CREATE INDEX "_programmes_v_version_version_hero_image_idx" ON "_programmes_v" USING btree ("version_hero_image_id");
  CREATE INDEX "impact_stories_image_idx" ON "impact_stories" USING btree ("image_id");
  CREATE INDEX "_impact_stories_v_version_version_image_idx" ON "_impact_stories_v" USING btree ("version_image_id");
  CREATE INDEX "leadership_image_idx" ON "leadership" USING btree ("image_id");
  CREATE INDEX "_leadership_v_version_version_image_idx" ON "_leadership_v" USING btree ("version_image_id");
  CREATE INDEX "pages_blocks_hero_slides_image_idx" ON "pages_blocks_hero_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_video_thumbnail_idx" ON "pages_blocks_video" USING btree ("thumbnail_id");
  CREATE INDEX "_pages_v_blocks_hero_slides_image_idx" ON "_pages_v_blocks_hero_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_video_thumbnail_idx" ON "_pages_v_blocks_video" USING btree ("thumbnail_id");
  CREATE INDEX "gallery_photos_image_idx" ON "gallery_photos" USING btree ("image_id");
  CREATE INDEX "_gallery_photos_v_version_version_image_idx" ON "_gallery_photos_v" USING btree ("version_image_id");
  CREATE INDEX "volunteer_profiles_image_idx" ON "volunteer_profiles" USING btree ("image_id");
  CREATE INDEX "_volunteer_profiles_v_version_version_image_idx" ON "_volunteer_profiles_v" USING btree ("version_image_id");
  CREATE INDEX "featured_events_image_idx" ON "featured_events" USING btree ("image_id");
  CREATE INDEX "_featured_events_v_version_version_image_idx" ON "_featured_events_v" USING btree ("version_image_id");
  CREATE INDEX "video_highlights_thumbnail_idx" ON "video_highlights" USING btree ("thumbnail_id");
  CREATE INDEX "_video_highlights_v_version_version_thumbnail_idx" ON "_video_highlights_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "campaign_stories_hero_image_idx" ON "campaign_stories" USING btree ("hero_image_id");
  CREATE INDEX "_campaign_stories_v_version_version_hero_image_idx" ON "_campaign_stories_v" USING btree ("version_hero_image_id");
  CREATE INDEX "foundation_founder_founder_image_idx" ON "foundation" USING btree ("founder_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_impact_stories_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_stories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_stories_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "impact_stories_rels" CASCADE;
  DROP TABLE "_impact_stories_v_rels" CASCADE;
  DROP TABLE "campaign_stories_rels" CASCADE;
  DROP TABLE "_campaign_stories_v_rels" CASCADE;
  ALTER TABLE "programmes" DROP CONSTRAINT "programmes_hero_image_id_media_id_fk";
  
  ALTER TABLE "_programmes_v" DROP CONSTRAINT "_programmes_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "impact_stories" DROP CONSTRAINT "impact_stories_image_id_media_id_fk";
  
  ALTER TABLE "_impact_stories_v" DROP CONSTRAINT "_impact_stories_v_version_image_id_media_id_fk";
  
  ALTER TABLE "leadership" DROP CONSTRAINT "leadership_image_id_media_id_fk";
  
  ALTER TABLE "_leadership_v" DROP CONSTRAINT "_leadership_v_version_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero_slides" DROP CONSTRAINT "pages_blocks_hero_slides_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_image_text" DROP CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_video" DROP CONSTRAINT "pages_blocks_video_thumbnail_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP CONSTRAINT "_pages_v_blocks_hero_slides_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_image_text" DROP CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_video" DROP CONSTRAINT "_pages_v_blocks_video_thumbnail_id_media_id_fk";
  
  ALTER TABLE "gallery_photos" DROP CONSTRAINT "gallery_photos_image_id_media_id_fk";
  
  ALTER TABLE "_gallery_photos_v" DROP CONSTRAINT "_gallery_photos_v_version_image_id_media_id_fk";
  
  ALTER TABLE "volunteer_profiles" DROP CONSTRAINT "volunteer_profiles_image_id_media_id_fk";
  
  ALTER TABLE "_volunteer_profiles_v" DROP CONSTRAINT "_volunteer_profiles_v_version_image_id_media_id_fk";
  
  ALTER TABLE "featured_events" DROP CONSTRAINT "featured_events_image_id_media_id_fk";
  
  ALTER TABLE "_featured_events_v" DROP CONSTRAINT "_featured_events_v_version_image_id_media_id_fk";
  
  ALTER TABLE "video_highlights" DROP CONSTRAINT "video_highlights_thumbnail_id_media_id_fk";
  
  ALTER TABLE "_video_highlights_v" DROP CONSTRAINT "_video_highlights_v_version_thumbnail_id_media_id_fk";
  
  ALTER TABLE "campaign_stories" DROP CONSTRAINT "campaign_stories_hero_image_id_media_id_fk";
  
  ALTER TABLE "_campaign_stories_v" DROP CONSTRAINT "_campaign_stories_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "foundation" DROP CONSTRAINT "foundation_founder_image_id_media_id_fk";
  
  DROP INDEX "programmes_hero_image_idx";
  DROP INDEX "_programmes_v_version_version_hero_image_idx";
  DROP INDEX "impact_stories_image_idx";
  DROP INDEX "_impact_stories_v_version_version_image_idx";
  DROP INDEX "leadership_image_idx";
  DROP INDEX "_leadership_v_version_version_image_idx";
  DROP INDEX "pages_blocks_hero_slides_image_idx";
  DROP INDEX "pages_blocks_image_text_image_idx";
  DROP INDEX "pages_blocks_video_thumbnail_idx";
  DROP INDEX "_pages_v_blocks_hero_slides_image_idx";
  DROP INDEX "_pages_v_blocks_image_text_image_idx";
  DROP INDEX "_pages_v_blocks_video_thumbnail_idx";
  DROP INDEX "gallery_photos_image_idx";
  DROP INDEX "_gallery_photos_v_version_version_image_idx";
  DROP INDEX "volunteer_profiles_image_idx";
  DROP INDEX "_volunteer_profiles_v_version_version_image_idx";
  DROP INDEX "featured_events_image_idx";
  DROP INDEX "_featured_events_v_version_version_image_idx";
  DROP INDEX "video_highlights_thumbnail_idx";
  DROP INDEX "_video_highlights_v_version_version_thumbnail_idx";
  DROP INDEX "campaign_stories_hero_image_idx";
  DROP INDEX "_campaign_stories_v_version_version_hero_image_idx";
  DROP INDEX "foundation_founder_founder_image_idx";
  ALTER TABLE "programmes" DROP COLUMN "hero_image_id";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "impact_stories" DROP COLUMN "image_id";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_image_id";
  ALTER TABLE "leadership" DROP COLUMN "image_id";
  ALTER TABLE "_leadership_v" DROP COLUMN "version_image_id";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_video" DROP COLUMN "thumbnail_id";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_image_text" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_video" DROP COLUMN "thumbnail_id";
  ALTER TABLE "gallery_photos" DROP COLUMN "image_id";
  ALTER TABLE "_gallery_photos_v" DROP COLUMN "version_image_id";
  ALTER TABLE "volunteer_profiles" DROP COLUMN "image_id";
  ALTER TABLE "_volunteer_profiles_v" DROP COLUMN "version_image_id";
  ALTER TABLE "featured_events" DROP COLUMN "image_id";
  ALTER TABLE "_featured_events_v" DROP COLUMN "version_image_id";
  ALTER TABLE "video_highlights" DROP COLUMN "thumbnail_id";
  ALTER TABLE "_video_highlights_v" DROP COLUMN "version_thumbnail_id";
  ALTER TABLE "campaign_stories" DROP COLUMN "hero_image_id";
  ALTER TABLE "_campaign_stories_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "foundation" DROP COLUMN "founder_image_id";`)
}
