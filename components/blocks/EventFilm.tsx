"use client";

import { useRef } from "react";
import { Play, X } from "lucide-react";

type Props = { film: string; poster: string; label: string };

/* A round play button with a slow pulse, opening the full video in a native
   dialog: keyboard and screen-reader friendly, closed with Escape. The video
   is the Foundation's own file, not embedded from a video site (CR-013). */
export default function EventFilm({ film, poster, label }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  const close = () => {
    player.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="group inline-flex items-center gap-4 text-left font-semibold text-white"
      >
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-accent-soft/70 animate-[ring-pulse_2.4s_ease-out_infinite] motion-reduce:animate-none"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink shadow-xl transition-transform duration-300 group-hover:scale-105">
            <Play aria-hidden size={24} className="ml-1 fill-current" />
          </span>
        </span>
        <span className="text-lg leading-snug underline decoration-white/0 underline-offset-4 transition group-hover:decoration-white/60">
          {label}
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={label}
        onClose={() => player.current?.pause()}
        onClick={(event) => event.target === dialog.current && close()}
        className="m-auto w-[min(92vw,1040px)] overflow-visible rounded-2xl bg-black p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={close}
          className="absolute -top-12 right-0 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink"
        >
          <X aria-hidden size={16} />
          Close
        </button>
        <video
          ref={player}
          src={film}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-2xl"
        />
      </dialog>
    </>
  );
}
