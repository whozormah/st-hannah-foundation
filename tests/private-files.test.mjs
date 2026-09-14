import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as, login } from "./helpers.mjs";

/* A13 and SEC-07: a file someone sent with a form is private. Nobody without
   the right role can open it, and with external storage (R2) staff get it
   through a link that stops working after five minutes.

   Works both ways: on local disk (development) the file is served directly
   to permitted staff; with R2 they are redirected to a signed link. */

// A 1×1 PNG, sent the way the in-kind form sends a photograph.
const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

async function offerWithPhoto() {
  const response = await fetch(`${BASE}/api/in-kind-donation`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullName: "Synthetic Donor",
      email: "donor@test.invalid",
      phone: "+2340000000001",
      category: "Clothing",
      description: "A test offer for the private-file check.",
      image: PNG,
    }),
  });
  const { reference } = await response.json();

  assert.ok(reference, "the in-kind offer was not accepted");

  const offer = (await as("owner", `/api/in-kind-offers?where[reference][equals]=${reference}&depth=0`)).body
    .docs[0];

  assert.ok(offer?.photo, "the photograph was not stored");

  const file = (await as("owner", `/api/submission-files/${offer.photo}?depth=0`)).body;

  assert.ok(file?.url, "the stored photograph has no address");

  return new URL(new URL(file.url, BASE).pathname, BASE).href;
}

const open = async (url, role) =>
  fetch(url, { redirect: "manual", headers: role ? { Authorization: `JWT ${await login(role)}` } : {} });

test("A13: a private file is refused to visitors and to staff without the role", async () => {
  const url = await offerWithPhoto();

  for (const role of [null, "content", "finance"]) {
    const response = await open(url, role);

    assert.ok(
      [401, 403, 404].includes(response.status),
      `${role ?? "a visitor"} was not refused (${response.status})`,
    );
    assert.ok(!response.headers.get("location"), `${role ?? "a visitor"} was sent a link`);
  }
});

test("A13/SEC-07: permitted staff get the file; with R2, only through a short-lived link", async () => {
  const url = await offerWithPhoto();

  for (const role of ["owner", "case"]) {
    const response = await open(url, role);

    if (response.status === 200) {
      // Local disk: served directly to permitted staff.
      assert.match(response.headers.get("content-type") ?? "", /^image\//);
      continue;
    }

    assert.ok([302, 307].includes(response.status), `${role} got neither the file nor a link (${response.status})`);

    const signed = new URL(response.headers.get("location"));
    const expires = Number(signed.searchParams.get("X-Amz-Expires"));

    assert.ok(expires > 0 && expires <= 300, `the link lasts ${expires} seconds, not five minutes or less`);

    const fetched = await fetch(signed);

    assert.equal(fetched.status, 200, "the signed link does not work");
    await fetched.arrayBuffer();

    const unsigned = new URL(signed);

    for (const key of [...unsigned.searchParams.keys()]) unsigned.searchParams.delete(key);

    const refused = await fetch(unsigned);

    assert.ok(refused.status >= 400, `the file opens without its signature (${refused.status})`);
    await refused.arrayBuffer();
  }
});
