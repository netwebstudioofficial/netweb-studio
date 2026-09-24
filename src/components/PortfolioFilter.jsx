import React from "react";

export const PortfolioFilter = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar mb-8" id="portfolio-filter-bar">
      {categories.map((category) => {
        const isSelected = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12] whitespace-nowrap ${
              isSelected
                ? "bg-[#A3FF12] text-[#080A08] font-bold shadow-[0_0_15px_rgba(163,255,18,0.25)]"
                : "bg-[#141814] text-[#A7ADA5] hover:text-[#F5F7F2] hover:bg-[#1a221a] border border-white/[0.06]"
            }`}
            id={`filter-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
