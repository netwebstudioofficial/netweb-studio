import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 9 Service visuals (800 x 500, 16:10, under 110 KB):
// 1. web-development.webp: Responsive browser interface / professional frontend development environment
// 2. ecommerce.webp: Premium product storefront / checkout interface
// 3. web-applications.webp: Sophisticated SaaS / dashboard application interface
// 4. ui-ux.webp: Professional interface design system / wireframe-to-interface concept
// 5. website-redesign.webp: Before/after-inspired modern interface transformation without readable text
// 6. support-maintenance.webp: Clean monitoring, maintenance, security or system-health visualization
// 7. ai-workflows.webp: Elegant automation workflow nodes connecting applications/services
// 8. chatbots.webp: Premium conversational interface concept
// 9. digital-growth.webp: Analytics, conversion and growth visualization

const services = [
  {
    filename: 'web-development.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141914"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.8"/>
          </filter>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Window Mockup -->
        <g transform="translate(70, 50)" filter="url(#shadow)">
          <rect width="660" height="400" rx="10" fill="#0E120E" stroke="#FFF" stroke-opacity="0.08"/>
          <rect width="660" height="34" rx="10" fill="#151A15"/>
          <circle cx="20" cy="17" r="4" fill="#A3FF12"/>
          <circle cx="34" cy="17" r="3" fill="#FFF" fill-opacity="0.2"/>
          <circle cx="46" cy="17" r="3" fill="#FFF" fill-opacity="0.2"/>
          <rect x="70" y="11" width="180" height="12" rx="4" fill="#080A08" stroke="#FFF" stroke-opacity="0.05"/>
          <rect x="85" y="15" width="90" height="4" rx="2" fill="#FFF" fill-opacity="0.4"/>
          <!-- Browser Content -->
          <g transform="translate(30, 55)">
            <!-- Nav -->
            <rect width="600" height="28" rx="5" fill="#121612"/>
            <rect x="15" y="10" width="30" height="8" rx="3" fill="#A3FF12"/>
            <rect x="520" y="7" width="65" height="14" rx="4" fill="#A3FF12" fill-opacity="0.2" stroke="#A3FF12" stroke-opacity="0.5"/>
            <!-- Hero Layout -->
            <rect x="0" y="44" width="280" height="18" rx="4" fill="#F5F7F2"/>
            <rect x="0" y="70" width="220" height="18" rx="4" fill="#A3FF12"/>
            <rect x="0" y="100" width="310" height="6" rx="3" fill="#FFF" fill-opacity="0.3"/>
            <rect x="0" y="112" width="260" height="6" rx="3" fill="#FFF" fill-opacity="0.3"/>
            <rect x="0" y="132" width="90" height="24" rx="6" fill="#A3FF12"/>
            <rect x="102" y="132" width="80" height="24" rx="6" fill="#161D16" stroke="#FFF" stroke-opacity="0.15"/>
            <!-- Right Code/Split Window -->
            <rect x="340" y="44" width="260" height="260" rx="8" fill="#080A08" stroke="#FFF" stroke-opacity="0.08"/>
            <rect x="355" y="60" width="80" height="8" rx="3" fill="#A3FF12" fill-opacity="0.7"/>
            <rect x="355" y="76" width="180" height="6" rx="2" fill="#FFF" fill-opacity="0.5"/>
            <rect x="375" y="90" width="140" height="6" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="395" y="104" width="110" height="6" rx="2" fill="#A3FF12" fill-opacity="0.8"/>
            <rect x="375" y="118" width="90" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
            <rect x="355" y="132" width="130" height="6" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="355" y="156" width="70" height="8" rx="3" fill="#A3FF12" fill-opacity="0.7"/>
            <rect x="375" y="172" width="150" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
            <rect x="395" y="186" width="120" height="6" rx="2" fill="#F5F7F2" fill-opacity="0.7"/>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'ecommerce.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141814"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- E-Commerce Storefront Canvas -->
        <g transform="translate(60, 45)">
          <rect width="680" height="410" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Store Header -->
          <rect width="680" height="40" rx="10" fill="#121612"/>
          <circle cx="25" cy="20" r="4" fill="#A3FF12"/>
          <rect x="40" y="16" width="60" height="8" rx="3" fill="#FFF" fill-opacity="0.8"/>
          <rect x="580" y="12" width="75" height="16" rx="8" fill="#182218" stroke="#A3FF12" stroke-opacity="0.5"/>
          <circle cx="592" cy="20" r="3" fill="#A3FF12"/>
          <!-- Product Showcase 3 Cards -->
          <g transform="translate(30, 65)">
            <!-- Card 1 -->
            <rect width="190" height="315" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.08"/>
            <rect x="15" y="15" width="160" height="160" rx="6" fill="#161C16"/>
            <!-- Minimalist Product Silhouette -->
            <ellipse cx="95" cy="95" rx="40" ry="40" fill="#1F281F" stroke="#A3FF12" stroke-opacity="0.3"/>
            <rect x="15" y="190" width="110" height="10" rx="3" fill="#F5F7F2"/>
            <rect x="15" y="210" width="60" height="8" rx="3" fill="#A3FF12"/>
            <rect x="15" y="235" width="160" height="5" rx="2" fill="#FFF" fill-opacity="0.3"/>
            <rect x="15" y="265" width="160" height="28" rx="6" fill="#A3FF12"/>
            <rect x="65" y="276" width="60" height="6" rx="3" fill="#080A08"/>

            <!-- Card 2 (Featured) -->
            <g transform="translate(215, 0)">
              <rect width="190" height="315" rx="8" fill="#131913" stroke="#A3FF12" stroke-opacity="0.4"/>
              <rect x="15" y="15" width="160" height="160" rx="6" fill="#1A221A"/>
              <rect x="65" y="55" width="60" height="80" rx="10" fill="#243024" stroke="#A3FF12" stroke-opacity="0.5"/>
              <rect x="15" y="190" width="125" height="10" rx="3" fill="#F5F7F2"/>
              <rect x="15" y="210" width="65" height="8" rx="3" fill="#A3FF12"/>
              <rect x="15" y="235" width="160" height="5" rx="2" fill="#FFF" fill-opacity="0.3"/>
              <rect x="15" y="265" width="160" height="28" rx="6" fill="#F5F7F2"/>
              <rect x="65" y="276" width="60" height="6" rx="3" fill="#080A08"/>
            </g>

            <!-- Card 3 -->
            <g transform="translate(430, 0)">
              <rect width="190" height="315" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.08"/>
              <rect x="15" y="15" width="160" height="160" rx="6" fill="#161C16"/>
              <polygon points="95,55 135,135 55,135" fill="#1F281F" stroke="#A3FF12" stroke-opacity="0.3"/>
              <rect x="15" y="190" width="105" height="10" rx="3" fill="#F5F7F2"/>
              <rect x="15" y="210" width="55" height="8" rx="3" fill="#A3FF12"/>
              <rect x="15" y="235" width="160" height="5" rx="2" fill="#FFF" fill-opacity="0.3"/>
              <rect x="15" y="265" width="160" height="28" rx="6" fill="#A3FF12"/>
              <rect x="65" y="276" width="60" height="6" rx="3" fill="#080A08"/>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'web-applications.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#121812"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- SaaS Dashboard Window -->
        <g transform="translate(50, 45)">
          <rect width="700" height="410" rx="10" fill="#0B0E0B" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Sidebar -->
          <rect width="150" height="410" rx="10" fill="#101410"/>
          <circle cx="25" cy="25" r="4" fill="#A3FF12"/>
          <rect x="38" y="22" width="60" height="7" rx="3" fill="#FFF" fill-opacity="0.8"/>
          <!-- Sidebar Menu Items -->
          <rect x="15" y="60" width="120" height="22" rx="4" fill="#A3FF12" fill-opacity="0.15" stroke="#A3FF12" stroke-opacity="0.4"/>
          <rect x="25" y="68" width="55" height="6" rx="2" fill="#A3FF12"/>
          <rect x="15" y="90" width="120" height="22" rx="4" fill="transparent"/>
          <rect x="25" y="98" width="65" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
          <rect x="15" y="120" width="120" height="22" rx="4" fill="transparent"/>
          <rect x="25" y="128" width="50" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
          <!-- Dashboard Content -->
          <g transform="translate(175, 20)">
            <!-- Top bar -->
            <rect width="505" height="30" rx="6" fill="#101510"/>
            <rect x="15" y="11" width="80" height="8" rx="3" fill="#F5F7F2"/>
            <rect x="420" y="8" width="70" height="14" rx="4" fill="#A3FF12"/>
            <!-- 3 Stat Cards -->
            <g transform="translate(0, 45)">
              <rect width="155" height="65" rx="6" fill="#121712" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="12" y="12" width="40" height="5" rx="2" fill="#FFF" fill-opacity="0.4"/>
              <rect x="12" y="26" width="65" height="14" rx="3" fill="#F5F7F2"/>
              <rect x="12" y="46" width="45" height="5" rx="2" fill="#A3FF12"/>

              <rect x="175" y="0" width="155" height="65" rx="6" fill="#121712" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="187" y="12" width="40" height="5" rx="2" fill="#FFF" fill-opacity="0.4"/>
              <rect x="187" y="26" width="65" height="14" rx="3" fill="#A3FF12"/>
              <rect x="187" y="46" width="45" height="5" rx="2" fill="#A3FF12"/>

              <rect x="350" y="0" width="155" height="65" rx="6" fill="#121712" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="362" y="12" width="40" height="5" rx="2" fill="#FFF" fill-opacity="0.4"/>
              <rect x="362" y="26" width="65" height="14" rx="3" fill="#F5F7F2"/>
              <rect x="362" y="46" width="45" height="5" rx="2" fill="#A3FF12"/>
            </g>
            <!-- Large Analytics Graph -->
            <g transform="translate(0, 125)">
              <rect width="505" height="240" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="20" y="18" width="90" height="8" rx="3" fill="#F5F7F2"/>
              <!-- Chart Bars -->
              <path d="M 40 190 L 90 140 L 140 160 L 200 110 L 260 130 L 330 70 L 400 90 L 470 45" fill="none" stroke="#A3FF12" stroke-width="3" stroke-linecap="round"/>
              <polygon points="40,190 90,140 140,160 200,110 260,130 330,70 400,90 470,45 470,200 40,200" fill="#A3FF12" fill-opacity="0.08"/>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'ui-ux.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141914"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Wireframe to Interface Transformation -->
        <g transform="translate(60, 45)">
          <!-- Left: Wireframe blueprint -->
          <g transform="translate(0, 0)">
            <rect width="320" height="410" rx="10" fill="#0A0E0A" stroke="#FFF" stroke-opacity="0.1" stroke-dasharray="4 4"/>
            <rect x="20" y="20" width="80" height="10" rx="3" fill="#FFF" fill-opacity="0.2"/>
            <rect x="20" y="45" width="280" height="120" rx="6" fill="none" stroke="#FFF" stroke-opacity="0.15" stroke-dasharray="3 3"/>
            <line x1="20" y1="45" x2="300" y2="165" stroke="#FFF" stroke-opacity="0.1"/>
            <line x1="300" y1="45" x2="20" y2="165" stroke="#FFF" stroke-opacity="0.1"/>
            <rect x="20" y="185" width="200" height="12" rx="3" fill="#FFF" fill-opacity="0.3"/>
            <rect x="20" y="210" width="280" height="6" rx="2" fill="#FFF" fill-opacity="0.15"/>
            <rect x="20" y="225" width="230" height="6" rx="2" fill="#FFF" fill-opacity="0.15"/>
            <rect x="20" y="255" width="110" height="28" rx="5" fill="none" stroke="#FFF" stroke-opacity="0.3"/>
          </g>
          <!-- Center arrow indicator -->
          <circle cx="340" cy="205" r="16" fill="#121812" stroke="#A3FF12" stroke-opacity="0.5"/>
          <path d="M 334 205 L 346 205 M 341 199 L 347 205 L 341 211" fill="none" stroke="#A3FF12" stroke-width="2" stroke-linecap="round"/>
          <!-- Right: Finished High-Fidelity UI -->
          <g transform="translate(360, 0)">
            <rect width="320" height="410" rx="10" fill="#101510" stroke="#A3FF12" stroke-opacity="0.3"/>
            <rect x="20" y="20" width="70" height="10" rx="3" fill="#A3FF12"/>
            <rect x="20" y="45" width="280" height="120" rx="6" fill="#192219"/>
            <rect x="35" y="60" width="60" height="14" rx="4" fill="#080A08" stroke="#A3FF12" stroke-opacity="0.4"/>
            <rect x="20" y="185" width="220" height="14" rx="3" fill="#F5F7F2"/>
            <rect x="20" y="210" width="280" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
            <rect x="20" y="225" width="230" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
            <rect x="20" y="255" width="120" height="30" rx="6" fill="#A3FF12"/>
            <rect x="45" y="267" width="70" height="6" rx="3" fill="#080A08"/>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'website-redesign.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#151A15"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Modern Redesign Architecture Transformation -->
        <g transform="translate(50, 45)">
          <rect width="700" height="410" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Diagonal Split / Evolution -->
          <g transform="translate(20, 20)">
            <!-- Left: Dated/Cluttered layout concept -->
            <rect width="320" height="370" rx="8" fill="#101310" stroke="#FFF" stroke-opacity="0.06"/>
            <rect x="15" y="15" width="290" height="20" fill="#1C1F1C"/>
            <rect x="15" y="45" width="130" height="100" fill="#161816"/>
            <rect x="155" y="45" width="150" height="100" fill="#161816"/>
            <rect x="15" y="160" width="290" height="40" fill="#181B18"/>
            <rect x="15" y="215" width="90" height="90" fill="#151715"/>
            <rect x="115" y="215" width="90" height="90" fill="#151715"/>
            <rect x="215" y="215" width="90" height="90" fill="#151715"/>
            <!-- Overlay status badge -->
            <rect x="15" y="325" width="80" height="16" rx="4" fill="#331A1A" stroke="#FF5555" stroke-opacity="0.4"/>
            <circle cx="25" cy="333" r="3" fill="#FF5555"/>

            <!-- Right: Clean High-Conversion Redesign -->
            <g transform="translate(340, 0)">
              <rect width="320" height="370" rx="8" fill="#131813" stroke="#A3FF12" stroke-opacity="0.3"/>
              <!-- Elegant single-purpose hero -->
              <rect x="20" y="20" width="280" height="25" rx="5" fill="#182218"/>
              <circle cx="35" cy="32" r="4" fill="#A3FF12"/>
              <rect x="20" y="65" width="180" height="16" rx="4" fill="#F5F7F2"/>
              <rect x="20" y="90" width="140" height="16" rx="4" fill="#A3FF12"/>
              <rect x="20" y="125" width="280" height="135" rx="6" fill="#1B261B"/>
              <rect x="20" y="280" width="120" height="30" rx="6" fill="#A3FF12"/>
              <!-- Active status badge -->
              <rect x="20" y="325" width="80" height="16" rx="4" fill="#1B2B1B" stroke="#A3FF12" stroke-opacity="0.5"/>
              <circle cx="30" cy="333" r="3" fill="#A3FF12"/>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'support-maintenance.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141B14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Continuous Health & Security Observatory -->
        <g transform="translate(60, 45)">
          <rect width="680" height="410" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Header -->
          <rect width="680" height="38" rx="10" fill="#121712"/>
          <circle cx="25" cy="19" r="4" fill="#A3FF12"/>
          <rect x="40" y="15" width="120" height="8" rx="3" fill="#FFF" fill-opacity="0.8"/>
          <rect x="560" y="11" width="95" height="16" rx="5" fill="#1A261A" stroke="#A3FF12" stroke-opacity="0.5"/>
          <rect x="575" y="16" width="65" height="6" rx="2" fill="#A3FF12"/>
          <!-- Shield & Health Meters -->
          <g transform="translate(35, 65)">
            <!-- Central Shield -->
            <rect width="280" height="300" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <path d="M 140 50 L 210 80 L 210 160 Q 140 220 140 230 Q 140 220 70 160 L 70 80 Z" fill="#162016" stroke="#A3FF12" stroke-width="2"/>
            <circle cx="140" cy="135" r="22" fill="#1F2E1F"/>
            <path d="M 130 135 L 137 142 L 152 127" fill="none" stroke="#A3FF12" stroke-width="3" stroke-linecap="round"/>

            <!-- Right: 3 Metric Cards -->
            <g transform="translate(310, 0)">
              <!-- Card 1 -->
              <rect width="300" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="20" y="18" width="80" height="7" rx="3" fill="#FFF" fill-opacity="0.4"/>
              <rect x="20" y="35" width="120" height="16" rx="3" fill="#A3FF12"/>
              <rect x="20" y="62" width="260" height="6" rx="3" fill="#1C241C"/>
              <rect x="20" y="62" width="258" height="6" rx="3" fill="#A3FF12"/>

              <!-- Card 2 -->
              <g transform="translate(0, 105)">
                <rect width="300" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
                <rect x="20" y="18" width="80" height="7" rx="3" fill="#FFF" fill-opacity="0.4"/>
                <rect x="20" y="35" width="120" height="16" rx="3" fill="#F5F7F2"/>
                <rect x="20" y="62" width="260" height="6" rx="3" fill="#1C241C"/>
                <rect x="20" y="62" width="245" height="6" rx="3" fill="#A3FF12"/>
              </g>

              <!-- Card 3 -->
              <g transform="translate(0, 210)">
                <rect width="300" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
                <rect x="20" y="18" width="80" height="7" rx="3" fill="#FFF" fill-opacity="0.4"/>
                <rect x="20" y="35" width="120" height="16" rx="3" fill="#A3FF12"/>
                <rect x="20" y="62" width="260" height="6" rx="3" fill="#1C241C"/>
                <rect x="20" y="62" width="252" height="6" rx="3" fill="#A3FF12"/>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'ai-workflows.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141C14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Autonomous Workflow Node Canvas -->
        <g transform="translate(60, 45)">
          <rect width="680" height="410" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Connecting Paths -->
          <path d="M 160 140 C 240 140, 240 210, 320 210" fill="none" stroke="#A3FF12" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M 160 280 C 240 280, 240 210, 320 210" fill="none" stroke="#A3FF12" stroke-width="2" stroke-dasharray="4 4"/>
          <path d="M 440 210 C 500 210, 500 140, 560 140" fill="none" stroke="#A3FF12" stroke-width="2"/>
          <path d="M 440 210 C 500 210, 500 280, 560 280" fill="none" stroke="#A3FF12" stroke-width="2"/>
          <!-- Node 1 (Input trigger) -->
          <g transform="translate(40, 100)">
            <rect width="130" height="75" rx="8" fill="#121712" stroke="#FFF" stroke-opacity="0.1"/>
            <circle cx="20" cy="22" r="4" fill="#A3FF12"/>
            <rect x="32" y="19" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.8"/>
            <rect x="15" y="42" width="100" height="18" rx="4" fill="#182218"/>
          </g>
          <!-- Node 2 (Webhook trigger) -->
          <g transform="translate(40, 240)">
            <rect width="130" height="75" rx="8" fill="#121712" stroke="#FFF" stroke-opacity="0.1"/>
            <circle cx="20" cy="22" r="4" fill="#FFF" fill-opacity="0.5"/>
            <rect x="32" y="19" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.8"/>
            <rect x="15" y="42" width="100" height="18" rx="4" fill="#182218"/>
          </g>
          <!-- Center Node: AI Reasoning Core -->
          <g transform="translate(300, 160)">
            <rect width="150" height="100" rx="10" fill="#162216" stroke="#A3FF12" stroke-width="1.5"/>
            <circle cx="75" cy="38" r="14" fill="#A3FF12"/>
            <circle cx="75" cy="38" r="7" fill="#080A08"/>
            <rect x="25" y="65" width="100" height="8" rx="3" fill="#F5F7F2"/>
            <rect x="35" y="80" width="80" height="6" rx="2" fill="#A3FF12"/>
          </g>
          <!-- Output Node 1 (CRM Sync) -->
          <g transform="translate(520, 100)">
            <rect width="130" height="75" rx="8" fill="#121712" stroke="#FFF" stroke-opacity="0.1"/>
            <circle cx="20" cy="22" r="4" fill="#A3FF12"/>
            <rect x="32" y="19" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.8"/>
            <rect x="15" y="42" width="100" height="18" rx="4" fill="#182218"/>
          </g>
          <!-- Output Node 2 (Notification Action) -->
          <g transform="translate(520, 240)">
            <rect width="130" height="75" rx="8" fill="#121712" stroke="#FFF" stroke-opacity="0.1"/>
            <circle cx="20" cy="22" r="4" fill="#A3FF12"/>
            <rect x="32" y="19" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.8"/>
            <rect x="15" y="42" width="100" height="18" rx="4" fill="#182218"/>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'chatbots.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141A14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Conversational Interface Concept -->
        <g transform="translate(180, 45)">
          <rect width="440" height="410" rx="14" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Header -->
          <rect width="440" height="50" rx="14" fill="#121712"/>
          <circle cx="30" cy="25" r="7" fill="#A3FF12"/>
          <rect x="48" y="18" width="90" height="8" rx="3" fill="#F5F7F2"/>
          <rect x="48" y="30" width="50" height="5" rx="2" fill="#A3FF12"/>
          <!-- Messages -->
          <g transform="translate(25, 75)">
            <!-- Bot message 1 -->
            <rect width="280" height="52" rx="10" fill="#141C14" stroke="#FFF" stroke-opacity="0.05"/>
            <rect x="16" y="14" width="220" height="8" rx="3" fill="#F5F7F2"/>
            <rect x="16" y="28" width="170" height="8" rx="3" fill="#FFF" fill-opacity="0.5"/>

            <!-- User message -->
            <g transform="translate(120, 70)">
              <rect width="270" height="42" rx="10" fill="#A3FF12"/>
              <rect x="16" y="16" width="210" height="8" rx="3" fill="#080A08"/>
            </g>

            <!-- Bot response with booking card -->
            <g transform="translate(0, 130)">
              <rect width="320" height="100" rx="10" fill="#141C14" stroke="#A3FF12" stroke-opacity="0.3"/>
              <rect x="16" y="14" width="240" height="8" rx="3" fill="#F5F7F2"/>
              <!-- Calendar / action chips inside bot card -->
              <rect x="16" y="34" width="85" height="24" rx="4" fill="#1A261A" stroke="#A3FF12" stroke-opacity="0.5"/>
              <rect x="26" y="42" width="60" height="6" rx="2" fill="#A3FF12"/>
              <rect x="110" y="34" width="85" height="24" rx="4" fill="#121712" stroke="#FFF" stroke-opacity="0.1"/>
              <rect x="120" y="42" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.5"/>
              <rect x="16" y="68" width="180" height="20" rx="5" fill="#A3FF12"/>
              <rect x="50" y="75" width="110" height="6" rx="2" fill="#080A08"/>
            </g>

            <!-- Input bar bottom -->
            <g transform="translate(0, 255)">
              <rect width="390" height="44" rx="8" fill="#101410" stroke="#FFF" stroke-opacity="0.1"/>
              <rect x="16" y="18" width="140" height="8" rx="3" fill="#FFF" fill-opacity="0.3"/>
              <circle cx="365" cy="22" r="12" fill="#A3FF12"/>
              <path d="M 360 22 L 370 22 M 366 18 L 370 22 L 366 26" fill="none" stroke="#080A08" stroke-width="1.8" stroke-linecap="round"/>
            </g>
          </g>
        </g>
      </svg>
    `
  },
  {
    filename: 'digital-growth.webp',
    svg: `
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#141B14"/><stop offset="100%" stop-color="#080A08"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bg)"/>
        <!-- Growth & Conversion Metrics Visualizer -->
        <g transform="translate(60, 45)">
          <rect width="680" height="410" rx="10" fill="#0C100C" stroke="#FFF" stroke-opacity="0.08"/>
          <!-- Top bar -->
          <rect width="680" height="40" rx="10" fill="#121712"/>
          <circle cx="25" cy="20" r="4" fill="#A3FF12"/>
          <rect x="40" y="16" width="140" height="8" rx="3" fill="#FFF" fill-opacity="0.8"/>
          <!-- Conversion Funnel & Trend -->
          <g transform="translate(30, 65)">
            <!-- Left: Growth Chart -->
            <rect width="390" height="305" rx="8" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
            <rect x="20" y="20" width="110" height="8" rx="3" fill="#F5F7F2"/>
            <rect x="20" y="36" width="60" height="14" rx="3" fill="#A3FF12"/>
            <!-- Trend Line -->
            <path d="M 30 240 C 90 230, 150 180, 210 160 C 270 140, 310 90, 360 60" fill="none" stroke="#A3FF12" stroke-width="3" stroke-linecap="round"/>
            <polygon points="30,240 90,230 150,180 210,160 270,140 310,90 360,60 360,260 30,260" fill="#A3FF12" fill-opacity="0.08"/>
            <circle cx="360" cy="60" r="5" fill="#A3FF12"/>

            <!-- Right: 3 Metric Cards -->
            <g transform="translate(410, 0)">
              <!-- Card 1 -->
              <rect width="210" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
              <rect x="16" y="16" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
              <rect x="16" y="32" width="100" height="16" rx="3" fill="#A3FF12"/>
              <rect x="16" y="58" width="150" height="5" rx="2" fill="#FFF" fill-opacity="0.2"/>

              <!-- Card 2 -->
              <g transform="translate(0, 105)">
                <rect width="210" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
                <rect x="16" y="16" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
                <rect x="16" y="32" width="100" height="16" rx="3" fill="#F5F7F2"/>
                <rect x="16" y="58" width="150" height="5" rx="2" fill="#FFF" fill-opacity="0.2"/>
              </g>

              <!-- Card 3 -->
              <g transform="translate(0, 210)">
                <rect width="210" height="90" rx="6" fill="#101510" stroke="#FFF" stroke-opacity="0.06"/>
                <rect x="16" y="16" width="60" height="6" rx="2" fill="#FFF" fill-opacity="0.4"/>
                <rect x="16" y="32" width="100" height="16" rx="3" fill="#A3FF12"/>
                <rect x="16" y="58" width="150" height="5" rx="2" fill="#FFF" fill-opacity="0.2"/>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `
  }
];

async function run() {
  for (const item of services) {
    const dest = path.resolve('public/assets/services', item.filename);
    const buf = await sharp(Buffer.from(item.svg))
      .webp({ quality: 90, effort: 6 })
      .toBuffer();
    fs.writeFileSync(dest, buf);
    console.log(`Generated service asset: ${item.filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
