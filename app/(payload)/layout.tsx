/* The admin's root layout. The website has its own, in (frontend); the two
   are separate so neither wraps the other (see docs/phase-4-verification.md). */
import type { ServerFunctionClient } from "payload";
import localFont from "next/font/local";

import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";
// After Payload's own stylesheet, so the brand overrides win.
import "./custom.css";

import { importMap } from "./admin/importMap";

/* The site's display face, from the same self-hosted file the website uses,
   for the sign-in screen's headings. No request to a font host. */
const playfair = localFont({
  src: "../fonts/PlayfairDisplay-latin.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--shf-display",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ className: playfair.variable }}
    >
      {children}
    </RootLayout>
  );
}
