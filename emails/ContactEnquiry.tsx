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

interface ContactEnquiryProps {
  name: string;
  subject: string;
  reference: string;
  date: string;
}

export default function ContactEnquiry({
  name,
  subject,
  reference,
  date,
}: ContactEnquiryProps) {
  return (
    <Html>
      <Head />

      <Preview>We have received your message</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Thank You For Getting In Touch"
            subtitle="We have received your message and will respond shortly."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear {name},</Text>

            <Text style={styles.paragraph}>
              Thank you for contacting St. Hannah Foundation. A member of our
              team will review your message and reply, usually within 24 to 48
              business hours.
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
                <strong>Subject</strong>
              </Text>

              <Text style={styles.paragraph}>{subject}</Text>

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
