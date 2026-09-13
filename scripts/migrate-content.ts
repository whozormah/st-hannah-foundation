/* Moves the website's content from public/data into the CMS, one collection
   at a time (MIG-01).

   Usage:  ALLOW_MIGRATE=1 npx tsx scripts/migrate-content.ts testimonials

   - MIG-02: after each collection, the number of published records must equal
     the number in the source file, or the script fails loudly.
   - MIG-05: re-runnable. Records are matched on a natural key and updated,
     never duplicated.
   - MIG-07: nothing is invented. A source gap is reported, not filled.

   Re-running overwrites a record with the file's version, so once editors
   have started working in the CMS the files are retired (MIG-06) and this is
   not run again. ALLOW_MIGRATE guards against running it by accident. */
import { readFileSync } from "fs";
import path from "path";

import { getPayload, type Payload } from "payload";

import config from "../payload.config";

const DATA = path.join(process.cwd(), "public", "data");
const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(path.join(DATA, file), "utf8")) as T;

// Writes made here are not website visits; there is no cache to refresh.
const context = { skipRevalidate: true };

type Migrator = (payload: Payload) => Promise<{ source: number; published: number }>;

const migrators: Record<string, Migrator> = {
  async testimonials(payload) {
    const source = readJson<{ name: string; role: string; text: string }[]>(
      "testimonials.json",
    );

    for (const [index, item] of source.entries()) {
      const data = {
        name: item.name,
        role: item.role,
        quote: item.text,
        order: index + 1,
        _status: "published" as const,
      };

      const existing = await payload.find({
        collection: "testimonials",
        where: { name: { equals: item.name } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs[0]) {
        await payload.update({
          collection: "testimonials",
          id: existing.docs[0].id,
          data,
          overrideAccess: true,
          context,
        });
      } else {
        await payload.create({
          collection: "testimonials",
          data,
          overrideAccess: true,
          context,
        });
      }
    }

    const { totalDocs } = await payload.count({
      collection: "testimonials",
      where: { _status: { equals: "published" } },
      overrideAccess: true,
    });

    return { source: source.length, published: totalDocs };
  },
};

async function main() {
  if (!process.env.ALLOW_MIGRATE) {
    throw new Error(
      "Refusing to run: set ALLOW_MIGRATE=1. Re-running overwrites CMS edits with the files' content.",
    );
  }

  const requested = process.argv.slice(2);
  const unknown = requested.filter((name) => !(name in migrators));

  if (!requested.length || unknown.length) {
    throw new Error(
      `Name the collections to migrate. Available: ${Object.keys(migrators).join(", ")}` +
        (unknown.length ? `. Unknown: ${unknown.join(", ")}` : ""),
    );
  }

  const payload = await getPayload({ config });
  let failed = false;

  for (const name of requested) {
    const { source, published } = await migrators[name](payload);
    const ok = source === published;

    if (!ok) failed = true;

    console.log(
      `${ok ? "PASS" : "FAIL"}  ${name}: ${published} published in the CMS, ${source} in the source file`,
    );
  }

  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
