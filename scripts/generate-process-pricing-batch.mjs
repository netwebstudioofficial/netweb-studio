import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 4 Process Assets (800 x 500, 16:10, under 100 KB):
// process-performance.webp
// process-handover.webp
// process-fidelity.webp
// process-seo.webp

// 3 Pricing Assets (800 x 500, 16:10, under 100 KB):
// pricing-starter.webp
// pricing-business.webp
// pricing-enterprise.webp

const processCards = [
  {
    filename: 'process-performance.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141914"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Lighthouse 100/100 Gauge & Telemetry -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Lighthouse Circular Ring -->
          <circle cx="180" cy="200" r="90" fill="none" stroke="#162016" stroke-width="14"/>
          <circle cx="180" cy="200" r="90" fill="none" stroke="#A3FF12" stroke-width="14" stroke-dasharray="565" stroke-dashoffset="0" stroke-linecap="round"/>
          <text x="180" y="215" fill="#A3FF12" font-family="monospace" font-size="48" font-weight="bold" text-anchor="middle">100</text>
          <!-- Metrics breakdown on right -->
          <g transform="translate(320, 80)">
            <rect width="240" height="60" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <text x="16" y="28" fill="#FFF" fill-opacity="0.5" font-family="monospace" font-size="12">FIRST CONTENTFUL PAINT</text>
            <text x="16" y="48" fill="#A3FF12" font-family="monospace" font-size="16" font-weight="bold">0.42s</text>

            <rect y="80" width="240" height="60" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <text x="16" y="108" fill="#FFF" fill-opacity="0.5" font-family="monospace" font-size="12">LARGEST CONTENTFUL PAINT</text>
            <text x="16" y="128" fill="#A3FF12" font-family="monospace" font-size="16" font-weight="bold">0.86s</text>

            <rect y="160" width="240" height="60" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <text x="16" y="188" fill="#FFF" fill-opacity="0.5" font-family="monospace" font-size="12">CUMULATIVE LAYOUT SHIFT</text>
            <text x="16" y="208" fill="#A3FF12" font-family="monospace" font-size="16" font-weight="bold">0.000</text>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'process-handover.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141B14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Git Repository & Clean Handover Terminal -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Top bar -->
          <rect width="600" height="34" rx="10" fill="#131713"/>
          <circle cx="20" cy="17" r="4" fill="#A3FF12"/>
          <circle cx="34" cy="17" r="3" fill="#FFF" fill-opacity="0.2"/>
          <circle cx="46" cy="17" r="3" fill="#FFF" fill-opacity="0.2"/>
          <text x="70" y="22" fill="#FFF" fill-opacity="0.6" font-family="monospace" font-size="12">repository-handover — production-release</text>
          <!-- Terminal contents -->
          <g transform="translate(30, 60)">
            <text x="0" y="24" fill="#A3FF12" font-family="monospace" font-size="14">✔ 100% Client Codebase Ownership Verified</text>
            <text x="0" y="55" fill="#FFF" fill-opacity="0.7" font-family="monospace" font-size="13">→ src/components/ (Clean modular React architecture)</text>
            <text x="0" y="85" fill="#FFF" fill-opacity="0.7" font-family="monospace" font-size="13">→ dist/ (Optimized production build, sub-1s runtime)</text>
            <text x="0" y="115" fill="#FFF" fill-opacity="0.7" font-family="monospace" font-size="13">→ docs/handover.md (Complete architectural docs)</text>
            <!-- Badge / Lock -->
            <rect y="160" width="540" height="120" rx="8" fill="#111711" stroke="#A3FF12" stroke-opacity="0.3"/>
            <circle cx="50" cy="220" r="22" fill="#192419" stroke="#A3FF12" stroke-opacity="0.6"/>
            <path d="M 42 220 L 48 226 L 58 214" fill="none" stroke="#A3FF12" stroke-width="2.5" stroke-linecap="round"/>
            <text x="90" y="212" fill="#F5F7F2" font-family="monospace" font-size="16" font-weight="bold">ZERO VENDOR LOCK-IN GUARANTEE</text>
            <text x="90" y="235" fill="#FFF" fill-opacity="0.5" font-family="monospace" font-size="12">Private Git repository transferred directly to your organization.</text>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'process-fidelity.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141914"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- 1:1 Pixel Alignment Comparison -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Split screen mockup -->
          <g transform="translate(30, 40)">
            <!-- Left Design Mockup -->
            <rect width="255" height="320" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <rect x="20" y="20" width="100" height="10" rx="3" fill="#FFF" fill-opacity="0.6"/>
            <rect x="20" y="50" width="215" height="90" rx="6" fill="#161C16"/>
            <rect x="20" y="160" width="180" height="12" rx="3" fill="#F5F7F2"/>
            <rect x="20" y="185" width="215" height="6" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="20" y="225" width="90" height="26" rx="5" fill="#A3FF12"/>
            <text x="20" y="295" fill="#A7ADA5" font-family="monospace" font-size="11">APPROVED FIGMA SPEC</text>

            <!-- Center separator line -->
            <line x1="270" y1="0" x2="270" y2="320" stroke="#A3FF12" stroke-width="2" stroke-dasharray="4 4"/>

            <!-- Right Deployed Production Code -->
            <g transform="translate(285, 0)">
              <rect width="255" height="320" rx="8" fill="#101510" stroke="#A3FF12" stroke-opacity="0.3"/>
              <rect x="20" y="20" width="100" height="10" rx="3" fill="#FFF" fill-opacity="0.6"/>
              <rect x="20" y="50" width="215" height="90" rx="6" fill="#161C16"/>
              <rect x="20" y="160" width="180" height="12" rx="3" fill="#F5F7F2"/>
              <rect x="20" y="185" width="215" height="6" rx="2" fill="#FFF" fill-opacity="0.3"/>
              <rect x="20" y="225" width="90" height="26" rx="5" fill="#A3FF12"/>
              <text x="20" y="295" fill="#A3FF12" font-family="monospace" font-size="11">PRODUCTION DEPLOYMENT</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'process-seo.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141B14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- SEO Semantic & Structured Data Foundation -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Search SERP Snippet Preview -->
          <g transform="translate(40, 40)">
            <rect width="520" height="130" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.08"/>
            <text x="20" y="32" fill="#A3FF12" font-family="monospace" font-size="12">https://netweb.studio › services › web-architecture</text>
            <text x="20" y="62" fill="#F5F7F2" font-family="sans-serif" font-size="18" font-weight="bold">NetWeb Studio — High-Performance Digital Craft</text>
            <text x="20" y="92" fill="#A7ADA5" font-family="sans-serif" font-size="13">Bespoke websites and web applications engineered for speed, search visibility, and conversion.</text>
            <text x="20" y="112" fill="#A3FF12" font-family="monospace" font-size="11">★★★★★ 4.9 · Verified Client Reviews · Schema.org JSON-LD Validated</text>
          </g>
          <!-- Schema JSON-LD Visual Tree -->
          <g transform="translate(40, 190)">
            <rect width="520" height="170" rx="8" fill="#080A08" stroke="#FFF" stroke-opacity="0.06"/>
            <text x="20" y="30" fill="#A3FF12" font-family="monospace" font-size="13">{ "@context": "https://schema.org", "@type": "ProfessionalService",</text>
            <text x="40" y="55" fill="#FFF" fill-opacity="0.8" font-family="monospace" font-size="13">"name": "NetWeb Studio",</text>
            <text x="40" y="80" fill="#FFF" fill-opacity="0.8" font-family="monospace" font-size="13">"aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9" },</text>
            <text x="40" y="105" fill="#FFF" fill-opacity="0.8" font-family="monospace" font-size="13">"geo": { "@type": "GeoCoordinates", "latitude": 28.6139, "longitude": 77.2090 },</text>
            <text x="40" y="130" fill="#A3FF12" font-family="monospace" font-size="13">"knowsAbout": ["Web Architecture", "UI/UX", "SEO", "E-Commerce"] }</text>
          </g>
        </g>
      </svg>
    `
  }
];

const pricingCards = [
  {
    filename: 'pricing-starter.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141814"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Starter Tier Single/3 Page Clean Architecture -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <g transform="translate(40, 40)">
            <rect width="520" height="320" rx="8" fill="#101510"/>
            <!-- Single-page flow mockup -->
            <rect x="30" y="30" width="180" height="260" rx="6" fill="#161C16" stroke="#FFF" stroke-opacity="0.08"/>
            <rect x="45" y="50" width="90" height="12" rx="3" fill="#A3FF12"/>
            <rect x="45" y="75" width="150" height="50" rx="4" fill="#1F281F"/>
            <rect x="45" y="140" width="150" height="8" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="45" y="155" width="130" height="8" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="45" y="235" width="150" height="26" rx="5" fill="#A3FF12"/>

            <!-- Deliverables breakdown right -->
            <g transform="translate(240, 40)">
              <text x="0" y="24" fill="#F5F7F2" font-family="sans-serif" font-size="20" font-weight="bold">STARTER PLATFORM</text>
              <text x="0" y="50" fill="#A3FF12" font-family="monospace" font-size="14">₹4,999 BASE INVESTMENT</text>
              <text x="0" y="90" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ 1–3 Custom Responsive Pages</text>
              <text x="0" y="120" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Mobile-First Clean Code</text>
              <text x="0" y="150" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Direct Instant Inquiries</text>
              <text x="0" y="180" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Sub-1.0s Speed Budget</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'pricing-business.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#182218"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Business Growth Multi-page & Booking System -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0E140E" stroke="#A3FF12" stroke-opacity="0.3"/>
          <g transform="translate(40, 40)">
            <rect width="520" height="320" rx="8" fill="#131B13"/>
            <!-- Multi-device preview -->
            <rect x="25" y="30" width="210" height="140" rx="6" fill="#1A241A" stroke="#A3FF12" stroke-opacity="0.4"/>
            <circle cx="45" cy="48" r="4" fill="#A3FF12"/>
            <rect x="55" y="44" width="80" height="8" rx="2" fill="#FFF" fill-opacity="0.7"/>
            <rect x="40" y="70" width="180" height="45" rx="4" fill="#223022"/>
            <rect x="40" y="125" width="70" height="20" rx="4" fill="#A3FF12"/>

            <!-- Right Features -->
            <g transform="translate(260, 40)">
              <text x="0" y="24" fill="#F5F7F2" font-family="sans-serif" font-size="20" font-weight="bold">BUSINESS PLATFORM</text>
              <text x="0" y="50" fill="#A3FF12" font-family="monospace" font-size="14">₹9,999 BASE INVESTMENT</text>
              <text x="0" y="90" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ 4–7 Custom Responsive Pages</text>
              <text x="0" y="120" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Online Booking / Lead Funnels</text>
              <text x="0" y="150" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Full Technical &amp; Schema SEO</text>
              <text x="0" y="180" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ 30 Days Post-Launch Warranty</text>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'pricing-enterprise.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141914"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Enterprise Custom Web Applications and Integrations -->
        <g transform="translate(100, 50)">
          <rect width="600" height="400" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <g transform="translate(40, 40)">
            <rect width="520" height="320" rx="8" fill="#101510"/>
            <!-- Complex app dashboard mockup -->
            <rect x="25" y="30" width="210" height="260" rx="6" fill="#161D16" stroke="#FFF" stroke-opacity="0.08"/>
            <rect x="40" y="50" width="180" height="40" rx="4" fill="#1F2A1F"/>
            <rect x="40" y="105" width="85" height="50" rx="4" fill="#192319"/>
            <rect x="135" y="105" width="85" height="50" rx="4" fill="#192319"/>
            <rect x="40" y="170" width="180" height="100" rx="4" fill="#192319"/>

            <!-- Right Features -->
            <g transform="translate(260, 40)">
              <text x="0" y="24" fill="#F5F7F2" font-family="sans-serif" font-size="20" font-weight="bold">PREMIUM STUDIO</text>
              <text x="0" y="50" fill="#A3FF12" font-family="monospace" font-size="14">₹19,999 BASE INVESTMENT</text>
              <text x="0" y="90" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Bespoke Web Applications</text>
              <text x="0" y="120" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ Custom CRM &amp; AI Pipelines</text>
              <text x="0" y="150" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ E-Commerce / Payment Engine</text>
              <text x="0" y="180" fill="#FFF" fill-opacity="0.7" font-family="sans-serif" font-size="13">✓ 60 Days Continuous Warranty</text>
            </g>
          </g>
        </g>
      </svg>
    `
  }
];

async function run() {
  for (const item of processCards) {
    const dest = path.resolve('public/assets/process', item.filename);
    const buf = await sharp(Buffer.from(item.svg))
      .webp({ quality: 90, effort: 6 })
      .toBuffer();
    fs.writeFileSync(dest, buf);
    console.log(`Generated process asset: ${item.filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  for (const item of pricingCards) {
    const dest = path.resolve('public/assets/pricing', item.filename);
    const buf = await sharp(Buffer.from(item.svg))
      .webp({ quality: 90, effort: 6 })
      .toBuffer();
    fs.writeFileSync(dest, buf);
    console.log(`Generated pricing asset: ${item.filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
