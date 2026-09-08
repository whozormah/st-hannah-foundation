"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ArrowRight,
  Calendar,
  Quote,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";

import campaigns from "@/public/data/campaigns.json";

interface CampaignData {
  id: number;
  name: string;
  age: number;
  tagline: string;
  headline: string;
  heroImage: string;
  gallery: string[];
  description: string[];
  whyStoryMattersTitle: string;
  whyStoryMatters: string;
  needs: string[];
  videoLink?: string;
  featured: boolean;
}

const campaign: CampaignData | undefined = (campaigns as CampaignData[]).find(
  (item) => item.featured,
);

export default function ImpactFeaturedStory() {
  const [showDonationModal, setShowDonationModal] = useState(false);


  if (!campaign) return null;

  return (
    <>
      <section className="bg-white py-32">
        <div className="container-custom">
          {/* Header */}

          <div className="mx-auto mb-20 max-w-4xl text-center">
            <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
              Featured Story
            </span>

            <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
              A Story That Reminds Us
              <br />
              Why Hope Matters
            </h2>

            <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
              Behind every programme is a person. Behind every statistic is a
              story. Meet one of the lives that represents the heart of our
              mission.
            </p>
          </div>

          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Image */}

            <div className="group relative overflow-hidden rounded-[40px] shadow-2xl">
              <div className="relative h-[720px]">
                <Image
                  src={campaign.heroImage}
                  alt={campaign.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <span className="rounded-full bg-[#D9A441] px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-[#2E1B05]">
                    {campaign.tagline}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}

            <div>
              <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
                {campaign.tagline}
              </span>
              <h3 className="mt-5 text-5xl font-bold leading-tight text-[#1B1815]">
                {campaign.headline}
              </h3>
              <div className="mt-6 h-[3px] w-20 rounded-full bg-[#D9A441]" />
              <div className="mt-8 flex items-center gap-3 text-[#844204]">
                <Calendar size={18} />

                <span className="font-semibold">
                  {campaign.name} • {campaign.age} Years Old
                </span>
              </div>
              <div className="mt-10 rounded-[32px] border border-[#D9A441]/20 bg-[#FFF8EC] p-8">
                <Quote size={34} className="mb-5 text-[#D9A441]" />

                <p className="text-lg italic leading-9 text-gray-700">
                  Every transformed life reminds us that compassion has the
                  power to rewrite someone&apos;s future.
                </p>
              </div>
              <div className="mt-10 space-y-7">
                {campaign.description.map((paragraph, index) => (
                  <p key={index} className="leading-9 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* Needs */}
              <div className="mt-12">
                <h4 className="text-2xl font-bold text-[#1B1815]">
                  Current Areas Of Support
                </h4>

                <div className="mt-6 flex flex-wrap gap-3">
                  {campaign.needs.map((need) => (
                    <div
                      key={need}
                      className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F2] px-5 py-3 text-sm font-semibold text-[#844204]"
                    >
                      <CheckCircle2 size={16} />

                      {need}
                    </div>
                  ))}
                </div>
              </div>{" "}
              {/* Why It Matters */}
              <div className="mt-12 rounded-[36px] border border-[#D9A441]/20 bg-[#FAF7F2] p-10">
                <span className="font-semibold uppercase tracking-[4px] text-[#844204]">
                  Why This Story Matters
                </span>

                <h4 className="mt-4 text-3xl font-bold text-[#1B1815]">
                  {campaign.whyStoryMattersTitle}
                </h4>

                <div className="mt-5 h-[3px] w-16 rounded-full bg-[#D9A441]" />

                <p className="mt-8 leading-9 text-gray-600">
                  {campaign.whyStoryMatters}
                </p>

                <div className="mt-10 flex flex-wrap gap-5">
                  <button
                    onClick={() => setShowDonationModal(true)}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#844204] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D3503] hover:shadow-xl"
                  >
                    <Heart size={18} />
                    Help Create More Stories
                    <ArrowRight
                      size={18}
                      className="transition duration-300 group-hover:translate-x-2"
                    />
                  </button>

                  {campaign.videoLink && campaign.videoLink !== "#" && (
                    <a
                      href={campaign.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full border-2 border-[#844204] px-8 py-4 font-semibold text-[#844204] transition-all duration-300 hover:bg-[#844204] hover:text-white"
                    >
                      <PlayCircle size={18} />
                      Watch Story
                      <ArrowRight
                        size={18}
                        className="transition duration-300 group-hover:translate-x-2"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Preview */}

          {campaign.gallery.length > 0 && (
            <div className="mt-28">
              <div className="mb-12 text-center">
                <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
                  Photo Highlights
                </span>

                <h3 className="mt-4 text-4xl font-bold text-[#1B1815]">
                  Moments That Inspire Hope
                </h3>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {campaign.gallery.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="group overflow-hidden rounded-[36px] shadow-xl"
                  >
                    <div className="relative h-[380px]">
                      <Image
                        src={image}
                        alt={`${campaign.name} ${index + 1}`}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}
