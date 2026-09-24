export const servicesData = [
  {
    id: "web-development",
    number: "01",
    title: "Web Design & Development",
    shortDesc: "High-performance websites built around your business, brand and audience.",
    fullDesc: "We craft custom websites engineered for speed, search visibility, and frictionless user conversion. Every element is built from the ground up to reflect your brand's unique caliber without cookie-cutter templates.",
    deliverables: ["Custom UI/UX Prototypes", "Responsive Frontend Architecture", "SEO-Structured Semantic Markup", "Ultra-Fast Page Load Under 1.2s", "Content Management Ready"],
    techStack: ["React", "Vite", "Tailwind CSS", "Motion"],
    icon: "Layout",
    image: "/assets/services/web-development.webp"
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-Commerce",
    shortDesc: "Conversion-focused online stores designed to make buying simple.",
    fullDesc: "Seamless digital storefronts built to maximize average order value and checkout completion. We eliminate cognitive friction, create intuitive product discovery, and ensure flawless transaction flows.",
    deliverables: ["Frictionless Mobile Checkout", "High-Converting Catalog Architecture", "Payment Gateway Integration", "Inventory & Order Management", "Abandoned Cart Recovery Setup"],
    techStack: ["Shopify / Custom Headless", "Stripe / Razorpay", "Tailwind CSS"],
    icon: "ShoppingBag",
    image: "/assets/services/ecommerce.webp"
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Applications",
    shortDesc: "Custom digital products built for real business workflows.",
    fullDesc: "From client portals and booking engines to internal operations dashboards, we engineer scalable, reliable web applications that automate operations and solve complex business bottlenecks.",
    deliverables: ["Role-Based Access Control", "Interactive Dashboards & Analytics", "Real-Time State Synchronization", "RESTful / GraphQL APIs", "Scalable Database Design"],
    techStack: ["React", "Node.js", "Express", "PostgreSQL / MongoDB"],
    icon: "Layers",
    image: "/assets/services/web-applications.webp"
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UI / UX Design",
    shortDesc: "Interfaces that balance clarity, usability and visual identity.",
    fullDesc: "Deep aesthetic precision married to user-centered psychology. We conduct journey mapping, wireframing, interactive prototyping, and design system governance so your product stands apart.",
    deliverables: ["Interactive Figma Design Systems", "User Journey Flow Maps", "Micro-Interaction Blueprints", "High-Fidelity Wireframes", "Design-to-Code Handoff"],
    techStack: ["Figma", "Design Systems", "Motion Spec", "WCAG AA"],
    icon: "Palette",
    image: "/assets/services/ui-ux.webp"
  },
  {
    id: "website-redesign",
    number: "05",
    title: "Website Redesign",
    shortDesc: "Transform outdated digital experiences into modern products.",
    fullDesc: "Revitalize slow, dated, or fragmented websites. We audit existing performance and UX bottlenecks, retain your SEO equity, and rebuild your platform to meet modern industry benchmarks.",
    deliverables: ["Pre-Launch UX & Speed Audit", "301 Redirect Architecture & SEO Preservation", "Complete Brand Visual Modernization", "Core Web Vitals Remediation"],
    techStack: ["Lighthouse", "React", "Semantic HTML", "Schema.org"],
    icon: "RefreshCw",
    image: "/assets/services/website-redesign.webp"
  },
  {
    id: "maintenance-support",
    number: "06",
    title: "Maintenance & Support",
    shortDesc: "Continuous improvements, updates and technical support after launch.",
    fullDesc: "A dedicated digital technology partner in your corner. We handle security audits, hosting optimization, feature iterations, and regular performance benchmarking so you focus on business growth.",
    deliverables: ["Monthly Security & Patch Audits", "Uptime & Performance Monitoring", "Priority Feature Iterations", "Automated Backup Protocols", "Direct Engineering Channel"],
    techStack: ["Cloudflare", "CI/CD Pipelines", "Git", "GitHub"],
    icon: "ShieldCheck",
    image: "/assets/services/support-maintenance.webp"
  },
  {
    id: "ai-automation",
    number: "07",
    title: "AI Automation & Workflows",
    shortDesc: "Intelligent autonomous pipelines, CRM integration, and operational workflow automation.",
    fullDesc: "Eliminate repetitive manual overhead, data bottlenecks, and human delay. We architect custom AI automation pipelines, autonomous agent workflows, CRM syncing, invoice parsing, and intelligent data routing that work for your business 24/7.",
    deliverables: ["Autonomous Multi-Step Workflows", "CRM & Lead Auto-Enrichment", "Custom LLM API Pipelines", "Document & Invoice Auto-Parsing", "Webhook & Database Integration", "Error Fallback & Human Escalation"],
    techStack: ["OpenAI / Gemini APIs", "Python", "Node.js", "LangChain", "Webhooks"],
    icon: "Cpu",
    image: "/assets/services/ai-workflows.webp"
  },
  {
    id: "ai-chatbots",
    number: "08",
    title: "AI Chatbots & Virtual Agents",
    shortDesc: "24/7 intelligent conversational assistants for instant lead capture, booking, and support.",
    fullDesc: "Deploy conversational AI assistants trained precisely on your company knowledge base, menus, or service catalogs. From multi-turn intelligent concierges to on-site customer support bots with appointment scheduling and real-time human handoff.",
    deliverables: ["Custom Knowledge-Base RAG Training", "Direct Telegram / Live AI Concierge", "Interactive Web & Mobile Chatbot", "Calendar & Booking Sync", "Sentiment Analysis & Smart Handoff", "Analytics & Interaction Transcripts"],
    techStack: ["Gemini / Claude / GPT-4", "Vector Databases (Pinecone)", "Telegram Bot API", "React WebSocket"],
    icon: "Bot",
    image: "/assets/services/chatbots.webp"
  },
  {
    id: "digital-growth",
    number: "09",
    title: "Digital Growth",
    shortDesc: "Turn your website into a stronger digital presence with performance, SEO and conversion-focused improvements.",
    fullDesc: "Turn your website into a stronger digital presence with performance, SEO and conversion-focused improvements. We combine technical SEO architecture, conversion rate optimization, Core Web Vitals speed tuning, and data-driven user experience refinements to transform your website into an active revenue driver.",
    deliverables: ["Technical & Semantic SEO Architecture", "Conversion Rate Optimization (CRO)", "Core Web Vitals Speed Tuning", "Search Console & Analytics Funnels", "A/B Testing & User Journey Refinement"],
    techStack: ["Technical SEO", "CRO", "Analytics", "Core Web Vitals"],
    icon: "TrendingUp",
    image: "/assets/services/digital-growth.webp"
  }
];

