import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "video_highlights" ADD COLUMN "video_id" integer;
  ALTER TABLE "_video_highlights_v" ADD COLUMN "version_video_id" integer;
  ALTER TABLE "video_highlights" ADD CONSTRAINT "video_highlights_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_video_highlights_v" ADD CONSTRAINT "_video_highlights_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "video_highlights_video_idx" ON "video_highlights" USING btree ("video_id");
  CREATE INDEX "_video_highlights_v_version_version_video_idx" ON "_video_highlights_v" USING btree ("version_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "video_highlights" DROP CONSTRAINT "video_highlights_video_id_media_id_fk";
  
  ALTER TABLE "_video_highlights_v" DROP CONSTRAINT "_video_highlights_v_version_video_id_media_id_fk";
  
  DROP INDEX "video_highlights_video_idx";
  DROP INDEX "_video_highlights_v_version_version_video_idx";
  ALTER TABLE "video_highlights" DROP COLUMN "video_id";
  ALTER TABLE "_video_highlights_v" DROP COLUMN "version_video_id";`)
}
