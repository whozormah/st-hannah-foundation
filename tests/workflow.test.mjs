import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* Phase 4 gate (A14) and the workflow rules of section 07.

   Every record here is created through the real public form, so each test
   starts from a genuinely new submission and none depends on another. */

let counter = 0;

async function newApplication() {
  counter += 1;

  const response = await fetch(`${BASE}/api/aid-application`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullName: `Workflow Applicant ${counter}`,
      email: `workflow-${Date.now()}-${counter}@test.invalid`,
      phone: "+2340000000010",
      supportType: "Medical Aid",
      declarationTrue: true,
      declarationNoGuarantee: true,
      declarationContact: true,
      declarationDataUse: true,
    }),
  });

  const { reference } = await response.json();
  const { body } = await as(
    "owner",
    `/api/support-applications?limit=1&where[reference][equals]=${reference}`,
  );

  return body.docs[0];
}

const move = (role, id, data) =>
  as(role, `/api/support-applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

const statusOf = async (id) =>
  (await as("owner", `/api/support-applications/${id}`)).body.status;

// ── A14: invalid transitions are refused by the server ────────────────────

test("A14: skipping a step is refused, and the status does not change", async () => {
  const app = await newApplication();
  assert.equal(app.status, "new");

  // New → Approved skips "Under review".
  const result = await move("case", app.id, { status: "approved" });

  assert.equal(result.status, 400, `expected 400, got ${result.status}`);
  assert.equal(await statusOf(app.id), "new", "an invalid move changed the status");
});

test("A14: the refusal says which moves are allowed", async () => {
  const app = await newApplication();
  const result = await move("case", app.id, { status: "closed" });

  const message = JSON.stringify(result.body);
  assert.ok(
    message.includes("Under review"),
    `the error should name the allowed move: ${message.slice(0, 200)}`,
  );
});

test("A14: the Owner is bound by the workflow too", async () => {
  const app = await newApplication();
  const result = await move("owner", app.id, { status: "support_provided" });

  assert.equal(result.status, 400);
  assert.equal(await statusOf(app.id), "new");
});

test("A14: a record cannot be created part-way through the workflow", async () => {
  const result = await as("owner", "/api/support-applications", {
    method: "POST",
    body: JSON.stringify({
      reference: `SHA-WF-${Date.now()}`,
      fullName: "Created Approved",
      status: "approved",
    }),
  });

  assert.equal(result.status, 400, `expected 400, got ${result.status}`);
});

test("A14: a finished record cannot change status", async () => {
  const app = await newApplication();

  await move("case", app.id, { status: "under_review" });
  await move("case", app.id, {
    status: "declined",
    declineReason: "Outside current programme scope (test).",
  });

  assert.equal(await statusOf(app.id), "declined");

  const result = await move("owner", app.id, { status: "under_review" });
  assert.equal(result.status, 400, "a declined record was reopened");
});

// ── The permitted path works end to end ───────────────────────────────────

test("the full path New → Under review → Approved → Support provided → Closed", async () => {
  const app = await newApplication();

  for (const status of ["under_review", "approved", "support_provided", "closed"]) {
    const result = await move("case", app.id, { status });
    assert.equal(result.status, 200, `could not move to ${status}: ${JSON.stringify(result.body).slice(0, 200)}`);
    assert.equal(await statusOf(app.id), status);
  }
});

test("the Administrator can move the workflow, but no further than it allows", async () => {
  const app = await newApplication();

  const ok = await move("administrator", app.id, { status: "under_review" });
  assert.equal(ok.status, 200);

  const refused = await move("administrator", app.id, { status: "closed" });
  assert.equal(refused.status, 400);
});

// ── WFL-05: declining needs a reason ──────────────────────────────────────

test("WFL-05: declining without a reason is refused", async () => {
  const app = await newApplication();
  await move("case", app.id, { status: "under_review" });

  const result = await move("case", app.id, { status: "declined" });

  assert.equal(result.status, 400);
  assert.equal(await statusOf(app.id), "under_review");
});

test("WFL-05: the reason is kept on the record", async () => {
  const app = await newApplication();
  await move("case", app.id, { status: "under_review" });

  const reason = "Applicant already supported by a partner organisation (test).";
  const result = await move("administrator", app.id, {
    status: "declined",
    declineReason: reason,
  });

  assert.equal(result.status, 200, JSON.stringify(result.body).slice(0, 200));

  const saved = (await as("owner", `/api/support-applications/${app.id}`)).body;
  assert.equal(saved.declineReason, reason);
});

// ── WFL-02: every move is recorded ────────────────────────────────────────

test("WFL-02: each status change writes a history entry naming who, from and to", async () => {
  const app = await newApplication();
  await move("case", app.id, { status: "under_review" });

  const { body } = await as(
    "owner",
    `/api/activity-log?limit=10&depth=1&where[recordId][equals]=${app.id}&where[collectionName][equals]=support-applications`,
  );

  assert.equal(body.docs.length, 1, `expected one entry, found ${body.docs.length}`);

  const entry = body.docs[0];
  assert.equal(entry.fromStatus, "new");
  assert.equal(entry.toStatus, "under_review");
  assert.equal(entry.actor?.email, "case@test.invalid", "the actor was not recorded");
  assert.ok(entry.occurredAt);
});

test("WFL-02: a refused move leaves no history", async () => {
  const app = await newApplication();
  await move("case", app.id, { status: "approved" }); // refused

  const { body } = await as(
    "owner",
    `/api/activity-log?limit=10&where[recordId][equals]=${app.id}&where[collectionName][equals]=support-applications`,
  );

  assert.equal(body.docs.length, 0, "a refused move was recorded as if it happened");
});

// ── OPS-06: approval creates exactly one beneficiary ──────────────────────

test("OPS-06: approving creates exactly one beneficiary, linked back", async () => {
  const app = await newApplication();

  await move("case", app.id, { status: "under_review" });
  await move("case", app.id, { status: "approved" });

  // Moving on must not create a second one.
  await move("case", app.id, { status: "support_provided" });

  const { body } = await as(
    "owner",
    `/api/beneficiaries?limit=5&where[application][equals]=${app.id}`,
  );

  assert.equal(body.docs.length, 1, `expected one beneficiary, found ${body.docs.length}`);
  assert.equal(body.docs[0].fullName, app.fullName);
});

test("OPS-06: a declined application creates no beneficiary", async () => {
  const app = await newApplication();

  await move("case", app.id, { status: "under_review" });
  await move("case", app.id, { status: "declined", declineReason: "Test." });

  const { body } = await as(
    "owner",
    `/api/beneficiaries?limit=5&where[application][equals]=${app.id}`,
  );

  assert.equal(body.docs.length, 0);
});

// ── The other four workflows ──────────────────────────────────────────────

test("contact messages: Unread → Read → Resolved, and no skipping", async () => {
  const response = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Workflow Contact",
      email: `wf-contact-${Date.now()}@test.invalid`,
      subject: "Workflow",
      message: "Workflow test",
    }),
  });
  const { reference } = await response.json();

  const { body } = await as(
    "case",
    `/api/contact-messages?limit=1&where[reference][equals]=${reference}`,
  );
  const id = body.docs[0].id;
  const patch = (status) =>
    as("case", `/api/contact-messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

  assert.equal((await patch("resolved")).status, 400, "Unread → Resolved should be refused");
  assert.equal((await patch("read")).status, 200);
  assert.equal((await patch("resolved")).status, 200);
});

