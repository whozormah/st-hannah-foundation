/* Seeds the five roles and one synthetic support application for the
   access-control suite. Run with: npx payload run scripts/seed-test-data.ts

   Everything here is invented test data. No real person's details are used,
   and this script must never run against production: it refuses unless
   ALLOW_SEED is set. */
import { getPayload } from "payload";
import config from "../payload.config";

import type { Role } from "../payload/access";

const PASSWORD = "Test-Passw0rd!-not-real";

const USERS: { email: string; name: string; role: Role }[] = [
  { email: "owner@test.invalid", name: "Test Owner", role: "owner" },
  { email: "admin@test.invalid", name: "Test Administrator", role: "administrator" },
  { email: "content@test.invalid", name: "Test Content Manager", role: "content" },
  { email: "case@test.invalid", name: "Test Case Officer", role: "case" },
  { email: "finance@test.invalid", name: "Test Finance", role: "finance" },
];

/* Invented values for the eight sensitive fields, so the tests can prove each
   one is withheld from the roles that must not see it. */
const APPLICATION = {
  reference: "SHA-TEST-0001",
  fullName: "Test Applicant",
  email: "applicant@test.invalid",
  phone: "+2340000000001",
  supportType: "Education Support",
  status: "new" as const,
  nationalId: "TEST-NIN-000000000",
  monthlyIncome: "TEST-INCOME-BAND-A",
  incomeSource: "TEST-INCOME-SOURCE",
  situationNarrative: "TEST-NARRATIVE-CONFIDENTIAL",
  specialNeedsDependents: "TEST-DEPENDANTS-1",
  specialNeedsDetail: "TEST-SPECIAL-NEEDS-DETAIL",
  housingChallenges: "TEST-HOUSING-CHALLENGES",
};

async function main() {
  if (!process.env.ALLOW_SEED) {
    throw new Error(
      "Refusing to seed: set ALLOW_SEED=1. This writes test accounts and must never touch production.",
    );
  }

  const payload = await getPayload({ config });

  for (const user of USERS) {
    const existing = await payload.find({
      collection: "admin-users",
      where: { email: { equals: user.email } },
      overrideAccess: true,
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`exists: ${user.email} (${user.role})`);
      continue;
    }

    await payload.create({
      collection: "admin-users",
      // The first Owner cannot be created through the API, because assigning
      // a role is Owner-only (ACL-08). Seeding is the deliberate exception.
      overrideAccess: true,
      data: { ...user, password: PASSWORD, status: "active" },
    });

    console.log(`created: ${user.email} (${user.role})`);
  }

  const existingApplication = await payload.find({
    collection: "support-applications",
    where: { reference: { equals: APPLICATION.reference } },
    overrideAccess: true,
    limit: 1,
  });

  if (existingApplication.docs.length === 0) {
    await payload.create({
      collection: "support-applications",
      overrideAccess: true,
      data: { ...APPLICATION, submittedAt: new Date().toISOString() },
    });

    console.log(`created: application ${APPLICATION.reference}`);
  } else {
    console.log(`exists: application ${APPLICATION.reference}`);
  }

  console.log("seed complete");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
