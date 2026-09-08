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

interface AidApplicationProps {
  name: string;
  supportType?: string;
  reference: string;
  date: string;
}

export default function AidApplication({
  name,
  supportType,
  reference,
  date,
}: AidApplicationProps) {
  return (
    <Html>
      <Head />

      <Preview>We have received your support application</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Your Application Has Been Received"
            subtitle="Thank you for reaching out to St. Hannah Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear {name},</Text>

            <Text style={styles.paragraph}>
              We have received your application for support. Every application
              is reviewed with care, dignity and fairness. A member of our team
              will contact you about the next steps, and may request supporting
              documents.
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

              {supportType ? (
                <>
                  <Text style={styles.paragraph}>
                    <strong>Support Requested</strong>
                  </Text>

                  <Text style={styles.paragraph}>{supportType}</Text>
                </>
              ) : null}

              <Text style={styles.paragraph}>
                <strong>Date Received</strong>
              </Text>

              <Text style={styles.paragraph}>{date}</Text>
            </Section>

            <Text style={styles.paragraph}>
              Please quote this reference number in any correspondence. Note
              that submission does not guarantee approval; applications are
              assessed on need, eligibility and available resources.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
