import React from "react";
import { TestimonialItem } from "../data/agencyData";
import { Quote, Sparkles } from "lucide-react";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="p-7 sm:p-8 rounded-xl bg-[#141814] border border-white/[0.08] hover:border-[#A3FF12]/30 transition-all duration-300 flex flex-col justify-between h-full relative group">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#101310] border border-white/10 flex items-center justify-center text-[#A3FF12]">
            <Quote className="w-5 h-5 fill-current opacity-80" />
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#080A08] border border-[#A3FF12]/20 text-[#A3FF12] uppercase tracking-wider">
            {testimonial.industry}
          </span>
        </div>

        <p className="text-sm sm:text-base text-[#F5F7F2] leading-relaxed mb-6 font-normal">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">{testimonial.clientRole}</p>
            <p className="text-xs text-[#A7ADA5]">{testimonial.company}</p>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-[11px] font-mono text-[#A3FF12] bg-[#101310] px-2.5 py-1 rounded border border-[#A3FF12]/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {testimonial.impact}
          </span>
        </div>
      </div>
    </div>
  );
};
