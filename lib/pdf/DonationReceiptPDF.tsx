import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles";

interface DonationReceiptPDFProps {
  name: string;
  amount: string;
  purpose: string;
  reference: string;
  date: string;
  email: string;
}

export default function DonationReceiptPDF({
  name,
  amount,
  purpose,
  reference,
  date,
  email,
}: DonationReceiptPDFProps) {
  return (
    <Document
      title={`Donation Receipt - ${reference}`}
      author="St. Hannah Foundation"
      subject="Official Donation Receipt"
      creator="St. Hannah Foundation Donation System"
    >
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>ST. HANNAH FOUNDATION</Text>

        {/* Header */}
        <View style={styles.header}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`}
            style={styles.logo}
          />

          <Text style={styles.foundation}>ST. HANNAH FOUNDATION</Text>

          <Text style={styles.tagline}>
            Empowering Communities Through Love &amp; Service
          </Text>

          <Text style={styles.receiptTitle}>OFFICIAL DONATION RECEIPT</Text>

          <Text style={styles.receiptSubtitle}>
            Thank you for investing in lives and communities through your
            generous support.
          </Text>
        </View>

        {/* Donation Summary */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Donation Amount</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        {/* Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Donation Details</Text>

          <Text style={styles.successBadge}>PAYMENT VERIFIED</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Donor</Text>
            <Text style={styles.value}>{name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Purpose</Text>
            <Text style={styles.value}>{purpose}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Receipt Number</Text>
            <Text style={styles.receiptNumber}>{reference}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Transaction Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
        </View>

        {/* Acknowledgement */}
        <View style={styles.acknowledgement}>
          <Text style={styles.acknowledgementTitle}>Acknowledgement</Text>

          <Text style={styles.acknowledgementText}>
            This document serves as the official acknowledgement of your
            donation to St. Hannah Foundation. We sincerely appreciate your
            generosity and your commitment to creating lasting change.
          </Text>

          <Text
            style={[
              styles.acknowledgementText,
              {
                marginTop: 12,
              },
            ]}
          >
            Your contribution helps us provide education support, humanitarian
            assistance, community development programmes, and opportunities that
            restore hope and transform lives.
          </Text>

          <Text
            style={[
              styles.acknowledgementText,
              {
                marginTop: 12,
                fontWeight: "bold",
              },
            ]}
          >
            Thank you for partnering with us to make meaningful impact.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Authorized Representative</Text>
            <Text style={styles.signatureSubtitle}>St. Hannah Foundation</Text>
          </View>

          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureTitle}>Official Stamp</Text>
            <Text style={styles.signatureSubtitle}>Foundation Seal</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerPrimary}>
            This is an electronically generated receipt.
          </Text>

          <Text style={styles.footerSecondary}>
            No physical signature is required for authenticity.
          </Text>

          <Text
            style={[
              styles.footerSecondary,
              {
                marginTop: 10,
              },
            ]}
          >
            support@sthannahfoundation.org
          </Text>

          <Text style={styles.footerSecondary}>www.sthannahfoundation.org</Text>

          <Text
            style={[
              styles.footerSecondary,
              {
                marginTop: 10,
              },
            ]}
          >
            © St. Hannah Foundation. All Rights Reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
