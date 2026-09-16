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
  written to a disk the next deployment discards. The application container
  mounts no volume for uploads. When R2 is switched on, the public bucket's
  address must be added to Next's allowed image hosts.
- **As built:** the 65 image paths the content used are 47 distinct
  photographs; each is uploaded once, with every path it was at recorded,
  and pointed to wherever it appears. The drafts are in
  `scripts/data/alt-text-drafts.json`, and each image has a "Description
  approved by the Foundation" tick, off until the Foundation checks it; the
  migration never overwrites an approved description. Visitors can view
  images and their descriptions — a browser must load the file, and Payload
  serves a file only to someone allowed to read it — but not the approval
  tick or the migration record, and cannot upload, change or delete.
  Sections still use names and titles as alt text where they did before;
  only the image-and-text and video blocks show the library description.
  Page-template images (page headers, the logo) are part of the fixed
  layouts (CNT-02) and stay in code.
- **For the Foundation (MIG-07, CNT-11), found while drafting:**
  1. Several images appear to be AI-generated or stock pictures rather than
     photographs of the Foundation's work: the Business Empowerment and
     Medical Aid Outreach story images (also the Equipment Support and
     Medical Aid programme images), and the Family Support, Financial Aid
     and Support Our Men programme images. The three homepage hero images
     look like stock photography. Two illustrate impact stories as if they
     showed the beneficiaries. Nothing has been changed; the descriptions
     say only what is visible.
  2. All six gallery photographs in "Community Outreach" are the same files
     as six filed under Widow Empowerment and Education Support, so the
     gallery shows them twice under different programmes. The migration
     reports each pair.

### CR-012 — Permanent redirects are sent as 308, not 301

