/* The wording each homepage section carries by default (CR-009).

   One copy, read in three places: the sections use it wherever they are
   shown without an editor's wording (the About page's testimonials, for
   instance); the block library pre-fills a new block with it; and the
   content migration writes it into the homepage. So the homepage the CMS
   builds reads exactly as the page did before it.

   A line break in a title is written as a new line. */

export type SectionCopy = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export const SECTION_COPY = {
  programmeCards: {
    eyebrow: "Our Programmes",
    title: "Creating opportunities. Restoring hope.",
  },
  galleryStrip: {
    eyebrow: "Moments Of Impact",
    title: "Moments That Tell Our Story",
    description:
      "Every photograph records a life touched and a community strengthened. Browse the work by programme area, or open the full gallery.",
  },
  storiesInMotion: {
    eyebrow: "Stories In Motion",
    title: "Experience the impact",
    description:
      "Watch the work through the lives of the people and communities we serve.",
  },
  statistics: {
    eyebrow: "Impact At A Glance",
    title: "Impact That Changes Lives",
    description:
      "Every initiative, every outreach and every act of generosity contributes to building stronger families, restoring dignity and creating opportunities for individuals and communities to thrive.",
  },
  donationCallToAction: {
    eyebrow: "Stories of Hope",
    description:
      "Every programme begins with someone's real circumstances. This is one of them, told in full.",
  },
  storyCards: {
    eyebrow: "Stories Of Transformation",
    title: "Lives Changed Through Compassion",
    description:
      "Behind every program is a story of resilience, hope and lives being transformed through compassion and support.",
  },
  testimonials: {
    eyebrow: "In Their Own Words",
    title: "Voices From The Communities We Serve",
    description:
      "Beneficiaries, volunteers and community leaders on what the Foundation's work has meant to them.",
  },
  leadershipPreview: {
    eyebrow: "Governance & Leadership",
    title: "Meet the leaders behind the mission",
    description:
      "The people responsible for the Foundation's direction, oversight and accountability.",
  },
  callToAction: {
    eyebrow: "Join The Mission",
    title: "Be The Reason\nHope Continues",
    description:
      "Every act of kindness creates opportunities for children, strengthens families and restores hope to communities. Whether you choose to give, volunteer or partner with us, you become part of a mission that changes lives every day.",
  },
} satisfies Record<string, SectionCopy>;

/** The homepage's sections, in the order the site has always shown them. */
export const HOMEPAGE_ORDER = [
  "hero",
  "visionMission",
  "programmeCards",
  "galleryStrip",
  "statistics",
  "donationCallToAction",
  "storyCards",
  "testimonials",
  "leadershipPreview",
  "callToAction",
] as const;

/* The homepage's Heart of the Foundation section (CR-024): the woman the
   Foundation is named after. The caption is from her story on the About
   page, in the Foundation's words. */
export const HEART_OF_FOUNDATION_COPY = {
  eyebrow: "The Heart Behind The Name",
  title: "Where It All Began",
  text: "Prophetess Hannah Okoh dedicated much of her life to caring for the less privileged. During festive seasons, she visited orphanages and underserved communities, making sure children and families received food, clothing and essential support.",
  closing: "Her legacy of compassion lives on through St. Hannah Foundation.",
  buttonLabel: "Read Her Story",
  buttonLink: "/about#her-story",
};
