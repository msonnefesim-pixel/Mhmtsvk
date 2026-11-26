import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";

const referenceUrl = "https://raw.githubusercontent.com/iptvchecker/content-tanzil/1f7f2e368983e33208f16bbb7fbf826fc0a56619/tanzil-uthmani-1.1.txt";
const expectedSha256 = "ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af";
const apiUrl = "https://api.alquran.cloud/v1/quran/quran-uthmani";

const referenceResponse = await fetch(referenceUrl);
if (!referenceResponse.ok) throw new Error(`Tanzil reference download failed: HTTP ${referenceResponse.status}`);
const referenceBytes = Buffer.from(await referenceResponse.arrayBuffer());
const actualSha256 = createHash("sha256").update(referenceBytes).digest("hex");
if (actualSha256 !== expectedSha256) {
  throw new Error(`Pinned Tanzil reference checksum mismatch: ${actualSha256}`);
}
const referenceLines = new TextDecoder("utf-8", { fatal: true }).decode(referenceBytes)
  .replace(/^\uFEFF/, "").split(/\r?\n/)
  .filter(line => line.trim() && !line.startsWith("#"));
if (referenceLines.length !== 6236) throw new Error(`Tanzil reference ayah line count is ${referenceLines.length}, expected 6236`);

const apiResponse = await fetch(apiUrl, { headers: { "accept": "application/json" } });
if (!apiResponse.ok) throw new Error(`AlQuran Cloud full Quran request failed: HTTP ${apiResponse.status}`);
const payload = await apiResponse.json();
if (payload.code !== 200 || !Array.isArray(payload.data?.surahs) || payload.data.surahs.length !== 114) {
  throw new Error("AlQuran Cloud response did not contain all 114 surahs");
}

const metadataResponse = await fetch("https://api.alquran.cloud/v1/surah");
if (!metadataResponse.ok) throw new Error("Surah metadata request failed");
const metadata = await metadataResponse.json();
if (metadata.code !== 200 || !Array.isArray(metadata.data) || metadata.data.length !== 114) throw new Error("Invalid surah metadata");
console.log("API surah 2 ayah 1:", JSON.stringify(payload.data.surahs[1]?.ayahs?.[0]));
const apiAyahs = [];
const comparisons = [];
const basmala = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
let referenceIndex = 0;
for (let s = 0; s < payload.data.surahs.length; s++) {
  const surah = payload.data.surahs[s];
  if (Number(surah.number) !== s + 1 || Number(metadata.data[s]?.number) !== s + 1 ||
      !Array.isArray(surah.ayahs) || surah.ayahs.length !== Number(metadata.data[s].numberOfAyahs)) {
    throw new Error(`Surah structure/count check failed at surah ${s + 1}`);
  }
  for (let a = 0; a < surah.ayahs.length; a++) {
    const ayah = surah.ayahs[a];
    if (Number(ayah.numberInSurah) !== a + 1 || Number(ayah.number) !== apiAyahs.length + 1 ||
        typeof ayah.text !== "string" || !ayah.text.trim()) {
      throw new Error(`Ayah structure check failed at ${s + 1}:${a + 1}`);
    }
    const referenceLine = referenceLines[referenceIndex++];
    if (typeof referenceLine !== "string") throw new Error("Tanzil reference ended before the API ayah list");
    let expectedText = referenceLine;
    let actualText = ayah.text.replace(/^\uFEFF/, "");
    if (a === 0 && s !== 0 && s !== 8) {
      const expectedPrefix = expectedText.match(/^(ب[ِّ]{1,2}سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u);
      const actualPrefix = actualText.match(/^(بِّ?سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u);
      if (!expectedPrefix || !actualPrefix) throw new Error(`Opening basmala missing or unrecognized at surah ${s + 1}`);
      if (expectedPrefix[1].normalize("NFC") !== actualPrefix[1].normalize("NFC")) {
        comparisons.push({ surah: s + 1, ayah: 1, expected: expectedPrefix[1].trim(), actual: actualPrefix[1].trim(), kind: "opening basmala" });
      }
      expectedText = expectedText.slice(expectedPrefix[1].length);
      actualText = actualText.slice(actualPrefix[1].length);
    }
    const item = { surah: s + 1, ayah: a + 1, text: actualText };
    apiAyahs.push(item);
    comparisons.push({ ...item, expected: expectedText.normalize("NFC"), actual: actualText.normalize("NFC"), kind: "ayah text" });
  }
}
if (apiAyahs.length !== 6236 || referenceIndex !== 6236) {
  throw new Error(`Reference/API ayah count mismatch: reference ${referenceIndex}, API ${apiAyahs.length}`);
}

const mismatches = comparisons.filter(x => x.expected !== x.actual).map(x => ({
  surah: x.surah, ayah: x.ayah, kind: x.kind, tanzil: x.expected, alquranCloud: x.actual
}));
const report = [
  "# Qur'an Uthmani text comparison",
  "",
  "- Reference: Tanzil Uthmani 1.1 (pinned publisher-file mirror)",
  "- Reference SHA-256: " + actualSha256,
  "- Compared edition: AlQuran Cloud `quran-uthmani`",
  "- Comparison: ayah-by-ayah, NFC-normalized exact Unicode string comparison; no letters or diacritics stripped. For surahs 2–8 and 10–114, the opening basmala is compared separately and then excluded from ayah 1, because AlQuran Cloud includes it at the start of the first ayah response while it is not counted as that ayah.",
  "- Reference ayahs: " + referenceLines.length,
  "- API ayahs: " + apiAyahs.length,
  "- Exact mismatches: " + mismatches.length,
  "",
  mismatches.length ? "## Mismatches (first 100)" : "## Result",
  mismatches.length ? "The following ayahs differ and require review; this report does not assume they are harmless." : "All 6,236 ayahs match the pinned Tanzil text exactly after NFC normalization.",
  "",
  ...mismatches.slice(0, 100).map(x =>
    `### ${x.surah}:${x.ayah}\n\n- Difference type: ${x.kind}\n- Tanzil: ${JSON.stringify(x.tanzil)}\n- AlQuran Cloud: ${JSON.stringify(x.alquranCloud)}`
  )
].join("\n");
await writeFile("quran-audit-report.md", report, "utf8");
console.log(report);
if (mismatches.length) process.exitCode = 1;
