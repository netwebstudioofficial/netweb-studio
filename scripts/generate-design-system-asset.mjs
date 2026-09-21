import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateDesignSystemCanvas() {
  const width = 800;
  const height = 500;

  // We construct a high-fidelity vector SVG representation of a professional dark design system workspace.
  // It features modular UI components, layout grid guides, token swatches, typography hierarchy scales,
  // card component states, buttons, pills, and input components in crisp geometric modernist detail.
  // Color palette: #080A08, #101410, #161A16, subtle borders #FFFFFF (0.08-0.15), and subtle lime #A3FF12 accents.
  // No readable words, no logos, no fake text.
  
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Workspace Background Gradient -->
      <radialGradient id="workspaceGlow" cx="65%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#141914" />
        <stop offset="50%" stop-color="#0E120E" />
        <stop offset="100%" stop-color="#080A08" />
      </radialGradient>

      <!-- Grid Pattern -->
      <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.9" fill="#FFFFFF" fill-opacity="0.07" />
      </pattern>

      <!-- Glass/Surface Gradient -->
      <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#181D18" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#101410" stop-opacity="0.95"/>
      </linearGradient>

      <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1B221B"/>
        <stop offset="100%" stop-color="#111511"/>
      </linearGradient>

      <linearGradient id="limeAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#A3FF12" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#8CE605" stop-opacity="0.9"/>
      </linearGradient>

      <!-- Card Shadow -->
      <filter id="canvasShadow" x="-10%" y="-10%" width="120%" height="125%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      
      <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#A3FF12" flood-opacity="0.25"/>
      </filter>
    </defs>

    <!-- Base Canvas Background -->
    <rect width="${width}" height="${height}" fill="url(#workspaceGlow)" />
    <rect width="${width}" height="${height}" fill="url(#dotGrid)" />

    <!-- Isometric/Orthogonal Blueprint Guide Lines -->
    <line x1="40" y1="0" x2="40" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
    <line x1="280" y1="0" x2="280" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
    <line x1="530" y1="0" x2="530" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
    <line x1="760" y1="0" x2="760" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
    <line x1="0" y1="50" x2="${width}" y2="50" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
    <line x1="0" y1="260" x2="${width}" y2="260" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />

    <!-- Alignment measurement marker -->
    <line x1="280" y1="120" x2="310" y2="120" stroke="#A3FF12" stroke-opacity="0.35" stroke-dasharray="2,2" stroke-width="1" />
    <rect x="286" y="114" width="18" height="12" rx="3" fill="#080A08" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="0.8" />
    <rect x="290" y="119" width="10" height="2" fill="#A3FF12" rx="1" />

    <!-- ======================================================== -->
    <!-- FRAME 1: Component Library / Token Specs (Left Column)   -->
    <!-- ======================================================== -->
    <g transform="translate(48, 45)" filter="url(#canvasShadow)">
      <!-- Frame Box -->
      <rect width="216" height="380" rx="10" fill="url(#cardGrad1)" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      
      <!-- Frame Header -->
      <rect x="14" y="14" width="70" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.6" />
      <rect x="14" y="26" width="40" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.25" />
      <circle cx="198" cy="18" r="3" fill="#FFFFFF" fill-opacity="0.2" />

      <line x1="14" y1="42" x2="202" y2="42" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- Color Token Swatches Row -->
      <rect x="14" y="52" width="22" height="22" rx="5" fill="#080A08" stroke="#FFFFFF" stroke-opacity="0.2" />
      <rect x="42" y="52" width="22" height="22" rx="5" fill="#141914" stroke="#FFFFFF" stroke-opacity="0.2" />
      <rect x="70" y="52" width="22" height="22" rx="5" fill="#222B22" stroke="#FFFFFF" stroke-opacity="0.2" />
      <rect x="98" y="52" width="22" height="22" rx="5" fill="#A3FF12" filter="url(#subtleGlow)" />
      <rect x="126" y="52" width="22" height="22" rx="5" fill="#F5F7F2" />
      <rect x="154" y="52" width="22" height="22" rx="5" fill="#6A7368" />

      <!-- Typography Scale Stacks (Visual Hierarchy Bars) -->
      <g transform="translate(14, 90)">
        <rect x="0" y="0" width="130" height="12" rx="4" fill="#F5F7F2" fill-opacity="0.9" />
        <rect x="150" y="3" width="38" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.2" />

        <rect x="0" y="20" width="105" height="9" rx="3" fill="#F5F7F2" fill-opacity="0.65" />
        <rect x="150" y="22" width="30" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.15" />

        <rect x="0" y="36" width="80" height="7" rx="2.5" fill="#F5F7F2" fill-opacity="0.45" />
        <rect x="150" y="37" width="24" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.15" />

        <rect x="0" y="50" width="55" height="5" rx="2" fill="#F5F7F2" fill-opacity="0.3" />
        <rect x="150" y="51" width="18" height="3" rx="1.5" fill="#FFFFFF" fill-opacity="0.12" />
      </g>

      <line x1="14" y1="158" x2="202" y2="158" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- Interactive Button Variants Section -->
      <g transform="translate(14, 172)">
        <!-- Primary Action (Lime Accent) -->
        <rect x="0" y="0" width="188" height="32" rx="7" fill="url(#limeAccentGrad)" filter="url(#subtleGlow)" />
        <rect x="54" y="12" width="80" height="8" rx="4" fill="#080A08" />

        <!-- Secondary Button (Dark Outlined) -->
        <rect x="0" y="42" width="188" height="32" rx="7" fill="#141814" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1" />
        <rect x="58" y="54" width="72" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.75" />

        <!-- Form Input Field Mockup -->
        <rect x="0" y="84" width="188" height="32" rx="7" fill="#0C0F0C" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="1" />
        <rect x="12" y="96" width="50" height="7" rx="3" fill="#FFFFFF" fill-opacity="0.4" />
        <line x1="68" y1="94" x2="68" y2="105" stroke="#A3FF12" stroke-width="1.5" />
        
        <!-- Toggle Switch Mockup -->
        <rect x="0" y="126" width="36" height="20" rx="10" fill="#A3FF12" />
        <circle cx="26" cy="136" r="7" fill="#080A08" />
        <rect x="46" y="132" width="70" height="7" rx="3.5" fill="#FFFFFF" fill-opacity="0.5" />
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- FRAME 2: Main Application Card / Grid Module (Center)    -->
    <!-- ======================================================== -->
    <g transform="translate(288, 35)" filter="url(#canvasShadow)">
      <!-- Main Container -->
      <rect width="260" height="400" rx="12" fill="url(#cardGrad2)" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
      
      <!-- Selection / Inspector Bounds (Modern Figma/Design tool feel) -->
      <rect x="-3" y="-3" width="266" height="406" rx="15" fill="none" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="4,4" />
      <circle cx="-3" cy="-3" r="3" fill="#A3FF12" />
      <circle cx="263" cy="-3" r="3" fill="#A3FF12" />
      <circle cx="-3" cy="403" r="3" fill="#A3FF12" />
      <circle cx="263" cy="403" r="3" fill="#A3FF12" />

      <!-- Dimension Badge floating above -->
      <g transform="translate(100, -18)">
        <rect x="0" y="0" width="60" height="14" rx="4" fill="#080A08" stroke="#A3FF12" stroke-opacity="0.5" stroke-width="0.8" />
        <rect x="12" y="5" width="36" height="4" rx="2" fill="#A3FF12" />
      </g>

      <!-- App Header Bar -->
      <rect x="16" y="18" width="18" height="18" rx="5" fill="#A3FF12" fill-opacity="0.15" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="1" />
      <rect x="42" y="23" width="75" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.8" />
      <rect x="200" y="22" width="44" height="10" rx="5" fill="#FFFFFF" fill-opacity="0.08" />

      <!-- Hero Visual Slot in Card -->
      <rect x="16" y="50" width="228" height="120" rx="8" fill="#182018" stroke="#FFFFFF" stroke-opacity="0.08" />
      <!-- Abstract architectural wireframe in slot -->
      <line x1="16" y1="130" x2="130" y2="70" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.2" />
      <line x1="130" y1="70" x2="244" y2="110" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.2" />
      <line x1="130" y1="70" x2="130" y2="170" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.2" />
      <rect x="26" y="60" width="48" height="14" rx="4" fill="#080A08" fill-opacity="0.85" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="0.8" />
      <circle cx="34" cy="67" r="2.5" fill="#A3FF12" />
      <rect x="42" y="65" width="24" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.7" />

      <!-- Typography Blocks -->
      <rect x="16" y="184" width="160" height="12" rx="4" fill="#FFFFFF" fill-opacity="0.9" />
      <rect x="16" y="204" width="228" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.3" />
      <rect x="16" y="215" width="190" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.3" />

      <!-- 2-Column Nested Data Widgets -->
      <g transform="translate(16, 235)">
        <!-- Widget Left -->
        <rect x="0" y="0" width="110" height="68" rx="7" fill="#131813" stroke="#FFFFFF" stroke-opacity="0.08" />
        <circle cx="16" cy="18" r="5" fill="#A3FF12" fill-opacity="0.2" />
        <rect x="28" y="15" width="50" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.5" />
        <rect x="12" y="34" width="60" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.85" />
        <rect x="12" y="52" width="75" height="5" rx="2.5" fill="#A3FF12" fill-opacity="0.7" />

        <!-- Widget Right -->
        <rect x="118" y="0" width="110" height="68" rx="7" fill="#131813" stroke="#FFFFFF" stroke-opacity="0.08" />
        <circle cx="134" cy="18" r="5" fill="#FFFFFF" fill-opacity="0.1" />
        <rect x="146" y="15" width="50" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.5" />
        <rect x="130" y="34" width="60" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.85" />
        <rect x="130" y="52" width="75" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="0.3" />
      </g>

      <!-- Bottom Card Action Button -->
      <rect x="16" y="318" width="228" height="34" rx="8" fill="#182018" stroke="#FFFFFF" stroke-opacity="0.12" />
      <rect x="80" y="331" width="100" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.75" />
      <circle cx="196" cy="335" r="3" fill="#A3FF12" />

      <!-- Pagination / Stepper Dots -->
      <circle cx="114" cy="374" r="3" fill="#A3FF12" />
      <circle cx="126" cy="374" r="2.5" fill="#FFFFFF" fill-opacity="0.2" />
      <circle cx="138" cy="374" r="2.5" fill="#FFFFFF" fill-opacity="0.2" />
      <circle cx="150" cy="374" r="2.5" fill="#FFFFFF" fill-opacity="0.2" />
    </g>

    <!-- ======================================================== -->
    <!-- FRAME 3: Design Tokens / Inspector Inspector (Right)     -->
    <!-- ======================================================== -->
    <g transform="translate(572, 55)" filter="url(#canvasShadow)">
      <!-- Right Panel -->
      <rect width="180" height="360" rx="10" fill="url(#cardGrad1)" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      
      <!-- Panel Header -->
      <rect x="14" y="16" width="64" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.6" />
      <rect x="120" y="15" width="46" height="10" rx="5" fill="#A3FF12" fill-opacity="0.1" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="0.8" />
      <rect x="128" y="18" width="30" height="4" rx="2" fill="#A3FF12" />

      <line x1="14" y1="36" x2="166" y2="36" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- Spacing Scale Tokens (Visual Ruler Stacks) -->
      <g transform="translate(14, 48)">
        <rect x="0" y="0" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.3" />
        <rect x="0" y="14" width="8" height="8" rx="2" fill="#A3FF12" fill-opacity="0.4" />
        <rect x="14" y="16" width="20" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
        <rect x="50" y="14" width="16" height="8" rx="2" fill="#A3FF12" fill-opacity="0.5" />
        <rect x="72" y="16" width="20" height="4" rx="2" fill="#FFFFFF" fill-opacity="0.4" />
        <rect x="108" y="14" width="24" height="8" rx="2" fill="#A3FF12" fill-opacity="0.6" />
      </g>

      <line x1="14" y1="84" x2="166" y2="84" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- Radius Tokens Visualized -->
      <g transform="translate(14, 98)">
        <rect x="0" y="0" width="44" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.3" />
        
        <rect x="0" y="14" width="30" height="30" rx="2" fill="#141914" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" />
        <rect x="40" y="14" width="30" height="30" rx="8" fill="#141914" stroke="#A3FF12" stroke-opacity="0.4" stroke-width="1" />
        <rect x="80" y="14" width="30" height="30" rx="15" fill="#141914" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" />
      </g>

      <line x1="14" y1="158" x2="166" y2="158" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- State Variants Miniature Grid -->
      <g transform="translate(14, 172)">
        <rect x="0" y="0" width="50" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.3" />

        <!-- State 1: Default -->
        <rect x="0" y="14" width="152" height="26" rx="6" fill="#141814" stroke="#FFFFFF" stroke-opacity="0.15" />
        <rect x="12" y="24" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.6" />

        <!-- State 2: Active / Focused -->
        <rect x="0" y="48" width="152" height="26" rx="6" fill="#172217" stroke="#A3FF12" stroke-opacity="0.6" />
        <rect x="12" y="58" width="40" height="6" rx="3" fill="#A3FF12" />
        <circle cx="140" cy="61" r="3" fill="#A3FF12" />

        <!-- State 3: Disabled -->
        <rect x="0" y="82" width="152" height="26" rx="6" fill="#0E110E" stroke="#FFFFFF" stroke-opacity="0.05" />
        <rect x="12" y="92" width="40" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.2" />
      </g>
    </g>

    <!-- Subtle Vignette / Edge Shadow for Editorial Polish -->
    <rect width="${width}" height="${height}" fill="none" stroke="#080A08" stroke-width="12" stroke-opacity="0.5" />
  </svg>
  `;

  const destPath = path.resolve('public/assets/craft-design-system.webp');
  
  const processed = await sharp(Buffer.from(svg))
    .webp({ quality: 92, effort: 6 })
    .toFile(destPath);

  const stats = fs.statSync(destPath);
  console.log('Saved to:', destPath);
  console.log('Dimensions:', processed.width, 'x', processed.height);
  console.log('File size:', stats.size, 'bytes', `(${(stats.size / 1024).toFixed(2)} KB)`);
}

generateDesignSystemCanvas().catch(console.error);
