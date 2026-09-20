import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { Button } from "../components/Button";
import { servicesData } from "../data/agencyData";
import { AiVisualShowcase } from "../components/AiVisualShowcase";
import { RevealOnScroll } from "../components/RevealOnScroll";
import {
  Layout,
  ShoppingBag,
  Layers,
  Palette,
  RefreshCw,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Cpu,
  Bot,
  Zap,
  TrendingUp,
} from "lucide-react";

export const ServicesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Layout":
        return <Layout className="w-8 h-8 text-[#A3FF12]" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-8 h-8 text-[#A3FF12]" />;
      case "Layers":
        return <Layers className="w-8 h-8 text-[#A3FF12]" />;
      case "Palette":
        return <Palette className="w-8 h-8 text-[#A3FF12]" />;
      case "RefreshCw":
        return <RefreshCw className="w-8 h-8 text-[#A3FF12]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-[#A3FF12]" />;
      case "Cpu":
        return <Cpu className="w-8 h-8 text-[#A3FF12]" />;
      case "Bot":
        return <Bot className="w-8 h-8 text-[#A3FF12]" />;
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-[#A3FF12]" />;
      default:
        return <Layout className="w-8 h-8 text-[#A3FF12]" />;
    }
  };

  return (
    <div className="w-full pt-28 pb-20 relative overflow-hidden">
      {/* Background Visual Effects - Glowing Mesh & Ambient Beams */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#A3FF12]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] rounded-full bg-[#A3FF12]/5 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Page Header */}
      <section className="border-b border-white/[0.08] pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Studio Capabilities
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              DIGITAL CRAFT. <br />
              <span className="text-[#A3FF12]">ENGINEERED TO PERFORM.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              We reject off-the-shelf templates and slow bloated themes. Every client engagement receives tailored strategic planning, high-contrast bespoke UI design, intelligent AI automation, and modern TypeScript architecture.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Interactive AI Automation & Chatbot Visual Showcase Section */}
      <section className="py-16 sm:py-20 border-b border-white/[0.08] bg-[#0a0d0a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-3">
              NEXT-GEN AI AUTOMATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              AI AGENTS & AUTONOMOUS PIPELINES
            </h2>
            <p className="text-xs sm:text-sm text-[#A7ADA5] mt-2">
              Transform static web traffic into 24/7 autonomous revenue streams and automated customer workflows.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <AiVisualShowcase />
          </RevealOnScroll>
        </div>
      </section>

      {/* Deep Service List */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {servicesData.map((service) => (
            <RevealOnScroll
              key={service.id}
              id={service.id}
              className="p-8 sm:p-12 rounded-2xl bg-[#101310] border border-white/[0.08] hover:border-[#A3FF12]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden group shadow-lg hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(163,255,18,0.06)]"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A3FF12]/40 to-transparent group-hover:via-[#A3FF12] transition-colors" />

              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-[#A3FF12] px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/30">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-lg bg-[#141814] border border-white/10 flex items-center justify-center group-hover:border-[#A3FF12]/30 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F7F2] tracking-tight group-hover:text-white transition-colors">
                  {service.title}
                </h2>

                <p className="text-base text-[#A7ADA5] leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Deliverables checklist */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                    Scope & Technical Deliverables:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F5F7F2] px-3 py-2 rounded bg-[#141814] border border-white/[0.06] group-hover:border-white/[0.1] transition-colors"
                      >
                        <Check className="w-4 h-4 text-[#A3FF12] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview, Key Metric & CTA */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-[#141814] border border-white/[0.08] flex flex-col justify-between h-full group-hover:border-[#A3FF12]/20 transition-colors">
                <div>
                  {/* Service Visual Preview Banner */}
                  <div className="relative w-full h-36 rounded-lg overflow-hidden mb-5 border border-white/[0.08] bg-[#0A0D0A]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141814] via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-[#080A08]/90 border border-white/10 font-mono text-[10px] text-[#A3FF12]">
                      netweb.studio/{service.id}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#080A08] border border-[#A3FF12]/20 text-[#A3FF12] text-xs font-mono mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineered Outcome</span>
                  </div>

                  <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-1">
                    Production Stack
                  </p>
                  <p className="text-sm font-bold text-[#A3FF12] font-mono mb-4">
                    {service.techStack.join(" • ")}
                  </p>

                  <div className="p-3.5 rounded-lg bg-[#080A08] border border-white/[0.06] text-xs text-[#A7ADA5] space-y-1.5">
                    <p className="font-semibold text-white">Delivery Benchmark:</p>
                    <p>Sub-1.0s loading, fully responsive from 320px to 4K displays, complete on-page SEO schema, and clean handover documentation.</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Button
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    variant="primary"
                    size="md"
                    withArrow
                    className="w-full"
                  >
                    Inquire for {service.title}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 relative">
        <RevealOnScroll>
          <h3 className="text-3xl font-extrabold text-white mb-4 uppercase">
            Unsure which service matches your current stage?
          </h3>
          <p className="text-sm text-[#A7ADA5] mb-6">
            Schedule a direct architecture consultation with our engineering team or request a complimentary website performance audit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Book Strategy Call
            </Button>
            <Button to="/audit" variant="lime-outline" size="lg">
              Get Free Audit
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};
