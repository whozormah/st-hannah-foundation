import { APIError } from "payload";
import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
} from "payload";

import {
  INITIAL_STATUS,
  allowedNext,
  statusLabel as label,
  type WorkflowSlug,
} from "./transitions";

/* WFL-01 and WFL-05, enforced before anything is written. This is the rule
   itself; the admin's status control only mirrors it for convenience. Because
   it runs on the server, it holds for the API as well as the admin — hiding
   an option in the interface would not.

   - A record is created only in its initial state.
   - A status change must be one Figure 4 permits.
   - Declining needs a reason, which is stored on the record. */
export const enforceWorkflow =
  (slug: WorkflowSlug): CollectionBeforeChangeHook =>
  ({ data, originalDoc, operation }) => {
    if (operation === "create") {
      const status = data?.status ?? INITIAL_STATUS[slug];

      if (status !== INITIAL_STATUS[slug]) {
        throw new APIError(
          `A new record must start as "${label(INITIAL_STATUS[slug])}".`,
          400,
          undefined,
          true,
        );
      }

      return { ...data, status };
    }

    const from = originalDoc?.status as string | undefined;
    const to = data?.status as string | undefined;

    // Not a status change: nothing to enforce.
    if (!to || !from || to === from) return data;

    const next = allowedNext(slug, from);

    if (!next.includes(to)) {
      throw new APIError(
        next.length
          ? `A record that is "${label(from)}" can only move to ${next.map((n) => `"${label(n)}"`).join(" or ")}, not "${label(to)}".`
          : `A record that is "${label(from)}" is finished and cannot change status.`,
        400,
        undefined,
        true,
      );
    }

    if (to === "declined") {
      const reason = String(
        data?.declineReason ?? originalDoc?.declineReason ?? "",
      ).trim();

      if (!reason) {
        throw new APIError(
          "Give a reason before declining. It is kept on the record.",
          400,
          undefined,
          true,
        );
      }
    }

    return data;
  };

/* WFL-02: every status change leaves a history entry — who, from, to, when.
   Written with the request's own transaction, so a change that fails to
   commit leaves no false history behind. */
export const recordTransition =
  (slug: WorkflowSlug): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, operation, req }) => {
    if (operation !== "update") return doc;

    const from = previousDoc?.status as string | undefined;
    const to = doc?.status as string | undefined;

    if (!from || !to || from === to) return doc;

    await req.payload.create({
      collection: "activity-log",
      overrideAccess: true,
      req,
      data: {
        summary: `Status changed from ${label(from)} to ${label(to)}`,
        collectionName: slug,
        recordId: String(doc.id),
        fromStatus: from,
        toStatus: to,
        actor: (req.user as { id?: number } | null)?.id,
        occurredAt: new Date().toISOString(),
      },
    });

    return doc;
  };
