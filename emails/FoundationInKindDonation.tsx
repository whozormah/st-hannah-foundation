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

export interface InKindDonationDetails {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  quantity: string;
  condition: string;
  location: string;
  deliveryMethod: string;
  pickupAddress?: string;
  contactMethod?: string;
  pickupDate?: string;
  pickupTime?: string;
  pickupInstructions?: string;
  destination?: string;
  acknowledgeDonation: string;
}

interface Props extends InKindDonationDetails {
  reference: string;
  date: string;
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <>
      <Text style={styles.paragraph}>
        <strong>{label}</strong>
      </Text>

      <Text style={styles.paragraph}>{value}</Text>
    </>
  );
}

export default function FoundationInKindDonation({
  reference,
  date,
  fullName,
  email,
  phone,
  category,
  description,
  quantity,
  condition,
  location,
  deliveryMethod,
  pickupAddress,
  contactMethod,
  pickupDate,
  pickupTime,
  pickupInstructions,
  destination,
  acknowledgeDonation,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>New in-kind donation offer from {fullName}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New In-Kind Donation Offer"
            subtitle="Someone has offered to donate items or materials and is waiting to hear from the Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>Reference {reference}</Text>

            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "30px",
              }}
            >
              <Field label="Donor" value={fullName} />
              <Field label="Email Address" value={email} />
              <Field label="Phone Number" value={phone} />
              <Field label="Submitted" value={date} />
            </Section>

            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "24px",
              }}
            >
              <Field label="Category" value={category} />
              <Field label="Description" value={description} />
              <Field label="Quantity" value={quantity} />
              <Field label="Condition" value={condition} />
            </Section>

            <Section
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E7DFD3",
                borderRadius: "18px",
                padding: "30px",
                marginTop: "24px",
              }}
            >
              <Field label="Donor Location" value={location} />
              <Field label="Delivery Method" value={deliveryMethod} />
              <Field label="Pickup Address" value={pickupAddress} />
              <Field label="Preferred Contact" value={contactMethod} />
              <Field label="Preferred Pickup Date" value={pickupDate} />
              <Field label="Preferred Pickup Time" value={pickupTime} />
              <Field label="Pickup Instructions" value={pickupInstructions} />
              <Field label="Drop-off Destination" value={destination} />
              <Field
                label="Wants Public Acknowledgement"
                value={acknowledgeDonation}
              />
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
                Contact the donor to confirm the items, agree a collection or
                drop-off time, and record the donation against reference{" "}
                {reference}. If photographs of the items were offered, request
                them by replying to this email.
              </Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
