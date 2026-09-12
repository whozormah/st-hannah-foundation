import test from "node:test";
import assert from "node:assert/strict";

import {
  APPLICATIONS_QUERY,
  APPLICATION_REFERENCE,
  SENSITIVE_FIELDS,
  as,
  fetchApplication,
  graphql,
  login,
  readRefused,
} from "./helpers.mjs";

/* Phase 2 gate. Proves authentication, the five roles, collection-level
   authorisation and — the part that matters most — that the eight sensitive
   application fields never leave the server for a role that must not see
   them. Every assertion runs over HTTP against the real API. */

// ── Authentication ────────────────────────────────────────────────────────

test("authentication: every seeded role can sign in", async () => {
  for (const role of ["owner", "administrator", "content", "case", "finance"]) {
    const token = await login(role);
    assert.ok(token, `${role} received no token`);
  }
});

test("authentication: a wrong password is refused", async () => {
  const { status } = await as(null, "/api/admin-users/login", {
    method: "POST",
    body: JSON.stringify({
      email: "owner@test.invalid",
      password: "wrong-password",
    }),
  });

  assert.notEqual(status, 200, "a wrong password was accepted");
});

test("authentication: an unauthenticated read of applications is refused", async () => {
  const result = await as(null, "/api/support-applications?limit=5");
  assert.ok(readRefused(result), `expected refusal, got ${result.status}`);
});

// ── A5: the Content Manager cannot reach applications, by any route ────────

test("A5: Content Manager is refused applications over REST", async () => {
  const result = await fetchApplication("content");
  assert.ok(
    readRefused(result),
    `REST returned ${result.status} with ${result.body?.docs?.length ?? "?"} docs`,
  );
});

test("A5: Content Manager is refused applications over GraphQL", async () => {
  // Proven against the Owner first, so a typo in the query name cannot make
  // this test pass by accident.
  const ownerResult = await graphql(
    "owner",
    `{ ${APPLICATIONS_QUERY}(limit: 5) { docs { reference } } }`,
  );

  assert.ok(
    ownerResult.body?.data?.[APPLICATIONS_QUERY]?.docs?.length > 0,
    `the GraphQL query itself is wrong: ${JSON.stringify(ownerResult.body).slice(0, 200)}`,
  );

  const { body } = await graphql(
    "content",
    `{ ${APPLICATIONS_QUERY}(limit: 5) { docs { id reference } } }`,
  );

  const docs = body?.data?.[APPLICATIONS_QUERY]?.docs ?? null;
  const refused = Boolean(body?.errors) || docs === null || docs.length === 0;

  assert.ok(refused, `GraphQL returned ${JSON.stringify(body).slice(0, 200)}`);
});

test("A5: Finance is refused applications too", async () => {
  const result = await fetchApplication("finance");
  assert.ok(readRefused(result), `expected refusal, got ${result.status}`);
});

// ── A6: sensitive fields are absent, not merely hidden ────────────────────

test("A6: the Administrator sees the case but not the sensitive fields", async () => {
  const { status, body } = await fetchApplication("administrator");

  assert.equal(status, 200, "Administrator should be able to read the case");

  const doc = body.docs[0];
  assert.ok(doc, `application ${APPLICATION_REFERENCE} not found`);

  // The Administrator must still be able to do their job.
  assert.equal(doc.reference, APPLICATION_REFERENCE);
  assert.ok(doc.fullName, "Administrator should see the applicant's name");
  assert.ok(doc.status, "Administrator should see the status");

  // And must not receive any of the eight.
  for (const field of SENSITIVE_FIELDS) {
    assert.ok(
      !(field in doc),
      `"${field}" was present in the Administrator's payload`,
    );
  }
});

test("A6: the sensitive values appear nowhere in the Administrator's response", async () => {
  const { body } = await fetchApplication("administrator");
  const raw = JSON.stringify(body);

  // The seeded values are distinctive on purpose, so this catches a value
  // leaking under a different key or nested in a relationship.
  for (const value of [
    "TEST-NIN-000000000",
    "TEST-INCOME-BAND-A",
    "TEST-INCOME-SOURCE",
    "TEST-NARRATIVE-CONFIDENTIAL",
    "TEST-DEPENDANTS-1",
    "TEST-SPECIAL-NEEDS-DETAIL",
    "TEST-HOUSING-CHALLENGES",
  ]) {
    assert.ok(!raw.includes(value), `sensitive value ${value} leaked`);
  }
});

test("A6: GraphQL withholds the sensitive fields from the Administrator", async () => {
  const { body } = await graphql(
    "administrator",
    `{ ${APPLICATIONS_QUERY}(limit: 5) { docs { reference situationNarrative monthlyIncome } } }`,
  );

  const raw = JSON.stringify(body);
  assert.ok(
    !raw.includes("TEST-NARRATIVE-CONFIDENTIAL") &&
      !raw.includes("TEST-INCOME-BAND-A"),
    `GraphQL leaked a sensitive value: ${raw.slice(0, 200)}`,
  );
});

test("A6: the Case Officer does receive the sensitive fields", async () => {
  const { status, body } = await fetchApplication("case");

  assert.equal(status, 200);

  const doc = body.docs[0];
  assert.ok(doc, "Case Officer could not read the application");
  assert.equal(doc.situationNarrative, "TEST-NARRATIVE-CONFIDENTIAL");
  assert.equal(doc.monthlyIncome, "TEST-INCOME-BAND-A");
  assert.equal(doc.nationalId, "TEST-NIN-000000000");
});

