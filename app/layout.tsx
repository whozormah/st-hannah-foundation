import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* The font files live in the repository rather than being fetched from Google
   at build time. next/font/google needs a network call while building, so a
   momentary problem reaching Google fails the whole deploy. These are the same
   latin variable faces, now served from our own domain: no third-party request
   for visitors either. */
const inter = localFont({
  src: "./fonts/Inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const playfair = localFont({
  src: "./fonts/PlayfairDisplay-latin.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--font-playfair",
  fallback: ["ui-serif", "Georgia", "serif"],
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
    // The font variables must live on <html>: --font-sans and --font-display
    // are declared on :root, and a custom property is substituted where it is
    // declared, so referencing variables defined on <body> would resolve to
    // nothing and silently fall back to the system stack.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
