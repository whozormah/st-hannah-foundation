import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
  Field,
} from "payload";

/* CNT-07: a slug is unique per collection, filled in from the title, editable,
   and changing it once published leaves the old address working — a
   redirect is created automatically (PUB-01). */

const SLUG_FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "Widows' Empowerment & Support" → "widows-empowerment-and-support". */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

type Doc = { slug?: unknown; _status?: unknown } | undefined;

/* The public address of each kind of record with a page (PUB-01). */
const PAGE_BASE: Record<string, string> = {
  programmes: "/programs",
  "impact-stories": "/impact-stories",
};

/* Payload's previousDoc is the latest version, which after a draft save is
   the draft. What matters is the address that was live, so just before a
   publish is written, the published record is read and its slug remembered
   for the hook below. A draft save leaves the published record untouched.

   Remembered against the request and the record, not in Payload's context:
   the read passes the request on, and that replaces the request's context
   object partway through the operation, losing anything put in it. */
const liveSlugs = new WeakMap<object, Map<string, string>>();

const rememberLiveSlug: CollectionBeforeChangeHook = async ({
  collection,
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (operation !== "update" || !originalDoc?.id || (data as Doc)?._status !== "published") {
    return data;
  }

  const live = (await req.payload
    .findByID({
      collection: collection.slug,
      id: originalDoc.id,
      depth: 0,
      draft: false,
      overrideAccess: true,
      req,
    })
    .catch(() => null)) as Doc | null;

  if (live?._status === "published" && typeof live.slug === "string") {
    const forRequest = liveSlugs.get(req) ?? new Map<string, string>();

    forRequest.set(String(originalDoc.id), live.slug);
    liveSlugs.set(req, forRequest);
  }

  return data;
};

/* When a published record's slug changes, its old address redirects to the
   new one. Drafts change nothing on the website, so only publishing counts.
   Existing redirects to the old address are pointed at the new one, so a
   visitor never follows a chain, and the new address never redirects away. */
const redirectOnChange =
  (base: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req }) => {
    const after = doc as Doc;
    const forRequest = liveSlugs.get(req);
    const was = forRequest?.get(String((doc as { id?: unknown }).id)) ?? "";
    const now = typeof after?.slug === "string" ? after.slug : "";

    forRequest?.delete(String((doc as { id?: unknown }).id));

    if (operation !== "update" || !was || !now || was === now || after?._status !== "published") {
      return doc;
    }

    const from = `${base}/${was}`;
    const to = `${base}/${now}`;
    const payload = req.payload;

    // The new address is live now: nothing may redirect away from it.
    await payload.delete({
      collection: "redirects",
      where: { from: { equals: to } },
      overrideAccess: true,
      req,
    });

    // Older addresses that led to the old one now lead straight here.
    await payload.update({
      collection: "redirects",
      where: { to: { equals: from } },
      data: { to },
      overrideAccess: true,
      req,
    });

    const existing = await payload.find({
      collection: "redirects",
      where: { from: { equals: from } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      req,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "redirects",
        id: existing.docs[0].id,
        data: { to },
        overrideAccess: true,
        req,
      });
    } else {
      await payload.create({
        collection: "redirects",
        data: { from, to },
        overrideAccess: true,
        req,
      });
    }

    return doc;
  };

/** Records with a page get an automatic redirect when their address changes. */
export const addSlugRedirects = (collection: CollectionConfig): CollectionConfig => {
  const base = PAGE_BASE[collection.slug];

  if (!base) return collection;

  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      beforeChange: [...(collection.hooks?.beforeChange ?? []), rememberLiveSlug],
      afterChange: [...(collection.hooks?.afterChange ?? []), redirectOnChange(base)],
    },
  };
};

export const slugField = ({ from }: { from: string }): Field => ({
  name: "slug",
  type: "text",
  unique: true,
  index: true,
  validate: (value: unknown) =>
    !value ||
    (typeof value === "string" && SLUG_FORMAT.test(value)) ||
    "Use lowercase letters and numbers joined by hyphens, e.g. medical-aid.",
  hooks: {
    // Filled in from the title when left empty; what an editor types is
    // tidied into the same form.
    beforeValidate: [
      ({ value, data }) => {
        const typed = typeof value === "string" ? value.trim() : "";
        const source = typed || String((data as Record<string, unknown> | undefined)?.[from] ?? "");

        return source ? slugify(source) : value;
      },
    ],
  },
});
