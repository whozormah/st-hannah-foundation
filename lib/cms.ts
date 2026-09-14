import { unstable_cache } from "next/cache";
import { getPayload, type CollectionSlug, type GlobalSlug } from "payload";

import config from "@payload-config";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { CMS_TAGS } from "./cms-tags";
import { HOMEPAGE_ORDER, SECTION_COPY } from "./section-copy";

/* Reading website content from the CMS.

   Every function returns content in exactly the shape its old JSON file had,
   so switching a component from the file to the CMS is a one-line change and
   the page renders the same.

   Each read is cached and tagged. When an editor publishes, a hook
   (payload/revalidate.ts) invalidates the tag and the next visitor gets the
   new content — PUB-04, within 60 seconds and without a deployment.

   `unstable_cache` rather than the newer `'use cache'`: in Next 16 the newer
   API requires switching the whole app to Cache Components, which changes how
   every existing page renders (CR-007). Moving later is contained to here.

   Only published content is ever read (CNT-05): drafts stay in the admin. */

export { CMS_TAGS };

type Doc = Record<string, unknown>;

async function payloadClient() {
  return getPayload({ config });
}

/** Published documents of a collection, in the editors' chosen order. */
async function published(collection: CollectionSlug): Promise<Doc[]> {
  const payload = await payloadClient();

  const { docs } = await payload.find({
    collection,
    where: { _status: { equals: "published" } },
    sort: "order",
    limit: 500,
    depth: 0,
  });

  return docs as unknown as Doc[];
}

async function global(slug: GlobalSlug): Promise<Doc> {
  const payload = await payloadClient();

  return (await payload.findGlobal({ slug, depth: 0 })) as unknown as Doc;
}

/* The database returns null for an empty field; the old files had "" and [].
   Components were written against the files, so the files' shape is kept. */
const text = (value: unknown) => (typeof value === "string" ? value : "");
const lines = (value: unknown) => (Array.isArray(value) ? (value as string[]) : []);
const paras = (value: unknown) =>
  Array.isArray(value) ? (value as { text: string }[]).map((p) => p.text) : [];

const cached = <T>(tag: string, read: () => Promise<T>) =>
  unstable_cache(read, [tag], { tags: [tag] });

/* ── Collections ────────────────────────────────────────────────────────── */

export type Testimonial = { name: string; role: string; text: string };

export const getTestimonials = cached(CMS_TAGS.testimonials, async (): Promise<Testimonial[]> =>
  (await published("testimonials")).map((d) => ({
    name: text(d.name),
    role: text(d.role),
    text: text(d.quote),
  })),
);

export type Programme = {
  slug: string;
  title: string;
  icon: string;
  heroImage: string;
  excerpt: string;
  why: string;
  approach: string;
  impact: string;
  activities: string[];
  beneficiaries: string[];
  ctaTitle: string;
  ctaText: string;
};

export const getProgrammes = cached(CMS_TAGS.programmes, async (): Promise<Programme[]> =>
  (await published("programmes")).map((d) => ({
    slug: text(d.slug),
    title: text(d.title),
    icon: text(d.icon),
    heroImage: text(d.heroImage),
    excerpt: text(d.excerpt),
    why: text(d.why),
    approach: text(d.approach),
    impact: text(d.impact),
    activities: lines(d.activities),
    beneficiaries: lines(d.beneficiaries),
    ctaTitle: text(d.ctaTitle),
    ctaText: text(d.ctaText),
  })),
);

export async function getProgramme(slug: string) {
  return (await getProgrammes()).find((p) => p.slug === slug) ?? null;
}

/** The shape of impact-stories/stories.json: what the story list shows. */
export type StorySummary = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  beneficiaries: string;
  date: string;
  featured: boolean;
};

/** The shape of each impact-stories/<slug>.json: a story's own page. */
export type Story = {
  slug: string;
  category: string;
  title: string;
  beneficiaries: string;
  featured: boolean;
  donationProgram: string;
  summary: string;
  date: string;
  location: string;
  image: string;
  images: string[];
  challenge: string;
  response: string;
  impact: string;
  story: string[];
  /** Absent when the story has no quote; the page then shows none. */
  quote?: { text: string; author: string };
};

const getStoryDocs = cached(CMS_TAGS.stories, () => published("impact-stories"));

