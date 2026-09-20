import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { whyNetwebData, technologiesData } from "../data/agencyData";
import { AboutVisualEffects } from "../components/AboutVisualEffects";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import {
  Sparkles,
  Code2,
  ShieldCheck,
  HeartHandshake,
  Zap,
  Target,
  FileSearch,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-20 relative overflow-hidden">
      {/* Ambient background visual glows */}
      <div className="absolute top-24 left-1/3 w-[450px] h-[450px] rounded-full bg-[#A3FF12]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[900px] right-5 w-96 h-96 rounded-full bg-[#A3FF12]/5 blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <section className="border-b border-white/[0.08] pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Studio Identity
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              WE ARE <br />
              <span className="text-[#A3FF12]">NETWEB STUDIO.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              A modern digital studio and technology partner helping ambitious businesses build an authoritative digital presence through high-performance web applications, intelligent AI pipelines, and bespoke visual design.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Manifesto / Why We Exist */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <RevealOnScroll className="lg:col-span-6 space-y-6">
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

            <RevealOnScroll delay={0.15} className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-[#101310] border border-white/[0.08] relative hover:border-[#A3FF12]/40 transition-colors shadow-2xl">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#A3FF12]" />
              <h3 className="text-xl font-bold text-white mb-4 uppercase">
                Our Core Code of Honor:
              </h3>
              <ul className="space-y-4 text-sm text-[#A7ADA5]">
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
      <section className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#090c09]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <AboutVisualEffects />
          </RevealOnScroll>
        </div>
      </section>

      {/* Our 6 Guiding Principles */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="STUDIO PILLARS"
              title="THE SIX PRINCIPLES BEHIND EVERY RELEASE"
              subtitle="How we maintain production quality across design, code, and client relationships."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyNetwebData.map((item) => (
              <RevealChild
                key={item.number}
                className="p-8 rounded-xl bg-[#141814] border border-white/[0.08] hover:border-[#A3FF12]/40 hover:bg-[#161c16] transition-all duration-300 group"
              >
                <span className="font-mono text-xs font-bold text-[#A3FF12] px-2.5 py-1 rounded bg-[#080A08] border border-[#A3FF12]/20 mb-4 inline-block group-hover:border-[#A3FF12]/50 transition-colors">
                  {item.number}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A3FF12] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A7ADA5] leading-relaxed">
                  {item.description}
                </p>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Studio Action Call */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 relative">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            Ready to elevate your digital presence?
          </h2>
          <p className="text-base text-[#A7ADA5] mb-8">
            Partner with a dedicated digital studio committed to your long-term commercial performance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Start a Project
            </Button>
            <Button to="/work" variant="secondary" size="lg">
              Explore Selected Work
            </Button>
            <Button to="/audit" variant="lime-outline" size="lg">
              <span className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-[#A3FF12]" />
                <span>Free Website Audit</span>
              </span>
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};
