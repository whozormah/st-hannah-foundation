import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local files under /public are optimised by Next at request time.
    // If this site is ever deployed to a purely static host, set
    // `unoptimized: true` again, as optimisation needs a server.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