export async function getStories(): Promise<StorySummary[]> {
  return (await getStoryDocs()).map((d) => ({
    slug: text(d.slug),
    title: text(d.title),
    category: text(d.category),
    excerpt: text(d.excerpt),
    image: text(d.image),
    beneficiaries: text(d.beneficiaries),
    date: text(d.date),
    featured: Boolean(d.featured),
  }));
}

export async function getStory(slug: string): Promise<Story | null> {
  const d = (await getStoryDocs()).find((doc) => doc.slug === slug);

  if (!d) return null;

  const quote = (d.quote ?? {}) as { text?: unknown; author?: unknown };

  return {
    slug: text(d.slug),
    category: text(d.category),
    title: text(d.title),
    beneficiaries: text(d.beneficiaries),
    featured: Boolean(d.featured),
    donationProgram: text(d.donationProgram),
    // One field serves the list and the page; in the source they were
    // identical text held twice.
    summary: text(d.excerpt),
    date: text(d.date),
    location: text(d.location),
    image: text(d.image),
    images: lines(d.images),
    challenge: text(d.challenge),
    response: text(d.response),
    impact: text(d.impact),
    story: paras(d.story),
    ...(text(quote.text) ? { quote: { text: text(quote.text), author: text(quote.author) } } : {}),
  };
}

export type Person = { name: string; role: string; image: string; bio?: string };

/* The team cards already show a bio when one exists; they were waiting on the
   Foundation to supply them. Now an editor adds one in the CMS. */
export const getLeadership = cached(CMS_TAGS.leadership, async (): Promise<Person[]> =>
  (await published("leadership")).map((d) => ({
    name: text(d.name),
    role: text(d.position),
    image: text(d.image),
    ...(text(d.bio) ? { bio: text(d.bio) } : {}),
  })),
);

export const getVolunteerProfiles = cached(CMS_TAGS.volunteers, async (): Promise<Person[]> =>
  (await published("volunteer-profiles")).map((d) => ({
    name: text(d.name),
    role: text(d.role),
    image: text(d.image),
  })),
);

export type GalleryPhoto = { image: string; category: string; title: string };

export const getGallery = cached(CMS_TAGS.gallery, async (): Promise<GalleryPhoto[]> =>
  (await published("gallery-photos")).map((d) => ({
    image: text(d.image),
    category: text(d.category),
    title: text(d.title),
  })),
);

export type FeaturedEvent = {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
};

export const getFeaturedEvents = cached(CMS_TAGS.events, async (): Promise<FeaturedEvent[]> =>
  (await published("featured-events")).map((d) => ({
    title: text(d.title),
    description: text(d.description),
    image: text(d.image),
    category: text(d.category),
    link: text(d.link),
  })),
);

export type VideoHighlight = {
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  link: string;
};

export const getVideoHighlights = cached(CMS_TAGS.videos, async (): Promise<VideoHighlight[]> =>
  (await published("video-highlights")).map((d) => ({
    title: text(d.title),
    category: text(d.category),
    description: text(d.description),
    thumbnail: text(d.thumbnail),
    link: text(d.link),
  })),
);

export type TitledEntry = { title: string; description: string };

const titled = (collection: CollectionSlug, tag: string) =>
  cached(tag, async (): Promise<TitledEntry[]> =>
    (await published(collection)).map((d) => ({
      title: text(d.title),
      description: text(d.description),
    })),
  );

export const getVolunteerOpportunities = titled(
  "volunteer-opportunities",
  CMS_TAGS.volunteerOpportunities,
);
export const getVolunteerBenefits = titled("volunteer-benefits", CMS_TAGS.volunteerBenefits);
export const getInKindCategories = titled("in-kind-categories", CMS_TAGS.inKindCategories);

export type CampaignStory = {
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
  videoLink: string;
  featured: boolean;
};

export const getCampaigns = cached(CMS_TAGS.campaigns, async (): Promise<CampaignStory[]> =>
  (await published("campaign-stories")).map((d) => ({
    id: Number(d.id),
    name: text(d.name),
    age: Number(d.age ?? 0),
    tagline: text(d.tagline),
    headline: text(d.headline),
    heroImage: text(d.heroImage),
    gallery: lines(d.gallery),
    description: paras(d.description),
    whyStoryMattersTitle: text(d.whyStoryMattersTitle),
    whyStoryMatters: text(d.whyStoryMatters),
    needs: lines(d.needs),
    videoLink: text(d.videoLink),
    featured: Boolean(d.featured),
  })),
);

