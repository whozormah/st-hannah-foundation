# Setting up Cloudflare R2 (image and file storage)

The website keeps uploaded files in Cloudflare R2, not on the server, so a
redeploy never loses them (MED-01). Until R2 exists the media library cannot
go live (CR-011).

## Cost

Checked against Cloudflare's pricing page on 14 September 2026. Every month
includes, free:

| | Free each month | Beyond that |
|---|---|---|
| Storage | 10 GB | $0.015 per GB |
| Uploads and changes ("Class A") | 1 million | $4.50 per million |
| Reads ("Class B") | 10 million | $0.36 per million |
| Downloads to visitors | Always free | Always free |

The website's images today are 25 MB, a quarter of one percent of the free
storage, and visits are served through the website, so this should cost
nothing. The dashboard asks you to complete a "checkout" to turn R2 on;
Cloudflare's documentation does not say whether that needs a card.

## Steps

You need a Cloudflare account, ideally the one the website's domain is on.

1. **Turn on R2.** In the Cloudflare dashboard, open **Storage & databases →
   R2 → Overview** and complete the checkout.
2. **Create two buckets.** Names may use lowercase letters, numbers and
   hyphens (3 to 63 characters):
   - `shf-media`: the website's photographs;
   - `shf-private`: files people upload with a form (the in-kind photograph).
     This one is never public; staff open its files through short-lived
     links (SEC-07).

   Leave both buckets **without public access**. The website serves the
   images itself, through Cloudflare.
3. **Create an API token.** On the R2 page, under **Account Details**, choose
   **Manage** next to **API Tokens**, then **Create User API token**:
   - permission: **Object Read & Write**;
   - limit it to the two buckets above.
4. **Copy the three values shown:** the **Access Key ID**, the **Secret
   Access Key**, and your **Account ID**. The secret is shown **once only**.
5. **Send them to the developer securely,** never by plain email or chat.
   A password manager's secure share works well.

## What the developer does with them

They go into the server's settings file, never into the code:

```
R2_ACCOUNT_ID=…
R2_ACCESS_KEY_ID=…
R2_SECRET_ACCESS_KEY=…
R2_BUCKET_PUBLIC=shf-media
R2_BUCKET_PRIVATE=shf-private
```

Turning R2 on changes nothing in the database; the migration generator
confirms it. The content migration then uploads the 47 photographs straight
into `shf-media`.

## Rehearsed before the account exists

On 14 September 2026 the production path was rehearsed on the developer's
machine, with MinIO standing in for R2 (the same S3 interface): a fresh
database, every migration, the content migration uploading into storage,
and the website running against it. Results:

- all 47 photographs in the bucket, and nothing written to local disk;
- the full test suite (91 tests) and the 25-page comparison passing;
- a private file opened by staff through a signed link lasting 300 seconds,
  and refused to a visitor (A13, SEC-07).

**It caught a silent failure.** At first only the first photograph reached
storage; the other 46 were recorded in the database and never uploaded, with
no error. Payload's storage plugin keeps each upload's file on the write's
"context" and never clears it, and the migration reused one context for
every write. Each write now gets its own. The media test, which loads every
image, fails if this ever returns.

To repeat the rehearsal against the real R2, point the settings above at it
and run the content migration on a copy of the database.
