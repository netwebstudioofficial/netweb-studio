import React, { useState, useEffect } from "react";
import {
  Activity,
  Terminal,
  Shield,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Flame,
} from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";

export const AboutVisualEffects: React.FC = () => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INITIALIZING NETWEB STUDIO CORE RUNTIME...",
    "AUDIT: Core Web Vitals target set to 100/100",
    "COMPILER: TypeScript strict mode enabled (0 any types)",
    "ASSET PIPELINE: Images compressed to modern WebP/AVIF",
    "AUTONOMOUS AGENTS: RAG knowledge vectors synced",
    "DEPLOYMENT: Global Edge CDN active • 0.00ms cold start",
    "SYSTEM STATUS: Production ready • 100% Client Ownership",
  ]);

  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  const metrics = [
    {
      label: "Lighthouse Performance",
      value: "100/100",
      detail: "Clean semantic markup & zero bloat",
      color: "#A3FF12",
    },
    {
      label: "Largest Contentful Paint",
      value: "0.8s",
      detail: "Sub-second first impression loading",
      color: "#F5F7F2",
    },
    {
      label: "Cumulative Layout Shift",
      value: "0.00",
      detail: "Rock-solid visual stability",
      color: "#A3FF12",
    },
    {
      label: "Client Code Ownership",
      value: "100%",
      detail: "Zero vendor lock-in or proprietary traps",
      color: "#F5F7F2",
    },
  ];

  const technologies = [
    { name: "React", cat: "Frontend", icon: SiReact },
    { name: "JavaScript", cat: "Language", icon: SiJavascript },
    { name: "Tailwind CSS", cat: "Styling", icon: SiTailwindcss },
    { name: "Node.js", cat: "Backend", icon: SiNodedotjs },
    { name: "Express", cat: "API Server", icon: SiExpress },
    { name: "MongoDB", cat: "Database", icon: SiMongodb },
    { name: "MySQL", cat: "Database", icon: SiMysql },
    { name: "Git", cat: "Version Control", icon: SiGit },
    { name: "GitHub", cat: "CI/CD", icon: SiGithub },
    { name: "Vite", cat: "Build Tool", icon: SiVite },
  ];

  return (
    <div className="space-y-12" id="about-visual-effects">
      {/* Live Engineering Telemetry & Studio Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Terminal Console Feed */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0b0e0b] border border-white/[0.12] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(163,255,18,0.06)] relative group">
          {/* Top terminal title bar */}
          <div className="px-4 py-3 bg-[#111611] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              <span className="ml-3 font-mono text-[11px] text-[#A7ADA5]/80 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#A3FF12]" />
                <span>netweb-studio-compiler ~ bash</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#A3FF12] bg-[#182218] px-2.5 py-0.5 rounded border border-[#A3FF12]/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
              <span>LIVE TELEMETRY</span>
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-xs space-y-2.5 text-[#A7ADA5] min-h-[260px] flex flex-col justify-end bg-gradient-to-b from-[#0b0e0b] to-[#070907]">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-[#A3FF12] select-none shrink-0">&gt;</span>
                <span className={idx === terminalLogs.length - 1 ? "text-white font-semibold" : "text-[#A7ADA5]"}>
                  {log}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-[#A3FF12] pt-1">
              <span className="select-none">&gt;</span>
              <span className="inline-block w-2.5 h-4 bg-[#A3FF12] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right: Studio Metric Radars */}
        <div className="lg:col-span-5 space-y-3.5">
          <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest block">
            Quality Assurance Benchmarks
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            NUMBERS THAT PROTECT YOUR CONVERSIONS.
          </h3>
          <p className="text-sm text-[#A7ADA5] leading-relaxed mb-4">
            Every website we launch is subjected to rigorous Lighthouse testing and responsiveness checks across real mobile and desktop displays.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#101410] border border-white/[0.08] hover:border-[#A3FF12]/40 hover:bg-[#141914] transition-all duration-200 group"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-[#A3FF12] font-mono group-hover:scale-105 transition-transform origin-left">
                  {metric.value}
                </p>
                <p className="text-xs font-bold text-white mt-1">{metric.label}</p>
                <p className="text-[11px] text-[#A7ADA5] mt-0.5 leading-snug">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Stack Capability Grid on About Page with Brand Icons */}
      <div className="pt-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-3">
            STUDIO TECHNOLOGY STACK
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            HANDPICKED FOR SPEED, STABILITY & SCALE.
          </h3>
          <p className="text-xs sm:text-sm text-[#A7ADA5] mt-1.5">
            We avoid trendy bloat. We build on industry-standard open-source technologies that survive platform shifts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {technologies.map((t) => {
            const IconComp = t.icon;
            return (
              <div
                key={t.name}
                className="p-5 rounded-xl bg-[#101410] border border-white/[0.08] hover:border-[#A3FF12]/50 hover:bg-[#141a14] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(163,255,18,0.1)] transition-all duration-300 text-center group cursor-default flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#A3FF12] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-11 h-11 mb-2.5 rounded-lg bg-[#141814] border border-white/10 flex items-center justify-center text-[#DDE2D8] group-hover:text-[#A3FF12] group-hover:border-[#A3FF12]/40 group-hover:bg-[#182418] transition-all duration-300">
                  <IconComp className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-white group-hover:text-[#A3FF12] transition-colors">
                  {t.name}
                </p>
                <p className="text-[10px] font-mono text-[#A7ADA5] uppercase mt-0.5 tracking-wider">
                  {t.cat}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
