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
  .replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
if (referenceLines.length !== 6236) throw new Error(`Tanzil reference line count is ${referenceLines.length}, expected 6236`);

const apiResponse = await fetch(apiUrl, { headers: { "accept": "application/json" } });
if (!apiResponse.ok) throw new Error(`AlQuran Cloud full Quran request failed: HTTP ${apiResponse.status}`);
const payload = await apiResponse.json();
if (payload.code !== 200 || !Array.isArray(payload.data?.surahs) || payload.data.surahs.length !== 114) {
  throw new Error("AlQuran Cloud response did not contain all 114 surahs");
}

const apiAyahs = [];
for (let s = 0; s < payload.data.surahs.length; s++) {
  const surah = payload.data.surahs[s];
  if (Number(surah.number) !== s + 1 || !Array.isArray(surah.ayahs) ||
      surah.ayahs.length !== Number(surah.numberOfAyahs)) {
    throw new Error(`Surah structure/count check failed at surah ${s + 1}`);
  }
  for (let a = 0; a < surah.ayahs.length; a++) {
    const ayah = surah.ayahs[a];
    if (Number(ayah.numberInSurah) !== a + 1 || Number(ayah.surah?.number) !== s + 1 ||
        typeof ayah.text !== "string" || !ayah.text.trim()) {
      throw new Error(`Ayah structure check failed at ${s + 1}:${a + 1}`);
    }
    apiAyahs.push({ surah: s + 1, ayah: a + 1, text: ayah.text });
  }
}
if (apiAyahs.length !== 6236) throw new Error(`API returned ${apiAyahs.length} ayahs, expected 6236`);

const mismatches = [];
for (let i = 0; i < 6236; i++) {
  const expected = referenceLines[i].normalize("NFC");
  const actual = apiAyahs[i].text.normalize("NFC");
  if (expected !== actual) mismatches.push({
    surah: apiAyahs[i].surah,
    ayah: apiAyahs[i].ayah,
    tanzil: expected,
    alquranCloud: actual
  });
}
const report = [
  "# Qur'an Uthmani text comparison",
  "",
  "- Reference: Tanzil Uthmani 1.1 (pinned publisher-file mirror)",
  "- Reference SHA-256: " + actualSha256,
  "- Compared edition: AlQuran Cloud `quran-uthmani`",
  "- Comparison: ayah-by-ayah, NFC-normalized exact Unicode string comparison; no letters or diacritics stripped.",
  "- Reference ayahs: " + referenceLines.length,
  "- API ayahs: " + apiAyahs.length,
  "- Exact mismatches: " + mismatches.length,
  "",
  mismatches.length ? "## Mismatches (first 100)" : "## Result",
  mismatches.length ? "The following ayahs differ and require review; this report does not assume they are harmless." : "All 6,236 ayahs match the pinned Tanzil text exactly after NFC normalization.",
  "",
  ...mismatches.slice(0, 100).map(x =>
    `### ${x.surah}:${x.ayah}\n\n- Tanzil: ${JSON.stringify(x.tanzil)}\n- AlQuran Cloud: ${JSON.stringify(x.alquranCloud)}`
  )
].join("\n");
await writeFile("quran-audit-report.md", report, "utf8");
console.log(report);
if (mismatches.length) process.exitCode = 1;
