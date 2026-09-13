import PageHeader from "@/components/shared/PageHeader";
import GalleryExplorer from "@/components/sections/gallery/GalleryExplorer";
import FeaturedEvents from "@/components/sections/gallery/FeaturedEvents";
import VideoHighlights from "@/components/sections/gallery/VideoHighlights";
import GalleryCTA from "@/components/sections/gallery/GalleryCTA";

import { getGallery } from "@/lib/cms";

export default async function GalleryPage() {
  const photographs = await getGallery();

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Moments of hope, compassion and transformation captured through the work of St. Hannah Foundation."
        image="/gallery/gallery1.jpeg"
      />

      <GalleryExplorer items={photographs} />

      <FeaturedEvents />

      <VideoHighlights />

      <GalleryCTA />
    </>
  );
}
