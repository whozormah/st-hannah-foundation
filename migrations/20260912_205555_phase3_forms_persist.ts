import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "reference_counters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar NOT NULL,
  	"value" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submission_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"submitted_with" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "support_applications" ADD COLUMN "support_type_other" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "gender" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "date_of_birth" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "nationality" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "contact_method" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "referral_source" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "state" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "lga" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "landmark" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "duration_at_address" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "housing_status" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "urgency" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "applied_elsewhere" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "occupation" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "marital_status" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "income_source_other" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "children" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "dependents" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "primary_provider" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "household_size" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "elderly_relatives" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "previous_support" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "address" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "living_conditions" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "support_summary" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "challenge" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "expected_impact" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "previous_support_detail" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "steps_taken" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "additional_information" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "declaration_true" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "declaration_no_guarantee" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "declaration_contact" varchar;
  ALTER TABLE "support_applications" ADD COLUMN "declaration_data_use" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "whatsapp" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "gender" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "date_of_birth" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "location" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "occupation" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "qualification" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "profession" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "volunteered_before" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "availability" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "commitment" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "consent" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "skills" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "previous_experience" varchar;
  ALTER TABLE "volunteer_applications" ADD COLUMN "motivation" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "quantity" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "condition" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "location" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "delivery_method" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "contact_method" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "pickup_date" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "pickup_time" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "destination" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "acknowledge_donation" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "pickup_address" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "pickup_instructions" varchar;
  ALTER TABLE "in_kind_offers" ADD COLUMN "photo_id" integer;
  ALTER TABLE "partner_enquiries" ADD COLUMN "location" varchar;
  ALTER TABLE "partner_enquiries" ADD COLUMN "partnership_type" varchar;
  ALTER TABLE "partner_enquiries" ADD COLUMN "consent" varchar;
  ALTER TABLE "partner_enquiries" ADD COLUMN "message" varchar;
  ALTER TABLE "contact_messages" ADD COLUMN "enquiry" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reference_counters_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "submission_files_id" integer;
  CREATE UNIQUE INDEX "reference_counters_prefix_idx" ON "reference_counters" USING btree ("prefix");
  CREATE INDEX "reference_counters_updated_at_idx" ON "reference_counters" USING btree ("updated_at");
  CREATE INDEX "reference_counters_created_at_idx" ON "reference_counters" USING btree ("created_at");
  CREATE INDEX "submission_files_updated_at_idx" ON "submission_files" USING btree ("updated_at");
  CREATE INDEX "submission_files_created_at_idx" ON "submission_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "submission_files_filename_idx" ON "submission_files" USING btree ("filename");
  ALTER TABLE "in_kind_offers" ADD CONSTRAINT "in_kind_offers_photo_id_submission_files_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."submission_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reference_counters_fk" FOREIGN KEY ("reference_counters_id") REFERENCES "public"."reference_counters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submission_files_fk" FOREIGN KEY ("submission_files_id") REFERENCES "public"."submission_files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "in_kind_offers_photo_idx" ON "in_kind_offers" USING btree ("photo_id");
  CREATE INDEX "payload_locked_documents_rels_reference_counters_id_idx" ON "payload_locked_documents_rels" USING btree ("reference_counters_id");
  CREATE INDEX "payload_locked_documents_rels_submission_files_id_idx" ON "payload_locked_documents_rels" USING btree ("submission_files_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reference_counters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "submission_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "reference_counters" CASCADE;
  DROP TABLE "submission_files" CASCADE;
  ALTER TABLE "in_kind_offers" DROP CONSTRAINT "in_kind_offers_photo_id_submission_files_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reference_counters_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_submission_files_fk";
  
  DROP INDEX "in_kind_offers_photo_idx";
  DROP INDEX "payload_locked_documents_rels_reference_counters_id_idx";
  DROP INDEX "payload_locked_documents_rels_submission_files_id_idx";
  ALTER TABLE "support_applications" DROP COLUMN "support_type_other";
  ALTER TABLE "support_applications" DROP COLUMN "gender";
  ALTER TABLE "support_applications" DROP COLUMN "date_of_birth";
  ALTER TABLE "support_applications" DROP COLUMN "nationality";
  ALTER TABLE "support_applications" DROP COLUMN "contact_method";
  ALTER TABLE "support_applications" DROP COLUMN "referral_source";
  ALTER TABLE "support_applications" DROP COLUMN "state";
  ALTER TABLE "support_applications" DROP COLUMN "lga";
  ALTER TABLE "support_applications" DROP COLUMN "landmark";
  ALTER TABLE "support_applications" DROP COLUMN "duration_at_address";
  ALTER TABLE "support_applications" DROP COLUMN "housing_status";
  ALTER TABLE "support_applications" DROP COLUMN "urgency";
  ALTER TABLE "support_applications" DROP COLUMN "applied_elsewhere";
  ALTER TABLE "support_applications" DROP COLUMN "occupation";
  ALTER TABLE "support_applications" DROP COLUMN "marital_status";
  ALTER TABLE "support_applications" DROP COLUMN "income_source_other";
  ALTER TABLE "support_applications" DROP COLUMN "children";
  ALTER TABLE "support_applications" DROP COLUMN "dependents";
  ALTER TABLE "support_applications" DROP COLUMN "primary_provider";
  ALTER TABLE "support_applications" DROP COLUMN "household_size";
  ALTER TABLE "support_applications" DROP COLUMN "elderly_relatives";
  ALTER TABLE "support_applications" DROP COLUMN "previous_support";
  ALTER TABLE "support_applications" DROP COLUMN "address";
  ALTER TABLE "support_applications" DROP COLUMN "living_conditions";
  ALTER TABLE "support_applications" DROP COLUMN "support_summary";
  ALTER TABLE "support_applications" DROP COLUMN "challenge";
  ALTER TABLE "support_applications" DROP COLUMN "expected_impact";
  ALTER TABLE "support_applications" DROP COLUMN "previous_support_detail";
  ALTER TABLE "support_applications" DROP COLUMN "steps_taken";
  ALTER TABLE "support_applications" DROP COLUMN "additional_information";
  ALTER TABLE "support_applications" DROP COLUMN "declaration_true";
  ALTER TABLE "support_applications" DROP COLUMN "declaration_no_guarantee";
  ALTER TABLE "support_applications" DROP COLUMN "declaration_contact";
  ALTER TABLE "support_applications" DROP COLUMN "declaration_data_use";
  ALTER TABLE "volunteer_applications" DROP COLUMN "whatsapp";
  ALTER TABLE "volunteer_applications" DROP COLUMN "gender";
  ALTER TABLE "volunteer_applications" DROP COLUMN "date_of_birth";
  ALTER TABLE "volunteer_applications" DROP COLUMN "location";
  ALTER TABLE "volunteer_applications" DROP COLUMN "occupation";
  ALTER TABLE "volunteer_applications" DROP COLUMN "qualification";
  ALTER TABLE "volunteer_applications" DROP COLUMN "profession";
  ALTER TABLE "volunteer_applications" DROP COLUMN "volunteered_before";
  ALTER TABLE "volunteer_applications" DROP COLUMN "availability";
  ALTER TABLE "volunteer_applications" DROP COLUMN "commitment";
  ALTER TABLE "volunteer_applications" DROP COLUMN "consent";
  ALTER TABLE "volunteer_applications" DROP COLUMN "skills";
  ALTER TABLE "volunteer_applications" DROP COLUMN "previous_experience";
  ALTER TABLE "volunteer_applications" DROP COLUMN "motivation";
  ALTER TABLE "in_kind_offers" DROP COLUMN "quantity";
  ALTER TABLE "in_kind_offers" DROP COLUMN "condition";
  ALTER TABLE "in_kind_offers" DROP COLUMN "location";
  ALTER TABLE "in_kind_offers" DROP COLUMN "delivery_method";
  ALTER TABLE "in_kind_offers" DROP COLUMN "contact_method";
  ALTER TABLE "in_kind_offers" DROP COLUMN "pickup_date";
  ALTER TABLE "in_kind_offers" DROP COLUMN "pickup_time";
  ALTER TABLE "in_kind_offers" DROP COLUMN "destination";
  ALTER TABLE "in_kind_offers" DROP COLUMN "acknowledge_donation";
  ALTER TABLE "in_kind_offers" DROP COLUMN "pickup_address";
  ALTER TABLE "in_kind_offers" DROP COLUMN "pickup_instructions";
  ALTER TABLE "in_kind_offers" DROP COLUMN "photo_id";
  ALTER TABLE "partner_enquiries" DROP COLUMN "location";
  ALTER TABLE "partner_enquiries" DROP COLUMN "partnership_type";
  ALTER TABLE "partner_enquiries" DROP COLUMN "consent";
  ALTER TABLE "partner_enquiries" DROP COLUMN "message";
  ALTER TABLE "contact_messages" DROP COLUMN "enquiry";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reference_counters_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "submission_files_id";`)
}
