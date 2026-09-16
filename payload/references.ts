import { APIError, type CollectionBeforeDeleteHook, type CollectionConfig, type Field } from "payload";

/* CNT-08: content that other records still use cannot be deleted, and the
   refusal names where it is used, so an editor can remove it from there
   first. Without this, deleting an image would silently leave a blank space
   on every page that showed it.

   Applied to website content. Staff accounts, applications and donations
   are records the audit trail and the retention rules decide about, not
   this. */

/** Every path in `fields` holding a reference to the `target` collection. */
function referencePaths(target: string, fields: Field[], prefix = ""): string[] {
  const paths: string[] = [];

  for (const field of fields) {
    const name = "name" in field && field.name ? field.name : "";
    const path = name ? (prefix ? `${prefix}.${name}` : name) : prefix;

    if (field.type === "upload" || field.type === "relationship") {
      const targets = Array.isArray(field.relationTo) ? field.relationTo : [field.relationTo];

      if (targets.includes(target as never)) paths.push(path);
    } else if (
      field.type === "array" ||
      field.type === "group" ||
      field.type === "row" ||
      field.type === "collapsible"
    ) {
      paths.push(...referencePaths(target, field.fields, path));
    } else if (field.type === "tabs") {
      for (const tab of field.tabs) {
        const tabPath = "name" in tab && tab.name ? (prefix ? `${prefix}.${tab.name}` : tab.name) : prefix;

        paths.push(...referencePaths(target, tab.fields, tabPath));
      }
    } else if (field.type === "blocks") {
      for (const block of field.blocks ?? []) paths.push(...referencePaths(target, block.fields, path));
    }
  }

  return paths;
}

/** Whether `fields` contain blocks anywhere. */
function hasBlocks(fields: Field[]): boolean {
  return fields.some((field) => {
    if (field.type === "blocks") return true;
    if (field.type === "tabs") return field.tabs.some((tab) => hasBlocks(tab.fields));

    return "fields" in field && Array.isArray(field.fields) && hasBlocks(field.fields);
  });
}

/** The values at a dotted path in a document, through arrays and blocks. */
function valuesAt(data: unknown, path: string[]): unknown[] {
  if (Array.isArray(data)) return data.flatMap((item) => valuesAt(item, path));
  if (!path.length) return [data];
  if (!data || typeof data !== "object") return [];

  return valuesAt((data as Record<string, unknown>)[path[0]], path.slice(1));
}

const idOf = (value: unknown) =>
  value && typeof value === "object" ? (value as { id?: unknown }).id : value;

const singular = (labels: unknown, fallback: string) => {
  const value = (labels as { singular?: unknown } | undefined)?.singular;

  return typeof value === "string" ? value : fallback;
};

export const blockDeleteWhenReferenced: CollectionBeforeDeleteHook = async ({ collection, id, req }) => {
  const { payload } = req;
  const named: string[] = [];
  let total = 0;

  for (const other of payload.config.collections) {
    if (other.slug.startsWith("payload-")) continue;

    const paths = [...new Set(referencePaths(collection.slug, other.fields))];

    if (!paths.length) continue;

    const where = { or: paths.map((path) => ({ [path]: { equals: id } })) };
    const drafts = Boolean(typeof other.versions === "object" && other.versions?.drafts);

    /* Through blocks, a database condition cannot be trusted: two block types
       with a field of the same name share one path, and the database checks
       only one of them (or, given the path twice, fails). Records built from
       blocks (the homepage) are few, so they are read and checked here
       instead (CR-024). */
    const throughBlocks = hasBlocks(other.fields);
    const uses = (doc: Record<string, unknown>) =>
      paths.some((path) => valuesAt(doc, path.split(".")).some((value) => String(idOf(value)) === String(id)));

    /* Both what is published and the latest drafts: a published page may use
       an image a newer draft has dropped, and a draft may use one the
       published page does not. Each record is counted once. */
    const using = async (asUser: boolean) => {
      const access = asUser ? { overrideAccess: false, user: req.user } : { overrideAccess: true };
      const reads = [false, ...(drafts ? [true] : [])].map((draft) =>
        payload.find({
          collection: other.slug,
          ...(throughBlocks ? {} : { where }),
          depth: 0,
          limit: 100,
          draft,
          pagination: false,
          req,
          ...access,
        }),
      );
      const docs = new Map<string, Record<string, unknown>>();

      for (const result of await Promise.all(reads)) {
        for (const doc of result.docs as unknown as Record<string, unknown>[]) {
          if (!throughBlocks || uses(doc)) docs.set(String(doc.id), doc);
        }
      }

      return [...docs.values()];
    };

    const all = await using(false);

    if (!all.length) continue;

    total += all.length;

    // Only records this person may see are named; the rest are counted.
    const titleField = other.admin?.useAsTitle;

    for (const doc of await using(true)) {
      const title = titleField && doc[titleField] ? String(doc[titleField]) : `#${doc.id}`;

      named.push(`${singular(other.labels, other.slug)} "${title}"`);
    }
  }

  for (const global of payload.config.globals) {
    const paths = referencePaths(collection.slug, global.fields);

    if (!paths.length) continue;

    const data = await payload.findGlobal({ slug: global.slug, depth: 0, overrideAccess: true, req });
    const uses = paths.some((path) =>
      valuesAt(data, path.split(".")).some((value) => String(idOf(value)) === String(id)),
    );

    if (uses) {
      total += 1;
      named.push(typeof global.label === "string" ? global.label : global.slug);
    }
  }

  if (!total) return;

  const hidden = total - named.length;
  const where =
    named.slice(0, 5).join(", ") +
    (named.length > 5 ? ` and ${named.length - 5} more` : "") +
    (hidden > 0 ? `${named.length ? ", and " : ""}${hidden} record${hidden === 1 ? "" : "s"} you cannot see` : "");

  throw new APIError(
    `This ${singular(collection.labels, collection.slug).toLowerCase()} is still used, so it cannot be deleted. It is used by: ${where}. Remove it from there first.`,
    409,
    undefined,
    true,
  );
};

/** Website content (the admin's Content section) gets the protection. */
export const addDeleteProtection = (collection: CollectionConfig): CollectionConfig =>
  collection.admin?.group === "Content"
    ? {
        ...collection,
        hooks: {
          ...collection.hooks,
          beforeDelete: [...(collection.hooks?.beforeDelete ?? []), blockDeleteWhenReferenced],
        },
      }
    : collection;
