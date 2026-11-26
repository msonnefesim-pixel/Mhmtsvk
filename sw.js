// v70 includes corrected hadith references and clearer Esma list attribution.
// v71 preserves QuranEnc publisher and translation-version attribution in every meal view.
// v72 clarifies that Esma zikir amounts are traditional, not obligatory.
// v73 corrects the El-Vacid gloss and clarifies the status of the appended 99-name list.
// v74 refines the El-Mukit meaning against the TDV Islam Ansiklopedisi entry.
// v75 refines El-Muheymiin, El-Latif, El-Vasi and Er-Reshid meanings against TDV entries.
// v76 aligns El-Vasi meaning exactly with the TDV entry.
// v77 refines selected Esma meanings against the TDV Islam Ansiklopedisi table.
// v78 aligns all 99 short Esma meanings with the TDV alphabetical glossary.
// v79 strengthens per-ayah Quran integrity checks and updates privacy disclosures.
// v80 displays each surah-opening basmala separately from ayah 1.
// v81 adds meal attribution to saved ayah cards and Esma meaning source credit.
// v82 bundles verbatim Tanzil Uthmani 1.1 text for all Quran Arabic display.
// v86 links Tanzil at all Arabic display points and migrates saved first-ayah favorites.
// v88 fixes quote selection and expands daily share library and strips share images to quote plus concise attribution.
const CACHE="quran-shell-v88";
const FILES=["./","./index.html","./styles.css?v=88","./app.js?v=88","./esma.js?v=15","./zikirmatik.js?v=10","./inspiration.js?v=9","./manifest.webmanifest","./icon-v2.svg","./quran-uthmani.txt","./quran-offline-data.json"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  const isPage=event.request.mode==="navigate"||url.pathname.endsWith("/index.html")||url.pathname.endsWith("/");
  if(isPage){
    event.respondWith(fetch(event.request).then(response=>{
      if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return response;
    }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html"))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  })));
});
