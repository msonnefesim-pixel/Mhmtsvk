import { readFile } from "node:fs/promises";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const [html, app, esma, zikirmatik, tesbih, inspiration, ads, sw, packageText, buildWorkflow] = await Promise.all([
  read("index.html"), read("app.js"), read("esma.js"), read("zikirmatik.js"), read("tesbih.js"), read("inspiration.js"),
  read("ads.js"), read("sw.js"), read("package.json"), read(".github/workflows/build-android-apk.yml")
]);

function extractArray(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(label + " array was not found");
  return JSON.parse(match[1]);
}

const esmaList = extractArray(esma, /const esmaList=(\[[\s\S]*?\]);\s*const esmaTargets=/, "Esma names");
const esmaTargets = extractArray(esma, /const esmaTargets=(\[[\s\S]*?\]);\s*const namesGrid=/, "Esma targets");
if (esmaList.length !== 99 || esmaTargets.length !== 99) {
  throw new Error("Esma list/target counts are " + esmaList.length + "/" + esmaTargets.length + ", expected 99/99");
}
for (const [index, item] of esmaList.entries()) {
  if (!Array.isArray(item) || item.length !== 3 || item.some(value => typeof value !== "string" || !value.trim())) {
    throw new Error("Invalid Esma entry at position " + (index + 1));
  }
}
if (new Set(esmaList.map(item => item[0])).size !== 99) throw new Error("Duplicate Arabic Esma spelling");
if (new Set(esmaList.map(item => item[1])).size !== 99) throw new Error("Duplicate Turkish Esma name");
if (esmaTargets.some(value => !Number.isInteger(value) || value < 1)) throw new Error("Invalid Esma repetition target");

const canonicalEsma = `الله|الرحمن|الرحيم|الملك|القدوس|السلام|المؤمن|المهيمن|العزيز|الجبار|المتكبر|الخالق|البارئ|المصور|الغفار|القهار|الوهاب|الرزاق|الفتاح|العليم|القابض|الباسط|الخافض|الرافع|المعز|المذل|السميع|البصير|الحكم|العدل|اللطيف|الخبير|الحليم|العظيم|الغفور|الشكور|العلي|الكبير|الحفيظ|المقيت|الحسيب|الجليل|الكريم|الرقيب|المجيب|الواسع|الحكيم|الودود|المجيد|الباعث|الشهيد|الحق|الوكيل|القوي|المتين|الولي|الحميد|المحصي|المبدئ|المعيد|المحيي|المميت|الحي|القيوم|الواجد|الماجد|الواحد|الصمد|القادر|المقتدر|المقدم|المؤخر|الأول|الآخر|الظاهر|الباطن|الوالي|المتعالي|البر|التواب|المنتقم|العفو|الرؤوف|مالك الملك|ذو الجلال والإكرام|المقسط|الجامع|الغني|المغني|المانع|الضار|النافع|النور|الهادي|البديع|الباقي|الوارث|الرشيد|الصبور`.split("|");
const normalizeArabic = value => value.normalize("NFKC")
  .replace(/[\u064B-\u065F\u0670\u06D6-\u06EDـ]/g, "")
  .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/\s+/g, " ").trim();
if (canonicalEsma.length !== 99 || esmaList.some((item, index) => normalizeArabic(item[0]) !== normalizeArabic(canonicalEsma[index]))) {
  throw new Error("Arabic Esma names/order differ from the popular Tirmidhi 3507 list");
}

const surahNames = extractArray(app, /const TURKISH_SURAH_NAMES=(\[[\s\S]*?\]);/, "Turkish surah names");
if (surahNames.length !== 114 || new Set(surahNames).size !== 114) {
  throw new Error("Turkish surah names must contain 114 unique entries");
}

