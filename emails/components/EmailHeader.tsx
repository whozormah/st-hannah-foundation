import { Img, Section, Text, Heading } from "@react-email/components";
import { colors } from "../styles";

interface EmailHeaderProps {
  title: string;
  subtitle: string;
}

const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;

export default function EmailHeader({ title, subtitle }: EmailHeaderProps) {
  return (
    <Section
      style={{
        backgroundColor: colors.primary,
        padding: "56px 48px 52px",
        textAlign: "center",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <Img
        src={logoUrl}
        alt="St. Hannah Foundation"
        width="90"
        height="90"
        style={{
          display: "block",
          margin: "0 auto 24px",
        }}
      />

      <Text
        style={{
          color: colors.secondary,
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "3px",
          textTransform: "uppercase",
          margin: "0 0 18px",
        }}
      >
        ST. HANNAH FOUNDATION
      </Text>

      <Heading
        style={{
          color: "#FFFFFF",
          fontSize: "34px",
          fontWeight: "700",
          lineHeight: "44px",
          margin: "0 0 18px",
        }}
      >
        {title}
      </Heading>

      <Text
        style={{
          color: "#F6EFE5",
          fontSize: "17px",
          lineHeight: "30px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {subtitle}
      </Text>

      <Section
        style={{
          marginTop: "30px",
        }}
      >
        <Text
          style={{
            display: "inline-block",
            margin: "0",
            padding: "8px 18px",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "999px",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          Official Donation Confirmation
        </Text>
      </Section>
    </Section>
  );
}
