import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeMetaMap = {
  "/": {
    title: "NETWEB STUDIO — Digital Experiences. Built to Perform.",
    description: "NETWEB STUDIO engineers bespoke websites, high-performance web applications, and conversion-focused digital systems designed for ambitious businesses.",
  },
  "/services": {
    title: "Services & Capabilities — NETWEB STUDIO",
    description: "Explore our web development, UI/UX architecture, performance optimization, and digital growth services engineered to scale your business.",
  },
  "/solutions": {
    title: "Industry Solutions — NETWEB STUDIO",
    description: "Category-specific digital architectures tailored for restaurants, salons, gyms, healthcare clinics, and real estate enterprises.",
  },
  "/process": {
    title: "Engineering Process — NETWEB STUDIO",
    description: "Our structured 4-step deployment framework: Discover, Design & Architect, Build & Optimize, and Deploy & Scale.",
  },
  "/pricing": {
    title: "Investment & Pricing Calculator — NETWEB STUDIO",
    description: "Transparent website pricing tiers and interactive project scope calculator with zero hidden fees.",
  },
  "/about": {
    title: "About Our Studio — NETWEB STUDIO",
    description: "Learn about NETWEB STUDIO's engineering standards, technology principles, and dedication to performance-first digital craft.",
  },
  "/contact": {
    title: "Contact & Project Inquiries — NETWEB STUDIO",
    description: "Get in touch with NETWEB STUDIO. Inquire directly via Gmail, Telegram, or our structured project questionnaire.",
  },
  "/audit": {
    title: "Free Website & Growth Audit — NETWEB STUDIO",
    description: "Request a complimentary diagnostic assessment of your current website speed, mobile UX, SEO markup, and conversion bottlenecks.",
  },
};

export const RouteSeoHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMetaMap[location.pathname] || routeMetaMap["/"];
    document.title = meta.title;

    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute("content", meta.description);
    }

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", meta.title);
    }

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute("content", meta.description);
    }
  }, [location.pathname]);

  return null;
};