export const businessSolutionsData = [
  {
    id: "restaurant",
    category: "Restaurant",
    tagline: "Drive high-margin table bookings and direct takeaway orders.",
    description: "We create digital experiences that help restaurants showcase their menu, receive enquiries and turn visitors into customers without paying massive aggregator commissions.",
    features: ["Digital Interactive Menu", "Table Reservations", "Direct Telegram & Digital Ordering", "High-Resolution Food Gallery", "Google Maps & Directions", "Verified Social Proof & Reviews"],
    keyOutcome: "Zero third-party commission on direct orders with instantaneous notification alerts.",
    metrics: [
      { label: "Mobile Conversion", value: "+38%" },
      { label: "Direct Bookings", value: "3.4x" },
      { label: "Load Time", value: "< 0.8s" }
    ],
    image: "/assets/solutions/solution-restaurant.webp"
  },
  {
    id: "hotel",
    category: "Hotel",
    tagline: "Immersive hospitality experiences that inspire direct guest bookings.",
    description: "Present your suites, amenities, and location through breathtaking visual storytelling. Enable guests to inspect rooms, verify seasonal availability, and book directly with absolute confidence.",
    features: ["Suites & Amenities Showcase", "Direct Booking Engine Integration", "360° Virtual Walkthroughs", "Concierge Inquiry Desk", "Local Attraction Guides", "Multi-Language & Currency"],
    keyOutcome: "Higher revenue per available guest with reduced dependence on online travel agencies.",
    metrics: [
      { label: "Direct Bookings", value: "+45%" },
      { label: "Session Duration", value: "4m 12s" },
      { label: "Guest Inquiries", value: "2.8x" }
    ],
    image: "/assets/solutions/solution-hotel.webp"
  },
  {
    id: "salon",
    category: "Salon",
    tagline: "Elevate your aesthetic brand and streamline client appointment booking.",
    description: "Deliver a polished digital storefront for your luxury salon or studio. Showcase stylist portfolios, transparent service menus, and frictionless appointment booking on mobile.",
    features: ["Curated Service & Pricing Menu", "Stylist Profiles & Portfolios", "Real-Time Appointment Scheduling", "Before & After Transformations", "Live Instagram Feed Sync", "Automated SMS / Digital Reminders"],
    keyOutcome: "Eliminates booking phone tag while presenting an unmistakably luxurious brand feel.",
    metrics: [
      { label: "Online Bookings", value: "72%" },
      { label: "No-Show Rate", value: "-65%" },
      { label: "Mobile Engagement", value: "91%" }
    ],
    image: "/assets/solutions/solution-salon.webp"
  },
  {
    id: "gym",
    category: "Gym",
    tagline: "Turn athletic ambition into recurring gym and fitness club memberships.",
    description: "Energize potential members with clear training tier breakdowns, live group fitness schedules, trainer credentials, and seamless trial workout pass registration.",
    features: ["Transparent Membership Tiers", "Live Class Schedules & Booking", "Trainer Credentials & Specialties", "Free Trial Pass Lead Funnel", "Direct Telegram Consultation", "Virtual Facility Tour"],
    keyOutcome: "High-intent lead generation capturing local fitness enthusiasts ready to tour.",
    metrics: [
      { label: "Trial Signups", value: "+60%" },
      { label: "Lead Capture Rate", value: "14.2%" },
      { label: "Class RSVPs", value: "3.1x" }
    ],
    image: "/assets/solutions/solution-gym.webp"
  },
  {
    id: "healthcare",
    category: "Healthcare",
    tagline: "Build patient trust through clarity, authority and effortless scheduling.",
    description: "Design accessible, compassionate, and technically rigorous clinic portals. Enable prospective patients to view physician credentials, treatment specializations, and book consultations.",
    features: ["Doctor Profiles & Credentials", "Treatment & Specialization Guides", "Secure Patient Appointments", "Emergency Contact Channels", "Clinic Location & Parking Guide", "Confidential Patient Inquiries"],
    keyOutcome: "Immediate patient reassurance and compliant, streamlined consultation booking.",
    metrics: [
      { label: "Patient Inquiries", value: "2.4x" },
      { label: "Mobile Accessibility", value: "100%" },
      { label: "Wait Time Saved", value: "45%" }
    ],
    image: "/assets/solutions/solution-healthcare.webp"
  },
  {
    id: "real-estate",
    category: "Real Estate",
    tagline: "Showcase prestigious properties with cinematic architectural clarity.",
    description: "Transform luxury real estate listings into captivating digital tours. Equip affluent buyers with interactive property filters, high-fidelity galleries, floor plans, and rapid private viewing requests.",
    features: ["Property Listings Showcase", "Advanced Search & Parameter Filters", "Interactive Floor Plans & Specs", "High-Intent Lead Generation", "Map Integration & Neighborhood Data", "Direct Broker Telegram Line"],
    keyOutcome: "Attracts qualified high-net-worth inquiries while elevating developer prestige.",
    metrics: [
      { label: "Lead Quality", value: "+54%" },
      { label: "Avg View Time", value: "5m 30s" },
      { label: "Viewing Requests", value: "3.7x" }
    ],
    image: "/assets/solutions/solution-real-estate.webp"
  },
  {
    id: "education",
    category: "Education",
    tagline: "Inspire prospective students and parents with academic excellence.",
    description: "Craft modern institutional portals that communicate curriculum rigor, faculty accomplishments, and simplified admission application workflows.",
    features: ["Course & Curriculum Catalog", "Faculty Profiles & Research", "Online Admissions Lead Portal", "Transparent Fee Structure Guides", "Interactive Campus Tour", "Student Inquiry & Counseling"],
    keyOutcome: "Accelerates enrollment decisions and delivers an organized informational architecture.",
    metrics: [
      { label: "Application Starts", value: "+42%" },
      { label: "Info Pack Downloads", value: "4.5x" },
      { label: "Parent Engagement", value: "88%" }
    ],
    image: "/assets/solutions/solution-education.webp"
  },
  {
    id: "startup",
    category: "Startup",
    tagline: "Position your breakthrough venture as the undeniable market leader.",
    description: "Launch with an authoritative, razor-sharp product landing experience. Articulate technical innovation, capture high-value waitlist registrations, and impress angel/venture investors.",
    features: ["Product Launch Landing Experience", "Interactive Feature Demos", "High-Conversion Waitlist Engine", "Investor Deck Gate / Overview", "Technical Architecture Diagrams", "Developer API Documentation"],
    keyOutcome: "Validates product-market fit fast while signaling Tier-1 engineering discipline.",
    metrics: [
      { label: "Waitlist Conversion", value: "22.8%" },
      { label: "Investor Inquiries", value: "18+" },
      { label: "Bounce Rate", value: "< 24%" }
    ],
    image: "/assets/solutions/solution-startup.webp"
  }
];

