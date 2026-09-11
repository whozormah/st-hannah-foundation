import DonationFormFields from "@/components/shared/DonationFormFields";
import WhyGive from "./WhyGive";

/* The main section of the page: the human reason on the left, the donation
   card on the right, so someone can read why and act without scrolling.
   Stacks to Why Give then Give on tablet and phone. */
export default function DonationForm() {
  return (
    <section id="give" className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="grid items-start gap-10 lg:grid-cols-2 xl:gap-16">
          <WhyGive />

          <div className="lg:sticky lg:top-28">
            <DonationFormFields />
          </div>
        </div>
      </div>
    </section>
  );
}
