import path from "path";

import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // The data cache lives in memory only, and publishing deletes cached copies,
  // so a restart can never bring back content published since (see the
  // handler for how that happened with the default).
  cacheHandler: path.resolve(process.cwd(), "cache-handler.cjs"),
  cacheMaxMemorySize: 0,
  images: {
    // Local files under /public are optimised by Next at request time.
    // If this site is ever deployed to a purely static host, set
    // `unoptimized: true` again, as optimisation needs a server.
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig);
