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

export interface ContactEnquiryDetails {
  name: string;
  email: string;
  subject: string;
  enquiry: string;
  message: string;
}

interface Props extends ContactEnquiryDetails {
  reference: string;
  date: string;
}

export default function FoundationContactEnquiry({
  name,
  email,
  subject,
  enquiry,
  message,
  reference,
  date,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        {enquiry}: {subject}
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Enquiry From The Website"
            subtitle="Someone has sent a message through the contact form."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>Reference {reference}</Text>

            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "24px",
              }}
            >
              <Text style={styles.paragraph}>
                <strong>From:</strong> {name}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Email:</strong> {email}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Reason:</strong> {enquiry}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Subject:</strong> {subject}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Received:</strong> {date}
              </Text>
            </Section>

            <Section
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "24px",
              }}
            >
              <Text style={styles.paragraph}>
                <strong>Message</strong>
              </Text>

              <Text style={{ ...styles.paragraph, whiteSpace: "pre-wrap" }}>
                {message}
              </Text>
            </Section>

            <Text style={styles.paragraph}>
              Reply directly to this email to respond to {name}.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
