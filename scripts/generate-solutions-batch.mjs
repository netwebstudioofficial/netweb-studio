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
        return reject(new Error('Failed (' + res.statusCode + ') for ' + url));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// 8 Business Solutions (1200 x 750, 16:10, under 160 KB):
// 1. solution-restaurant.webp: Intimate fine dining table, candlelight, dark stone surfaces, architectural interior
// 2. solution-hotel.webp: Architectural luxury resort suite or infinity edge pool, dusk atmosphere
// 3. solution-salon.webp: Luxury wellness / aesthetic salon, organic curved mirrors, warm travertine
// 4. solution-gym.webp: High-performance gym, dark training facility, architectural lighting
// 5. solution-healthcare.webp: Clean modern architectural clinic interior, frosted glass, warm wood accents
// 6. solution-real-estate.webp: High-end architectural luxury property exterior, twilight, glass and stone
// 7. solution-education.webp: Modern academic atrium, timber ceiling, double-height glass architecture
// 8. solution-startup.webp: Sleek tech workspace with multiple monitors, architecture diagrams, dark minimal office

const solutions = [
  {
    name: 'solution-restaurant.webp',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-hotel.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-salon.webp',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-gym.webp',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-healthcare.webp',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-real-estate.webp',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-education.webp',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'solution-startup.webp',
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  }
];

function getVignetteSvg(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="65%" stop-color="#080A08" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#vignette)"/>
    </svg>
  `);
}

async function run() {
  for (const item of solutions) {
    console.log('Processing solution asset:', item.name);
    const buf = await download(item.url);
    const dest = path.resolve('public/assets/solutions', item.name);
    const overlay = getVignetteSvg(item.width, item.height);

    let quality = 82;
    let outBuf = await sharp(buf)
      .resize(item.width, item.height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.94, saturation: 0.95 })
      .composite([{ input: overlay, top: 0, left: 0 }])
      .webp({ quality, effort: 6 })
      .toBuffer();

    while (outBuf.length > item.maxKb * 1024 && quality > 45) {
      quality -= 6;
      outBuf = await sharp(buf)
        .resize(item.width, item.height, { fit: 'cover', position: 'center' })
        .modulate({ brightness: 0.94, saturation: 0.95 })
        .composite([{ input: overlay, top: 0, left: 0 }])
        .webp({ quality, effort: 6 })
        .toBuffer();
    }

    fs.writeFileSync(dest, outBuf);
    console.log(`Saved ${item.name} (${(outBuf.length / 1024).toFixed(1)} KB, Q: ${quality})`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
