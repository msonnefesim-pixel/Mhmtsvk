const API="https://api.alquran.cloud/v1";
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
function renderSurahList(items){listEl.replaceChildren();if(!items.length){listEl.textContent="Aramana uygun sure bulunamadı.";return;}items.forEach(s=>{const b=document.createElement("button");b.className="surah-row";const num=document.createElement("span");num.className="surah-number";num.textContent=s.number;const names=document.createElement("span");names.className="surah-names";const tr=document.createElement("strong");tr.textContent=s.englishName;const meta=document.createElement("small");meta.textContent=s.numberOfAyahs+" ayet · "+(s.revelationType==="Meccan"?"Mekkî":"Medenî");names.append(tr,meta);const ar=document.createElement("span");ar.className="surah-arabic";ar.textContent=s.name;b.append(num,names,ar);b.addEventListener("click",()=>loadSurah(s.number));listEl.append(b);});}
async function loadSurahList(){try{const response=await fetch(API+"/surah");if(!response.ok)throw new Error("HTTP "+response.status);const json=await response.json();if(json.code!==200||!Array.isArray(json.data))throw new Error("Geçersiz sure verisi");surahs=json.data;renderSurahList(surahs);}catch(error){listEl.textContent="Sure listesi şu anda yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.";}}
async function loadSurah(number){listEl.hidden=true;searchEl.parentElement.hidden=true;quranHeading.hidden=true;readingPanel.hidden=false;window.scrollTo({top:0,behavior:"instant"});document.getElementById("surahTitle").textContent="Sure yükleniyor…";const ayahList=document.getElementById("ayahList");ayahList.replaceChildren();try{const response=await fetch(API+"/surah/"+number+"/quran-uthmani");if(!response.ok)throw new Error("HTTP "+response.status);const json=await response.json();if(json.code!==200||!json.data)throw new Error("Geçersiz sure verisi");const s=json.data;readingPanel.scrollIntoView({behavior:"instant",block:"start"});document.getElementById("surahTitle").innerHTML="";const heading=document.createElement("h2");heading.textContent=s.name;const sub=document.createElement("p");sub.textContent=s.englishName+" · "+s.numberOfAyahs+" ayet";document.getElementById("surahTitle").append(heading,sub);s.ayahs.forEach(a=>{const card=document.createElement("article");card.className="ayah-card";const top=document.createElement("div");top.className="ayah-number";top.textContent="۞  "+a.numberInSurah;const text=document.createElement("p");text.className="ayah-arabic";text.dir="rtl";text.lang="ar";text.textContent=a.text;card.append(top,text);ayahList.append(card);});localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:s.englishName,arabicName:s.name,ayah:1}));}catch(error){document.getElementById("surahTitle").textContent="Sure yüklenemedi";const msg=document.createElement("p");msg.className="error-note";msg.textContent="İnternet bağlantını kontrol edip yeniden deneyebilirsin.";ayahList.append(msg);}}
document.getElementById("backToSurahs").addEventListener("click",()=>{readingPanel.hidden=true;listEl.hidden=false;searchEl.parentElement.hidden=false;quranHeading.hidden=false;window.scrollTo({top:0,behavior:"instant"});});
searchEl.addEventListener("input",()=>{const q=searchEl.value.trim().toLocaleLowerCase("tr");renderSurahList(surahs.filter(s=>s.englishName.toLocaleLowerCase("tr").includes(q)||s.name.includes(q)||String(s.number)===q));});
function renderLastRead(){const panel=document.getElementById("lastReadPanel");let saved=null;try{saved=JSON.parse(localStorage.getItem("quran-last-read")||"null");}catch{}panel.replaceChildren();if(!saved){const h=document.createElement("h2");h.textContent="Henüz kayıt yok";const p=document.createElement("p");p.textContent="Bir sure açtığında son okuduğun sure burada görünür.";panel.append(h,p);return;}const h=document.createElement("h2");h.textContent=saved.name;const p=document.createElement("p");p.textContent=saved.arabicName+" · "+saved.ayah+". ayet";const b=document.createElement("button");b.className="gold-button";b.textContent="Okumaya devam et";b.addEventListener("click",()=>{showPage("quran");loadSurah(saved.number);});panel.append(h,p,b);}

const quranDuas=[
{ref:"2:201",name:"Dünya ve Ahiret İyiliği Duası",meaning:"Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru."},
{ref:"2:127",name:"Hz. İbrahim'in Kabul Duası",meaning:"Rabbimiz! Bizden kabul buyur. Şüphesiz Sen işitensin, bilensin."},
{ref:"2:128",name:"Teslimiyet ve Tövbe Duası",meaning:"Rabbimiz! Bizi Sana teslim olanlardan eyle; soyumuzdan da Sana teslim olan bir ümmet çıkar. Bize ibadet yollarımızı göster ve tövbemizi kabul et."},
{ref:"2:250",name:"Sabır ve Sebat Duası",meaning:"Rabbimiz! Üzerimize sabır yağdır, ayaklarımızı sağlam bastır ve inkârcı topluluğa karşı bize yardım et."},
{ref:"3:8",name:"Kalplerin Sapmaması Duası",meaning:"Rabbimiz! Bizi doğru yola ilettikten sonra kalplerimizi eğriltme. Bize katından rahmet bağışla. Şüphesiz Sen çok bağışlayansın."},
{ref:"3:16",name:"Bağışlanma ve Korunma Duası",meaning:"Rabbimiz! Biz iman ettik; günahlarımızı bağışla ve bizi ateş azabından koru."},
{ref:"7:23",name:"Hz. Âdem'in Tövbe Duası",meaning:"Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen mutlaka ziyana uğrayanlardan oluruz."},
{ref:"10:85",name:"Allah'a Güvenme Duası",meaning:"Allah'a tevekkül ettik. Rabbimiz! Bizi zalimler topluluğu için bir sınama konusu yapma."},
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