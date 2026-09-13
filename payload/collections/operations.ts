import type { CollectionConfig, Field } from "payload";

import {
  createBeneficiaryOnApproval,
  notifyAssignee,
  setNoteAuthor,
} from "../hooks";
import { enforceWorkflow, recordTransition } from "../workflows";

import {
  allow,
  allowField,
  applicationFieldWrite,
  never,
  sensitiveRead,
} from "../access";

/* Section 6.1 system columns, added to every submission table. The full form
   field lists arrive in Phase 3, when the forms actually persist; Phase 2
   defines only what the permission rules need to be provable. */
const systemFields: Field[] = [
  { name: "reference", type: "text", required: true, unique: true, index: true },
  { name: "submittedAt", type: "date", index: true },
  { name: "consentVersion", type: "text" },
  { name: "consentAt", type: "date" },
  { name: "sourceIpHash", type: "text" },
  { name: "anonymisedAt", type: "date" },
];

const contactFields: Field[] = [
  { name: "fullName", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "text" },
];

/* Marks fields as writable only by Owner and Case Officer. An Administrator
   can read the case and move its status, but not edit the application
   (section 8.2, "R + status"). */
const caseWritable = (fields: Field[]): Field[] =>
  fields.map(
    (field) =>
      ({ ...field, access: { update: applicationFieldWrite } }) as Field,
  );

/* The admin's status control: offers only the moves Figure 4 allows and
   confirms approve/decline (WFL-03). Mirrors the server rule; never replaces it. */
const statusControl = {
  components: { Field: "/payload/components/StatusField#StatusField" },
};

/** Plain text fields, named exactly as the form already posts them, so the
    migration from the existing endpoints is a mapping and not a rename. */
const text = (...names: string[]): Field[] =>
  names.map((name) => ({ name, type: "text" }) as Field);

const longText = (...names: string[]): Field[] =>
  names.map((name) => ({ name, type: "textarea" }) as Field);

/* Support applications — section 8.2: Owner CRUD, Administrator read plus the
   status field, Content none, Case Officer CRU, Finance none. */
