# Change requests and decisions

Change control for the Product & Architecture Specification v1.0 (CHG-01).
Requirement identifiers are never reused or renumbered (CHG-02).

Interface defects that belong to no phase are tracked separately, in
[ui-issues.md](./ui-issues.md).

## Change requests

### CR-001 — Waive decisions 1 and 2 at the Phase 0 gate, for Phase 1 only

- **Status:** Approved, 12 September 2026
- **Affects:** Section 25, Phase 0 gate
- **Change:** Phase 1 may begin with decisions 3, 4 and 5 in hand. Decisions
  1 (US legal entity) and 2 (Paystack USD) concern payments only.
- **Condition:** Decisions 1 and 2 must be answered before Phase 5.

### CR-002 — PRV-08 takes effect in Phase 3, not Phase 1

- **Status:** Proposed — awaiting approval
- **Affects:** PRV-08, EML-07
- **Reason:** Until Phase 3, the email to the Foundation is the only copy of
  a submission. Removing sensitive values from it now would lose them,
  breaking PRD-02 ("no submission can be lost").
- **Change:** PRV-08 applies from the moment submissions persist to the
  database. Until then, sensitive values continue to reach the Foundation by
  email, and this is disclosed in the Privacy Policy's description of Resend.

### CR-003 — Add the international giving form to section 6.1

- **Status:** On hold — **do not implement.** The form's requirements and
  acceptance coverage must first be added to the specification, or the form
  must be explicitly deferred. Until then no work proceeds on it, and the
  existing endpoint is left exactly as it is.
- **Affects:** Section 6.1, section 3 (form path)
- **Reason:** `/api/international-interest` collects an email address but is
  not listed. The site collects personal information in eight places, not
  six: the six listed, plus this form and the online donation form.
- **Change:** Add `international_interest` (email, source endpoint
  `/api/international-interest`) to the table of carried-forward forms.

### CR-004 — Work may continue while the Phase 1 gate is open, within limits

- **Status:** Approved, 12 September 2026
- **Affects:** Section 25 ("a gate that does not pass stops the next phase")
- **Reason:** The Phase 1 gate exists to stop personal data being stored
  before the legal documents are in effect. Work that stores and exposes no
  real personal data does not engage that risk.
- **Change:** Implementation may proceed while Phase 1 awaits approval,
  **only** where it neither stores nor exposes real personal data, and only
  within the approved specification.
- **Conditions, all binding:**
  1. Phase 1 is **not merged** until the Foundation and lawyer decisions are
     resolved and CR-002 and CR-003 are settled.
  2. The approval guard in `LegalDocument.tsx` stays active and is **not**
     weakened, bypassed or stubbed to unblock development.
  3. Before any phase that persists real personal data — Phase 3 onward, and
     any earlier work that would write a real submission — **stop** and
     confirm every required Foundation and legal decision is resolved.
  4. Scope is never expanded silently; anything outside the specification is
     raised as a change request first.

### CR-005 — The admin must work on phones

- **Status:** Approved, 13 September 2026 — requested by the Foundation's
  developer
- **Affects:** ADM-04, which said the admin need only work at desktop and
  tablet widths and that "phone support is not required"
- **Change:** The admin must be fully usable on a phone: no sideways
  scrolling, no page zoom when a field is tapped, and tap targets of at least
  44px, measured at 360px and 390px.
- **Evidence:** `docs/admin-experience.md`.

## Decisions

| # | Decision | Answer | Date | Effect |
|---|---|---|---|---|
| 5 | National ID at application or approval? | At approval | 12 Sep 2026 | PRV-04 stands; field removed from the application |
| — | Who writes the legal documents? | Developer drafts from facts in the code; the Foundation's lawyer approves | 12 Sep 2026 | Documents stay `draft` until approved |
| — | Consent on forms without it | One-line notice and policy link; existing checkboxes unchanged | 12 Sep 2026 | PRV-03 display |

## Still open

| # | Decision | Blocks |
|---|---|---|
| 1 | Is there a US legal entity? | Phase 5 (CR-001) |
| 2 | Has Paystack approved USD settlement? | Phase 5 (CR-001) |
| 3 | Named data protection contact | PRV-02, PRV-10, PRV-11 — approval of the Privacy Policy |
| 4 | Retention periods per record type | PRV-06 — approval of the Privacy Policy |
| 6 | Who holds each role | Phase 2 |
| 7 | Tax-deductibility status | RCP-05 |
| 8 | Content freeze window | Phase 6 |
