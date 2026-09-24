import React from "react";

export const SectionTitle = ({
  tag,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  if (align === "split") {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 md:mb-16 ${className}`}>
        <div className="lg:col-span-7">
          {tag && (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 text-[#A3FF12] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-pulse" />
              {tag}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F7F2] tracking-tight leading-[1.1] uppercase">
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-base sm:text-lg text-[#A7ADA5] leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} ${className}`}>
      {tag && (
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 text-[#A3FF12] text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12]" />
          {tag}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F7F2] tracking-tight leading-[1.1] uppercase mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#A7ADA5] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