export const selectedWorkData = [
  {
    id: "lumenor",
    number: "01",
    name: "LUMENOR",
    tagline: "LUXURY REAL ESTATE EXPERIENCE",
    category: "REAL ESTATE",
    shortDesc: "A refined digital experience designed to present luxury architectural properties through immersive visuals, intuitive navigation and conversion-focused interactions.",
    longDesc: "LUMENOR is an architectural sanctuary in visual web design. Created for ultra-prime property developers, the experience highlights expansive estates through clean structural grids, subtle parallax transitions, and an exclusive private viewing concierge flow.",
    clientType: "Ultra-Prime Property Developer",
    techTags: ["React", "Tailwind CSS", "Motion", "Vite"],
    image: "/assets/projects/lumenor.webp",
    featured: true,
    metrics: [
      { label: "Direct Inquiries", value: "+84%" },
      { label: "Avg Viewing Time", value: "6m 14s" },
      { label: "Page Load Speed", value: "0.78s" }
    ],
    challenge: "The client needed to represent multi-million dollar residential developments to global buyers without the bloated, slow-loading templates typical of the real estate sector.",
    solution: "We engineered an editorial, dark-canvas presentation engine featuring custom lazy-loaded imagery, responsive interactive blueprints, and an encrypted VIP booking form."
  },
  {
    id: "bella-cafe",
    number: "02",
    name: "Bella Café",
    tagline: "ARTISANAL RESTAURANT & ROASTERY",
    category: "RESTAURANT",
    shortDesc: "Culinary digital presence featuring dynamic live menus, one-click direct reservations, and artisanal brand storytelling.",
    longDesc: "Designed for a heritage European bistro and specialty roastery. Visitors can explore seasonal breakfast and dinner menus, filter by dietary requirements, and initiate instant table reservations.",
    clientType: "Hospitality & Specialty Coffee",
    techTags: ["React", "Tailwind CSS", "Motion"],
    image: "/assets/projects/bella-cafe.webp",
    metrics: [
      { label: "Direct Bookings", value: "3.2x" },
      { label: "Mobile Share", value: "88%" }
    ],
    challenge: "Excessive commissions paid to delivery aggregators with zero customer retention data.",
    solution: "A mobile-first web app that routes reservations directly to their digital host terminal with instant confirmation."
  },
  {
    id: "aurelia",
    number: "03",
    name: "Aurelia",
    tagline: "HAUTE SALON & WELLNESS SPA",
    category: "LIFESTYLE",
    shortDesc: "High-end aesthetic studio platform with visual service catalogs, master stylist profiles, and streamlined self-booking.",
    longDesc: "Aurelia needed a website that mirrored the serene, minimalist luxury of their physical flagship salon. Featuring smooth category transitions, stylist lookbooks, and synchronized appointment booking.",
    clientType: "Luxury Personal Care & Spa",
    techTags: ["React", "Motion", "Tailwind CSS", "Cal.com Sync"],
    image: "/assets/projects/aurelia.webp",
    metrics: [
      { label: "No-Show Reduction", value: "68%" },
      { label: "Online Bookings", value: "76%" }
    ],
    challenge: "Staff spent 15+ hours weekly answering phone inquiries regarding pricing and open calendar slots.",
    solution: "Clear tiered service menus and automated booking calendar with zero phone tag required."
  },
  {
    id: "fitcore",
    number: "04",
    name: "FitCore",
    tagline: "HIGH-PERFORMANCE ATHLETIC CLUB",
    category: "LIFESTYLE",
    shortDesc: "Dynamic fitness studio platform with interactive class schedules, trainer rosters, and automated free trial funnels.",
    longDesc: "Engineered to capture active urban professionals. High-contrast typography, interactive daily class schedules, and seamless one-click pass registration that increased trial-to-member conversion.",
    clientType: "Athletic Club & Performance Gym",
    techTags: ["React", "Tailwind CSS", "Vite", "Motion"],
    image: "/assets/projects/fitcore.webp",
    metrics: [
      { label: "Trial Signups", value: "+92%" },
      { label: "Mobile Bounce Rate", value: "18%" }
    ],
    challenge: "Low conversion on their previous website due to buried class timetables and uninspired visuals.",
    solution: "Real-time class schedule matrix with instantaneous RSVP and trainer background highlights."
  },
  {
    id: "medicare-plus",
    number: "05",
    name: "Medicare Plus",
    tagline: "CONTEMPORARY HEALTHCARE & DIAGNOSTICS",
    category: "HEALTHCARE",
    shortDesc: "Accessible, patient-first clinic platform with verified doctor directories, treatment guides, and appointment triage.",
    longDesc: "Built with clinical precision, WCAG AA contrast compliance, and reassuring clarity. Allows patients to easily locate specialist doctors, verify insurance networks, and request telehealth or clinic visits.",
    clientType: "Multi-Specialty Medical Group",
    techTags: ["React", "Tailwind CSS", "Accessible Forms", "Schema.org"],
    image: "/assets/projects/medicare-plus.webp",
    metrics: [
      { label: "Patient Inquiries", value: "2.5x" },
      { label: "Lighthouse Score", value: "98/100" }
    ],
    challenge: "Outdated legacy site frustrated older and mobile patients looking for immediate emergency and booking details.",
    solution: "Streamlined search by symptom/specialty and emergency one-tap contact buttons pinned across mobile devices."
  },
  {
    id: "stayvista",
    number: "06",
    name: "StayVista",
    tagline: "BOUTIQUE RESORT & VILLAS",
    category: "BUSINESS",
    shortDesc: "Immersive hospitality portal featuring high-definition villa galleries, direct booking options, and regional guest itineraries.",
    longDesc: "A digital experience celebrating experiential travel. Guests can review curated villa amenities, local chef dining menus, and initiate reservation inquiries with dedicated villa concierges.",
    clientType: "Private Hospitality Collection",
    techTags: ["React", "Tailwind CSS", "Motion", "Vite"],
    image: "/assets/projects/stayvista.webp",
    metrics: [
      { label: "Direct Bookings", value: "+52%" },
      { label: "Average Stay", value: "3.8 nights" }
    ],
    challenge: "High dependence on commission-heavy booking aggregators.",
    solution: "VIP direct-booking perks highlighted with a frictionless inquiry flow that captures guest preferences immediately."
  },
  {
    id: "brightpath-academy",
    number: "07",
    name: "BrightPath Academy",
    tagline: "NEXT-GENERATION LEARNING PORTAL",
    category: "BUSINESS",
    shortDesc: "Modern academic portal with program exploration, interactive curriculum roadmaps, and prospective student portals.",
    longDesc: "Designed for a forward-thinking international preparatory academy. Features structured curriculum breakdowns, faculty spotlights, admission timelines, and downloadable course prospectuses.",
    clientType: "Global Educational Institution",
    techTags: ["React", "Tailwind CSS", "Motion", "Vite"],
    image: "/assets/projects/brightpath.webp",
    metrics: [
      { label: "Prospectus Downloads", value: "4.1x" },
      { label: "Admission Queries", value: "+46%" }
    ],
    challenge: "Complex academic offerings caused prospective parents to drop off before submitting inquiry forms.",
    solution: "Intuitive interactive age/grade-level filtering and clear step-by-step admissions checklists."
  },
  {
    id: "nexcart",
    number: "08",
    name: "NexCart",
    tagline: "MODERN DTC COMMERCE PLATFORM",
    category: "E-COMMERCE",
    shortDesc: "Lightning-fast direct-to-consumer digital storefront with sub-second product filtering, cart drawer, and frictionless checkout.",
    longDesc: "A minimalist, hyper-optimized digital commerce experience engineered for a sustainable lifestyle brand. Instantaneous search, dynamic swatch selections, and zero layout shift during checkout transitions.",
    clientType: "DTC Lifestyle Brand",
    techTags: ["React", "Tailwind CSS", "Motion", "Stripe Ready"],
    image: "/assets/projects/nexcart.webp",
    metrics: [
      { label: "Conversion Rate", value: "4.2%" },
      { label: "Cart Abandonment", value: "-35%" }
    ],
    challenge: "Sluggish monolithic Shopify theme with poor Core Web Vitals leading to high drop-offs on product pages.",
    solution: "Decoupled headless storefront loading in 620ms with instant slide-out cart and accelerated payment integrations."
  },
  {
    id: "novatech-cloud",
    number: "09",
    name: "NovaTech Cloud",
    tagline: "ENTERPRISE CLOUD INFRASTRUCTURE",
    category: "BUSINESS",
    shortDesc: "Developer-first cloud platform website featuring interactive architecture diagrams, telemetry dashboards, and enterprise onboarding.",
    longDesc: "Engineered for an enterprise cloud infrastructure venture. Features interactive architectural visualizers, real-time benchmark telemetry, streamlined developer sandbox requests, and a secure enterprise contact pipeline.",
    clientType: "Enterprise Cloud Venture",
    techTags: ["React", "Tailwind CSS", "Motion"],
    image: "/assets/projects/novatech.webp",
    metrics: [
      { label: "Enterprise Inquiries", value: "3.2x" },
      { label: "Documentation Dwell", value: "6m 15s" }
    ],
    challenge: "Complex infrastructure services were difficult to communicate with traditional marketing templates.",
    solution: "Engineered an interactive architecture explorer with real-time benchmark telemetry and enterprise inquiry routing.",
    features: [
      "Interactive Architecture Explorer",
      "Developer Sandbox Request",
      "Performance Telemetry",
      "Enterprise Lead Routing",
      "Responsive Architecture"
    ]
  }
];

