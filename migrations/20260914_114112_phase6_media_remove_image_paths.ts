import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_impact_stories_v_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "impact_stories_texts" CASCADE;
  DROP TABLE "_impact_stories_v_texts" CASCADE;
  ALTER TABLE "media" ADD COLUMN "alt_approved" boolean DEFAULT false;
  ALTER TABLE "media" ADD COLUMN "source_hash" varchar;
  CREATE UNIQUE INDEX "media_source_hash_idx" ON "media" USING btree ("source_hash");
  ALTER TABLE "programmes" DROP COLUMN "hero_image";
  ALTER TABLE "_programmes_v" DROP COLUMN "version_hero_image";
  ALTER TABLE "impact_stories" DROP COLUMN "image";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_image";
  ALTER TABLE "leadership" DROP COLUMN "image";
  ALTER TABLE "_leadership_v" DROP COLUMN "version_image";
  ALTER TABLE "pages_blocks_hero_slides" DROP COLUMN "image";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "image";
  ALTER TABLE "pages_blocks_image_text" DROP COLUMN "image_alt";
  ALTER TABLE "pages_blocks_video" DROP COLUMN "thumbnail";
  ALTER TABLE "pages_blocks_video" DROP COLUMN "thumbnail_alt";
  ALTER TABLE "_pages_v_blocks_hero_slides" DROP COLUMN "image";
  ALTER TABLE "_pages_v_blocks_image_text" DROP COLUMN "image";
  ALTER TABLE "_pages_v_blocks_image_text" DROP COLUMN "image_alt";
  ALTER TABLE "_pages_v_blocks_video" DROP COLUMN "thumbnail";
  ALTER TABLE "_pages_v_blocks_video" DROP COLUMN "thumbnail_alt";
  ALTER TABLE "gallery_photos" DROP COLUMN "image";
  ALTER TABLE "_gallery_photos_v" DROP COLUMN "version_image";
  ALTER TABLE "volunteer_profiles" DROP COLUMN "image";
  ALTER TABLE "_volunteer_profiles_v" DROP COLUMN "version_image";
  ALTER TABLE "featured_events" DROP COLUMN "image";
  ALTER TABLE "_featured_events_v" DROP COLUMN "version_image";
  ALTER TABLE "video_highlights" DROP COLUMN "thumbnail";
  ALTER TABLE "_video_highlights_v" DROP COLUMN "version_thumbnail";
  ALTER TABLE "campaign_stories" DROP COLUMN "hero_image";
  ALTER TABLE "_campaign_stories_v" DROP COLUMN "version_hero_image";
  ALTER TABLE "foundation" DROP COLUMN "founder_image";
  -- Hand edit: a campaign's gallery was a list of image paths, kept in the
  -- same table as its list of needs. The gallery becomes library images, so
  -- its old rows would be left behind unread; they are removed, and the
  -- needs are untouched.
  DELETE FROM "campaign_stories_texts" WHERE "path" = 'gallery';
  DELETE FROM "_campaign_stories_v_texts" WHERE "path" = 'version.gallery';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "impact_stories_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_impact_stories_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  DROP INDEX "media_source_hash_idx";
  ALTER TABLE "programmes" ADD COLUMN "hero_image" varchar;
  ALTER TABLE "_programmes_v" ADD COLUMN "version_hero_image" varchar;
  ALTER TABLE "impact_stories" ADD COLUMN "image" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "leadership" ADD COLUMN "image" varchar;
  ALTER TABLE "_leadership_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "pages_blocks_hero_slides" ADD COLUMN "image" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "image" varchar;
  ALTER TABLE "pages_blocks_image_text" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "pages_blocks_video" ADD COLUMN "thumbnail" varchar;
  ALTER TABLE "pages_blocks_video" ADD COLUMN "thumbnail_alt" varchar;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD COLUMN "image" varchar;
  ALTER TABLE "_pages_v_blocks_image_text" ADD COLUMN "image" varchar;
  ALTER TABLE "_pages_v_blocks_image_text" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_video" ADD COLUMN "thumbnail" varchar;
  ALTER TABLE "_pages_v_blocks_video" ADD COLUMN "thumbnail_alt" varchar;
  ALTER TABLE "gallery_photos" ADD COLUMN "image" varchar;
  ALTER TABLE "_gallery_photos_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "volunteer_profiles" ADD COLUMN "image" varchar;
  ALTER TABLE "_volunteer_profiles_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "featured_events" ADD COLUMN "image" varchar;
  ALTER TABLE "_featured_events_v" ADD COLUMN "version_image" varchar;
  ALTER TABLE "video_highlights" ADD COLUMN "thumbnail" varchar;
  ALTER TABLE "_video_highlights_v" ADD COLUMN "version_thumbnail" varchar;
  ALTER TABLE "campaign_stories" ADD COLUMN "hero_image" varchar;
  ALTER TABLE "_campaign_stories_v" ADD COLUMN "version_hero_image" varchar;
  ALTER TABLE "foundation" ADD COLUMN "founder_image" varchar;
  ALTER TABLE "impact_stories_texts" ADD CONSTRAINT "impact_stories_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_texts" ADD CONSTRAINT "_impact_stories_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impact_stories_texts_order_parent" ON "impact_stories_texts" USING btree ("order","parent_id");
  CREATE INDEX "_impact_stories_v_texts_order_parent" ON "_impact_stories_v_texts" USING btree ("order","parent_id");
  ALTER TABLE "media" DROP COLUMN "alt_approved";
  ALTER TABLE "media" DROP COLUMN "source_hash";`)
}
