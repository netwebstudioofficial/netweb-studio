import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export const ContactForm = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "₹10,000–₹20,000",
    message: "",
  });

  // Netlify Honeypot Anti-Spam Field
  const [botField, setBotField] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [errors, setErrors] = useState({});

  // Pre-fill message or service if coming from specific query links
  useEffect(() => {
    const project = searchParams.get("project");
    const industry = searchParams.get("industry");
    const auditId = searchParams.get("audit");
    const serviceParam = searchParams.get("service");

    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        service: serviceParam,
      }));
    }

    if (project) {
      setFormData((prev) => ({
        ...prev,
        message: `Hello NETWEB STUDIO, I reviewed your work on "${project}" and would like to build a project with comparable aesthetic standards and high performance.`,
      }));
    } else if (industry) {
      setFormData((prev) => ({
        ...prev,
        service: "Web Development",
        message: `Hello NETWEB STUDIO, I run a business in the ${industry} sector and want to commission a modern digital platform.`,
      }));
    } else if (auditId) {
      setFormData((prev) => ({
        ...prev,
        service: "Website Redesign",
        message: `Hello NETWEB STUDIO, I submitted Audit Request #${auditId} and would like to review recommendations with your engineering team.`,
      }));
    }
  }, [searchParams]);

  const serviceOptions = [
    "Web Development",
    "E-Commerce",
    "Web Application",
    "UI/UX Design",
    "AI Automation",
    "AI Chatbots",
    "Redesign",
    "Maintenance",
    "Other",
  ];

  const budgetOptions = [
    "Under ₹5,000",
    "₹5,000–₹10,000",
    "₹10,000–₹20,000",
    "₹20,000+",
  ];

  // Validation functions
  const validateName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return "Full name is required.";
    }
    if (trimmed.length < 2) {
      return "Name must be at least 2 characters long.";
    }
    return null;
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) {
      return "Email address is required.";
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(trimmed)) {
      return "Please enter a valid email address (e.g. name@company.com).";
    }
    return null;
  };

  const validatePhone = (phone) => {
    const trimmed = phone.trim();
    if (!trimmed) {
      return null;
    }
    const digitsOnly = trimmed.replace(/\D/g, "");
    const phonePattern = /^(\+?[0-9\s\-\(\).]{7,25})$/;
    if (!phonePattern.test(trimmed) || digitsOnly.length < 7 || digitsOnly.length > 15) {
      return "Please enter a valid phone number (7 to 15 digits).";
    }
    return null;
  };

  const validateMessage = (message) => {
    const trimmed = message.trim();
    if (!trimmed) {
      return "Message is required.";
    }
    if (trimmed.length < 10) {
      return "Please provide at least 10 characters describing your project.";
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear live field error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  const handleBlur = (field) => {
    let err = null;
    if (field === "name") err = validateName(formData.name);
    else if (field === "email") err = validateEmail(formData.email);
    else if (field === "phone") err = validatePhone(formData.phone);
    else if (field === "message") err = validateMessage(formData.message);

    if (err) {
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);

    // If bot filled the honeypot field, simulate completion silently without processing
    if (botField) {
      setIsSubmitted(true);
      return;
    }

    // Client-side validation
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);

    const validationErrors = {};
    if (nameError) validationErrors.name = nameError;
    if (emailError) validationErrors.email = emailError;
    if (phoneError) validationErrors.phone = phoneError;
    if (messageError) validationErrors.message = messageError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus on first invalid field
      if (validationErrors.name) {
        document.getElementById("contact-name")?.focus();
      } else if (validationErrors.email) {
        document.getElementById("contact-email")?.focus();
      } else if (validationErrors.phone) {
        document.getElementById("contact-phone")?.focus();
      } else if (validationErrors.message) {
        document.getElementById("contact-message")?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Real Netlify Forms submission via POST request
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
          "form-name": "netweb-contact",
          "bot-field": botField,
          name: formData.name.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          budget: formData.budget,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Netlify form submission failed with status " + response.status);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Netlify form submission error:", err);
      setSubmissionError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full bg-[#101310] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
      id="contact-form-container"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient pointer-events-none" />

      {/* SUCCESS STATE */}
      {isSubmitted ? (
        <div
          className="text-center py-12 px-4 max-w-lg mx-auto space-y-4 animate-fade-in"
          id="contact-success-state"
        >
          <div className="w-16 h-16 rounded-full bg-[#A3FF12] text-[#080A08] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(163,255,18,0.4)]">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Message Received.
          </h3>
          <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed">
            Thanks for reaching out to NETWEB STUDIO. We'll get back to you shortly.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  businessName: "",
                  email: "",
                  phone: "",
                  service: "Web Development",
                  budget: "₹10,000–₹20,000",
                  message: "",
                });
                setBotField("");
                setErrors({});
                setSubmissionError(null);
              }}
              className="px-6 py-2.5 rounded-lg bg-[#141814] hover:bg-[#1b221b] border border-white/10 hover:border-[#A3FF12]/50 text-xs font-mono font-bold text-[#A3FF12] transition-colors"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        /* FORM STATE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141814] border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Inquiries</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.08]">
              Let's Talk.
            </h2>

            <p className="text-sm sm:text-base text-[#A7ADA5] leading-relaxed font-normal">
              Tell us what you're building, improving or imagining. Every inquiry is reviewed directly by our founding design &amp; technology team.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-3 text-sm text-[#F5F7F2]">
                <div className="w-8 h-8 rounded bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#A7ADA5] block uppercase">Direct Email</span>
                  <a
                    href={siteConfig.gmailLink || `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#A3FF12] transition-colors font-medium"
                    id="contact-form-email-link"
                    title="Compose message on Gmail"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#F5F7F2]">
                <div className="w-8 h-8 rounded bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#A7ADA5] block uppercase">Direct Studio Lines</span>
                  <a
                    href="tel:+917862040387"
                    className="hover:text-[#A3FF12] transition-colors font-medium block text-sm"
                    id="contact-form-phone-primary"
                  >
                    {siteConfig.primaryPhone}
                  </a>
                  <a
                    href="tel:+918144951561"
                    className="hover:text-[#A3FF12] transition-colors text-xs text-[#A7ADA5] block"
                    id="contact-form-phone-secondary"
                  >
                    {siteConfig.secondaryPhone}
                  </a>
                  <a
                    href="tel:+917750870859"
                    className="hover:text-[#A3FF12] transition-colors text-xs text-[#A7ADA5] block"
                    id="contact-form-phone-additional"
                  >
                    {siteConfig.additionalPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#F5F7F2]">
                <div className="w-8 h-8 rounded bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#A7ADA5] block uppercase">Studio Base</span>
                  <span className="font-medium text-[#F5F7F2]">{siteConfig.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141814] border border-white/[0.06] text-xs text-[#A7ADA5] space-y-1">
              <p className="font-semibold text-white">Guaranteed Response Standard:</p>
              <p>We do not assign clients to junior account reps. You collaborate directly with experienced technologists and designers.</p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#141814] border border-white/[0.08] rounded-xl p-6 sm:p-8 relative">
            {/* Submission Error Banner */}
            {submissionError && (
              <div
                className="p-3.5 rounded-lg bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5 mb-5 shadow-lg animate-fade-in"
                role="alert"
                id="contact-form-error"
              >
                <AlertCircle className="w-4 h-4 text-[#FF5F56] shrink-0" />
                <span className="font-medium">{submissionError}</span>
              </div>
            )}

            {/* REAL NETLIFY FORM */}
            <form
              name="netweb-contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
              id="netweb-contact-form"
            >
              {/* Hidden form-name input required for Netlify Forms */}
              <input type="hidden" name="form-name" value="netweb-contact" />

              {/* Netlify Honeypot anti-spam field */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Don't fill this out if you're human:{" "}
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase text-white/70 mb-1.5"
                  >
                    Full Name <span className="text-[#A3FF12]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Debasish Ojha"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`w-full bg-[#080A08] border rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                      errors.name
                        ? "border-[#FF5F56] focus:border-[#FF5F56]"
                        : "border-white/10 focus:border-[#A3FF12]"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[11px] text-[#FF5F56] font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-business-name"
                    className="block text-xs font-mono uppercase text-white/70 mb-1.5"
                  >
                    Business Name
                  </label>
                  <input
                    id="contact-business-name"
                    name="businessName"
                    type="text"
                    placeholder="e.g. Apex Living"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    className="w-full bg-[#080A08] border border-white/10 focus:border-[#A3FF12] rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase text-white/70 mb-1.5"
                  >
                    Email <span className="text-[#A3FF12]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full bg-[#080A08] border rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-[#FF5F56] focus:border-[#FF5F56]"
                        : "border-white/10 focus:border-[#A3FF12]"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[11px] text-[#FF5F56] font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-mono uppercase text-white/70 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 78620 40387"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full bg-[#080A08] border rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                      errors.phone
                        ? "border-[#FF5F56] focus:border-[#FF5F56]"
                        : "border-white/10 focus:border-[#A3FF12]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-[11px] text-[#FF5F56] font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                  Service Required
                </label>
                {/* Hidden input to ensure value serialization in form */}
                <input type="hidden" name="service" value={formData.service} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleInputChange("service", opt)}
                      className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all text-center ${
                        formData.service === opt
                          ? "bg-[#080A08] text-[#A3FF12] border-[#A3FF12] shadow-[0_0_12px_rgba(163,255,18,0.2)]"
                          : "bg-[#080A08] text-[#A7ADA5] border-white/10 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                  Budget
                </label>
                {/* Hidden input to ensure value serialization in form */}
                <input type="hidden" name="budget" value={formData.budget} />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleInputChange("budget", b)}
                      className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all text-center ${
                        formData.budget === b
                          ? "bg-[#080A08] text-[#A3FF12] border-[#A3FF12] shadow-[0_0_12px_rgba(163,255,18,0.2)]"
                          : "bg-[#080A08] text-[#A7ADA5] border-white/10 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase text-white/70 mb-1.5"
                >
                  Message <span className="text-[#A3FF12]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Share current challenges, links to your current site or inspiration, target timelines, and core business goals..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`w-full bg-[#080A08] border rounded-md px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none resize-none leading-relaxed transition-colors ${
                    errors.message
                      ? "border-[#FF5F56] focus:border-[#FF5F56]"
                      : "border-white/10 focus:border-[#A3FF12]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-[11px] text-[#FF5F56] font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-contact-button"
                  className={`w-full py-3.5 px-6 rounded-lg font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-[#182018] text-[#A7ADA5] border border-white/10 cursor-not-allowed opacity-80"
                      : "bg-[#A3FF12] text-[#080A08] hover:bg-[#8ee60d] hover:shadow-[0_0_20px_rgba(163,255,18,0.4)] cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#A7ADA5] border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND PROJECT INQUIRY</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