export const processStepsData = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, audience and goals.",
    deliverables: ["Stakeholder Interviews", "Competitor & Market Landscape Audit", "User Persona Mapping", "Core KPI Definition"],
    duration: "Week 1"
  },
  {
    number: "02",
    title: "Strategy",
    description: "Define the structure and digital direction.",
    deliverables: ["Information Architecture Map", "Conversion Funnel Blueprints", "Tech Stack Architecture", "Content Strategy Framework"],
    duration: "Week 1-2"
  },
  {
    number: "03",
    title: "Design",
    description: "Create the visual experience.",
    deliverables: ["Interactive High-Fidelity Prototypes", "Design System & Component Library", "Motion & Micro-Interaction Spec", "Visual Asset Direction"],
    duration: "Week 2-3"
  },
  {
    number: "04",
    title: "Develop",
    description: "Build the product using modern technologies.",
    deliverables: ["Clean React / Vite Codebase", "Zero-Template Custom Styling", "API & Third-Party Integrations", "Sub-Second Optimization"],
    duration: "Week 3-5"
  },
  {
    number: "05",
    title: "Test",
    description: "Check performance, responsiveness and usability.",
    deliverables: ["Cross-Browser Matrix QA", "Mobile Device Testing (320px–1920px)", "Lighthouse Core Web Vitals Pass", "Accessibility & Security Checks"],
    duration: "Week 5"
  },
  {
    number: "06",
    title: "Launch",
    description: "Deploy and connect everything required.",
    deliverables: ["Production Cloud Deployment", "Domain & SSL Provisioning", "Analytics & Conversion Event Setup", "Search Console Verification"],
    duration: "Week 6"
  },
  {
    number: "07",
    title: "Grow",
    description: "Support, improve and evolve the product.",
    deliverables: ["Post-Launch Performance Monitoring", "Iterative UX Improvements", "Security Audits & Patching", "Feature Scaling Support"],
    duration: "Ongoing"
  }
];

