import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Hand edit: the table's one row already holds the other figures, and a
  // NOT NULL column cannot be added to a row without a value. The two new
  // figures start empty and the default is dropped at once; the content
  // migration (scripts/migrate-content.ts statistics) fills them.
  await db.execute(sql`
   ALTER TABLE "statistics_manual" ADD COLUMN "families_reached_value" varchar NOT NULL DEFAULT '';
  ALTER TABLE "statistics_manual" ALTER COLUMN "families_reached_value" DROP DEFAULT;
  ALTER TABLE "statistics_manual" ADD COLUMN "families_reached_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "families_reached_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "students_sponsored_value" varchar NOT NULL DEFAULT '';
  ALTER TABLE "statistics_manual" ALTER COLUMN "students_sponsored_value" DROP DEFAULT;
  ALTER TABLE "statistics_manual" ADD COLUMN "students_sponsored_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "students_sponsored_verified_at" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "statistics_manual" DROP COLUMN "families_reached_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "families_reached_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "families_reached_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "students_sponsored_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "students_sponsored_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "students_sponsored_verified_at";`)
}