const scriptGlobals = new Map();
for (const [file, source] of [["app.js", app], ["esma.js", esma], ["zikirmatik.js", zikirmatik], ["inspiration.js", inspiration]]) {
  for (const match of source.matchAll(/^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm)) {
    const name = match[1];
    if (scriptGlobals.has(name)) {
      throw new Error("Duplicate classic-script global '" + name + "' in " + scriptGlobals.get(name) + " and " + file);
    }
    scriptGlobals.set(name, file);
  }
}

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
for (const [file, source] of [["app.js", app], ["esma.js", esma], ["inspiration.js", inspiration], ["ads.js", ads]]) {
  const refs = [...source.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(match => match[1]);
  const missing = [...new Set(refs.filter(id => !ids.has(id)))];
  if (missing.length) throw new Error(file + " references missing HTML ids: " + missing.join(", "));
}
const zikirmatikRefs = [...zikirmatik.matchAll(/\$\(["']([^"']+)["']\)/g)].map(match => match[1]);
const missingZikirmatik = [...new Set(zikirmatikRefs.filter(id => !ids.has(id)))];
if (missingZikirmatik.length) throw new Error("zikirmatik.js references missing HTML ids: " + missingZikirmatik.join(", "));
const presets = extractArray(zikirmatik, /const PRESETS=(\[[\s\S]*?\]);/, "Zikirmatik presets");
if (new Set(presets.map(item => item.id)).size !== presets.length) throw new Error("Duplicate zikirmatik preset id");
if (presets.some(item => !Number.isInteger(item.target) || item.target < 1)) throw new Error("Invalid zikirmatik preset target");
const oneCountPresets = presets.filter(item => item.target === 1);
if (oneCountPresets.length !== 1 || oneCountPresets[0].id !== "preset-ente-selam") {
  throw new Error("The only one-count preset should be the post-prayer 'Allahümme ente's-selam' dhikr");
}
if (oneCountPresets[0].name !== "Allahümme ente's-selâmü ve minke's-selâm, tebârekte zâ'l-celâli ve'l-ikrâm") {
  throw new Error("The post-prayer Allahumma Antas-Salam wording is incomplete");
}

const duaRefs = [...app.matchAll(/\{ref:"(\d+):(\d+)(?:-(\d+))?",name:"([^"]+)"\}/g)];
if (duaRefs.length !== 15) throw new Error("Expected 15 Quran dua references, found " + duaRefs.length);
for (const match of duaRefs) {
  const surah = Number(match[1]), first = Number(match[2]), last = Number(match[3] || match[2]);
  if (!Number.isInteger(surah) || surah < 1 || surah > 114 || first < 1 || last < first || last - first > 9) {
    throw new Error("Invalid Quran dua reference: " + match[0]);
  }
}

const htmlAdsVersion = html.match(/ads\.bundle\.js\?v=(\d+)/)?.[1];
const swAdsVersion = sw.match(/\.\/ads\.bundle\.js\?v=(\d+)/)?.[1];
if (!htmlAdsVersion || htmlAdsVersion !== swAdsVersion) {
  throw new Error("Native ad bridge script or offline cache version is missing or mismatched");
}
const adPagesMatch = ads.match(/const AD_ALLOWED_PAGES = new Set\(\[([\s\S]*?)\]\);/);
if (!adPagesMatch) throw new Error("Ad screen allowlist is missing");
const adPages = [...adPagesMatch[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
if (["quran", "tesbih", "zikirmatik"].some(page => adPages.includes(page))) {
  throw new Error("Ads must stay disabled on Quran reading, tesbih, and zikirmatik screens");
}
if (!ads.includes("isTesting: true") || !ads.includes("npa: true") ||
    !ads.includes("showPrivacyOptionsForm") || !html.includes('id="adPrivacyOptions"')) {
  throw new Error("AdMob test mode, consent, or privacy options entry point is incomplete");
}
if (!html.includes("Uygulama Sahibi:") || !html.includes("Mehmet Şavk") || !html.includes('id="appVersion"')) {
  throw new Error("App owner/version footer is missing");
}
if (!zikirmatik.includes("const PRESETS=[")) throw new Error("Zikirmatik presets were not found");
if (!html.includes('tesbih.js?v=1') || !sw.includes("./tesbih.js?v=1")) throw new Error("Tesbih script/cache version mismatch");
for (const id of ["tesbihCount","tesbihBeads","tesbihHand","tesbihTap","tesbihReset","tesbihProgress","tesbihRounds","tesbihProgressBar","tesbihNext"]) {
  if (!ids.has(id) || !(tesbih.includes('$("' + id + '")') || tesbih.includes('getElementById("' + id + '")'))) throw new Error("Tesbih control is missing or not wired: " + id);
}
if (!tesbih.includes('navigator.vibrate([120,55,120])') || !tesbih.includes('count>=99')) throw new Error("Tesbih milestone vibration or 99-count limit is missing");

const packageVersion = JSON.parse(packageText).version;
const appVersion = app.match(/register\("\.\/sw\.js\?v=(\d+)"/)?.[1];
const cacheVersion = sw.match(/const CACHE="quran-shell-v(\d+)"/)?.[1];
const htmlAppVersion = html.match(/app\.js\?v=(\d+)/)?.[1];
const htmlStyleVersion = html.match(/styles\.css\?v=(\d+)/)?.[1];
if (!appVersion || appVersion !== cacheVersion || appVersion !== htmlAppVersion || appVersion !== htmlStyleVersion) {
  throw new Error("App, stylesheet and service-worker cache versions do not match");
}
if (packageVersion !== "0." + appVersion + ".0" || !buildWorkflow.includes("kuran-i-kerim-v" + appVersion + "-debug-apk")) {
  throw new Error("Package version or Android artifact name does not match app version " + appVersion);
}
if (!sw.includes("./app.js?v=" + appVersion) || !sw.includes("./styles.css?v=" + appVersion)) {
  throw new Error("Service worker pre-cache does not use the current app assets");
}

const htmlInspirationVersion = html.match(/inspiration\\.js\\?v=(\\d+)/)?.[1];
const swInspirationVersion = sw.match(/\\.\\/inspiration\\.js\\?v=(\\d+)/)?.[1];
if (!htmlInspirationVersion || htmlInspirationVersion !== swInspirationVersion) throw new Error("Gönle Dokunan Sözler script/cache version mismatch");
const cumaMatch = app.match(/const CUMA_MESSAGES=(\\[[\\s\\S]*?\\]);\\nconst CUMA_ANCHOR/);
if (!cumaMatch) throw new Error("Cuma message library is missing");
const cumaMessages = JSON.parse(cumaMatch[1]);
if (cumaMessages.length !== 52 || cumaMessages.some(item => !item.title?.trim() || !item.text?.trim())) throw new Error("Cuma message library must contain 52 complete weekly messages");
if (!app.includes("Europe/Istanbul") || !app.includes("day===4&&Number(p.hour)>=22") || !html.includes('id="cumaFeatureCard"') || !html.includes('id="cumaPage"')) throw new Error("Automatic Friday visibility schedule or Cuma page is incomplete");
const inspirationItems = [...inspiration.matchAll(/\{id:"[ha]\d+"/g)];
if (inspirationItems.length < 24) throw new Error("Daily inspiration library must contain at least 24 entries");
if (!html.includes('id="inspirationPickerToggle"') || !html.includes('id="inspirationPickerPanel"') || !inspiration.includes("pickerPanel.hidden=true") || !inspiration.includes('pickerToggle.addEventListener("click"')) throw new Error("Inspiration picker must open and close as a collapsible list");
if (!inspiration.includes('console.info("Gönle Dokunan Sözler hazır:"') || !inspiration.includes('root.addEventListener("click"') || !inspiration.includes('#inspirationSearch') || inspiration.includes("inspirationSelect")) throw new Error("Inspiration picker must use the interactive searchable list");
if (!inspiration.includes("inspiration-preview-attribution") || inspiration.includes("inspiration-preview-kicker") || inspiration.includes("inspiration-preview-brand")) throw new Error("Share-card image must contain only quote and short attribution");
// Keep the selector regression check explicit: it must start closed and be opened by its own button.
console.log([
  "App structure audit passed for V" + appVersion,
  "- Esma: 99 complete entries, 99 unique Arabic spellings, 99 unique Turkish names, 99 positive repetition targets",
  "- Turkish surah labels: 114 unique names",
  "- Static JavaScript-to-HTML element references: all present",
  "- Quran dua references: 15 syntactically valid entries",
  "- App owner and dynamic version footer: present"
].join("\n"));
