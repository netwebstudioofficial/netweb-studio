import React, { useState } from "react";
import { Button } from "./Button";
import { submitQuoteRequest } from "../services/apiService";
import { Check, Sparkles, Calculator, Send, AlertCircle } from "lucide-react";

export const PricingCalculator: React.FC = () => {
  const [businessType, setBusinessType] = useState<string>("Restaurant");
  const [pagesRange, setPagesRange] = useState<string>("4–6");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Telegram",
    "Booking",
    "SEO",
  ]);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const businessTypes = [
    "Restaurant",
    "Hotel",
    "Salon",
    "Gym",
    "Clinic",
    "Real Estate",
    "Startup",
    "Other",
  ];

  const pageOptions = ["1–3", "4–6", "7–10", "10+"];

  const featureOptions = [
    { id: "Telegram", label: "Telegram Direct Ordering / Lead Routing", cost: 1500 },
    { id: "Booking", label: "Interactive Booking & Appointments", cost: 2500 },
    { id: "Gallery", label: "High-Res Curated Media Gallery", cost: 1000 },
    { id: "Payment", label: "Payment Gateway Integration (Stripe/Razorpay)", cost: 3000 },
    { id: "Admin Dashboard", label: "Admin Content / Inquiry Management", cost: 4500 },
    { id: "SEO", label: "Comprehensive Technical & Schema SEO", cost: 2000 },
    { id: "Analytics", label: "Conversion Tracking & Analytics Funnels", cost: 1500 },
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((item) => item !== featureId)
        : [...prev, featureId]
    );
  };

  // Compute realistic pricing range
  const calculateEstimate = () => {
    let base = 4999;
    if (pagesRange === "4–6") base = 8999;
    if (pagesRange === "7–10") base = 14999;
    if (pagesRange === "10+") base = 21999;

    const featureSum = selectedFeatures.reduce((acc, feat) => {
      const match = featureOptions.find((f) => f.id === feat);
      return acc + (match ? match.cost : 1000);
    }, 0);

    const totalEstimate = base + featureSum;

    if (totalEstimate < 10000) {
      return {
        tier: "Starter Tier",
        rangeText: `₹${totalEstimate.toLocaleString()} – ₹${(totalEstimate + 3000).toLocaleString()}`,
        badge: "₹4,999+ Base",
      };
    } else if (totalEstimate < 20000) {
      return {
        tier: "Business Tier",
        rangeText: `₹${totalEstimate.toLocaleString()} – ₹${(totalEstimate + 5000).toLocaleString()}`,
        badge: "₹9,999+ Base",
      };
    } else {
      return {
        tier: "Premium Tier",
        rangeText: `₹${totalEstimate.toLocaleString()} – ₹${(totalEstimate + 8000).toLocaleString()}`,
        badge: "₹19,999+ Base",
      };
    }
  };

  const estimate = calculateEstimate();

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitQuoteRequest({
        businessType,
        pages: pagesRange,
        features: selectedFeatures,
        estimatedRange: estimate.rangeText,
        clientName,
        clientEmail,
        clientPhone,
      });
      setSubmittedId(res.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#101310] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden" id="pricing-estimator-container">
      <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Interactive Selection Inputs */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Business Type */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider font-mono block mb-3">
              1. Select Your Business Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {businessTypes.map((type) => {
                const active = businessType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBusinessType(type)}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer border ${
                      active
                        ? "bg-[#141814] text-[#A3FF12] border-[#A3FF12]"
                        : "bg-[#080A08] text-[#A7ADA5] border-white/10 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Page Volume */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider font-mono block mb-3">
              2. Number of Custom Pages / Sections
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pageOptions.map((opt) => {
                const active = pagesRange === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPagesRange(opt)}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer border ${
                      active
                        ? "bg-[#141814] text-[#A3FF12] border-[#A3FF12]"
                        : "bg-[#080A08] text-[#A7ADA5] border-white/10 hover:text-white"
                    }`}
                  >
                    {opt} Pages
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: High-Value Features */}
          <div>
            <label className="text-xs font-bold text-white uppercase tracking-wider font-mono block mb-3">
              3. Functional Capabilities Needed
            </label>
            <div className="space-y-2">
              {featureOptions.map((feat) => {
                const selected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                      selected
                        ? "bg-[#141814] text-white border-[#A3FF12]/40"
                        : "bg-[#080A08] text-[#A7ADA5] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          selected
                            ? "bg-[#A3FF12] border-[#A3FF12] text-[#080A08]"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-medium">{feat.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output & Request Summary Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#141814] border border-[#A3FF12]/30 shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#080A08] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono font-bold uppercase">
                <Calculator className="w-3.5 h-3.5" />
                {estimate.tier}
              </span>
              <span className="text-[11px] font-mono text-[#A7ADA5]">
                {estimate.badge}
              </span>
            </div>

            <p className="text-xs text-[#A7ADA5] uppercase tracking-wider font-mono">
              Estimated Investment Range
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] my-2 tracking-tight">
              {estimate.rangeText}
            </h3>

            <p className="text-xs text-[#A3FF12] font-semibold flex items-center gap-1.5 bg-[#080A08] p-3 rounded border border-white/10 my-4">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Includes bespoke design, responsive code, and Core Web Vitals optimization.</span>
            </p>

            {/* Selected Summary chips */}
            <div className="space-y-1.5 text-xs text-[#A7ADA5] mb-6">
              <p><strong className="text-white">Business:</strong> {businessType}</p>
              <p><strong className="text-white">Scope:</strong> {pagesRange} Custom Pages</p>
              <p><strong className="text-white">Features:</strong> {selectedFeatures.join(", ") || "Standard Launch Foundation"}</p>
            </div>

            {/* Prompt Mandated Notice */}
            <div className="p-3 rounded bg-[#080A08]/60 border border-white/[0.08] text-[11px] text-[#A7ADA5] mb-6 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#A3FF12] shrink-0 mt-0.5" />
              <p>
                <strong>Important:</strong> Estimated project range. Final pricing depends on requirements.
              </p>
            </div>
          </div>

          {/* Quick Quote Submission Form */}
          {submittedId ? (
            <div className="p-4 rounded-lg bg-[#080A08] border border-[#A3FF12] text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#A3FF12] text-[#080A08] flex items-center justify-center mx-auto">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <p className="font-bold text-white text-sm">Quote Request Saved</p>
              <p className="text-xs text-[#A7ADA5]">
                Reference ID: <span className="font-mono text-[#A3FF12]">{submittedId}</span>
              </p>
              <p className="text-xs text-[#A7ADA5]">
                We will email a structured proposal based on your selected parameters.
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded px-3 py-2 text-xs text-white focus:outline-none placeholder:text-white/30"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded px-3 py-2 text-xs text-white focus:outline-none placeholder:text-white/30"
                />
                <input
                  type="tel"
                  placeholder="Phone / Telegram"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded px-3 py-2 text-xs text-white focus:outline-none placeholder:text-white/30"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                withArrow
                isLoading={isSubmitting}
                className="w-full"
                id="submit-pricing-quote"
              >
                REQUEST A QUOTE →
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
