import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import EmailHeader from "./components/EmailHeader";
import EmailFooter from "./components/EmailFooter";
import { styles } from "./styles";

interface Props {
  contactPerson: string;
  organisation: string;
  reference: string;
  date: string;
}

export default function PartnershipEnquiry({
  contactPerson,
  organisation,
  reference,
  date,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>We have received your partnership enquiry</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Thank You For Reaching Out"
            subtitle="We have received your partnership enquiry."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear {contactPerson},</Text>

            <Text style={styles.paragraph}>
              Thank you for your interest in partnering with St. Hannah
              Foundation on behalf of {organisation}. A member of our team will
              review your enquiry and be in touch to discuss how we might work
              together.
            </Text>

            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "30px",
              }}
            >
              <Text style={styles.paragraph}>
                <strong>Reference Number</strong>
              </Text>

              <Text style={styles.paragraph}>{reference}</Text>

              <Text style={styles.paragraph}>
                <strong>Date Received</strong>
              </Text>

              <Text style={styles.paragraph}>{date}</Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
