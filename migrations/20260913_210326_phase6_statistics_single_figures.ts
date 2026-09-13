import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Hand edit: the previous migration dropped every figure, so the one row
  // this table holds is now empty. A NOT NULL column cannot be added to a
  // table with rows and no value to give them, so the empty row goes;
  // Payload creates it again on the next save, and the content migration
  // (scripts/migrate-content.ts statistics) fills it.
  await db.execute(sql`
   DELETE FROM "statistics_manual";
   ALTER TABLE "statistics_manual" ADD COLUMN "children_reached_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "children_reached_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "children_reached_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "widows_supported_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "widows_supported_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "widows_supported_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "educational_beneficiaries_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "educational_beneficiaries_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "educational_beneficiaries_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "communities_reached_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "communities_reached_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "communities_reached_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "lives_reached_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "lives_reached_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "lives_reached_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "outreach_events_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "outreach_events_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "outreach_events_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "years_of_service_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "years_of_service_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "years_of_service_verified_at" timestamp(3) with time zone;
  ALTER TABLE "statistics_manual" ADD COLUMN "countries_represented_value" varchar NOT NULL;
  ALTER TABLE "statistics_manual" ADD COLUMN "countries_represented_source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "countries_represented_verified_at" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "statistics_manual" DROP COLUMN "children_reached_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "children_reached_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "children_reached_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "widows_supported_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "widows_supported_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "widows_supported_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "educational_beneficiaries_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "educational_beneficiaries_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "educational_beneficiaries_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "communities_reached_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "communities_reached_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "communities_reached_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "lives_reached_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "lives_reached_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "lives_reached_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "outreach_events_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "outreach_events_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "outreach_events_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "years_of_service_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "years_of_service_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "years_of_service_verified_at";
  ALTER TABLE "statistics_manual" DROP COLUMN "countries_represented_value";
  ALTER TABLE "statistics_manual" DROP COLUMN "countries_represented_source";
  ALTER TABLE "statistics_manual" DROP COLUMN "countries_represented_verified_at";`)
}