export const SupportApplications: CollectionConfig = {
  slug: "support-applications",
  hooks: {
    beforeChange: [enforceWorkflow("support-applications")],
    afterChange: [
      recordTransition("support-applications"),
      createBeneficiaryOnApproval,
      notifyAssignee,
    ],
  },
  admin: {
    useAsTitle: "reference",
    group: "People",
    defaultColumns: ["reference", "fullName", "status", "submittedAt"],
  },
  access: {
    create: allow("owner", "case"),
    read: allow("owner", "administrator", "case"),
    update: allow("owner", "administrator", "case"),
    delete: allow("owner"),
  },
  fields: [
    ...caseWritable(systemFields),
    ...caseWritable(contactFields),
    /* The rest of the application, named exactly as the form posts it.
       Phase 2 held only what the permission rules needed; Phase 3 stores the
       whole submission. */
    ...caseWritable([
      ...text(
        "supportType",
        "supportTypeOther",
        "gender",
        "dateOfBirth",
        "nationality",
        "contactMethod",
        "referralSource",
        "state",
        "lga",
        "landmark",
        "durationAtAddress",
        "housingStatus",
        "urgency",
        "appliedElsewhere",
        "occupation",
        "maritalStatus",
        "incomeSourceOther",
        "children",
        "dependents",
        "primaryProvider",
        "householdSize",
        "elderlyRelatives",
        "previousSupport",
      ),
      ...longText(
        "address",
        "livingConditions",
        "supportSummary",
        "challenge",
        "expectedImpact",
        "previousSupportDetail",
        "stepsTaken",
        "additionalInformation",
      ),
    ]),

    /* The four declarations the form requires, kept as evidence of what the
       applicant agreed to and when (PRV-03). */
    ...caseWritable(
      text(
        "declarationTrue",
        "declarationNoGuarantee",
        "declarationContact",
        "declarationDataUse",
      ),
    ),
    {
      // The one field an Administrator may write: the workflow (section 8.2).
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      admin: statusControl,
      options: [
        { label: "New", value: "new" },
        { label: "Under review", value: "under_review" },
        { label: "Approved", value: "approved" },
        { label: "Declined", value: "declined" },
        { label: "Support provided", value: "support_provided" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      /* WFL-05: required to decline. Whoever may move the workflow may give
         the reason, so an Administrator can write this one field too. */
      name: "declineReason",
      type: "textarea",
      access: { update: allowField("owner", "administrator", "case") },
      admin: {
        condition: (data) =>
          data?.status === "under_review" || data?.status === "declined",
        description: "Required to decline. Kept on the record.",
      },
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "admin-users",
      access: { update: applicationFieldWrite },
    },

    /* The eight sensitive fields of section 8.3. Read is Owner and Case
       Officer only (ACL-01): an Administrator sees the case, the applicant
       and the status, but not the financial or narrative detail. */
    {
      name: "nationalId",
      type: "text",
      admin: {
        description:
          "Collected at approval, never at application (PRV-04).",
      },
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "monthlyIncome",
      type: "text",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "incomeSource",
      type: "text",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "situationNarrative",
      type: "textarea",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "specialNeedsDependents",
      type: "text",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "specialNeedsDetail",
      type: "textarea",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "housingChallenges",
      type: "textarea",
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
    {
      name: "documents",
      type: "relationship",
      relationTo: "documents",
      hasMany: true,
      access: { read: sensitiveRead, update: applicationFieldWrite },
    },
  ],
};

/* Beneficiaries, case notes and documents — Owner CRUD, Administrator read,
   Case Officer CRU, everyone else none. */
const caseAccess = {
  create: allow("owner", "case"),
  read: allow("owner", "administrator", "case"),
  update: allow("owner", "case"),
  delete: allow("owner"),
};

export const Beneficiaries: CollectionConfig = {
  slug: "beneficiaries",
  admin: { useAsTitle: "fullName", group: "People" },
  access: caseAccess,
  fields: [
    ...contactFields,
    {
      name: "application",
      type: "relationship",
      relationTo: "support-applications",
    },
    { name: "programme", type: "text" },
    { name: "anonymisedAt", type: "date" },
  ],
};

export const CaseNotes: CollectionConfig = {
  slug: "case-notes",
  hooks: { beforeChange: [setNoteAuthor] },
  admin: { useAsTitle: "summary", group: "People" },
  access: caseAccess,
  fields: [
    { name: "summary", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      name: "application",
      type: "relationship",
      relationTo: "support-applications",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "admin-users",
      // Set from the signed-in user on create (payload/hooks.ts).
      admin: { readOnly: true },
    },
  ],
};

export const Documents: CollectionConfig = {
  slug: "documents",
  admin: { useAsTitle: "title", group: "People" },
  access: caseAccess,
  fields: [
    { name: "title", type: "text", required: true },
    // SEC-07: the file itself lives in a private bucket and is served only
    // through a short-lived signed URL. Phase 5 wires the storage.
    { name: "storageKey", type: "text" },
    {
      name: "application",
      type: "relationship",
      relationTo: "support-applications",
    },
  ],
};

/* Files that arrive with a public submission — currently the in-kind
   photograph (OPS-03).

   SEC-07/SEC-08: never a public path, stored under a generated name, and
   readable only by the roles that handle the submission. Created by the
   endpoint through the local API; no public or staff create route. */
export const SubmissionFiles: CollectionConfig = {
  slug: "submission-files",
  upload: {
    // MED-03: images capped at 10 MB, types allow-listed.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
    disableLocalStorage: false,
  },
  admin: { group: "People", hidden: true },
  access: {
    create: never,
    read: allow("owner", "administrator", "case"),
    update: never,
    delete: allow("owner"),
  },
  fields: [
    { name: "submittedWith", type: "text" },
    { name: "anonymisedAt", type: "date" },
  ],
};

/* Volunteers, partners, contacts, in-kind offers and subscribers — Owner,
   Administrator and Case Officer all CRUD (section 8.2). */
const enquiryAccess = {
  create: allow("owner", "administrator", "case"),
  read: allow("owner", "administrator", "case"),
  update: allow("owner", "administrator", "case"),
  delete: allow("owner", "administrator", "case"),
};

export const VolunteerApplications: CollectionConfig = {
  slug: "volunteer-applications",
  hooks: {
    beforeChange: [enforceWorkflow("volunteer-applications")],
    afterChange: [recordTransition("volunteer-applications")],
  },
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...contactFields,
    ...text(
      "whatsapp",
      "gender",
      "dateOfBirth",
      "location",
      "occupation",
      "qualification",
      "profession",
      "volunteeredBefore",
      "areaOfInterest",
      "availability",
      "commitment",
      "consent",
    ),
    ...longText("skills", "previousExperience", "motivation"),
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "contacted", "accepted", "declined", "closed"],
      admin: statusControl,
    },
    { name: "declineReason", type: "textarea" },
  ],
};

