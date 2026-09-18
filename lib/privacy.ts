/* PRV-08 (CR-002): the most personal answers stay in the admin, not in
   inboxes. From Phase 3 the submission itself is in the database before any
   email is sent, so the notification only needs to say what arrived and
   where to read it. These are the fields left out of the Foundation's copy
   of a support application. */
export const WITHHELD_FROM_EMAIL = [
  "nationalId",
  "monthlyIncome",
  "incomeSource",
  "incomeSourceOther",
  "situationNarrative",
  "specialNeedsDependents",
  "specialNeedsDetail",
  "housingChallenges",
  "livingConditions",
  "documents",
] as const;

/** A copy of a submission without the answers that stay in the admin. */
export function withoutWithheld<T extends Record<string, unknown>>(details: T) {
  const kept = { ...details };
  let withheld = 0;

  for (const field of WITHHELD_FROM_EMAIL) {
    if (kept[field]) {
      delete kept[field];
      withheld += 1;
    }
  }

  return { kept, withheld };
}
