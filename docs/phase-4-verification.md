# Phase 4 — operations, verification

Branch `phase-4-operations`, 13 September 2026. Built on Phase 3. Unmerged
and undeployed; everything ran against synthetic test data.

## What changed

The workflow rules of section 07, enforced on the server so they hold for the
API as well as the admin:

| Requirement | Implementation |
|---|---|
| **WFL-01** | Only the moves in Figure 4 are allowed, for all five record types. A record can only be created in its starting state, and a finished one cannot change. Refusals name the moves that *are* allowed. |
| **WFL-02** | Every status change writes a history entry: who, from, to, when — in the same transaction, so a refused or failed change leaves none. |
| **WFL-03** | The admin's status control offers only the moves allowed from the saved status, and asks for confirmation before Approved or Declined. |
| **WFL-05** | Declining needs a reason, kept on the record. |
| **OPS-06** | Approval creates exactly one beneficiary, linked back to the application. |
| **EML-01** | Assigning an application notifies the assignee in the app; only they can see it. |
| Case notes | The author is always whoever is signed in, whatever the request claims. |

The transition table lives in one plain module (`payload/transitions.ts`) read
by both the server rule and the admin control, so the two cannot disagree.

## Tests

`npm run test:acl` — **50 of 50 passing**: 22 access control, 11 persistence,
17 workflow.

**The workflow tests were proven able to fail.** With the server rule
switched off, exactly the ten tests that depend on enforcement failed — all
five A14 tests, the decline-reason rule, the Administrator's limit, "a refused
move leaves no history", and the no-skipping checks. The seven that test the
permitted path still passed.

**WFL-03 was checked in the real admin**, with genuine mouse input: from
"Under review" the control offers only Under review, Approved and Declined;
choosing Approved asks first; cancelling changes nothing; confirming sets it.

## A defect that had existed since Phase 2

**The admin crashed in every browser.** The website's root layout was
wrapping the admin as well, so the admin's own document was nested inside the
site's, and React failed to hydrate it (error #418). The server answered
`/admin` with HTTP 200 throughout, and 200 is all Phases 2 and 3 checked — the
earlier verification records claiming the admin worked were wrong.

Fixed as the Next.js documentation prescribes: the website moved into its own
`(frontend)` route group with its own root layout, beside the admin's. URLs are
unchanged. Two consequences were handled:

- An unknown address would have lost the site's navigation, so the website
  now has its own not-found page and a catch-all that sends unmatched
  addresses to it, still with a 404 status.
- A lint rule began recognising the site's pages and flagged a plain `<a>`
  link to `/volunteer` in the About page's call to action — present on the
  live site all along. It is now a `<Link>`; nothing changes visually. CI
  fails on lint errors, so this would have blocked deployment.

**Verified in a real browser this time, not by status code:** 58 admin pages
as the Owner and each other role's key pages, plus the website, the legal
pages and a 404 — no crashes and no browser errors. Signing in through the
login form was also tested end to end.

**Merge note:** the `phase-2` and `phase-3` branches still carry the broken
admin. They should be merged as a stack with this branch, never on their own.

## Open question for the Foundation

Figure 4 draws the in-kind "Declined" branch from **Accepted**, not **New**:
as drawn, an offer must be accepted before it can be declined. It is
implemented exactly as drawn. If an offer should be declinable straight from
New, it is a one-line change in `payload/transitions.ts`.
