import { NextRequest, NextResponse } from "next/server";

import { sendPartnershipEnquiryEmails } from "@/lib/email";
import { generateReferenceNumber } from "@/lib/receipt";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const organisation = String(body?.organisation ?? "").trim();
    const contactPerson = String(body?.contactPerson ?? "").trim();
    const email = String(body?.email ?? "").trim();

    if (!organisation || !contactPerson || !email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide your organisation, a contact name and an email address.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const reference = generateReferenceNumber("SHP");

    await sendPartnershipEnquiryEmails({
      reference,
      organisation,
      contactPerson,
      email,
      phone: String(body?.phone ?? "").trim(),
      location: String(body?.location ?? "").trim(),
      partnershipType: String(body?.partnershipType ?? "").trim(),
      message: String(body?.message ?? "").trim(),
    });

    return NextResponse.json({
      success: true,
      reference,
      message: "Thank you. Your partnership enquiry has been received.",
    });
  } catch (error) {
    console.error("Partnership Enquiry Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
