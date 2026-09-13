import test from "node:test";
import assert from "node:assert/strict";
import pg from "pg";

import { BASE, PASSWORD } from "./helpers.mjs";

/* The staff password reset, end to end. The email itself cannot be opened
   here, so the one-time token is read from the database — the same token the
   emailed link carries. Needs DATABASE_URL, as CI provides. */

const EMAIL = "finance@test.invalid";
const NEW_PASSWORD = "A-Brand-New-Passw0rd!";

async function post(path, body, token) {
  const response = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  return { status: response.status };
}

async function tokenFor(email) {
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL is required for this test");

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    const { rows } = await client.query(
      `select reset_password_token as token,
              extract(epoch from (reset_password_expiration - now())) / 60 as minutes
         from admin_users where email = $1`,
      [email],
    );

    return rows[0];
  } finally {
    await client.end();
  }
}

const signIn = (password) =>
  post("/api/admin-users/login", { email: EMAIL, password });

test("password reset: the whole journey, and the link works once", async (t) => {
  // Always leave the test account as it was, even if an assertion fails.
  t.after(async () => {
    const ownerLogin = await fetch(`${BASE}/api/admin-users/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "owner@test.invalid", password: PASSWORD }),
    });
    const { token } = await ownerLogin.json();
    const found = await (
      await fetch(`${BASE}/api/admin-users?where[email][equals]=${EMAIL}`, {
        headers: { Authorization: `JWT ${token}` },
      })
    ).json();

    await fetch(`${BASE}/api/admin-users/${found.docs[0].id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", Authorization: `JWT ${token}` },
      body: JSON.stringify({ password: PASSWORD }),
    });
  });

  const asked = await post("/api/admin-users/forgot-password", { email: EMAIL });
  assert.equal(asked.status, 200, "asking for a reset failed");

  const issued = await tokenFor(EMAIL);
  assert.ok(issued?.token?.length > 20, "no reset token was issued");
  assert.ok(
    issued.minutes > 55 && issued.minutes <= 60,
    `the link should last an hour, not ${Math.round(issued.minutes)} minutes`,
  );

  const reset = await post("/api/admin-users/reset-password", {
    token: issued.token,
    password: NEW_PASSWORD,
  });
  assert.equal(reset.status, 200, "setting a new password failed");

  assert.equal((await signIn(NEW_PASSWORD)).status, 200, "the new password does not work");
  assert.notEqual((await signIn(PASSWORD)).status, 200, "the old password still works");

  const reused = await post("/api/admin-users/reset-password", {
    token: issued.token,
    password: "Someone-Else-1!",
  });
  assert.notEqual(reused.status, 200, "a used reset link worked a second time");
});

test("password reset: an unknown address gets the same answer", async () => {
  // Otherwise the form would reveal which staff email addresses exist.
  const known = await post("/api/admin-users/forgot-password", { email: EMAIL });
  const unknown = await post("/api/admin-users/forgot-password", {
    email: "nobody@test.invalid",
  });

  assert.equal(unknown.status, known.status);
});
