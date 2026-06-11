"use client";

import { useState } from "react";

import PageHeader from "@/components/shared/PageHeader";
import ImpactFeaturedStory from "@/components/sections/impact/ImpactFeaturedStory";
import ImpactStorySection from "@/components/shared/ImpactStorySection";
import ImpactArchive from "@/components/sections/impact/ImpactArchive";
import ImpactCTA from "@/components/sections/impact/ImpactCTA";

export default function ImpactStoriesPage() {
  const [visibleStories, setVisibleStories] = useState(3);

  const stories = [
    {
      title: "Widow Empowerment Program",
      date: "December 2025",
      location: "35 Ilaje Road, Bariga, Lagos",
      image: "/impact/widows/1.jpg",
      images: [
        "/impact/widows/1.jpg",
        "/impact/widows/2.jpg",
        "/impact/widows/3.jpg",
        "/impact/widows/4.jpg",
        "/impact/widows/5.jpg",
        "/impact/widows/6.jpg",
        "/impact/widows/7.jpg",
        "/impact/widows/8.jpg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=widows",
      description: `More than 500 widows gathered for one of the Foundation's largest outreach initiatives.

Food items, clothing, slippers and essential support materials were distributed to beneficiaries.

Educational opportunities were also created for children preparing for UTME examinations.

The program restored hope, dignity and encouragement to hundreds of women and their families.`,
    },

    {
      title: "Back To School Campaign",
      date: "December 2025",
      location: "35 Ilaje Road, Bariga, Lagos",
      image: "/impact/back-to-school/1.jpeg",
      images: [
        "/impact/back-to-school/1.jpeg",
        "/impact/back-to-school/2.jpeg",
        "/impact/back-to-school/3.jpeg",
        "/impact/back-to-school/4.jpeg",
        "/impact/back-to-school/5.jpeg",
        "/impact/back-to-school/6.jpeg",
        "/impact/back-to-school/7.jpeg",
        "/impact/back-to-school/8.jpeg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=back-to-school",
      description: `As schools prepared to resume, many families faced difficulties providing educational materials for their children.

To support pupils and reduce financial pressure on families, school bags, writing materials and educational supplies were distributed.

The initiative helped children return to school equipped and ready to learn.`,
    },

    {
      title: "UTME Sponsorship Initiative",
      date: "2026",
      location: "Lagos, Nigeria",
      image: "/impact/utme/1.jpg",
      images: [
        "/impact/utme/1.jpg",
        "/impact/utme/2.jpg",
        "/impact/utme/3.jpg",
        "/impact/utme/4.jpg",
        "/impact/utme/5.jpg",
        "/impact/utme/6.jpg",
        "/impact/utme/7.jpg",
        "/impact/utme/8.jpg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=utme",
      description: `Education remains one of the strongest tools for creating opportunities.

St. Hannah Foundation sponsored free UTME registration for approximately fifteen students, helping remove financial barriers and opening doors to higher education opportunities.`,
    },

    {
      title: "Family Feeding Support",
      date: "Ongoing Initiative",
      location: "Various Communities",
      image: "/impact/feeding/1.jpg",
      images: [
        "/impact/feeding/1.jpg",
        "/impact/feeding/2.jpg",
        "/impact/feeding/3.jpg",
        "/impact/feeding/4.jpg",
        "/impact/feeding/5.jpg",
        "/impact/feeding/6.jpg",
        "/impact/feeding/7.jpg",
        "/impact/feeding/8.jpg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=feeding",
      description: `The Foundation regularly provides food support to vulnerable families facing economic hardship.

These interventions help families navigate difficult periods while preserving dignity and wellbeing.`,
    },

    {
      title: "School Fee Assistance Program",
      date: "Ongoing Initiative",
      location: "Nigeria",
      image: "/impact/school-fees/1.jpg",
      images: [
        "/impact/school-fees/1.jpg",
        "/impact/school-fees/2.jpg",
        "/impact/school-fees/3.jpg",
        "/impact/school-fees/4.jpg",
        "/impact/school-fees/5.jpg",
        "/impact/school-fees/6.jpg",
        "/impact/school-fees/7.jpg",
        "/impact/school-fees/8.jpg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=school-fees",
      description: `Through educational assistance initiatives, the Foundation helps children remain in school and continue their learning journey despite financial challenges.`,
    },

    {
      title: "Business Empowerment Support",
      date: "Ongoing Initiative",
      location: "Nigeria",
      image: "/impact/business-support/1.jpg",
      images: [
        "/impact/business-support/1.jpg",
        "/impact/business-support/2.jpg",
        "/impact/business-support/3.jpg",
        "/impact/business-support/4.jpg",
        "/impact/business-support/5.jpg",
        "/impact/business-support/6.jpg",
        "/impact/business-support/7.jpg",
        "/impact/business-support/8.jpg",
      ],
      videoUrl: "https://youtube.com/",
      galleryLink: "/gallery?category=business-support",
      description: `The Foundation provides business support to individuals seeking sustainable income opportunities, helping families move toward financial independence.`,
    },
  ];

  return (
    <>
      <PageHeader
        title="Impact & Outreach Stories"
        subtitle="Discover the lives touched, communities served and transformative initiatives delivered through the work of St. Hannah Foundation."
      />

      <ImpactFeaturedStory />

      {stories.slice(0, visibleStories).map((story, index) => (
        <ImpactStorySection
          key={story.title}
          {...story}
          reverse={index % 2 !== 0}
        />
      ))}

      {visibleStories < stories.length && (
        <div className="text-center py-10">
          <button
            onClick={() => setVisibleStories(visibleStories + 3)}
            className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition"
          >
            Explore More Impact Stories
          </button>
        </div>
      )}
      <ImpactArchive />
      <ImpactCTA />
    </>
  );
}