/* ── Page sections (globals) ────────────────────────────────────────────── */

export type SiteSettings = {
  foundationName: string;
  email: string;
  phone: string;
  nigeriaOffice: { address: string };
  usaOffice: { address: string };
  bank: { bankName: string; accountNumber: string; accountName: string };
  socials: { facebook: string; instagram: string; youtube: string; linkedin: string; tiktok: string };
};

export const getSiteSettings = cached(CMS_TAGS.siteSettings, async (): Promise<SiteSettings> => {
  const d = await global("site-settings");
  const bank = (d.bank ?? {}) as Doc;
  const socials = (d.socials ?? {}) as Doc;

  return {
    foundationName: text(d.foundationName),
    email: text(d.email),
    phone: text(d.phone),
    nigeriaOffice: { address: text(d.nigeriaAddress) },
    usaOffice: { address: text(d.usaAddress) },
    bank: {
      bankName: text(bank.bankName),
      accountNumber: text(bank.accountNumber),
      accountName: text(bank.accountName),
    },
    socials: {
      facebook: text(socials.facebook),
      instagram: text(socials.instagram),
      youtube: text(socials.youtube),
      linkedin: text(socials.linkedin),
      tiktok: text(socials.tiktok),
    },
  };
});

const getFoundationDoc = cached(CMS_TAGS.foundation, () => global("foundation"));

export async function getFoundation() {
  const d = await getFoundationDoc();

  return {
    badge: text(d.badge),
    title: text(d.title),
    description: text(d.description),
    vision: text(d.vision),
    mission: text(d.mission),
  };
}

export async function getFounder() {
  const f = ((await getFoundationDoc()).founder ?? {}) as Doc;

  return {
    badge: text(f.badge),
    title: text(f.title),
    name: text(f.name),
    position: text(f.position),
    organization: text(f.organization),
    image: text(f.image),
    quote: text(f.quote),
    message: paras(f.message),
  };
}

export type HeroSlide = {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

/* ── The homepage, built from blocks (CNT-01, CR-009) ───────────────────── */

/** Blocks that wrap an existing section and carry only its heading wording. */
type CopyBlockType = keyof typeof SECTION_COPY;

export type HomeBlock = { id: string } & (
  | { blockType: "hero"; slides: HeroSlide[] }
  | { blockType: "visionMission" }
  | { blockType: CopyBlockType; eyebrow: string; title: string; description: string }
  | { blockType: "richText"; content: SerializedEditorState | null }
  | {
      blockType: "imageText";
      eyebrow: string;
      title: string;
      text: string;
      image: string;
      imageAlt: string;
      imagePosition: "left" | "right";
      buttonLabel: string;
      buttonLink: string;
    }
  | { blockType: "quote"; text: string; author: string }
  | {
      blockType: "video";
      title: string;
      description: string;
      thumbnail: string;
      thumbnailAlt: string;
      link: string;
    }
);

function toBlock(b: Doc): HomeBlock | null {
  const id = text(b.id);

  switch (b.blockType) {
    case "hero":
      return {
        id,
        blockType: "hero",
        slides: ((b.slides ?? []) as Doc[]).map((slide) => ({
          image: text(slide.image),
          title: text(slide.title),
          description: text(slide.description),
          buttonText: text(slide.buttonText),
          buttonLink: text(slide.buttonLink),
        })),
      };
    case "visionMission":
      return { id, blockType: "visionMission" };
    case "richText":
      return { id, blockType: "richText", content: (b.content as SerializedEditorState) ?? null };
    case "imageText":
      return {
        id,
        blockType: "imageText",
        eyebrow: text(b.eyebrow),
        title: text(b.title),
        text: text(b.text),
        image: text(b.image),
        imageAlt: text(b.imageAlt),
        imagePosition: b.imagePosition === "right" ? "right" : "left",
        buttonLabel: text(b.buttonLabel),
        buttonLink: text(b.buttonLink),
      };
    case "quote":
      return { id, blockType: "quote", text: text(b.text), author: text(b.author) };
    case "video":
      return {
        id,
        blockType: "video",
        title: text(b.title),
        description: text(b.description),
        thumbnail: text(b.thumbnail),
        thumbnailAlt: text(b.thumbnailAlt),
        link: text(b.link),
      };
    default:
      if (typeof b.blockType === "string" && b.blockType in SECTION_COPY) {
        return {
          id,
          blockType: b.blockType as CopyBlockType,
          eyebrow: text(b.eyebrow),
          title: text(b.title),
          description: text(b.description),
        };
      }

      return null;
  }
}

/* The homepage's standard sections with their standard wording: what the
   site shows if no homepage has been published, rather than a blank page.
   Without slides the hero hides itself (PUB-06). */
function standardHomepage(): HomeBlock[] {
  return HOMEPAGE_ORDER.map((type) =>
    type === "hero" || type === "visionMission"
      ? toBlock({ id: type, blockType: type })!
      : toBlock({ id: type, blockType: type, ...SECTION_COPY[type] })!,
  );
}

/** The published homepage's sections, in the editors' order. */
export const getHomepage = cached(CMS_TAGS.pages, async (): Promise<HomeBlock[]> => {
  const payload = await payloadClient();

  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" }, _status: { equals: "published" } },
    limit: 1,
    depth: 0,
  });

  if (!docs[0]) {
    console.warn("[cms] No published homepage; showing the standard sections.");
    return standardHomepage();
  }

  return ((docs[0].blocks ?? []) as unknown as Doc[])
    .map(toBlock)
    .filter((block): block is HomeBlock => block !== null);
});

