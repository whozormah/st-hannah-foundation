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
  email: string;
  date: string;
}

export default function FoundationNewsletterSignup({ email, date }: Props) {
  return (
    <Html>
      <Head />

      <Preview>New newsletter subscriber</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Newsletter Subscriber"
            subtitle="Someone signed up for updates from the website footer."
          />

          <Section style={styles.section}>
            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
              }}
            >
              <Text style={styles.paragraph}>
                <strong>Email Address</strong>
              </Text>

              <Text style={styles.paragraph}>{email}</Text>

              <Text style={styles.paragraph}>
                <strong>Date</strong>
              </Text>

              <Text style={styles.paragraph}>{date}</Text>
            </Section>

            <Text style={styles.paragraph}>
              Add this address to your mailing list before the next update goes
              out.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
