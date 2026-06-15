"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface VideoItem {
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  link: string;
}

export default function VideoHighlights() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    fetch("/data/video-highlights.json")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Stories In Motion{" "}
          </span>
          ```
          <h2 className="text-5xl font-bold mt-4">Experience The Impact</h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Watch stories of hope, transformation and community impact through
            the lives of the people and communities we serve.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link
              key={video.title}
              href={video.link}
              target="_blank"
              className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition group"
            >
              <div className="relative h-[260px]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle size={70} className="text-white" />
                </div>
              </div>

              <div className="p-8">
                <span className="text-[#844204] uppercase tracking-[3px] font-semibold">
                  {video.category}
                </span>

                <h3 className="text-2xl font-bold mt-3">{video.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {video.description}
                </p>

                <div className="mt-6 text-[#844204] font-semibold">
                  Watch Story →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
