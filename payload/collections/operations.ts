import type { CollectionConfig, Field } from "payload";

import {
  allow,
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

/* Support applications — section 8.2: Owner CRUD, Administrator read plus the
   status field, Content none, Case Officer CRU, Finance none. */
export const SupportApplications: CollectionConfig = {
  slug: "support-applications",
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
    {
      name: "supportType",
      type: "text",
      access: { update: applicationFieldWrite },
    },
    {
      // The one field an Administrator may write: the workflow (section 8.2).
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
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
    { name: "author", type: "relationship", relationTo: "admin-users" },
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
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...contactFields,
    { name: "areaOfInterest", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "contacted", "accepted", "declined", "closed"],
    },
  ],
};

export const InKindOffers: CollectionConfig = {
  slug: "in-kind-offers",
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    ...contactFields,
    { name: "category", type: "text" },
    { name: "description", type: "textarea" },
    // OPS-03: the photograph the form already asks for, which V1 discarded.
    { name: "photoKey", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "accepted", "received", "declined", "closed"],
    },
  ],
};

export const PartnerEnquiries: CollectionConfig = {
  slug: "partner-enquiries",
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    { name: "organisation", type: "text" },
    { name: "contactPerson", type: "text" },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "in_discussion", "agreed", "closed"],
    },
  ],
};

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  admin: { useAsTitle: "reference", group: "People" },
  access: enquiryAccess,
  fields: [
    ...systemFields,
    { name: "name", type: "text" },
    { name: "email", type: "email" },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "unread",
      options: ["unread", "read", "resolved"],
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

export const operationsCollections = [
  SupportApplications,
  Beneficiaries,
  CaseNotes,
  Documents,
  VolunteerApplications,
  InKindOffers,
  PartnerEnquiries,
  ContactMessages,
  Subscribers,
];

export { never };
