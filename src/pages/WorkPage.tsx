import React, { useState } from "react";
import { PortfolioFilter } from "../components/PortfolioFilter";
import { PortfolioCard } from "../components/PortfolioCard";
import { CaseStudyModal } from "../components/CaseStudyModal";
import { Button } from "../components/Button";
import { selectedWorkData, ProjectItem } from "../data/agencyData";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";

export const WorkPage: React.FC = () => {
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

  return (
    <div className="w-full pt-28 pb-20">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Selected Work
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              DIGITAL EXPERIENCES. <br />
              <span className="text-[#A3FF12]">BUILT TO PERFORM.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              A curated collection of web applications, commercial platforms, and branded digital experiences engineered by NETWEB STUDIO. Click any project to inspect the architecture, challenges, and verified metrics.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <PortfolioFilter
              categories={categories}
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </RevealOnScroll>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <RevealChild key={project.id}>
                <PortfolioCard
                  project={project}
                  onSelect={(p) => setActiveModalProject(p)}
                />
              </RevealChild>
            ))}
          </RevealGroup>

          {/* Bottom Custom Project Callout */}
          <RevealOnScroll className="mt-16 p-8 sm:p-12 rounded-2xl bg-[#101310] border border-white/[0.08] text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 uppercase">
              Ready for your custom build?
            </h3>
            <p className="text-sm text-[#A7ADA5] mb-6">
              Every project we take on is engineered from a clean repository. We guarantee sub-second load times and bespoke design alignment.
            </p>
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Commission a Project Like These
            </Button>
          </RevealOnScroll>
        </div>
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
