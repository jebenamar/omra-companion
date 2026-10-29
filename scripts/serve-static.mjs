// Minimal static server for the exported app (out/), used for local production checks and E2E tests.
// Any static host (Netlify, Vercel, Cloudflare Pages, nginx…) can serve out/ the same way.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve("out");
const PORT = Number(process.env.PORT ?? 3000);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/x-component; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const full = join(ROOT, safe);
  if (!full.startsWith(ROOT)) return null;
  try {
    const s = await stat(full);
    if (s.isDirectory()) return resolveFile(join(pathname, "index.html"));
    return full;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let file = await resolveFile(url.pathname);
  let status = 200;
  if (!file && !url.pathname.endsWith("/") && !extname(url.pathname)) {
    res.writeHead(308, { location: url.pathname + "/" + url.search }).end();
    return;
  }
  if (!file) {
    file = join(ROOT, "404.html");
    status = 404;
  }
  const headers = { "content-type": TYPES[extname(file)] ?? "application/octet-stream" };
  if (file.includes(`${join("_next", "static")}`)) headers["cache-control"] = "public, max-age=31536000, immutable";
  else headers["cache-control"] = "no-cache";
  if (file.endsWith("sw.js")) headers["service-worker-allowed"] = "/";
  res.writeHead(status, headers).end(await readFile(file));
}).listen(PORT, () => console.log(`Omra Companion → http://localhost:${PORT}`));
