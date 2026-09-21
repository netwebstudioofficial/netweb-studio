import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { HeroVisual } from "../components/HeroVisual";
import { ServiceCard } from "../components/ServiceCard";
import { SolutionTabs } from "../components/SolutionTabs";
import { PortfolioCard } from "../components/PortfolioCard";
import { PortfolioFilter } from "../components/PortfolioFilter";
import { CaseStudyModal } from "../components/CaseStudyModal";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { AuditForm } from "../components/AuditForm";
import { TestimonialCard } from "../components/TestimonialCard";
import { FAQAccordion } from "../components/FAQAccordion";
import { MobileCardSlider } from "../components/MobileCardSlider";
import {
  servicesData,
  selectedWorkData,
  whyNetwebData,
  technologiesData,
  testimonialsData,
  ProjectItem,
} from "../data/agencyData";
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Layers,
  Code2,
  FileSearch,
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
import { siteConfig } from "../config/siteConfig";
import { motion } from "motion/react";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";

const getTechIcon = (name: string) => {
  switch (name) {
    case "React":
      return <SiReact className="w-5 h-5" />;
    case "JavaScript":
      return <SiJavascript className="w-5 h-5" />;
    case "Tailwind CSS":
      return <SiTailwindcss className="w-5 h-5" />;
    case "Node.js":
      return <SiNodedotjs className="w-5 h-5" />;
    case "Express":
      return <SiExpress className="w-5 h-5" />;
    case "MongoDB":
      return <SiMongodb className="w-5 h-5" />;
    case "MySQL":
      return <SiMysql className="w-5 h-5" />;
    case "Git":
      return <SiGit className="w-5 h-5" />;
    case "GitHub":
      return <SiGithub className="w-5 h-5" />;
    case "Vite":
      return <SiVite className="w-5 h-5" />;
    default:
      return <Code2 className="w-5 h-5" />;
  }
};

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    "ALL",
    "BUSINESS",
    "RESTAURANT",
    "REAL ESTATE",
    "HEALTHCARE",
    "LIFESTYLE",
    "E-COMMERCE",
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? selectedWorkData
      : selectedWorkData.filter(
          (p) => p.category.toUpperCase() === selectedCategory.toUpperCase()
        );

  const featuredLumenor = selectedWorkData.find((p) => p.id === "lumenor") || selectedWorkData[0];

  return (
    <div className="w-full relative overflow-x-hidden pt-20">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center py-16 sm:py-24 border-b border-white/[0.08]" id="hero">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Badges / Micro Text */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141814] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
                  INDEPENDENT DIGITAL STUDIO
                </span>
                <span className="text-[11px] font-mono text-[#A7ADA5] uppercase tracking-widest hidden sm:inline">
                  DESIGN × TECHNOLOGY × PERFORMANCE
                </span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#F5F7F2] tracking-tight leading-[1.04] uppercase font-['Space_Grotesk']">
                WE BUILD <br />
                <span className="text-[#F5F7F2]">WHAT'S </span>
                <span className="text-[#A3FF12] drop-shadow-[0_0_25px_rgba(163,255,18,0.25)]">NEXT.</span>
              </h1>

              {/* Alternative supporting line & description */}
              <div className="space-y-3 max-w-xl">
                <p className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  Digital experiences designed to move businesses forward.
                </p>
                <p className="text-base text-[#A7ADA5] leading-relaxed font-normal">
                  NETWEB STUDIO combines strategy, design and technology to create high-performance websites and digital products for ambitious businesses.
                </p>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  withArrow
                  id="hero-primary-cta"
                >
                  Start a Project
                </Button>
                <Button
                  to="/work"
                  variant="secondary"
                  size="lg"
                  id="hero-secondary-cta"
                >
                  Explore Our Work
                </Button>
                <Button
                  to="/audit"
                  variant="lime-outline"
                  size="lg"
                  id="hero-audit-cta"
                >
                  <span className="flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-[#A3FF12]" />
                    <span>Free Website Audit</span>
                  </span>
                </Button>
              </div>

              {/* Micro text below CTA */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A7ADA5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12]" />
                <span>Web Design • Development • Digital Solutions</span>
              </div>
            </div>

            {/* Right Hero Visual Column */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION — INTRODUCTION */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0c0e0c]"
        id="introduction"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            {/* Left: Large Typography */}
            <div className="lg:col-span-7">
              <div className="space-y-2">
                <p className="text-sm font-mono text-[#A3FF12] uppercase tracking-widest">
                  Statement of Intent
                </p>
                <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#F5F7F2] tracking-tight uppercase leading-[1.08]">
                  WE DON'T JUST <br />
                  BUILD WEBSITES. <br />
                  <span className="text-[#A3FF12]">WE BUILD DIGITAL EXPERIENCES.</span>
                </h2>
              </div>
            </div>

            {/* Right: Company Philosophy with Lime Vertical Line */}
            <div className="lg:col-span-5 relative pl-6 border-l-2 border-[#A3FF12]">
              <p className="text-lg sm:text-xl text-[#F5F7F2] font-medium leading-relaxed mb-4">
                "From first impression to final interaction, we design digital products that look distinctive, feel intuitive and perform with purpose."
              </p>
              <p className="text-sm text-[#A7ADA5] leading-relaxed">
                We believe your business deserves better than a generic off-the-shelf template. We engineer every touchpoint to inspire confidence, eliminate friction, and turn casual visitors into loyal clients.
              </p>
            </div>
          </RevealOnScroll>

          {/* Visual Digital Craftsmanship Showcase Gallery */}
          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-3 gap-6 pt-6"
              swipeHintLabel="Swipe pillars"
            >
              {/* Visual Card 1: Design System & Wireframing */}
              <RevealChild className="group relative rounded-xl overflow-hidden bg-[#121612] border border-white/[0.08] aspect-[16/10] flex flex-col justify-end p-5 h-full">
                <img
                  src="/assets/craft-design-system.webp"
                  alt="Bespoke Design Architecture"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.7] group-hover:brightness-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A08] via-[#080A08]/40 to-transparent" />
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-[#A3FF12] uppercase tracking-wider px-2 py-0.5 rounded bg-[#080A08]/80 border border-[#A3FF12]/30 mb-2 inline-block">
                    AESTHETIC DISCIPLINE
                  </span>
                  <h3 className="text-base font-bold text-white">Bespoke Design Systems</h3>
                  <p className="text-xs text-[#A7ADA5] mt-1">Zero stock templates. Mathematically tuned scales.</p>
                </div>
              </RevealChild>

              {/* Visual Card 2: Cross-Platform Responsive Engineering */}
              <RevealChild className="group relative rounded-xl overflow-hidden bg-[#121612] border border-white/[0.08] aspect-[16/10] flex flex-col justify-end p-5 h-full">
                <img
                  src="/assets/craft-responsive.webp"
                  alt="Responsive Engineering Across Screens"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.7] group-hover:brightness-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A08] via-[#080A08]/40 to-transparent" />
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-[#A3FF12] uppercase tracking-wider px-2 py-0.5 rounded bg-[#080A08]/80 border border-[#A3FF12]/30 mb-2 inline-block">
                    RESPONSIVE ERGONOMICS
                  </span>
                  <h3 className="text-base font-bold text-white">Mobile-First Touch Precision</h3>
                  <p className="text-xs text-[#A7ADA5] mt-1">44px+ minimum tap targets, fluid typographic scaling.</p>
                </div>
              </RevealChild>

              {/* Visual Card 3: High-Performance Engine */}
              <RevealChild className="group relative rounded-xl overflow-hidden bg-[#121612] border border-white/[0.08] aspect-[16/10] flex flex-col justify-end p-5 h-full">
                <img
                  src="/assets/craft-performance.webp"
                  alt="Sub-second Production Code"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.7] group-hover:brightness-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A08] via-[#080A08]/40 to-transparent" />
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-[#A3FF12] uppercase tracking-wider px-2 py-0.5 rounded bg-[#080A08]/80 border border-[#A3FF12]/30 mb-2 inline-block">
                    PERFORMANCE BENCHMARK
                  </span>
                  <h3 className="text-base font-bold text-white">Sub-1.0s Speed Budgets</h3>
                  <p className="text-xs text-[#A7ADA5] mt-1">Passing all Google Core Web Vitals on first load.</p>
                </div>
              </RevealChild>
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION — WHAT WE DO (SERVICES) */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08] relative"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="WHAT WE DO"
              title="STRATEGY, DESIGN AND DEVELOPMENT UNDER ONE ROOF."
              subtitle="We engineer specialized digital capabilities tailored to your exact business objectives."
              align="split"
            />
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-3 gap-6"
              swipeHintLabel="Swipe services"
            >
              {servicesData.map((service) => (
                <RevealChild key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>

          <RevealOnScroll delay={0.15} className="mt-12 text-center">
            <Button to="/services" variant="lime-outline" size="md" withArrow>
              View Full Service Deliverables & Engineering Specifications
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION — BUSINESS SOLUTIONS (INTERACTIVE TABS) */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0c0e0c]"
        id="solutions"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="INDUSTRY SYSTEMS"
              title="BUILT AROUND YOUR BUSINESS."
              subtitle="Every industry has unique operational friction. Select your sector to inspect our custom conversion architecture."
              align="left"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.12}>
            <SolutionTabs />
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FEATURED PROJECT — LUMENOR (CASE STUDY) */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08] relative overflow-hidden"
        id="featured-work"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-8">
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-3">
              FEATURED CASE STUDY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              LUMENOR
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#A3FF12] uppercase tracking-wider font-mono">
              LUXURY REAL ESTATE EXPERIENCE
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.15}
            className="bg-[#101310] border border-white/[0.12] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative group"
          >
            {/* Visual Media Column */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[460px] overflow-hidden bg-[#080A08]">
              <img
                src={featuredLumenor.image}
                alt="LUMENOR Luxury Real Estate Experience"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-black/30" />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-[#080A08]/85 backdrop-blur-md text-[#A3FF12] border border-[#A3FF12]/30">
                  FLAGSHIP ARCHITECTURE
                </span>
              </div>
            </div>

            {/* Case Study Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-2">
                    Client & Sector
                  </p>
                  <p className="text-lg font-bold text-white">
                    Ultra-Prime Property Developer
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-2">
                    Scope Description
                  </p>
                  <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed">
                    A refined digital experience designed to present luxury properties through immersive visuals, intuitive navigation and conversion-focused interactions.
                  </p>
                </div>

                {/* Technology Specs */}
                <div>
                  <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-2">
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Tailwind CSS", "Motion", "Vite"].map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#141814] text-[#A3FF12] border border-[#A3FF12]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
                  <div>
                    <p className="text-xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">+84%</p>
                    <p className="text-[10px] text-[#A7ADA5] uppercase font-mono">Inquiries</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">6m 14s</p>
                    <p className="text-[10px] text-[#A7ADA5] uppercase font-mono">Avg Session</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">0.78s</p>
                    <p className="text-[10px] text-[#A7ADA5] uppercase font-mono">Load Time</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setActiveModalProject(featuredLumenor)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded bg-[#A3FF12] text-[#080A08] font-bold text-sm hover:bg-[#9CFF00] transition-colors cursor-pointer"
                  id="view-case-study-btn"
                >
                  View Case Study →
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SECTION — OUR WORK (SELECTED WORK + FILTERING) */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08]"
        id="work"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="SELECTED WORK"
              title="SELECTED WORK"
              subtitle="A collection of digital experiences designed and developed by NETWEB STUDIO."
              align="split"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <PortfolioFilter
              categories={categories}
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </RevealOnScroll>

          {/* Portfolio Grid */}
          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-2 lg:grid-cols-3 gap-6"
              swipeHintLabel="Swipe projects"
            >
              {filteredProjects.map((project) => (
                <RevealChild key={project.id} className="h-full">
                  <PortfolioCard
                    project={project}
                    onSelect={(p) => setActiveModalProject(p)}
                  />
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>

          <RevealOnScroll delay={0.2} className="mt-12 text-center">
            <p className="text-xs text-[#A7ADA5] font-mono mb-4">
              All projects represent bespoke codebases engineered without generic pre-built templates.
            </p>
            <Button to="/contact" variant="primary" size="md" withArrow>
              Commission a Project Like These
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. SECTION — BEFORE / AFTER COMPARISON */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0c0e0c]"
        id="comparison"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="PERFORMANCE AUDIT"
              title="YOUR WEBSITE SHOULD WORK HARDER."
              subtitle="Compare a typical slow template with a custom NETWEB STUDIO build. Experience the difference in speed, clarity and conversion intent."
              align="center"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <BeforeAfterSlider />
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. SECTION — CLIENT JOURNEY */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-white/[0.08] bg-[#080A08]" id="journey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="text-center font-mono text-xs text-[#A3FF12] uppercase tracking-widest mb-6">
              THE CLIENT JOURNEY
            </p>
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
              cardWidthClassName="w-[58vw] max-w-[220px] sm:w-[200px]"
              swipeHintLabel="Client journey"
            >
              {[
                { step: "01", text: "YOU HAVE AN IDEA" },
                { step: "02", text: "WE UNDERSTAND IT" },
                { step: "03", text: "WE DESIGN IT" },
                { step: "04", text: "WE BUILD IT" },
                { step: "05", text: "YOU LAUNCH IT" },
                { step: "06", text: "WE HELP YOU GROW" },
              ].map((node, idx) => (
                <RevealChild
                  key={idx}
                  className="p-4 rounded-lg bg-[#101310] border border-white/[0.08] text-center flex flex-col justify-between relative group hover:border-[#A3FF12]/40 transition-colors h-full"
                >
                  <span className="font-mono text-[11px] text-[#A3FF12] font-bold block mb-2">
                    {node.step}
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight">
                    {node.text}
                  </p>
                  {idx < 5 && (
                    <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-[#A3FF12] z-10 font-bold">
                      →
                    </span>
                  )}
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. SECTION — WHY NETWEB */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0c0e0c]" id="why-netweb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="OUR PRINCIPLES"
              title="WHY NETWEB STUDIO?"
              subtitle="We don't operate as a transactional freelance outfit. We function as your dedicated engineering and brand partner."
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
                  className="p-7 sm:p-8 rounded-xl bg-[#141814] border border-white/[0.08] hover:border-[#A3FF12]/30 transition-all group h-full flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#A3FF12] px-2.5 py-1 rounded bg-[#080A08] border border-[#A3FF12]/20 mb-4 inline-block">
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

      {/* ============================================================ */}
      {/* 11. SECTION — TECHNOLOGY */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-white/[0.08]" id="technologies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-3">
              STACK CAPABILITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              BUILT WITH MODERN TECHNOLOGY.
            </h2>
            <p className="text-xs sm:text-sm text-[#A7ADA5] mt-2">
              Scalable, lightning-fast tools selected for longevity, security and maintainability.
            </p>
          </RevealOnScroll>

          <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {technologiesData.map((tech) => (
              <RevealChild
                key={tech.name}
                className="p-5 rounded-xl bg-[#101310] border border-white/[0.08] hover:border-[#A3FF12]/50 hover:bg-[#131913] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(163,255,18,0.1)] transition-all duration-300 text-center group cursor-default flex flex-col items-center justify-center relative overflow-hidden"
              >
                {/* Subtle hover neon accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#A3FF12] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                {/* Tech Icon Container */}
                <div className="w-11 h-11 mb-2.5 rounded-lg bg-[#141814] border border-white/10 flex items-center justify-center text-[#DDE2D8] group-hover:text-[#A3FF12] group-hover:border-[#A3FF12]/40 group-hover:bg-[#182418] transition-all duration-300 shrink-0">
                  {getTechIcon(tech.name)}
                </div>

                <p className="text-sm font-bold text-white group-hover:text-[#A3FF12] transition-colors">
                  {tech.name}
                </p>
                <p className="text-[10px] font-mono text-[#A7ADA5] uppercase mt-0.5 tracking-wider">
                  {tech.category}
                </p>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. SECTION — FREE WEBSITE AUDIT */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08]"
        id="audit"
      >
        <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuditForm />
        </RevealOnScroll>
      </section>

      {/* ============================================================ */}
      {/* 13. SECTION — SAMPLE TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0c0e0c]" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-12">
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-3">
              Sample Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              WHAT BUSINESS PARTNERS SAY.
            </h2>
            <p className="text-xs sm:text-sm text-[#A7ADA5] mt-1 font-mono">
              [Simulated feedback demonstrating client engagement outcomes and real-world transformation benchmarks]
            </p>
          </RevealOnScroll>

          <RevealGroup>
            <MobileCardSlider
              desktopGridClassName="md:grid-cols-3 gap-6"
              swipeHintLabel="Swipe feedback"
            >
              {testimonialsData.map((t, idx) => (
                <RevealChild key={idx} className="h-full">
                  <TestimonialCard testimonial={t} />
                </RevealChild>
              ))}
            </MobileCardSlider>
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. SECTION — FAQ */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-28 border-b border-white/[0.08]"
        id="faq"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionTitle
              tag="QUESTIONS ANSWERED"
              title="FREQUENTLY ASKED QUESTIONS"
              subtitle="Straightforward answers regarding investment, timelines, technical capabilities and post-launch support."
              align="center"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <FAQAccordion />
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. FINAL FULL-WIDTH CTA */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-[#080A08]" id="final-cta">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <RevealOnScroll className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141814] border border-[#A3FF12]/40 text-[#A3FF12] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            READY TO STAND OUT?
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F5F7F2] tracking-tight leading-[1.05] uppercase font-['Space_Grotesk']">
            LET'S BUILD SOMETHING <br />
            <span className="text-[#A3FF12]">WORTH REMEMBERING.</span>
          </h2>

          <p className="text-base sm:text-xl text-[#A7ADA5] max-w-2xl mx-auto leading-relaxed">
            Have an idea, an outdated website or a business ready to go digital? Let's talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button to="/contact" variant="primary" size="lg" withArrow id="final-cta-start">
              Start a Project →
            </Button>
            <Button to="/audit" variant="lime-outline" size="lg" id="final-cta-audit">
              Get Free Audit
            </Button>
          </div>

          <p className="text-xs font-mono text-[#A7ADA5]">
            {siteConfig.companyName} • {siteConfig.location} • Serving Ambitious Businesses Worldwide
          </p>
        </RevealOnScroll>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};
