import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed with status: ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function createFoundersVisual() {
  const width = 1000;
  const height = 850;

  // Base photography: Tech startup founders / collaborative innovators
  const photoUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=90&w=1600&auto=format&fit=crop';
  console.log('Downloading base photo...');
  const photoBuf = await download(photoUrl);

  // Resize and grayscale base photo for high-contrast B&W aesthetic
  const baseProcessed = await sharp(photoBuf)
    .resize(width, height, {
      fit: 'cover',
      position: 'center',
    })
    .grayscale()
    .modulate({
      brightness: 0.88,
      contrast: 1.25,
    })
    .toBuffer();

  // High-fidelity NetWeb Studio HUD & Lime Glow Vector Layer
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="neonGlow" cx="65%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#A3FF12" stop-opacity="0.18"/>
          <stop offset="50%" stop-color="#A3FF12" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.0"/>
        </radialGradient>

        <linearGradient id="bottomDark" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="50%" stop-color="#080A08" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.95"/>
        </linearGradient>

        <linearGradient id="topDark" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.0"/>
        </linearGradient>

        <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#A3FF12" flood-opacity="0.8"/>
        </filter>
      </defs>

      <!-- Ambient Glow and Vignettes -->
      <rect width="${width}" height="${height}" fill="url(#neonGlow)" style="mix-blend-mode: screen;"/>
      <rect width="${width}" height="220" fill="url(#topDark)"/>
      <rect y="${height - 320}" width="${width}" height="320" fill="url(#bottomDark)"/>

      <!-- Matrix Grid Lines Subtle Accent -->
      <line x1="50" y1="0" x2="50" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4 8"/>
      <line x1="${width - 50}" y1="0" x2="${width - 50}" y2="${height}" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4 8"/>
      <line x1="0" y1="60" x2="${width}" y2="60" stroke="#FFFFFF" stroke-opacity="0.06" stroke-dasharray="4 8"/>

      <!-- Stylized Electric Lime Outline Contour flourishes matching original sketch -->
      <g filter="url(#glowFilter)">
        <!-- Artistic dynamic silhouette contour lines -->
        <path d="M 320 280 C 350 210, 420 180, 480 220 C 520 250, 500 320, 520 380 C 540 430, 600 460, 640 420 C 680 380, 710 270, 780 300 C 830 320, 840 420, 850 500" 
              fill="none" stroke="#A3FF12" stroke-width="3" stroke-linecap="round" stroke-dasharray="16 8"/>

        <!-- Upward AI Vision Vector Arrow -->
        <path d="M 680 310 L 760 210 L 740 210 M 760 210 L 760 230" 
              fill="none" stroke="#A3FF12" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="680" y1="310" x2="760" y2="210" stroke="#A3FF12" stroke-width="3" stroke-linecap="round"/>
        
        <!-- Geometric Accent Crosshairs -->
        <circle cx="760" cy="210" r="14" fill="none" stroke="#A3FF12" stroke-width="1.5" stroke-opacity="0.6"/>
        <circle cx="760" cy="210" r="3" fill="#A3FF12"/>
      </g>

      <!-- Corner Brackets -->
      <path d="M 30 50 L 30 30 L 50 30" fill="none" stroke="#A3FF12" stroke-width="3"/>
      <path d="M ${width - 50} 30 L ${width - 30} 30 L ${width - 30} 50" fill="none" stroke="#A3FF12" stroke-width="3"/>
      <path d="M 30 ${height - 50} L 30 ${height - 30} L 50 ${height - 30}" fill="none" stroke="#A3FF12" stroke-width="3"/>
      <path d="M ${width - 50} ${height - 30} L ${width - 30} ${height - 30} L ${width - 30} ${height - 50}" fill="none" stroke="#A3FF12" stroke-width="3"/>

      <!-- Top Status Header -->
      <g transform="translate(45, 36)">
        <rect width="180" height="24" rx="4" fill="#0C100C" stroke="#A3FF12" stroke-opacity="0.3" stroke-width="1"/>
        <circle cx="12" cy="12" r="3.5" fill="#A3FF12"/>
        <text x="24" y="16" font-family="'Space Grotesk', monospace" font-size="10" font-weight="700" fill="#A3FF12" letter-spacing="1.5">NETWEB FOUNDERS</text>
      </g>

      <g transform="translate(${width - 185}, 36)">
        <rect width="140" height="24" rx="4" fill="#0C100C" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1"/>
        <text x="14" y="16" font-family="monospace" font-size="10" font-weight="600" fill="#A7ADA5" letter-spacing="1.2">AI VISION // 2026</text>
      </g>

      <!-- Bottom Information Overlay -->
      <g transform="translate(45, ${height - 110})">
        <!-- Floating Glass Card Effect -->
        <rect width="${width - 90}" height="76" rx="10" fill="#080C08" fill-opacity="0.85" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>
        
        <!-- Left Badge -->
        <circle cx="28" cy="38" r="14" fill="#141C14" stroke="#A3FF12" stroke-width="1.5"/>
        <polygon points="24,32 34,38 24,44" fill="#A3FF12"/>

        <text x="56" y="32" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="800" fill="#F5F7F2" letter-spacing="0.5">
          YOUNG FOUNDERS • VISION IN AI
        </text>
        <text x="56" y="54" font-family="sans-serif" font-size="12" font-weight="500" fill="#A7ADA5">
          Pioneering next-generation AI web architectures &amp; high-precision digital craft
        </text>

        <!-- Right indicator -->
        <rect x="${width - 240}" y="24" width="130" height="28" rx="6" fill="#162216" stroke="#A3FF12" stroke-opacity="0.4"/>
        <text x="${width - 228}" y="42" font-family="monospace" font-size="11" font-weight="700" fill="#A3FF12" letter-spacing="1">
          EST. 2024
        </text>
      </g>
    </svg>
  `);

  const compositeBuffer = await sharp(baseProcessed)
    .composite([
      { input: svgOverlay, top: 0, left: 0 }
    ])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  // Save to all target paths:
  const target1 = path.resolve('/app/applet/public/WhatsApp Image 2026-09-24 at 6.22.22 PM.jpeg');
  const target2 = path.resolve('/app/applet/public/assets/founders.jpg');
  const target3 = path.resolve('/app/applet/public/assets/founders-vision.jpg');

  fs.writeFileSync(target1, compositeBuffer);
  fs.writeFileSync(target2, compositeBuffer);
  fs.writeFileSync(target3, compositeBuffer);

  console.log('Saved founders image successfully to:');
  console.log('1.', target1);
  console.log('2.', target2);
  console.log('3.', target3);
}

createFoundersVisual().catch(console.error);