export const getApplyInfo = cached(CMS_TAGS.applyPage, async () => {
  const d = await global("apply-page");

  return {
    title: text(d.title),
    intro: text(d.intro),
    importantNotes: lines(d.importantNotes),
    requiredInformation: lines(d.requiredInformation),
  };
});

export const getDonationImpact = cached(CMS_TAGS.donatePage, async () => {
  const d = await global("donate-page");

  return {
    stats: ((d.stats ?? []) as Doc[]).map((s) => ({ number: text(s.number), label: text(s.label) })),
    causes: ((d.causes ?? []) as Doc[]).map((c) => ({
      title: text(c.title),
      description: text(c.description),
    })),
  };
});

/** Four figures for each page that shows them — the shape stats.json had. */
export type Stats = {
  homepage: {
    childrenReached: string;
    widowsSupported: string;
    educationalBeneficiaries: string;
    communitiesImpacted: string;
  };
  programs: {
    yearsOfCompassion: string;
    livesReached: string;
    outreachActivities: string;
    countriesRepresented: string;
  };
  impact: {
    widowsSupported: string;
    childrenReached: string;
    communityOutreachEvents: string;
    livesImpacted: string;
  };
  about: { yearsOfService: string };
  partnerships: { widowsSupported: string; familiesReached: string; studentsSponsored: string };
};

/* Each figure is stored once (CR-010); every page's set is built from the
   same eight, so two pages can never show different numbers for the same
   thing. The page-level names are the sections' own. */
export const getStats = cached(CMS_TAGS.statistics, async (): Promise<Stats> => {
  const d = await global("statistics-manual");
  const figure = (name: string) => text(((d[name] ?? {}) as Doc).value);

  return {
    homepage: {
      childrenReached: figure("childrenReached"),
      widowsSupported: figure("widowsSupported"),
      educationalBeneficiaries: figure("educationalBeneficiaries"),
      communitiesImpacted: figure("communitiesReached"),
    },
    programs: {
      yearsOfCompassion: figure("yearsOfService"),
      livesReached: figure("livesReached"),
      outreachActivities: figure("outreachEvents"),
      countriesRepresented: figure("countriesRepresented"),
    },
    impact: {
      widowsSupported: figure("widowsSupported"),
      childrenReached: figure("childrenReached"),
      communityOutreachEvents: figure("outreachEvents"),
      livesImpacted: figure("livesReached"),
    },
    about: { yearsOfService: figure("yearsOfService") },
    partnerships: {
      widowsSupported: figure("widowsSupported"),
      familiesReached: figure("familiesReached"),
      studentsSponsored: figure("studentsSponsored"),
    },
  };
});
