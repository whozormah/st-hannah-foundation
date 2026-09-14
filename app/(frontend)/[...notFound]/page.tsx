import { notFound } from "next/navigation";

import { followRedirect } from "@/lib/redirects";

/* With separate root layouts for the website and the admin, an address that
   matches no route has no layout to render in. This sends every such address
   to the website's not-found page, inside the site's layout, with a 404
   status. More specific routes — every page, /admin, /api — always win.

   First, an address recorded in Redirects is sent on to its new home
   (PUB-01). */
export default async function CatchAll({
  params,
}: {
  params: Promise<{ notFound: string[] }>;
}) {
  const { notFound: segments } = await params;

  await followRedirect(`/${segments.join("/")}`);
  notFound();
}
