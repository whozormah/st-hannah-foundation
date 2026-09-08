import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation Successful",
  description:
    "Thank you for supporting St. Hannah Foundation.",
  alternates: { canonical: "/donate/success" },
  robots: { index: false, follow: false },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