- **Status:** Proposed — awaiting approval
- **Affects:** PUB-01 ("No public URL changes without a 301 redirect recorded
  in redirects")
- **Conflict:** Redirects are recorded in the admin and looked up in the
  database when an address is not found. From a page, Next.js sends a
  permanent redirect as **308**. A literal 301 would need Next's proxy, which
  its documentation recommends avoiding, and warns against for code that
  relies on shared modules such as the database connection.
- **Change:** Permanent redirects are sent as 308, the method-preserving form
  of 301. Browsers follow both the same way, and search engines treat 308 as
  a 301 when moving a page's ranking to its new address.
- **If not approved:** a proxy limited to the public pages returns a 301,
  keeping its database lookup as small as possible.

### CR-013 — A homepage appeal for a fundraising event, with video

- **Status:** Approved, 14 September 2026 — requested by the Foundation's
  developer for the Widows Program 2026 (24 December 2026, 25 Ilaje Road,
  Bariga, Lagos)
- **Affects:** Section 5 (content model), CNT-03 (block library), MED-03
  (upload types and limits)
- **Change:**
  1. A new **Events** collection (Content): title, date, venue, a few lines
     in the Foundation's words, a photo or video, an optional flyer, and a
     recap for after the event.
  2. A new homepage block, **Event Appeal**: the chosen event beside a
     donation appeal. The donation opens the existing form with the event
     named. It counts down to the event, says "Happening today" on the day,
     and becomes a thank-you with the recap afterwards. Placed straight
     after the hero while the appeal runs; editors can move or remove it.
  3. Video uploads (MP4) in the media library, for event films: a short
     silent loop for the section and the full film, which opens on the
     page. Not embedded from a video site, so visitors are not tracked.
  4. "Download flyer", "Share on WhatsApp" (a plain link), and the venue
     linking to a map (a plain link, no embedded map).
- **Also, for campaign stories:** a story may have its own video, shown in
  place of its main picture, silent on a loop until a visitor taps for sound
  (then from the start, with controls). A video keeps its own shape, so
  subtitles recorded in it are never cropped. Esther Orga's story uses her
  video, supplied by the Foundation; the file was only re-wrapped for
  streaming, not edited.
- **Not included:** no goal amount or "raised so far" figure (the
  Foundation chose none; a raised figure must come from donation records,
  CNT-09, so it waits for Phase 5 in any case). No sign-ups or tickets,
  which would collect personal data before the legal gate.
- **Architecture:** the video is served by the application with range
  requests, which Payload supports from local disk and from R2, so phones
  can play and seek. Like all media it goes live with R2 (MED-01). Before
  go-live, a Cloudflare cache rule must cache media files, so repeat plays
  are served by Cloudflare rather than the 1 GB droplet.
- **Limits (extending MED-03):** video MP4 only, up to 50 MB; the section's
  loop is prepared at a few MB. MED-04's spirit applies: the developer
  prepares web versions of the Foundation's file rather than publishing it
  as recorded.
- **As built:** a live countdown to the day in Lagos (days, hours, minutes,
  seconds), the picture filling the section, the title set as a poster with
  the year in gold outline, the date and venue on a ticket stub with
  directions, and amount buttons that open the existing donation form with
  the event and amount chosen. A picture caption says when footage is from,
  so last year's is never taken for this year's. The redesign after the
  Foundation's first review ("the design is boring — the countdown should
  really count") is what is built. Media uploads are now held to MED-03's
  limits too: they were not enforced before.

### CR-014 — A redesigned Vision and Mission section

- **Status:** Approved, 15 September 2026 — requested by the Foundation's
  developer after reviewing the event appeal
- **Affects:** PUB-02 ("the existing design system ... retained unchanged")
- **Change:** The homepage's Vision and Mission section is redesigned as an
  editorial manifesto: the introduction with a drop cap; the vision and
  mission as two staggered panels, each with its name in large outline down
  its edge (left out on phones), matching the event appeal. After the
  Foundation's second review ("make it better"): the panels rise gently into
  place on scroll, only where browsers support scroll-driven animation and
  never for visitors who ask for less motion. A photograph beside the
  introduction was tried and removed at the Foundation's request. The
  brand's colours, typefaces and every word (from About the Foundation) are
  unchanged.
- **A18:** the Foundation's words are identical in the page. The comparison
  reads text as displayed, so it also sees the two decorative words
  ("Vision", "Mission", hidden from screen readers) and the section's labels
  shown in capitals by style; the homepage is re-baselined for these
  intended differences only.

### CR-015 — Text across the site a little smaller

- **Status:** Approved, 15 September 2026 — requested by the Foundation's
  developer ("reduce the website fonts just a bit")
- **Affects:** PUB-02 ("the existing design system ... retained unchanged")
- **Change:** Every step of the site's type scale is about 5% smaller (the
  main body size goes from 20px to 19px; large headings from 50px to 48px).
  It is one change in `app/globals.css`, so every page follows. Typefaces,
  colours, spacing and words are unchanged; sizes set outside the scale
  (the small uppercase labels and the outlined decorative words) keep theirs.
- **A18:** text only changes size, so the words compared are unaffected.

### CR-016 — A redesigned Join the Mission section

- **Status:** Approved, 15 September 2026 — requested by the Foundation's
  developer ("redesign the join the mission section")
- **Affects:** PUB-02 ("the existing design system ... retained unchanged")
- **Change:** The homepage's closing Call to Action is laid out like the
  Vision and Mission section: the invitation, its quote and attribution on
  the left; the three ways to join (donate, volunteer, partner) on the right
  as tall doorways, donating first and in gold; a sunrise drawn from the
  section-label rays behind the closing line. The doorways rise into place on
  scroll where supported. What each doorway does, the brand's colours and
  typefaces, and every word are unchanged; the editable eyebrow, title and
  description still come from the homepage's Call to Action block.
- **A18:** the words and their order in the page are identical.

### CR-017 — A staff sign-in link in the footer

- **Status:** Approved, 15 September 2026 — requested by the Foundation's
  developer ("link to access the admin page should be on the footer too")
- **Affects:** the public footer, on every page
- **Change:** "Staff Sign In", beside the Privacy Policy and Terms of Use
  links, opens `/admin`. The admin's own sign-in and roles are unchanged: the
  link only saves staff typing the address. It carries `rel="nofollow"`, and
  `robots.txt` now also asks search engines not to crawl `/admin`.
- **A18:** every page gains the words "Staff Sign In"; pages are re-baselined
  for that line only.

### CR-018 — A redesigned Stories of Transformation section

- **Status:** Approved, 15 September 2026 — requested by the Foundation's
  developer ("redesign stories of transformation")
