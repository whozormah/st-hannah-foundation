import { Section, Text } from "@react-email/components";
import { colors } from "../styles";

const impacts = [
  "Providing educational support for children.",
  "Empowering widows with sustainable opportunities.",
  "Supporting families with food and emergency assistance.",
  "Delivering healthcare and community outreach programmes.",
  "Restoring dignity, hope, and brighter futures for vulnerable people.",
];

export default function ImpactSection() {
  return (
    <Section
      style={{
        backgroundColor: "#FAF7F2",
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "36px",
        margin: "40px 0",
      }}
    >
      <Text
        style={{
          margin: "0 0 16px",
          textAlign: "center",
          color: colors.primary,
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Your Gift Is Creating Lasting Impact
      </Text>

      <Text
        style={{
          margin: "0 0 28px",
          textAlign: "center",
          color: colors.text,
          fontSize: "16px",
          lineHeight: "28px",
        }}
      >
        Every donation helps us reach more people with practical support,
        compassion, and opportunities to build a better future.
      </Text>

      {impacts.map((impact) => (
        <Section
          key={impact}
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${colors.border}`,
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "12px",
          }}
        >
          <Text
            style={{
              margin: "0",
              color: colors.text,
              fontSize: "15px",
              lineHeight: "24px",
              fontWeight: "500",
            }}
          >
            • {impact}
          </Text>
        </Section>
      ))}

      <Text
        style={{
          margin: "24px 0 0",
          textAlign: "center",
          color: colors.primary,
          fontSize: "15px",
          fontWeight: "600",
          lineHeight: "26px",
        }}
      >
        Thank you for helping us bring hope, dignity, and lasting change to
        those who need it most.
      </Text>
    </Section>
  );
}