export const InKindOffers: CollectionConfig = {
  slug: "in-kind-offers",
  hooks: {
    beforeChange: [enforceWorkflow("in-kind-offers")],
    afterChange: [recordTransition("in-kind-offers")],
  },
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...contactFields,
    ...text(
      "category",
      "quantity",
      "condition",
      "location",
      "deliveryMethod",
      "contactMethod",
      "pickupDate",
      "pickupTime",
      "destination",
      "acknowledgeDonation",
    ),
    ...longText("description", "pickupAddress", "pickupInstructions"),
    /* OPS-03: the photograph the form already asks for and V1 discarded.
       Held in the private collection, never a public path (SEC-07). */
    {
      name: "photo",
      type: "relationship",
      relationTo: "submission-files",
    },
    /* Superseded by `photo` above and written by nothing. Kept for one
       release so this migration only adds columns: dropping it here would
       make the generator ask whether it was renamed, and a wrong answer
       silently moves data. A later migration removes it on its own. */
    {
      name: "photoKey",
      type: "text",
      admin: { hidden: true, description: "Deprecated. Removed after Phase 3." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "accepted", "received", "declined", "closed"],
      admin: statusControl,
    },
    { name: "declineReason", type: "textarea" },
  ],
};

export const PartnerEnquiries: CollectionConfig = {
  slug: "partner-enquiries",
  hooks: {
    beforeChange: [enforceWorkflow("partner-enquiries")],
    afterChange: [recordTransition("partner-enquiries")],
  },
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...text("organisation", "contactPerson", "location", "partnershipType", "phone", "consent"),
    { name: "email", type: "email" },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "in_discussion", "agreed", "closed"],
      admin: statusControl,
    },
  ],
};

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  hooks: {
    beforeChange: [enforceWorkflow("contact-messages")],
    afterChange: [recordTransition("contact-messages")],
  },
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...text("name", "subject", "enquiry"),
    { name: "email", type: "email" },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "unread",
      options: ["unread", "read", "resolved"],
      admin: statusControl,
    },
  ],
};

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: { useAsTitle: "email", group: "People" },
  access: enquiryAccess,
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    {
      name: "status",
      type: "select",
      defaultValue: "subscribed",
      options: ["subscribed", "unsubscribed"],
    },
    { name: "consentVersion", type: "text" },
    { name: "consentAt", type: "date" },
  ],
};

/* OPS-04: reference numbers are unique, sequential within their prefix and
   generated server-side. The counter lives here so the schema owns it; the
   increment itself is a single atomic statement (see lib/submissions.ts),
   because two submissions arriving together must never take one number. */
export const ReferenceCounters: CollectionConfig = {
  slug: "reference-counters",
  admin: { group: "Administration", hidden: true },
  access: {
    create: never,
    read: allow("owner"),
    update: never,
    delete: never,
  },
  fields: [
    { name: "prefix", type: "text", required: true, unique: true, index: true },
    { name: "value", type: "number", required: true, defaultValue: 0 },
  ],
};

export const operationsCollections = [
  ReferenceCounters,
  SupportApplications,
  Beneficiaries,
  CaseNotes,
  Documents,
  SubmissionFiles,
  VolunteerApplications,
  InKindOffers,
  PartnerEnquiries,
  ContactMessages,
  Subscribers,
];

export { never };
