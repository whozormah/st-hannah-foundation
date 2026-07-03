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

interface FoundationInternationalInterestProps {
  email: string;
  date: string;
}

export default function FoundationInternationalInterest({
  email,
  date,
}: FoundationInternationalInterestProps) {
  return (
    <Html>
      <Head />

      <Preview>🌍 New International Giving Interest</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New International Giving Interest"
            subtitle="A visitor has requested to be notified when international giving becomes available."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>International Giving Waitlist</Text>

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
                <strong>Email Address</strong>
              </Text>

              <Text style={styles.paragraph}>{email}</Text>

              <Text style={styles.paragraph}>
                <strong>Requested Currencies</strong>
              </Text>

              <Text style={styles.paragraph}>USD • GBP • EUR</Text>

              <Text style={styles.paragraph}>
                <strong>Date Joined</strong>
              </Text>

              <Text style={styles.paragraph}>{date}</Text>

              <Text style={styles.paragraph}>
                <strong>Status</strong>
              </Text>

              <Text style={styles.paragraph}>
                Waiting for International Giving launch.
              </Text>
            </Section>

            <Section
              style={{
                backgroundColor: "#FFF9EC",
                border: "1px solid #F3D58B",
                borderRadius: "18px",
                padding: "28px",
                marginTop: "35px",
              }}
            >
              <Text
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#844204",
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                Recommended Action
              </Text>

              <Text style={styles.paragraph}>
                Once international giving is launched, send an announcement to
                this supporter inviting them to complete their donation using
                USD, GBP or EUR.
              </Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
