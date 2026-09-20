import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Generate pixel-accurate Netweb Studio logo
// Visual details from uploaded reference asset:
// - Solid pure black (#000000) background
// - Geometric isometric 3D ribbon emblem on the left:
//   * Interlocking white (#FFFFFF) ribbon segments forming an isometric "N"
//   * Top-right rhomboid accent facet in vibrant neon lime (#A3FF12)
//   * Crisp chamfers and uniform negative-space channels
// - Bold geometric uppercase wordmark "NETWEB" in white
// - Small white "TM" superscript at upper-right of NETWEB
// - Widely tracked uppercase subtitle "S T U D I O" in white below NETWEB

const width = 1200;
const height = 600;

const svgLogo = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid Black Background -->
  <rect width="${width}" height="${height}" fill="#000000" />

  <g id="netweb-studio-brand">
    <!-- ================= ISOMETRIC EMBLEM ================= -->
    <!-- Center of emblem: X=240, Y=300 -->
    <g id="emblem" transform="translate(90, 130)">
      <!-- Left Outer Wing / Chamfered Pillar (White) -->
      <path 
        d="M 120 40 
           L 185 3 
           C 188 1.5, 192 1.5, 195 3 
           L 195 90 
           L 155 113 
           L 120 93 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- Left Vertical Lower Pillar (White) -->
      <path 
        d="M 55 118 
           L 110 86 
           L 110 248 
           L 55 216 
           C 51 214, 49 209, 49 205 
           L 49 129 
           C 49 125, 51 120, 55 118 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- Left Lower Inset Fold (White) -->
      <path 
        d="M 120 254 
           L 195 297 
           L 195 352 
           C 192 353.5, 188 353.5, 185 352 
           L 120 314 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- Center Diagonal Traverse Beam of N (White) -->
      <path 
        d="M 120 105 
           L 205 56 
           L 290 205 
           L 205 254 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- Bottom Right Foundation Corner (White) -->
      <path 
        d="M 205 303 
           L 280 260 
           L 280 348 
           C 280 353, 277 357, 273 359 
           L 205 398 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- Right Lower Stem Pillar (White) -->
      <path 
        d="M 290 148 
           L 345 116 
           C 349 114, 351 119, 351 123 
           L 351 270 
           C 351 275, 349 279, 345 281 
           L 290 313 
           Z" 
        fill="#FFFFFF" 
      />

      <!-- TOP-RIGHT NEON-LIME ACCENT RHOMBUS (#A3FF12) -->
      <path 
        d="M 290 32 
           L 345 0.5 
           C 349 -1.5, 351 2, 351 6 
           L 351 98 
           C 351 102, 349 106, 345 108 
           L 290 140 
           C 287 142, 283 140, 283 136 
           L 283 44 
           C 283 40, 286 34, 290 32 
           Z" 
        fill="#A3FF12" 
      />
    </g>

    <!-- ================= WORDMARK ================= -->
    <g id="wordmark" transform="translate(480, 190)">
      <!-- "NETWEB" Vector Outline Construction -->
      <!-- Letter N -->
      <path d="M 0 0 L 28 0 L 76 96 L 78 96 L 78 0 L 104 0 L 104 125 L 76 125 L 28 29 L 26 29 L 26 125 L 0 125 Z" fill="#FFFFFF" />

      <!-- Letter E -->
      <path d="M 124 0 L 214 0 C 218 0, 222 4, 222 8 L 222 25 C 222 29, 218 33, 214 33 L 151 33 L 151 47 L 206 47 C 210 47, 214 51, 214 55 L 214 71 C 214 75, 210 79, 206 79 L 151 79 L 151 93 L 216 93 C 220 93, 224 97, 224 101 L 224 117 C 224 121, 220 125, 216 125 L 124 125 Z" fill="#FFFFFF" />

      <!-- Letter T -->
      <path d="M 238 0 L 338 0 C 342 0, 346 4, 346 8 L 346 25 C 346 29, 342 33, 338 33 L 302 33 L 302 125 L 275 125 L 275 33 L 238 33 C 234 33, 230 29, 230 25 L 230 8 C 230 4, 234 0, 238 0 Z" fill="#FFFFFF" />

      <!-- Letter W -->
      <path d="M 352 0 L 378 0 L 406 88 L 408 88 L 434 0 L 460 0 L 486 88 L 488 88 L 516 0 L 542 0 L 502 125 L 474 125 L 447 38 L 445 38 L 418 125 L 390 125 Z" fill="#FFFFFF" />

      <!-- Letter E -->
      <path d="M 556 0 L 646 0 C 650 0, 654 4, 654 8 L 654 25 C 654 29, 650 33, 646 33 L 583 33 L 583 47 L 638 47 C 642 47, 646 51, 646 55 L 646 71 C 646 75, 642 79, 638 79 L 583 79 L 583 93 L 648 93 C 652 93, 656 97, 656 101 L 656 117 C 656 121, 652 125, 648 125 L 556 125 Z" fill="#FFFFFF" />

      <!-- Letter B -->
      <path d="M 670 0 L 730 0 C 752 0, 768 12, 768 32 C 768 45, 759 55, 746 59 C 762 63, 772 75, 772 92 C 772 113, 754 125, 730 125 L 670 125 Z 
               M 697 27 L 697 49 L 726 49 C 735 49, 741 44, 741 38 C 741 32, 735 27, 726 27 Z 
               M 697 74 L 697 99 L 728 99 C 738 99, 744 94, 744 86 C 744 79, 738 74, 728 74 Z" fill="#FFFFFF" />

      <!-- Trademark Symbol TM -->
      <g transform="translate(778, 2)">
        <!-- T -->
        <path d="M 0 0 L 16 0 L 16 4 L 10 4 L 10 18 L 6 18 L 6 4 L 0 4 Z" fill="#FFFFFF" />
        <!-- M -->
        <path d="M 18 0 L 22 0 L 26 11 L 30 0 L 34 0 L 34 18 L 30 18 L 30 5 L 27 15 L 25 15 L 22 5 L 22 18 L 18 18 Z" fill="#FFFFFF" />
      </g>

      <!-- Subtitle "S T U D I O" Widely Tracked -->
      <g transform="translate(4, 185)">
        <!-- S -->
        <path d="M 14 0 C 26 0, 33 6, 33 16 C 33 28, 20 30, 14 34 C 8 38, 7 42, 7 46 C 7 54, 14 60, 24 60 C 31 60, 36 56, 38 52 L 44 58 C 40 65, 33 70, 24 70 C 9 70, 0 60, 0 46 C 0 33, 11 29, 20 25 C 26 22, 26 19, 26 16 C 26 9, 20 6, 14 6 C 8 6, 3 10, 1 15 L -5 10 C -2 3, 5 0, 14 0 Z" fill="#FFFFFF" transform="scale(0.55)" />

        <!-- T -->
        <path d="M 0 0 L 46 0 L 46 8 L 27 8 L 27 70 L 19 70 L 19 8 L 0 8 Z" fill="#FFFFFF" transform="translate(145, 0) scale(0.55)" />

        <!-- U -->
        <path d="M 0 0 L 8 0 L 8 46 C 8 57, 16 64, 25 64 C 34 64, 42 57, 42 46 L 42 0 L 50 0 L 50 46 C 50 63, 38 72, 25 72 C 12 72, 0 63, 0 46 Z" fill="#FFFFFF" transform="translate(290, 0) scale(0.55)" />

        <!-- D -->
        <path d="M 0 0 L 26 0 C 42 0, 52 14, 52 35 C 52 56, 42 70, 26 70 L 0 70 Z M 8 8 L 8 62 L 25 62 C 36 62, 43 51, 43 35 C 43 19, 36 8, 25 8 Z" fill="#FFFFFF" transform="translate(435, 0) scale(0.55)" />

        <!-- I -->
        <path d="M 0 0 L 8 0 L 8 70 L 0 70 Z" fill="#FFFFFF" transform="translate(585, 0) scale(0.55)" />

        <!-- O -->
        <path d="M 28 0 C 45 0, 56 15, 56 35 C 56 55, 45 70, 28 70 C 11 70, 0 55, 0 35 C 0 15, 11 0, 28 0 Z M 28 8 C 16 8, 8 20, 8 35 C 8 50, 16 62, 28 62 C 40 62, 48 50, 48 35 C 48 20, 40 8, 28 8 Z" fill="#FFFFFF" transform="translate(710, 0) scale(0.55)" />
      </g>
    </g>
  </g>
</svg>`;

async function build() {
  const publicAssetsDir = path.resolve('public/assets');
  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }

  // 1. Write the vector SVG files
  fs.writeFileSync(path.resolve('public/assets/netweb-studio-logo.svg'), svgLogo);
  fs.writeFileSync(path.resolve('public/netweb-studio-logo.svg'), svgLogo);
  fs.writeFileSync(path.resolve('public/netweb-logo.svg'), svgLogo);

  // 2. Generate high-resolution lossless PNG file via sharp
  await sharp(Buffer.from(svgLogo))
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.resolve('public/assets/netweb-studio-logo.png'));

  // Also copy to root public for direct path resolution
  fs.copyFileSync(
    path.resolve('public/assets/netweb-studio-logo.png'),
    path.resolve('public/netweb-studio-logo.png')
  );

  console.log('Successfully generated pixel-accurate Netweb Studio logo assets (SVG & PNG).');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
