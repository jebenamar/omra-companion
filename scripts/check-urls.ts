// Online check of every external reference: source URLs must answer, YouTube IDs must resolve
// through the oEmbed endpoint (which also returns the real title and channel to compare by hand).
// Usage: pnpm validate:urls   (requires an Internet connection)
import { sources } from "../src/content/sources.ts";
import { videos } from "../src/content/videos.ts";

const failures: string[] = [];
const blocked: string[] = [];

async function check(url: string): Promise<number> {
  const opts = { redirect: "follow" as const, headers: { "user-agent": "Mozilla/5.0 OmraCompanion-link-check" } };
  try {
    const res = await fetch(url, { ...opts, method: "HEAD" });
    if (res.status < 400) return res.status;
    return (await fetch(url, { ...opts, method: "GET" })).status;
  } catch {
    return 0;
  }
}

for (const s of sources) {
  if (!s.url) continue;
  const status = await check(s.url);
  // sunnah.com and some government sites refuse scripted requests (bot protection): those links
  // must be opened in a browser instead; they are reported, not counted as broken.
  if (status === 401 || status === 403 || status === 406 || status === 429) {
    blocked.push(`${s.id} → ${s.url}`);
    continue;
  }
  const ok = status > 0 && status < 400;
  console.log(`${ok ? "OK " : "ERR"} ${status} ${s.id} ${s.url}`);
  if (!ok) failures.push(`${s.id} → ${s.url} (${status})`);
}

for (const v of videos) {
  const res = await fetch(
    `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${v.youtubeId}`)}`,
  );
  if (!res.ok) {
    failures.push(`video ${v.id} (${v.youtubeId}) → ${res.status}`);
    continue;
  }
  const data = (await res.json()) as { title: string; author_name: string };
  console.log(`OK  video ${v.id}: "${data.title}" — ${data.author_name} (declared: ${v.channel})`);
  if (data.author_name !== v.channel) failures.push(`video ${v.id}: channel mismatch "${data.author_name}"`);
}

if (blocked.length) console.warn(`
${blocked.length} link(s) refused scripted access — check them in a browser.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("\nAll external references answered.");
