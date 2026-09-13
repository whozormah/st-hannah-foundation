import { NextRequest, NextResponse } from "next/server";

import { sendNewsletterSignupEmail } from "@/lib/email";
import {
  consentMetadata,
  deliverNotifications,
  getPayloadClient,
} from "@/lib/submissions";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !EMAIL_PATTERN.test(String(email).trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const address = String(email).trim().toLowerCase();
    const payload = await getPayloadClient();

    // Subscribing again must not fail on the unique address: it re-subscribes.
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: address } },
      overrideAccess: true,
      limit: 1,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "subscribers",
        id: existing.docs[0].id,
        overrideAccess: true,
        data: { status: "subscribed", ...consentMetadata() },
      });
    } else {
      await payload.create({
        collection: "subscribers",
        overrideAccess: true,
        data: { email: address, status: "subscribed", ...consentMetadata() },
      });
    }

    await deliverNotifications("newsletter", address, () =>
      sendNewsletterSignupEmail(address),
    );

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing. You'll hear from us soon.",
    });
  } catch (error) {
    console.error("Newsletter Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
