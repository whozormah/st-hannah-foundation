import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
} from "payload";

type UserRef = { id?: number } | null;

/** A relationship arrives either as an id or as the populated document. */
const idOf = (value: unknown): number | undefined => {
  const raw =
    value && typeof value === "object" && "id" in value
      ? (value as { id: unknown }).id
      : value;

  const id = Number(raw);

  return Number.isFinite(id) && id > 0 ? id : undefined;
};

/* OPS-06: an approved application creates exactly one beneficiary, linked
   back to it. Approval can only be entered once (Figure 4), and the lookup
   below makes the hook safe to run again regardless — it never makes a
   second. Written in the request's transaction, so a failed approval leaves
   no orphaned beneficiary. */
export const createBeneficiaryOnApproval: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== "update") return doc;
  if (doc.status !== "approved" || previousDoc?.status === "approved") return doc;

  const existing = await req.payload.find({
    collection: "beneficiaries",
    where: { application: { equals: doc.id } },
    overrideAccess: true,
    limit: 1,
    req,
  });

  if (existing.docs.length > 0) return doc;

  await req.payload.create({
    collection: "beneficiaries",
    overrideAccess: true,
    req,
    data: {
      fullName: doc.fullName,
      email: doc.email,
      phone: doc.phone,
      application: doc.id,
      programme: doc.supportType,
    },
  });

  return doc;
};

/* EML-01: staff awareness is in-app, not email. Assigning an application
   tells the person it was assigned to. Assigning it to yourself does not. */
export const notifyAssignee: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  const now = idOf(doc.assignedTo);
  const before = idOf(previousDoc?.assignedTo);
  const actor = (req.user as UserRef)?.id;

  if (!now || now === before || now === actor) return doc;

  await req.payload.create({
    collection: "notifications",
    overrideAccess: true,
    req,
    data: {
      message: `Application ${doc.reference} has been assigned to you.`,
      recipient: now,
      href: `/admin/collections/support-applications/${doc.id}`,
    },
  });

  return doc;
};

/* A case note's author is whoever is signed in — never a value sent with the
   request, so a note cannot be attributed to someone else. */
export const setNoteAuthor: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  if (operation !== "create") return data;

  return { ...data, author: (req.user as UserRef)?.id };
};
