import { Button, Section, Text } from "@react-email/components";
import { colors } from "../styles";

interface PrimaryButtonProps {
  href: string;
  text: string;
}

export default function PrimaryButton({ href, text }: PrimaryButtonProps) {
  return (
    <Section
      style={{
        textAlign: "center",
        margin: "42px 0",
      }}
    >
      <Button
        href={href}
        style={{
          backgroundColor: colors.primary,
          color: "#FFFFFF",
          textDecoration: "none",
          padding: "18px 34px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "700",
          display: "inline-block",
          border: `1px solid ${colors.primary}`,
        }}
      >
        {text}
      </Button>

      <Text
        style={{
          marginTop: "16px",
          fontSize: "13px",
          color: colors.muted,
          lineHeight: "22px",
        }}
      >
        If the button does not work, copy and paste the download link into your
        browser or reply to this email and our team will be happy to assist you.
      </Text>
    </Section>
  );
}
