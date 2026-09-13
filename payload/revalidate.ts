import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

/* PUB-04 and ARC-02: publishing content refreshes the website without a
   deployment. Each kind of content invalidates its own cache tag when it
   changes or is deleted, and the next visitor gets the new content.

   `{ expire: 0 }`, not the "max" profile the Next.js docs recommend for most
   sites. "max" is stale-while-revalidate: the first visitor after a publish
   is served the old version while the new one loads. On a site this quiet
   that visitor is usually the editor checking their change, and the old
   version could be hours old. With `expire: 0` that one request waits for
   the database instead, which the docs give as the pattern for route
   handlers — where Payload saves run — that need data expired at once.
   (`updateTag` does the same but works only in Server Actions.)

   Outside a Next.js request — the content migration script, for instance —
   there is no cache to invalidate, so the call is skipped rather than
   failing the write. Callers can also opt out with context.skipRevalidate. */
export function refresh(tag: string, context: Record<string, unknown> | undefined) {
  if (context?.skipRevalidate) return;

  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Not inside a Next.js request: nothing is cached here to invalidate.
  }
}

export const revalidateOnChange =
  (tag: string): CollectionAfterChangeHook =>
  ({ doc, context }) => {
    refresh(tag, context);
    return doc;
  };

export const revalidateOnDelete =
  (tag: string): CollectionAfterDeleteHook =>
  ({ doc, context }) => {
    refresh(tag, context);
    return doc;
  };
