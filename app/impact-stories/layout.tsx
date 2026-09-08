import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Stories",
  description:
    "Real stories of lives changed through widow empowerment, education support, medical aid and family assistance.",
  alternates: { canonical: "/impact-stories" },
  openGraph: {
    title: "Impact Stories | St. Hannah Foundation",
    description:
      "Real stories of lives changed through widow empowerment, education support, medical aid and family assistance.",
    url: "/impact-stories",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
