import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with St. Hannah Foundation. Office addresses in Lagos, Nigeria and Chicago, USA, plus phone, email and enquiry form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | St. Hannah Foundation",
    description:
      "Get in touch with St. Hannah Foundation. Office addresses in Lagos, Nigeria and Chicago, USA, plus phone, email and enquiry form.",
    url: "/contact",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
