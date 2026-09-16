import { AsyncLocalStorage } from "node:async_hooks";

import { unstable_cache } from "next/cache";
import { getPayload, type CollectionSlug, type GlobalSlug } from "payload";

import config from "@payload-config";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { CMS_TAGS } from "./cms-tags";
import { isPreviewing } from "./preview";
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

/* While a content editor previews (lib/preview.ts), reads return the latest
   drafts, straight from the database and never cached, so a draft can
   neither be shown to a visitor nor linger in the cache. */
const previewing = new AsyncLocalStorage<boolean>();
const inPreview = () => previewing.getStore() === true;

async function payloadClient() {
  return getPayload({ config });
}

/** Published documents of a collection, in the editors' chosen order. */
async function published(collection: CollectionSlug): Promise<Doc[]> {
  const payload = await payloadClient();

  const { docs } = await payload.find({
    collection,
    ...(inPreview() ? { draft: true } : { where: { _status: { equals: "published" } } }),
    sort: "order",
    limit: 500,
    // One level deep, so an image arrives as its media library record.
    depth: 1,
  });

  return docs as unknown as Doc[];
}

async function global(slug: GlobalSlug): Promise<Doc> {
  const payload = await payloadClient();

  return (await payload.findGlobal({ slug, depth: 1 })) as unknown as Doc;
}

/* The database returns null for an empty field; the old files had "" and [].
   Components were written against the files, so the files' shape is kept. */
const text = (value: unknown) => (typeof value === "string" ? value : "");
const lines = (value: unknown) => (Array.isArray(value) ? (value as string[]) : []);
const paras = (value: unknown) =>
  Array.isArray(value) ? (value as { text: string }[]).map((p) => p.text) : [];

/* An image field arrives as its media library record (MIG-08). Components
   take a path, as they took one from the files, so the record's address is
   passed on — made relative when it is this site's own, so Next optimises it
   like any local image. Its description is read separately where a section
   shows it. */
const siteOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "").origin;
  } catch {
    return "";
  }
})();

const src = (value: unknown) => {
  const url = (value as { url?: unknown } | null)?.url;

  if (typeof url !== "string") return "";

  return siteOrigin && url.startsWith(siteOrigin) ? url.slice(siteOrigin.length) : url;
};
const srcs = (value: unknown) => (Array.isArray(value) ? value.map(src).filter(Boolean) : []);
const altOf = (value: unknown) => text((value as { alt?: unknown } | null)?.alt);

/* Publishing refreshes a read at once, through its tag. The hour is a safety
   net for changes made outside the website — the content migration, a
   backup restore — which cannot reach its cache: such a change shows within
   the hour even if nobody restarts the site. The cache lives on disk and
   outlives restarts and rebuilds, and it is keyed on the function's source,
   so a read whose code did not change keeps its old entry. */
const cached = <T>(tag: string, read: () => Promise<T>) => {
  const live = unstable_cache(read, [tag], { tags: [tag], revalidate: 3600 });

  return async (): Promise<T> => ((await isPreviewing()) ? previewing.run(true, read) : live());
};

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
  id: number;
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
    id: Number(d.id),
    slug: text(d.slug),
    title: text(d.title),
    icon: text(d.icon),
    heroImage: src(d.heroImage),
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
  /** The name of the programme the story came out of; empty if none. */
  programme: string;
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
export type StoryFigure = { value: string; label: string };
export type StoryVideo = { src: string; poster: string; title: string };
/** A testimony that may be shown: consent is checked before it gets here (CR-021). */
export type Testimony = { quote: string; video: string; photo: Picture | null; name: string; about: string };

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
  /** The same photographs as images, each with its description. */
  gallery: Picture[];
  challenge: string;
  response: string;
  impact: string;
  story: string[];
  /** Absent when the story has no quote; the page then shows none. */
  quote?: { text: string; author: string };
  programme: { title: string; slug: string } | null;
  stats: StoryFigure[];
  supportingImages: Picture[];
  videos: StoryVideo[];
  testimonies: Testimony[];
};

