// Post-build step: lists every exported file into out/precache-manifest.json (core + one pack per
// locale) and stamps out/sw.js with a content hash, so each deploy with changes triggers an update.
import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
const LOCALES = ["ar", "fr", "en", "es"];
const EXCLUDE = [/^sw\.js$/, /^precache-manifest\.json$/, /\.map$/];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : Promise.resolve([join(dir, e.name)]))),
  );
  return files.flat();
}

/** "fr/umrah/index.html" → "/fr/umrah/" (the URL a static host serves it under). */
function toUrl(rel) {
  const p = "/" + rel.split(sep).join("/");
  if (p.endsWith("/index.html")) return p.slice(0, -"index.html".length);
  return p;
}

const hash = createHash("sha256");
const core = { files: [], bytes: 0 };
const locales = Object.fromEntries(LOCALES.map((l) => [l, { files: [], bytes: 0 }]));

const all = (await walk(OUT)).sort();
for (const file of all) {
  const rel = relative(OUT, file);
  const posix = rel.split(sep).join("/");
  if (EXCLUDE.some((re) => re.test(posix))) continue;
  const { size } = await stat(file);
  hash.update(posix);
  hash.update(await readFile(file));
  const entry = { url: toUrl(rel), size };
  const first = posix.split("/")[0];
  const bucket = LOCALES.includes(first) ? locales[first] : core;
  bucket.files.push(entry);
  bucket.bytes += size;
}

const buildId = hash.digest("hex").slice(0, 16);
const manifest = { buildId, generatedAt: new Date().toISOString(), core, locales };
await writeFile(join(OUT, "precache-manifest.json"), JSON.stringify(manifest));

const swPath = join(OUT, "sw.js");
const sw = await readFile(swPath, "utf8");
if (!sw.includes("__BUILD_ID__")) throw new Error("sw.js is missing the __BUILD_ID__ placeholder");
await writeFile(swPath, sw.replace("__BUILD_ID__", buildId));

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";
console.log(`[precache] build ${buildId}`);
console.log(`[precache] core: ${core.files.length} files, ${mb(core.bytes)}`);
for (const l of LOCALES) console.log(`[precache] ${l}: ${locales[l].files.length} files, ${mb(locales[l].bytes)}`);
