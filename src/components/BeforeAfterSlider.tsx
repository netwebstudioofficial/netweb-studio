import React, { useState, useRef } from "react";
import { Check, X, MoveHorizontal, Zap, Smartphone, MousePointer, ShieldAlert, Sparkles } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full" id="before-after-comparison">
      {/* Interactive Visual Comparison Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-white/[0.12] select-none bg-[#0a0d0a] shadow-2xl cursor-ew-resize mb-10"
      >
        {/* AFTER (Right/Background: NETWEB Studio Modern Build) */}
        <div className="absolute inset-0 bg-[#080A08] p-6 sm:p-10 flex flex-col justify-between">
          <div className="max-w-md ml-auto text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#A3FF12] text-[#080A08] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3" />
              AFTER: NETWEB STUDIO
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F2] mb-2 font-['Space_Grotesk']">
              Engineered to Convert
            </h3>
            <p className="text-xs sm:text-sm text-[#A7ADA5] mb-4">
              Sub-second loading, high-contrast typography, frictionless mobile booking, and 99+ Lighthouse performance.
            </p>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A3FF12] bg-[#141814] px-3 py-1 rounded border border-[#A3FF12]/30">
                <span>0.78s First Contentful Paint</span>
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5F7F2] bg-[#141814] px-3 py-1 rounded border border-white/10">
                <span>Instant Mobile Reservations</span>
                <Smartphone className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#101310] border border-[#A3FF12]/20 max-w-sm ml-auto text-right">
            <p className="text-xs font-bold text-[#A3FF12] uppercase font-mono">Real Business Outcome</p>
            <p className="text-xs text-[#A7ADA5] mt-1">+340% increase in direct Telegram & booking leads within 30 days.</p>
          </div>
        </div>

        {/* BEFORE (Left/Foreground: Outdated Legacy Website clipped by slider) */}
        <div
          className="absolute inset-0 bg-[#1e201e] p-6 sm:p-10 flex flex-col justify-between overflow-hidden border-r border-[#A3FF12]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="min-w-[320px] max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/80 text-red-400 border border-red-800/40 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3 h-3" />
              BEFORE: TYPICAL OUTDATED SITE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F2]/60 mb-2 font-['Space_Grotesk'] line-through">
              Generic & Sluggish
            </h3>
            <p className="text-xs sm:text-sm text-[#A7ADA5]/80 mb-4">
              Bloated generic templates, slow 5.8s load times, broken mobile layout, and zero clear conversion path.
            </p>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-black/40 px-3 py-1 rounded border border-red-900/40">
                <span>5.8s Sluggish Load Time</span>
                <X className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A7ADA5] bg-black/40 px-3 py-1 rounded border border-white/5">
                <span>Broken Horizontal Overflow</span>
                <X className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="min-w-[320px] p-4 rounded-lg bg-black/40 border border-white/5 max-w-sm">
            <p className="text-xs font-bold text-red-400/90 uppercase font-mono">The Consequence</p>
            <p className="text-xs text-[#A7ADA5] mt-1">72% of visitors bounce immediately on mobile without ever contacting.</p>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#A3FF12] cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-[#080A08] border-2 border-[#A3FF12] text-[#A3FF12] flex items-center justify-center shadow-[0_0_15px_rgba(163,255,18,0.5)] -ml-[1px]">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Drag Hint */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#080A08]/90 border border-white/10 text-[11px] text-[#A7ADA5] font-mono pointer-events-none flex items-center gap-1.5 z-10">
          <MousePointer className="w-3 h-3 text-[#A3FF12]" />
          <span>DRAG SLIDER TO COMPARE</span>
        </div>
      </div>

      {/* Feature-by-Feature Direct Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE BOX */}
        <div className="p-6 rounded-xl bg-[#101310] border border-red-900/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
              Typical Template Website
            </span>
            <span className="text-xs text-[#A7ADA5] font-mono">BEFORE</span>
          </div>
          <ul className="space-y-3 text-sm text-[#A7ADA5]">
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-red-400 shrink-0" />
              <span><strong>Outdated Aesthetic:</strong> Cookie-cutter templates that look identical to competitors.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-red-400 shrink-0" />
              <span><strong>Slow & Bloated:</strong> Uncompressed images, heavy scripts, and 4s+ mobile load times.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-red-400 shrink-0" />
              <span><strong>Hard to Navigate:</strong> Buried contact details, confusing menus, and fragmented links.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-red-400 shrink-0" />
              <span><strong>Weak CTAs:</strong> Generic "Submit" buttons with low conversion and no lead follow-up.</span>
            </li>
          </ul>
        </div>

        {/* AFTER BOX */}
        <div className="p-6 rounded-xl bg-[#141814] border border-[#A3FF12]/30 space-y-4 shadow-[0_0_20px_rgba(163,255,18,0.05)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="font-mono text-xs text-[#A3FF12] font-bold uppercase tracking-wider">
              NETWEB STUDIO Bespoke Build
            </span>
            <span className="text-xs text-[#A3FF12] font-mono font-bold">AFTER</span>
          </div>
          <ul className="space-y-3 text-sm text-[#F5F7F2]">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#A3FF12] shrink-0" />
              <span><strong>Modern & Distinctive:</strong> Sharp custom UI that positions you as the definitive leader.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#A3FF12] shrink-0" />
              <span><strong>Sub-Second Speed:</strong> Vite + React architecture loading in under 1 second worldwide.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#A3FF12] shrink-0" />
              <span><strong>Flawlessly Mobile-First:</strong> Zero horizontal overflow with 44px+ touch targets.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#A3FF12] shrink-0" />
              <span><strong>High Conversion:</strong> Direct Telegram routing, clear booking triggers, and measurable ROI.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
