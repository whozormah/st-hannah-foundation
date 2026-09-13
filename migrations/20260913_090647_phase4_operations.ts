import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "support_applications" ADD COLUMN "decline_reason" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "decline_reason" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "decline_reason" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "support_applications" DROP COLUMN "decline_reason";
  ALTER TABLE "volunteer_applications" DROP COLUMN "decline_reason";
  ALTER TABLE "in_kind_offers" DROP COLUMN "decline_reason";`)
}
