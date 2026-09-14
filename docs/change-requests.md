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

### CR-006 — Phase 6 (content) before Phase 5 (payments)

- **Status:** Approved, 13 September 2026
- **Affects:** Section 25, delivery order
- **Reason:** Phase 5 is blocked until decisions 1 and 2 are answered
  (CR-001). Phase 6 depends on nothing outstanding and involves no personal
  data, so it proceeds under CR-004.
- **Change:** Phase 6 runs before Phase 5. Phase 5 follows once decisions 1
  and 2 are answered.

### CR-007 — CMS pages render on request, with cached content

- **Status:** Approved, 13 September 2026
- **Affects:** ARC-02 ("public pages are statically rendered")
- **Conflict:** A static build reads the content while building. ARC-05
  requires images to be built in CI, which cannot reach the live database — so
  static pages would bake in CI's empty test database, not the Foundation's
  content.
- **Change:** Pages that show CMS content render on request. The content reads
  are cached and tagged (`lib/cms.ts`) and invalidated on publish, so each
  request does little work, and Cloudflare caches the finished pages — keeping
  ARC-02's aim that public traffic rarely reaches the server.
- **Evidence:** a published edit was live on the homepage 1.1 seconds later;
  a draft never appeared (`tests/cms-publish.test.mjs`). Every content type
  the site shows is checked the same way (`tests/cms-content.test.mjs`).
- **Refresh behaviour:** publishing expires the cached content at once
  (`revalidateTag` with `expire: 0`), so the first visitor afterwards sees the
  change. The "max" profile the Next.js docs suggest serves that visitor the
  old version while it refreshes — on this site, usually the editor checking
  their own change. The tests require the first visit to show the edit.
- **Technical note:** caching uses `unstable_cache`, which Next.js 16 still
  supports. Its replacement, `'use cache'`, requires switching the whole app to
  Cache Components, which changes how every page renders; that move is left
  for later and is contained to `lib/cms.ts`.

### CR-008 — Homes for the content the model does not cover

- **Status:** Approved, 13 September 2026 — option (a): every one becomes
  editable in the CMS
- **Affects:** Section 5 (content model) and section 22 (migration)
- **Conflict:** Section 22 migrates *every* file in `public/data`, but section
  5 has no collection or global for nine of them: volunteer opportunities,
  volunteer benefits, featured events, video highlights, donation impact,
  in-kind categories, apply-for-support information, the volunteers list and
  the campaign details shown on the site.
- **Options:** (a) add a collection or global for each, so all of it becomes
  editable; (b) keep some as code, where they change rarely enough not to need
  editing.
