import { CalendarDays, Users } from "lucide-react";

/* What tells a story apart from a programme (CR-020): when it happened, how
   many it reached, and the programme it came out of. Each part shows only
   when the story has it; nothing is filled in. */

function ProgrammeName({ title }: { title: string }) {
  // "Widows Support Program" already says so; don't add "programme" again.
  const named = /\bprogram(me)?$/i.test(title.trim());

  return (
    <>
      <span className="font-semibold">{title}</span>
      {named ? "" : " programme"}
    </>
  );
}

export default function StoryContext({
  date = "",
  beneficiaries = "",
  programme = "",
  onDark = false,
  className = "",
}: {
  date?: string;
  beneficiaries?: string;
  programme?: string;
  onDark?: boolean;
  className?: string;
}) {
  const facts = Boolean(date || beneficiaries);

  if (!facts && !programme) return null;

  const muted = onDark ? "text-white/70" : "text-gray-500";
  const icon = onDark ? "text-accent-soft/80" : "text-brand/60";

  return (
    <span className={`block text-sm leading-6 ${className}`}>
      {facts && (
        <span className={`flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums ${muted}`}>
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden size={14} className={icon} />
              {date}
            </span>
          )}

          {beneficiaries && (
            <span className="inline-flex items-center gap-1.5">
              <Users aria-hidden size={14} className={icon} />
              {beneficiaries} reached
            </span>
          )}
        </span>
      )}

      {programme && (
        <span className={`block ${facts ? "mt-1.5" : ""} ${onDark ? "text-accent-soft" : "text-brand"}`}>
          <span className={muted}>Part of our </span>
          <ProgrammeName title={programme} />
        </span>
      )}
    </span>
  );
}
