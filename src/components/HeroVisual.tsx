import React from "react";
import { motion } from "motion/react";
import netwebStudioLogo from "../assets/netweb-studio-logo2.png";
import {
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Shield,
  ArrowUpRight,
} from "lucide-react";

export const HeroVisual: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none select-none"
      id="hero-interactive-visual"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#A3FF12]/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/5 blur-[90px] pointer-events-none" />

      {/* Main Layered Luxury Browser Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="relative rounded-2xl bg-[#101410] border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(163,255,18,0.1)] overflow-hidden"
      >
        {/* Browser Top Navigation Bar */}
        <div className="px-4 py-3 bg-[#0a0d0a] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />

            <span className="ml-3 font-mono text-[11px] text-[#A7ADA5]/70 bg-[#141814] px-3 py-0.5 rounded-md border border-white/[0.05] hidden sm:inline-block">
              https://lumenor.netweb.studio
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-[#A3FF12]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
            <span>CORE_VITALS: 99</span>
          </div>
        </div>

        {/* Browser Viewport */}
        <div className="relative aspect-[16/10] overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            alt="NETWEB STUDIO Luxury Property Showcase"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
            loading="eager"
          />

          {/* Vignette & Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A08] via-transparent to-black/30 pointer-events-none" />

          {/* Floating UI Card */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3.5 rounded-xl bg-[#080A08]/90 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-[#A3FF12] uppercase tracking-wider">
                FEATURED PRODUCTION BUILD
              </span>

              <span className="text-[10px] font-mono text-[#A7ADA5]">v4.2</span>
            </div>

            <p className="font-bold text-sm text-[#F5F7F2]">
              LUMENOR RESIDENCES
            </p>

            <p className="text-[11px] text-[#A7ADA5] mt-0.5">
              Custom Headless Architectural Portal
            </p>
          </div>

          {/* Bottom Viewport Telemetry Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080A08]/90 border border-[#A3FF12]/30 backdrop-blur-md text-[11px] font-mono text-white">
              <Zap className="w-3.5 h-3.5 text-[#A3FF12]" />
              <span>0.72s FCP</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080A08]/90 border border-white/15 backdrop-blur-md text-[11px] font-mono text-white">
              <Activity className="w-3.5 h-3.5 text-[#A3FF12]" />
              <span>+340% Lead Gen</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Overlapping Mobile Smartphone Frame Preview */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.25,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="hidden sm:block absolute -bottom-8 -right-6 w-44 rounded-2xl bg-[#080A08] border-2 border-white/20 p-2 shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(163,255,18,0.15)] z-20"
      >
        <div className="w-full h-3 bg-black flex items-center justify-center mb-1">
          <div className="w-12 h-1 rounded-full bg-white/30" />
        </div>

        <div className="rounded-xl overflow-hidden aspect-[9/16] relative">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
            alt="Mobile Ergonomic Preview"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-[#080A08]/95 border border-[#A3FF12]/30 text-[9px] font-mono text-center text-white">
            <span className="text-[#A3FF12] font-bold">100% MOBILE UX</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Logo Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
        }}
        className="absolute -top-5 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-[#080A08]/95 border border-[#A3FF12]/40 backdrop-blur-md shadow-xl flex items-center gap-2.5 z-20"
      >
        {/* Official NETWEB STUDIO Logo */}
        <img
          src={netwebStudioLogo}
          alt="NETWEB STUDIO"
          className="h-5 w-auto object-contain shrink-0"
        />

        <span className="font-mono text-[10px] text-white font-bold tracking-wider">
          ENGINEERED IN REACT
        </span>
      </motion.div>
    </div>
  );
};
