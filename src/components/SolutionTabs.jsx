import React, { useState } from "react";
import { businessSolutionsData } from "../data/agencyData";
import { Button } from "./Button";
import { Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const SolutionTabs = () => {
  const [activeCategory, setActiveCategory] = useState("restaurant");

  const currentSolution =
    businessSolutionsData.find((item) => item.id === activeCategory) || businessSolutionsData[0];

  return (
    <div className="w-full" id="business-solutions-container">
      {/* Category Selection Tabs Bar - Compact & Horizontally Scrollable on Mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar border-b border-white/[0.08] mb-5 sm:mb-6">
        {businessSolutionsData.map((item) => {
          const isSelected = item.id === activeCategory;
          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12] ${
                isSelected
                  ? "bg-[#141814] text-[#A3FF12] border border-[#A3FF12]/40 shadow-[0_0_12px_rgba(163,255,18,0.1)]"
                  : "bg-transparent text-[#A7ADA5] hover:text-[#F5F7F2] hover:bg-white/5 border border-transparent"
              }`}
              id={`solution-tab-${item.id}`}
            >
              {item.category}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Card - Refined proportions, compact padding & responsive architecture */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSolution.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="bg-[#101310] border border-white/[0.08] rounded-xl sm:rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative group hover:border-[#A3FF12]/30 transition-all duration-300 shadow-xl"
        >
          {/* Subtle top lime indicator gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A3FF12]/30 to-transparent" />

          {/* Left Column: Details & Features (Tighter padding & scannable typographic scale) */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#141814] border border-[#A3FF12]/20 text-[#A3FF12] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Specialized Industry Architecture</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F7F2] mb-1.5 sm:mb-2 tracking-tight">
                {currentSolution.category} Solutions
              </h3>

              <p className="text-[#A3FF12] text-xs sm:text-sm font-medium mb-2.5 sm:mb-3">
                "{currentSolution.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#A7ADA5] leading-relaxed mb-4 sm:mb-5 font-normal">
                {currentSolution.description}
              </p>

              {/* Core Features Grid - Compact pill cards */}
              <div className="mb-5 sm:mb-6">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono mb-2 sm:mb-2.5">
                  Key Capabilities Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentSolution.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#141814] border border-white/[0.06] text-xs text-[#F5F7F2]"
                    >
                      <div className="w-3.5 h-3.5 rounded bg-[#A3FF12]/10 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#A3FF12]" />
                      </div>
                      <span className="font-medium truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metrics and Action - Responsive stack on mobile */}
            <div className="pt-4 sm:pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                {currentSolution.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <p className="text-base sm:text-lg lg:text-xl font-extrabold text-[#A3FF12] font-['Space_Grotesk'] leading-none">
                      {metric.value}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#A7ADA5] uppercase tracking-wider font-mono mt-1">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  to={`/contact?industry=${encodeURIComponent(currentSolution.category)}`}
                  variant="primary"
                  size="sm"
                  withArrow
                  className="w-full sm:w-auto justify-center"
                >
                  Build For {currentSolution.category}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery & Visual Atmosphere (Responsive aspect ratio to avoid stretching) */}
          <div className="lg:col-span-5 relative min-h-[200px] sm:min-h-[230px] lg:min-h-full overflow-hidden bg-[#080A08] aspect-[16/9] sm:aspect-[16/8] lg:aspect-auto">
            <img
              src={currentSolution.image}
              alt={`${currentSolution.category} digital experience mockup`}
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-[#101310]/30 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

            {/* Floating Tag */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-lg bg-[#080A08]/85 backdrop-blur-md border border-white/10 text-xs">
              <p className="font-semibold text-white text-[11px] sm:text-xs flex items-center justify-between">
                <span>{currentSolution.category} Core Outcome</span>
                <span className="text-[#A3FF12] text-[10px] uppercase font-mono tracking-wider">Engineered Spec</span>
              </p>
              <p className="text-[10.5px] sm:text-[11px] text-[#A7ADA5] mt-1 line-clamp-2">
                {currentSolution.keyOutcome}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SolutionTabs;
