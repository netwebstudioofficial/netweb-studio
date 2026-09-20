/**
 * NETWEB STUDIO API & Storage Services
 * Prepared for future Node.js / Express API integration
 * Stores client-side records in localStorage for seamless persistence and demo inspection.
 */

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  createdAt?: string;
  instagramUrl?: string;
}

export interface AuditFormData {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  websiteUrl: string;
  instagramUrl?: string;
  mainGoal: string;
  createdAt?: string;
}

export interface QuoteRequestData {
  businessType: string;
  pages: string;
  features: string[];
  estimatedRange: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
  createdAt?: string;
}

export interface AuditDemoResult {
  performanceScore: number;
  mobileScore: number;
  seoScore: number;
  conversionScore: number;
  grade: string;
  keyIssues: string[];
  recommendations: string[];
  timestamp: string;
}

const STORAGE_KEYS = {
  CONTACT: "netweb_contact_submissions",
  AUDIT: "netweb_audit_submissions",
  QUOTES: "netweb_quote_submissions",
};

const encodeFormData = (data: Record<string, string>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

/**
 * Submit Contact Inquiry via Netlify Forms
 */
export async function submitContactForm(
  data: ContactFormData,
  botField: string = "",
): Promise<{ success: boolean; message: string; id: string }> {
  if (!data.name || !data.email || !data.message) {
    throw new Error("Please fill in your name, email and project message.");
  }

  const payload: Record<string, string> = {
    "form-name": "netweb-contact",
    "bot-field": botField,
    name: data.name.trim(),
    businessName: (data.businessName || "").trim(),
    email: data.email.trim(),
    phone: (data.phone || "").trim(),
    service: data.service || "Web Development",
    budget: data.budget || "₹10,000–₹20,000",
    message: data.message.trim(),
  };

  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeFormData(payload),
  });

  if (!response.ok) {
    throw new Error(
      "Something went wrong. Please try again or contact us directly.",
    );
  }

  const submissionId =
    "NW-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  try {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CONTACT) || "[]",
    );

    existing.unshift({
      ...data,
      id: submissionId,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(existing));
  } catch (e) {
    // Non-blocking localStorage error
  }

  return {
    success: true,
    message:
      "Thanks for reaching out to NETWEB STUDIO. We'll get back to you shortly.",
    id: submissionId,
  };
}

/**
 * Submit Website Audit Request & Generate Demo Scan Metrics
 */
export async function submitAuditForm(data: AuditFormData): Promise<{
  success: boolean;
  result: AuditDemoResult;
  id: string;
  message: string;
}> {
  await new Promise((res) => setTimeout(res, 600));

  if (!data.businessName || !data.name || !data.email || !data.websiteUrl) {
    throw new Error(
      "Business name, your name, email and website URL are required.",
    );
  }

  const payload = {
    ...data,
    id: "AUD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.AUDIT) || "[]",
    );

    existing.unshift(payload);

    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(existing));
  } catch (e) {
    console.error("Local storage error:", e);
  }

  const result: AuditDemoResult = {
    performanceScore: 78,
    mobileScore: 86,
    seoScore: 71,
    conversionScore: 64,
    grade: "B- (Optimization Needed)",

    keyIssues: [
      "Large uncompressed hero media slowing down first contentful paint (FCP)",
      "Unclear primary CTA hierarchy above the mobile fold",
      "Missing local business schema markup and OpenGraph social metadata",
      "No frictionless instant inquiry channel (e.g., direct Telegram / booking)",
    ],

    recommendations: [
      "Re-architect frontend to modern Vite/React static generation with modern WebP/AVIF delivery",
      "Introduce high-contrast, conversion-tested action buttons with direct lead capture",
      "Implement structured JSON-LD schema for search engines and local ranking",
      "Consolidate mobile layout to 0 horizontal overflow with sub-1.2s tap responsiveness",
    ],

    timestamp: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  return {
    success: true,
    id: payload.id,
    result,
    message:
      "Audit Request Received. Our engineering team is preparing your custom comprehensive breakdown.",
  };
}

/**
 * Submit Quote Request from Pricing Estimator
 */
export async function submitQuoteRequest(
  data: QuoteRequestData,
): Promise<{ success: boolean; id: string; message: string }> {
  await new Promise((res) => setTimeout(res, 400));

  const payload = {
    ...data,
    id: "QUO-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.QUOTES) || "[]",
    );

    existing.unshift(payload);

    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(existing));
  } catch (e) {
    console.error("Local storage error:", e);
  }

  return {
    success: true,
    id: payload.id,
    message:
      "Quote request saved. We will review your scope specifications and prepare a formal estimate.",
  };
}
