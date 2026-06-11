import { PlayCircle } from "lucide-react";
import Link from "next/link";

export default function VideoHighlights() {
  const videos = [
    {
      title: "Widow Empowerment Program",
      link: "https://youtube.com",
    },
    {
      title: "Education Support Initiative",
      link: "https://youtube.com",
    },
    {
      title: "Esther Orga Story",
      link: "https://youtube.com",
    },
    {
      title: "Community Outreach Program",
      link: "https://youtube.com",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Video Highlights
          </span>

          <h2 className="text-5xl font-bold mt-4">Stories In Motion</h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Watch highlights from our outreach programs, educational initiatives
            and community impact projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <Link
              key={video.title}
              href={video.link}
              target="_blank"
              className="bg-white rounded-[24px] p-10 shadow-sm hover:shadow-lg transition text-center"
            >
              <PlayCircle size={60} className="mx-auto text-[#844204]" />

              <h3 className="font-bold text-xl mt-6">{video.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
