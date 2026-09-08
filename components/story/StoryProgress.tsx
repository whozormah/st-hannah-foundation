interface StoryProgressProps {
  current: number;
  total: number;
}

export default function StoryProgress({ current, total }: StoryProgressProps) {
  return (
    <div className="mb-16">
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-500">
        <span>Story Progress</span>

        <span>
          {current + 1} of {total}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#E9E3DA]">
        <div
          className="h-full rounded-full bg-brand transition-all duration-700"
          style={{
            width: `${((current + 1) / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
