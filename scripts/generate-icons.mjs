// Rasterises the app icon (same geometry as public/icons/icon.svg) to the PNG sizes required by
// Android and iOS. Dependency-free: polygon fill with 4×4 supersampling + a minimal PNG encoder.
// Usage: node scripts/generate-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const BG = [0x04, 0x3d, 0x31];
// Shapes in a 512×512 design space, painted in order.
const SHAPES = [
  { color: [0x0d, 0x0d, 0x0d], points: [[136, 200], [256, 150], [376, 200], [376, 350], [256, 400], [136, 350]] },
  { color: [0x2a, 0x2a, 0x2a], points: [[254.5, 250], [257.5, 250], [257.5, 400], [254.5, 400]] },
  { color: [0xc5, 0xa4, 0x6d], points: [[136, 220], [256, 270], [376, 220], [376, 236], [256, 286], [136, 236]] },
];

function inside([x, y], poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function render(size, padding) {
  const SS = 4;
  const scale = (size * (1 - 2 * padding)) / 512;
  const offset = size * padding;
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const acc = [0, 0, 0];
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const p = [(x + (sx + 0.5) / SS - offset) / scale, (y + (sy + 0.5) / SS - offset) / scale];
          let color = BG;
          for (const s of SHAPES) if (inside(p, s.points)) color = s.color;
          acc[0] += color[0];
          acc[1] += color[1];
          acc[2] += color[2];
        }
      }
      const i = y * (size * 3 + 1) + 1 + x * 3;
      raw[i] = Math.round(acc[0] / (SS * SS));
      raw[i + 1] = Math.round(acc[1] / (SS * SS));
      raw[i + 2] = Math.round(acc[2] / (SS * SS));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const [file, size, padding] of [
  ["icon-192.png", 192, 0],
  ["icon-512.png", 512, 0],
  ["apple-touch-icon.png", 180, 0],
  ["icon-maskable-512.png", 512, 0.1], // keeps the Ka'bah inside the maskable safe zone
]) {
  writeFileSync(`public/icons/${file}`, render(size, padding));
  console.log(`public/icons/${file}`);
}