const getStoryDocs = cached(CMS_TAGS.stories, () => published("impact-stories"));

export async function getStories(): Promise<StorySummary[]> {
  // The programme's name is looked up by id from the programmes themselves,
  // so renaming a programme shows on every story card at once, and a story
  // whose programme is unpublished simply shows no programme.
  const [docs, programmes] = await Promise.all([getStoryDocs(), getProgrammes()]);
  const names = new Map(programmes.map((p) => [p.id, p.title]));

  return docs.map((d) => ({
    programme:
      names.get(Number(d.programme && typeof d.programme === "object" ? (d.programme as Doc).id : d.programme)) ?? "",
    slug: text(d.slug),
    title: text(d.title),
    category: text(d.category),
    excerpt: text(d.excerpt),
    image: src(d.image),
    beneficiaries: text(d.beneficiaries),
    date: text(d.date),
    featured: Boolean(d.featured),
  }));
}

export async function getStory(slug: string): Promise<Story | null> {
  const [docs, programmes] = await Promise.all([getStoryDocs(), getProgrammes()]);
  const d = docs.find((doc) => doc.slug === slug);

  if (!d) return null;

  const quote = (d.quote ?? {}) as { text?: unknown; author?: unknown };
  const programmeId = Number(
    d.programme && typeof d.programme === "object" ? (d.programme as Doc).id : d.programme,
  );
  const programme = programmes.find((p) => p.id === programmeId);
  const pictures = (value: unknown) =>
    Array.isArray(value) ? value.map(picture).filter((p): p is Picture => p !== null) : [];

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
    image: src(d.image),
    images: srcs(d.images),
    gallery: pictures(d.images),
    challenge: text(d.challenge),
    response: text(d.response),
    impact: text(d.impact),
    story: paras(d.story),
    ...(text(quote.text) ? { quote: { text: text(quote.text), author: text(quote.author) } } : {}),
    programme: programme ? { title: programme.title, slug: programme.slug } : null,
    stats: ((d.stats ?? []) as Doc[])
      .map((s) => ({ value: text(s.value), label: text(s.label) }))
      .filter((s) => s.value && s.label),
    supportingImages: pictures(d.supportingImages),
    videos: ((d.videos ?? []) as Doc[])
      .map((v) => ({ src: src(v.video), poster: src(v.poster), title: text(v.title) }))
      .filter((v) => v.src),
    // Consent is checked here, on the server: a testimony without it never
    // reaches the page, nor the data sent along with the page (CR-021).
    testimonies: ((d.testimonies ?? []) as Doc[])
      .filter((t) => t.consentConfirmed === true && (text(t.quote).trim() || src(t.video)))
      .map((t) => ({
        quote: text(t.quote),
        video: src(t.video),
        photo: picture(t.photo),
        name: t.attribution === "named" ? text(t.name) : "",
        about: text(t.about),
      })),
  };
}

export type Person = { name: string; role: string; image: string; bio?: string };

/* The team cards already show a bio when one exists; they were waiting on the
   Foundation to supply them. Now an editor adds one in the CMS. */
export const getLeadership = cached(CMS_TAGS.leadership, async (): Promise<Person[]> =>
  (await published("leadership")).map((d) => ({
    name: text(d.name),
    role: text(d.position),
    image: src(d.image),
    ...(text(d.bio) ? { bio: text(d.bio) } : {}),
  })),
);

export const getVolunteerProfiles = cached(CMS_TAGS.volunteers, async (): Promise<Person[]> =>
  (await published("volunteer-profiles")).map((d) => ({
    name: text(d.name),
    role: text(d.role),
    image: src(d.image),
  })),
);

export type GalleryPhoto = { image: string; category: string; title: string };

