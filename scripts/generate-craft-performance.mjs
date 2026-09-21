import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generatePerformanceCard() {
  const width = 800;
  const height = 500;

  // Ultra-crisp technical telemetry & performance benchmark visual:
  // - 100/100 Core Web Vitals score ring / telemetry meter in NetWeb Lime (#A3FF12)
  // - Response timeline: TTFB 42ms, FCP 0.3s, LCP 0.6s, CLS 0.00
  // - Clean geometric waveform/latency traces on dark matrix grid (#080A08)
  // - Professional devtools / observatory telemetry without fake text or logos
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="perfGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#141C14"/>
        <stop offset="60%" stop-color="#0A0E0A"/>
        <stop offset="100%" stop-color="#080A08"/>
      </radialGradient>
      <pattern id="matrixGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="0.8"/>
      </pattern>
      <filter id="limeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#A3FF12" flood-opacity="0.45"/>
      </filter>
      <filter id="panelShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.7"/>
      </filter>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#perfGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#matrixGrid)"/>

    <!-- Central Gauge HUD & Telemetry Modules -->
    <g transform="translate(60, 45)" filter="url(#panelShadow)">
      <!-- Main Console Frame -->
      <rect width="680" height="410" rx="12" fill="#0C100C" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1"/>
      
      <!-- Top Bar Console Header -->
      <rect x="0" y="0" width="680" height="36" rx="12" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.06"/>
      <circle cx="24" cy="18" r="4" fill="#A3FF12"/>
      <circle cx="38" cy="18" r="3" fill="#FFFFFF" fill-opacity="0.2"/>
      <circle cx="50" cy="18" r="3" fill="#FFFFFF" fill-opacity="0.2"/>
      <rect x="75" y="14" width="80" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.6"/>
      <rect x="560" y="12" width="95" height="14" rx="4" fill="#182218" stroke="#A3FF12" stroke-opacity="0.4"/>
      <rect x="572" y="16" width="70" height="5" rx="2.5" fill="#A3FF12"/>

      <!-- Gauge Module Left: 100/100 Core Web Vitals Benchmark -->
      <g transform="translate(40, 60)">
        <rect width="250" height="310" rx="8" fill="#101510" stroke="#FFFFFF" stroke-opacity="0.06"/>
        
        <!-- Arc Gauge 100% -->
        <circle cx="125" cy="120" r="72" fill="none" stroke="#1D261D" stroke-width="12"/>
        <circle cx="125" cy="120" r="72" fill="none" stroke="#A3FF12" stroke-width="12" stroke-dasharray="410 452" stroke-linecap="round" filter="url(#limeGlow)" transform="rotate(-90 125 120)"/>
        
        <!-- Score Digits Representation (Clean Graphic 100) -->
        <rect x="100" y="104" width="12" height="32" rx="3" fill="#A3FF12"/>
        <rect x="118" y="104" width="16" height="32" rx="4" fill="none" stroke="#A3FF12" stroke-width="4"/>
        <rect x="138" y="104" width="16" height="32" rx="4" fill="none" stroke="#A3FF12" stroke-width="4"/>

        <!-- Metrics Bars -->
        <g transform="translate(25, 215)">
          <rect x="0" y="0" width="60" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.7"/>
          <rect x="0" y="10" width="200" height="5" rx="2.5" fill="#1C241C"/>
          <rect x="0" y="10" width="190" height="5" rx="2.5" fill="#A3FF12"/>

          <rect x="0" y="26" width="50" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.7"/>
          <rect x="0" y="36" width="200" height="5" rx="2.5" fill="#1C241C"/>
          <rect x="0" y="36" width="180" height="5" rx="2.5" fill="#A3FF12"/>

          <rect x="0" y="52" width="70" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.7"/>
          <rect x="0" y="62" width="200" height="5" rx="2.5" fill="#1C241C"/>
          <rect x="0" y="62" width="195" height="5" rx="2.5" fill="#A3FF12"/>
        </g>
      </g>

      <!-- Waveform Latency Stream Right -->
      <g transform="translate(315, 60)">
        <rect width="325" height="175" rx="8" fill="#101510" stroke="#FFFFFF" stroke-opacity="0.06"/>
        <rect x="16" y="16" width="90" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.6"/>
        <circle cx="295" cy="20" r="3" fill="#A3FF12"/>

        <!-- Latency Waveform Path -->
        <path d="M 20 120 L 70 120 L 85 65 L 105 145 L 125 90 L 145 120 L 195 120 L 210 50 L 230 135 L 250 100 L 270 120 L 305 120" 
              fill="none" stroke="#A3FF12" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#limeGlow)"/>
        
        <!-- Reference threshold guide line -->
        <line x1="20" y1="95" x2="305" y2="95" stroke="#FFFFFF" stroke-opacity="0.15" stroke-dasharray="3 3"/>
      </g>

      <!-- 3 Small Performance Telemetry Cards Bottom Right -->
      <g transform="translate(315, 255)">
        <!-- Box 1 -->
        <rect x="0" y="0" width="100" height="115" rx="8" fill="#101510" stroke="#FFFFFF" stroke-opacity="0.06"/>
        <rect x="12" y="14" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.4"/>
        <rect x="12" y="32" width="60" height="16" rx="4" fill="#A3FF12"/>
        <rect x="12" y="60" width="75" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>
        <rect x="12" y="72" width="60" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>

        <!-- Box 2 -->
        <rect x="112" y="0" width="100" height="115" rx="8" fill="#101510" stroke="#FFFFFF" stroke-opacity="0.06"/>
        <rect x="124" y="14" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.4"/>
        <rect x="124" y="32" width="60" height="16" rx="4" fill="#F5F7F2"/>
        <rect x="124" y="60" width="75" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>
        <rect x="124" y="72" width="60" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>

        <!-- Box 3 -->
        <rect x="224" y="0" width="100" height="115" rx="8" fill="#101510" stroke="#FFFFFF" stroke-opacity="0.06"/>
        <rect x="236" y="14" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.4"/>
        <rect x="236" y="32" width="60" height="16" rx="4" fill="#A3FF12"/>
        <rect x="236" y="60" width="75" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>
        <rect x="236" y="72" width="60" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.2"/>
      </g>
    </g>
  </svg>
  `;

  const destPath = path.resolve('public/assets/craft-performance.webp');
  await sharp(Buffer.from(svg))
    .webp({ quality: 92, effort: 6 })
    .toFile(destPath);
  const stats = fs.statSync(destPath);
  console.log('Craft performance saved:', destPath, `${(stats.size/1024).toFixed(2)} KB`);
}

generatePerformanceCard().catch(console.error);
