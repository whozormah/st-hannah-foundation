import type { Access, FieldAccess, PayloadRequest } from "payload";

/* The five roles of section 8.1. Fixed in code: ACL-07 rules out a runtime
   permission editor in V1, so adding a role is a deliberate change here. */
export const ROLES = [
  "owner",
  "administrator",
  "content",
  "case",
  "finance",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: "Owner", value: "owner" },
  { label: "Administrator", value: "administrator" },
  { label: "Content Manager", value: "content" },
  { label: "Case Officer", value: "case" },
  { label: "Finance", value: "finance" },
];

function roleOf(user: unknown): Role | null {
  const role = (user as { role?: unknown } | null | undefined)?.role;

  return ROLES.includes(role as Role) ? (role as Role) : null;
}

/** Collection-level rule: permit only these roles. */
export const allow =
  (...roles: Role[]): Access =>
  ({ req }) => {
    const role = roleOf(req.user);

    return role !== null && roles.includes(role);
  };

/** Field-level rule: permit only these roles. */
export const allowField =
  (...roles: Role[]): FieldAccess =>
  ({ req }) => {
    const role = roleOf(req.user);

    return role !== null && roles.includes(role);
  };

/** Nobody, through the API. Used for append-only and system-written records. */
export const never: Access = () => false;

/** Any signed-in staff member. */
export const signedIn: Access = ({ req }) => roleOf(req.user) !== null;

/* Entry to the admin panel. Payload types this one as strictly boolean — it
   cannot be narrowed by a query — so it needs its own signature. Every role
   may open the panel; what they see inside is decided per collection. */
export const canUseAdminPanel = ({ req }: { req: PayloadRequest }): boolean =>
  roleOf(req.user) !== null;

/* The eight sensitive fields of section 8.3, readable only by Owner and Case
   Officer. Named here so the collection and the tests share one list and
   cannot drift apart. */
export const SENSITIVE_APPLICATION_FIELDS = [
  "nationalId",
  "monthlyIncome",
  "incomeSource",
  "situationNarrative",
  "specialNeedsDependents",
  "specialNeedsDetail",
  "housingChallenges",
  "documents",
] as const;

/** Read access for those fields: Owner and Case Officer only (ACL-01). */
export const sensitiveRead = allowField("owner", "case");

/** Write access for application content: an Administrator may move the
    workflow, but may not edit the application itself (section 8.2,
    "R + status"). */
export const applicationFieldWrite = allowField("owner", "case");
