import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Exact Netweb Studio Logo according to uploaded reference
// 1. Isometric ribbon 'N' emblem on the left:
//    - Pure white (#FFFFFF) ribbon facets
//    - Neon-lime (#A3FF12) accent rhombus at top-right with slightly rounded corners
// 2. Bold geometric "NETWEB" wordmark in pure white (#FFFFFF)
// 3. "TM" superscript in pure white (#FFFFFF)
// 4. "STUDIO" tracking subtitle spanning from 'N' to 'B' of NETWEB in pure white (#FFFFFF)
// 5. 100% Transparent background (no background fill)
// 6. Tight bounding box with zero wasted padding/margins

const svgRaw = `<svg viewBox="0 0 1200 480" width="2400" height="960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- PURE TRANSPARENT BACKGROUND (No rect, no fill, no filters, no shadows) -->

  <g id="brand-logo">
    <!-- ================= EMBLEM ================= -->
    <!-- Center of emblem: X=190, Y=240 -->
    <g id="isometric-n-emblem">
      <!-- 1. Top-Left Peak / Upper Chamfered Wing -->
      <path 
        d="M 125 90 
           L 182 56 
           C 186 53.6, 192 53.6, 196 56 
           L 196 142 
           L 155 166 
           L 125 148 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 2. Far-Left Vertical Stem -->
      <path 
        d="M 64 165 
           L 118 133 
           L 118 290 
           L 64 258 
           C 60 255.5, 57 251, 57 246 
           L 57 177 
           C 57 172, 60 167.5, 64 165 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 3. Bottom-Left Inset Fold / Base -->
      <path 
        d="M 125 296 
           L 196 338 
           L 196 392 
           C 192 394.4, 186 394.4, 182 392 
           L 125 358 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 4. Center Diagonal Cross-Beam of N -->
      <path 
        d="M 125 152 
           L 205 105 
           L 286 248 
           L 205 295 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 5. Bottom-Right Foundation Base -->
      <path 
        d="M 205 344 
           L 278 301 
           L 278 388 
           C 278 393, 275 397.5, 270 400 
           L 205 438 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 6. Right Lower Vertical Stem -->
      <path 
        d="M 286 195 
           L 340 163 
           C 344 160.5, 347 164, 347 169 
           L 347 312 
           C 347 317, 344 321.5, 340 324 
           L 286 355 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- 7. TOP-RIGHT NEON-LIME ACCENT RHOMBUS (#A3FF12) -->
      <path 
        d="M 286 82 
           L 339 51 
           C 344 48, 347 52, 347 57 
           L 347 146 
           C 347 151, 344 155, 339 157.5 
           L 286 188 
           C 283 190, 279 187.5, 279 183 
           L 279 94 
           C 279 89.5, 282 84.5, 286 82 
           Z" 
        fill="#A3FF12" 
      />
    </g>

    <!-- ================= WORDMARK ================= -->
    <g id="wordmark" transform="translate(450, 145)">
      <!-- "NETWEB" Exact Outlines -->
      <!-- Letter N -->
      <path d="M 0 0 L 26 0 L 76 96 L 78 96 L 78 0 L 103 0 L 103 125 L 77 125 L 27 29 L 25 29 L 25 125 L 0 125 Z" fill="#FFFFFF" />

      <!-- Letter E -->
      <path d="M 122 0 L 210 0 C 214 0, 218 4, 218 8 L 218 24 C 218 28, 214 32, 210 32 L 149 32 L 149 47 L 202 47 C 206 47, 210 51, 210 55 L 210 71 C 210 75, 206 79, 202 79 L 149 79 L 149 93 L 212 93 C 216 93, 220 97, 220 101 L 220 117 C 220 121, 216 125, 212 125 L 122 125 Z" fill="#FFFFFF" />

      <!-- Letter T -->
      <path d="M 234 0 L 332 0 C 336 0, 340 4, 340 8 L 340 24 C 340 28, 336 32, 332 32 L 299 32 L 299 125 L 273 125 L 273 32 L 234 32 C 230 32, 226 28, 226 24 L 226 8 C 226 4, 230 0, 234 0 Z" fill="#FFFFFF" />

      <!-- Letter W -->
      <path d="M 346 0 L 372 0 L 399 88 L 401 88 L 427 0 L 452 0 L 478 88 L 480 88 L 507 0 L 533 0 L 494 125 L 466 125 L 440 38 L 438 38 L 412 125 L 384 125 Z" fill="#FFFFFF" />

      <!-- Letter E -->
      <path d="M 547 0 L 635 0 C 639 0, 643 4, 643 8 L 643 24 C 643 28, 639 32, 635 32 L 574 32 L 574 47 L 627 47 C 631 47, 635 51, 635 55 L 635 71 C 635 75, 631 79, 627 79 L 574 79 L 574 93 L 637 93 C 641 93, 645 97, 645 101 L 645 117 C 645 121, 641 125, 637 125 L 547 125 Z" fill="#FFFFFF" />

      <!-- Letter B -->
      <path d="M 659 0 L 717 0 C 739 0, 755 12, 755 32 C 755 45, 746 55, 733 59 C 749 63, 759 75, 759 92 C 759 113, 741 125, 717 125 L 659 125 Z 
               M 686 26 L 686 48 L 713 48 C 722 48, 728 43.5, 728 37 C 728 30.5, 722 26, 713 26 Z 
               M 686 73 L 686 99 L 715 99 C 725 99, 731 94, 731 86 C 731 78, 725 73, 715 73 Z" fill="#FFFFFF" />

      <!-- Trademark Symbol "TM" -->
      <g transform="translate(767, 3)">
        <!-- T -->
        <path d="M 0 0 L 15 0 L 15 4 L 9.5 4 L 9.5 18 L 5.5 18 L 5.5 4 L 0 4 Z" fill="#FFFFFF" />
        <!-- M -->
        <path d="M 17 0 L 21 0 L 25 11 L 29 0 L 33 0 L 33 18 L 29 18 L 29 5.5 L 26 14.5 L 24 14.5 L 21 5.5 L 21 18 L 17 18 Z" fill="#FFFFFF" />
      </g>

      <!-- Subtitle "S T U D I O" Spanning Underneath From N to B -->
      <g transform="translate(3, 168)">
        <!-- S -->
        <path d="M 13 0 C 24 0, 31 5.5, 31 15 C 31 26, 19 28, 13 32 C 7 36, 6 39.5, 6 43 C 6 51, 13 56.5, 23 56.5 C 29 56.5, 34 53, 36 49 L 41 55 C 37 61.5, 31 66, 23 66 C 9 66, 0 57, 0 43 C 0 31, 10 27, 19 23.5 C 24.5 20.5, 24.5 18, 24.5 15 C 24.5 8.5, 19 5.5, 13 5.5 C 7.5 5.5, 3 9, 1 14 L -4.5 9 C -1.5 2.5, 5 0, 13 0 Z" fill="#FFFFFF" transform="scale(0.58)" />

        <!-- T -->
        <path d="M 0 0 L 44 0 L 44 8 L 26 8 L 26 66 L 18 66 L 18 8 L 0 8 Z" fill="#FFFFFF" transform="translate(150, 0) scale(0.58)" />

        <!-- U -->
        <path d="M 0 0 L 8 0 L 8 43 C 8 54, 15 60, 24 60 C 33 60, 40 54, 40 43 L 40 0 L 48 0 L 48 43 C 48 59, 36 68, 24 68 C 12 68, 0 59, 0 43 Z" fill="#FFFFFF" transform="translate(298, 0) scale(0.58)" />

        <!-- D -->
        <path d="M 0 0 L 25 0 C 40 0, 50 13, 50 33 C 50 53, 40 66, 25 66 L 0 66 Z M 8 8 L 8 58 L 24 58 C 34 58, 41 48, 41 33 C 41 18, 34 8, 24 8 Z" fill="#FFFFFF" transform="translate(448, 0) scale(0.58)" />

        <!-- I -->
        <path d="M 0 0 L 8 0 L 8 66 L 0 66 Z" fill="#FFFFFF" transform="translate(605, 0) scale(0.58)" />

        <!-- O -->
        <path d="M 27 0 C 43 0, 54 14, 54 33 C 54 52, 43 66, 27 66 C 11 66, 0 52, 0 33 C 0 14, 11 0, 27 0 Z M 27 8 C 16 8, 8 19, 8 33 C 8 47, 16 58, 27 58 C 38 58, 46 47, 46 33 C 46 19, 38 8, 27 8 Z" fill="#FFFFFF" transform="translate(732, 0) scale(0.58)" />
      </g>
    </g>
  </g>
</svg>`;

async function build() {
  const publicAssetsDir = path.resolve('public/assets');
  const srcAssetsDir = path.resolve('src/assets');
  if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });
  if (!fs.existsSync(srcAssetsDir)) fs.mkdirSync(srcAssetsDir, { recursive: true });

  // Render high-res buffer and then TIGHT-TRIM all surrounding empty transparent pixels
  // This guarantees 0px extra space around the logo!
  const renderedBuffer = await sharp(Buffer.from(svgRaw), { density: 300 })
    .png()
    .toBuffer();

  const trimmedImage = sharp(renderedBuffer).trim();
  const trimmedMeta = await trimmedImage.metadata();
  console.log(`Trimmed image dimensions: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // Save the trimmed image as netweb-studio-logo.png
  const finalPng = await trimmedImage.png({ quality: 100, compressionLevel: 9 }).toBuffer();

  fs.writeFileSync(path.resolve('public/assets/netweb-studio-logo.png'), finalPng);
  fs.writeFileSync(path.resolve('public/netweb-studio-logo.png'), finalPng);
  fs.writeFileSync(path.resolve('src/assets/netweb-studio-logo.png'), finalPng);

  console.log('Successfully generated tight-trimmed, transparent Netweb Studio logo image asset.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
