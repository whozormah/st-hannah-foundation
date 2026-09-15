# Phase 6 — content migration, verification

Branch `phase-6-content`, 13–14 September 2026. Built on the Phase 1–4
branches. Unmerged and undeployed. The content is the website's own public
content; accounts and applications are synthetic test data.

Phase 6 ran before Phase 5 (CR-006). Its gate is **A18 and A21 pass, content
frozen throughout**: A18 and A21 pass, and the freeze was agreed (decision 8).

## What changed

The website reads every page's content from the CMS instead of the files in
`public/data`, and staff edit it in the admin. **Visitors see no difference**:
all 25 public pages match the pre-CMS capture, word for word, with the same
photographs, alt text and image sizes.

| Requirement | Status | Implementation |
|---|---|---|
| **PUB-01** | Met, with CR-012 (proposed) | All fourteen routes unchanged; detail pages and the sitemap list what is published. A changed address redirects, sent as 308 rather than a literal 301. |
| **PUB-02** | Met | No visual change (A18). |
| **PUB-03** | Met | 35 components read the CMS; four sections nothing rendered were deleted. |
| **PUB-04 / A10** | Met | Publishing expires the cached content at once: the **first** visit afterwards shows the change. |
| **PUB-05** | Met | Metadata and canonicals unchanged; the sitemap is built from published content. |
| **PUB-06** | Met | Sections with no content hide themselves, including the new block types. |
| **PUB-07** | Met | The homepage has exactly one `h1` however its sections are arranged. |
| **PUB-08** | Partly verified | The homepage with all fourteen block types has no overflow at 360 and 390 px. The other pages are unchanged (A18) but were not re-measured; that is A19, run at go-live. |
| **CNT-01** | Met, with CR-009 | The homepage is built from blocks. Legal pages stay with Phase 1's approval gate. |
| **CNT-02** | Met | Only the homepage can be built from blocks; every other page is a fixed template. |
| **CNT-03** | Met, with CR-009 | Fourteen blocks: the twelve, plus vision and mission and the leadership preview. |
| **CNT-04** | Met | No HTML, styles or classes are stored. Links must be a page on the site or https/mailto/tel, checked on publishing and again when rendered. |
| **CNT-05** | Met | Draft, **preview**, publish, version history and restore, for every content collection. Preview is draft mode in a new tab, for signed-in content editors only. |
| **CNT-06** | Met | Every image is a media library record, and one cannot be saved without a description. |
| **CNT-07** | Met | Slugs are unique, filled in from the title, and editable. When a published slug changes, the old address redirects to the new one, with no chains. Administrators can add redirects too, and unsafe addresses are refused. |
| **CNT-08** (SHOULD) | Met for website content | Content still in use, including in a draft, cannot be deleted, and the refusal names where it is used. Staff accounts, applications and donations are left to the audit and retention rules. |
| **CNT-09 / CNT-10** | Met, with CR-010 | Each figure is stored once with its source and verification date; historic totals stay typed in. |
| **CNT-11** | Met | Nothing invented; everything doubtful is reported below. |
| **MIG-01, 02** | Met | One collection at a time; counts checked, page sections read back field by field. |
| **MIG-03 / A18** | Met | Verified on the rendered pages, 25 of 25. |
| **MIG-04** | Met | Content freeze agreed (decision 8). |
| **MIG-05** | Met | All 13 migrations and all 19 content steps run from an empty database, twice, with no duplicates. |
| **MIG-06** | Pending | The files stay until the content is verified in production. |
| **MIG-07** | Met | Contradictions are reported, not resolved. |
| **MIG-08** | Built, with CR-011 | 65 image paths are 47 photographs, each uploaded once with drafted alt text awaiting approval. Rehearsed against an S3 stand-in for R2 (see below); goes live once the R2 account exists. |
| **Editor training** | Guide written | `docs/editor-guide.md`. A session with the Foundation's staff has not been held. |

## Tests

`npm run test:acl`: **96 of 96 passing.** 22 access control, 11 forms, 17
workflow, 2 password reset, 2 private files (A13), and Phase 6's 42: 15
content types, 1 publishing, 2 statistics, 6 homepage blocks, 4 media, 4
preview, 3 addresses and redirects, 2 deleting content in use, 5 event appeal
(CR-013).

**The event appeal (CR-013)** was also checked in a real browser: no
sideways overflow at 360, 390 and 1440 px; the countdown ticks; an amount
button opens the donation form with the event and amount chosen; the full
video opens in a dialog; phones set to reduce motion get the still picture.
Its video is served in parts (HTTP 206), which phones need to play it.

