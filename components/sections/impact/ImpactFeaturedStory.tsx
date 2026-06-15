"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import DonationModal from "@/components/shared/DonationModal";

interface CampaignData {
  name: string;
  age?: number;
  headline: string;
  description: string[];
  mainImage: string;
  whyStoryMattersTitle: string;
  whyStoryMatters: string;
}

export default function ImpactFeaturedStory() {
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    fetch("/data/campaigns.json")
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((err) => console.error(err));
  }, []);

  if (!campaign) return null;

  return (
    <>
      {" "}
      <section className="py-32 bg-white">
        {" "}
        <div className="container-custom">
          {" "}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {" "}
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Featured Story{" "}
            </span>
            ```
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              A Story Of Hope, Resilience & Transformation
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Every life touched tells a story. Every story reminds us why
              compassion, opportunity and community support matter.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-[36px] overflow-hidden shadow-xl">
              <Image
                src={campaign.mainImage}
                alt={campaign.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="inline-flex items-center bg-[#FAF7F2] px-4 py-2 rounded-full text-sm font-semibold text-[#844204]">
                Impact Story
              </div>

              <h3 className="text-4xl font-bold mt-6 leading-tight">
                {campaign.headline}
              </h3>

              <p className="mt-4 text-[#844204] font-semibold">
                {campaign.name}
              </p>

              <div className="space-y-6 mt-8">
                {campaign.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 bg-[#FAF7F2] rounded-[28px] p-8 border border-[#D9A441]/20">
                <h4 className="text-2xl font-bold text-[#844204]">
                  {campaign.whyStoryMattersTitle}
                </h4>

                <p className="mt-4 text-gray-600 leading-8">
                  {campaign.whyStoryMatters}
                </p>

                <button
                  onClick={() => setShowDonationModal(true)}
                  className="mt-8 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition-all duration-300"
                >
                  Help Create More Stories Like This
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}
