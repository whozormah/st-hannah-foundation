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
import PrimaryButton from "./components/PrimaryButton";
import { styles } from "./styles";

interface InternationalInterestProps {
  email: string;
  date: string;
}

export default function InternationalInterest({
  email,
  date,
}: InternationalInterestProps) {
  return (
    <Html>
      <Head />

      <Preview>You're on the list for International Giving updates</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="You're On The List!"
            subtitle="Thank you for your interest in supporting St. Hannah Foundation from anywhere in the world."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear Supporter,</Text>

            <Text style={styles.paragraph}>
              Thank you for your interest in partnering with{" "}
              <strong>St. Hannah Foundation.</strong>
            </Text>

            <Text style={styles.paragraph}>
              We've successfully added your email address to our International
              Giving notification list.
            </Text>

            <Text style={styles.paragraph}>
              As soon as international donations become available, you'll be
              among the first to know.
            </Text>

            <Section
              style={{
                background: "#FAF7F2",
                borderRadius: "18px",
                padding: "30px",
                margin: "35px 0",
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
                Your Request
              </Text>

              <Text style={styles.paragraph}>
                <strong>Email Address:</strong> {email}
              </Text>

              <Text style={styles.paragraph}>
                <strong>Requested Currencies:</strong> USD • GBP • EUR
              </Text>

              <Text style={styles.paragraph}>
                <strong>Date Joined:</strong> {date}
              </Text>
            </Section>

            <Section
              style={{
                background: "#FAF7F2",
                borderRadius: "18px",
                padding: "30px",
                marginBottom: "35px",
              }}
            >
              <Text
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#844204",
                  marginTop: 0,
                }}
              >
                What Happens Next?
              </Text>

              <Text style={styles.paragraph}>
                Once international giving becomes available, we'll notify you
                immediately with everything you need to complete your donation
                securely.
              </Text>

              <Text style={styles.paragraph}>
                Your generosity will help us restore hope, strengthen families,
                support children's education and transform vulnerable
                communities.
              </Text>
            </Section>

            <PrimaryButton
              href="https://sthannahfoundation.org"
              text="Visit Our Website"
            />

            <Text
              style={{
                ...styles.paragraph,
                marginTop: "35px",
                textAlign: "center",
              }}
            >
              Thank you for standing with us and believing in our mission.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