export const getGallery = cached(CMS_TAGS.gallery, async (): Promise<GalleryPhoto[]> =>
  (await published("gallery-photos")).map((d) => ({
    image: src(d.image),
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
    image: src(d.image),
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
    thumbnail: src(d.thumbnail),
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
  /** The story's own video file, shown in place of the main picture. */
  video: string;
  featured: boolean;
};

export const getCampaigns = cached(CMS_TAGS.campaigns, async (): Promise<CampaignStory[]> =>
  (await published("campaign-stories")).map((d) => ({
    id: Number(d.id),
    name: text(d.name),
    age: Number(d.age ?? 0),
    tagline: text(d.tagline),
    headline: text(d.headline),
    heroImage: src(d.heroImage),
    gallery: srcs(d.gallery),
    description: paras(d.description),
    whyStoryMattersTitle: text(d.whyStoryMattersTitle),
    whyStoryMatters: text(d.whyStoryMatters),
    needs: lines(d.needs),
    videoLink: text(d.videoLink),
    video: src(d.video),
    featured: Boolean(d.featured),
  })),
);

/* ── Events (CR-013) ────────────────────────────────────────────────────── */

export type Picture = { src: string; alt: string };

export type EventDetails = {
  id: number;
  title: string;
  /** The event's day, as YYYY-MM-DD in Lagos. */
  day: string;
  time: string;
  venue: string;
  summary: string;
  poster: Picture | null;
  loop: string;
  film: string;
  filmLabel: string;
  mediaCaption: string;
  flyer: string;
  recap: { thankYou: string; photos: Picture[] };
};

const picture = (value: unknown): Picture | null => (src(value) ? { src: src(value), alt: altOf(value) } : null);

/** A date as the calendar day it falls on in Lagos, YYYY-MM-DD. */
export const lagosDay = (value: Date | string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date(value));

const getEventDocs = cached(CMS_TAGS.appeals, async (): Promise<Doc[]> => {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "events",
    ...(inPreview() ? { draft: true } : { where: { _status: { equals: "published" } } }),
    sort: "date",
    limit: 100,
    depth: 1,
  });

  return docs as unknown as Doc[];
});

export async function getEvent(id: number): Promise<EventDetails | null> {
  const d = (await getEventDocs()).find((doc) => Number(doc.id) === id);

  if (!d || typeof d.date !== "string") return null;

  const recap = (d.recap ?? {}) as Doc;

  return {
    id,
    title: text(d.title),
    day: lagosDay(d.date),
    time: text(d.time),
    venue: text(d.venue),
    summary: text(d.summary),
    poster: picture(d.poster),
    loop: src(d.loop),
    film: src(d.film),
    filmLabel: text(d.filmLabel) || "Watch the video",
    mediaCaption: text(d.mediaCaption),
    flyer: src(d.flyer),
    recap: {
      thankYou: text(recap.thankYou),
      photos: (Array.isArray(recap.photos) ? recap.photos : []).map(picture).filter((p): p is Picture => p !== null),
    },
  };
}

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
    image: src(f.image),
    quote: text(f.quote),
    message: paras(f.message),
  };
}

export type HeroSlide = {
  eyebrow: string;
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
  | { blockType: "eventAppeal"; event: number | null }
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
          eyebrow: text(slide.eyebrow),
          image: src(slide.image),
          title: text(slide.title),
          description: text(slide.description),
          buttonText: text(slide.buttonText),
          buttonLink: text(slide.buttonLink),
        })),
      };
    case "visionMission":
      return { id, blockType: "visionMission" };
    case "eventAppeal": {
      const event = b.event && typeof b.event === "object" ? (b.event as Doc).id : b.event;

      return { id, blockType: "eventAppeal", event: typeof event === "number" ? event : Number(event) || null };
    }
    case "richText":
      return { id, blockType: "richText", content: (b.content as SerializedEditorState) ?? null };
    case "imageText":
      return {
        id,
        blockType: "imageText",
        eyebrow: text(b.eyebrow),
        title: text(b.title),
        text: text(b.text),
        image: src(b.image),
        imageAlt: altOf(b.image),
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
        thumbnail: src(b.thumbnail),
        thumbnailAlt: altOf(b.thumbnail),
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
    where: { slug: { equals: "home" }, ...(inPreview() ? {} : { _status: { equals: "published" } }) },
    draft: inPreview(),
    limit: 1,
    depth: 1,
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
