export default function VolunteerOpportunities() {
  const opportunities = [
    "Community Outreach",
    "Programs Associate",
    "Education Support",
    "Widow Empowerment Support",
    "Family Support",
    "Content Creation",
    "Social Media Management",
    "Photography & Videography",
    "Media & Communications",
    "Fundraising",
    "Partnerships & Sponsorship",
    "Administrative Support",
    "Technology Support",
    "Event Coordination",
    "Volunteer Coordination",
    "Monitoring & Evaluation",
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Opportunities
          </span>

          <h2 className="text-5xl font-bold mt-4">Volunteer Opportunities</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((role) => (
            <div
              key={role}
              className="bg-white p-6 rounded-[24px] text-center shadow-sm"
            >
              <h3 className="font-semibold">{role}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
