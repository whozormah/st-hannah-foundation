"use client";

interface GalleryFiltersProps {
  categories: { name: string; count: number }[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function GalleryFilters({
  categories,
  activeCategory,
  onSelect,
}: GalleryFiltersProps) {
  return (
    // Sticky: with 31 photographs you should be able to change programme area
    // without scrolling back to the top. Offset clears the site header.
    <div className="sticky top-16 z-30 -mx-6 mb-8 border-b border-accent/15 bg-white/85 px-6 py-4 backdrop-blur-xl md:top-20">
      <div
        role="group"
        aria-label="Filter photographs by programme area"
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {categories.map((category) => {
          const active = activeCategory === category.name;

          return (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              aria-pressed={active}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active
                  ? "bg-ink text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-ink hover:text-ink"
              }`}
            >
              {category.name}

              <span
                className={`ml-2 tabular-nums ${
                  active ? "text-white/60" : "text-gray-400"
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
