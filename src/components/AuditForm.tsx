import React, { useState } from "react";
import {
  submitAuditForm,
  AuditFormData,
  AuditDemoResult,
} from "../services/apiService";
import { Button } from "./Button";
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Activity,
  Smartphone,
  Search,
  Target,
} from "lucide-react";

export const AuditForm: React.FC = () => {
  const [formData, setFormData] = useState<AuditFormData>({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    businessType: "Restaurant",
    websiteUrl: "",
    instagramUrl: "",
    mainGoal: "Increase Inquiries & Bookings",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [demoResult, setDemoResult] = useState<AuditDemoResult | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const businessTypes = [
    "Restaurant / Café",
    "Hotel / Resort",
    "Salon / Spa",
    "Fitness / Gym",
    "Healthcare / Clinic",
    "Real Estate / Architecture",
    "Education / Academy",
    "E-Commerce Store",
    "Startup / SaaS",
    "Other Professional Service",
  ];

  const goals = [
    "Increase Inquiries & Bookings",
    "Fix Mobile Usability & Speed",
    "Redesign Outdated Visual Identity",
    "Rank Higher on Google / Local SEO",
    "Direct Telegram / Online Orders",
    "Complete Digital Re-Platforming",
  ];

  /*
   * Convert form data into URL-encoded format
   * for Netlify Forms.
   */
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.businessName ||
      !formData.name ||
      !formData.email ||
      !formData.websiteUrl
    ) {
      setErrorMessage(
        "Please fill in business name, your name, email, and current website URL.",
      );
      return;
    }

    setIsLoading(true);

    try {
      /*
       * 1. Submit Free Audit to Netlify Forms
       */
      const netlifyResponse = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
          "form-name": "netweb-free-audit",
          "bot-field": "",

          businessName: formData.businessName.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          websiteUrl: formData.websiteUrl.trim(),
          instagramUrl: (formData.instagramUrl || "").trim(),
          businessType: formData.businessType,
          mainGoal: formData.mainGoal,
        }),
      });

      if (!netlifyResponse.ok) {
        throw new Error("Unable to submit audit request. Please try again.");
      }

      /*
       * 2. Keep the existing audit/demo system
       */
      const res = await submitAuditForm(formData);

      setSubmittedId(res.id);
      setDemoResult(res.result);
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to submit audit request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-[#101310] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      id="audit-form-container"
    >
      {/* Background visual aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient pointer-events-none" />

      {!demoResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Description & Value Props */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Studio Review</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F2] tracking-tight uppercase leading-[1.15]">
              Is Your Website Working Hard Enough?
            </h3>

            <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed font-normal">
              Get a quick look at where your current website can improve. Our
              engineering and design team reviews your site against 4 critical
              dimensions: speed, mobile responsiveness, search ranking, and
              conversion flow.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-[#F5F7F2]">
                <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>

                <div>
                  <strong className="text-white block">
                    Speed & Core Web Vitals
                  </strong>
                  <span className="text-[#A7ADA5]">
                    Pinpoint scripts and uncompressed assets dragging down load
                    times.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#F5F7F2]">
                <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>

                <div>
                  <strong className="text-white block">
                    Mobile User Journey
                  </strong>
                  <span className="text-[#A7ADA5]">
                    Audit tap targets, navigation clarity, and horizontal
                    overflow issues.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#F5F7F2]">
                <div className="w-5 h-5 rounded bg-[#A3FF12]/10 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <Target className="w-3.5 h-3.5" />
                </div>

                <div>
                  <strong className="text-white block">
                    Conversion Optimization
                  </strong>
                  <span className="text-[#A7ADA5]">
                    Identify where high-intent visitors hesitate and drop off.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#141814] border border-white/[0.08] text-xs text-[#A7ADA5]">
              🔒 100% confidential. No spam, no sales harassment. Just
              actionable technical insights.
            </div>
          </div>

          {/* Form Inputs */}
          <div className="lg:col-span-7 bg-[#141814] border border-white/[0.08] rounded-xl p-6 sm:p-8">
            {errorMessage && (
              <div className="p-3 rounded bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form
              name="netweb-free-audit"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Netlify form identification */}
              <input type="hidden" name="form-name" value="netweb-free-audit" />

              {/* Honeypot spam protection */}
              <input
                type="text"
                name="bot-field"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Business Name *
                  </label>

                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="e.g. Lumenor Estate Group"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessName: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Work Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Phone / Telegram Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 78620 40387"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Current Website URL *
                  </label>

                  <input
                    type="text"
                    name="websiteUrl"
                    required
                    placeholder="https://yourwebsite.com"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        websiteUrl: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Instagram Handle (Optional)
                  </label>

                  <input
                    type="text"
                    name="instagramUrl"
                    placeholder="@yourbusiness"
                    value={formData.instagramUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instagramUrl: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Business Sector
                  </label>

                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessType: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {businessTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-[#101310] text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                    Primary Digital Objective
                  </label>

                  <select
                    name="mainGoal"
                    value={formData.mainGoal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mainGoal: e.target.value,
                      })
                    }
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {goals.map((goal) => (
                      <option
                        key={goal}
                        value={goal}
                        className="bg-[#101310] text-white"
                      >
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  withArrow
                  isLoading={isLoading}
                  className="w-full uppercase font-extrabold tracking-normal text-sm"
                  id="submit-audit-button"
                >
                  GET MY FREE AUDIT →
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8" id="audit-results-view">
          {/* Header banner */}
          <div className="p-6 rounded-xl bg-[#141814] border border-[#A3FF12]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A3FF12] text-[#080A08] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-white">
                  Audit Request Received
                </h4>

                <p className="text-xs text-[#A7ADA5]">
                  Target:{" "}
                  <span className="text-white font-mono">
                    {formData.websiteUrl}
                  </span>{" "}
                  • Request ID:{" "}
                  <span className="text-[#A3FF12] font-mono">
                    {submittedId}
                  </span>
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1.5 rounded bg-[#080A08] border border-white/10 text-[#A7ADA5]">
              Saved to Studio Queue
            </span>
          </div>

          {/* Demo Notice */}
          <div className="p-4 rounded-lg bg-[#141814] border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />

            <div>
              <strong className="block font-bold uppercase tracking-wider font-mono text-amber-200">
                Demo Audit Preview
              </strong>

              <span>
                Note: In preview mode without live domain crawlers, the baseline
                scores below demonstrate example metric diagnostics. Our senior
                technologists will perform your actual live diagnostic report
                and email the complete breakdown to{" "}
                <strong className="text-white">{formData.email}</strong>.
              </span>
            </div>
          </div>

          {/* Metric Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#141814] border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#A7ADA5]">
                  Performance
                </span>

                <Activity className="w-4 h-4 text-[#A3FF12]" />
              </div>

              <p className="text-4xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">
                {demoResult.performanceScore}/100
              </p>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#A3FF12] h-full"
                  style={{
                    width: `${demoResult.performanceScore}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#141814] border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#A7ADA5]">
                  Mobile Experience
                </span>

                <Smartphone className="w-4 h-4 text-[#A3FF12]" />
              </div>

              <p className="text-4xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">
                {demoResult.mobileScore}/100
              </p>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#A3FF12] h-full"
                  style={{
                    width: `${demoResult.mobileScore}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#141814] border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#A7ADA5]">
                  SEO Quality
                </span>

                <Search className="w-4 h-4 text-[#A3FF12]" />
              </div>

              <p className="text-4xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">
                {demoResult.seoScore}/100
              </p>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#A3FF12] h-full"
                  style={{
                    width: `${demoResult.seoScore}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#141814] border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#A7ADA5]">
                  Conversion
                </span>

                <Target className="w-4 h-4 text-[#A3FF12]" />
              </div>

              <p className="text-4xl font-extrabold text-[#A3FF12] font-['Space_Grotesk']">
                {demoResult.conversionScore}/100
              </p>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#A3FF12] h-full"
                  style={{
                    width: `${demoResult.conversionScore}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Detected Bottlenecks & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#141814] border border-white/[0.08] space-y-3">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Key Detected UX/Speed Friction Points
              </h4>

              <ul className="space-y-2 text-xs sm:text-sm text-[#A7ADA5]">
                {demoResult.keyIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0 font-mono">✕</span>

                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-[#141814] border border-[#A3FF12]/20 space-y-3">
              <h4 className="text-xs font-bold text-[#A3FF12] uppercase font-mono tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                NETWEB High-Impact Recommendations
              </h4>

              <ul className="space-y-2 text-xs sm:text-sm text-[#F5F7F2]">
                {demoResult.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#A3FF12] shrink-0 font-mono">✓</span>

                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Step Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
            <p className="text-xs text-[#A7ADA5]">
              Ready to resolve these bottlenecks with a high-performance custom
              build?
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                to={`/contact?audit=${encodeURIComponent(submittedId || "")}`}
                variant="primary"
                size="md"
                withArrow
                className="w-full sm:w-auto"
              >
                Discuss Fixes With NETWEB →
              </Button>

              <button
                onClick={() => setDemoResult(null)}
                className="text-xs text-[#A7ADA5] hover:text-white px-3 py-2"
              >
                Audit Another Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
