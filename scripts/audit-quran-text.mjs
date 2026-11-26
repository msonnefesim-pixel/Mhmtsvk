import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const referenceUrl = "https://raw.githubusercontent.com/iptvchecker/content-tanzil/1f7f2e368983e33208f16bbb7fbf826fc0a56619/tanzil-uthmani-1.1.txt";
const expectedSha256 = "ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af";
const expectedBytes = 1334737;

const localBytes = await readFile(new URL("../quran-uthmani.txt", import.meta.url));
const localSha256 = createHash("sha256").update(localBytes).digest("hex");
if (localBytes.length !== expectedBytes || localSha256 !== expectedSha256) {
  throw new Error(`Bundled Tanzil file is not the exact pinned Uthmani 1.1 copy: bytes=${localBytes.length}, sha256=${localSha256}`);
}

const referenceResponse = await fetch(referenceUrl);
if (!referenceResponse.ok) throw new Error(`Pinned Tanzil reference download failed: HTTP ${referenceResponse.status}`);
const referenceBytes = Buffer.from(await referenceResponse.arrayBuffer());
const referenceSha256 = createHash("sha256").update(referenceBytes).digest("hex");
if (referenceBytes.length !== expectedBytes || referenceSha256 !== expectedSha256 || !localBytes.equals(referenceBytes)) {
  throw new Error("Bundled Quran file does not match the pinned Tanzil publisher-file mirror byte-for-byte");
}

const lines = new TextDecoder("utf-8", { fatal: true }).decode(localBytes)
  .replace(/^\uFEFF/, "").split(/\r?\n/)
  .filter(line => line.trim() && !line.startsWith("#"));
if (lines.length !== 6236) throw new Error(`Bundled Tanzil file contains ${lines.length} ayah lines, expected 6236`);

const metadataResponse = await fetch("https://api.alquran.cloud/v1/surah");
if (!metadataResponse.ok) throw new Error(`Surah metadata request failed: HTTP ${metadataResponse.status}`);
const metadata = await metadataResponse.json();
if (metadata.code !== 200 || !Array.isArray(metadata.data) || metadata.data.length !== 114) {
  throw new Error("AlQuran Cloud metadata did not return all 114 surahs");
}
let offset = 0;
const basmalaPattern = /^(ب[ِّ]{1,2}سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u;
const surahCounts = [];
for (let i = 0; i < 114; i++) {
  const surah = metadata.data[i];
  if (Number(surah.number) !== i + 1 || !Number.isInteger(Number(surah.numberOfAyahs)) || Number(surah.numberOfAyahs) < 1) {
    throw new Error(`Invalid surah metadata at surah ${i + 1}`);
  }
  const count = Number(surah.numberOfAyahs);
  const firstLine = lines[offset];
  if (!firstLine) throw new Error(`Missing first ayah at surah ${i + 1}`);
  if (i === 0) {
    if (!firstLine.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")) throw new Error("Al-Fatiha 1:1 basmala check failed");
  } else if (i === 8) {
    if (basmalaPattern.test(firstLine)) throw new Error("At-Tawbah must not have an opening basmala");
  } else if (!basmalaPattern.test(firstLine)) {
    throw new Error(`Opening basmala check failed at surah ${i + 1}`);
  }
  surahCounts.push(count);
  offset += count;
}
if (offset !== 6236) throw new Error(`Surah metadata totals ${offset} ayahs, expected 6236`);

const report = [
  "# Qur'an Uthmani text integrity audit",
  "",
  "- Publisher: Tanzil Project",
  "- Edition: Uthmani 1.1",
  "- Publisher mirror commit: 1f7f2e368983e33208f16bbb7fbf826fc0a56619",
  "- SHA-256: " + localSha256,
  "- File bytes: " + localBytes.length,
  "- Bundled file vs pinned mirror: byte-for-byte identical",
  "- Ayah lines after excluding the publisher's embedded copyright block: " + lines.length,
  "- Surah metadata: " + metadata.data.length + " surahs; total ayahs: " + offset,
  "- Opening basmala: checked for all surahs; Al-Fatiha retains it as ayah 1, At-Tawbah has no opening basmala, and other surahs retain the publisher's basmala at the beginning of the first text line.",
  "",
  "## Result",
  "The app's bundled Arabic text is an exact, unmodified copy of the pinned Tanzil Uthmani 1.1 file. All 6,236 ayah lines and 114 surah boundaries pass the structural checks."
].join("\n");
await writeFile("quran-audit-report.md", report, "utf8");
console.log(report);
