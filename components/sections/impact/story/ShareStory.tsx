"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const noSubscribe = () => () => {};

/* Share the story: the device's own share sheet where there is one, plus
   WhatsApp, Facebook, X and a copy of the link. Plain links, no scripts from
   those services (CR-021). */
export default function ShareStory({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  // Only the browser knows whether it can share; the server renders without.
  const canShare = useSyncExternalStore(
    noSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );

  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);
  const pill =
    "inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 border-t border-accent/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold uppercase tracking-[4px] text-brand">Share This Story</p>

      <div className="flex flex-wrap gap-3">
        {canShare && (
          <button type="button" className={pill} onClick={() => navigator.share({ title, url }).catch(() => {})}>
            <Share2 aria-hidden size={16} />
            Share
          </button>
        )}
        <a className={pill} href={`https://wa.me/?text=${text}%20${link}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a
          className={pill}
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a className={pill} href={`https://x.com/intent/post?text=${text}&url=${link}`} target="_blank" rel="noopener noreferrer">
          X
        </a>
        <button type="button" className={pill} onClick={copy}>
          {copied ? <Check aria-hidden size={16} /> : <Link2 aria-hidden size={16} />}
          {copied ? "Link copied" : "Copy link"}
        </button>
      </div>

      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
