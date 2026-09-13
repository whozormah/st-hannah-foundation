import { notFound } from "next/navigation";

/* With separate root layouts for the website and the admin, an address that
   matches no route has no layout to render in. This sends every such address
   to the website's not-found page, inside the site's layout, with a 404
   status. More specific routes — every page, /admin, /api — always win. */
export default function CatchAll() {
  notFound();
}
