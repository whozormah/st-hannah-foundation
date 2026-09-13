import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* Phase 3 gate (A1): every public form writes to the database before any
   email is attempted, and an email failure never loses the submission.

   These tests run with no RESEND_API_KEY configured, so sending genuinely
   fails on every request. That is the point: if a submission survives here,
   it survives a real outage. */

const unique = Date.now();

async function submit(path, body) {
  const response = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  return { status: response.status, body: await response.json() };
}

/** Reads a collection as the Owner, who may see everything. */
async function findByReference(collection, reference) {
  const { body } = await as(
    "owner",
    `/api/${collection}?limit=1&where[reference][equals]=${reference}`,
  );

  return body?.docs?.[0] ?? null;
}

test("A1: the support application is saved, and the email failure does not lose it", async () => {
  const result = await submit("/api/aid-application", {
    fullName: "Persist Test Applicant",
    email: `applicant-${unique}@test.invalid`,
    phone: "+2340000000002",
    supportType: "Education Support",
    situationNarrative: "PERSIST-TEST-NARRATIVE",
    monthlyIncome: "PERSIST-TEST-INCOME",
    declarationTrue: true,
    declarationNoGuarantee: true,
    declarationContact: true,
    declarationDataUse: true,
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));
  assert.ok(result.body.reference, "no reference returned");

  const saved = await findByReference(
    "support-applications",
    result.body.reference,
  );

  assert.ok(saved, "the application was not written to the database");
  assert.equal(saved.fullName, "Persist Test Applicant");
  assert.equal(saved.situationNarrative, "PERSIST-TEST-NARRATIVE");
  assert.equal(saved.status, "new");
  // PRV-03: the policy version accepted is stored with the record.
  assert.ok(saved.consentVersion, "no consent version recorded");
  assert.ok(saved.consentAt, "no consent timestamp recorded");
  assert.equal(saved.declarationDataUse, "Yes");
});

