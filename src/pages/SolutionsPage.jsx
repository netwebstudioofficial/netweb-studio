import React from "react";
import { SolutionTabs } from "../components/SolutionTabs";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { businessSolutionsData } from "../data/agencyData";
import { Check, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import { MobileCardSlider } from "../components/MobileCardSlider";

export const SolutionsPage = () => {
  return (
    <div className="w-full pt-28 pb-20">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Specialized Architectures
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              INDUSTRY SOLUTIONS. <br />
              <span className="text-[#A3FF12]">ZERO COOKIE-CUTTER TEMPLATES.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed mb-8">
              Different business categories require radically different technical mechanisms. A luxury restaurant needs direct reservations and instant ordering; a healthcare clinic needs HIPAA-ready patient inquiries; a real estate firm needs immersive high-resolution property showcases.
            </p>

            {/* Visual Sector Snapshot Pill Strip */}
            <div className="flex flex-wrap gap-2 pt-2">
              {businessSolutionsData.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101310] border border-white/[0.08] text-xs text-[#F5F7F2] font-mono hover:border-[#A3FF12]/40 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12]" />
                  <span>{item.category}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Interactive Tabs Showcase */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Interactive Industry Blueprint
            </h2>
            <p className="text-sm text-[#A7ADA5] mt-1">
              Select your market sector below to explore key deliverables, conversion metrics, and visual styling.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <SolutionTabs />
          </RevealOnScroll>
        </div>
      </section>

      {/* Complete Industry Breakdown Grid — High-Visual Card Layout */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="FULL PORTFOLIO ARCHITECTURE"
              title="SYSTEM SPECIFICATIONS BY SECTOR"
              subtitle="Explore the pre-engineered technical capabilities and visual storefronts we deploy for specialized business operations."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              swipeHintLabel="Swipe industries"
            >
              {businessSolutionsData.map((item) => (
                <RevealChild
                  key={item.id}
                  className="rounded-xl bg-[#101310] border border-white/[0.08] hover:border-[#A3FF12]/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg h-full"
                >
                  <div>
                    {/* Visual Image Header in Browser Mockup Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                      <div className="absolute top-0 inset-x-0 h-6 bg-[#080A08]/90 backdrop-blur-sm z-10 flex items-center justify-between px-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="text-[9px] font-mono text-[#A7ADA5] truncate max-w-[120px]">
                          netweb.studio/{item.id}
                        </span>
                      </div>

                      <img
                        src={item.image}
                        alt={`${item.category} digital solution preview`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pt-6 brightness-90 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />

                      {/* Floating Metric Pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 backdrop-blur-md text-[#A3FF12] border border-[#A3FF12]/30">
                          {item.category.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#A3FF12] text-[#080A08]">
                          {item.metrics[0].value} {item.metrics[0].label}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#A3FF12] transition-colors leading-snug">
                        {item.tagline}
                      </h3>

                      <p className="text-xs text-[#A7ADA5] leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {item.features.slice(0, 3).map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7F2]">
                            <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-white/[0.06]">
                    <Button
                      to={`/contact?industry=${encodeURIComponent(item.category)}`}
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs font-mono justify-center"
                      withArrow
                    >
                      Build for {item.category}
                    </Button>
                  </div>
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>
    </div>
  );
};
