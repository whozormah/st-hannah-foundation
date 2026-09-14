import { permanentRedirect } from "next/navigation";
import { getPayload } from "payload";

import config from "@payload-config";

import { localPath } from "./preview";

/* PUB-01: an address that changed keeps working, through the Redirects
   recorded in the admin — created automatically when a published slug
   changes (CNT-07), or by an Administrator.

   Checked only when an address would otherwise not be found, so a live page
   always wins and ordinary visits cost nothing.

   Sent as 308, which Next.js uses for permanent redirects from a page: the
   method-preserving form of 301, treated the same by browsers and search
   engines. A literal 301 would need Next's proxy, which its documentation
   advises against for a database lookup like this one. */
export async function followRedirect(path: string): Promise<void> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "redirects",
    where: { from: { equals: path } },
    limit: 1,
    depth: 0,
  });

  const to = String((docs[0] as { to?: unknown } | undefined)?.to ?? "");
  const target = localPath(to) ?? (/^https:\/\/[^/]/.test(to) ? to : null);

  if (target && target !== path) permanentRedirect(target);
}
