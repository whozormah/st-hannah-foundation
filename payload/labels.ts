import type { CollectionConfig, Field, GlobalConfig } from "payload";

import { statusLabel } from "./transitions";

/* ADM-01: the admin speaks the Foundation's language — no field is labelled
   with its database name. One dictionary for every collection, so the wording
   can be read and corrected in one place.

   Labels come from the public forms' own questions, shortened for staff:
   "Briefly Describe Your Current Living Conditions" becomes "Current Living
   Conditions". Values stored in the database are never changed here — only
   what the admin displays. */

/** Used wherever a field name means the same thing everywhere. */
const COMMON: Record<string, string> = {
  reference: "Reference",
  submittedAt: "Submitted",
  consentVersion: "Privacy Policy Version Accepted",
  consentAt: "Consent Given",
  sourceIpHash: "Source IP (Hashed)",
  anonymisedAt: "Anonymised On",
  fullName: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  whatsapp: "WhatsApp Number",
  gender: "Gender",
  dateOfBirth: "Date of Birth",
  nationality: "Nationality",
  contactMethod: "Preferred Contact Method",
  occupation: "Occupation",
  status: "Status",
  declineReason: "Reason for Declining",
  assignedTo: "Assigned To",
  seo: "SEO",
  // Web jargon, rephrased for staff who are not developers.
  slug: "Web Address",
  excerpt: "Short Summary",
  body: "Main Content",
  order: "Display Order",
  provider: "Payment Provider",
  heroImage: "Hero Image",
  featuredImage: "Featured Image",
  firstGiftAt: "First Gift",
  latestGiftAt: "Latest Gift",
  occurredAt: "When",
  actor: "Staff Member",
  collectionName: "Section",
  recordId: "Record ID",
};

/** Where the same field name means something different per collection. */
const BY_COLLECTION: Record<string, Record<string, string>> = {
  "support-applications": {
    supportType: "Type of Support Needed",
    supportTypeOther: "Other Support Needed",
    referralSource: "How They Heard About Us",
    address: "Residential Address",
    state: "State",
    lga: "Local Government Area",
    landmark: "Nearest Landmark",
    durationAtAddress: "Time at This Address",
    housingStatus: "Housing Status",
    livingConditions: "Current Living Conditions",
    urgency: "Urgency",
    appliedElsewhere: "Applied for Similar Support Elsewhere",
    supportSummary: "Support Requested",
    challenge: "Challenge or Need",
    expectedImpact: "How the Support Will Help",
    maritalStatus: "Marital Status",
    incomeSourceOther: "Other Source of Income",
    children: "Number of Children",
    dependents: "Number of Dependants",
    primaryProvider: "Primary Provider for the Household",
    householdSize: "Household Size",
    elderlyRelatives: "Elderly Relatives in the Household",
    previousSupport: "Supported by the Foundation Before",
    previousSupportDetail: "Details of Previous Support",
    stepsTaken: "Steps Already Taken",
    additionalInformation: "Additional Information",
    declarationTrue: "Declared the Information Is True",
    declarationNoGuarantee: "Understood Support Is Not Guaranteed",
    declarationContact: "Agreed to Be Contacted",
    declarationDataUse: "Agreed to Use of Their Information",
    nationalId: "National ID Number",
    monthlyIncome: "Estimated Monthly Income",
    incomeSource: "Primary Source of Income",
    situationNarrative: "Their Account of Their Situation",
    specialNeedsDependents: "Dependants with Special Needs",
    specialNeedsDetail: "Special Needs — Details",
    housingChallenges: "Housing, Safety or Environmental Challenges",
    documents: "Supporting Documents",
  },
  "volunteer-applications": {
    location: "Location",
    qualification: "Highest Qualification",
    profession: "Profession",
    skills: "Skills and Experience",
    volunteeredBefore: "Volunteered Before",
    previousExperience: "Previous Volunteering",
    areaOfInterest: "Area of Interest",
    availability: "Availability",
    commitment: "Commitment",
    motivation: "Why They Want to Volunteer",
    consent: "Declaration Accepted",
  },
  "in-kind-offers": {
    category: "Category",
    description: "Item Description",
    quantity: "Quantity",
    condition: "Condition",
    location: "Where the Item Is",
    deliveryMethod: "Delivery Method",
    pickupAddress: "Pickup Address",
    pickupDate: "Pickup Date",
    pickupTime: "Pickup Time",
    pickupInstructions: "Pickup Instructions",
    destination: "Receiving Office",
    acknowledgeDonation: "Public Acknowledgement Wanted",
    photo: "Photograph",
    photoKey: "Photo Key (Deprecated)",
  },
  "partner-enquiries": {
    organisation: "Organisation",
    contactPerson: "Contact Person",
    location: "Country or Location",
    partnershipType: "Partnership Type",
    message: "Their Message",
    consent: "Agreed to Be Contacted",
  },
  "contact-messages": {
    name: "Name",
    subject: "Subject",
    enquiry: "Enquiry Type",
    message: "Message",
  },
  beneficiaries: {
    application: "Application",
    programme: "Programme",
  },
  "case-notes": {
    summary: "Summary",
    body: "Note",
    application: "Application",
    author: "Written By",
  },
  documents: {
    storageKey: "File Reference",
    application: "Application",
  },
  donations: {
    receiptNumber: "Receipt Number",
    amountMinor: "Amount (Smallest Unit)",
    providerReference: "Payment Reference",
    donatedAt: "Date of Gift",
    receiptSentAt: "Receipt Sent",
    isAnonymous: "Anonymous Gift",
  },
  campaigns: {
    targetMinor: "Target (Smallest Unit)",
  },
  "payment-transactions": {
    providerReference: "Payment Reference",
    eventType: "Event Type",
    amountMinor: "Amount (Smallest Unit)",
    feesMinor: "Fees (Smallest Unit)",
    rawPayload: "Raw Provider Data",
  },
  "webhook-events": {
    providerEventId: "Provider Event ID",
    signatureValid: "Signature Verified",
    processedAt: "Processed",
    processingError: "Processing Error",
    payload: "Raw Event",
    receivedAt: "Received",
  },
  "audit-log": {
    fieldNames: "Fields Touched",
    rowCount: "Rows Exported",
    ipHash: "IP (Hashed)",
  },
  "activity-log": {
    fromStatus: "From",
    toStatus: "To",
  },
  "email-log": {
    providerMessageId: "Provider Message ID",
    sentAt: "Sent",
  },
  notifications: {
    href: "Link",
    readAt: "Read",
  },
  redirects: {
    from: "From Path",
    to: "To Path",
  },
  "site-settings": {
    foundationName: "Foundation Name",
    nigeriaAddress: "Nigeria Office Address",
    usaAddress: "USA Office Address",
    socials: "Social Media",
    tiktok: "TikTok",
    youtube: "YouTube",
    linkedin: "LinkedIn",
  },
  "seo-defaults": {
    openGraphImage: "Social Sharing Image",
  },
  "statistics-manual": {
    value: "Figure as Shown",
    source: "Where This Figure Comes From",
    verifiedAt: "Verified On",
  },
};

