# Phase 2 — platform skeleton, verification

Branch `phase-2-platform-skeleton`, 12 September 2026. Built against the
approved Product & Architecture Specification v1.0.

**No production content was migrated, no real personal data exists anywhere in
this work, and CR-002 and CR-003 were not implemented.**

## What the access-control suite proves

`npm run test:acl` — 22 tests, all passing. Every assertion goes over HTTP
against the running application, so a rule enforced only in the admin
interface would fail.

| Area | Tests |
|---|---|
| Authentication | Each of the five roles signs in; a wrong password is refused; an unauthenticated read of applications is refused |
| **A5** — applications unreachable | Content Manager refused over REST and over GraphQL; Finance refused |
| **A6** — sensitive fields withheld | Administrator receives the case but none of the eight fields; none of the seeded sensitive *values* appear anywhere in the payload; GraphQL withholds them too; Case Officer and Owner do receive them |
| Write limits | Administrator may move the status but may not edit the application; Case Officer may edit it |
| Matrix spot checks | Finance reads donations, Case Officer and Content cannot; Administrator reads but cannot write them; Content Manager creates but cannot delete; Case Officer cannot reach content |
| Staff accounts | Only the Owner lists every account; a role cannot be self-escalated |
| Audit log | Owner and Administrator read it; **nobody can write to it, including the Owner** |
| Settings | Owner and Administrator only |

### The tests were proven able to fail

A passing suite is worthless if it cannot detect the thing it claims to check.
`sensitiveRead` was temporarily widened to include the Administrator, the
application rebuilt, and the suite re-run:

```
not ok 7 - A6: the Administrator sees the case but not the sensitive fields
not ok 8 - A6: the sensitive values appear nowhere in the Administrator's response
not ok 9 - A6: GraphQL withholds the sensitive fields from the Administrator
# pass 19  # fail 3
```

Exactly those three failed and nothing else. The change was then reverted and
the suite returned to 22 passing.

> **Correction, 13 September 2026.** The admin returned HTTP 200 but crashed
> in every browser: the site's root layout wrapped it, and React failed to
> hydrate the nested document. This record checked only the status code. The
> defect and its fix are in `docs/phase-4-verification.md`.

## Other checks

| Check | Result |
|---|---|
| `npm run build` | Passed — 40 static pages plus the admin and API routes |
| `npx tsc --noEmit` | Passed |
| `eslint` | 0 errors (4 warnings, all in Payload's generated migration) |
| `npx payload migrate` | Passed — **66 tables** created, migration recorded |
| `/api/health` | `{"status":"ok"}` |
| `/admin` | 200 — **but see the correction below** |
| Public site | Home 200, unchanged |
| **A12** — backup and restore | Passed: dump encrypted (`Salted__`), restored into a throwaway container, row counts asserted (5 staff accounts, 1 application) |

## Infrastructure, proven locally

The Docker, Nginx and workflow configuration was originally written from the
specification and never run. It has since been executed:

| Check | Result |
|---|---|
| `docker build` | Passed — production image, 397 MB. A `.dockerignore` keeps `node_modules` and `.next` out of the context |
| `nginx -t` | Passed against the real configuration and certificates |
| `actionlint` | Passed — no findings in either workflow |
| **Full stack via Compose** | Nginx, app and PostgreSQL started together; the site served over TLS, `/admin` 200, HTTP correctly 301s to HTTPS |
| **A11 rehearsal** | A fresh database restored from the encrypted backup, then the app started and served — **43 seconds** end to end |
| Restored data | 5 staff accounts and the application came back intact |
| **SEC-05 rate limiting** | Proven live: four logins allowed (one plus a burst of three), then throttled |

Two changes came out of this:

1. **A `.dockerignore`**, without which the build context carried
   `node_modules` and `.next` — slow, and wrong, since both are rebuilt inside
   the image.
2. **`limit_req_status 429`.** Nginx throttles with 503 by default, which
   reads as the site being down. 429 says what actually happened.

### Running the suite through Nginx trips the rate limit

Run end to end against the Compose stack, 17 of the 22 tests pass and five
fail — every one of them a login throttled by Nginx, confirmed in its error
log. That is the rate limit working, not an access-control defect. The suite
is therefore run against the application directly, as CI does; the rate limit
is verified separately, as above.

## What still cannot be proven, and why

| Gate | Blocked by |
|---|---|
| **A11** — the real gate | No droplet. The rehearsal above used an image already built locally, with no pull, no DNS and no TLS provisioning. It de-risks the gate; it does not pass it |
| **A22** — `/admin` unreachable without a Cloudflare Access identity | No Cloudflare account, and the domain is not yet connected |
| R2 storage | No Cloudflare credentials. The adapter switches on only when `R2_*` is set, so local runs and CI are unaffected |
| The deploy workflow | Lints clean, but has never run: it needs a droplet and repository secrets |
| Memory under load on the 1 GB tier | Needs the real droplet |

**The Phase 2 gate is therefore not fully passed.** A5, A6 and A12 pass; A11
and A22 remain outstanding.

## Deliberate decisions worth review

1. **Staff can read their own account.** The matrix gives "no access" to
   admin-users for everyone but the Owner, but the admin panel cannot render
   a session without reading the signed-in user. Non-Owners see only their own
   record and cannot change their own role — proven by test 20.
2. **`push: false` on the database adapter.** Schema changes ship only as
   reviewed, forward-only migrations (DEP-05), never an implicit push.
3. **GraphQL introspection is disabled in production.** A Payload default,
   kept. The test therefore names the query explicitly and proves it against
   the Owner first, so a typo cannot make the test pass by accident.
4. **`"type": "module"`.** Required by Payload, as the spike found. Everything
   in the repository still builds, lints and typechecks.
5. **Collections are the skeleton, not the finished model.** Form-derived
   tables carry the system columns and the sensitive fields only; the full
   field lists arrive in Phase 3 when the forms actually persist.

## Running it locally

```bash
npm run db:up                                    # PostgreSQL on 55433
cp .env.example .env.local                       # set DATABASE_URL, PAYLOAD_SECRET
npx payload migrate
ALLOW_SEED=1 npx tsx scripts/seed-test-data.ts   # five roles + one synthetic case
npm run build && npx next start -p 3100
TEST_BASE_URL=http://localhost:3100 npm run test:acl
```

Note: `npx payload run <script>` exits silently without running the script on
this setup; `npx tsx` runs it correctly. The seed refuses to run unless
`ALLOW_SEED=1` is set, so it cannot be pointed at production by accident.
