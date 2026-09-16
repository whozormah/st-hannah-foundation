import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories" ADD COLUMN "programme_id" integer;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_programme_id" integer;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_programme_id_programmes_id_fk" FOREIGN KEY ("version_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "impact_stories_programme_idx" ON "impact_stories" USING btree ("programme_id");
  CREATE INDEX "_impact_stories_v_version_version_programme_idx" ON "_impact_stories_v" USING btree ("version_programme_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories" DROP CONSTRAINT "impact_stories_programme_id_programmes_id_fk";
  
  ALTER TABLE "_impact_stories_v" DROP CONSTRAINT "_impact_stories_v_version_programme_id_programmes_id_fk";
  
  DROP INDEX "impact_stories_programme_idx";
  DROP INDEX "_impact_stories_v_version_version_programme_idx";
  ALTER TABLE "impact_stories" DROP COLUMN "programme_id";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_programme_id";`)
}
