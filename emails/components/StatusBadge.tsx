import { Section, Text } from "@react-email/components";

interface StatusBadgeProps {
  status: "SUCCESS" | "PENDING" | "FAILED";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    SUCCESS: {
      background: "#ECFDF3",
      border: "#ABEFC6",
      color: "#067647",
      label: "Payment Verified",
    },
    PENDING: {
      background: "#FFFAEB",
      border: "#FEDF89",
      color: "#B54708",
      label: "Pending Verification",
    },
    FAILED: {
      background: "#FEF3F2",
      border: "#FECDCA",
      color: "#B42318",
      label: "Payment Failed",
    },
  }[status];

  return (
    <Section>
      <Text
        style={{
          display: "inline-block",
          margin: "0",
          padding: "8px 16px",
          backgroundColor: config.background,
          border: `1px solid ${config.border}`,
          borderRadius: "999px",
          color: config.color,
          fontSize: "13px",
          fontWeight: "700",
          lineHeight: "18px",
        }}
      >
        {config.label}
      </Text>
    </Section>
  );
}