**Rehearsed with external storage.** With MinIO standing in for R2 (the same
S3 interface): a fresh database, all 14 migrations, the content migration
uploading into storage, and the site running against it. All 47 photographs
reached the bucket, nothing was written to local disk, all 91 tests and the
25-page comparison passed, and a private file opened only through a signed
link lasting 300 seconds (A13, SEC-07). Turning R2 on changes nothing in the
database. Setup steps: `docs/r2-setup.md`.

**Each new test was proven able to fail:**

- **Publishing:** against the earlier cache setting, all 16 publishing tests
  failed. The first visitor after a publish saw the old version.
- **Statistics (A21):** with one page wired to the wrong figure, the test
  named the page and the figure. Its stricter check also found three real
  figures typed into page code (About, Partnerships), now read from
  Statistics.
- **Blocks:** unsafe links and non-video addresses are refused on
  publishing, and stray HTML, style and class values are never stored.
- **Preview:** visitors and Case Officers or Finance cannot turn it on. It
  only opens pages on this website. A copied draft-mode cookie shows a
  visitor nothing.

**Checked in a real browser:** every page for errors; the gallery filter and
viewer; the admin's Add Section picker (all fourteen); the Preview button,
the preview tab with its banner, and Exit preview; Versions and Restore this
version; the media library's descriptions on the page.

## Defects found and fixed

1. **The first visitor after a publish saw the old version.** The "max"
   refresh profile serves stale content first. Now expires immediately.
2. **The bank account number was in every page's JavaScript.** The old
   footer bundled the whole settings file. It now receives only what it
   shows.
3. **The admin's GraphQL schema failed to build.** The testimonials block
   shared its type name with the collection. Blocks are now named "…Block".
4. **Two sections rendered blank images after the image migration.** Next's
   data cache lives on disk, survives rebuilds, and is keyed on a function's
   source, so an unchanged read served its old entry. Every read now also
   expires hourly, and the migration says to restart the site.
5. **CI would have failed every HTTP test.** It started the app on port 3000
   while the tests used 3100, and has done since Phase 2, unnoticed because
   these branches have never been pushed. CI now sets `TEST_BASE_URL`.
6. **Drafts are not validated by Payload,** so an unsafe link can sit in a
   draft. It cannot be published, and the sections refuse to render one.
7. **The first redirect was never created.** Three causes, found one at a
   time with the tests failing and by logging the hooks:
   - a field hook did not receive the arguments it relied on;
   - after a draft save, Payload's "previous version" is the draft, not
     what was live;
   - a database read inside a hook replaced the request's context,
     discarding the remembered address.

   The address that was live is now read just before publishing and kept
   against the request.
8. **An image used only in a draft could be deleted.** The check counted
   published records only; it now counts drafts too, each record once.
9. **With external storage, 46 of 47 photographs were silently never
   uploaded.** Found by the storage rehearsal. Payload's storage plugin keeps
   each upload's file on the write's context and never clears it, and the
   content migration reused one context object for every write. Each write
   now gets its own; the media test, which loads every image, catches it.
10. **A restart brought back an old homepage.** A section published after the
    homepage was last cached disappeared again once the server restarted.
    Next.js's default cache marks copies stale in memory only, and the old
    copy on disk was served again after the restart; on the live site any
    restart or redeploy could do this with up to an hour of changes. The
    data cache now lives in memory only, and publishing deletes cached copies
    (`cache-handler.cjs`). Proven with the exact sequence: take a section
    off and visit the page, put it back, restart. It was missing afterwards
    before the fix, and present after it.

## For the Foundation

1. **Photographs:** several story and programme images look AI-generated or
   stock rather than the Foundation's own, and two illustrate impact stories
   as if they showed the beneficiaries (CR-011).
2. **Gallery duplicates:** all six "Community Outreach" photographs are the
   same files as six under Widow Empowerment and Education Support.
3. **Communities:** Partnerships says "Multiple communities impacted"; the
   homepage says 50+.
4. **Descriptions:** 47 image descriptions to check and approve.
5. **Statistics:** no figure has a verified source or date yet.
6. **Medical Aid Outreach** is marked featured on its page but not in the
   story list; the list's value is used.
7. **Not shown:** In-kind Categories and the Donate Page figures appear
   nowhere on the website.

## Open before go-live

- **CR-012** (redirects sent as 308, not 301) awaits approval.
- **Cloudflare R2** does not exist. Until it does, the media library cannot
  go live, and when it does, its address must be allowed in Next's image
  settings.
- **The Docker image copies the build as root but runs as another user,**
  so Next probably cannot write its image cache at runtime (the data cache
  no longer writes to disk). Phase 8.
- **A19** (every page at 360 and 390 px) to be run at go-live.

## Merge note

This branch carries Phases 1–4. Merge them as a stack, and not before
Phase 1's legal approval gate is cleared.