- **Affects:** PUB-02 ("the existing design system ... retained unchanged")
- **Change:** The homepage's three impact stories are set like a magazine
  instead of three equal cards: the first story fills a tall cover with its
  category, title and opening words over the photograph; the other two sit
  beside it as slim cards with square pictures. The heading moves left and
  takes the same rays mark as Vision and Mission and Join the Mission. The
  cards rise into place on scroll where supported. Which stories appear
  (the first three, newest first), where they link, the editable eyebrow,
  title and description, and every word are unchanged.
- **A18:** the words and their order in the page are identical.

### CR-019 — A fourth hero slide: the vision behind the work

- **Status:** Approved, 16 September 2026 — requested by the Foundation's
  developer
- **Affects:** PUB-02 ("the existing design system ... retained unchanged"),
  CNT-03 (the hero block's fields)
- **Change:** The homepage hero gains a fourth slide carrying the founder's
  photograph, with the Foundation's own words: label "The Vision Behind The
  Work", heading "A Vision to See Lives Changed.", and text "St. Hannah
  Foundation was born from a conviction that every person deserves the
  opportunity to live with dignity, hope and purpose." Its button reads "Our
  Story" and opens the About page; the fixed "Apply For Aid" button stays, as
  on every slide. The hero's layout, timing, pagination, reduced-motion
  behaviour and gradient are untouched.
- **Editable:** the small label above the heading was fixed in code for every
  slide ("Serving Widows, Children & Families"). It is now a per-slide field,
  **Small Label**, and slides that leave it empty still show that wording, so
  the first three slides are unchanged. The new slide is edited in the CMS
  exactly like the others (Pages → Home → Hero → Slides).
- **The photograph:** the founder's portrait, placed to the right over the
  site's dark brown so the words keep the left of the frame, its edge softened
  into the background. No part of the photograph is altered; nothing is added
  to it.
- **Phones:** the hero fills the screen's height, so a phone shows only a
  narrow middle strip of each picture, which on this slide cut the founder's
  face. At the Foundation's choice, phones now frame the pictures right of
  centre (65%) on every slide; tablets and desktops are unchanged.
- **A18:** the homepage gains the new slide's words; it is re-baselined for
  those lines only.

### CR-020 — Stories say when they happened and which programme they came from

- **Status:** Approved, 16 September 2026 — requested by the Foundation's
  developer, to make the difference unmistakable: Our Programmes are what the
  Foundation does; Stories of Transformation are what happened because it did
- **Affects:** PUB-02, section 5 (the Impact Stories content type)
- **Change:** every story card (the homepage section, the Impact Stories list,
  the featured story and "Continue Reading" on story pages) shows, beneath the
  summary, the story's date and how many it reached, and "Part of our …
  programme". Each part appears only when the story has it: nothing is filled
  in or guessed. "Reached" is the wording the site already used.
- **New field:** Impact Stories gain an optional **Programme**, a link to a
  programme. The card shows the programme's current name, so renaming a
  programme updates every card; a programme a story links to cannot be deleted
  while the link stands.
- **Links set, at the Foundation's choice:** UTME Sponsorship → Education
  Support; Family Feeding → Family Support; Medical Aid Outreach → Medical Aid;
  Widow Empowerment → Widows Support Program. Business Empowerment matches no
  programme and shows none until one is set.
- **Not changed:** no extra spacing between the two homepage sections, which
  are already three sections apart.
- **A18:** story cards gain these lines; the affected pages are re-baselined for
  them only.

### CR-021 — A full transformation story, with real testimonies

- **Status:** Approved, 16 September 2026 — requested by the Foundation's
  developer, first for the 24 December 2025 widows outreach
- **Affects:** PUB-02, section 5 (Impact Stories), the story page
- **Change:** a story page can now carry, each part hidden until it has real
  content: confirmed **impact figures**; **pictures within the story**, placed
  between its paragraphs; a full-width **photo gallery** in the site's gallery
  viewer; a **Watch The Story** video section; **Hear From Them: Voices of
  Transformation**, for written, video and photo testimonies; the **programme**
  it belongs to, linking to it; and **Share This Story** (the device's share
  sheet, WhatsApp, Facebook, X, copy link; plain links, no third-party
  scripts). The Challenge, Our Response and Impact Created headings now show
  only when they have text.
- **Consent:** each testimony records whether the person is named or
  anonymous and carries **Consent to publish confirmed**. Without the tick it
  is kept in the CMS but never shown: the check runs on the server, so its
  words and name are not sent with the page either. A named testimony needs a
  name; each needs words or a video. Stories are not readable through the API
  by visitors.
- **Known limit:** files in the media library are public by address (MED-01).
  Staff are told, in the admin and the editor guide, to upload a testimony's
  video or photograph only once consent is given.
- **Content, at the Foundation's choice:** the August 2025 widows story is
  replaced, at the same address, by "Restoring Dignity, Renewing Hope for
  Widows" (24 December 2025, 35 Ilaje Road, Bariga, Lagos; figure: 500+ widows
  gathered), in the Foundation's words. Its old quote, not a testimony
  supplied for this outreach, is removed. The gallery keeps the Foundation's
  widows programme photographs under its existing heading, which names no
  date. Testimonies, event videos and outreach photographs are added when the
  Foundation supplies them. The 2026 event's venue is corrected to 35 Ilaje
  Road.
