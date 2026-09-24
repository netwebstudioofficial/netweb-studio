import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  ShoppingBag,
  Layers,
  Palette,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Bot,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export const ServiceCard = ({ service }) => {
  const getIcon = (name) => {
    switch (name) {
      case "Layout":
        return <Layout className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "RefreshCw":
        return <RefreshCw className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Bot":
        return <Bot className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <Link
      to={`/services#${service.id}`}
      className="group flex flex-col rounded-2xl bg-[#121612] border border-white/[0.08] hover:border-[#A3FF12]/50 hover:bg-[#151a15] transition-colors duration-200 relative overflow-hidden h-full"
      id={`service-card-${service.id}`}
    >
      {/* Subtle top indicator line */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#A3FF12] group-hover:w-full transition-all duration-300 z-20" />

      {/* Visual Image Preview Banner with Browser/App Mockup Header */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#0A0D0A] border-b border-white/[0.08]">
        {/* Mockup browser top-bar */}
        <div className="absolute top-0 inset-x-0 h-6 bg-[#080A08]/85 backdrop-blur-md border-b border-white/[0.06] z-10 flex items-center px-3 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="ml-2 font-mono text-[9px] text-[#A7ADA5]/60 truncate">
            netweb.studio/{service.id}
          </div>
        </div>

        {/* High-res Image Preview */}
        <img
          src={service.image}
          alt={`${service.title} interface preview`}
          className="w-full h-full object-cover object-center brightness-[0.88] group-hover:brightness-100 transition-all duration-300"
          loading="lazy"
        />

        {/* Gradient Overlay for high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121612] via-transparent to-black/30 pointer-events-none" />

        {/* Float number and category badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
          <span className="font-mono text-xs font-semibold text-[#A3FF12] px-2.5 py-0.5 rounded bg-[#080A08]/90 border border-[#A3FF12]/30 backdrop-blur-sm">
            {service.number}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#080A08]/90 border border-white/10 flex items-center justify-center text-[#A7ADA5] group-hover:text-[#080A08] group-hover:bg-[#A3FF12] group-hover:border-[#A3FF12] transition-colors duration-200">
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Service Title */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-7 h-7 rounded-md bg-[#181e18] border border-white/[0.08] flex items-center justify-center text-[#A3FF12] shrink-0">
              {getIcon(service.icon)}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5F7F2] tracking-tight group-hover:text-white transition-colors">
              {service.title}
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#A7ADA5] leading-relaxed mb-5 font-normal">
            {service.shortDesc}
          </p>
        </div>

        {/* Deliverable and Tech Stack tags */}
        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          {service.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10.5px] font-mono text-[#A7ADA5] px-2 py-0.5 rounded bg-[#0A0D0A] border border-white/[0.06] group-hover:border-[#A3FF12]/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
