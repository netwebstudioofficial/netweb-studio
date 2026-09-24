import React from "react";
import { Button } from "./Button";
import { X, ExternalLink, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const CaseStudyModal = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-[#101310] border border-white/[0.12] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#F5F7F2]"
          id={`case-study-modal-${project.id}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#080A08]/80 border border-white/20 text-[#A7ADA5] hover:text-white hover:border-[#A3FF12] flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Media */}
          <div className="relative aspect-[21/9] sm:aspect-[2/1] overflow-hidden bg-[#080A08] border-b border-white/[0.08]">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-black/40" />

            <div className="absolute bottom-4 left-6 right-6">
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#A3FF12] text-[#080A08] mb-2 inline-block">
                PROJECT {project.number} • {project.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {project.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#A3FF12] uppercase tracking-wider">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Overview & Key Metric */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-8">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                  Project Blueprint
                </h3>
                <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed">
                  {project.longDesc}
                </p>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-[#141814] border border-[#A3FF12]/20">
                <p className="text-[11px] font-mono text-[#A7ADA5] uppercase tracking-wider">
                  Client Sector
                </p>
                <p className="text-sm font-bold text-white mb-3">
                  {project.clientType}
                </p>
                <p className="text-[11px] font-mono text-[#A7ADA5] uppercase tracking-wider">
                  Core Technologies
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.techTags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080A08] text-[#A3FF12] border border-[#A3FF12]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics Bar */}
            {project.metrics && (
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Verified Engineering Outcomes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#141814] border border-white/[0.08]"
                    >
                      <p className="text-2xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">
                        {m.value}
                      </p>
                      <p className="text-xs text-[#A7ADA5] uppercase tracking-wider font-mono mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.challenge && (
                  <div className="p-5 rounded-xl bg-[#141814] border border-white/[0.06]">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      The Strategic Challenge
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A7ADA5] leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-5 rounded-xl bg-[#141814] border border-[#A3FF12]/20">
                    <h4 className="text-xs font-bold text-[#A3FF12] uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      The NETWEB Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A7ADA5] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#A7ADA5]">
                Want a similar high-performance digital product for your business?
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  to={`/contact?project=${encodeURIComponent(project.name)}`}
                  variant="primary"
                  size="sm"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Commission This Caliber
                </Button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded text-xs text-[#A7ADA5] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
