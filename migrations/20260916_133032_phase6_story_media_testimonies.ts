import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_impact_stories_testimonies_attribution" AS ENUM('named', 'anonymous');
  CREATE TYPE "public"."enum__impact_stories_v_version_testimonies_attribution" AS ENUM('named', 'anonymous');
  CREATE TABLE "impact_stories_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "impact_stories_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"title" varchar,
  	"poster_id" integer
  );
  
  CREATE TABLE "impact_stories_testimonies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"video_id" integer,
  	"photo_id" integer,
  	"attribution" "enum_impact_stories_testimonies_attribution" DEFAULT 'anonymous',
  	"name" varchar,
  	"about" varchar,
  	"consent_confirmed" boolean DEFAULT false
  );
  
  CREATE TABLE "_impact_stories_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_impact_stories_v_version_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"title" varchar,
  	"poster_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_impact_stories_v_version_testimonies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"video_id" integer,
  	"photo_id" integer,
  	"attribution" "enum__impact_stories_v_version_testimonies_attribution" DEFAULT 'anonymous',
  	"name" varchar,
  	"about" varchar,
  	"consent_confirmed" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  ALTER TABLE "impact_stories_stats" ADD CONSTRAINT "impact_stories_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_videos" ADD CONSTRAINT "impact_stories_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories_videos" ADD CONSTRAINT "impact_stories_videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories_videos" ADD CONSTRAINT "impact_stories_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_testimonies" ADD CONSTRAINT "impact_stories_testimonies_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories_testimonies" ADD CONSTRAINT "impact_stories_testimonies_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories_testimonies" ADD CONSTRAINT "impact_stories_testimonies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_stats" ADD CONSTRAINT "_impact_stories_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_videos" ADD CONSTRAINT "_impact_stories_v_version_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_videos" ADD CONSTRAINT "_impact_stories_v_version_videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_videos" ADD CONSTRAINT "_impact_stories_v_version_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_testimonies" ADD CONSTRAINT "_impact_stories_v_version_testimonies_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_testimonies" ADD CONSTRAINT "_impact_stories_v_version_testimonies_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_version_testimonies" ADD CONSTRAINT "_impact_stories_v_version_testimonies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impact_stories_stats_order_idx" ON "impact_stories_stats" USING btree ("_order");
  CREATE INDEX "impact_stories_stats_parent_id_idx" ON "impact_stories_stats" USING btree ("_parent_id");
  CREATE INDEX "impact_stories_videos_order_idx" ON "impact_stories_videos" USING btree ("_order");
  CREATE INDEX "impact_stories_videos_parent_id_idx" ON "impact_stories_videos" USING btree ("_parent_id");
  CREATE INDEX "impact_stories_videos_video_idx" ON "impact_stories_videos" USING btree ("video_id");
  CREATE INDEX "impact_stories_videos_poster_idx" ON "impact_stories_videos" USING btree ("poster_id");
  CREATE INDEX "impact_stories_testimonies_order_idx" ON "impact_stories_testimonies" USING btree ("_order");
  CREATE INDEX "impact_stories_testimonies_parent_id_idx" ON "impact_stories_testimonies" USING btree ("_parent_id");
  CREATE INDEX "impact_stories_testimonies_video_idx" ON "impact_stories_testimonies" USING btree ("video_id");
  CREATE INDEX "impact_stories_testimonies_photo_idx" ON "impact_stories_testimonies" USING btree ("photo_id");
  CREATE INDEX "_impact_stories_v_version_stats_order_idx" ON "_impact_stories_v_version_stats" USING btree ("_order");
  CREATE INDEX "_impact_stories_v_version_stats_parent_id_idx" ON "_impact_stories_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_impact_stories_v_version_videos_order_idx" ON "_impact_stories_v_version_videos" USING btree ("_order");
  CREATE INDEX "_impact_stories_v_version_videos_parent_id_idx" ON "_impact_stories_v_version_videos" USING btree ("_parent_id");
  CREATE INDEX "_impact_stories_v_version_videos_video_idx" ON "_impact_stories_v_version_videos" USING btree ("video_id");
  CREATE INDEX "_impact_stories_v_version_videos_poster_idx" ON "_impact_stories_v_version_videos" USING btree ("poster_id");
  CREATE INDEX "_impact_stories_v_version_testimonies_order_idx" ON "_impact_stories_v_version_testimonies" USING btree ("_order");
  CREATE INDEX "_impact_stories_v_version_testimonies_parent_id_idx" ON "_impact_stories_v_version_testimonies" USING btree ("_parent_id");
  CREATE INDEX "_impact_stories_v_version_testimonies_video_idx" ON "_impact_stories_v_version_testimonies" USING btree ("video_id");
  CREATE INDEX "_impact_stories_v_version_testimonies_photo_idx" ON "_impact_stories_v_version_testimonies" USING btree ("photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "impact_stories_stats" CASCADE;
  DROP TABLE "impact_stories_videos" CASCADE;
  DROP TABLE "impact_stories_testimonies" CASCADE;
  DROP TABLE "_impact_stories_v_version_stats" CASCADE;
  DROP TABLE "_impact_stories_v_version_videos" CASCADE;
  DROP TABLE "_impact_stories_v_version_testimonies" CASCADE;
  DROP TYPE "public"."enum_impact_stories_testimonies_attribution";
  DROP TYPE "public"."enum__impact_stories_v_version_testimonies_attribution";`)
}
