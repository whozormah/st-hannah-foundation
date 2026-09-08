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

interface VolunteerApplicationProps {
  name: string;
  areaOfInterest?: string;
  reference: string;
  date: string;
}

export default function VolunteerApplication({
  name,
  areaOfInterest,
  reference,
  date,
}: VolunteerApplicationProps) {
  return (
    <Html>
      <Head />

      <Preview>We have received your volunteer application</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Thank You For Stepping Forward"
            subtitle="We have received your application to volunteer with St. Hannah Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear {name},</Text>

            <Text style={styles.paragraph}>
              Thank you for offering your time and skills. Our team will review
              your application and contact you about the next steps.
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

              {areaOfInterest ? (
                <>
                  <Text style={styles.paragraph}>
                    <strong>Area Of Interest</strong>
                  </Text>

                  <Text style={styles.paragraph}>{areaOfInterest}</Text>
                </>
              ) : null}

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
