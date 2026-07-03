import { Column, Row, Section, Text } from "@react-email/components";

import StatusBadge from "./StatusBadge";
import { colors } from "../styles";

interface ReceiptCardProps {
  amount: string;
  purpose: string;
  reference: string;
  date: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
}

export default function ReceiptCard({
  amount,
  purpose,
  reference,
  date,
  status,
}: ReceiptCardProps) {
  return (
    <Section
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        margin: "40px 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Section
        style={{
          backgroundColor: "#F8F6F2",
          borderBottom: `1px solid ${colors.border}`,
          padding: "22px 30px",
        }}
      >
        <Text
          style={{
            margin: "0",
            color: colors.primary,
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Donation Receipt
        </Text>

        <Text
          style={{
            margin: "8px 0 0",
            color: colors.muted,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          Your donation has been successfully processed and verified.
        </Text>
      </Section>

      {/* Body */}
      <Section
        style={{
          padding: "30px",
        }}
      >
        {/* Amount & Status */}
        <Row>
          <Column width="65%">
            <Text
              style={{
                color: colors.muted,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              Donation Amount
            </Text>

            <Text
              style={{
                color: colors.primary,
                fontSize: "32px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {amount}
            </Text>
          </Column>

          <Column align="right">
            <StatusBadge status={status} />
          </Column>
        </Row>

        {/* Details */}
        <Section
          style={{
            marginTop: "28px",
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
            padding: "20px 0",
          }}
        >
          <Row>
            <Column width="50%">
              <Text
                style={{
                  color: colors.muted,
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Purpose
              </Text>

              <Text
                style={{
                  color: colors.black,
                  fontSize: "15px",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {purpose}
              </Text>
            </Column>

            <Column width="50%">
              <Text
                style={{
                  color: colors.muted,
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Donation Date
              </Text>

              <Text
                style={{
                  color: colors.black,
                  fontSize: "15px",
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                {date}
              </Text>
            </Column>
          </Row>
        </Section>

        {/* Reference */}
        <Section
          style={{
            marginTop: "24px",
          }}
        >
          <Text
            style={{
              color: colors.muted,
              fontSize: "12px",
              marginBottom: "6px",
            }}
          >
            Transaction Reference
          </Text>

          <Text
            style={{
              backgroundColor: "#F8F6F2",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              padding: "12px 14px",
              color: colors.primary,
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              margin: "0",
            }}
          >
            {reference}
          </Text>
        </Section>

        {/* Notice */}
        <Section
          style={{
            backgroundColor: "#FFFBEB",
            border: "1px solid #F5D68A",
            borderRadius: "10px",
            padding: "18px",
            marginTop: "28px",
          }}
        >
          <Text
            style={{
              margin: "0",
              color: "#6B4E00",
              fontSize: "13px",
              lineHeight: "22px",
            }}
          >
            This serves as your official donation acknowledgement. Please retain
            this email and your receipt for your personal records.
          </Text>
        </Section>
      </Section>
    </Section>
  );
}