/* "Smallest unit" alone would puzzle anyone who is not the developer. */
const SLUG_HELP =
  "The end of the page's address, e.g. medical-aid in /programs/medical-aid. Lowercase words joined by hyphens.";

const DESCRIPTIONS: Record<string, Record<string, string>> = {
  programmes: { slug: SLUG_HELP },
  "impact-stories": { slug: SLUG_HELP },
  pages: { slug: SLUG_HELP },
  campaigns: {
    slug: SLUG_HELP,
    targetMinor: "In kobo for naira and cents for dollars: ₦1,000 is 100000.",
  },
  donations: {
    amountMinor: "In kobo for naira and cents for dollars: ₦1,000 is 100000.",
  },
};

/* Select options stored as bare values ("in_discussion") get readable names.
   Workflow statuses reuse the labels the status control already shows. */
const OPTION_LABELS: Record<string, string> = {
  partially_refunded: "Partially refunded",
  pending: "Pending",
  successful: "Successful",
  failed: "Failed",
  refunded: "Refunded",
  subscribed: "Subscribed",
  unsubscribed: "Unsubscribed",
  login: "Signed in",
  login_failed: "Failed sign-in",
  view_sensitive: "Viewed sensitive details",
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  export: "Exported",
  role_change: "Role changed",
  status_change: "Status changed",
};

const optionLabel = (value: string) => OPTION_LABELS[value] ?? statusLabel(value);

function relabel(fields: Field[], scope: string): Field[] {
  return fields.map((field) => {
    const next = { ...field } as Field & Record<string, unknown>;
    const name = "name" in field ? (field.name as string) : undefined;

    if (name && !("label" in field && field.label)) {
      const label = BY_COLLECTION[scope]?.[name] ?? COMMON[name];

      if (label) next.label = label;
    }

    const description = name ? DESCRIPTIONS[scope]?.[name] : undefined;

    if (description) {
      next.admin = { ...(next.admin as object), description } as never;
    }

    if (field.type === "select" && Array.isArray(field.options)) {
      next.options = field.options.map((option) =>
        typeof option === "string"
          ? { label: optionLabel(option), value: option }
          : option,
      ) as never;
    }

    if ("fields" in field && Array.isArray(field.fields)) {
      next.fields = relabel(field.fields, scope) as never;
    }

    if (field.type === "blocks") {
      next.blocks = field.blocks.map((block) => ({
        ...block,
        fields: relabel(block.fields, scope),
      })) as never;
    }

    return next as Field;
  });
}

export const labelCollection = (collection: CollectionConfig): CollectionConfig => ({
  ...collection,
  fields: relabel(collection.fields, collection.slug),
});

export const labelGlobal = (global: GlobalConfig): GlobalConfig => ({
  ...global,
  fields: relabel(global.fields, global.slug),
});
