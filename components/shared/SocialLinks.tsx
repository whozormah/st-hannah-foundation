import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

import type { SiteSettings } from "@/lib/cms";

/* The Foundation's social accounts as icons (CR-029). Each shows only when
   its address is set in Site Settings, so an account the Foundation does not
   have leaves no empty button. */

const PLATFORMS: { key: keyof SiteSettings["socials"]; name: string; Icon: IconType }[] = [
  { key: "facebook", name: "Facebook", Icon: FaFacebookF },
  { key: "instagram", name: "Instagram", Icon: FaInstagram },
  { key: "tiktok", name: "TikTok", Icon: FaTiktok },
  { key: "youtube", name: "YouTube", Icon: FaYoutube },
  { key: "linkedin", name: "LinkedIn", Icon: FaLinkedinIn },
];

export default function SocialLinks({
  socials,
  foundationName,
  className = "",
}: {
  socials: SiteSettings["socials"];
  foundationName: string;
  className?: string;
}) {
  const accounts = PLATFORMS.filter(({ key }) => socials?.[key]);

  if (!accounts.length) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {accounts.map(({ key, name, Icon }) => (
        <li key={key}>
          <a
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${foundationName} on ${name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon aria-hidden size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
