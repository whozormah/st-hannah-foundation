/* Where an editor's link may point (CNT-04). A page on this site ("/donate"),
   a secure web address, an email address or a phone number. Anything else —
   "javascript:", "data:", a bare "http:" address — is refused when the block
   is saved and not rendered if it somehow gets in. */
export function isSafeLink(value: string): boolean {
  if (/^\/(?!\/)/.test(value)) return true;

  try {
    const url = new URL(value);
    return ["https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

/* A link to an actual video on YouTube or Vimeo, not a site's home page. The
   placeholder video highlights all point at "https://youtube.com", so a
   Watch button built from one would land nowhere. */
export function isPlayableVideo(link: string): boolean {
  try {
    const url = new URL(link);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      return url.searchParams.has("v") || url.pathname.startsWith("/embed/");
    }

    if (host === "youtu.be") return url.pathname.length > 1;

    if (host === "vimeo.com") return url.pathname.length > 1;

    return url.pathname.length > 1;
  } catch {
    return false;
  }
}
