import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_heart_of_foundation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Heart Behind The Name',
  	"title" varchar DEFAULT 'Where It All Began',
  	"text" varchar DEFAULT 'Prophetess Hannah Okoh dedicated much of her life to caring for the less privileged. During festive seasons, she visited orphanages and underserved communities, making sure children and families received food, clothing and essential support.',
  	"closing" varchar DEFAULT 'Her legacy of compassion lives on through St. Hannah Foundation.',
  	"image_id" integer,
  	"button_label" varchar DEFAULT 'Read Her Story',
  	"button_link" varchar DEFAULT '/about#her-story',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_heart_of_foundation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Heart Behind The Name',
  	"title" varchar DEFAULT 'Where It All Began',
  	"text" varchar DEFAULT 'Prophetess Hannah Okoh dedicated much of her life to caring for the less privileged. During festive seasons, she visited orphanages and underserved communities, making sure children and families received food, clothing and essential support.',
  	"closing" varchar DEFAULT 'Her legacy of compassion lives on through St. Hannah Foundation.',
  	"image_id" integer,
  	"button_label" varchar DEFAULT 'Read Her Story',
  	"button_link" varchar DEFAULT '/about#her-story',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_heart_of_foundation" ADD CONSTRAINT "pages_blocks_heart_of_foundation_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_heart_of_foundation" ADD CONSTRAINT "pages_blocks_heart_of_foundation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_heart_of_foundation" ADD CONSTRAINT "_pages_v_blocks_heart_of_foundation_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_heart_of_foundation" ADD CONSTRAINT "_pages_v_blocks_heart_of_foundation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_heart_of_foundation_order_idx" ON "pages_blocks_heart_of_foundation" USING btree ("_order");
  CREATE INDEX "pages_blocks_heart_of_foundation_parent_id_idx" ON "pages_blocks_heart_of_foundation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_heart_of_foundation_path_idx" ON "pages_blocks_heart_of_foundation" USING btree ("_path");
  CREATE INDEX "pages_blocks_heart_of_foundation_image_idx" ON "pages_blocks_heart_of_foundation" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_heart_of_foundation_order_idx" ON "_pages_v_blocks_heart_of_foundation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_heart_of_foundation_parent_id_idx" ON "_pages_v_blocks_heart_of_foundation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_heart_of_foundation_path_idx" ON "_pages_v_blocks_heart_of_foundation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_heart_of_foundation_image_idx" ON "_pages_v_blocks_heart_of_foundation" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_heart_of_foundation" CASCADE;
  DROP TABLE "_pages_v_blocks_heart_of_foundation" CASCADE;`)
}
