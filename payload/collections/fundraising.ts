import type { CollectionConfig } from "payload";

import { allow, never } from "../access";

/* Donations, donors and transactions — section 8.2: Owner CRUD, Administrator
   read, Finance create/read/update, Content and Case Officer none. */
const fundraisingAccess = {
  create: allow("owner", "finance"),
  read: allow("owner", "administrator", "finance"),
  update: allow("owner", "finance"),
  delete: allow("owner"),
};

/* A donor is not a user: no password, no session, no login route. */
export const Donors: CollectionConfig = {
  slug: "donors",
  labels: { singular: "Donor", plural: "Donors" },
  admin: { useAsTitle: "email", group: "Fundraising" },
  access: fundraisingAccess,
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "fullName", type: "text" },
    { name: "phone", type: "text" },
    { name: "firstGiftAt", type: "date" },
    { name: "latestGiftAt", type: "date" },
    { name: "anonymisedAt", type: "date" },
  ],
};

export const Campaigns: CollectionConfig = {
  slug: "campaigns",
  labels: { singular: "Campaign", plural: "Campaigns" },
  admin: { useAsTitle: "name", group: "Fundraising" },
  access: {
    create: allow("owner", "finance"),
    // The one collection a Content Manager may read but not write.
    read: allow("owner", "administrator", "content", "finance"),
    update: allow("owner", "administrator", "finance"),
    delete: allow("owner"),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "targetMinor", type: "number" },
    { name: "currency", type: "text", defaultValue: "NGN" },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};

/* What the Foundation recognises (section 6.2). Money is integer minor units
   with an explicit currency (GEN-04); receipt numbers come from a database
   sequence in Phase 5 and are immutable once allocated (RCP-01, RCP-02). */
export const Donations: CollectionConfig = {
  slug: "donations",
  labels: { singular: "Donation", plural: "Donations" },
  admin: {
    useAsTitle: "receiptNumber",
    group: "Fundraising",
    defaultColumns: ["receiptNumber", "donor", "amountMinor", "status"],
  },
  access: fundraisingAccess,
  fields: [
    { name: "receiptNumber", type: "number", unique: true, index: true },
    { name: "donor", type: "relationship", relationTo: "donors", required: true },
    { name: "campaign", type: "relationship", relationTo: "campaigns" },
    { name: "programme", type: "relationship", relationTo: "programmes" },
    { name: "amountMinor", type: "number", required: true },
    { name: "currency", type: "text", required: true, defaultValue: "NGN" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "successful",
      options: ["successful", "refunded", "partially_refunded"],
    },
    { name: "provider", type: "text", required: true },
    { name: "providerReference", type: "text", required: true, index: true },
    { name: "donatedAt", type: "date" },
    { name: "receiptSentAt", type: "date" },
    { name: "isAnonymous", type: "checkbox", defaultValue: false },
  ],
};

/* What the provider actually did. Kept separate from the donation so the two
   can be reconciled rather than silently collapsed (section 6.2). */
export const PaymentTransactions: CollectionConfig = {
  slug: "payment-transactions",
  labels: { singular: "Transaction", plural: "Transactions" },
  admin: { useAsTitle: "providerReference", group: "Fundraising" },
  access: {
    // Written by the webhook through the local API, never by hand.
    create: never,
    read: allow("owner", "administrator", "finance"),
    update: never,
    delete: never,
  },
  fields: [
    { name: "provider", type: "text", required: true },
    { name: "providerReference", type: "text", required: true, index: true },
    // Nullable on purpose: a transaction with no donation is a reconciliation
    // exception, not an error to hide (PAY-07).
    { name: "donation", type: "relationship", relationTo: "donations" },
    { name: "eventType", type: "text" },
    {
      name: "status",
      type: "select",
      options: ["pending", "successful", "failed", "refunded"],
    },
    { name: "amountMinor", type: "number" },
    { name: "currency", type: "text" },
    { name: "feesMinor", type: "number" },
    { name: "rawPayload", type: "json" },
    { name: "occurredAt", type: "date" },
  ],
};

/* The idempotency ledger (PAY-03). The unique pair is what makes a replayed
   webhook harmless; the application never decides idempotency for itself. */
export const WebhookEvents: CollectionConfig = {
  slug: "webhook-events",
  labels: { singular: "Webhook Event", plural: "Webhook Events" },
  admin: { useAsTitle: "providerEventId", group: "Fundraising" },
  access: {
    create: never,
    read: allow("owner", "administrator", "finance"),
    update: never,
    delete: never,
  },
  fields: [
    { name: "provider", type: "text", required: true, index: true },
    { name: "providerEventId", type: "text", required: true, index: true },
    { name: "signatureValid", type: "checkbox" },
    { name: "processedAt", type: "date" },
    { name: "processingError", type: "text" },
    { name: "payload", type: "json" },
    { name: "receivedAt", type: "date" },
  ],
  indexes: [
    { fields: ["provider", "providerEventId"], unique: true },
  ],
};

export const fundraisingCollections = [
  Donors,
  Campaigns,
  Donations,
  PaymentTransactions,
  WebhookEvents,
];
