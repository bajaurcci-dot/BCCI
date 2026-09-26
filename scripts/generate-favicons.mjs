import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SRC_PATH = path.resolve('src/app/icon.png');

async function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  let offset = 6 + count * 16;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function renderSquare(trimmed, size, paddingRatio = 0.08, bg = { r: 0, g: 0, b: 0, alpha: 0 }) {
  const innerSize = Math.max(1, Math.round(size * (1 - paddingRatio * 2)));
  const inner = await trimmed.clone().resize(innerSize, innerSize, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }).toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg
    }
  }).composite([{ input: inner, gravity: 'center' }]);
}

async function main() {
  console.log('Reading source image from:', SRC_PATH);
  const trimmed = sharp(SRC_PATH).trim();

  // Create buffers
  const buf16 = await (await renderSquare(trimmed, 16, 0.05)).png().toBuffer();
  const buf32 = await (await renderSquare(trimmed, 32, 0.05)).png().toBuffer();
  const buf48 = await (await renderSquare(trimmed, 48, 0.06)).png().toBuffer();
  const buf180 = await (await renderSquare(trimmed, 180, 0.08)).png().toBuffer();
  const buf192 = await (await renderSquare(trimmed, 192, 0.08)).png().toBuffer();
  const buf512 = await (await renderSquare(trimmed, 512, 0.08)).png().toBuffer();
  const icoBuf = await createIco([buf16, buf32, buf48], [16, 32, 48]);

  // Also create a clean white-bg JPEG 512x512 for legacy fallbacks
  const buf512Jpeg = await (await renderSquare(trimmed, 512, 0.08, { r: 255, g: 255, b: 255, alpha: 1 })).jpeg({ quality: 95 }).toBuffer();

  const filesToWrite = [
    // src/app/ (App Router auto-discovery)
    { dest: 'src/app/favicon.ico', buf: icoBuf },
    { dest: 'src/app/icon.png', buf: buf512 },
    { dest: 'src/app/apple-icon.png', buf: buf180 },

    // public/ (Static assets & direct URLs)
    { dest: 'public/favicon.ico', buf: icoBuf },
    { dest: 'public/favicon-16x16.png', buf: buf16 },
    { dest: 'public/favicon-32x32.png', buf: buf32 },
    { dest: 'public/icon.png', buf: buf512 },
    { dest: 'public/apple-icon.png', buf: buf180 },
    { dest: 'public/apple-touch-icon.png', buf: buf180 },
    { dest: 'public/android-chrome-192x192.png', buf: buf192 },
    { dest: 'public/android-chrome-512x512.png', buf: buf512 },
    { dest: 'public/icon.jpeg', buf: buf512Jpeg },
    { dest: 'public/Favicon Icon.jpeg', buf: buf512Jpeg },
  ];

  for (const { dest, buf } of filesToWrite) {
    const fullPath = path.resolve(dest);
    await fs.writeFile(fullPath, buf);
    console.log(`Saved: ${dest} (${buf.length} bytes)`);
  }

  console.log('All favicons and site icons generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