export const whyNetwebData = [
  {
    number: "01",
    title: "Business First",
    description: "Every design decision starts with the business objective. We don't write code or sketch layouts for novelty; we craft tools that generate inquiries, sales, and prestige."
  },
  {
    number: "02",
    title: "Built From Scratch",
    description: "No unnecessary templates. Every experience is tailored. Generic templates come with bloated code and zero brand differentiation; we build clean, bespoke foundations."
  },
  {
    number: "03",
    title: "Performance Driven",
    description: "Fast, responsive and optimized for real users. Every millisecond counts. We engineer sites with pristine Core Web Vitals to maximize search ranking and user retention."
  },
  {
    number: "04",
    title: "Modern Technology",
    description: "Built using current and scalable technologies: React, Vite, modern Tailwind, and clean component architectures ready to evolve with your business."
  },
  {
    number: "05",
    title: "Designed to Convert",
    description: "Clear journeys, strong CTAs and intentional interactions. We eliminate cognitive clutter and guide visitors smoothly toward taking real action."
  },
  {
    number: "06",
    title: "Long-Term Support",
    description: "We stay involved beyond launch. You are never left with broken code or stranded questions. We operate as an ongoing technical partner."
  }
];

export const technologiesData = [
  { name: "React", category: "Frontend", desc: "Component architecture" },
  { name: "JavaScript", category: "Language", desc: "Modern ESNext standard" },
  { name: "Tailwind CSS", category: "Styling", desc: "Utility-first design system" },
  { name: "Node.js", category: "Backend", desc: "Fast asynchronous runtime" },
  { name: "Express", category: "API Server", desc: "Reliable RESTful services" },
  { name: "MongoDB", category: "Database", desc: "Flexible document store" },
  { name: "MySQL", category: "Database", desc: "Relational structured data" },
  { name: "Git", category: "Version Control", desc: "Branching & integrity" },
  { name: "GitHub", category: "Collaboration", desc: "Automated CI/CD pipelines" },
  { name: "Vite", category: "Build Tool", desc: "Instantaneous dev bundling" }
];

