# Phase 3 — forms persist, verification

Branch `phase-3-forms-persist`, 13 September 2026. Built on Phase 2, with
Phase 1 merged in for the consent wording. **Unmerged and undeployed: no real
personal data has been stored anywhere.** Everything below ran against
synthetic test data on a local database.

## What changed

All six forms now write to the database **before** any email is attempted
(OPS-01), and a failed email no longer loses the submission (EML-06). In V1 the
email was the only copy — delete it and the application was gone.

| Form | Collection | Reference |
|---|---|---|
| Apply for support | `support-applications` — all fields the form posts, plus the four declarations | `SHA-000001` |
| Volunteer | `volunteer-applications` | `SHV-…` |
| Partner with us | `partner-enquiries` | `SHP-…` |
| Contact | `contact-messages` | `SHC-…` |
| Newsletter | `subscribers` — subscribing twice re-subscribes rather than failing | — |
| Donate items | `in-kind-offers`, **with the photograph** (OPS-03) | `SHF-…` |

- **References are sequential within their prefix** (OPS-04), allocated by one
  atomic database statement so two simultaneous submissions cannot share a
  number. The format changes from `SHC-260912-X4K9QZ` (random) to
  `SHC-000001`.
- **The accepted privacy-policy version and time** are stored with every
  submission (PRV-03).
- **The in-kind photograph** is decoded server-side, type allow-listed, capped
  at 10 MB and stored under a name generated from the reference — never the
  uploader's filename (SEC-08). A rejected photo does not cost the donor their
  submission.
- The international-giving form is untouched (CR-003 on hold).

## Tests

`npm run test:acl` — **33 of 33 passing**: the 22 access-control tests from
Phase 2 and 11 new ones.

| Test | Proves |
|---|---|
| Each of the six forms | A row exists after submission, with the submitted values |
| Support application | Consent version and time recorded; declarations stored |
| Newsletter twice | One row, not a duplicate and not an error |
| In-kind with a photo | The photograph is stored and linked |
| In-kind without a photo | Still saved |
| In-kind with a PDF as "photo" | File refused, **offer still saved** |
| Two contacts in a row | References are consecutive |
| Every prefix | Each form has its own counter |
| An incomplete submission | Refused, and **nothing written** |

**Email genuinely failed throughout.** The suite runs with no Resend key, so
every send fails — the server logged all eleven failures, and every submission
was saved regardless. That is the V1 data-loss bug, closed and proven.

## A defect found and fixed during this phase

The Phase 2 storage adapter covered only the public `media` collection. In
production, in-kind photographs would therefore have been written to the
container's own disk — lost on every redeploy (ARC-04, MED-01) and in the
wrong place for private files (SEC-07). Now:

- site media goes to the **public** bucket;
- submission files go to the **private** bucket, served only through signed
  URLs that expire after **five minutes**;
- a production server started without R2 says so loudly at boot, because the
  failure is otherwise silent.

The local fallback directories are gitignored.

## Found, not fixed

**Simultaneous logins by one account.** When the same account signs in
several times within the same instant, only one session survives (10 of 10
rounds reproduced it). Sequential logins — a laptop, then a phone — are
unaffected. It is a race in how Payload writes a user's session list. Real
impact is low given five staff and the login rate limit, so it is recorded
rather than worked around. The test files run one at a time for this reason.

## Needs a decision

1. **CR-002 is now live.** Submissions persist, so PRV-08 ("sensitive values
   never in email") can be met — but the emails to the Foundation still carry
   them, because CR-002 has not been approved.
2. **The sensitive-field list may be too short.** ACL-01 protects eight
   fields. Several others are free text about the applicant's circumstances
   and are visible to the Administrator: `incomeSourceOther`,
   `livingConditions`, `supportSummary`, `challenge`, `expectedImpact`,
   `stepsTaken`, `additionalInformation`. `incomeSourceOther` in particular
   can contain the very income detail `incomeSource` hides. Proposed as a
   change request, not applied.
3. **`photoKey`** is a deprecated, unused column, kept so this migration only
   adds columns. It is removed in a later migration on its own.

## Gate

**A1 passes.** Phase 3 cannot merge or deploy before Phase 1, which is still
waiting on the values listed in `docs/change-requests.md`.
