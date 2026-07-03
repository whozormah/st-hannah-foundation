import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import EmailFooter from "./components/EmailFooter";
import EmailHeader from "./components/EmailHeader";
import ReceiptCard from "./components/ReceiptCard";
import { styles } from "./styles";

interface FoundationNotificationProps {
  name: string;
  email: string;
  phone: string;
  amount: string;
  purpose: string;
  reference: string;
  date: string;
}

export default function FoundationNotification({
  name,
  email,
  phone,
  amount,
  purpose,
  reference,
  date,
}: FoundationNotificationProps) {
  return (
    <Html>
      <Head />

      <Preview>New Donation Received</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Donation Received"
            subtitle="A new donation has been successfully received through the St. Hannah Foundation website."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>Donation Summary</Text>

            <ReceiptCard
              amount={amount}
              purpose={purpose}
              reference={reference}
              date={date}
              status="SUCCESS"
            />

            <Section
              style={{
                background: "#FAF7F2",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "30px",
                border: "1px solid #E7DFD3",
              }}
            >
              <Text style={styles.paragraph}>
                <strong>Donor Name:</strong> {name}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Email Address:</strong> {email}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Phone Number:</strong> {phone}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Donation Purpose:</strong> {purpose}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Receipt Number:</strong> {reference}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Date:</strong> {date}
              </Text>
            </Section>

            <Section
              style={{
                background: "#FFF9EC",
                border: "1px solid #F3D58B",
                borderRadius: "18px",
                padding: "28px",
                marginTop: "30px",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#844204",
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                Next Step
              </Text>

              <Text style={styles.paragraph}>
                Please acknowledge this donation where necessary and ensure the
                funds are allocated to the appropriate programme or campaign.
              </Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
