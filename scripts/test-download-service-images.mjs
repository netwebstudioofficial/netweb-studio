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
        return reject(new Error(`Failed (${res.statusCode}) for ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// 9 Service visuals (800 x 500, 16:10, under 110 KB):
// 1. web-development.webp: Premium MacBook on dark architectural desk displaying a modern website with clean editorial typography
// 2. ecommerce.webp: High-end e-commerce product showcase on laptop with luxury leather goods/watch and sleek shopping cards
// 3. web-applications.webp: Sophisticated SaaS analytics dashboard with dark theme and data visualizations
// 4. ui-ux.webp: UI/UX design studio workstation with Figma wireframes, design system components, and mobile/desktop artboards
// 5. website-redesign.webp: Website design transformation comparison on modern studio screens
// 6. support-maintenance.webp: Professional devops / uptime & server health monitoring console with telemetry indicators
// 7. ai-workflows.webp: Connected automation workflow pipeline with logic nodes in a dark software interface
// 8. chatbots.webp: Sleek modern website with an integrated conversational AI concierge widget
// 9. digital-growth.webp: Marketing growth & conversion analytics dashboard with upward trend graphs

const serviceImages = [
  {
    name: 'web-development.webp',
    // MacBook on dark desk displaying clean modern website interface with high-contrast layout
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'ecommerce.webp',
    // Luxury product commerce presentation on screen with elegant minimalist retail products
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'web-applications.webp',
    // Modern SaaS dashboard with telemetry charts and dark UI panels
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'ui-ux.webp',
    // UI/UX workstation with design system, wireframe prototypes, and mobile screens
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'website-redesign.webp',
    // Dual screen device workstation displaying website transformation and responsive layouts
    url: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'support-maintenance.webp',
    // Infrastructure operations, server telemetry, and uptime monitoring console
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'ai-workflows.webp',
    // Clean software engineering and automation workflow logic terminal
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'chatbots.webp',
    // Sleek laptop showing modern conversational interface and customer messaging application
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  },
  {
    name: 'digital-growth.webp',
    // Marketing analytics and growth graph on laptop with upward trending metrics
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=90&w=1600&auto=format&fit=crop',
    width: 800,
    height: 500,
    maxKb: 110
  }
];

function getVignetteSvg(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="60%" stop-color="#080A08" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.75"/>
        </radialGradient>
        <linearGradient id="bottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080A08" stop-opacity="0.0"/>
          <stop offset="70%" stop-color="#080A08" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#080A08" stop-opacity="0.65"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#grad)"/>
      <rect width="${w}" height="${h}" fill="url(#bottom)"/>
    </svg>
  `);
}

async function run() {
  for (const item of serviceImages) {
    console.log('Downloading & processing service asset:', item.name);
    const buf = await download(item.url);
    const dest = path.resolve('public/assets/services', item.name);
    const overlay = getVignetteSvg(item.width, item.height);

    let quality = 82;
    let outBuf = await sharp(buf)
      .resize(item.width, item.height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.92, saturation: 0.95 })
      .composite([{ input: overlay, top: 0, left: 0 }])
      .webp({ quality, effort: 6 })
      .toBuffer();

    while (outBuf.length > item.maxKb * 1024 && quality > 45) {
      quality -= 6;
      outBuf = await sharp(buf)
        .resize(item.width, item.height, { fit: 'cover', position: 'center' })
        .modulate({ brightness: 0.92, saturation: 0.95 })
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
