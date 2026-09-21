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
  const imgUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=2400&auto=format&fit=crop';
  const buf = await download(imgUrl);

  const overlaySvg = Buffer.from(`
    <svg width="1440" height="900" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottomVignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="65%" stop-color="#080A08" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.55"/>
        </linearGradient>
        <radialGradient id="edgeVignette" cx="50%" cy="50%" r="65%">
          <stop offset="60%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.4"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#bottomVignette)"/>
      <rect width="1440" height="900" fill="url(#edgeVignette)"/>
    </svg>
  `);

  const destPath = path.resolve('public/assets/projects/lumenor.webp');

  const processed = await sharp(buf)
    .resize(1440, 900, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 0.94,
      saturation: 0.96
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
