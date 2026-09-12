/* Shared helpers for the access-control suite. Everything goes over HTTP, so
   the tests exercise the same boundary a browser or a script would: if a rule
   is only enforced in the admin interface, these tests fail. */
export const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3100";

export const PASSWORD = "Test-Passw0rd!-not-real";

export const ACCOUNTS = {
  owner: "owner@test.invalid",
  administrator: "admin@test.invalid",
  content: "content@test.invalid",
  case: "case@test.invalid",
  finance: "finance@test.invalid",
};

/* The eight sensitive fields of section 8.3. Kept in one place so a test can
   never silently check fewer than all eight. */
export const SENSITIVE_FIELDS = [
  "nationalId",
  "monthlyIncome",
  "incomeSource",
  "situationNarrative",
  "specialNeedsDependents",
  "specialNeedsDetail",
  "housingChallenges",
  "documents",
];

export const APPLICATION_REFERENCE = "SHA-TEST-0001";

const tokens = new Map();

export async function login(role) {
  if (tokens.has(role)) return tokens.get(role);

  const response = await fetch(`${BASE}/api/admin-users/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: ACCOUNTS[role], password: PASSWORD }),
  });

  const body = await response.json();

  if (!response.ok || !body.token) {
    throw new Error(
      `could not sign in as ${role}: ${response.status} ${JSON.stringify(body).slice(0, 200)}`,
    );
  }

  tokens.set(role, body.token);

  return body.token;
}

export async function as(role, path, options = {}) {
  const token = role ? await login(role) : null;

  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  let body = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return { status: response.status, body };
}

export async function graphql(role, query, variables = {}) {
  return as(role, "/api/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });
}

/** A read is refused if it errors, or succeeds while returning nothing. */
export function readRefused({ status, body }) {
  if (status === 403 || status === 401) return true;

  if (status === 200 && body && Array.isArray(body.docs)) {
    return body.docs.length === 0;
  }

  return false;
}

/* Payload names the list query after the collection slug in PascalCase.
   It cannot be discovered at runtime: introspection is disabled in
   production, which is the right default and worth keeping. */
export const APPLICATIONS_QUERY = "SupportApplications";

export async function fetchApplication(role) {
  return as(
    role,
    `/api/support-applications?limit=5&where[reference][equals]=${APPLICATION_REFERENCE}`,
  );
}
