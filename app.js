const APP_VERSION=new URL(document.currentScript.src).searchParams.get("v")||"1";
const versionLabel=document.getElementById("appVersion");
if(versionLabel)versionLabel.textContent="v"+APP_VERSION;
const API="https://api.alquran.cloud/v1";
const MEAL_API="https://quranenc.com/api/v1";
const MEAL_KEY="turkish_rwwad";
const MEAL_VERSION="1.0.4";
let offlineQuranDataPromise=null;
async function loadOfflineQuranData(){
 if(!offlineQuranDataPromise){
  offlineQuranDataPromise=(async()=>{
   const response=await fetch("./quran-offline-data.json");
   if(!response.ok)throw new Error("Çevrimdışı Kur’an verisi yüklenemedi");
   const data=await response.json();
   if(data.schemaVersion!==1||!Array.isArray(data.surahs)||data.surahs.length!==114)throw new Error("Çevrimdışı Kur’an verisi doğrulanamadı");
   let total=0;
   for(let i=0;i<data.surahs.length;i++){
    const surah=data.surahs[i];
    if(Number(surah.number)!==i+1||!Array.isArray(surah.ayahs)||surah.ayahs.length!==Number(surah.numberOfAyahs))throw new Error("Sure veya ayet sırası eksik");
    for(let j=0;j<surah.ayahs.length;j++){
     const ayah=surah.ayahs[j];
     if(Number(ayah.aya)!==j+1||typeof ayah.translation!=="string"||!ayah.translation.trim())throw new Error("Türkçe mealde eksik ayet var");
    }
    total+=surah.ayahs.length;
   }
   if(total!==6236)throw new Error("Çevrimdışı meal 6.236 ayet kontrolünden geçemedi");
   return data;
  })().catch(error=>{offlineQuranDataPromise=null;throw error;});
 }
 return offlineQuranDataPromise;
}
window.getQuranMealForSurah=async number=>{
 const data=await loadOfflineQuranData();
 const surah=data.surahs[Number(number)-1];
 if(!surah||Number(surah.number)!==Number(number))throw new Error("Sure meali bulunamadı");
 return surah.ayahs;
};
let ayahObserver=null;
const pages={home:"homePage",quran:"quranPage",duas:"duasPage",names:"namesPage",continue:"continuePage",favorites:"favoritesPage",readingStats:"readingStatsPage",zikirmatik:"zikirmatikPage",inspiration:"inspirationPage"};
let surahs=[];
let surahListPromise=null;
let quranTextPromise=null;
let quranTextLines=null;
let appCurrentPage="home";
let appCurrentView="list";
const appNavStack=[{page:"home",view:"list"}];
function pushAppState(page,view="list"){
  const state={page,view};
  appNavStack.push(state);
  appCurrentPage=page;appCurrentView=view;
  history.pushState({quranApp:true,...state},"",location.pathname+location.search);
}
function renderAppPage(page,view="list"){
  const id=pages[page]||pages.home;
  appCurrentPage=page;appCurrentView=view;
  document.querySelectorAll(".page").forEach(p=>{const visible=p.id===id;p.classList.toggle("active",visible);p.style.display=visible?"block":"none";});
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("selected",b.dataset.go===page||(page==="continue"&&b.dataset.go==="quran")));
  if(page==="quran"){const reader=view==="reader";readingPanel.hidden=!reader;pickerEl.hidden=reader;quranHeading.hidden=reader;}
  if(page==="continue")renderLastRead();
  if(page==="favorites")renderFavorites();
  if(page==="readingStats")renderReadingStats();
  window.scrollTo({top:0,behavior:"instant"});
}
function showPage(name,addHistory=true){
  if(addHistory)pushAppState(name,"list");
  else{appCurrentPage=name;appCurrentView="list";}
  renderAppPage(name,"list");
}
history.replaceState({quranApp:true,page:"home",view:"list"},"",location.pathname+location.search);
document.addEventListener("click",event=>{
  const button=event.target.closest("[data-go]");
  if(!button)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  showPage(button.dataset.go);
},true);
window.addEventListener("popstate",event=>{
  if(appNavStack.length>1)appNavStack.pop();
  const state=event.state;
  const page=state&&state.quranApp&&pages[state.page]?state.page:"home";
  const view=page==="quran"&&state.view==="reader"?"reader":"list";
  if(appNavStack.length===0)appNavStack.push({page,view});
  renderAppPage(page,view);
});
window.addEventListener("keydown",event=>{
  if(event.key==="Escape"||event.key==="BrowserBack"){
    if(appCurrentPage!=="home"||appCurrentView==="reader"){
      event.preventDefault();
      history.back();
    }
  }
});
document.getElementById("themeButton").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("quran-theme",document.body.classList.contains("dark")?"dark":"light");});
if(localStorage.getItem("quran-theme")==="dark")document.body.classList.add("dark");
const pickerEl=document.getElementById("surahPicker");
const surahSelect=document.getElementById("surahSelect");
const retrySurahList=document.getElementById("retrySurahList");
const readingPanel=document.getElementById("readingPanel");
const searchEl=document.getElementById("surahSearch");
const quranHeading=document.querySelector("#quranPage .page-heading");
retrySurahList.addEventListener("click",()=>{retrySurahList.hidden=true;surahSelect.disabled=true;surahSelect.replaceChildren();const option=document.createElement("option");option.value="";option.textContent="Sureler yükleniyor…";surahSelect.append(option);surahListPromise=loadSurahList();});
function renderSurahList(items){const current=surahSelect.value;surahSelect.replaceChildren();const first=document.createElement("option");first.value="";first.textContent=items.length===114?"Bir sure seçiniz":"Arama sonucundan sure seçiniz";surahSelect.append(first);items.forEach(s=>{const option=document.createElement("option");option.value=String(s.number);option.textContent=s.number+". "+(s.turkishName||s.englishName)+" · "+s.numberOfAyahs+" ayet";surahSelect.append(option);});surahSelect.disabled=!items.length;if(current&&items.some(s=>String(s.number)===current))surahSelect.value=current;}
const TURKISH_SURAH_NAMES=["Fâtiha","Bakara","Âl-i İmrân","Nisâ","Mâide","En'âm","A'râf","Enfâl","Tevbe","Yûnus","Hûd","Yûsuf","Ra'd","İbrâhim","Hicr","Nahl","İsrâ","Kehf","Meryem","Tâhâ","Enbiyâ","Hac","Mü'minûn","Nûr","Furkân","Şuarâ","Neml","Kasas","Ankebût","Rûm","Lokmân","Secde","Ahzâb","Sebe","Fâtır","Yâsîn","Sâffât","Sâd","Zümer","Mü'min (Gâfir)","Fussilet","Şûrâ","Zuhruf","Duhân","Câsiye","Ahkâf","Muhammed","Fetih","Hucurât","Kâf","Zâriyât","Tûr","Necm","Kamer","Rahmân","Vâkıa","Hadîd","Mücâdele","Haşr","Mümtehine","Saff","Cuma","Münâfikûn","Tegâbün","Talâk","Tahrîm","Mülk","Kalem","Hâkka","Meâric","Nûh","Cin","Müzzemmil","Müddessir","Kıyâmet","İnsan","Mürselât","Nebe","Nâziât","Abese","Tekvîr","İnfitâr","Mutaffifîn","İnşikâk","Bürûc","Târık","A'lâ","Gâşiye","Fecr","Beled","Şems","Leyl","Duhâ","İnşirâh","Tîn","Alak","Kadr","Beyyine","Zilzâl","Âdiyât","Kâria","Tekâsür","Asr","Hümeze","Fîl","Kureyş","Mâûn","Kevser","Kâfirûn","Nasr","Tebbet (Mesed)","İhlâs","Felak","Nâs"];
async function loadSurahList(){retrySurahList.hidden=true;try{const offline=await loadOfflineQuranData();if(TURKISH_SURAH_NAMES.length!==114)throw new Error("Türkçe sure listesi kontrolü başarısız");surahs=offline.surahs.map(s=>({...s,turkishName:TURKISH_SURAH_NAMES[Number(s.number)-1]||s.englishName}));renderSurahList(surahs);}catch(error){surahs=[];surahListPromise=null;surahSelect.replaceChildren();const option=document.createElement("option");option.value="";option.textContent="Sure listesi yüklenemedi";surahSelect.append(option);surahSelect.disabled=true;retrySurahList.hidden=false;}}
async function loadQuranText(){
 if(quranTextLines)return quranTextLines;
 if(!quranTextPromise){
  quranTextPromise=(async()=>{
   const response=await fetch("./quran-uthmani.txt");
   if(!response.ok)throw new Error("Tanzil Kur’an metni yüklenemedi");
   const raw=await response.text();
   const lines=raw.replace(/^\uFEFF/,"").split(/\r?\n/).filter(line=>line.trim()&&!line.startsWith("#"));
   if(lines.length!==6236)throw new Error("Tanzil metninde 6.236 ayet kontrolü başarısız");
   quranTextLines=lines;
   return lines;
  })().catch(error=>{quranTextPromise=null;throw error;});
 }
 return quranTextPromise;
}
async function getSurahAyahTexts(number){
 if(!surahs.length){
  if(surahListPromise)await surahListPromise;
  else surahListPromise=loadSurahList();
 }
 if(!surahs.length)throw new Error("Sure bilgileri yüklenemedi");
 const meta=surahs.find(item=>Number(item.number)===Number(number));
 if(!meta)throw new Error("Sure numarası bulunamadı");
 if(surahs.reduce((sum,item)=>sum+Number(item.numberOfAyahs),0)!==6236)throw new Error("Sure ayet sayıları 6.236 kontrolünden geçemedi");
 const start=surahs.filter(item=>Number(item.number)<Number(number)).reduce((sum,item)=>sum+Number(item.numberOfAyahs),0);
 const lines=await loadQuranText();
 const texts=lines.slice(start,start+Number(meta.numberOfAyahs));
 if(texts.length!==Number(meta.numberOfAyahs)||texts.some(text=>!text.trim()))throw new Error("Sure metni eksik veya boş");
 return {meta,texts};
}
async function getQuranAyahText(surahNumber,ayahNumber){
 const {texts}=await getSurahAyahTexts(surahNumber);
 const text=texts[Number(ayahNumber)-1];
 if(!text)throw new Error("Ayet metni bulunamadı");
 let result=text.replace(/^\uFEFF/,"");
 if(Number(ayahNumber)===1&&Number(surahNumber)!==1&&Number(surahNumber)!==9){
  const match=result.match(/^(ب[ِّ]{1,2}سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u);
  if(!match)throw new Error("Sure başındaki besmele ayet metninden ayrılamadı");
  result=result.slice(match[1].length).trimStart();
 }
 return result;
}
async function loadSurah(number,restoreAyah=null,addHistory=true){
 if(addHistory)pushAppState("quran","reader");else{appCurrentPage="quran";appCurrentView="reader";}
 pickerEl.hidden=true;quranHeading.hidden=true;readingPanel.hidden=false;window.scrollTo({top:0,behavior:"instant"});
 document.getElementById("surahTitle").textContent="Sure yükleniyor…";
 const ayahList=document.getElementById("ayahList");ayahList.replaceChildren();if(ayahObserver)ayahObserver.disconnect();
 try{
  const [{meta:s,texts:ayahTexts},offline]=await Promise.all([
   getSurahAyahTexts(number),
   loadOfflineQuranData()
  ]);
  const mealJson={result:offline.surahs[Number(number)-1]?.ayahs};
  if(!Array.isArray(mealJson.result))throw new Error("Çevrimdışı Türkçe meal verisi eksik");
  if(Number(s.number)!==Number(number)||ayahTexts.length!==Number(s.numberOfAyahs)||ayahTexts.some(text=>typeof text!=="string"||!text.trim()))throw new Error("Tanzil sure metni ayet sayısı veya bütünlük kontrolünden geçemedi");
  const meals=new Map(mealJson.result.map(item=>[Number(item.aya),item]));
  if(meals.size!==Number(s.numberOfAyahs)||Array.from({length:Number(s.numberOfAyahs)},(_,i)=>i+1).some(n=>!meals.has(n)||typeof meals.get(n).translation!=="string"||!meals.get(n).translation.trim()))throw new Error("Türkçe mealde eksik veya tekrarlı ayet bulundu");
  const basmalaPattern=/^(ب[ِّ]{1,2}سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u;
  const firstArabicText=ayahTexts[0].replace(/^\uFEFF/,"");
  let openingBasmala="",firstAyahArabic=firstArabicText;
  if(number!==1&&number!==9){
   const match=firstArabicText.match(basmalaPattern);
   if(!match)throw new Error("Sure başındaki besmele ayet metninden güvenle ayrılamadı");
   openingBasmala=match[1].trim();
   firstAyahArabic=firstArabicText.slice(match[1].length).trimStart();
  }
  if(!firstAyahArabic)throw new Error("İlk ayet metni boş kaldı");
  const selected=s;
  if(openingBasmala){
   const basmala=document.createElement("p");basmala.className="surah-basmala";basmala.dir="rtl";basmala.lang="ar";basmala.textContent=openingBasmala;ayahList.append(basmala);
  }
  const title=document.createElement("h2");title.textContent=selected?.turkishName||s.englishName;
  const sub=document.createElement("p");sub.textContent=s.numberOfAyahs+" ayet";
  document.getElementById("surahTitle").replaceChildren(title,sub);
  ayahTexts.forEach((ayahText,index)=>{
   const ayahNumber=index+1;
   const card=document.createElement("article");card.className="ayah-card";card.id="ayah-"+ayahNumber;card.dataset.ayah=ayahNumber;
   const meal=meals.get(ayahNumber);
   const top=document.createElement("div");top.className="ayah-topline";
   const numberLabel=document.createElement("div");numberLabel.className="ayah-number";numberLabel.textContent="۞  "+ayahNumber+". Ayet";
   const favoriteButton=document.createElement("button");favoriteButton.type="button";favoriteButton.className="ayah-favorite";
   const favoriteKey=s.number+":"+ayahNumber;
   const displayedArabic=ayahNumber===1?firstAyahArabic:ayahText.replace(/^\uFEFF/,"");
   const currentFavorites=getFavoriteAyahs();const alreadyFavorite=currentFavorites.some(item=>item.key===favoriteKey);
   favoriteButton.textContent=alreadyFavorite?"★":"☆";favoriteButton.setAttribute("aria-label",alreadyFavorite?"Favorilerden çıkar":"Favorilere ekle");favoriteButton.setAttribute("aria-pressed",String(alreadyFavorite));
   favoriteButton.addEventListener("click",()=>toggleFavoriteAyah({key:favoriteKey,surahNumber:s.number,surahName:selected?.turkishName||s.englishName,ayahNumber,arabic:displayedArabic,openingBasmala:ayahNumber===1?openingBasmala:"",meaning:meal.translation},favoriteButton));
   top.append(numberLabel,favoriteButton);
   const arabic=document.createElement("p");arabic.className="ayah-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=displayedArabic;
   const meaning=document.createElement("p");meaning.className="ayah-meaning";meaning.textContent=meal.translation;
   card.append(top,arabic,meaning);
   if(meal.footnotes){const details=document.createElement("details");details.className="ayah-footnotes";const summary=document.createElement("summary");summary.textContent="Açıklama ve dipnotlar";const note=document.createElement("p");note.textContent=meal.footnotes;details.append(summary,note);card.append(details);}
   ayahList.append(card);
  });
  const credit=document.createElement("p");credit.className="source-note";
  const tanzilLink=document.createElement("a");tanzilLink.href="https://tanzil.net";tanzilLink.textContent="Tanzil Project";
  const mealLink=document.createElement("a");mealLink.href="https://quranenc.com";mealLink.textContent="QuranEnc.com";
  credit.append("Arapça: ",tanzilLink," · Uthmani 1.1 · Türkçe meal: Rowwad Translation Center / ",mealLink," · Sürüm "+MEAL_VERSION+" · Türkçe meal, Kur’an’ın Arapça aslının yerine geçmeyen bir anlam aktarımıdır.");
  ayahList.append(credit);
  localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah:restoreAyah||1}));
  ayahObserver=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
   if(visible){const ayah=Number(visible.target.dataset.ayah);localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah}));}
   entries.forEach(entry=>{if(entry.isIntersecting&&entry.intersectionRatio>=.25)recordDailyReading(s.number,Number(entry.target.dataset.ayah));});
  },{rootMargin:"-20% 0px -55% 0px",threshold:[0,.25,.5]});
  ayahList.querySelectorAll(".ayah-card").forEach(card=>ayahObserver.observe(card));
  if(restoreAyah)setTimeout(()=>document.getElementById("ayah-"+restoreAyah)?.scrollIntoView({behavior:"instant",block:"start"}),120);
  else window.scrollTo({top:0,behavior:"instant"});
 }catch(error){
  document.getElementById("surahTitle").textContent="Sure yüklenemedi";
  const msg=document.createElement("p");msg.className="error-note";msg.textContent="Tanzil Arapça metni veya Türkçe meal yüklenemedi. İnternet bağlantını kontrol edip yeniden dene.";
  ayahList.append(msg);
 }
}
const FAVORITES_KEY="quran-favorite-ayahs";
function getFavoriteAyahs(){
 try{
  const value=JSON.parse(localStorage.getItem(FAVORITES_KEY)||"[]");
  if(!Array.isArray(value))return [];
  const pattern=/^(ب[ِّ]{1,2}سْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ )/u;
  return value.map(item=>{
   if(!item||typeof item!=="object")return item;
   if(Number(item.ayahNumber)===1&&Number(item.surahNumber)!==1&&Number(item.surahNumber)!==9&&typeof item.arabic==="string"){
    const match=item.arabic.match(pattern);
    if(match)return {...item,openingBasmala:match[1].trim(),arabic:item.arabic.slice(match[1].length).trimStart()};
   }
   return item;
  });
 }catch{return [];}
}
function toggleFavoriteAyah(item,button){let list=getFavoriteAyahs();const exists=list.some(x=>x.key===item.key);if(exists)list=list.filter(x=>x.key!==item.key);else list.push(item);localStorage.setItem(FAVORITES_KEY,JSON.stringify(list));const active=!exists;button.textContent=active?"★":"☆";button.setAttribute("aria-label",active?"Favorilerden çıkar":"Favorilere ekle");button.setAttribute("aria-pressed",String(active));if(appCurrentPage==="favorites")renderFavorites();}
function renderFavorites(){const panel=document.getElementById("favoritesList");if(!panel)return;panel.replaceChildren();const list=getFavoriteAyahs();if(!list.length){const empty=document.createElement("div");empty.className="empty-state";const symbol=document.createElement("div");symbol.className="empty-symbol";symbol.textContent="♡";const title=document.createElement("h2");title.textContent="Henüz favori ayetin yok";const note=document.createElement("p");note.textContent="Kur’an okurken ayetlerin yanındaki yıldız simgesine dokunarak buraya ekleyebilirsin.";empty.append(symbol,title,note);panel.append(empty);return;}list.slice().reverse().forEach(item=>{const card=document.createElement("article");card.className="favorite-ayah-card";const heading=document.createElement("div");heading.className="favorite-ayah-heading";const label=document.createElement("strong");label.textContent=item.surahName+" · "+item.ayahNumber+". Ayet";const remove=document.createElement("button");remove.type="button";remove.className="favorite-remove";remove.textContent="★";remove.setAttribute("aria-label","Favorilerden çıkar");remove.addEventListener("click",()=>{localStorage.setItem(FAVORITES_KEY,JSON.stringify(getFavoriteAyahs().filter(x=>x.key!==item.key)));renderFavorites();});heading.append(label,remove);const arabic=document.createElement("p");arabic.className="ayah-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=item.arabic;let opening=null;if(item.openingBasmala){opening=document.createElement("p");opening.className="surah-basmala";opening.dir="rtl";opening.lang="ar";opening.textContent=item.openingBasmala;}const meaning=document.createElement("p");meaning.className="ayah-meaning";meaning.textContent=item.meaning;const mealCredit=document.createElement("small");mealCredit.className="favorite-meal-credit";const tanzilCredit=document.createElement("a");tanzilCredit.href="https://tanzil.net";tanzilCredit.textContent="Tanzil Project";const quranencCredit=document.createElement("a");quranencCredit.href="https://quranenc.com";quranencCredit.textContent="QuranEnc.com";mealCredit.append("Arapça: ",tanzilCredit," · Uthmani 1.1 · Meal: Rowwad Translation Center / ",quranencCredit," · Sürüm "+MEAL_VERSION);const open=document.createElement("button");open.type="button";open.className="gold-button favorite-open";open.textContent="Surede aç";open.addEventListener("click",()=>{showPage("quran");loadSurah(item.surahNumber,item.ayahNumber);});card.append(heading);if(opening)card.append(opening);card.append(arabic,meaning,mealCredit,open);panel.append(card);});}
function setAyahFont(delta){const size=Math.max(22,Math.min(42,Number(localStorage.getItem("quran-font-size")||30)+delta));document.documentElement.style.setProperty("--ayah-font-size",size+"px");localStorage.setItem("quran-font-size",String(size));}
document.getElementById("fontSmaller").addEventListener("click",()=>setAyahFont(-2));document.getElementById("fontLarger").addEventListener("click",()=>setAyahFont(2));setAyahFont(0);
document.getElementById("previousSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number>1)loadSurah(x.number-1,null,false);});
document.getElementById("nextSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number<114)loadSurah(x.number+1,null,false);});
document.getElementById("backToSurahs").addEventListener("click",()=>{if(appCurrentPage==="quran"&&appCurrentView==="reader")history.back();else{readingPanel.hidden=true;pickerEl.hidden=false;quranHeading.hidden=false;surahSelect.value="";appCurrentView="list";}});
surahSelect.addEventListener("change",()=>{const number=Number(surahSelect.value);if(number)loadSurah(number);});
searchEl.addEventListener("input",()=>{const q=searchEl.value.trim().toLocaleLowerCase("tr");renderSurahList(surahs.filter(s=>(s.turkishName||s.englishName).toLocaleLowerCase("tr").includes(q)||s.englishName.toLocaleLowerCase("tr").includes(q)||s.name.includes(q)||String(s.number)===q));});
const DAILY_READING_KEY="quran-daily-reading-v1";
const PERIOD_READING_KEY="quran-period-reading-v1";
function localDateParts(){
  const now=new Date();
  return {year:now.getFullYear(),month:now.getMonth()+1,day:now.getDate()};
}
function localDateKey(){
  const d=localDateParts();
  return d.year+"-"+String(d.month).padStart(2,"0")+"-"+String(d.day).padStart(2,"0");
}
function getWeekKey(){
  const d=new Date();d.setHours(0,0,0,0);
  const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function getMonthKey(){
  const d=localDateParts();return d.year+"-"+String(d.month).padStart(2,"0");
}
function getDailyReading(){
  const today=localDateKey();
  try{const saved=JSON.parse(localStorage.getItem(DAILY_READING_KEY)||"null");if(saved&&saved.date===today)return saved;}catch{}
  return {date:today,ayahs:[],surahs:[],target:20};
}
function saveDailyReading(data){localStorage.setItem(DAILY_READING_KEY,JSON.stringify(data));}
function getPeriodReading(){
  const week=getWeekKey(),month=getMonthKey();
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(PERIOD_READING_KEY)||"{}")||{};}catch{}
  if(!saved.week||saved.week.key!==week)saved.week={key:week,ayahs:[],target:100};
  if(!saved.month||saved.month.key!==month)saved.month={key:month,ayahs:[],target:400};
  return saved;
}
function savePeriodReading(data){localStorage.setItem(PERIOD_READING_KEY,JSON.stringify(data));}
function recordDailyReading(surahNumber,ayahNumber){
  const ayahKey=surahNumber+":"+ayahNumber;
  const daily=getDailyReading();
  if(!daily.ayahs.includes(ayahKey))daily.ayahs.push(ayahKey);
  if(!daily.surahs.includes(surahNumber))daily.surahs.push(surahNumber);
  saveDailyReading(daily);
  const periods=getPeriodReading();
  if(!periods.week.ayahs.includes(ayahKey))periods.week.ayahs.push(ayahKey);
  if(!periods.month.ayahs.includes(ayahKey))periods.month.ayahs.push(ayahKey);
  savePeriodReading(periods);
  if(appCurrentPage==="readingStats")renderReadingStats();
}
function renderReadingStats(){
  const data=getDailyReading();const periods=getPeriodReading();
  const ayahCount=data.ayahs.length;const surahCount=data.surahs.length;
  const target=Math.max(1,Math.min(604,Number(data.target)||20));
  const percent=Math.min(100,Math.round(ayahCount/target*100));
  const ayahEl=document.getElementById("dailyAyahCount");const surahEl=document.getElementById("dailySurahCount");
  const targetInput=document.getElementById("dailyReadingTarget");const progress=document.getElementById("dailyReadingProgress");const progressText=document.getElementById("dailyReadingProgressText");
  if(ayahEl)ayahEl.textContent=String(ayahCount);if(surahEl)surahEl.textContent=String(surahCount);
  if(targetInput){targetInput.value=String(target);if(!targetInput.dataset.ready){targetInput.addEventListener("change",()=>{const next=getDailyReading();next.target=Math.max(1,Math.min(604,Number(targetInput.value)||20));saveDailyReading(next);renderReadingStats();});targetInput.dataset.ready="1";}}
  if(progress)progress.style.width=percent+"%";
  if(progressText)progressText.textContent=ayahCount>=target?"Günlük hedefine ulaştın. Maşallah!":ayahCount+" / "+target+" ayet · %"+percent;
  [["week","weeklyReadingTarget","weeklyAyahCount","weeklyReadingProgress","weeklyReadingProgressText",604,"Haftalık"],["month","monthlyReadingTarget","monthlyAyahCount","monthlyReadingProgress","monthlyReadingProgressText",604,"Aylık"]].forEach(([period,inputId,countId,barId,textId,max])=>{
    const record=periods[period];const count=record.ayahs.length;const goal=Math.max(1,Math.min(max,Number(record.target)||1));const pct=Math.min(100,Math.round(count/goal*100));
    const input=document.getElementById(inputId);const countNode=document.getElementById(countId);const bar=document.getElementById(barId);const label=document.getElementById(textId);
    if(countNode)countNode.textContent=String(count);
    if(input){input.value=String(goal);if(!input.dataset.ready){input.addEventListener("change",()=>{const next=getPeriodReading();next[period].target=Math.max(1,Math.min(604,Number(input.value)||1));savePeriodReading(next);renderReadingStats();});input.dataset.ready="1";}}
    if(bar)bar.style.width=pct+"%";
    if(label)label.textContent=count>=goal?(period==="week"?"Haftalık":"Aylık")+" hedefin tamamlandı. Maşallah!":count+" / "+goal+" ayet · %"+pct;
  });
}
function renderLastRead(){const panel=document.getElementById("lastReadPanel");let saved=null;try{saved=JSON.parse(localStorage.getItem("quran-last-read")||"null");}catch{}panel.replaceChildren();if(!saved){const h=document.createElement("h2");h.textContent="Henüz kayıt yok";const p=document.createElement("p");p.textContent="Bir sure açtığında son okuduğun sure burada görünür.";panel.append(h,p);return;}const h=document.createElement("h2");h.textContent=saved.name;const p=document.createElement("p");p.textContent=saved.ayah+". ayette kaldın";const b=document.createElement("button");b.className="gold-button";b.textContent="Okumaya devam et";b.addEventListener("click",()=>{showPage("quran");loadSurah(saved.number,saved.ayah||1);});panel.append(h,p,b);}

const quranDuas=[
{ref:"2:201",name:"Dünya ve Ahiret İyiliği Duası"},
{ref:"2:127",name:"Hz. İbrahim'in Kabul Duası"},
{ref:"2:128",name:"Teslimiyet ve Tövbe Duası"},
{ref:"2:250",name:"Sabır ve Sebat Duası"},
{ref:"3:8",name:"Kalplerin Sapmaması Duası"},
{ref:"3:16",name:"Bağışlanma ve Korunma Duası"},
{ref:"7:23",name:"Hz. Âdem'in Tövbe Duası"},
{ref:"10:85-86",name:"Allah'a Sığınma ve Dayanma Duası"},
{ref:"14:40",name:"Namaz ve Nesil İçin Dua"},
{ref:"17:24",name:"Anne Babaya Merhamet Duası"},
{ref:"20:25-28",name:"Hz. Musa'nın Kolaylık Duası"},
{ref:"23:109",name:"Bağışlanma ve Merhamet Duası"},
{ref:"25:74",name:"Hayırlı Aile Duası"},
{ref:"40:7",name:"Müminler İçin Bağışlanma Duası"},
{ref:"66:8",name:"Nurun Tamamlanması Duası"}
];
const duaPicker=document.getElementById("duaPicker");
const duaPickerSummary=document.getElementById("duaPickerSummary");
const duaOptions=document.getElementById("duaOptions");
const duaReading=document.getElementById("duaReading");
quranDuas.forEach((dua,index)=>{
 const option=document.createElement("button");
 option.type="button";
 option.className="dua-option";
 option.textContent=dua.name;
 option.addEventListener("click",()=>{duaPickerSummary.innerHTML="<span>۞</span> "+dua.name;duaPicker.open=false;showDua(index);});
 duaOptions.append(option);
});
async function showDua(index){
 const dua=quranDuas[index];if(!dua)return;
 duaReading.className="dua-reading";duaReading.replaceChildren();
 const loading=document.createElement("p");loading.className="loading-state";loading.textContent="Arapça metin ve meal yükleniyor…";duaReading.append(loading);
 try{
  const match=/^(\d+):(\d+)(?:-(\d+))?$/.exec(dua.ref);
  if(!match)throw new Error("Dua ayet aralığı tanınamadı");
  const surahNo=Number(match[1]),firstAyah=Number(match[2]),lastAyah=Number(match[3]||match[2]);
  if(firstAyah<1||lastAyah<firstAyah||lastAyah-firstAyah>9)throw new Error("Dua ayet aralığı geçersiz");
  const ayahNumbers=Array.from({length:lastAyah-firstAyah+1},(_,i)=>firstAyah+i);
  const [offline,...arabicTexts]=await Promise.all([
   loadOfflineQuranData(),
   ...ayahNumbers.map(n=>getQuranAyahText(surahNo,n))
  ]);
  const mealJson={result:offline.surahs[surahNo-1]?.ayahs};
  if(!Array.isArray(mealJson.result)||arabicTexts.some(text=>typeof text!=="string"||!text.trim()))throw new Error("Ayet veya çevrimdışı meal verisi eksik");
  const meals=new Map(mealJson.result.map(item=>[Number(item.aya),item]));
  const verses=ayahNumbers.map((n,i)=>{
   const translated=meals.get(n);
   if(!arabicTexts[i]||!translated||typeof translated.translation!=="string"||!translated.translation.trim())throw new Error("Dua ayetlerinden biri tam olarak doğrulanamadı");
   return {number:n,arabic:arabicTexts[i],translation:translated.translation,footnotes:translated.footnotes||""};
  });
  duaReading.replaceChildren();
  const title=document.createElement("h2");title.className="dua-title";title.textContent=dua.name;duaReading.append(title);
  verses.forEach(verse=>{
   const block=document.createElement("section");block.className="dua-verse";
   const arabicLabel=document.createElement("div");arabicLabel.className="dua-section-label";arabicLabel.textContent="ARAPÇA · "+verse.number+". AYET";
   const arabic=document.createElement("p");arabic.className="dua-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=verse.arabic;
   const mealLabel=document.createElement("div");mealLabel.className="dua-section-label";mealLabel.textContent="TÜRKÇE MEALİ";
   const meal=document.createElement("p");meal.className="dua-meaning";meal.textContent=verse.translation;
   block.append(arabicLabel,arabic,mealLabel,meal);
   if(verse.footnotes){const details=document.createElement("details");details.className="ayah-footnotes";const summary=document.createElement("summary");summary.textContent="Açıklama ve dipnotlar";const note=document.createElement("p");note.textContent=verse.footnotes;details.append(summary,note);block.append(details);}
   duaReading.append(block);
  });
  const range=firstAyah===lastAyah?firstAyah+". ayet":firstAyah+"-"+lastAyah+". ayetler";
  const source=document.createElement("small");source.className="dua-reference";const tanzilLink=document.createElement("a");tanzilLink.href="https://tanzil.net";tanzilLink.textContent="Tanzil Project";const mealLink=document.createElement("a");mealLink.href="https://quranenc.com";mealLink.textContent="QuranEnc.com";source.append((TURKISH_SURAH_NAMES[surahNo-1]||"Kur'an")+" Suresi · "+range+" · Arapça: ",tanzilLink," Uthmani 1.1 · Meal: QuranEnc / Rowwad Translation Center / ",mealLink," · Sürüm "+MEAL_VERSION);
  duaReading.append(source);
 }catch(error){
  duaReading.replaceChildren();const msg=document.createElement("p");msg.className="error-note";
  msg.textContent="Ayetin Arapça metni veya çevrimdışı Türkçe meali yüklenemedi. Lütfen uygulama verilerinin ilk kez internet bağlantısıyla yüklenmiş olduğundan emin ol ve tekrar dene.";
  duaReading.append(msg);
 }
}

surahListPromise=loadSurahList();
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=93",{updateViaCache:"none"}).then(reg=>reg.update()).catch(()=>{}));
