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

// Portfolio projects definition per prompt:
// 3. Aurelia: Luxury wellness/salon environment, curved limestone mirrors, natural stone, botanical products, elegant warm lighting.
// 4. FitCore: Premium high-performance gym, dark architecture, matte-black equipment, subtle lime lighting.
// 5. Medicare Plus: Ultra-clean contemporary clinic, glass/frosted glass, premium clinical architecture, restrained lighting.
// 6. StayVista: Luxury hillside villa, infinity pool, panoramic landscape, dusk, warm interiors.
// 7. BrightPath: Modern international academy, timber and glass architecture, elegant educational environment, landscaped entrance.
// 8. NexCart: Premium DTC product photography, luxury leather goods / eyewear / modern consumer product, dark studio surface.
// 9. NovaTech Cloud: Enterprise cloud technology environment, server architecture / telemetry visualization, dark technical environment with restrained cyan/lime data visualization.

const projects = [
  {
    name: 'aurelia.webp',
    // Luxury wellness & salon with curved architectural mirrors, limestone finishes, botanical apothecary bottles, warm natural illumination
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'fitcore.webp',
    // High-performance architectural gym with matte-black rigs, dumbbell racks, polished dark concrete floor, and clean moody overhead lighting
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'medicare-plus.webp',
    // Contemporary architectural medical clinic with frosted architectural glass partitions, warm teak accent slats, tranquil minimalist reception
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'stayvista.webp',
    // Luxury hillside villa at twilight overlooking sea horizon, illuminated infinity edge pool, floor-to-ceiling glass pavilions
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'brightpath.webp',
    // Modern international education atrium with sweeping timber slats, double-height glass curtain wall, calm collaborative architecture
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'nexcart.webp',
    // Premium DTC consumer product photography on dark stone studio surface with subtle directional rim light
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=90&w=2000&auto=format&fit=crop',
    width: 1200,
    height: 750,
    maxKb: 160
  },
  {
    name: 'novatech.webp',
    // Enterprise cloud datacenter / telemetry console with moody deep dark server rows and restrained geometric data lighting
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=90&w=2000&auto=format&fit=crop',
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
          <stop offset="70%" stop-color="#080A08" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#vignette)"/>
    </svg>
  `);
}

async function run() {
  for (const item of projects) {
    console.log('Processing portfolio asset:', item.name);
    const buf = await download(item.url);
    const dest = path.resolve('public/assets/projects', item.name);
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
