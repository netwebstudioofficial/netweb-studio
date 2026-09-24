import React from "react";
import { ArrowUpRight } from "lucide-react";

export const PortfolioCard = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative rounded-xl overflow-hidden bg-[#141814] border border-white/[0.08] hover:border-[#A3FF12]/40 transition-all duration-300 cursor-pointer flex flex-col h-full hover:shadow-[0_0_25px_rgba(163,255,18,0.12)]"
      id={`project-card-${project.id}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0d0a]">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141814] via-[#141814]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#080A08]/80 backdrop-blur-md text-[#A3FF12] border border-[#A3FF12]/30">
            {project.number}
          </span>
          <span className="font-mono text-[10px] font-semibold px-2 py-1 rounded bg-[#080A08]/80 backdrop-blur-md text-[#F5F7F2] border border-white/10 uppercase">
            {project.category}
          </span>
        </div>

        {/* Hover Arrow Overlay */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#080A08]/90 border border-white/20 text-[#F5F7F2] flex items-center justify-center group-hover:bg-[#A3FF12] group-hover:text-[#080A08] group-hover:border-[#A3FF12] transition-all duration-200 shadow-lg">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-xl font-extrabold text-[#F5F7F2] group-hover:text-white transition-colors">
              {project.name}
            </h3>
            <span className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider">
              {project.clientType}
            </span>
          </div>

          <p className="text-xs font-semibold text-[#A3FF12] mb-3 uppercase tracking-wider">
            {project.tagline}
          </p>

          <p className="text-sm text-[#A7ADA5] leading-relaxed mb-6 font-normal line-clamp-2">
            {project.shortDesc}
          </p>
        </div>

        {/* Tech Tags & CTA */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techTags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101310] text-[#A7ADA5] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-xs font-bold text-[#A3FF12] flex items-center gap-1 group-hover:underline">
            View Project
          </span>
        </div>
      </div>
    </div>
  );
};
