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

export interface VolunteerApplicationDetails {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  gender?: string;
  dateOfBirth?: string;
  location?: string;
  occupation?: string;
  qualification?: string;
  profession?: string;
  skills?: string;
  volunteeredBefore?: string;
  previousExperience?: string;
  areaOfInterest?: string;
  availability?: string;
  commitment?: string;
  motivation?: string;
  consent?: string;
}

interface Props extends VolunteerApplicationDetails {
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

const panel = {
  backgroundColor: "#FAF7F2",
  border: "1px solid #E7DFD3",
  borderRadius: "18px",
  padding: "30px",
  marginTop: "24px",
};

export default function FoundationVolunteerApplication({
  reference,
  date,
  fullName,
  email,
  phone,
  whatsapp,
  gender,
  dateOfBirth,
  location,
  occupation,
  qualification,
  profession,
  skills,
  volunteeredBefore,
  previousExperience,
  areaOfInterest,
  availability,
  commitment,
  motivation,
  consent,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>New volunteer application from {fullName}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <EmailHeader
            title="New Volunteer Application"
            subtitle="Someone has applied to volunteer with St. Hannah Foundation."
          />

          <Section style={styles.section}>
            <Text style={styles.subHeading}>Reference {reference}</Text>

            <Section style={panel}>
              <Field label="Full Name" value={fullName} />
              <Field label="Email Address" value={email} />
              <Field label="Phone Number" value={phone} />
              <Field label="WhatsApp Number" value={whatsapp} />
              <Field label="Gender" value={gender} />
              <Field label="Date Of Birth" value={dateOfBirth} />
              <Field label="Location" value={location} />
              <Field label="Submitted" value={date} />
            </Section>

            <Section style={panel}>
              <Field label="Occupation" value={occupation} />
              <Field label="Highest Qualification" value={qualification} />
              <Field label="Profession" value={profession} />
              <Field label="Skills & Experience" value={skills} />
              <Field label="Volunteered Before" value={volunteeredBefore} />
              <Field label="Previous Experience" value={previousExperience} />
            </Section>

            <Section style={panel}>
              <Field label="Area Of Interest" value={areaOfInterest} />
              <Field label="Availability" value={availability} />
              <Field label="Commitment" value={commitment} />
              <Field label="Motivation" value={motivation} />
              <Field label="Consent Given" value={consent} />
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
                Review the application and contact the applicant about the next
                steps. A passport photograph was requested on the form but is
                not attached: request it by replying to this email.
              </Text>
            </Section>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
