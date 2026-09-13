import { NextRequest, NextResponse } from "next/server";

import { sendAidApplicationEmails } from "@/lib/email";
import { deliverNotifications, nextReference, persistSubmission } from "@/lib/submissions";
import type { AidApplicationDetails } from "@/emails/FoundationAidApplication";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const DECLARATIONS = [
  "declarationTrue",
  "declarationNoGuarantee",
  "declarationContact",
  "declarationDataUse",
];

// Everything the form collects. Anything else in the payload is discarded.
const FIELDS = [
  "fullName", "gender", "dateOfBirth", "nationality", "phone", "email",
  "contactMethod", "referralSource",
  "address", "state", "lga", "landmark", "durationAtAddress", "housingStatus",
  "livingConditions", "housingChallenges",
  "supportType", "supportTypeOther", "urgency", "appliedElsewhere",
  "supportSummary", "challenge", "expectedImpact",
  "occupation", "maritalStatus", "incomeSource", "incomeSourceOther",
  "monthlyIncome", "children", "dependents", "primaryProvider",
  "householdSize", "specialNeedsDependents", "specialNeedsDetail",
  "elderlyRelatives",
  "previousSupport", "previousSupportDetail", "situationNarrative",
  "stepsTaken", "additionalInformation",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    for (const field of ["fullName", "email", "phone", "supportType"]) {
      if (!String(body?.[field] ?? "").trim()) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please provide your name, email address, phone number and the type of support you need.",
          },
          { status: 400 },
        );
      }
    }

    if (!EMAIL_PATTERN.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!DECLARATIONS.every((name) => body[name])) {
      return NextResponse.json(
        {
          success: false,
          message: "Please accept all four declarations before submitting.",
        },
        { status: 400 },
      );
    }

    const details = Object.fromEntries(
      FIELDS.map((field) => [field, String(body[field] ?? "").trim()]).filter(
        ([, value]) => value,
      ),
    ) as AidApplicationDetails;

    const reference = await nextReference("SHA");

    /* OPS-01: the application is in the database before any email is sent.
       This is the submission that mattered most in V1, where it existed only
       as an email and a deleted message lost it for good. */
    await persistSubmission("support-applications", {
      reference,
      ...details,
      ...Object.fromEntries(
        DECLARATIONS.map((name) => [name, body[name] ? "Yes" : "No"]),
      ),
      status: "new",
    });

    await deliverNotifications("aid-application", reference, () =>
      sendAidApplicationEmails(details, reference),
    );

    return NextResponse.json({
      success: true,
      reference,
      message: "Thank you. Your application has been received.",
    });
  } catch (error) {
    console.error("Aid Application Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
