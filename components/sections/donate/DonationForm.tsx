import DonationFormFields from "@/components/shared/DonationFormFields";

export default function DonationForm() {
  return (
    <section id="give" className="bg-white py-14 md:py-24">
      <div className="container-custom max-w-4xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Donate Online
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Make a donation
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Every gift is receipted and goes to the programme you choose.
          </p>
        </div>

        <div className="mt-10 rounded-[28px] bg-cream p-6 shadow-sm sm:p-8 md:p-10">
          <DonationFormFields />
        </div>
      </div>
    </section>
  );
}
