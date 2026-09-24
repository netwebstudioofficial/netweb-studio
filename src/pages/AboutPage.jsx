import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { whyNetwebData, technologiesData } from "../data/agencyData";
import { AboutVisualEffects } from "../components/AboutVisualEffects";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import { MobileCardSlider } from "../components/MobileCardSlider";
import {
  Sparkles,
  Code2,
  ShieldCheck,
  HeartHandshake,
  Zap,
  Target,
  FileSearch,
} from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Ambient background visual glows */}
      <div className="absolute top-24 left-1/3 w-[450px] h-[450px] rounded-full bg-[#A3FF12]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[900px] right-5 w-96 h-96 rounded-full bg-[#A3FF12]/5 blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <section className="border-b border-white/[0.08] pb-10 sm:pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Studio Identity & Our Vision */}
            <RevealOnScroll className="lg:col-span-7">
              <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-2.5 sm:mb-3">
                Studio Identity
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-4 sm:mb-5">
                WE ARE <br />
                <span className="text-[#A3FF12]">NETWEB STUDIO.</span>
              </h1>
              
              {/* Our Vision Section replacing bottom paragraph */}
              <div className="space-y-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141814] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-pulse" />
                  Our Vision
                </div>
                <p className="text-base sm:text-xl text-[#F5F7F2] font-semibold leading-relaxed font-['Space_Grotesk']">
                  Pioneering the next era of web engineering where high-precision digital craft converges with intelligent AI architectures.
                </p>
                <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed">
                  Founded by ambitious innovators with a deep vision in AI and autonomous technology, our mission is to deliver uncompromising digital ecosystems. We eliminate slow, bloated templates in favor of mathematically disciplined, sub-second architectures and custom AI pipelines that build genuine commercial authority for high-growth brands.
                </p>
              </div>
            </RevealOnScroll>

            {/* Right Column: Cube-Rectangle Founders & AI Vision Photo */}
            <RevealOnScroll delay={0.15} className="lg:col-span-5">
              <div className="relative group">
                {/* 3D Dimensional Cube Offset Shadow Layer */}
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-gradient-to-tr from-[#A3FF12]/25 via-transparent to-[#A3FF12]/15 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-3 -right-3 bottom-0 -left-3 rounded-2xl bg-[#090C09] border border-[#A3FF12]/20 hidden sm:block pointer-events-none -z-10 translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />

                {/* Main Cube Rectangle Container */}
                <div className="relative rounded-2xl overflow-hidden border border-[#A3FF12]/30 bg-[#101310] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] aspect-[4/3] sm:aspect-[5/4] flex items-center justify-center">
                  <img
                    src="/WhatsApp Image 2026-09-24 at 6.22.22 PM.jpeg"
                    alt="Netweb Studio Young Founders - Vision in AI"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = "true";
                        e.currentTarget.src = "/assets/founders.jpg";
                      }
                    }}
                  />

                  {/* Corner Accent Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#A3FF12] pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#A3FF12] pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#A3FF12] pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#A3FF12] pointer-events-none" />

                  {/* Floating Top Pill Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080A08]/90 backdrop-blur-md border border-[#A3FF12]/40 text-[#A3FF12] text-xs font-mono font-bold tracking-wider uppercase shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-ping" />
                    Young Founders • Vision in AI
                  </div>

                  {/* Bottom Gradient Overlay & Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-[#080A08] via-[#080A08]/80 to-transparent flex items-end justify-between pointer-events-none">
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide font-['Space_Grotesk'] uppercase">
                        Netweb Leadership
                      </p>
                      <p className="text-xs text-[#A7ADA5]">
                        Engineering &amp; AI Direction
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-[#A3FF12]/10 border border-[#A3FF12]/30 text-[#A3FF12] text-[11px] font-mono font-semibold">
                      FOUNDERS
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Manifesto / Why We Exist */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <RevealOnScroll className="lg:col-span-6 space-y-5">
              <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest">
                Our Origin & Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                The internet is flooded with slow, generic templates. We exist to fix that.
              </h2>
              <p className="text-base text-[#A7ADA5] leading-relaxed">
                Too many businesses pay agency fees only to receive a modified WordPress theme filled with 40 unnecessary plugins, broken mobile margins, and 5-second load times that bleed customer conversions.
              </p>
              <p className="text-base text-[#A7ADA5] leading-relaxed">
                At NETWEB STUDIO, we operate as an independent creative and engineering studio. We combine modern front-end engineering (React, TypeScript, Tailwind, Motion) with high-contrast, mathematically balanced visual design.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15} className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#101310] border border-white/[0.08] relative hover:border-[#A3FF12]/40 transition-colors shadow-2xl">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#A3FF12]" />
              <h3 className="text-xl font-bold text-white mb-4 uppercase">
                Our Core Code of Honor:
              </h3>
              <ul className="space-y-3.5 text-sm text-[#A7ADA5]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Business-First Reasoning:</strong> We never build frivolous features. Every element must either convert, inform, or elevate brand credibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Bespoke Codebases:</strong> Zero pre-fabricated templates. Every line of code is structured specifically for your operational model.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Sub-Second Speed:</strong> We optimize asset pipelines, compress media, and enforce strict Core Web Vitals budgets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Full Ownership:</strong> You own every pixel, line of code, domain, and deployment asset. Zero restrictive lock-in.</span>
                </li>
              </ul>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Visual Effects & Live Engineering Telemetry */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] bg-[#090c09]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <AboutVisualEffects />
          </RevealOnScroll>
        </div>
      </section>

      {/* Our 6 Guiding Principles */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="STUDIO PILLARS"
              title="THE SIX PRINCIPLES BEHIND EVERY RELEASE"
              subtitle="How we maintain production quality across design, code, and client relationships."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-3 gap-6"
              swipeHintLabel="Swipe principles"
            >
              {whyNetwebData.map((item) => (
                <RevealChild
                  key={item.number}
                  className="p-8 rounded-xl bg-[#141814] border border-white/[0.08] hover:border-[#A3FF12]/40 hover:bg-[#161c16] transition-all duration-300 group h-full flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#A3FF12] px-2.5 py-1 rounded bg-[#080A08] border border-[#A3FF12]/20 mb-4 inline-block group-hover:border-[#A3FF12]/50 transition-colors">
                      {item.number}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A3FF12] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A7ADA5] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>

      {/* Studio Action Call */}
      <section className="py-12 sm:py-16 text-center max-w-4xl mx-auto px-4 relative">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
            Ready to elevate your digital presence?
          </h2>
          <p className="text-base text-[#A7ADA5] mb-6">
            Partner with a dedicated digital studio committed to your long-term commercial performance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Start Project
            </Button>
            <Button to="/audit" variant="black" size="lg">
              <span className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-white" />
                <span>Free Website Audit</span>
              </span>
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};
