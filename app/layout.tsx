import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sthannahfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "St. Hannah Foundation | Restoring Hope, Empowering Lives",
    template: "%s | St. Hannah Foundation",
  },
  description:
    "St. Hannah Foundation restores hope, empowers lives and transforms communities through education support, widow empowerment, medical aid, family support and community outreach across Nigeria.",
  applicationName: "St. Hannah Foundation",
  keywords: [
    "St. Hannah Foundation",
    "charity Nigeria",
    "widow empowerment",
    "education support",
    "medical aid",
    "family support",
    "community outreach",
    "donate Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "St. Hannah Foundation",
    url: siteUrl,
    title: "St. Hannah Foundation | Restoring Hope, Empowering Lives",
    description:
      "Restoring hope, empowering lives and transforming communities through education, empowerment, medical aid and family support.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Hannah Foundation | Restoring Hope, Empowering Lives",
    description:
      "Restoring hope, empowering lives and transforming communities across Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
