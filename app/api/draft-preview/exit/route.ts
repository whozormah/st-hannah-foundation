import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { localPath } from "@/lib/preview";

/* "Exit preview": back to the published website, on the same page. */
export async function GET(request: Request) {
  (await draftMode()).disable();

  const referer = request.headers.get("referer");
  const from = referer && new URL(referer).host === new URL(request.url).host
    ? localPath(new URL(referer).pathname)
    : null;

  redirect(from ?? "/");
}
