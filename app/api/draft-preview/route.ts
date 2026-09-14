import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import config from "@payload-config";

import { canPreview, localPath } from "@/lib/preview";

/* The admin's Preview button opens this in a new tab. It turns on draft mode
   for a signed-in content editor and shows them the page, unpublished
   changes included (CNT-05). The session comes from the admin's own cookie,
   so no secret travels in the link. */
export async function GET(request: Request) {
  const path = localPath(new URL(request.url).searchParams.get("path"));

  if (!path) {
    return new Response("A preview must be of a page on this website.", { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });

  if (!user) {
    return new Response("Sign in to the admin to preview unpublished changes.", { status: 401 });
  }

  if (!canPreview(user)) {
    return new Response("Your role does not include editing website content.", { status: 403 });
  }

  (await draftMode()).enable();
  redirect(path);
}
