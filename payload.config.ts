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

/* MED-01 and ARC-04: nothing uploaded lives on the droplet. Two buckets,
   because the two kinds of file have opposite rules:

   - site media is public, served through the CDN;
   - files that arrive with a submission (the in-kind photograph) are private
     and reachable only through a short-lived signed URL (SEC-07), after the
     collection's own read rule has passed.

   The adapters switch on only when R2 is configured, so local development and
   the test suite run without cloud credentials. Production must set these;
   without them uploads fall back to local disk, which a redeploy destroys. */
const r2Config = {
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
};

const r2Configured = Boolean(process.env.R2_ACCOUNT_ID);

// Said loudly, because the failure is silent: without R2, a production
// server writes uploads to a disk the next deployment throws away.
if (process.env.NODE_ENV === "production" && !r2Configured) {
  console.warn(
    "[storage] R2 is not configured: uploads, including in-kind photographs, " +
      "are being written to local disk and will be lost on redeploy (MED-01).",
  );
}

const storage = [
  ...(r2Configured && process.env.R2_BUCKET_PUBLIC
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.R2_BUCKET_PUBLIC,
          config: r2Config,
        }),
      ]
    : []),
  ...(r2Configured && process.env.R2_BUCKET_PRIVATE
    ? [
        s3Storage({
          collections: {
            "submission-files": {
              // SEC-07: a link that stops working after five minutes.
              signedDownloads: { expiresIn: 300 },
            },
          },
          bucket: process.env.R2_BUCKET_PRIVATE,
          config: r2Config,
        }),
      ]
    : []),
];

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
