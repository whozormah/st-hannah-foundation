import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  
  ALTER TABLE "impact_stories_story" ADD COLUMN "heading" varchar;
  ALTER TABLE "impact_stories_story" ADD COLUMN "highlight" boolean DEFAULT false;
  ALTER TABLE "impact_stories" ADD COLUMN "testimonies_heading" varchar;
  ALTER TABLE "_impact_stories_v_version_story" ADD COLUMN "heading" varchar;
  ALTER TABLE "_impact_stories_v_version_story" ADD COLUMN "highlight" boolean DEFAULT false;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_testimonies_heading" varchar;
  ALTER TABLE "impact_stories_texts" ADD CONSTRAINT "impact_stories_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_texts" ADD CONSTRAINT "_impact_stories_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "impact_stories_texts_order_parent" ON "impact_stories_texts" USING btree ("order","parent_id");
  CREATE INDEX "_impact_stories_v_texts_order_parent" ON "_impact_stories_v_texts" USING btree ("order","parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "impact_stories_texts" CASCADE;
  DROP TABLE "_impact_stories_v_texts" CASCADE;
  ALTER TABLE "impact_stories_story" DROP COLUMN "heading";
  ALTER TABLE "impact_stories_story" DROP COLUMN "highlight";
  ALTER TABLE "impact_stories" DROP COLUMN "testimonies_heading";
  ALTER TABLE "_impact_stories_v_version_story" DROP COLUMN "heading";
  ALTER TABLE "_impact_stories_v_version_story" DROP COLUMN "highlight";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_testimonies_heading";`)
}
