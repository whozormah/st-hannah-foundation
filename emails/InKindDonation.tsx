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

interface InKindDonationProps {
  name: string;
  category: string;
  description: string;
  reference: string;
  date: string;
}

export default function InKindDonation({
  name,
  category,
  description,
  reference,
  date,
}: InKindDonationProps) {
  return (
    <Html>
      <Head />

      <Preview>We have received your donation offer</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Thank You For Your Generosity"
            subtitle="We have received your offer to donate items to St. Hannah Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Dear {name},</Text>

            <Text style={styles.paragraph}>
              Thank you for offering to support our work with a donation of
              items. A member of our team will contact you shortly to confirm
              the details and arrange collection or drop-off.
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
                <strong>Category</strong>
              </Text>

              <Text style={styles.paragraph}>{category}</Text>

              <Text style={styles.paragraph}>
                <strong>Items Offered</strong>
              </Text>

              <Text style={styles.paragraph}>{description}</Text>

              <Text style={styles.paragraph}>
                <strong>Date Received</strong>
              </Text>

              <Text style={styles.paragraph}>{date}</Text>
            </Section>

            <Text style={styles.paragraph}>
              Please quote this reference number in any correspondence about
              your donation. If any details change, simply reply to this email
              and we will update your record.
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
