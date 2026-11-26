import { readFile } from "node:fs/promises";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const [html, app, esma, zikirmatik, inspiration, sw, packageText, buildWorkflow] = await Promise.all([
  read("index.html"), read("app.js"), read("esma.js"), read("zikirmatik.js"), read("inspiration.js"),
  read("sw.js"), read("package.json"), read(".github/workflows/build-android-apk.yml")
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

const surahNames = extractArray(app, /const TURKISH_SURAH_NAMES=(\[[\s\S]*?\]);/, "Turkish surah names");
if (surahNames.length !== 114 || new Set(surahNames).size !== 114) {
  throw new Error("Turkish surah names must contain 114 unique entries");
}

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
for (const [file, source] of [["app.js", app], ["esma.js", esma], ["inspiration.js", inspiration]]) {
  const refs = [...source.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(match => match[1]);
  const missing = [...new Set(refs.filter(id => !ids.has(id)))];
  if (missing.length) throw new Error(file + " references missing HTML ids: " + missing.join(", "));
}

const duaRefs = [...app.matchAll(/\{ref:"(\d+):(\d+)(?:-(\d+))?",name:"([^"]+)"\}/g)];
if (duaRefs.length !== 15) throw new Error("Expected 15 Quran dua references, found " + duaRefs.length);
for (const match of duaRefs) {
  const surah = Number(match[1]), first = Number(match[2]), last = Number(match[3] || match[2]);
  if (!Number.isInteger(surah) || surah < 1 || surah > 114 || first < 1 || last < first || last - first > 9) {
    throw new Error("Invalid Quran dua reference: " + match[0]);
  }
}

if (!html.includes("Uygulama Sahibi:") || !html.includes("Mehmet Şavk") || !html.includes('id="appVersion"')) {
  throw new Error("App owner/version footer is missing");
}
if (!zikirmatik.includes("const PRESETS=[")) throw new Error("Zikirmatik presets were not found");

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

console.log([
  "App structure audit passed",
  "- Esma: 99 complete entries, 99 unique Arabic spellings, 99 unique Turkish names, 99 positive repetition targets",
  "- Turkish surah labels: 114 unique names",
  "- Static JavaScript-to-HTML element references: all present",
  "- Quran dua references: 15 syntactically valid entries",
  "- App owner and dynamic version footer: present"
].join("\n"));
