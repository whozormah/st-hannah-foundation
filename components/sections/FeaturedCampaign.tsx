"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  HeartPulse,
  Utensils,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";

interface CampaignData {
  name: string;
  age: number;
  tagline: string;
  headline: string;
  description: string[];
  whyStoryMattersTitle: string;
  whyStoryMatters: string;
  mainImage: string;
  gallery: string[];
  needs: string[];
  donationLink: string;
  videoLink: string;
}

export default function FeaturedCampaign() {
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    fetch("/data/campaigns.json")
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((err) => console.error(err));
  }, []);

  const getIcon = (need: string) => {
    switch (need) {
      case "Safe Accommodation":
        return <Home className="text-[#844204]" size={20} />;

      case "Food Support":
        return <Utensils className="text-[#844204]" size={20} />;

      case "Medical Support":
        return <HeartPulse className="text-[#844204]" size={20} />;

      case "Income Empowerment":
        return <BriefcaseBusiness className="text-[#844204]" size={20} />;

      default:
        return <HeartPulse className="text-[#844204]" size={20} />;
    }
  };

  if (!campaign) return null;

  return (
    <>
      <section className="py-28 bg-[#FAF7F2]">
        <div className="container-custom">
          {/* Header */}

          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Featured Story
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-[#1B1815]">
              {campaign.headline}
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Real lives. Real challenges. Real transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Images */}

            <div>
              <div className="relative h-[520px] rounded-[32px] overflow-hidden shadow-xl">
                <Image
                  src={campaign.mainImage}
                  alt={campaign.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                {campaign.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-28 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={campaign.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}

            <div>
              <span className="inline-flex items-center bg-[#844204]/10 text-[#844204] px-4 py-2 rounded-full font-medium">
                {campaign.tagline}
              </span>

              <h3 className="text-3xl md:text-4xl font-bold mt-6 text-[#1B1815]">
                {campaign.name}
              </h3>

              <div className="mt-8 space-y-6 text-gray-700 leading-8 text-lg">
                {campaign.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Why Story Matters */}

              <div className="mt-10 bg-white rounded-3xl p-8 border border-[#D9A441]/20">
                <h4 className="text-2xl font-bold text-[#844204] mb-4">
                  {campaign.whyStoryMattersTitle}
                </h4>

                <p className="text-gray-600 leading-8">
                  {campaign.whyStoryMatters}
                </p>
              </div>

              {/* Needs */}

              <div className="mt-10">
                <h4 className="text-2xl font-bold mb-6">Current Needs</h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  {campaign.needs.map((need, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#D9A441]/20"
                    >
                      {getIcon(need)}

                      <span className="font-medium">{need}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
                >
                  Support Esther's Family
                </button>

                <Link
                  href={campaign.videoLink}
                  target="_blank"
                  className="border border-[#844204] text-[#844204] px-8 py-4 rounded-xl font-semibold text-center hover:bg-[#844204] hover:text-white transition flex items-center justify-center gap-2"
                >
                  Watch Story
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={showDonationModal}
        programName="Esther Orga Family Support"
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}
