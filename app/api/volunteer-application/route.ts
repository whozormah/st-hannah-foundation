import { NextRequest, NextResponse } from "next/server";

import { sendVolunteerApplicationEmails } from "@/lib/email";
import { generateReferenceNumber } from "@/lib/receipt";

const REQUIRED_FIELDS = ["fullName", "email", "phone"] as const;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const OPTIONAL_FIELDS = [
  "whatsapp",
  "gender",
  "dateOfBirth",
  "location",
  "occupation",
  "qualification",
  "profession",
  "skills",
  "volunteeredBefore",
  "previousExperience",
  "areaOfInterest",
  "availability",
  "commitment",
  "motivation",
  "consent",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter(
      (field) => !String(body?.[field] ?? "").trim(),
    );

    if (missing.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your name, email address and phone number.",
        },
        { status: 400 },
      );
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

    if (body.consent !== "Yes") {
      return NextResponse.json(
        {
          success: false,
          message: "Please confirm the declaration before submitting.",
        },
        { status: 400 },
      );
    }

    const details = Object.fromEntries(
      OPTIONAL_FIELDS.map((field) => [field, String(body[field] ?? "").trim()]),
    );

    const reference = generateReferenceNumber("SHV");

    await sendVolunteerApplicationEmails({
      ...details,
      reference,
      fullName: String(body.fullName).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
    });

    return NextResponse.json({
      success: true,
      reference,
      message: "Thank you. Your volunteer application has been received.",
    });
  } catch (error) {
    console.error("Volunteer Application Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
