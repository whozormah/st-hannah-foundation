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
import ReceiptCard from "./components/ReceiptCard";
import ImpactSection from "./components/ImpactSection";
import PrimaryButton from "./components/PrimaryButton";
import EmailFooter from "./components/EmailFooter";
import { styles } from "./styles";

interface DonationReceiptProps {
  name: string;
  amount: string;
  purpose: string;
  reference: string;
  date: string;
  receiptUrl: string;
}

export default function DonationReceipt({
  name,
  amount,
  purpose,
  reference,
  date,
  receiptUrl,
}: DonationReceiptProps) {
  return (
    <Html>
      <Head />

      <Preview>
        Your donation has been received — thank you for supporting St. Hannah
        Foundation.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="Thank You for Your Generosity"
            subtitle="Your donation has been successfully received and is already helping us transform lives across vulnerable communities."
          />

          <Section style={styles.section}>
            <Text style={styles.paragraph}>
              Dear <strong>{name}</strong>,
            </Text>

            <Text style={styles.paragraph}>
              On behalf of everyone at <strong>St. Hannah Foundation</strong>,
              thank you for your generous support.
            </Text>

            <Text style={styles.paragraph}>
              Every contribution we receive strengthens our mission to restore
              hope, support vulnerable children, empower widows, improve access
              to education, and create sustainable opportunities for families
              and communities in need.
            </Text>

            <Text style={styles.paragraph}>
              We are deeply grateful that you have chosen to partner with us in
              creating lasting impact. Your generosity is more than a financial
              gift—it is an investment in brighter futures and transformed
              lives.
            </Text>

            <ReceiptCard
              amount={amount}
              purpose={purpose}
              reference={reference}
              date={date}
              status="SUCCESS"
            />

            <ImpactSection />

            <Section
              style={{
                marginTop: "36px",
                marginBottom: "36px",
                textAlign: "center",
              }}
            >
              <PrimaryButton
                href={receiptUrl}
                text="Download Your Official Donation Receipt"
              />
            </Section>

            <Text
              style={{
                ...styles.paragraph,
                marginTop: "12px",
              }}
            >
              This receipt serves as the official acknowledgement of your
              donation and may be retained for your personal records.
            </Text>

            <Text
              style={{
                ...styles.paragraph,
                marginTop: "20px",
              }}
            >
              Thank you once again for believing in our mission. Together, we
              are building stronger communities and bringing hope to those who
              need it most.
            </Text>

            <Text
              style={{
                marginTop: "36px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#844204",
              }}
            >
              With gratitude,
            </Text>

            <Text
              style={{
                marginTop: "6px",
                fontSize: "15px",
                color: "#333333",
              }}
            >
              The St. Hannah Foundation Team
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
