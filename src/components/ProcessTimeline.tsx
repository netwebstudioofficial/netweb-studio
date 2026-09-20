import React, { useState } from "react";
import { processStepsData } from "../data/agencyData";
import { CheckCircle2, ChevronRight, Clock, ShieldCheck } from "lucide-react";

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="w-full" id="process-timeline-container">
      {/* Desktop Horizontal Stepper Bar */}
      <div className="hidden lg:grid grid-cols-7 gap-2 pb-8 border-b border-white/[0.08] mb-8">
        {processStepsData.map((step, idx) => {
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;
          return (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-3 rounded-lg transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-[#141814] border-[#A3FF12] shadow-[0_0_15px_rgba(163,255,18,0.15)]"
                  : isPassed
                  ? "bg-[#101310] border-white/20 text-[#A7ADA5]"
                  : "bg-transparent border-transparent hover:bg-white/5 text-[#A7ADA5]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? "text-[#A3FF12]" : isPassed ? "text-white" : "text-white/40"
                  }`}
                >
                  {step.number}
                </span>
                <span className="text-[10px] font-mono text-[#A7ADA5]">{step.duration}</span>
              </div>
              <p
                className={`text-sm font-bold truncate ${
                  isActive ? "text-white" : "text-[#A7ADA5]"
                }`}
              >
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Featured Active Step Detail Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#101310] border border-white/[0.08] relative overflow-hidden mb-10 group hover:border-[#A3FF12]/30 transition-all">
        <div className="absolute top-0 left-0 h-1 bg-[#A3FF12] w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#A3FF12] text-[#080A08]">
                STAGE {processStepsData[activeStep].number}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#A7ADA5]">
                <Clock className="w-3.5 h-3.5 text-[#A3FF12]" />
                {processStepsData[activeStep].duration}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F2] mb-3">
              {processStepsData[activeStep].title}
            </h3>

            <p className="text-base text-[#A7ADA5] leading-relaxed mb-6 font-normal">
              {processStepsData[activeStep].description}
            </p>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2.5">
                Stage Deliverables & Verification:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {processStepsData[activeStep].deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#F5F7F2] px-3 py-1.5 rounded bg-[#141814] border border-white/[0.06]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A3FF12] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-xl bg-[#141814] border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A3FF12] uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Quality Gate Standard</span>
              </div>
              <p className="text-xs text-[#A7ADA5] leading-relaxed">
                Zero progression until design & architectural sign-off. We test rigorously against cross-browser standards and sub-second performance budgets.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="text-xs text-[#A7ADA5] hover:text-white disabled:opacity-30 cursor-pointer font-mono"
              >
                ← Previous
              </button>
              <span className="text-xs font-mono text-[#A3FF12]">
                {activeStep + 1} of {processStepsData.length}
              </span>
              <button
                disabled={activeStep === processStepsData.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(processStepsData.length - 1, prev + 1))}
                className="text-xs text-[#A3FF12] hover:underline disabled:opacity-30 cursor-pointer font-mono font-bold"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Accordion / Vertical Timeline Fallback */}
      <div className="lg:hidden space-y-3">
        <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-2">
          Tap any step to inspect scope:
        </p>
        {processStepsData.map((step, idx) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(idx)}
            className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
              activeStep === idx
                ? "bg-[#141814] border-[#A3FF12] text-white"
                : "bg-[#101310] border-white/10 text-[#A7ADA5]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#A3FF12]">
                {step.number}
              </span>
              <span className="text-sm font-semibold">{step.title}</span>
            </div>
            <span className="text-xs font-mono text-white/50">{step.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
