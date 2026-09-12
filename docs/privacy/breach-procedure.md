# Personal data breach procedure

Internal. Implements PRV-10 of the Product & Architecture Specification.

**Status: draft for legal review.** Items marked **TBC** cannot be completed
until the Foundation answers decision 3 (named data protection contact).

## What counts as a breach

Any event that leads to personal information being lost, destroyed, altered,
disclosed or accessed without authorisation — whether by attack, mistake or
accident. Examples: a submissions inbox is accessed by someone who should not
have it; an email containing an application is sent to the wrong person; an
API key for Resend or Paystack is exposed.

## Who is responsible

| Role | Person |
|---|---|
| Data protection contact — leads the response | **TBC** (decision 3) |
| Deputy, if the contact is unavailable | **TBC** |
| Technical lead — contains the incident | The Foundation's appointed developer |

## Steps

1. **Report immediately.** Anyone who suspects a breach tells the data
   protection contact at once, by phone if possible. Do not wait to be sure.
2. **Contain.** Stop the breach continuing: change passwords, revoke and
   rotate exposed keys (Resend, Paystack, email accounts), recall misdirected
   email where possible.
3. **Record.** Start an entry in the breach log (below) with what is known.
4. **Assess risk.** Whose information, what kind, how many people, and how
   likely harm is. Information from the support application (income, housing,
   dependants with special needs, personal accounts) is sensitive and weighs
   heavily.
5. **Notify the regulator.** Where the breach is likely to put people's rights
   at risk, notify the Nigeria Data Protection Commission within **72 hours**
   of becoming aware of it. *Confirm this period and the notification route
   with counsel.*
6. **Tell the people affected.** Where the risk to them is high, tell them
   directly and in plain language: what happened, what it means for them,
   and what they can do.
7. **Review.** Once resolved, record what caused it and what changes prevent
   it happening again.

## Breach log

Every breach is logged, including those not reported to the Commission.

| Date found | What happened | People affected | Risk | Commission notified | People notified | Actions taken |
|---|---|---|---|---|---|---|
| | | | | | | |

## Where personal information currently lives

Until the database arrives in Phase 3, submissions exist only as email.

- The Foundation's inboxes that receive form submissions
  (`DONATION_EMAIL`, `VOLUNTEER_EMAIL`, `APPLICATIONS_EMAIL`, `CONTACT_EMAIL`)
- Resend's sending logs
- The Paystack dashboard (online donations)
- Vercel (hosting, including server logs)
