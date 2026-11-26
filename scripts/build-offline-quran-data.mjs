import { writeFile } from "node:fs/promises";

const META_URL = "https://api.alquran.cloud/v1/surah";
const MEAL_BASE = "https://quranenc.com/api/v1/translation/sura/turkish_rwwad/";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getJson(url, attempts = 4) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("HTTP " + response.status + " for " + url);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt + 1 < attempts) await wait(700 * (attempt + 1));
    }
  }
  throw lastError;
}

async function pool(items, concurrency, task) {
  const result = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      result[index] = await task(items[index]);
    }
  }));
  return result;
}

const metadata = await getJson(META_URL);
if (metadata.code !== 200 || !Array.isArray(metadata.data) || metadata.data.length !== 114) {
  throw new Error("Could not verify all 114 Quran surahs");
}
const surahs = await pool(metadata.data, 4, async meta => {
  const json = await getJson(MEAL_BASE + meta.number);
  if (!Array.isArray(json.result) || json.result.length !== Number(meta.numberOfAyahs)) {
    throw new Error("Invalid meal count for surah " + meta.number);
  }
  const ayahs = json.result.map((item, index) => {
    if (Number(item.aya) !== index + 1 || typeof item.translation !== "string" || !item.translation.trim()) {
      throw new Error("Invalid or missing Turkish meal at " + meta.number + ":" + (index + 1));
    }
    return { aya: index + 1, translation: item.translation, footnotes: item.footnotes || "" };
  });
  return {
    number: Number(meta.number),
    name: meta.name,
    englishName: meta.englishName,
    numberOfAyahs: Number(meta.numberOfAyahs),
    ayahs
  };
});
const total = surahs.reduce((sum, surah) => sum + surah.ayahs.length, 0);
if (total !== 6236 || surahs.some((surah, index) => surah.number !== index + 1)) {
  throw new Error("Offline Quran dataset failed 114-surah / 6,236-ayah integrity checks");
}
const data = {
  schemaVersion: 1,
  mealSource: "QuranEnc / Rowwad Translation Center",
  mealEdition: "turkish_rwwad",
  mealVersion: "1.0.4",
  surahs
};
await writeFile("quran-offline-data.json", JSON.stringify(data), "utf8");
console.log("Offline Quran data created: 114 surahs, 6,236 Turkish meal entries.");
