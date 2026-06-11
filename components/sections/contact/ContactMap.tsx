export default function ContactMap() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Location
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Serving Communities Across Nigeria
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            St. Hannah Foundation is committed to reaching vulnerable
            individuals and families across Nigeria through sustainable
            humanitarian and empowerment initiatives.
          </p>
        </div>

        <div className="overflow-hidden rounded-[32px] shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=35+Ilaje+Road+Bariga+Lagos+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
