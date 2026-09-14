import HomeBlocks from "@/components/blocks/HomeBlocks";

import { getHomepage } from "@/lib/cms";

export default async function HomePage() {
  const blocks = await getHomepage();

  return (
    <>
      {/* The page's one heading for screen readers. It lives here, not in the
          hero, so removing or repeating the hero section cannot leave the
          page with none or two (PUB-07). */}
      <h1 className="sr-only">
        St. Hannah Foundation — Restoring Hope, Empowering Lives and
        Transforming Communities
      </h1>

      <HomeBlocks blocks={blocks} />
    </>
  );
}
