import Image from "next/image";
import Link from "next/link";

interface StoryGalleryProps {
  images: string[];
  galleryLink: string;
}

export default function StoryGallery({
  images,
  galleryLink,
}: StoryGalleryProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Event Gallery</h3>

        <Link
          href={galleryLink}
          className="text-[#844204] font-semibold hover:underline"
        >
          View All Photos →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, 8).map((image, index) => (
          <div
            key={index}
            className="relative h-[220px] rounded-2xl overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
