/* The rising-sun mark beside section labels: five rays over a horizon, drawn
   in the current text colour. Decoration only. */
export default function Rays({ className = "h-5 w-8 text-accent" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 24" className={className}>
      {[-60, -30, 0, 30, 60].map((angle) => (
        <line
          key={angle}
          x1="20"
          y1="22"
          x2="20"
          y2="6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${angle} 20 22)`}
        />
      ))}
    </svg>
  );
}
