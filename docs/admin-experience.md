# Admin experience — brand, sign-in and phones

Branch `phase-4-operations`, 13 September 2026. Everything here is presentation;
no permission, workflow or data rule changed. All 50 tests still pass.

## Brand

- **Colours.** Payload builds light and dark mode from one grey ramp, so that
  ramp is warmed toward the brand browns and creams. Each step keeps the
  luminance of Payload's original grey, so text contrast holds: body text
  13.1:1 in light mode (was 13.4), 15.4:1 in dark (unchanged). Primary buttons
  are brand brown in light mode and gold in dark.
- **Language (ADM-01).** Every section uses the spec's navigation wording —
  Leadership, FAQs, Volunteers, Partners, Transactions, Administrators, Audit
  Log — grouped Content, People, Fundraising, Administration. Browser tabs read
  "… · St. Hannah Foundation".
- **Field labels (ADM-01).** Every field inside every record is labelled in
  plain English from one dictionary, `payload/labels.ts`, drawn from the
  public forms' own questions and shortened for staff — "lga" is "Local
  Government Area", "situationNarrative" is "Their Account of Their
  Situation". Web jargon is rephrased: "slug" is "Web Address", with a note on
  what it is. Status options stored as bare values ("in_discussion") show
  readable names in lists and filters. Display only: the migration generator
  confirmed no schema change. Reviewed by reading every label rendered on each
  record screen; the only automated flags were WhatsApp, YouTube, LinkedIn and
  TikTok — their own spellings.
- **Navigation mark.** An "SH" monogram sized to Payload's 18px slot; the
  portrait logo blurs at that size.

## Sign-in

Payload's sign-in form is kept intact — its authentication, redirects and
password reset are not reimplemented. The redesign is around it:

- **Desktop:** a brand panel fills the left 44% of the screen — deep brown with
  a warm gold light, the portrait in a gold ring, the Foundation's name and its
  tagline, "Igniting Hope, Lighting Up The Future", in the site's own display
  face (Playfair, self-hosted). The form sits calm and roomy on the right under
  "Welcome back".
- **Phones and tablets:** the panel becomes a card above the form, the same
  width as it.
- **No photographs of people.** This is a tool for sensitive beneficiary
  records; people's images belong on the public site, where their use was
  agreed.

Measured:

| Size | Result |
|---|---|
| 1440 and 1280 desktop | Panel full height on the left; form starts clear of it |
| 820 tablet, 390 and 360 phones | Card exactly the form's width; **Sign in button on the first screen**; no sideways scroll |
| All sizes | 48px fields, 50px button, no browser errors |

## Phones (CR-005)

Payload already avoided sideways scrolling. What it got wrong for thumbs was
size, measured at 390px:

- **Every field used 12px text.** iPhones zoom the page into any field under
  16px when it is tapped — all 54 fields on an application. Now 16px on phones
  and tablets.
- **A third of tap targets were under 32px** — the menu button 22px, the
  navigation 20px, the home mark 16px. All are now at least 44px (40px for the
  small clear buttons inside fields).

After the fix, on the sign-in, dashboard, application list and application
screens: **no field under 16px and no tap target under 32px**. Seven key
screens at 360px and 390px have no sideways overflow. The phone menu was
tested as a person uses it: tap the menu button that is actually on top, tap
"Contact Messages", land on Contact Messages. The desktop menu was checked the
same way and is unaffected.

## Two mistakes worth recording

1. **An early version of the phone rules broke the menu.** It set `display` on
   Payload's menu buttons; Payload has separate desktop and phone buttons and
   hides one responsively, and sizing the desktop one up made it cover the
   phone one. The rules now set size only, never `display`, and target the
   phone button by its own class.
2. **A headless browser tab reports itself as hidden, which freezes CSS
   transitions.** The menu fades in, so in that state it stayed invisible and
   taps fell through to the page beneath — which first looked like a Payload
   bug. Browser checks now bring the tab to the front and refuse to report a
   result unless the page is visible.
