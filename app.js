const API="https://api.alquran.cloud/v1";
const MEAL_API="https://quranenc.com/api/v1";
const MEAL_KEY="turkish_rwwad";
const MEAL_VERSION="1.0.4";
let ayahObserver=null;
const pages={home:"homePage",quran:"quranPage",duas:"duasPage",listen:"listenPage",names:"namesPage",continue:"continuePage"};
let surahs=[];
function showPage(name){const id=pages[name]||pages.home;document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("selected",b.dataset.go===name||(name==="continue"&&b.dataset.go==="quran")));if(name==="continue")renderLastRead();window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>showPage(button.dataset.go)));
document.getElementById("themeButton").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("quran-theme",document.body.classList.contains("dark")?"dark":"light");});
if(localStorage.getItem("quran-theme")==="dark")document.body.classList.add("dark");
const listEl=document.getElementById("surahList");
const readingPanel=document.getElementById("readingPanel");
const searchEl=document.getElementById("surahSearch");
const quranHeading=document.querySelector("#quranPage .page-heading");
function renderSurahList(items){listEl.replaceChildren();if(!items.length){listEl.textContent="Aramana uygun sure bulunamadı.";return;}items.forEach(s=>{const b=document.createElement("button");b.className="surah-row";const num=document.createElement("span");num.className="surah-number";num.textContent=s.number;const names=document.createElement("span");names.className="surah-names";const tr=document.createElement("strong");tr.textContent=s.turkishName||s.englishName;const meta=document.createElement("small");meta.textContent=s.numberOfAyahs+" ayet · "+(s.revelationType==="Meccan"?"Mekkî":"Medenî");names.append(tr,meta);const ar=document.createElement("span");ar.className="surah-arabic";ar.textContent=s.name;b.append(num,names,ar);b.addEventListener("click",()=>loadSurah(s.number));listEl.append(b);});}
async function loadSurahList(){try{const [r,n]=await Promise.all([fetch(API+"/surah"),fetch(MEAL_API+"/translations/sowar_names?iso_code=tr").catch(()=>null)]);if(!r.ok)throw new Error("HTTP "+r.status);const j=await r.json();if(j.code!==200||!Array.isArray(j.data))throw new Error("Geçersiz sure verisi");let names={};if(n&&n.ok){try{names=await n.json();}catch{}}surahs=j.data.map(s=>({...s,turkishName:names[String(s.number)]||s.englishName}));renderSurahList(surahs);}catch(error){listEl.textContent="Sure listesi şu anda yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.";}}
async function loadSurah(number,restoreAyah=null){listEl.hidden=true;searchEl.parentElement.hidden=true;quranHeading.hidden=true;readingPanel.hidden=false;window.scrollTo({top:0,behavior:"instant"});document.getElementById("surahTitle").textContent="Sure yükleniyor…";const ayahList=document.getElementById("ayahList");ayahList.replaceChildren();if(ayahObserver)ayahObserver.disconnect();try{const [ar,me]=await Promise.all([fetch(API+"/surah/"+number+"/quran-uthmani"),fetch(MEAL_API+"/translation/sura/"+MEAL_KEY+"/"+number)]);if(!ar.ok||!me.ok)throw new Error("Sure içeriği yüklenemedi");const [aj,mj]=await Promise.all([ar.json(),me.json()]);if(aj.code!==200||!aj.data||!Array.isArray(mj.result))throw new Error("Sure verisi eksik");const s=aj.data;const selected=surahs.find(x=>x.number===number);const title=document.createElement("h2");title.textContent=selected?.turkishName||s.englishName;const sub=document.createElement("p");sub.textContent=s.numberOfAyahs+" ayet";document.getElementById("surahTitle").replaceChildren(title,sub);const meals=new Map(mj.result.map(x=>[Number(x.aya),x]));s.ayahs.forEach(a=>{const card=document.createElement("article");card.className="ayah-card";card.id="ayah-"+a.numberInSurah;card.dataset.ayah=a.numberInSurah;const top=document.createElement("div");top.className="ayah-number";top.textContent="۞  "+a.numberInSurah+". Ayet";const arabic=document.createElement("p");arabic.className="ayah-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=a.text;const meal=meals.get(a.numberInSurah);const meaning=document.createElement("p");meaning.className="ayah-meaning";meaning.textContent=meal?.translation||"Bu ayetin meali şu anda yüklenemedi.";card.append(top,arabic,meaning);if(meal?.footnotes){const details=document.createElement("details");details.className="ayah-footnotes";const summary=document.createElement("summary");summary.textContent="Açıklama ve dipnotlar";const note=document.createElement("p");note.textContent=meal.footnotes;details.append(summary,note);card.append(details);}ayahList.append(card);});const credit=document.createElement("p");credit.className="source-note";credit.textContent="Arapça: AlQuran Cloud · Türkçe meal: Rowwad Translation Center / QuranEnc.com · Sürüm "+MEAL_VERSION;ayahList.append(credit);localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah:restoreAyah||1}));ayahObserver=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v){const ayah=Number(v.target.dataset.ayah);localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah}));}},{rootMargin:"-20% 0px -55% 0px",threshold:[0,.25,.5]});ayahList.querySelectorAll(".ayah-card").forEach(card=>ayahObserver.observe(card));if(restoreAyah)setTimeout(()=>document.getElementById("ayah-"+restoreAyah)?.scrollIntoView({behavior:"instant",block:"start"}),120);else window.scrollTo({top:0,behavior:"instant"});}catch(error){document.getElementById("surahTitle").textContent="Sure yüklenemedi";const msg=document.createElement("p");msg.className="error-note";msg.textContent="Arapça metin veya meal yüklenemedi. İnternet bağlantını kontrol edip yeniden dene.";ayahList.append(msg);}}
function setAyahFont(delta){const size=Math.max(22,Math.min(42,Number(localStorage.getItem("quran-font-size")||30)+delta));document.documentElement.style.setProperty("--ayah-font-size",size+"px");localStorage.setItem("quran-font-size",String(size));}
document.getElementById("fontSmaller").addEventListener("click",()=>setAyahFont(-2));document.getElementById("fontLarger").addEventListener("click",()=>setAyahFont(2));setAyahFont(0);
document.getElementById("previousSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number>1)loadSurah(x.number-1);});
document.getElementById("nextSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number<114)loadSurah(x.number+1);});
document.getElementById("backToSurahs").addEventListener("click",()=>{readingPanel.hidden=true;listEl.hidden=false;searchEl.parentElement.hidden=false;quranHeading.hidden=false;window.scrollTo({top:0,behavior:"instant"});});
searchEl.addEventListener("input",()=>{const q=searchEl.value.trim().toLocaleLowerCase("tr");renderSurahList(surahs.filter(s=>(s.turkishName||s.englishName).toLocaleLowerCase("tr").includes(q)||s.englishName.toLocaleLowerCase("tr").includes(q)||s.name.includes(q)||String(s.number)===q));});
function renderLastRead(){const panel=document.getElementById("lastReadPanel");let saved=null;try{saved=JSON.parse(localStorage.getItem("quran-last-read")||"null");}catch{}panel.replaceChildren();if(!saved){const h=document.createElement("h2");h.textContent="Henüz kayıt yok";const p=document.createElement("p");p.textContent="Bir sure açtığında son okuduğun sure burada görünür.";panel.append(h,p);return;}const h=document.createElement("h2");h.textContent=saved.name;const p=document.createElement("p");p.textContent=saved.ayah+". ayette kaldın";const b=document.createElement("button");b.className="gold-button";b.textContent="Okumaya devam et";b.addEventListener("click",()=>{showPage("quran");loadSurah(saved.number,saved.ayah||1);});panel.append(h,p,b);}

const quranDuas=[
{ref:"2:201",name:"Dünya ve Ahiret İyiliği Duası",meaning:"Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru."},
{ref:"2:127",name:"Hz. İbrahim'in Kabul Duası",meaning:"Rabbimiz! Bizden kabul buyur. Şüphesiz Sen işitensin, bilensin."},
{ref:"2:128",name:"Teslimiyet ve Tövbe Duası",meaning:"Rabbimiz! Bizi Sana teslim olanlardan eyle; soyumuzdan da Sana teslim olan bir ümmet çıkar. Bize ibadet yollarımızı göster ve tövbemizi kabul et."},
{ref:"2:250",name:"Sabır ve Sebat Duası",meaning:"Rabbimiz! Üzerimize sabır yağdır, ayaklarımızı sağlam bastır ve inkârcı topluluğa karşı bize yardım et."},
{ref:"3:8",name:"Kalplerin Sapmaması Duası",meaning:"Rabbimiz! Bizi doğru yola ilettikten sonra kalplerimizi eğriltme. Bize katından rahmet bağışla. Şüphesiz Sen çok bağışlayansın."},
{ref:"3:16",name:"Bağışlanma ve Korunma Duası",meaning:"Rabbimiz! Biz iman ettik; günahlarımızı bağışla ve bizi ateş azabından koru."},
{ref:"7:23",name:"Hz. Âdem'in Tövbe Duası",meaning:"Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen mutlaka ziyana uğrayanlardan oluruz."},
{ref:"10:85",name:"Allah'a Sığınma ve Dayanma Duası",meaning:"Allah'a tevekkül ettik. Rabbimiz! Bizi zalimler topluluğu için bir sınama konusu yapma."},
{ref:"14:40",name:"Namaz ve Nesil İçin Dua",meaning:"Rabbim! Beni namazı dosdoğru kılanlardan eyle; soyumdan da böyle kimseler yetiştir. Rabbimiz, duamı kabul et."},
{ref:"17:24",name:"Anne Babaya Merhamet Duası",meaning:"Rabbim! Küçüklüğümde onlar beni nasıl yetiştirdilerse Sen de onlara öyle merhamet et."},
{ref:"20:25",name:"Hz. Musa'nın Kolaylık Duası",meaning:"Rabbim! Gönlüme ferahlık ver; işimi kolaylaştır."},
{ref:"23:109",name:"Bağışlanma ve Merhamet Duası",meaning:"Rabbimiz! İman ettik; bizi bağışla ve bize merhamet et. Sen merhametlilerin en hayırlısısın."},
{ref:"25:74",name:"Hayırlı Aile Duası",meaning:"Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl; bizi Allah'a karşı gelmekten sakınanlara önder eyle."},
{ref:"40:7",name:"Müminler İçin Bağışlanma Duası",meaning:"Rabbimiz! Rahmetin ve ilmin her şeyi kuşatmıştır. Tövbe edenleri ve yoluna uyanları bağışla; onları cehennem azabından koru."},
{ref:"66:8",name:"Nurun Tamamlanması Duası",meaning:"Rabbimiz! Nurumuzu tamamla ve bizi bağışla. Şüphesiz Sen her şeye gücü yetensin."}
];
const duaSelect=document.getElementById("duaSelect");
const duaReading=document.getElementById("duaReading");
quranDuas.forEach((dua,index)=>{const option=document.createElement("option");option.value=String(index);option.textContent=dua.name;duaSelect.append(option);});
duaSelect.addEventListener("change",async()=>{
 const dua=quranDuas[Number(duaSelect.value)];
 if(!dua){duaReading.className="dua-reading empty-state";duaReading.innerHTML='<div class="empty-symbol">۞</div><h2>Duanı seç</h2><p>Seçtiğin duanın Arapça metni ve Türkçe meali burada görünecek.</p>';return;}
 duaReading.className="dua-reading";
 duaReading.replaceChildren();
 const loading=document.createElement("p");loading.className="loading-state";loading.textContent="Dua yükleniyor…";duaReading.append(loading);
 try{
  const response=await fetch(API+"/ayah/"+dua.ref+"/quran-uthmani");
  if(!response.ok)throw new Error("HTTP "+response.status);
  const json=await response.json();if(json.code!==200||!json.data)throw new Error("Dua bulunamadı");
  const data=json.data;
  duaReading.replaceChildren();
  const title=document.createElement("h2");title.className="dua-title";title.textContent=dua.name;
  const arabicLabel=document.createElement("div");arabicLabel.className="dua-section-label";arabicLabel.textContent="ARAPÇA";
  const arabic=document.createElement("p");arabic.className="dua-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=data.text;
  const divider=document.createElement("div");divider.className="dua-divider";
  const mealLabel=document.createElement("div");mealLabel.className="dua-section-label";mealLabel.textContent="TÜRKÇE MEALİ";
  const meal=document.createElement("p");meal.className="dua-meaning";meal.textContent=dua.meaning;
  const source=document.createElement("small");source.className="dua-reference";source.textContent=(data.surah?.englishName||"Kur'an")+" · "+dua.ref.replace(":"," / ")+" · "+(data.numberInSurah||"")+" . ayet";
  duaReading.append(title,arabicLabel,arabic,divider,mealLabel,meal,source);
  window.scrollTo({top:0,behavior:"smooth"});
 }catch(error){duaReading.replaceChildren();const msg=document.createElement("p");msg.className="error-note";msg.textContent="Dua şu anda yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.";duaReading.append(msg);}
});

loadSurahList();
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));