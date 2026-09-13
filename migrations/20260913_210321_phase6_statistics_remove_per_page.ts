import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "statistics_manual" DROP COLUMN "homepage_children_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_widows_supported";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_educational_beneficiaries";
  ALTER TABLE "statistics_manual" DROP COLUMN "homepage_communities_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_years_of_compassion";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_lives_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_outreach_activities";
  ALTER TABLE "statistics_manual" DROP COLUMN "programs_countries_represented";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_widows_supported";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_children_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_community_outreach_events";
  ALTER TABLE "statistics_manual" DROP COLUMN "impact_lives_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_lives_impacted";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_outreach_events";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_communities_reached";
  ALTER TABLE "statistics_manual" DROP COLUMN "gallery_years_of_service";
  ALTER TABLE "statistics_manual" DROP COLUMN "source";
  ALTER TABLE "statistics_manual" DROP COLUMN "verified_at";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "statistics_manual" ADD COLUMN "homepage_children_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_widows_supported" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_educational_beneficiaries" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "homepage_communities_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_years_of_compassion" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_lives_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_outreach_activities" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "programs_countries_represented" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_widows_supported" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_children_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_community_outreach_events" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "impact_lives_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_lives_impacted" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_outreach_events" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_communities_reached" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "gallery_years_of_service" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "source" varchar;
  ALTER TABLE "statistics_manual" ADD COLUMN "verified_at" timestamp(3) with time zone;`)
}