- **Also:** `donation-faqs.json` and `homepage/core-values.json` are used by no
  page (core values were removed at the client's request) and are not
  migrated. `legal.json` stays out of Phase 6: it belongs to Phase 1's approval
  gate.
- **Follow-up, 13 September 2026:** two of the nine turned out to be shown
  nowhere on the website: in-kind categories and donation impact (the Donate
  Page global). The sections that displayed them had already been retired
  from the donate page, and were deleted in Phase 6 as unused code. Agreed:
  keep both in the CMS, marked in the admin as "not shown on the website at
  the moment", so the content is ready if those sections return and editors
  are not left wondering why a change appears nowhere.

### CR-009 — Two more homepage block types

- **Status:** Approved, 13 September 2026
- **Affects:** CNT-03 (the homepage block library)
- **Conflict:** The homepage has ten sections. CNT-03's twelve blocks cover
  eight; "Vision & Mission" and the leadership preview have no block. Building
  them from rich text or image-and-text would change how they look, which
  PUB-02 forbids.
- **Change:** The block library gains **vision and mission** and **leadership
  preview**: fourteen blocks. The homepage looks exactly as it does now, and
  editors can reorder or remove any section.
- **Unchanged:** CNT-01's block canvas for the legal pages stays with Phase
  1's approval gate, not Phase 6.
- **As built:** the homepage is the one page in Pages (`home`); no other can
  be created. Each block that wraps an existing section edits that section's
  heading wording, pre-filled with the site's own (`lib/section-copy.ts`).
  The video block is a picture that opens the video on YouTube or Vimeo, not
  an embedded player, which would let the video site track every homepage
  visitor — something the Privacy Policy does not cover. The page's one
  screen-reader heading moved out of the hero, so removing or repeating the
  hero cannot leave the page with none or two (PUB-07). The interim
  Homepage global (hero slides only) is replaced by the hero block.

### CR-010 — Each statistic stored once; historic totals stay typed in

- **Status:** Approved, 13 September 2026
- **Affects:** CNT-09, CNT-10, A21
- **Conflict:** CNT-09 requires any figure the system can calculate to be
  calculated. The Foundation's totals ("500+ widows supported") come from
  years of work before the system; counting its records would show close to
  zero, which is false. Separately, the same figure was stored once per page,
  under different names — "outreach activities" on /programs, "outreach
  events" on /impact-stories — the drift section 5.4 warns about.
- **Change:**
  1. Each figure is stored once and shown on every page that uses it, so no
     two pages can disagree. The ten: children reached, widows supported,
     educational beneficiaries, communities reached, lives reached, outreach
     events, years of service, countries represented, families reached,
     students sponsored. Page labels are unchanged. The last two, and the
     About page's "10+ years of service", were typed into page code rather
     than the data file; the A21 test found them.
  2. Historic totals stay typed in, under CNT-10, each with its own source
     note and "verified on" date. They count as unmeasurable by the system
     until its records can produce them.
  3. Figures the system can count are counted. Of those in section 5.4, the
     site shows only photographs per gallery area, already counted from the
     gallery itself.
- **Note:** the retired donate-page figures (CR-008) repeat four of these,
  under slightly different labels; the migration checks they agree. If that
  section returns, it reads the same stored figures.
- **For the Foundation (MIG-07):** the Partnerships page says "Multiple"
  communities impacted, where the homepage says 50+. "Multiple" is not a
  figure, so it is left as written until the Foundation says which to show.

### CR-011 — Alt text drafted by the developer, approved by the Foundation

- **Status:** Approved, 13 September 2026
- **Affects:** MIG-08, CNT-06
- **Conflict:** MIG-08 says alt text is "preserved", but none of the 65 images
  has any; the site builds it from titles and names. Under CNT-06, an image
  without alt text cannot be published, so migrating them bare would take
  every image off the site.
- **Change:** The developer drafts alt text by looking at each photograph,
  describing only what is visible: no names, places or events that cannot be
  seen. The Foundation corrects and approves it, as with the legal documents.
- **Condition:** The media library is built and verified now but goes live
  only once Cloudflare R2 exists (MED-01); until then an upload would be
  written to a disk the next deployment discards.

## Decisions

| # | Decision | Answer | Date | Effect |
|---|---|---|---|---|
| 5 | National ID at application or approval? | At approval | 12 Sep 2026 | PRV-04 stands; field removed from the application |
| — | Who writes the legal documents? | Developer drafts from facts in the code; the Foundation's lawyer approves | 12 Sep 2026 | Documents stay `draft` until approved |
| — | Consent on forms without it | One-line notice and policy link; existing checkboxes unchanged | 12 Sep 2026 | PRV-03 display |
| 8 | Content freeze during migration | Agreed: nobody edits the content files in `public/data` while they are migrated | 13 Sep 2026 | MIG-04; Phase 6 may proceed |

## Still open

| # | Decision | Blocks |
|---|---|---|
| 1 | Is there a US legal entity? | Phase 5 (CR-001) |
| 2 | Has Paystack approved USD settlement? | Phase 5 (CR-001) |
| 3 | Named data protection contact | PRV-02, PRV-10, PRV-11 — approval of the Privacy Policy |
| 4 | Retention periods per record type | PRV-06 — approval of the Privacy Policy |
| 6 | Who holds each role | Phase 2 |
| 7 | Tax-deductibility status | RCP-05 |
