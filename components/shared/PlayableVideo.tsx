"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

type Props = {
  src: string;
  /** A cover picture; without one, the video's own first frame is shown. */
  poster?: string;
  /** Shown over the cover; leave empty for none. */
  title?: string;
  /** What the play button says to screen readers. */
  label: string;
  className?: string;
};

/* A video as a picture with a play button, opening the full video in a native
   dialog, closed with Escape or Close. Same behaviour as the event film
   (EventFilm), shaped as a tile for story pages (CR-021). */
export default function PlayableVideo({ src, poster = "", title = "", label, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialog.current?.showModal();
    player.current?.play().catch(() => {});
  };

  const close = () => {
    player.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={label}
        className={`group relative block w-full overflow-hidden rounded-[28px] bg-ink text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      >
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-85 transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <video
            aria-hidden
            tabIndex={-1}
            src={`${src}#t=0.1`}
            preload="metadata"
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
        )}

        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <span aria-hidden className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <span className="absolute inset-0 rounded-full border-2 border-accent-soft/70 animate-[ring-pulse_2.4s_ease-out_infinite] motion-reduce:animate-none" />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-accent text-ink shadow-xl transition-transform duration-300 group-hover:scale-105">
              <Play size={26} className="ml-1 fill-current" />
            </span>
          </span>
        </span>

        {title && (
          <span className="absolute inset-x-0 bottom-0 block p-6 font-display text-xl font-bold leading-snug text-white sm:p-8 sm:text-2xl">
            {title}
          </span>
        )}
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
          src={src}
          poster={poster || undefined}
          controls
          playsInline
          preload="metadata"
          className="max-h-[85vh] w-full rounded-2xl"
        />
      </dialog>
    </>
  );
}
