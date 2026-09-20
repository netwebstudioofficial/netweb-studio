import React, { useState } from "react";
import { faqData } from "../data/agencyData";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FAQAccordion: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3" id="faq-accordion-container">
      {faqData.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-[#141814] border-[#A3FF12]/30 shadow-[0_0_20px_rgba(163,255,18,0.05)]"
                : "bg-[#101310] border-white/[0.08] hover:border-white/20"
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12]"
              aria-expanded={isOpen}
              id={`faq-item-toggle-${index}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#A3FF12] px-2 py-0.5 rounded bg-[#080A08] border border-[#A3FF12]/20">
                  0{index + 1}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#F5F7F2]">
                  {item.question}
                </span>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? "bg-[#A3FF12] text-[#080A08]"
                    : "bg-[#080A08] text-[#A7ADA5] border border-white/10"
                }`}
              >
                {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#A7ADA5] leading-relaxed border-t border-white/[0.04]">
                    <p>{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
