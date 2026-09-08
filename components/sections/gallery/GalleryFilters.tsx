"use client";

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function GalleryFilters({
  categories,
  activeCategory,
  onSelect,
}: GalleryFiltersProps) {
  return (
    <div className="mb-16 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
            activeCategory === category
              ? "bg-brand text-white shadow-xl"
              : "border border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
