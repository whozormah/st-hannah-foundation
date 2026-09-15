"use client";

import { useEffect, useState } from "react";

type Props = {
  /** The moment counted down to, with its Lagos offset. */
  target: string;
  /** The server's reading at render, so the first paint matches. */
  initialRemaining: number;
  /** Whole calendar days to the event, for screen readers. */
  days: number;
  dayLabel: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

/* A live countdown: days, hours, minutes and seconds, ticking every second.
   Screen readers get one quiet sentence instead of an announcement every
   second; each changing digit slides in, unless the visitor has asked for
   less motion. At zero it says the event is happening today. */
export default function EventCountdown({ target, initialRemaining, days, dayLabel }: Props) {
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    const end = Date.parse(target);
    const tick = () => setRemaining(Math.max(0, end - Date.now()));

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  if (remaining <= 0) {
    return (
      <p className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-5 py-2.5 font-semibold text-ink">
        <span aria-hidden className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink" />
        </span>
        Happening today
      </p>
    );
  }

  const seconds = Math.floor(remaining / 1000);
  const units: [string, number][] = [
    ["Days", Math.floor(seconds / 86_400)],
    ["Hours", Math.floor(seconds / 3600) % 24],
    ["Minutes", Math.floor(seconds / 60) % 60],
    ["Seconds", seconds % 60],
  ];

  return (
    <div className="mt-10" data-countdown-to={target}>
      <p className="sr-only">
        {days === 1 ? "1 day to go" : `${days} days to go`} until {dayLabel}
      </p>

      <div
        aria-hidden
        className="grid max-w-xl grid-cols-4 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md"
      >
        {units.map(([label, value], index) => (
          <div key={label} className={`px-1 py-4 text-center sm:py-6 ${index ? "border-l border-white/10" : ""}`}>
            <span className="flex h-[1.1em] justify-center overflow-hidden font-display text-4xl font-bold leading-none text-accent-soft tabular-nums sm:text-5xl lg:text-6xl">
              {pad(value)
                .split("")
                .map((digit, position, all) => (
                  <span
                    // A new key when the digit changes, so it slides in afresh.
                    key={`${position}-${digit}-${all.length}`}
                    className="inline-block animate-[digit-in_420ms_cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:animate-none"
                  >
                    {digit}
                  </span>
                ))}
            </span>
            <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[3px] text-white/60 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
