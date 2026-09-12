import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_admin_users_role" AS ENUM('owner', 'administrator', 'content', 'case', 'finance');
  CREATE TYPE "public"."enum_admin_users_status" AS ENUM('active', 'suspended');
  CREATE TYPE "public"."enum_programmes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programmes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_impact_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__impact_stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_albums_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_albums_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leadership_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__leadership_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_support_applications_status" AS ENUM('new', 'under_review', 'approved', 'declined', 'support_provided', 'closed');
  CREATE TYPE "public"."enum_volunteer_applications_status" AS ENUM('new', 'contacted', 'accepted', 'declined', 'closed');
  CREATE TYPE "public"."enum_in_kind_offers_status" AS ENUM('new', 'accepted', 'received', 'declined', 'closed');
  CREATE TYPE "public"."enum_partner_enquiries_status" AS ENUM('new', 'in_discussion', 'agreed', 'closed');
  CREATE TYPE "public"."enum_contact_messages_status" AS ENUM('unread', 'read', 'resolved');
  CREATE TYPE "public"."enum_subscribers_status" AS ENUM('subscribed', 'unsubscribed');
  CREATE TYPE "public"."enum_donations_status" AS ENUM('successful', 'refunded', 'partially_refunded');
  CREATE TYPE "public"."enum_payment_transactions_status" AS ENUM('pending', 'successful', 'failed', 'refunded');
  CREATE TYPE "public"."enum_audit_log_action" AS ENUM('login', 'login_failed', 'view_sensitive', 'create', 'update', 'delete', 'export', 'role_change', 'status_change');
  CREATE TABLE "admin_users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "admin_users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_admin_users_role" NOT NULL,
  	"status" "enum_admin_users_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"uploaded_by_id" integer,
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
  
  CREATE TABLE "media_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"hero_image_id" integer,
  	"impact" varchar,
  	"featured" boolean,
  	"order" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_programmes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "programmes_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_programmes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_hero_image_id" integer,
  	"version_impact" varchar,
  	"version_featured" boolean,
  	"version_order" numeric,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__programmes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_programmes_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_programmes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "impact_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"featured_image_id" integer,
  	"programme_id" integer,
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"beneficiaries_reached" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_impact_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "impact_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_impact_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_featured_image_id" integer,
  	"version_programme_id" integer,
  	"version_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_beneficiaries_reached" numeric,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__impact_stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_impact_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "gallery_albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"cover_id" integer,
  	"programme_id" integer,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gallery_albums_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "gallery_albums_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_gallery_albums_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_cover_id" integer,
  	"version_programme_id" integer,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gallery_albums_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_gallery_albums_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "leadership" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"position" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_leadership_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_leadership_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_position" varchar,
  	"version_bio" varchar,
  	"version_photo_id" integer,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__leadership_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_photo_id" integer,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_category" varchar,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "support_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source_ip_hash" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"full_name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"support_type" varchar,
  	"status" "enum_support_applications_status" DEFAULT 'new' NOT NULL,
  	"assigned_to_id" integer,
  	"national_id" varchar,
  	"monthly_income" varchar,
  	"income_source" varchar,
  	"situation_narrative" varchar,
  	"special_needs_dependents" varchar,
  	"special_needs_detail" varchar,
  	"housing_challenges" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "support_applications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "beneficiaries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"application_id" integer,
  	"programme" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar NOT NULL,
  	"body" varchar,
  	"application_id" integer,
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"storage_key" varchar,
  	"application_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volunteer_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source_ip_hash" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"full_name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"area_of_interest" varchar,
  	"status" "enum_volunteer_applications_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "in_kind_offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source_ip_hash" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"full_name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"category" varchar,
  	"description" varchar,
  	"photo_key" varchar,
  	"status" "enum_in_kind_offers_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partner_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source_ip_hash" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"organisation" varchar,
  	"contact_person" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"status" "enum_partner_enquiries_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source_ip_hash" varchar,
  	"anonymised_at" timestamp(3) with time zone,
  	"name" varchar,
  	"email" varchar,
  	"subject" varchar,
  	"message" varchar,
  	"status" "enum_contact_messages_status" DEFAULT 'unread',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_subscribers_status" DEFAULT 'subscribed',
  	"consent_version" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"full_name" varchar,
  	"phone" varchar,
  	"first_gift_at" timestamp(3) with time zone,
  	"latest_gift_at" timestamp(3) with time zone,
  	"anonymised_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"target_minor" numeric,
  	"currency" varchar DEFAULT 'NGN',
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"receipt_number" numeric,
  	"donor_id" integer NOT NULL,
  	"campaign_id" integer,
  	"programme_id" integer,
  	"amount_minor" numeric NOT NULL,
  	"currency" varchar DEFAULT 'NGN' NOT NULL,
  	"status" "enum_donations_status" DEFAULT 'successful' NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_reference" varchar NOT NULL,
  	"donated_at" timestamp(3) with time zone,
  	"receipt_sent_at" timestamp(3) with time zone,
  	"is_anonymous" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payment_transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_reference" varchar NOT NULL,
  	"donation_id" integer,
  	"event_type" varchar,
  	"status" "enum_payment_transactions_status",
  	"amount_minor" numeric,
  	"currency" varchar,
  	"fees_minor" numeric,
  	"raw_payload" jsonb,
  	"occurred_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "webhook_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_event_id" varchar NOT NULL,
  	"signature_valid" boolean,
  	"processed_at" timestamp(3) with time zone,
  	"processing_error" varchar,
  	"payload" jsonb,
  	"received_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"body" varchar,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL,
  	"recipient_id" integer NOT NULL,
  	"href" varchar,
  	"read_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activity_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar NOT NULL,
  	"collection_name" varchar,
  	"record_id" varchar,
  	"from_status" varchar,
  	"to_status" varchar,
  	"actor_id" integer,
  	"occurred_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"template" varchar NOT NULL,
  	"recipient" varchar NOT NULL,
  	"provider_message_id" varchar,
  	"status" varchar,
  	"sent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"actor_id" integer NOT NULL,
  	"action" "enum_audit_log_action" NOT NULL,
  	"collection_name" varchar,
  	"record_id" varchar,
  	"row_count" numeric,
  	"ip_hash" varchar,
  	"occurred_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_log_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admin_users_id" integer,
  	"media_id" integer,
  	"programmes_id" integer,
  	"impact_stories_id" integer,
  	"gallery_albums_id" integer,
  	"leadership_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"pages_id" integer,
  	"support_applications_id" integer,
  	"beneficiaries_id" integer,
  	"case_notes_id" integer,
  	"documents_id" integer,
  	"volunteer_applications_id" integer,
  	"in_kind_offers_id" integer,
  	"partner_enquiries_id" integer,
  	"contact_messages_id" integer,
  	"subscribers_id" integer,
  	"donors_id" integer,
  	"campaigns_id" integer,
  	"donations_id" integer,
  	"payment_transactions_id" integer,
  	"webhook_events_id" integer,
  	"email_templates_id" integer,
  	"notifications_id" integer,
  	"redirects_id" integer,
  	"activity_log_id" integer,
  	"email_log_id" integer,
  	"audit_log_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admin_users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"foundation_name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"nigeria_address" varchar,
  	"usa_address" varchar,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_youtube" varchar,
  	"socials_linkedin" varchar,
  	"socials_tiktok" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "foundation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vision" varchar,
  	"mission" varchar,
  	"founder_story" jsonb,
  	"history" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_template" varchar,
  	"description" varchar,
  	"open_graph_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "statistics_manual_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"source" varchar NOT NULL,
  	"verified_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "statistics_manual" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "admin_users_sessions" ADD CONSTRAINT "admin_users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_admin_users_id_fk" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_texts" ADD CONSTRAINT "media_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes_texts" ADD CONSTRAINT "programmes_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_parent_id_programmes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v_texts" ADD CONSTRAINT "_programmes_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories" ADD CONSTRAINT "impact_stories_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stories_rels" ADD CONSTRAINT "impact_stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_parent_id_impact_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_programme_id_programmes_id_fk" FOREIGN KEY ("version_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v" ADD CONSTRAINT "_impact_stories_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_stories_v_rels" ADD CONSTRAINT "_impact_stories_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_albums_rels" ADD CONSTRAINT "gallery_albums_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_albums_rels" ADD CONSTRAINT "gallery_albums_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_parent_id_gallery_albums_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v" ADD CONSTRAINT "_gallery_albums_v_version_programme_id_programmes_id_fk" FOREIGN KEY ("version_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v_rels" ADD CONSTRAINT "_gallery_albums_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_gallery_albums_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_albums_v_rels" ADD CONSTRAINT "_gallery_albums_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leadership" ADD CONSTRAINT "leadership_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leadership_v" ADD CONSTRAINT "_leadership_v_parent_id_leadership_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leadership"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leadership_v" ADD CONSTRAINT "_leadership_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_applications" ADD CONSTRAINT "support_applications_assigned_to_id_admin_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_applications_rels" ADD CONSTRAINT "support_applications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."support_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "support_applications_rels" ADD CONSTRAINT "support_applications_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_application_id_support_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."support_applications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_application_id_support_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."support_applications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_author_id_admin_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_application_id_support_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."support_applications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_donors_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations" ADD CONSTRAINT "donations_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_donation_id_donations_id_fk" FOREIGN KEY ("donation_id") REFERENCES "public"."donations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_admin_users_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_actor_id_admin_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_admin_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_log_texts" ADD CONSTRAINT "audit_log_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_users_fk" FOREIGN KEY ("admin_users_id") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impact_stories_fk" FOREIGN KEY ("impact_stories_id") REFERENCES "public"."impact_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_albums_fk" FOREIGN KEY ("gallery_albums_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_fk" FOREIGN KEY ("leadership_id") REFERENCES "public"."leadership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_support_applications_fk" FOREIGN KEY ("support_applications_id") REFERENCES "public"."support_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_beneficiaries_fk" FOREIGN KEY ("beneficiaries_id") REFERENCES "public"."beneficiaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_notes_fk" FOREIGN KEY ("case_notes_id") REFERENCES "public"."case_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteer_applications_fk" FOREIGN KEY ("volunteer_applications_id") REFERENCES "public"."volunteer_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_in_kind_offers_fk" FOREIGN KEY ("in_kind_offers_id") REFERENCES "public"."in_kind_offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_enquiries_fk" FOREIGN KEY ("partner_enquiries_id") REFERENCES "public"."partner_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donors_fk" FOREIGN KEY ("donors_id") REFERENCES "public"."donors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaigns_fk" FOREIGN KEY ("campaigns_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donations_fk" FOREIGN KEY ("donations_id") REFERENCES "public"."donations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payment_transactions_fk" FOREIGN KEY ("payment_transactions_id") REFERENCES "public"."payment_transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_webhook_events_fk" FOREIGN KEY ("webhook_events_id") REFERENCES "public"."webhook_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_templates_fk" FOREIGN KEY ("email_templates_id") REFERENCES "public"."email_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notifications_fk" FOREIGN KEY ("notifications_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_log_fk" FOREIGN KEY ("activity_log_id") REFERENCES "public"."activity_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_log_fk" FOREIGN KEY ("email_log_id") REFERENCES "public"."email_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admin_users_fk" FOREIGN KEY ("admin_users_id") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer" ADD CONSTRAINT "navigation_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_open_graph_image_id_media_id_fk" FOREIGN KEY ("open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statistics_manual_figures" ADD CONSTRAINT "statistics_manual_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statistics_manual"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "admin_users_sessions_order_idx" ON "admin_users_sessions" USING btree ("_order");
  CREATE INDEX "admin_users_sessions_parent_id_idx" ON "admin_users_sessions" USING btree ("_parent_id");
  CREATE INDEX "admin_users_updated_at_idx" ON "admin_users" USING btree ("updated_at");
  CREATE INDEX "admin_users_created_at_idx" ON "admin_users" USING btree ("created_at");
  CREATE UNIQUE INDEX "admin_users_email_idx" ON "admin_users" USING btree ("email");
  CREATE INDEX "media_uploaded_by_idx" ON "media" USING btree ("uploaded_by_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_texts_order_parent" ON "media_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");
  CREATE INDEX "programmes_hero_image_idx" ON "programmes" USING btree ("hero_image_id");
  CREATE INDEX "programmes_seo_seo_image_idx" ON "programmes" USING btree ("seo_image_id");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE INDEX "programmes__status_idx" ON "programmes" USING btree ("_status");
  CREATE INDEX "programmes_texts_order_parent" ON "programmes_texts" USING btree ("order","parent_id");
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_media_id_idx" ON "programmes_rels" USING btree ("media_id");
  CREATE INDEX "_programmes_v_parent_idx" ON "_programmes_v" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_version_version_slug_idx" ON "_programmes_v" USING btree ("version_slug");
  CREATE INDEX "_programmes_v_version_version_hero_image_idx" ON "_programmes_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_programmes_v_version_seo_version_seo_image_idx" ON "_programmes_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_programmes_v_version_version_updated_at_idx" ON "_programmes_v" USING btree ("version_updated_at");
  CREATE INDEX "_programmes_v_version_version_created_at_idx" ON "_programmes_v" USING btree ("version_created_at");
  CREATE INDEX "_programmes_v_version_version__status_idx" ON "_programmes_v" USING btree ("version__status");
  CREATE INDEX "_programmes_v_created_at_idx" ON "_programmes_v" USING btree ("created_at");
  CREATE INDEX "_programmes_v_updated_at_idx" ON "_programmes_v" USING btree ("updated_at");
  CREATE INDEX "_programmes_v_latest_idx" ON "_programmes_v" USING btree ("latest");
  CREATE INDEX "_programmes_v_texts_order_parent" ON "_programmes_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_programmes_v_rels_order_idx" ON "_programmes_v_rels" USING btree ("order");
  CREATE INDEX "_programmes_v_rels_parent_idx" ON "_programmes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_rels_path_idx" ON "_programmes_v_rels" USING btree ("path");
  CREATE INDEX "_programmes_v_rels_media_id_idx" ON "_programmes_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "impact_stories_slug_idx" ON "impact_stories" USING btree ("slug");
  CREATE INDEX "impact_stories_featured_image_idx" ON "impact_stories" USING btree ("featured_image_id");
  CREATE INDEX "impact_stories_programme_idx" ON "impact_stories" USING btree ("programme_id");
  CREATE INDEX "impact_stories_seo_seo_image_idx" ON "impact_stories" USING btree ("seo_image_id");
  CREATE INDEX "impact_stories_updated_at_idx" ON "impact_stories" USING btree ("updated_at");
  CREATE INDEX "impact_stories_created_at_idx" ON "impact_stories" USING btree ("created_at");
  CREATE INDEX "impact_stories__status_idx" ON "impact_stories" USING btree ("_status");
  CREATE INDEX "impact_stories_rels_order_idx" ON "impact_stories_rels" USING btree ("order");
  CREATE INDEX "impact_stories_rels_parent_idx" ON "impact_stories_rels" USING btree ("parent_id");
  CREATE INDEX "impact_stories_rels_path_idx" ON "impact_stories_rels" USING btree ("path");
  CREATE INDEX "impact_stories_rels_media_id_idx" ON "impact_stories_rels" USING btree ("media_id");
  CREATE INDEX "_impact_stories_v_parent_idx" ON "_impact_stories_v" USING btree ("parent_id");
  CREATE INDEX "_impact_stories_v_version_version_slug_idx" ON "_impact_stories_v" USING btree ("version_slug");
  CREATE INDEX "_impact_stories_v_version_version_featured_image_idx" ON "_impact_stories_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_impact_stories_v_version_version_programme_idx" ON "_impact_stories_v" USING btree ("version_programme_id");
  CREATE INDEX "_impact_stories_v_version_seo_version_seo_image_idx" ON "_impact_stories_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_impact_stories_v_version_version_updated_at_idx" ON "_impact_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_impact_stories_v_version_version_created_at_idx" ON "_impact_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_impact_stories_v_version_version__status_idx" ON "_impact_stories_v" USING btree ("version__status");
  CREATE INDEX "_impact_stories_v_created_at_idx" ON "_impact_stories_v" USING btree ("created_at");
  CREATE INDEX "_impact_stories_v_updated_at_idx" ON "_impact_stories_v" USING btree ("updated_at");
  CREATE INDEX "_impact_stories_v_latest_idx" ON "_impact_stories_v" USING btree ("latest");
  CREATE INDEX "_impact_stories_v_rels_order_idx" ON "_impact_stories_v_rels" USING btree ("order");
  CREATE INDEX "_impact_stories_v_rels_parent_idx" ON "_impact_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_impact_stories_v_rels_path_idx" ON "_impact_stories_v_rels" USING btree ("path");
  CREATE INDEX "_impact_stories_v_rels_media_id_idx" ON "_impact_stories_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "gallery_albums_slug_idx" ON "gallery_albums" USING btree ("slug");
  CREATE INDEX "gallery_albums_cover_idx" ON "gallery_albums" USING btree ("cover_id");
  CREATE INDEX "gallery_albums_programme_idx" ON "gallery_albums" USING btree ("programme_id");
  CREATE INDEX "gallery_albums_updated_at_idx" ON "gallery_albums" USING btree ("updated_at");
  CREATE INDEX "gallery_albums_created_at_idx" ON "gallery_albums" USING btree ("created_at");
  CREATE INDEX "gallery_albums__status_idx" ON "gallery_albums" USING btree ("_status");
  CREATE INDEX "gallery_albums_rels_order_idx" ON "gallery_albums_rels" USING btree ("order");
  CREATE INDEX "gallery_albums_rels_parent_idx" ON "gallery_albums_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_albums_rels_path_idx" ON "gallery_albums_rels" USING btree ("path");
  CREATE INDEX "gallery_albums_rels_media_id_idx" ON "gallery_albums_rels" USING btree ("media_id");
  CREATE INDEX "_gallery_albums_v_parent_idx" ON "_gallery_albums_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_albums_v_version_version_slug_idx" ON "_gallery_albums_v" USING btree ("version_slug");
  CREATE INDEX "_gallery_albums_v_version_version_cover_idx" ON "_gallery_albums_v" USING btree ("version_cover_id");
  CREATE INDEX "_gallery_albums_v_version_version_programme_idx" ON "_gallery_albums_v" USING btree ("version_programme_id");
  CREATE INDEX "_gallery_albums_v_version_version_updated_at_idx" ON "_gallery_albums_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_albums_v_version_version_created_at_idx" ON "_gallery_albums_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_albums_v_version_version__status_idx" ON "_gallery_albums_v" USING btree ("version__status");
  CREATE INDEX "_gallery_albums_v_created_at_idx" ON "_gallery_albums_v" USING btree ("created_at");
  CREATE INDEX "_gallery_albums_v_updated_at_idx" ON "_gallery_albums_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_albums_v_latest_idx" ON "_gallery_albums_v" USING btree ("latest");
  CREATE INDEX "_gallery_albums_v_rels_order_idx" ON "_gallery_albums_v_rels" USING btree ("order");
  CREATE INDEX "_gallery_albums_v_rels_parent_idx" ON "_gallery_albums_v_rels" USING btree ("parent_id");
  CREATE INDEX "_gallery_albums_v_rels_path_idx" ON "_gallery_albums_v_rels" USING btree ("path");
  CREATE INDEX "_gallery_albums_v_rels_media_id_idx" ON "_gallery_albums_v_rels" USING btree ("media_id");
  CREATE INDEX "leadership_photo_idx" ON "leadership" USING btree ("photo_id");
  CREATE INDEX "leadership_updated_at_idx" ON "leadership" USING btree ("updated_at");
  CREATE INDEX "leadership_created_at_idx" ON "leadership" USING btree ("created_at");
  CREATE INDEX "leadership__status_idx" ON "leadership" USING btree ("_status");
  CREATE INDEX "_leadership_v_parent_idx" ON "_leadership_v" USING btree ("parent_id");
  CREATE INDEX "_leadership_v_version_version_photo_idx" ON "_leadership_v" USING btree ("version_photo_id");
  CREATE INDEX "_leadership_v_version_version_updated_at_idx" ON "_leadership_v" USING btree ("version_updated_at");
  CREATE INDEX "_leadership_v_version_version_created_at_idx" ON "_leadership_v" USING btree ("version_created_at");
  CREATE INDEX "_leadership_v_version_version__status_idx" ON "_leadership_v" USING btree ("version__status");
  CREATE INDEX "_leadership_v_created_at_idx" ON "_leadership_v" USING btree ("created_at");
  CREATE INDEX "_leadership_v_updated_at_idx" ON "_leadership_v" USING btree ("updated_at");
  CREATE INDEX "_leadership_v_latest_idx" ON "_leadership_v" USING btree ("latest");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_photo_idx" ON "_testimonials_v" USING btree ("version_photo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "support_applications_reference_idx" ON "support_applications" USING btree ("reference");
  CREATE INDEX "support_applications_submitted_at_idx" ON "support_applications" USING btree ("submitted_at");
  CREATE INDEX "support_applications_status_idx" ON "support_applications" USING btree ("status");
  CREATE INDEX "support_applications_assigned_to_idx" ON "support_applications" USING btree ("assigned_to_id");
  CREATE INDEX "support_applications_updated_at_idx" ON "support_applications" USING btree ("updated_at");
  CREATE INDEX "support_applications_created_at_idx" ON "support_applications" USING btree ("created_at");
  CREATE INDEX "support_applications_rels_order_idx" ON "support_applications_rels" USING btree ("order");
  CREATE INDEX "support_applications_rels_parent_idx" ON "support_applications_rels" USING btree ("parent_id");
  CREATE INDEX "support_applications_rels_path_idx" ON "support_applications_rels" USING btree ("path");
  CREATE INDEX "support_applications_rels_documents_id_idx" ON "support_applications_rels" USING btree ("documents_id");
  CREATE INDEX "beneficiaries_application_idx" ON "beneficiaries" USING btree ("application_id");
  CREATE INDEX "beneficiaries_updated_at_idx" ON "beneficiaries" USING btree ("updated_at");
  CREATE INDEX "beneficiaries_created_at_idx" ON "beneficiaries" USING btree ("created_at");
  CREATE INDEX "case_notes_application_idx" ON "case_notes" USING btree ("application_id");
  CREATE INDEX "case_notes_author_idx" ON "case_notes" USING btree ("author_id");
  CREATE INDEX "case_notes_updated_at_idx" ON "case_notes" USING btree ("updated_at");
  CREATE INDEX "case_notes_created_at_idx" ON "case_notes" USING btree ("created_at");
  CREATE INDEX "documents_application_idx" ON "documents" USING btree ("application_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "volunteer_applications_reference_idx" ON "volunteer_applications" USING btree ("reference");
  CREATE INDEX "volunteer_applications_submitted_at_idx" ON "volunteer_applications" USING btree ("submitted_at");
  CREATE INDEX "volunteer_applications_updated_at_idx" ON "volunteer_applications" USING btree ("updated_at");
  CREATE INDEX "volunteer_applications_created_at_idx" ON "volunteer_applications" USING btree ("created_at");
  CREATE UNIQUE INDEX "in_kind_offers_reference_idx" ON "in_kind_offers" USING btree ("reference");
  CREATE INDEX "in_kind_offers_submitted_at_idx" ON "in_kind_offers" USING btree ("submitted_at");
  CREATE INDEX "in_kind_offers_updated_at_idx" ON "in_kind_offers" USING btree ("updated_at");
  CREATE INDEX "in_kind_offers_created_at_idx" ON "in_kind_offers" USING btree ("created_at");
  CREATE UNIQUE INDEX "partner_enquiries_reference_idx" ON "partner_enquiries" USING btree ("reference");
  CREATE INDEX "partner_enquiries_submitted_at_idx" ON "partner_enquiries" USING btree ("submitted_at");
  CREATE INDEX "partner_enquiries_updated_at_idx" ON "partner_enquiries" USING btree ("updated_at");
  CREATE INDEX "partner_enquiries_created_at_idx" ON "partner_enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "contact_messages_reference_idx" ON "contact_messages" USING btree ("reference");
  CREATE INDEX "contact_messages_submitted_at_idx" ON "contact_messages" USING btree ("submitted_at");
  CREATE INDEX "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
  CREATE INDEX "contact_messages_created_at_idx" ON "contact_messages" USING btree ("created_at");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "donors_email_idx" ON "donors" USING btree ("email");
  CREATE INDEX "donors_updated_at_idx" ON "donors" USING btree ("updated_at");
  CREATE INDEX "donors_created_at_idx" ON "donors" USING btree ("created_at");
  CREATE UNIQUE INDEX "campaigns_slug_idx" ON "campaigns" USING btree ("slug");
  CREATE INDEX "campaigns_updated_at_idx" ON "campaigns" USING btree ("updated_at");
  CREATE INDEX "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");
  CREATE UNIQUE INDEX "donations_receipt_number_idx" ON "donations" USING btree ("receipt_number");
  CREATE INDEX "donations_donor_idx" ON "donations" USING btree ("donor_id");
  CREATE INDEX "donations_campaign_idx" ON "donations" USING btree ("campaign_id");
  CREATE INDEX "donations_programme_idx" ON "donations" USING btree ("programme_id");
  CREATE INDEX "donations_provider_reference_idx" ON "donations" USING btree ("provider_reference");
  CREATE INDEX "donations_updated_at_idx" ON "donations" USING btree ("updated_at");
  CREATE INDEX "donations_created_at_idx" ON "donations" USING btree ("created_at");
  CREATE INDEX "payment_transactions_provider_reference_idx" ON "payment_transactions" USING btree ("provider_reference");
  CREATE INDEX "payment_transactions_donation_idx" ON "payment_transactions" USING btree ("donation_id");
  CREATE INDEX "payment_transactions_updated_at_idx" ON "payment_transactions" USING btree ("updated_at");
  CREATE INDEX "payment_transactions_created_at_idx" ON "payment_transactions" USING btree ("created_at");
  CREATE INDEX "webhook_events_provider_idx" ON "webhook_events" USING btree ("provider");
  CREATE INDEX "webhook_events_provider_event_id_idx" ON "webhook_events" USING btree ("provider_event_id");
  CREATE INDEX "webhook_events_updated_at_idx" ON "webhook_events" USING btree ("updated_at");
  CREATE INDEX "webhook_events_created_at_idx" ON "webhook_events" USING btree ("created_at");
  CREATE UNIQUE INDEX "provider_providerEventId_idx" ON "webhook_events" USING btree ("provider","provider_event_id");
  CREATE INDEX "email_templates_updated_at_idx" ON "email_templates" USING btree ("updated_at");
  CREATE INDEX "email_templates_created_at_idx" ON "email_templates" USING btree ("created_at");
  CREATE INDEX "notifications_recipient_idx" ON "notifications" USING btree ("recipient_id");
  CREATE INDEX "notifications_updated_at_idx" ON "notifications" USING btree ("updated_at");
  CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "activity_log_actor_idx" ON "activity_log" USING btree ("actor_id");
  CREATE INDEX "activity_log_occurred_at_idx" ON "activity_log" USING btree ("occurred_at");
  CREATE INDEX "activity_log_updated_at_idx" ON "activity_log" USING btree ("updated_at");
  CREATE INDEX "activity_log_created_at_idx" ON "activity_log" USING btree ("created_at");
  CREATE INDEX "email_log_sent_at_idx" ON "email_log" USING btree ("sent_at");
  CREATE INDEX "email_log_updated_at_idx" ON "email_log" USING btree ("updated_at");
  CREATE INDEX "email_log_created_at_idx" ON "email_log" USING btree ("created_at");
  CREATE INDEX "audit_log_actor_idx" ON "audit_log" USING btree ("actor_id");
  CREATE INDEX "audit_log_occurred_at_idx" ON "audit_log" USING btree ("occurred_at");
  CREATE INDEX "audit_log_updated_at_idx" ON "audit_log" USING btree ("updated_at");
  CREATE INDEX "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at");
  CREATE INDEX "audit_log_texts_order_parent" ON "audit_log_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_admin_users_id_idx" ON "payload_locked_documents_rels" USING btree ("admin_users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");
  CREATE INDEX "payload_locked_documents_rels_impact_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("impact_stories_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_albums_id");
  CREATE INDEX "payload_locked_documents_rels_leadership_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_support_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("support_applications_id");
  CREATE INDEX "payload_locked_documents_rels_beneficiaries_id_idx" ON "payload_locked_documents_rels" USING btree ("beneficiaries_id");
  CREATE INDEX "payload_locked_documents_rels_case_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("case_notes_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_volunteer_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteer_applications_id");
  CREATE INDEX "payload_locked_documents_rels_in_kind_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("in_kind_offers_id");
  CREATE INDEX "payload_locked_documents_rels_partner_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_donors_id_idx" ON "payload_locked_documents_rels" USING btree ("donors_id");
  CREATE INDEX "payload_locked_documents_rels_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("campaigns_id");
  CREATE INDEX "payload_locked_documents_rels_donations_id_idx" ON "payload_locked_documents_rels" USING btree ("donations_id");
  CREATE INDEX "payload_locked_documents_rels_payment_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("payment_transactions_id");
  CREATE INDEX "payload_locked_documents_rels_webhook_events_id_idx" ON "payload_locked_documents_rels" USING btree ("webhook_events_id");
  CREATE INDEX "payload_locked_documents_rels_email_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("email_templates_id");
  CREATE INDEX "payload_locked_documents_rels_notifications_id_idx" ON "payload_locked_documents_rels" USING btree ("notifications_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_activity_log_id_idx" ON "payload_locked_documents_rels" USING btree ("activity_log_id");
  CREATE INDEX "payload_locked_documents_rels_email_log_id_idx" ON "payload_locked_documents_rels" USING btree ("email_log_id");
  CREATE INDEX "payload_locked_documents_rels_audit_log_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_log_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_admin_users_id_idx" ON "payload_preferences_rels" USING btree ("admin_users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_header_order_idx" ON "navigation_header" USING btree ("_order");
  CREATE INDEX "navigation_header_parent_id_idx" ON "navigation_header" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_order_idx" ON "navigation_footer" USING btree ("_order");
  CREATE INDEX "navigation_footer_parent_id_idx" ON "navigation_footer" USING btree ("_parent_id");
  CREATE INDEX "seo_defaults_open_graph_image_idx" ON "seo_defaults" USING btree ("open_graph_image_id");
  CREATE INDEX "statistics_manual_figures_order_idx" ON "statistics_manual_figures" USING btree ("_order");
  CREATE INDEX "statistics_manual_figures_parent_id_idx" ON "statistics_manual_figures" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "admin_users_sessions" CASCADE;
  DROP TABLE "admin_users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_texts" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "programmes_texts" CASCADE;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "_programmes_v" CASCADE;
  DROP TABLE "_programmes_v_texts" CASCADE;
  DROP TABLE "_programmes_v_rels" CASCADE;
  DROP TABLE "impact_stories" CASCADE;
  DROP TABLE "impact_stories_rels" CASCADE;
  DROP TABLE "_impact_stories_v" CASCADE;
  DROP TABLE "_impact_stories_v_rels" CASCADE;
  DROP TABLE "gallery_albums" CASCADE;
  DROP TABLE "gallery_albums_rels" CASCADE;
  DROP TABLE "_gallery_albums_v" CASCADE;
  DROP TABLE "_gallery_albums_v_rels" CASCADE;
  DROP TABLE "leadership" CASCADE;
  DROP TABLE "_leadership_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "support_applications" CASCADE;
  DROP TABLE "support_applications_rels" CASCADE;
  DROP TABLE "beneficiaries" CASCADE;
  DROP TABLE "case_notes" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "volunteer_applications" CASCADE;
  DROP TABLE "in_kind_offers" CASCADE;
  DROP TABLE "partner_enquiries" CASCADE;
  DROP TABLE "contact_messages" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "donors" CASCADE;
  DROP TABLE "campaigns" CASCADE;
  DROP TABLE "donations" CASCADE;
  DROP TABLE "payment_transactions" CASCADE;
  DROP TABLE "webhook_events" CASCADE;
  DROP TABLE "email_templates" CASCADE;
  DROP TABLE "notifications" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "activity_log" CASCADE;
  DROP TABLE "email_log" CASCADE;
  DROP TABLE "audit_log" CASCADE;
  DROP TABLE "audit_log_texts" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_header" CASCADE;
  DROP TABLE "navigation_footer" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "foundation" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "statistics_manual_figures" CASCADE;
  DROP TABLE "statistics_manual" CASCADE;
  DROP TYPE "public"."enum_admin_users_role";
  DROP TYPE "public"."enum_admin_users_status";
  DROP TYPE "public"."enum_programmes_status";
  DROP TYPE "public"."enum__programmes_v_version_status";
  DROP TYPE "public"."enum_impact_stories_status";
  DROP TYPE "public"."enum__impact_stories_v_version_status";
  DROP TYPE "public"."enum_gallery_albums_status";
  DROP TYPE "public"."enum__gallery_albums_v_version_status";
  DROP TYPE "public"."enum_leadership_status";
  DROP TYPE "public"."enum__leadership_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_support_applications_status";
  DROP TYPE "public"."enum_volunteer_applications_status";
  DROP TYPE "public"."enum_in_kind_offers_status";
  DROP TYPE "public"."enum_partner_enquiries_status";
  DROP TYPE "public"."enum_contact_messages_status";
  DROP TYPE "public"."enum_subscribers_status";
  DROP TYPE "public"."enum_donations_status";
  DROP TYPE "public"."enum_payment_transactions_status";
  DROP TYPE "public"."enum_audit_log_action";`)
}
