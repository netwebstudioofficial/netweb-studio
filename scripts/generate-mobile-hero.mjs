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

async function run() {
  const imgUrl = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=1600&auto=format&fit=crop';
  console.log('Downloading distinct vertical luxury architecture photo...');
  const buf = await download(imgUrl);

  const meta = await sharp(buf).metadata();
  console.log('Original dimensions:', meta.width, meta.height);

  const overlaySvg = Buffer.from(`
    <svg width="450" height="800" viewBox="0 0 450 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottomSafe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="55%" stop-color="#080A08" stop-opacity="0.15"/>
          <stop offset="82%" stop-color="#080A08" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.85"/>
        </linearGradient>

        <linearGradient id="topSafe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.4"/>
          <stop offset="18%" stop-color="#080A08" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <rect width="450" height="800" fill="url(#bottomSafe)"/>
      <rect width="450" height="800" fill="url(#topSafe)"/>
    </svg>
  `);

  const destPath = path.resolve('public/assets/hero-mobile-preview.webp');

  const processed = await sharp(buf)
    .resize(450, 800, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 0.90,
      saturation: 0.92
    })
    .composite([
      { input: overlaySvg, top: 0, left: 0 }
    ])
    .webp({ quality: 82, effort: 6 })
    .toFile(destPath);

  const stats = fs.statSync(destPath);
  console.log('Saved to:', destPath);
  console.log('Dimensions:', processed.width, 'x', processed.height);
  console.log('File size:', stats.size, 'bytes', `(${(stats.size / 1024).toFixed(2)} KB)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
