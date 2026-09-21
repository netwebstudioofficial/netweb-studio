import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateResponsiveAsset() {
  const width = 800;
  const height = 500;

  // Premium studio environment showcasing responsive web design across 3 realistic devices:
  // 1. Desktop widescreen display (rear-center / left-weighted, largest)
  // 2. Tablet display (mid-ground, right-center)
  // 3. Smartphone (foreground, front-right)
  // All screens showcase the consistent NetWeb dark luxury interface:
  // - Top navbar with minimal pill controls
  // - Clean architectural hero preview
  // - Distinct typographic hierarchy and cards adapted to each viewport width
  // - Charcoal/black studio pedestal table with realistic reflections and subtle studio lighting
  // - Color palette: #080A08, #101410, #182018, off-white UI (#F5F7F2), subtle #A3FF12 lime accent

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Studio Environment Radial Atmosphere -->
      <radialGradient id="studioAtmosphere" cx="50%" cy="38%" r="65%">
        <stop offset="0%" stop-color="#161C16" />
        <stop offset="45%" stop-color="#0E120E" />
        <stop offset="100%" stop-color="#080A08" />
      </radialGradient>

      <!-- Pedestal / Table Surface Linear Gradient -->
      <linearGradient id="tableSurface" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#131713" stop-opacity="0.9" />
        <stop offset="40%" stop-color="#0B0E0B" />
        <stop offset="100%" stop-color="#060806" />
      </linearGradient>

      <!-- Desktop Screen Chassis -->
      <linearGradient id="chassisMetal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2A302A" />
        <stop offset="50%" stop-color="#1E231E" />
        <stop offset="100%" stop-color="#151915" />
      </linearGradient>

      <!-- Screen Glow / Bezel -->
      <filter id="deviceShadow" x="-15%" y="-15%" width="130%" height="135%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.8" />
      </filter>

      <filter id="fgDeviceShadow" x="-20%" y="-20%" width="140%" height="145%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="-6" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.95" />
      </filter>

      <!-- Subtle Lime Accent Glow -->
      <filter id="limeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#A3FF12" flood-opacity="0.3" />
      </filter>

      <!-- Screen Reflection Gradient -->
      <linearGradient id="screenGlassGleam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.06"/>
        <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.02"/>
        <stop offset="65%" stop-color="#000000" stop-opacity="0.0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.2"/>
      </linearGradient>
    </defs>

    <!-- Studio Background Canvas -->
    <rect width="${width}" height="${height}" fill="url(#studioAtmosphere)" />

    <!-- Subtle Horizontal Studio Perspective Horizon & Table Pedestal -->
    <path d="M 0 350 Q 400 340 800 350 L 800 500 L 0 500 Z" fill="url(#tableSurface)" />
    <line x1="0" y1="350" x2="800" y2="350" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />

    <!-- Table Surface Subtle Reflection of Displays -->
    <ellipse cx="360" cy="405" rx="280" ry="30" fill="#A3FF12" fill-opacity="0.02" />
    <ellipse cx="580" cy="415" rx="140" ry="22" fill="#FFFFFF" fill-opacity="0.03" />

    <!-- ================================================================= -->
    <!-- 1. DESKTOP MONITOR (Background / Left-Center, Primary Device)     -->
    <!-- Position: x=60, y=55, width=470, height=295                       -->
    <!-- ================================================================= -->
    <g filter="url(#deviceShadow)">
      <!-- Monitor Stand & Base -->
      <path d="M 280 340 L 310 340 L 314 365 L 276 365 Z" fill="url(#chassisMetal)" />
      <ellipse cx="295" cy="366" rx="55" ry="7" fill="#182018" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      <line x1="245" y1="366" x2="345" y2="366" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- Outer Bezel -->
      <rect x="60" y="55" width="470" height="290" rx="10" fill="#131613" stroke="#2E362E" stroke-width="2" />
      <!-- Chin / Bottom Bezel Bar -->
      <rect x="60" y="330" width="470" height="15" rx="2" fill="#181D18" />
      <circle cx="295" cy="337" r="1.5" fill="#FFFFFF" fill-opacity="0.3" />

      <!-- Active Display Canvas -->
      <g transform="translate(68, 63)">
        <rect width="454" height="267" rx="3" fill="#080A08" />
        
        <!-- Desktop UI Header / Navbar -->
        <rect x="0" y="0" width="454" height="24" fill="#0F130F" />
        <circle cx="16" cy="12" r="3.5" fill="#A3FF12" />
        <rect x="26" y="10" width="40" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.8" />
        <!-- Nav Links -->
        <rect x="180" y="10" width="22" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
        <rect x="212" y="10" width="26" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
        <rect x="248" y="10" width="24" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
        <!-- Action Button in Nav -->
        <rect x="390" y="6" width="50" height="12" rx="4" fill="#A3FF12" filter="url(#limeGlow)" />
        <rect x="402" y="10" width="26" height="4" rx="2" fill="#080A08" />

        <!-- Desktop Hero Grid Layout (2-Column) -->
        <!-- Left Hero Content -->
        <g transform="translate(20, 42)">
          <rect x="0" y="0" width="55" height="7" rx="3.5" fill="#A3FF12" fill-opacity="0.18" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="0.7" />
          <rect x="6" y="2" width="43" height="3" rx="1.5" fill="#A3FF12" />
          
          <!-- Large Display Headline Bars -->
          <rect x="0" y="15" width="165" height="14" rx="4" fill="#F5F7F2" />
          <rect x="0" y="34" width="140" height="14" rx="4" fill="#F5F7F2" />
          <rect x="0" y="53" width="90" height="14" rx="4" fill="#A3FF12" />

          <!-- Subtitle / Body Copy -->
          <rect x="0" y="76" width="170" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
          <rect x="0" y="84" width="155" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
          <rect x="0" y="92" width="120" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />

          <!-- CTA Buttons -->
          <rect x="0" y="108" width="70" height="18" rx="5" fill="#A3FF12" />
          <rect x="16" y="115" width="38" height="4" rx="2" fill="#080A08" />

          <rect x="78" y="108" width="65" height="18" rx="5" fill="#182018" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="0.8" />
          <rect x="92" y="115" width="37" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.7" />
        </g>

        <!-- Right Hero Visual Showcase Inside Desktop Display -->
        <g transform="translate(215, 42)">
          <rect width="218" height="135" rx="8" fill="#141914" stroke="#FFFFFF" stroke-opacity="0.1" />
          <!-- Abstract Architectural Villa inside desktop screen -->
          <rect x="0" y="0" width="218" height="135" rx="8" fill="#101510" />
          <!-- Architectural Glass Walls & Light -->
          <polygon points="50,135 150,45 218,80 218,135" fill="#192219" />
          <polygon points="120,60 190,85 190,135 120,135" fill="#202A20" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="0.8" />
          <line x1="120" y1="85" x2="190" y2="110" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" />
          <!-- Ambient warm architectural light glow in window -->
          <rect x="135" y="95" width="38" height="28" rx="3" fill="#E8C988" fill-opacity="0.25" />
          
          <!-- Floating UI Badge on Desktop Hero -->
          <rect x="12" y="14" width="75" height="16" rx="4" fill="#080A08" fill-opacity="0.9" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="0.7" />
          <rect x="18" y="20" width="45" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.8" />
          <circle cx="78" cy="22" r="2.5" fill="#A3FF12" />
        </g>

        <!-- Desktop 3-Column Content Cards Bar (Lower Third) -->
        <g transform="translate(20, 195)">
          <rect x="0" y="0" width="130" height="58" rx="6" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
          <rect x="10" y="10" width="30" height="4" rx="2" fill="#A3FF12" />
          <rect x="10" y="20" width="80" height="7" rx="3" fill="#FFFFFF" fill-opacity="0.85" />
          <rect x="10" y="34" width="105" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.3" />

          <rect x="142" y="0" width="130" height="58" rx="6" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
          <rect x="152" y="10" width="30" height="4" rx="2" fill="#A3FF12" />
          <rect x="152" y="20" width="80" height="7" rx="3" fill="#FFFFFF" fill-opacity="0.85" />
          <rect x="152" y="34" width="105" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.3" />

          <rect x="284" y="0" width="130" height="58" rx="6" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
          <rect x="294" y="10" width="30" height="4" rx="2" fill="#A3FF12" />
          <rect x="294" y="20" width="80" height="7" rx="3" fill="#FFFFFF" fill-opacity="0.85" />
          <rect x="294" y="34" width="105" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.3" />
        </g>

        <!-- Gloss Glare on Screen -->
        <polygon points="0,0 200,0 40,267 0,267" fill="url(#screenGlassGleam)" />
      </g>
    </g>

    <!-- ================================================================= -->
    <!-- 2. TABLET DEVICE (Midground / Right-Center, Overlapping Monitor)  -->
    <!-- Position: x=465, y=145, width=225, height=310 (Portrait Tablet)   -->
    <!-- ================================================================= -->
    <g filter="url(#fgDeviceShadow)">
      <!-- Tablet Aluminum Bezel & Body -->
      <rect x="465" y="145" width="225" height="310" rx="18" fill="#141814" stroke="#363E36" stroke-width="2" />
      <rect x="467" y="147" width="221" height="306" rx="16" fill="#0C0F0C" />
      <!-- Camera sensor -->
      <circle cx="577" cy="154" r="2" fill="#2A302A" />

      <!-- Active Display (Tablet adapts layout to stacked 1-col/hybrid) -->
      <g transform="translate(477, 163)">
        <rect width="201" height="274" rx="6" fill="#080A08" />
        
        <!-- Tablet Navbar -->
        <rect x="0" y="0" width="201" height="22" fill="#101510" />
        <circle cx="12" cy="11" r="3" fill="#A3FF12" />
        <rect x="20" y="9" width="34" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.8" />
        <!-- Hamburger Menu Icon on Tablet -->
        <line x1="175" y1="8" x2="190" y2="8" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" />
        <line x1="175" y1="12" x2="190" y2="12" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" />
        <line x1="175" y1="16" x2="190" y2="16" stroke="#A3FF12" stroke-width="1.5" stroke-linecap="round" />

        <!-- Tablet Responsive Hero Content (Stacked layout) -->
        <g transform="translate(14, 30)">
          <!-- Eyebrow Pill -->
          <rect x="0" y="0" width="46" height="6" rx="3" fill="#A3FF12" fill-opacity="0.2" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="0.6" />
          <rect x="5" y="2" width="36" height="2" rx="1" fill="#A3FF12" />

          <!-- Large Headline Adapted for Tablet -->
          <rect x="0" y="11" width="130" height="10" rx="3" fill="#F5F7F2" />
          <rect x="0" y="24" width="105" height="10" rx="3" fill="#F5F7F2" />
          <rect x="0" y="37" width="80" height="10" rx="3" fill="#A3FF12" />

          <!-- CTA Pill Buttons Stacked -->
          <g transform="translate(0, 54)">
            <rect x="0" y="0" width="55" height="14" rx="4" fill="#A3FF12" />
            <rect x="12" y="5" width="31" height="4" rx="2" fill="#080A08" />
            <rect x="62" y="0" width="55" height="14" rx="4" fill="#161C16" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="0.7" />
            <rect x="74" y="5" width="31" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.7" />
          </g>

          <!-- Tablet Visual Showcase Container -->
          <g transform="translate(0, 78)">
            <rect width="173" height="78" rx="6" fill="#121712" stroke="#FFFFFF" stroke-opacity="0.1" />
            <!-- Architecture matching desktop -->
            <polygon points="30,78 100,25 173,50 173,78" fill="#1A241A" />
            <rect x="95" y="45" width="28" height="20" rx="2" fill="#E8C988" fill-opacity="0.3" />
            
            <rect x="8" y="8" width="50" height="11" rx="3" fill="#080A08" fill-opacity="0.9" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="0.6" />
            <circle cx="14" cy="13" r="2" fill="#A3FF12" />
            <rect x="20" y="11" width="30" height="3" rx="1.5" fill="#FFFFFF" fill-opacity="0.8" />
          </g>

          <!-- Tablet 2-Col Adapted Feature Cards -->
          <g transform="translate(0, 166)">
            <rect x="0" y="0" width="82" height="45" rx="5" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
            <rect x="6" y="7" width="20" height="3" rx="1.5" fill="#A3FF12" />
            <rect x="6" y="14" width="55" height="5" rx="2" fill="#FFFFFF" fill-opacity="0.85" />
            <rect x="6" y="24" width="68" height="3" rx="1.5" fill="#FFFFFF" fill-opacity="0.3" />

            <rect x="91" y="0" width="82" height="45" rx="5" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
            <rect x="97" y="7" width="20" height="3" rx="1.5" fill="#A3FF12" />
            <rect x="97" y="14" width="55" height="5" rx="2" fill="#FFFFFF" fill-opacity="0.85" />
            <rect x="97" y="24" width="68" height="3" rx="1.5" fill="#FFFFFF" fill-opacity="0.3" />
          </g>
        </g>

        <!-- Tablet Screen Gloss Reflection -->
        <polygon points="0,0 80,0 20,274 0,274" fill="url(#screenGlassGleam)" />
      </g>
    </g>

    <!-- ================================================================= -->
    <!-- 3. SMARTPHONE DEVICE (Foreground / Front-Right, High Detail)      -->
    <!-- Position: x=630, y=210, width=128, height=255 (Portrait Phone)    -->
    <!-- ================================================================= -->
    <g filter="url(#fgDeviceShadow)">
      <!-- Smartphone Titanium Rim -->
      <rect x="630" y="210" width="128" height="255" rx="22" fill="#1A201A" stroke="#424D42" stroke-width="2" />
      <rect x="632" y="212" width="124" height="251" rx="20" fill="#0A0C0A" />

      <!-- Active Display -->
      <g transform="translate(637, 218)">
        <rect width="114" height="239" rx="15" fill="#080A08" />
        
        <!-- Dynamic Island / Speaker Notch -->
        <rect x="42" y="4" width="30" height="7" rx="3.5" fill="#000000" />
        <circle cx="66" cy="7.5" r="1.5" fill="#182018" />

        <!-- Mobile Top Navbar -->
        <g transform="translate(8, 18)">
          <circle cx="5" cy="5" r="3" fill="#A3FF12" />
          <rect x="12" y="3" width="24" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.8" />
          <!-- Mobile Menu Trigger -->
          <line x1="88" y1="3" x2="98" y2="3" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.2" stroke-linecap="round" />
          <line x1="88" y1="7" x2="98" y2="7" stroke="#A3FF12" stroke-width="1.2" stroke-linecap="round" />
        </g>

        <!-- Mobile Hero Stack (Single Column Fluid Scaling) -->
        <g transform="translate(8, 38)">
          <!-- Eyebrow Tag -->
          <rect x="0" y="0" width="36" height="5" rx="2.5" fill="#A3FF12" fill-opacity="0.2" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="0.5" />
          <rect x="4" y="1.5" width="28" height="2" rx="1" fill="#A3FF12" />

          <!-- Large Headline scaled for touch -->
          <rect x="0" y="9" width="80" height="8" rx="2" fill="#F5F7F2" />
          <rect x="0" y="20" width="65" height="8" rx="2" fill="#F5F7F2" />
          <rect x="0" y="31" width="50" height="8" rx="2" fill="#A3FF12" />

          <!-- Fluid CTA Full Width on Phone -->
          <rect x="0" y="45" width="98" height="15" rx="4" fill="#A3FF12" />
          <rect x="26" y="50" width="46" height="5" rx="2" fill="#080A08" />

          <!-- Mobile Hero Image Module -->
          <g transform="translate(0, 68)">
            <rect width="98" height="55" rx="5" fill="#141A14" stroke="#FFFFFF" stroke-opacity="0.1" />
            <!-- Architecture matching desktop/tablet -->
            <polygon points="15,55 55,20 98,35 98,55" fill="#1D281D" />
            <rect x="52" y="32" width="18" height="14" rx="2" fill="#E8C988" fill-opacity="0.35" />
            
            <rect x="4" y="5" width="34" height="8" rx="2" fill="#080A08" fill-opacity="0.9" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="0.5" />
            <circle cx="8" cy="9" r="1.5" fill="#A3FF12" />
            <rect x="12" y="7.5" width="20" height="2.5" rx="1" fill="#FFFFFF" fill-opacity="0.8" />
          </g>

          <!-- 44px+ Ergonomic Mobile Touch Targets Stack -->
          <g transform="translate(0, 130)">
            <rect x="0" y="0" width="98" height="24" rx="4" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
            <circle cx="8" cy="12" r="3" fill="#A3FF12" fill-opacity="0.3" />
            <rect x="16" y="7" width="42" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.8" />
            <rect x="16" y="14" width="60" height="2.5" rx="1" fill="#FFFFFF" fill-opacity="0.3" />

            <rect x="0" y="28" width="98" height="24" rx="4" fill="#121612" stroke="#FFFFFF" stroke-opacity="0.08" />
            <circle cx="8" cy="40" r="3" fill="#A3FF12" fill-opacity="0.3" />
            <rect x="16" y="35" width="42" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.8" />
            <rect x="16" y="42" width="60" height="2.5" rx="1" fill="#FFFFFF" fill-opacity="0.3" />
          </g>
        </g>

        <!-- Smartphone Glass Gleam -->
        <polygon points="0,0 50,0 15,239 0,239" fill="url(#screenGlassGleam)" />
      </g>
    </g>

    <!-- Subtle Edge Vignette -->
    <rect width="${width}" height="${height}" fill="none" stroke="#080A08" stroke-width="8" stroke-opacity="0.6" />
  </svg>
  `;

  const destPath = path.resolve('public/assets/craft-responsive.webp');

  const processed = await sharp(Buffer.from(svg))
    .webp({ quality: 92, effort: 6 })
    .toFile(destPath);

  const stats = fs.statSync(destPath);
  console.log('Saved to:', destPath);
  console.log('Dimensions:', processed.width, 'x', processed.height);
  console.log('File size:', stats.size, 'bytes', `(${(stats.size / 1024).toFixed(2)} KB)`);
}

generateResponsiveAsset().catch(console.error);
