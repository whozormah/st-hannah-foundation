import { Hr, Img, Link, Section, Text } from "@react-email/components";
import settings from "@/public/data/site-settings.json";
import { colors } from "../styles";

const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;

export default function EmailFooter() {
  const year = new Date().getFullYear();

  return (
    <Section
      style={{
        backgroundColor: "#F8F6F2",
        padding: "48px 40px",
        textAlign: "center",
      }}
    >
      <Hr
        style={{
          borderColor: "#E7DFD3",
          marginBottom: "36px",
        }}
      />

      <Img
        src={logoUrl}
        alt="St. Hannah Foundation"
        width="72"
        height="72"
        style={{
          display: "block",
          margin: "0 auto 18px",
        }}
      />

      <Text
        style={{
          margin: "0",
          color: colors.primary,
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        St. Hannah Foundation
      </Text>

      <Text
        style={{
          margin: "12px auto 0",
          color: colors.muted,
          fontSize: "15px",
          lineHeight: "26px",
          maxWidth: "480px",
        }}
      >
        Empowering communities through love and service by restoring hope,
        strengthening families, supporting education, and transforming lives.
      </Text>

      <Section
        style={{
          marginTop: "28px",
        }}
      >
        <Link
          href="https://sthannahfoundation.org"
          style={{
            color: colors.primary,
            textDecoration: "none",
            fontWeight: "600",
            marginRight: "18px",
          }}
        >
          Website
        </Link>

        <Link
          href={`mailto:${settings.email}`}
          style={{
            color: colors.primary,
            textDecoration: "none",
            fontWeight: "600",
            marginRight: "18px",
          }}
        >
          Email
        </Link>

        <Link
          href="https://sthannahfoundation.org/contact"
          style={{
            color: colors.primary,
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Contact
        </Link>
      </Section>

      <Text
        style={{
          marginTop: "30px",
          color: colors.text,
          fontSize: "13px",
          lineHeight: "22px",
        }}
      >
        You are receiving this email because a donation was successfully made
        using this email address.
      </Text>

      <Text
        style={{
          marginTop: "12px",
          color: colors.muted,
          fontSize: "13px",
          lineHeight: "22px",
        }}
      >
        If you believe you received this message in error, please contact our
        support team.
      </Text>

      <Text
        style={{
          marginTop: "28px",
          color: "#9CA3AF",
          fontSize: "12px",
          lineHeight: "20px",
        }}
      >
        © {year} St. Hannah Foundation. All rights reserved.
      </Text>
    </Section>
  );
}
