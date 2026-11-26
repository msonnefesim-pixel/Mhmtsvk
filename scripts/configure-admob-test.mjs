import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
const stringsPath = path.join('android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
const testApplicationId = 'ca-app-pub-3940256099942544~3347511713';

if (!fs.existsSync(manifestPath) || !fs.existsSync(stringsPath)) {
  throw new Error('Generated Android manifest or strings.xml is missing');
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
const meta = '<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />';
if (manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  manifest = manifest.replace(/<meta-data\\s+android:name="com\\.google\\.android\\.gms\\.ads\\.APPLICATION_ID"[^>]*\\/>/, meta);
} else {
  manifest = manifest.replace(/<application\\b([^>]*)>/, '<application$1>\\n        ' + meta);
}
if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  throw new Error('Could not insert AdMob application metadata');
}
fs.writeFileSync(manifestPath, manifest);

let strings = fs.readFileSync(stringsPath, 'utf8');
const entry = '<string name="admob_app_id">' + testApplicationId + '</string>';
if (strings.includes('name="admob_app_id"')) {
  strings = strings.replace(/<string name="admob_app_id">[^<]*<\\/string>/, entry);
} else {
  strings = strings.replace('</resources>', '    ' + entry + '\\n</resources>');
}
fs.writeFileSync(stringsPath, strings);
console.log('Google demo AdMob application ID configured. Production IDs are not used.');