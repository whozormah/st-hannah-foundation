/* Figure 4 of the specification, transcribed exactly — the single source for
   both the server rule (payload/workflows.ts) and the status control in the
   admin (payload/components/StatusField.tsx). Plain data with no server
   imports, so the browser can load it and the two can never disagree.

   Kept as data so a change to the Foundation's process is a one-line edit
   reviewed against the figure, not a change to control flow. */
export const TRANSITIONS = {
  "support-applications": {
    new: ["under_review"],
    under_review: ["approved", "declined"],
    approved: ["support_provided", "closed"],
    support_provided: ["closed"],
    declined: [],
    closed: [],
  },
  "volunteer-applications": {
    new: ["contacted"],
    contacted: ["accepted", "declined"],
    accepted: ["closed"],
    declined: [],
    closed: [],
  },
  "partner-enquiries": {
    new: ["in_discussion"],
    in_discussion: ["agreed", "closed"],
    agreed: ["closed"],
    closed: [],
  },
  "contact-messages": {
    unread: ["read"],
    read: ["resolved"],
    resolved: [],
  },
  // As drawn in Figure 4, "declined" branches from "accepted", not from
  // "new". Raised with the Foundation rather than reinterpreted here.
  "in-kind-offers": {
    new: ["accepted"],
    accepted: ["received", "declined"],
    received: ["closed"],
    declined: [],
    closed: [],
  },
} as const satisfies Record<string, Record<string, readonly string[]>>;

export type WorkflowSlug = keyof typeof TRANSITIONS;

/** Where every record starts. A submission cannot be created mid-workflow. */
export const INITIAL_STATUS: Record<WorkflowSlug, string> = {
  "support-applications": "new",
  "volunteer-applications": "new",
  "partner-enquiries": "new",
  "contact-messages": "unread",
  "in-kind-offers": "new",
};

/* WFL-03: moves that must be confirmed before they are made. */
export const NEEDS_CONFIRMATION = ["approved", "declined"];

const LABELS: Record<string, string> = {
  new: "New",
  under_review: "Under review",
  approved: "Approved",
  declined: "Declined",
  support_provided: "Support provided",
  closed: "Closed",
  contacted: "Contacted",
  accepted: "Accepted",
  in_discussion: "In discussion",
  agreed: "Agreed",
  unread: "Unread",
  read: "Read",
  resolved: "Resolved",
  received: "Received",
};

export const statusLabel = (status: string) => LABELS[status] ?? status;

export function isWorkflowSlug(slug: string): slug is WorkflowSlug {
  return slug in TRANSITIONS;
}

export function allowedNext(slug: WorkflowSlug, from: string): readonly string[] {
  const map = TRANSITIONS[slug] as Record<string, readonly string[]>;

  return map[from] ?? [];
}
