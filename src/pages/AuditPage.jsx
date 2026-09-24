import React from "react";
import { AuditForm } from "../components/AuditForm";
import { SectionTitle } from "../components/SectionTitle";
import { Activity, Smartphone, Search, Target, Zap, ShieldCheck } from "lucide-react";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import { MobileCardSlider } from "../components/MobileCardSlider";

export const AuditPage = () => {
  return (
    <div className="w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-2.5 sm:mb-3">
              Studio Diagnostic
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-4 sm:mb-5">
              IS YOUR WEBSITE <br />
              <span className="text-[#A3FF12]">WORKING HARD ENOUGH?</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              Slow loading times, clumsy mobile menus, and ambiguous call-to-actions silently cost businesses thousands in lost bookings and inquiries each month. Request a complimentary engineering diagnostic.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Audit Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <AuditForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* What We Examine Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="AUDIT CRITERIA"
              title="THE FOUR PILLARS WE ANALYZE"
              subtitle="Our manual and automated technical review breaks down performance into actionable improvements."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-4 gap-6"
              swipeHintLabel="Swipe criteria"
            >
              <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08] h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Core Web Vitals</h3>
                  <p className="text-xs text-[#A7ADA5] leading-relaxed">
                    Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint evaluated directly against Google's search ranking thresholds.
                  </p>
                </div>
              </RevealChild>

              <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08] h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Mobile Ergonomics</h3>
                  <p className="text-xs text-[#A7ADA5] leading-relaxed">
                    Testing across real viewport widths (320px to 428px) for thumb-zone accessibility, tap target dimensions, and fluid font readability.
                  </p>
                </div>
              </RevealChild>

              <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08] h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Technical SEO</h3>
                  <p className="text-xs text-[#A7ADA5] leading-relaxed">
                    Evaluating schema markup, canonical tags, heading structure, alt tags, OpenGraph previews, and Google Search Console indexability.
                  </p>
                </div>
              </RevealChild>

              <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08] h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Conversion Funnel</h3>
                  <p className="text-xs text-[#A7ADA5] leading-relaxed">
                    Identifying where high-intent visitors hesitate, form abandonment triggers, and missing direct engagement pathways like Telegram.
                  </p>
                </div>
              </RevealChild>
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>
    </div>
  );
};
