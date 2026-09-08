import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactMap() {
  return (
    <section className="py-32 bg-cream">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center mb-20">
          <span className="font-semibold uppercase tracking-[6px] text-brand">
            Our Presence
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-ink">
            Serving Communities
            <br />
            Across Continents
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            While our programmes primarily serve communities across Nigeria, our
            growing network of partners, volunteers and supporters extends
            internationally, helping us create sustainable impact where it is
            needed most.
          </p>
        </div>

        {/* Office Cards */}

        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          {/* Nigeria */}

          <div className="group rounded-[36px] bg-white p-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm group-hover:bg-brand transition">
                <MapPin
                  size={36}
                  className="text-brand group-hover:text-white transition"
                />
              </div>

              <div>
                <span className="uppercase tracking-[4px] text-sm text-brand font-semibold">
                  Headquarters
                </span>

                <h3 className="text-3xl font-bold mt-2">Nigeria Office</h3>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h4 className="font-semibold">Address</h4>

                <p className="mt-2 leading-8 text-gray-700">
                  35 Ilaje Road
                  <br />
                  Bariga, Lagos
                  <br />
                  Nigeria
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={18} className="text-brand" />

                <span className="text-gray-700">
                  Available during working hours
                </span>
              </div>
            </div>
          </div>

          {/* USA */}

          <div className="group rounded-[36px] bg-white p-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm group-hover:bg-brand transition">
                <MapPin
                  size={36}
                  className="text-brand group-hover:text-white transition"
                />
              </div>

              <div>
                <span className="uppercase tracking-[4px] text-sm text-brand font-semibold">
                  International Office
                </span>

                <h3 className="text-3xl font-bold mt-2">United States</h3>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-semibold">Address</h4>

              <p className="mt-2 leading-8 text-gray-700">
                4310 S King Dr.
                <br />
                Unit 3D
                <br />
                Chicago, IL 60653
                <br />
                United States
              </p>
            </div>
          </div>
        </div>

        {/* Contact Cards */}

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-[32px] bg-white p-8 shadow-lg">
            <div className="flex items-center gap-4">
              <Mail size={26} className="text-brand" />

              <h3 className="text-2xl font-bold">Email Enquiries</h3>
            </div>

            <p className="mt-5 text-lg text-gray-700">
              info@sthannahfoundation.org
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-lg">
            <div className="flex items-center gap-4">
              <Clock size={26} className="text-brand" />

              <h3 className="text-2xl font-bold">Response Time</h3>
            </div>

            <p className="mt-5 text-lg text-gray-700">
              Within 24–48 business hours.
            </p>
          </div>
        </div>

        {/* Google Map */}

        <div className="overflow-hidden rounded-[40px] shadow-2xl border border-gray-100">
          <iframe
            src="https://maps.google.com/maps?q=35+Ilaje+Road+Bariga+Lagos+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="600"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
