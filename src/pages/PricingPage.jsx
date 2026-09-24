import React from "react";
import { PricingCalculator } from "../components/PricingCalculator";
import { FAQAccordion } from "../components/FAQAccordion";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { Check, AlertCircle, Sparkles, Shield } from "lucide-react";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";
import { MobileCardSlider } from "../components/MobileCardSlider";

export const PricingPage = () => {
  return (
    <div className="w-full pt-28 pb-20">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Transparent Investment
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              WHAT DOES YOUR <br />
              <span className="text-[#A3FF12]">PROJECT NEED?</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              No hidden retainers, no bait-and-switch estimates. We provide upfront, transparent project ranges based on functional depth, custom page volume, and operational integrations.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Interactive Estimator */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Interactive Scope & Investment Estimator
            </h2>
            <p className="text-sm text-[#A7ADA5] mt-1">
              Select your business model, page scope, and technical modules to view instant pricing ranges.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <PricingCalculator />
          </RevealOnScroll>
        </div>
      </section>

      {/* Tier Breakdown Table with Visual Deliverable Previews */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="BASE ENGAGEMENT TIERS"
              title="STRUCTURED PRODUCTION PACKAGES"
              subtitle="Explore our three standard engagement levels with visual deliverables and full ownership."
              align="left"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-3 gap-6"
              swipeHintLabel="Swipe tiers"
            >
              {/* Starter Tier */}
              <RevealChild className="rounded-2xl bg-[#101310] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-[#A3FF12]/40 transition-all h-full">
                <div>
                  {/* Visual Deliverable Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                    <img
                      src="/assets/pricing/pricing-starter.webp"
                      alt="Starter Tier Deliverables"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A7ADA5] border border-white/[0.1]">
                        FOUNDATION
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl font-extrabold text-white mb-1">
                      STARTER
                    </h3>
                    <p className="text-3xl font-extrabold text-[#A3FF12] font-['Space_Grotesk'] mb-3">
                      ₹4,999<span className="text-xs text-[#A7ADA5] font-mono"> / base</span>
                    </p>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed mb-6">
                      Ideal for emerging local businesses, single venues, and consultants requiring a sharp mobile presence.
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {[
                        "1–3 Custom Responsive Pages",
                        "Mobile-First Clean Architecture",
                        "Direct Telegram Chat Trigger",
                        "Google Maps & Location Schema",
                        "Basic On-Page SEO Setup",
                        "14 Days Post-Launch Warranty",
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7F2]">
                          <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Button
                    to="/contact?tier=Starter"
                    variant="secondary"
                    size="sm"
                    className="w-full font-mono text-xs justify-center"
                  >
                    Inquire for Starter →
                  </Button>
                </div>
              </RevealChild>

              {/* Business Tier (Featured) */}
              <RevealChild className="rounded-2xl bg-[#141814] border-2 border-[#A3FF12]/40 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(163,255,18,0.1)] group h-full">
                <div className="absolute top-3 right-3 z-10 px-3 py-0.5 rounded-full bg-[#A3FF12] text-[#080A08] text-[10px] font-bold uppercase font-mono tracking-wider">
                  MOST POPULAR
                </div>

                <div>
                  {/* Visual Deliverable Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                    <img
                      src="/assets/pricing/pricing-business.webp"
                      alt="Business Tier Deliverables"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141814] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A3FF12] border border-[#A3FF12]/30">
                        GROWTH
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl font-extrabold text-white mb-1">
                      BUSINESS
                    </h3>
                    <p className="text-3xl font-extrabold text-[#A3FF12] font-['Space_Grotesk'] mb-3">
                      ₹9,999<span className="text-xs text-[#A7ADA5] font-mono"> / base</span>
                    </p>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed mb-6">
                      For established brands, boutique hotels, clinics, and restaurants requiring appointment funnels.
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {[
                        "4–7 Custom Responsive Pages",
                        "Bespoke Interactive Components",
                        "Online Booking / Appointment System",
                        "High-Resolution Curated Media",
                        "Full Technical & Schema SEO",
                        "Sub-1.0s Speed Optimization",
                        "30 Days Post-Launch Warranty",
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7F2]">
                          <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Button
                    to="/contact?tier=Business"
                    variant="primary"
                    size="sm"
                    withArrow
                    className="w-full font-mono text-xs justify-center"
                  >
                    Inquire for Business →
                  </Button>
                </div>
              </RevealChild>

              {/* Premium Tier */}
              <RevealChild className="rounded-2xl bg-[#101310] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-[#A3FF12]/40 transition-all h-full">
                <div>
                  {/* Visual Deliverable Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#080A08]">
                    <img
                      src="/assets/pricing/pricing-enterprise.webp"
                      alt="Premium Studio Deliverables"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-95"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#080A08]/90 text-[#A3FF12] border border-[#A3FF12]/30">
                        ENTERPRISE
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl font-extrabold text-white mb-1">
                      PREMIUM STUDIO
                    </h3>
                    <p className="text-3xl font-extrabold text-[#A3FF12] font-['Space_Grotesk'] mb-3">
                      ₹19,999<span className="text-xs text-[#A7ADA5] font-mono"> / base</span>
                    </p>
                    <p className="text-xs text-[#A7ADA5] leading-relaxed mb-6">
                      For luxury real estate, e-commerce, multi-location hospitality, and custom web applications.
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {[
                        "8–15+ Custom Engineered Pages",
                        "Full E-Commerce / Payment Gateways",
                        "Custom Admin / CMS Dashboard",
                        "Multi-Language & Complex Filtering",
                        "Advanced Motion & Interactive Canvas",
                        "Priority 60-Day Dedicated Support",
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7F2]">
                          <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Button
                    to="/contact?tier=Premium"
                    variant="secondary"
                    size="sm"
                    className="w-full font-mono text-xs justify-center"
                  >
                    Inquire for Premium →
                  </Button>
                </div>
              </RevealChild>
            </MobileCardSlider>
          </RevealGroup>

          <RevealOnScroll delay={0.2} className="mt-8 p-4 rounded-xl bg-[#101310] border border-white/[0.08] text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-[#A7ADA5]">
            <AlertCircle className="w-4 h-4 text-[#A3FF12] shrink-0" />
            <span>Important: Estimated project range. Final pricing depends on specific technical requirements.</span>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="INVESTMENT DETAILS"
              title="FREQUENTLY ASKED PRICING QUESTIONS"
              subtitle="Transparent answers regarding payment milestones, ongoing hosting, and scope revisions."
              align="center"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <FAQAccordion />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};
