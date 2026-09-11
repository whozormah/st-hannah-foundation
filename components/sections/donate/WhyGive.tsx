import Image from "next/image";

/* Copy is kept deliberately short. Emotion comes from the photograph and the
   whitespace, not from volume of text. Ready to be moved into the CMS later. */
export default function WhyGive() {
  return (
    <div>
      <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
        Why Give
      </span>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
        Because everyone deserves the opportunity to thrive.
      </h2>

      <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[24px]">
        <Image
          src="/causes/widows.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-5 text-lg leading-9 text-gray-700">
        <p>
          Life can change unexpectedly. A child may need an opportunity, a widow
          may need support, or a family may be facing a difficult season.
        </p>

        <p>
          St. Hannah Foundation exists to meet people where they are and help
          them move forward with dignity, support and opportunity.
        </p>

        <p className="font-semibold text-ink">
          Your generosity makes this work possible.
        </p>
      </div>
    </div>
  );
}