export const testimonialsData = [
  {
    quote: "NETWEB STUDIO completely changed how clients perceive our firm before they ever step into our office. The website feels like walking into an architectural masterwork. Inquiries increased by over 80% within the first two months.",
    clientRole: "Managing Director",
    company: "Lumenor Properties",
    industry: "Luxury Real Estate",
    impact: "+84% Direct High-Net-Worth Inquiries"
  },
  {
    quote: "Unlike agencies who just resell generic templates, the NETWEB team engineered our entire customer flow from scratch. We now take 70% of our orders directly via digital channels without paying third-party commissions.",
    clientRole: "Founder & Executive Chef",
    company: "Bella Café & Roastery",
    industry: "Artisanal Hospitality",
    impact: "Saved ₹1.8L in Monthly Aggregator Fees"
  },
  {
    quote: "The speed and visual discipline are unmatched. Our previous site was sluggish and disorganized. NETWEB delivered a sub-second medical portal that patients love using on mobile devices. Truly a technology partner.",
    clientRole: "Chief Medical Officer",
    company: "Medicare Diagnostic Group",
    industry: "Specialized Healthcare",
    impact: "98/100 Core Web Vitals & 2.5x Patient Bookings"
  }
];

export const faqData = [
  {
    question: "How much does a website cost?",
    category: "Investment",
    answer: "Every project at NETWEB STUDIO is scoped around specific business objectives rather than arbitrary flat fees. Our custom foundational packages typically begin from ₹4,999 for focused landing experiences, ₹9,999 for multi-page business platforms, and ₹19,999+ for full custom web applications with complex integrations. You can use our interactive Pricing Estimator on this site to get an immediate realistic range."
  },
  {
    question: "How long does a website take?",
    category: "Timeline",
    answer: "A focused high-performance business website typically takes 2 to 3 weeks from initial discovery to final deployment. Comprehensive web applications or custom e-commerce stores with multi-tiered integrations generally take 4 to 6 weeks. We work with strict milestone sprint schedules and deliver weekly progress reviews."
  },
  {
    question: "Can you redesign my existing website?",
    category: "Redesign",
    answer: "Yes. Many of our clients come to us with slow, outdated, or poorly converting legacy websites. We preserve your existing search rankings and SEO equity with careful URL redirection strategies, eliminate technical debt, and transform the visual presentation into a modern, high-converting digital product."
  },
  {
    question: "Do you build e-commerce websites?",
    category: "Capabilities",
    answer: "Absolutely. We build conversion-focused digital storefronts using Shopify, custom headless architectures, or customized transaction flows. We focus on frictionless mobile checkout, clear product presentation, abandoned cart recovery, and seamless payment gateway integrations."
  },
  {
    question: "Can you integrate direct messaging like Telegram?",
    category: "Integrations",
    answer: "Yes. Direct messaging integrations like Telegram and live chat channels are among our highest-converting features for service businesses, restaurants, clinics, and modern brands. We configure automated pre-filled inquiry messages, order routing, and instant notification alerts so you never lose a high-intent lead."
  },
  {
    question: "Can you build booking systems?",
    category: "Capabilities",
    answer: "Yes. We create seamless reservation and appointment booking workflows tailored to your specific operations—whether for doctor consultations, restaurant dining, salon stylists, fitness class RSVPs, or private real estate viewings, with automated SMS/email reminders."
  },
  {
    question: "Do you provide maintenance and ongoing support?",
    category: "Support",
    answer: "Yes. We pride ourselves on being a long-term technology partner. We offer continuous maintenance tiers that include monthly security patches, cloud hosting optimization, regular backups, uptime monitoring, and priority turnaround for feature updates."
  },
  {
    question: "Can you build custom web applications?",
    category: "Capabilities",
    answer: "Yes. In addition to marketing websites, we engineer full-stack web applications featuring secure authentication, customer portals, interactive operational dashboards, database architectures, and custom API connections using React, Node.js, Express, and modern databases."
  }
];
