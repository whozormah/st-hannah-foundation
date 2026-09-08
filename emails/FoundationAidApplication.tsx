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

export type AidApplicationDetails = Record<string, string> & {
  fullName: string;
  email: string;
  phone: string;
};

interface Props {
  details: AidApplicationDetails;
  reference: string;
  date: string;
}

const GROUPS: { title: string; fields: [string, string][] }[] = [
  {
    title: "Applicant",
    fields: [
      ["fullName", "Full Name"],
      ["gender", "Gender"],
      ["dateOfBirth", "Date Of Birth"],
      ["nationality", "Nationality"],
      ["phone", "Phone Number"],
      ["email", "Email Address"],
      ["contactMethod", "Preferred Contact"],
      ["nationalId", "National ID"],
      ["referralSource", "Heard About Us Via"],
    ],
  },
  {
    title: "Residence",
    fields: [
      ["address", "Residential Address"],
      ["state", "State"],
      ["lga", "Local Government Area"],
      ["landmark", "Nearest Landmark"],
      ["durationAtAddress", "Time At Address"],
      ["housingStatus", "Housing Status"],
      ["livingConditions", "Living Conditions"],
      ["housingChallenges", "Housing Challenges"],
    ],
  },
  {
    title: "Support Requested",
    fields: [
      ["supportType", "Type Of Support"],
      ["supportTypeOther", "Other Support Described"],
      ["urgency", "Urgency"],
      ["appliedElsewhere", "Applied Elsewhere"],
      ["supportSummary", "Summary"],
      ["challenge", "Current Challenge"],
      ["expectedImpact", "Expected Impact"],
    ],
  },
  {
    title: "Family & Background",
    fields: [
      ["occupation", "Occupation"],
      ["maritalStatus", "Marital Status"],
      ["incomeSource", "Primary Income Source"],
      ["incomeSourceOther", "Other Income Source"],
      ["monthlyIncome", "Estimated Monthly Income"],
      ["children", "Number Of Children"],
      ["dependents", "Number Of Dependents"],
      ["primaryProvider", "Primary Provider"],
    ],
  },
];

const panel = {
  backgroundColor: "#FAF7F2",
  border: "1px solid #E7DFD3",
  borderRadius: "18px",
  padding: "30px",
  marginTop: "24px",
};

export default function FoundationAidApplication({
  details,
  reference,
  date,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>New support application from {details.fullName}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Support Application"
            subtitle="Someone has applied for assistance from St. Hannah Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>Reference {reference}</Text>

            <Text style={styles.paragraph}>Submitted {date}</Text>

            {GROUPS.map((group) => {
              const present = group.fields.filter(([key]) => details[key]);

              if (!present.length) return null;

              return (
                <Section key={group.title} style={panel}>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#844204",
                      marginTop: 0,
                      marginBottom: "16px",
                    }}
                  >
                    {group.title}
                  </Text>

                  {present.map(([key, label]) => (
                    <Text key={key} style={styles.paragraph}>
                      <strong>{label}:</strong> {details[key]}
                    </Text>
                  ))}
                </Section>
              );
            })}

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
                All four declarations were accepted by the applicant. Supporting
                documents were requested on the form but are not attached:
                request them by replying to this email.
              </Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