test("A6: the Owner does receive the sensitive fields", async () => {
  const { body } = await fetchApplication("owner");
  const doc = body.docs[0];

  assert.ok(doc);
  assert.equal(doc.housingChallenges, "TEST-HOUSING-CHALLENGES");
});

// ── The Administrator's write is limited to the workflow ──────────────────

test("the Administrator may move the workflow", async () => {
  const { body } = await fetchApplication("owner");
  const id = body.docs[0].id;

  const result = await as("administrator", `/api/support-applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "under_review" }),
  });

  assert.equal(result.status, 200, "Administrator could not update the status");

  const after = await fetchApplication("owner");
  assert.equal(after.body.docs[0].status, "under_review");
});

test("the Administrator may not edit the application itself", async () => {
  const before = await fetchApplication("owner");
  const id = before.body.docs[0].id;
  const originalName = before.body.docs[0].fullName;

  await as("administrator", `/api/support-applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ fullName: "Changed By Administrator" }),
  });

  const after = await fetchApplication("owner");

  assert.equal(
    after.body.docs[0].fullName,
    originalName,
    "an Administrator changed a field they should not be able to write",
  );
});

test("the Case Officer may edit the application", async () => {
  const before = await fetchApplication("owner");
  const id = before.body.docs[0].id;

  const result = await as("case", `/api/support-applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ situationNarrative: "TEST-NARRATIVE-CONFIDENTIAL" }),
  });

  assert.equal(result.status, 200, "Case Officer could not edit the case");
});

// ── The rest of the matrix (section 8.2) ──────────────────────────────────

test("fundraising: Finance reads donations, Case Officer and Content do not", async () => {
  const finance = await as("finance", "/api/donations?limit=1");
  assert.equal(finance.status, 200, "Finance should read donations");

  for (const role of ["case", "content"]) {
    const result = await as(role, "/api/donations?limit=1");
    assert.ok(readRefused(result), `${role} could read donations`);
  }
});

test("fundraising: the Administrator may read donations but not write them", async () => {
  const read = await as("administrator", "/api/donations?limit=1");
  assert.equal(read.status, 200);

  const write = await as("administrator", "/api/donations", {
    method: "POST",
    body: JSON.stringify({
      amountMinor: 1000,
      currency: "NGN",
      provider: "test",
      providerReference: "test-ref-1",
      donor: 1,
    }),
  });

  assert.notEqual(write.status, 201, "Administrator created a donation");
  assert.notEqual(write.status, 200, "Administrator created a donation");
});

test("content: the Content Manager may create but not delete", async () => {
  const created = await as("content", "/api/faqs", {
    method: "POST",
    body: JSON.stringify({ question: "Test question?", answer: "Test answer." }),
  });

  assert.ok(
    created.status === 200 || created.status === 201,
    `Content Manager could not create content: ${created.status}`,
  );

  const id = created.body?.doc?.id;
  assert.ok(id, "no id returned for the created record");

  const deleted = await as("content", `/api/faqs/${id}`, { method: "DELETE" });
  assert.notEqual(deleted.status, 200, "Content Manager deleted content");

  // Tidy up as a role that is allowed to.
  await as("owner", `/api/faqs/${id}`, { method: "DELETE" });
});

test("content: the Case Officer cannot touch content at all", async () => {
  const result = await as("case", "/api/programmes?limit=1");
  assert.ok(readRefused(result), "Case Officer could read programmes");
});

// ── Staff accounts and roles ──────────────────────────────────────────────

test("staff accounts: only the Owner can list every account", async () => {
  const owner = await as("owner", "/api/admin-users?limit=100");
  assert.equal(owner.status, 200);
  assert.ok(owner.body.docs.length >= 5, "Owner should see all five accounts");

  const content = await as("content", "/api/admin-users?limit=100");

  if (content.status === 200) {
    assert.equal(
      content.body.docs.length,
      1,
      "a Content Manager saw more than their own account",
    );
  } else {
    assert.ok(readRefused(content));
  }
});

test("staff accounts: a role cannot be self-escalated", async () => {
  const me = await as("content", "/api/admin-users/me");
  const id = me.body?.user?.id;
  assert.ok(id, "could not read own account");

  await as("content", `/api/admin-users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ role: "owner" }),
  });

  const after = await as("owner", `/api/admin-users/${id}`);
  assert.equal(
    after.body.role,
    "content",
    "a Content Manager escalated their own role",
  );
});

// ── The audit log is append-only (AUD-01) ─────────────────────────────────

test("audit log: readable by Owner and Administrator, writable by nobody", async () => {
  for (const role of ["owner", "administrator"]) {
    const result = await as(role, "/api/audit-log?limit=1");
    assert.equal(result.status, 200, `${role} could not read the audit log`);
  }

  for (const role of ["content", "case", "finance"]) {
    const result = await as(role, "/api/audit-log?limit=1");
    assert.ok(readRefused(result), `${role} could read the audit log`);
  }

  const created = await as("owner", "/api/audit-log", {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      occurredAt: new Date().toISOString(),
      actor: 1,
    }),
  });

  assert.notEqual(created.status, 201, "the Owner wrote to the audit log");
  assert.notEqual(created.status, 200, "the Owner wrote to the audit log");
});

// ── Settings (section 8.2, "Navigation, settings") ────────────────────────

test("settings: Owner and Administrator only", async () => {
  const owner = await as("owner", "/api/globals/site-settings");
  assert.equal(owner.status, 200);

  for (const role of ["content", "case", "finance"]) {
    const result = await as(role, "/api/globals/site-settings");
    assert.ok(
      result.status === 403 || result.status === 401,
      `${role} read site settings (${result.status})`,
    );
  }
});