- **Tests:** `tests/story-page.test.mjs`.

### CR-022 — Stories in parts, with key lines and what the support included

- **Status:** Approved, 16 September 2026 — requested by the Foundation's
  developer, first for the 2026 UTME story
- **Affects:** section 5 (Impact Stories), the story page
- **Change:** each paragraph of a story may carry a **Heading Above**, opening
  a new part ("More Than Registration"), and may be marked **Highlight this
  line**, set larger in the display type. A story may list **What The Support
  Included**, shown after it. A story may name its own **Testimonies Heading**
  ("Hear From the Students"; empty shows "Hear From Them"). Testimonies now
  follow the story directly, before the gallery and videos, so the people it
  is about come first. The automatic enlargement of short lines (CR-021) is
  replaced by the explicit highlight; the widows story's "And it is only the
  beginning." is marked so, and looks as before.
- **Content, at the Foundation's choice:** "Opening Doors Through UTME
  Sponsorship" becomes **"Making Education Possible"**, in the Foundation's
  words, for the 2026 UTME: date "2026"; figure "15+ Students supported"; the
  support list (UTME registration sponsorship, mentorship, examination
  preparation, academic tutorials), which also stands for the Impact points,
  as agreed. Its unsourced quote ("Without this sponsorship…", "Student
  Beneficiary") is removed, and a photograph listed twice in its gallery is
  listed once. Student testimonies, photographs and videos are added when the
  Foundation supplies them.
- **Tests:** `tests/story-page.test.mjs`.

## Decisions

| # | Decision | Answer | Date | Effect |
|---|---|---|---|---|
| 5 | National ID at application or approval? | At approval | 12 Sep 2026 | PRV-04 stands; field removed from the application |
| — | Who writes the legal documents? | Developer drafts from facts in the code; the Foundation's lawyer approves | 12 Sep 2026 | Documents stay `draft` until approved |
| — | Consent on forms without it | One-line notice and policy link; existing checkboxes unchanged | 12 Sep 2026 | PRV-03 display |
| 8 | Content freeze during migration | Agreed: nobody edits the content files in `public/data` while they are migrated | 13 Sep 2026 | MIG-04; Phase 6 may proceed |
| — | Update the current Vercel site with the new work before launch? | No: the Vercel site stays as it is; the new site goes live on its own server as planned | 15 Sep 2026 | No Vercel preview or partial port; launch still waits on R2, the database and legal approval |

## Still open

| # | Decision | Blocks |
|---|---|---|
| 1 | Is there a US legal entity? | Phase 5 (CR-001) |
| 2 | Has Paystack approved USD settlement? | Phase 5 (CR-001) |
| 3 | Named data protection contact | PRV-02, PRV-10, PRV-11 — approval of the Privacy Policy |
| 4 | Retention periods per record type | PRV-06 — approval of the Privacy Policy |
| 6 | Who holds each role | Phase 2 |
| 7 | Tax-deductibility status | RCP-05 |
