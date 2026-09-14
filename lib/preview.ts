import { cache } from "react";
import { draftMode, headers } from "next/headers";
import { getPayload } from "payload";

import config from "@payload-config";

import type { Role } from "@/payload/access";

/* Previewing unpublished changes (CNT-05; section 9.2: "live preview in a new
   tab via draft mode").

   The roles that edit content may preview it (section 8.2). Draft mode alone
   is not enough: its cookie could be copied from a shared computer, so the
   request must also carry a signed-in staff session in one of those roles.
   A visitor never sees a draft, cookie or not. */
const PREVIEW_ROLES: Role[] = ["owner", "administrator", "content"];

export function canPreview(user: unknown): boolean {
  const role = (user as { role?: unknown } | null | undefined)?.role;

  return PREVIEW_ROLES.includes(role as Role);
}

/** Once per request: is a content editor previewing? */
export const isPreviewing = cache(async (): Promise<boolean> => {
  try {
    if (!(await draftMode()).isEnabled) return false;
  } catch {
    // Outside a request (a build step): nobody is previewing.
    return false;
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  return canPreview(user);
});

/** A path on this site only, so a preview link cannot send anyone elsewhere. */
export function localPath(value: string | null): string | null {
  if (!value || !value.startsWith("/") || value.includes("\\")) return null;

  const base = "http://site.invalid";
  const url = new URL(value, base);

  return url.origin === base ? `${url.pathname}${url.search}` : null;
}
