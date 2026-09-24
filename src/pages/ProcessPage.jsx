import React from "react";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { CheckCircle2, ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import { MobileCardSlider } from "../components/MobileCardSlider";

export const ProcessPage = () => {
  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-2.5 sm:mb-3">
              Production Engineering
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-4 sm:mb-5">
              FROM IDEA TO IMPACT. <br />
              <span className="text-[#A3FF12]">THE NETWEB PRODUCTION CYCLE.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              Great websites don't happen by accident. We eliminate chaos through a disciplined 7-stage engineering lifecycle with clear milestones, client review gates, and uncompromising performance benchmarks.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Process Interactive Stepper */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <ProcessTimeline />
          </RevealOnScroll>
        </div>
      </section>

      {/* Quality Standards & Principles with High-Visual Cards */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="ENGINEERING INTEGRITY"
              title="THE FOUR PILLARS OF OUR CODE"
              subtitle="We hold every release to uncompromising technical benchmarks before it reaches public production."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-4 gap-6"
              swipeHintLabel="Swipe pillars"
            >
              {/* Pillar 1 */}
              <RevealChild className="rounded-xl bg-[#101310] border border-white/[0.08] overflow-hidden group hover:border-[#A3FF12]/40 transition-all flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                  <img
                    src="/assets/process/process-performance.webp"
                    alt="Sub-1s Load Budget Performance"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#A3FF12] text-[#080A08]">
                      100/100
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#A3FF12]" />
                      <h3 className="text-base font-bold text-white">Sub-1s Load Budget</h3>
                    </div>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed">
                      Zero bloated themes. We measure First Contentful Paint to guarantee peak Google Core Web Vitals.
                    </p>
                  </div>
                </div>
              </RevealChild>

              {/* Pillar 2 */}
              <RevealChild className="rounded-xl bg-[#101310] border border-white/[0.08] overflow-hidden group hover:border-[#A3FF12]/40 transition-all flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                  <img
                    src="/assets/process/process-handover.webp"
                    alt="Clean Codebase Handover"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A3FF12] border border-[#A3FF12]/30">
                      100% OWNED
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#A3FF12]" />
                      <h3 className="text-base font-bold text-white">Clean Handover</h3>
                    </div>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed">
                      You own 100% of your source code, domain, and assets. Documented repositories with zero vendor lock-in.
                    </p>
                  </div>
                </div>
              </RevealChild>

              {/* Pillar 3 */}
              <RevealChild className="rounded-xl bg-[#101310] border border-white/[0.08] overflow-hidden group hover:border-[#A3FF12]/40 transition-all flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                  <img
                    src="/assets/process/process-fidelity.webp"
                    alt="Pixel-perfect Design Fidelity"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A3FF12] border border-[#A3FF12]/30">
                      PIXEL-EXACT
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-[#A3FF12]" />
                      <h3 className="text-base font-bold text-white">Design Fidelity</h3>
                    </div>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed">
                      What you approve in design is pixel-for-pixel what gets deployed. No compromises between mockups and code.
                    </p>
                  </div>
                </div>
              </RevealChild>

              {/* Pillar 4 */}
              <RevealChild className="rounded-xl bg-[#101310] border border-white/[0.08] overflow-hidden group hover:border-[#A3FF12]/40 transition-all flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                  <img
                    src="/assets/process/process-seo.webp"
                    alt="SEO & Analytics Foundation"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A3FF12] border border-[#A3FF12]/30">
                      SEARCH-READY
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A3FF12]" />
                      <h3 className="text-base font-bold text-white">SEO & Analytics</h3>
                    </div>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed">
                      Every release includes OpenGraph social tags, JSON-LD structured schemas, and event tracking out of the box.
                    </p>
                  </div>
                </div>
              </RevealChild>
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>

      {/* Before / After Benchmark */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="MEASURABLE IMPACT"
              title="BEFORE VS. AFTER NETWEB"
              subtitle="Drag the interactive slider to examine the qualitative and quantitative upgrade of a bespoke engineering build."
              align="center"
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <BeforeAfterSlider />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};
