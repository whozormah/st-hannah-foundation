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

export interface PartnershipEnquiryDetails {
  organisation: string;
  contactPerson: string;
  email: string;
  phone?: string;
  location?: string;
  partnershipType?: string;
  message?: string;
}

interface Props extends PartnershipEnquiryDetails {
  reference: string;
  date: string;
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <Text style={styles.paragraph}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

export default function FoundationPartnershipEnquiry({
  organisation,
  contactPerson,
  email,
  phone,
  location,
  partnershipType,
  message,
  reference,
  date,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Partnership enquiry from {organisation}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Partnership Enquiry"
            subtitle="An organisation has asked about partnering with the Foundation."
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
              <Field label="Organisation" value={organisation} />
              <Field label="Contact" value={contactPerson} />
              <Field label="Email" value={email} />
              <Field label="Phone" value={phone} />
              <Field label="Location" value={location} />
              <Field label="Partnership type" value={partnershipType} />
              <Field label="Received" value={date} />
            </Section>

            {message ? (
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
            ) : null}

            <Text style={styles.paragraph}>
              Reply directly to this email to reach {contactPerson}.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
