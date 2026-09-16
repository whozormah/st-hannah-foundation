import Hero from "@/components/sections/Hero";
import VisionMission from "@/components/sections/VisionMission";
import AboutTestimonials from "@/components/sections/about/AboutTestimonials";
import ImpactStats from "@/components/sections/ImpactStats";
import FeaturedCampaign from "@/components/sections/FeaturedCampaign";
import Causes from "@/components/sections/Causes";
import ImpactStories from "@/components/sections/ImpactStories";
import GalleryPreview from "@/components/sections/GalleryPreview";
import LeadershipPreview from "@/components/sections/LeadershipPreview";
import HomeCTA from "@/components/sections/HomeCTA";
import EventAppeal from "@/components/blocks/EventAppeal";
import HeartOfFoundation from "@/components/blocks/HeartOfFoundation";
import ImageTextBlock from "@/components/blocks/ImageTextBlock";
import QuoteBlock from "@/components/blocks/QuoteBlock";
import RichTextBlock from "@/components/blocks/RichTextBlock";
import VideoBlock from "@/components/blocks/VideoBlock";

import { getCampaigns, getProgrammes, type HomeBlock } from "@/lib/cms";

/* Renders the homepage's sections in the order the editors set (CNT-01).
   Each block is a section the site already has, or one of the four new
   ones; how each looks is code, never content (CNT-04). */
export default async function HomeBlocks({ blocks }: { blocks: HomeBlock[] }) {
  // Two sections run in the browser, so their content is read here and
  // passed in — and only when the page has one.
  const types = new Set(blocks.map((block) => block.blockType));
  const [programmes, campaigns] = await Promise.all([
    types.has("programmeCards") ? getProgrammes() : [],
    types.has("donationCallToAction") ? getCampaigns() : [],
  ]);

  return blocks.map((block) => {
    const copy = "title" in block || "eyebrow" in block ? block : null;
    const { eyebrow, title, description } = (copy ?? {}) as {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    switch (block.blockType) {
      case "hero":
        return <Hero key={block.id} slides={block.slides} />;
      case "visionMission":
        return <VisionMission key={block.id} />;
      case "heartOfFoundation":
        return <HeartOfFoundation key={block.id} {...block} />;
      case "eventAppeal":
        return <EventAppeal key={block.id} eventId={block.event} />;
      case "programmeCards":
        return <Causes key={block.id} programs={programmes} eyebrow={eyebrow} title={title} />;
      case "galleryStrip":
        return <GalleryPreview key={block.id} eyebrow={eyebrow} title={title} description={description} />;
      case "statistics":
        return <ImpactStats key={block.id} eyebrow={eyebrow} title={title} description={description} />;
      case "donationCallToAction":
        return (
          <FeaturedCampaign
            key={block.id}
            stories={campaigns}
            eyebrow={eyebrow}
            description={description}
          />
        );
      case "storyCards":
        return <ImpactStories key={block.id} eyebrow={eyebrow} title={title} description={description} />;
      case "testimonials":
        return (
          <AboutTestimonials key={block.id} eyebrow={eyebrow} title={title} description={description} />
        );
      case "leadershipPreview":
        return (
          <LeadershipPreview key={block.id} eyebrow={eyebrow} title={title} description={description} />
        );
      case "callToAction":
        return <HomeCTA key={block.id} eyebrow={eyebrow} title={title} description={description} />;
      case "richText":
        return <RichTextBlock key={block.id} content={block.content} />;
      case "imageText":
        return <ImageTextBlock key={block.id} {...block} />;
      case "quote":
        return <QuoteBlock key={block.id} text={block.text} author={block.author} />;
      case "video":
        return <VideoBlock key={block.id} {...block} />;
    }
  });
}
