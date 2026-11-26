import { writeFile } from "node:fs/promises";

const META_URL = "https://api.alquran.cloud/v1/surah";
const MEAL_BASE = "https://quranenc.com/api/v1/translation/sura/turkish_rwwad/";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status === 405 || response.status === 501) return response;
      if (response.status !== 429 && response.status < 500) {
        throw new Error(`HTTP ${response.status}`);
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(500 * (attempt + 1));
  }
  throw lastError || new Error("Request failed");
}

async function runPool(items, concurrency, task) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await task(items[index]);
    }
  }));
  return results;
}

const metaResponse = await fetchWithRetry(META_URL);
const metaJson = await metaResponse.json();
if (metaJson.code !== 200 || !Array.isArray(metaJson.data) || metaJson.data.length !== 114) {
  throw new Error("Could not retrieve all 114 surah metadata entries");
}
const surahs = metaJson.data;

const mealResults = await runPool(surahs, 4, async surah => {
  try {
    const response = await fetchWithRetry(MEAL_BASE + surah.number);
    const json = await response.json();
    if (!Array.isArray(json.result) || json.result.length !== Number(surah.numberOfAyahs)) {
      throw new Error(`expected ${surah.numberOfAyahs} verses, received ${json.result?.length ?? "none"}`);
    }
    const seen = new Set();
    for (let i = 0; i < json.result.length; i++) {
      const item = json.result[i];
      const number = Number(item.aya);
      if (number !== i + 1 || seen.has(number) || typeof item.translation !== "string" || !item.translation.trim()) {
        throw new Error(`missing, duplicate, out-of-order or empty meal at ayah ${i + 1}`);
      }
      seen.add(number);
    }
    return { surah: surah.number, ok: true, ayahs: json.result.length };
  } catch (error) {
    return { surah: surah.number, ok: false, error: String(error) };
  }
});

const mealFailures = mealResults.filter(result => !result.ok);
const report = [
  "# Remote Quran content availability audit",
  "",
  "- Turkish meal edition: QuranEnc / Rowwad Translation Center, `turkish_rwwad`, version 1.0.4.",
  "- Meal coverage checked: " + mealResults.filter(result => result.ok).length + "/114 surahs; every verse number, unique ayah key, and non-empty translation checked against surah metadata.",
  "",
  "## Meal failures",
  ...(mealFailures.length ? mealFailures.map(result => `- Surah ${result.surah}: ${result.error}`) : ["- None"]),
  "",
].join("\n");
await writeFile("remote-content-audit-report.md", report, "utf8");
console.log(report);
if (mealFailures.length) process.exitCode = 1;