test("volunteers: declining needs a reason there too", async () => {
  const response = await fetch(`${BASE}/api/volunteer-application`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullName: "Workflow Volunteer",
      email: `wf-vol-${Date.now()}@test.invalid`,
      phone: "+2340000000011",
      consent: "Yes",
    }),
  });
  const { reference } = await response.json();

  const { body } = await as(
    "case",
    `/api/volunteer-applications?limit=1&where[reference][equals]=${reference}`,
  );
  const id = body.docs[0].id;
  const patch = (data) =>
    as("case", `/api/volunteer-applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

  assert.equal((await patch({ status: "contacted" })).status, 200);
  assert.equal((await patch({ status: "declined" })).status, 400);
  assert.equal(
    (await patch({ status: "declined", declineReason: "Test." })).status,
    200,
  );
});

// ── Case notes and assignment ─────────────────────────────────────────────

test("case notes: the author is whoever is signed in, whatever is sent", async () => {
  const app = await newApplication();
  const owner = (await as("owner", "/api/admin-users/me")).body.user;

  // A Case Officer tries to attribute their note to the Owner.
  const created = await as("case", "/api/case-notes", {
    method: "POST",
    body: JSON.stringify({
      summary: "Home visit arranged (test)",
      application: app.id,
      author: owner.id,
    }),
  });

  assert.ok(
    created.status === 200 || created.status === 201,
    `could not create a note: ${created.status}`,
  );

  const note = (
    await as("owner", `/api/case-notes/${created.body.doc.id}?depth=1`)
  ).body;

  assert.equal(note.author?.email, "case@test.invalid", "the note was attributed to someone else");
});

test("assignment: the assignee is notified in the app, and only they see it", async () => {
  const app = await newApplication();
  const caseOfficer = (await as("case", "/api/admin-users/me")).body.user;

  const assigned = await move("owner", app.id, { assignedTo: caseOfficer.id });
  assert.equal(assigned.status, 200);

  const mine = await as(
    "case",
    `/api/notifications?limit=20&where[message][contains]=${app.reference}`,
  );

  assert.equal(mine.body.docs.length, 1, "the assignee was not notified");

  const others = await as(
    "content",
    `/api/notifications?limit=20&where[message][contains]=${app.reference}`,
  );

  assert.ok(
    !others.body?.docs?.length,
    "another member of staff could see the assignee's notification",
  );
});
