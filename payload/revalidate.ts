import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

/* PUB-04 and ARC-02: publishing content refreshes the website without a
   deployment. Each content collection invalidates its own cache tag when a
   document changes or is deleted; the next visitor gets the new content.

   "max" is the profile the Next.js 16 docs recommend: stale-while-revalidate,
   so no visitor ever waits on the database. The single-argument form of
   revalidateTag is deprecated in this version.

   Outside a Next.js request — the content migration script, for instance —
   there is no cache to invalidate, so the call is skipped rather than
   failing the write. Callers can also opt out with context.skipRevalidate. */
function refresh(tag: string, context: Record<string, unknown> | undefined) {
  if (context?.skipRevalidate) return;

  try {
    revalidateTag(tag, "max");
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
