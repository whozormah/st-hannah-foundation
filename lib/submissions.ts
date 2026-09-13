import { getPayload } from "payload";
import type { CollectionSlug } from "payload";

import config from "@payload-config";
import legal from "@/public/data/legal.json";

/* Persistence for the public forms.

   OPS-01: every submission is written to the database *before* any email is
   attempted, and EML-06: a failed email never loses or rolls back what was
   saved. The endpoints therefore persist first and treat sending as a
   best-effort step afterwards. */

export async function getPayloadClient() {
  return getPayload({ config });
}

/** The privacy policy version the submitter accepted, recorded with every
    submission (PRV-03). */
export function consentMetadata() {
  return {
    consentVersion: legal.privacy.version,
    consentAt: new Date().toISOString(),
  };
}

/* A reference number, sequential within its prefix (OPS-04).

   One statement: insert the counter or increment it, and return the new
   value. Two submissions arriving at the same moment cannot be given the
   same number, because the database resolves the conflict, not this code. */
export async function nextReference(prefix: string): Promise<string> {
  const payload = await getPayloadClient();

  const { rows } = await payload.db.pool.query(
    `INSERT INTO reference_counters (prefix, value, updated_at, created_at)
     VALUES ($1, 1, now(), now())
     ON CONFLICT (prefix)
     DO UPDATE SET value = reference_counters.value + 1, updated_at = now()
     RETURNING value`,
    [prefix],
  );

  const value = Number(rows[0]?.value ?? 0);

  if (!value) {
    throw new Error(`could not allocate a reference for ${prefix}`);
  }

  return `${prefix}-${String(value).padStart(6, "0")}`;
}

/** Writes a submission. Public submissions have no signed-in user, so access
    control is bypassed deliberately here and nowhere else. */
export async function persistSubmission<T extends Record<string, unknown>>(
  collection: CollectionSlug,
  data: T,
) {
  const payload = await getPayloadClient();

  return payload.create({
    collection,
    overrideAccess: true,
    data: {
      ...data,
      ...consentMetadata(),
      submittedAt: new Date().toISOString(),
    } as never,
  });
}

/* The in-kind photograph (OPS-03). The browser sends it as a data URL, which
   is decoded here and stored in the private submission-files collection.

   MED-03/SEC-08: the type is allow-listed and the size capped, and the stored
   name is generated from the reference — the uploader's filename is never
   used on disk or in a URL. A rejected image is logged and returns null: the
   donor must not lose their submission because a photo failed. */
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};

export async function storeSubmissionPhoto(
  dataUrl: unknown,
  reference: string,
): Promise<number | string | null> {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) return null;

  try {
    const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/);

    if (!match) throw new Error("not a base64 data URL");

    const [, mimetype, encoded] = match;
    const extension = ALLOWED_PHOTO_TYPES[mimetype];

    if (!extension) throw new Error(`type not allowed: ${mimetype}`);

    const data = Buffer.from(encoded, "base64");

    if (data.byteLength > MAX_PHOTO_BYTES) {
      throw new Error(`too large: ${data.byteLength} bytes`);
    }

    const payload = await getPayloadClient();

    const created = await payload.create({
      collection: "submission-files",
      overrideAccess: true,
      data: { submittedWith: reference },
      file: {
        data,
        mimetype,
        name: `${reference}.${extension}`,
        size: data.byteLength,
      },
    });

    return created.id;
  } catch (error) {
    console.error(`[in-kind] photo rejected for ${reference}:`, error);

    return null;
  }
}

/* Sends the confirmation emails without letting a failure reach the
   submitter as an error: the submission is already safe (OPS-01, EML-06).
   The failure is logged for staff. The email log itself arrives in Phase 5. */
export async function deliverNotifications(
  label: string,
  reference: string,
  send: () => Promise<unknown>,
): Promise<{ emailed: boolean }> {
  try {
    await send();

    return { emailed: true };
  } catch (error) {
    console.error(
      `[${label}] saved ${reference} but the confirmation email failed:`,
      error,
    );

    return { emailed: false };
  }
}
