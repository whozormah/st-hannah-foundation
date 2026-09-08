import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs and videos from our outreaches, empowerment programmes and community work across Nigeria.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | St. Hannah Foundation",
    description:
      "Photographs and videos from our outreaches, empowerment programmes and community work across Nigeria.",
    url: "/gallery",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
