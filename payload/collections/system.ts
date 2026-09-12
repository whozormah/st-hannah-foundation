import type { CollectionConfig } from "payload";

import { allow, allowField, never } from "../access";

/* AUD-01: append-only. No interface, API or role may update or delete an
   audit entry — including the Owner. AUD-03: field names, never values, so
   the log can never become a second copy of the sensitive data. */
export const AuditLog: CollectionConfig = {
  slug: "audit-log",
  admin: {
    useAsTitle: "action",
    group: "Administration",
    defaultColumns: ["occurredAt", "actor", "action", "collectionName"],
  },
  access: {
    create: never,
    read: allow("owner", "administrator"),
    update: never,
    delete: never,
  },
  fields: [
    {
      name: "actor",
      type: "relationship",
      relationTo: "admin-users",
      required: true,
    },
    {
      name: "action",
      type: "select",
      required: true,
      options: [
        "login",
        "login_failed",
        "view_sensitive",
        "create",
        "update",
        "delete",
        "export",
        "role_change",
        "status_change",
      ],
    },
    { name: "collectionName", type: "text" },
    { name: "recordId", type: "text" },
    { name: "fieldNames", type: "text", hasMany: true },
    { name: "rowCount", type: "number" },
    { name: "ipHash", type: "text" },
    { name: "occurredAt", type: "date", required: true, index: true },
  ],
};

/* The human-readable history shown on a record, kept separate from the audit
   log (section 15). */
export const ActivityLog: CollectionConfig = {
  slug: "activity-log",
  admin: { useAsTitle: "summary", group: "Administration" },
  access: {
    create: never,
    read: allow("owner", "administrator", "case", "finance"),
    update: never,
    delete: never,
  },
  fields: [
    { name: "summary", type: "text", required: true },
    { name: "collectionName", type: "text" },
    { name: "recordId", type: "text" },
    { name: "fromStatus", type: "text" },
    { name: "toStatus", type: "text" },
    { name: "actor", type: "relationship", relationTo: "admin-users" },
    { name: "occurredAt", type: "date", index: true },
  ],
};

/* EML-04: every send is recorded. */
export const EmailLog: CollectionConfig = {
  slug: "email-log",
  admin: { useAsTitle: "template", group: "Administration" },
  access: {
    create: never,
    read: allow("owner", "administrator"),
    update: never,
    delete: never,
  },
  fields: [
    { name: "template", type: "text", required: true },
    { name: "recipient", type: "text", required: true },
    { name: "providerMessageId", type: "text" },
    { name: "status", type: "text" },
    { name: "sentAt", type: "date", index: true },
  ],
};

/* EML-02: one branded shell, which is code. Editors change the subject and
   the body, never the shell. Section 8.2 gives the Content Manager "RU body",
   so the subject is restricted at field level. */
export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  admin: { useAsTitle: "name", group: "Administration" },
  access: {
    create: allow("owner"),
    read: allow("owner", "administrator", "content"),
    update: allow("owner", "administrator", "content"),
    delete: allow("owner"),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      access: { update: allowField("owner", "administrator") },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      access: { update: allowField("owner", "administrator") },
    },
    // The only part a Content Manager may write.
    { name: "body", type: "textarea" },
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      access: { update: allowField("owner", "administrator") },
    },
  ],
};

/* In-app awareness, which replaces internal notification email (EML-01). */
export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: { useAsTitle: "message", group: "Administration" },
  access: {
    create: never,
    read: ({ req }) => {
      const user = req.user as { id?: string | number; role?: string } | null;

      if (!user) return false;
      if (user.role === "owner") return true;

      return { recipient: { equals: user.id } };
    },
    update: allow("owner", "administrator", "content", "case", "finance"),
    delete: never,
  },
  fields: [
    { name: "message", type: "text", required: true },
    {
      name: "recipient",
      type: "relationship",
      relationTo: "admin-users",
      required: true,
      index: true,
    },
    { name: "href", type: "text" },
    { name: "readAt", type: "date" },
  ],
};

/* CNT-07: a published slug is immutable unless a redirect is created. */
export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: { useAsTitle: "from", group: "Administration" },
  access: {
    create: allow("owner", "administrator"),
    read: allow("owner", "administrator"),
    update: allow("owner", "administrator"),
    delete: allow("owner"),
  },
  fields: [
    { name: "from", type: "text", required: true, unique: true },
    { name: "to", type: "text", required: true },
  ],
};

export const systemCollections = [
  EmailTemplates,
  Notifications,
  Redirects,
  ActivityLog,
  EmailLog,
  AuditLog,
];
