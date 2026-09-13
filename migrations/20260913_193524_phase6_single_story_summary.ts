import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories" DROP COLUMN "summary";
  ALTER TABLE "_impact_stories_v" DROP COLUMN "version_summary";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "impact_stories" ADD COLUMN "summary" varchar;
  ALTER TABLE "_impact_stories_v" ADD COLUMN "version_summary" varchar;`)
}
