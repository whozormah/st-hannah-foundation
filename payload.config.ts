import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";

import { AdminUsers } from "./payload/collections/adminUsers";
import { contentCollections } from "./payload/collections/content";
import { operationsCollections } from "./payload/collections/operations";
import { fundraisingCollections } from "./payload/collections/fundraising";
import { systemCollections } from "./payload/collections/system";
import { globals } from "./payload/globals";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/* MED-01: media belongs in Cloudflare R2, never on the droplet. The adapter
   is enabled only when the bucket is configured, so local development and the
   test suite run without cloud credentials. Production must set these. */
const storage =
  process.env.R2_BUCKET_PUBLIC && process.env.R2_ACCOUNT_ID
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.R2_BUCKET_PUBLIC,
          config: {
            endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            region: "auto",
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
              secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
            },
          },
        }),
      ]
    : [];

export default buildConfig({
  admin: {
    user: AdminUsers.slug,
    importMap: { baseDir: dirname },
  },
  collections: [
    AdminUsers,
    ...contentCollections,
    ...operationsCollections,
    ...fundraisingCollections,
    ...systemCollections,
  ],
  globals,
  plugins: storage,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL ?? "" },
    // DEP-01/DEP-05: schema changes ship as reviewed, forward-only migrations
    // that run before the new container serves traffic — never an implicit
    // push against a live database.
    push: false,
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  telemetry: false,
});
