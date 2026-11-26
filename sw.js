// v70 includes corrected hadith references and clearer Esma list attribution.
// v71 preserves QuranEnc publisher and translation-version attribution in every meal view.
// v72 clarifies that Esma zikir amounts are traditional, not obligatory.
// v73 corrects the El-Vacid gloss and clarifies the status of the appended 99-name list.
const CACHE="quran-shell-v73";
const FILES=["./","./index.html","./styles.css?v=73","./app.js?v=73","./esma.js?v=10","./zikirmatik.js?v=10","./inspiration.js?v=7","./listen.js?v=2","./manifest.webmanifest","./icon-v2.svg"];
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