test("A1: the volunteer application is saved", async () => {
  const result = await submit("/api/volunteer-application", {
    fullName: "Persist Test Volunteer",
    email: `volunteer-${unique}@test.invalid`,
    phone: "+2340000000003",
    consent: "Yes",
    areaOfInterest: "Community Outreach",
    motivation: "PERSIST-TEST-MOTIVATION",
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference(
    "volunteer-applications",
    result.body.reference,
  );

  assert.ok(saved, "the volunteer application was not saved");
  assert.equal(saved.motivation, "PERSIST-TEST-MOTIVATION");
  assert.equal(saved.areaOfInterest, "Community Outreach");
});

test("A1: the partnership enquiry is saved", async () => {
  const result = await submit("/api/partnership", {
    organisation: "Persist Test Org",
    contactPerson: "Persist Test Contact",
    email: `partner-${unique}@test.invalid`,
    partnershipType: "Corporate Partnership",
    message: "PERSIST-TEST-PARTNER-MESSAGE",
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference(
    "partner-enquiries",
    result.body.reference,
  );

  assert.ok(saved, "the partnership enquiry was not saved");
  assert.equal(saved.organisation, "Persist Test Org");
  assert.equal(saved.message, "PERSIST-TEST-PARTNER-MESSAGE");
});

test("A1: the contact message is saved", async () => {
  const result = await submit("/api/contact", {
    name: "Persist Test Sender",
    email: `contact-${unique}@test.invalid`,
    subject: "Persist test",
    message: "PERSIST-TEST-CONTACT-MESSAGE",
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference(
    "contact-messages",
    result.body.reference,
  );

  assert.ok(saved, "the contact message was not saved");
  assert.equal(saved.status, "unread");
  assert.equal(saved.message, "PERSIST-TEST-CONTACT-MESSAGE");
});

test("A1: the newsletter subscription is saved, and subscribing twice re-subscribes", async () => {
  const address = `subscriber-${unique}@test.invalid`;

  const first = await submit("/api/newsletter", { email: address });
  assert.equal(first.status, 200, JSON.stringify(first.body));

  const { body } = await as(
    "owner",
    `/api/subscribers?limit=5&where[email][equals]=${address}`,
  );

  assert.equal(body.docs.length, 1, "the subscriber was not saved exactly once");
  assert.equal(body.docs[0].status, "subscribed");

  // The address is unique: a second signup must update, not error.
  const second = await submit("/api/newsletter", { email: address });
  assert.equal(second.status, 200, JSON.stringify(second.body));

  const after = await as(
    "owner",
    `/api/subscribers?limit=5&where[email][equals]=${address}`,
  );

  assert.equal(after.body.docs.length, 1, "subscribing twice created a duplicate");
});

// OPS-03: the photograph V1 discarded.
test("A1/OPS-03: the in-kind offer is saved with its photograph", async () => {
  // A one-pixel PNG, small enough to inline.
  const png =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

  const result = await submit("/api/in-kind-donation", {
    fullName: "Persist Test Donor",
    email: `inkind-${unique}@test.invalid`,
    phone: "+2340000000004",
    category: "Clothing",
    description: "PERSIST-TEST-ITEM",
    quantity: "2",
    condition: "Good",
    location: "Lagos",
    deliveryMethod: "Send",
    destination: "Nigeria",
    image: png,
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference("in-kind-offers", result.body.reference);

  assert.ok(saved, "the in-kind offer was not saved");
  assert.equal(saved.description, "PERSIST-TEST-ITEM");
  assert.ok(saved.photo, "the photograph was not stored");
});

test("OPS-03: an offer without a photograph is still saved", async () => {
  const result = await submit("/api/in-kind-donation", {
    fullName: "Persist Test Donor Two",
    email: `inkind2-${unique}@test.invalid`,
    phone: "+2340000000005",
    category: "Books",
    description: "PERSIST-TEST-NO-PHOTO",
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference("in-kind-offers", result.body.reference);
  assert.ok(saved, "an offer without a photo was lost");
});

test("OPS-03: a photograph of a disallowed type is refused without losing the offer", async () => {
  const result = await submit("/api/in-kind-donation", {
    fullName: "Persist Test Donor Three",
    email: `inkind3-${unique}@test.invalid`,
    phone: "+2340000000006",
    category: "Furniture",
    description: "PERSIST-TEST-BAD-PHOTO",
    image: "data:application/pdf;base64,JVBERi0xLjQK",
  });

  assert.equal(result.status, 200, JSON.stringify(result.body));

  const saved = await findByReference("in-kind-offers", result.body.reference);

  assert.ok(saved, "a rejected photo lost the whole submission");
  assert.ok(!saved.photo, "a disallowed file type was stored");
});

// OPS-04: references are unique and sequential within their prefix.
test("OPS-04: references are sequential within a prefix", async () => {
  const first = await submit("/api/contact", {
    name: "Sequence One",
    email: `seq1-${unique}@test.invalid`,
    subject: "Sequence",
    message: "one",
  });

  const second = await submit("/api/contact", {
    name: "Sequence Two",
    email: `seq2-${unique}@test.invalid`,
    subject: "Sequence",
    message: "two",
  });

  const [prefixA, numberA] = first.body.reference.split("-");
  const [prefixB, numberB] = second.body.reference.split("-");

  assert.equal(prefixA, "SHC");
  assert.equal(prefixB, "SHC");
  assert.equal(
    Number(numberB),
    Number(numberA) + 1,
    `${first.body.reference} then ${second.body.reference} is not sequential`,
  );
});

test("OPS-04: each form keeps its own prefix", async () => {
  const { body } = await as("owner", "/api/reference-counters?limit=20");
  const prefixes = (body.docs ?? []).map((row) => row.prefix).sort();

  for (const prefix of ["SHA", "SHC", "SHF", "SHP", "SHV"]) {
    assert.ok(
      prefixes.includes(prefix),
      `no counter for ${prefix} (found ${prefixes.join(", ")})`,
    );
  }
});

test("validation still refuses an incomplete submission, and saves nothing", async () => {
  const before = await as("owner", "/api/contact-messages?limit=0");

  const result = await submit("/api/contact", { name: "Only a name" });
  assert.equal(result.status, 400);

  const after = await as("owner", "/api/contact-messages?limit=0");

  assert.equal(
    after.body.totalDocs,
    before.body.totalDocs,
    "a rejected submission still wrote a row",
  );
});
