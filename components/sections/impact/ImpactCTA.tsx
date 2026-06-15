"use client";

import { useState } from "react";
import { Heart, Users, Handshake } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function ImpactCTA() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  return (
    <>
      {" "}
      <section className="py-32 bg-[#844204] text-white relative overflow-hidden">
        {/* Background Effects */}

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D9A441] rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D9A441] rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10">
          {/* Section Header */}

          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Join The Mission
          </span>

          <h2 className="text-5xl md:text-7xl font-bold mt-6 leading-tight max-w-5xl mx-auto">
            The Next Story Of Hope
            <br />
            Could Begin With You
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
            Through your generosity, partnership and service, we are restoring
            hope, empowering widows, supporting education, strengthening
            families and transforming communities one life at a time.
          </p>

          {/* Impact Statistics */}

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 mb-16">
            <div>
              <h3 className="text-5xl font-bold text-[#D9A441]">500+</h3>

              <p className="mt-2 text-gray-200">Widows Supported</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#D9A441]">100+</h3>

              <p className="mt-2 text-gray-200">Families Reached</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#D9A441]">15+</h3>

              <p className="mt-2 text-gray-200">Students Sponsored</p>
            </div>
          </div>

          {/* Action Cards */}

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <button
              onClick={() => setIsDonateOpen(true)}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <Heart size={42} className="mx-auto text-[#D9A441]" />

              <h3 className="font-bold text-2xl mt-5">Donate</h3>

              <p className="mt-3 text-gray-200 leading-7">
                Support life-changing programmes that directly impact widows,
                students, families and vulnerable communities.
              </p>
            </button>

            <a
              href="/volunteer"
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 block"
            >
              <Users size={42} className="mx-auto text-[#D9A441]" />

              <h3 className="font-bold text-2xl mt-5">Volunteer</h3>

              <p className="mt-3 text-gray-200 leading-7">
                Share your skills, expertise and time to help us create
                sustainable impact in communities.
              </p>
            </a>

            <button
              onClick={() => setIsPartnerOpen(true)}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <Handshake size={42} className="mx-auto text-[#D9A441]" />

              <h3 className="font-bold text-2xl mt-5">Partner</h3>

              <p className="mt-3 text-gray-200 leading-7">
                Collaborate with us through sponsorships, strategic partnerships
                and corporate support initiatives.
              </p>
            </button>
          </div>

          <p className="mt-12 text-lg text-gray-200 max-w-3xl mx-auto leading-8">
            Every donation, every volunteer and every partner helps us extend
            hope, restore dignity and create lasting transformation in the lives
            of those who need it most.
          </p>
        </div>
      </section>
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </>
  );
}
