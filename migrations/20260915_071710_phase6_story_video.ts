import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaign_stories" ADD COLUMN "video_id" integer;
  ALTER TABLE "_campaign_stories_v" ADD COLUMN "version_video_id" integer;
  ALTER TABLE "campaign_stories" ADD CONSTRAINT "campaign_stories_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campaign_stories_v" ADD CONSTRAINT "_campaign_stories_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "campaign_stories_video_idx" ON "campaign_stories" USING btree ("video_id");
  CREATE INDEX "_campaign_stories_v_version_version_video_idx" ON "_campaign_stories_v" USING btree ("version_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaign_stories" DROP CONSTRAINT "campaign_stories_video_id_media_id_fk";
  
  ALTER TABLE "_campaign_stories_v" DROP CONSTRAINT "_campaign_stories_v_version_video_id_media_id_fk";
  
  DROP INDEX "campaign_stories_video_idx";
  DROP INDEX "_campaign_stories_v_version_version_video_idx";
  ALTER TABLE "campaign_stories" DROP COLUMN "video_id";
  ALTER TABLE "_campaign_stories_v" DROP COLUMN "version_video_id";`)
}
