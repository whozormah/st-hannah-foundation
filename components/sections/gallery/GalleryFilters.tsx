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
    <div
      role="group"
      aria-label="Filter photographs by programme area"
      className="flex flex-wrap gap-3"
    >
      {categories.map((category) => {
        const active = activeCategory === category.name;

        return (
          <button
            key={category.name}
            onClick={() => onSelect(category.name)}
            aria-pressed={active}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-brand text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
            }`}
          >
            {category.name}

            {/* The count tells people what is behind a filter before they use it. */}
            <span
              className={`ml-2 ${active ? "text-white/70" : "text-gray-400"}`}
            >
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
