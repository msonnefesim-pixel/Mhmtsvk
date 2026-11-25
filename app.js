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
const pickerEl=document.getElementById("surahPicker");
const surahSelect=document.getElementById("surahSelect");
const readingPanel=document.getElementById("readingPanel");
const searchEl=document.getElementById("surahSearch");
const quranHeading=document.querySelector("#quranPage .page-heading");
function renderSurahList(items){const current=surahSelect.value;surahSelect.replaceChildren();const first=document.createElement("option");first.value="";first.textContent=items.length===114?"Bir sure seçiniz":"Arama sonucundan sure seçiniz";surahSelect.append(first);items.forEach(s=>{const option=document.createElement("option");option.value=String(s.number);option.textContent=s.number+". "+(s.turkishName||s.englishName)+" · "+s.numberOfAyahs+" ayet";surahSelect.append(option);});surahSelect.disabled=!items.length;if(current&&items.some(s=>String(s.number)===current))surahSelect.value=current;}
const TURKISH_SURAH_NAMES=["Fâtiha","Bakara","Âl-i İmrân","Nisâ","Mâide","En'âm","A'râf","Enfâl","Tevbe","Yûnus","Hûd","Yûsuf","Ra'd","İbrâhim","Hicr","Nahl","İsrâ","Kehf","Meryem","Tâhâ","Enbiyâ","Hac","Mü'minûn","Nûr","Furkân","Şuarâ","Neml","Kasas","Ankebût","Rûm","Lokmân","Secde","Ahzâb","Sebe","Fâtır","Yâsîn","Sâffât","Sâd","Zümer","Mü'min (Gâfir)","Fussilet","Şûrâ","Zuhruf","Duhân","Câsiye","Ahkâf","Muhammed","Fetih","Hucurât","Kâf","Zâriyât","Tûr","Necm","Kamer","Rahmân","Vâkıa","Hadîd","Mücâdele","Haşr","Mümtehine","Saff","Cuma","Münâfikûn","Tegâbün","Talâk","Tahrîm","Mülk","Kalem","Hâkka","Meâric","Nûh","Cin","Müzzemmil","Müddessir","Kıyâmet","İnsan","Mürselât","Nebe","Nâziât","Abese","Tekvîr","İnfitâr","Mutaffifîn","İnşikâk","Bürûc","Târık","A'lâ","Gâşiye","Fecr","Beled","Şems","Leyl","Duhâ","İnşirâh","Tîn","Alak","Kadr","Beyyine","Zilzâl","Âdiyât","Kâria","Tekâsür","Asr","Hümeze","Fîl","Kureyş","Mâûn","Kevser","Kâfirûn","Nasr","Tebbet (Mesed)","İhlâs","Felak","Nâs"];
async function loadSurahList(){try{const response=await fetch(API+"/surah");if(!response.ok)throw new Error("HTTP "+response.status);const json=await response.json();if(json.code!==200||!Array.isArray(json.data))throw new Error("Geçersiz sure verisi");surahs=json.data.map(s=>({...s,turkishName:TURKISH_SURAH_NAMES[s.number-1]||s.englishName}));renderSurahList(surahs);}catch(error){surahSelect.replaceChildren();const option=document.createElement("option");option.value="";option.textContent="Sure listesi yüklenemedi";surahSelect.append(option);surahSelect.disabled=true;}}
async function loadSurah(number,restoreAyah=null){pickerEl.hidden=true;quranHeading.hidden=true;readingPanel.hidden=false;window.scrollTo({top:0,behavior:"instant"});document.getElementById("surahTitle").textContent="Sure yükleniyor…";const ayahList=document.getElementById("ayahList");ayahList.replaceChildren();if(ayahObserver)ayahObserver.disconnect();try{const [ar,me]=await Promise.all([fetch(API+"/surah/"+number+"/quran-uthmani"),fetch(MEAL_API+"/translation/sura/"+MEAL_KEY+"/"+number)]);if(!ar.ok||!me.ok)throw new Error("Sure içeriği yüklenemedi");const [aj,mj]=await Promise.all([ar.json(),me.json()]);if(aj.code!==200||!aj.data||!Array.isArray(mj.result))throw new Error("Sure verisi eksik");const s=aj.data;const selected=surahs.find(x=>x.number===number);const title=document.createElement("h2");title.textContent=selected?.turkishName||s.englishName;const sub=document.createElement("p");sub.textContent=s.numberOfAyahs+" ayet";document.getElementById("surahTitle").replaceChildren(title,sub);const meals=new Map(mj.result.map(x=>[Number(x.aya),x]));s.ayahs.forEach(a=>{const card=document.createElement("article");card.className="ayah-card";card.id="ayah-"+a.numberInSurah;card.dataset.ayah=a.numberInSurah;const top=document.createElement("div");top.className="ayah-number";top.textContent="۞  "+a.numberInSurah+". Ayet";const arabic=document.createElement("p");arabic.className="ayah-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=a.text;const meal=meals.get(a.numberInSurah);const meaning=document.createElement("p");meaning.className="ayah-meaning";meaning.textContent=meal?.translation||"Bu ayetin meali şu anda yüklenemedi.";card.append(top,arabic,meaning);if(meal?.footnotes){const details=document.createElement("details");details.className="ayah-footnotes";const summary=document.createElement("summary");summary.textContent="Açıklama ve dipnotlar";const note=document.createElement("p");note.textContent=meal.footnotes;details.append(summary,note);card.append(details);}ayahList.append(card);});const credit=document.createElement("p");credit.className="source-note";credit.textContent="Arapça: AlQuran Cloud · Türkçe meal: Rowwad Translation Center / QuranEnc.com · Sürüm "+MEAL_VERSION;ayahList.append(credit);localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah:restoreAyah||1}));ayahObserver=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v){const ayah=Number(v.target.dataset.ayah);localStorage.setItem("quran-last-read",JSON.stringify({number:s.number,name:selected?.turkishName||s.englishName,arabicName:s.name,ayah}));}},{rootMargin:"-20% 0px -55% 0px",threshold:[0,.25,.5]});ayahList.querySelectorAll(".ayah-card").forEach(card=>ayahObserver.observe(card));if(restoreAyah)setTimeout(()=>document.getElementById("ayah-"+restoreAyah)?.scrollIntoView({behavior:"instant",block:"start"}),120);else window.scrollTo({top:0,behavior:"instant"});}catch(error){document.getElementById("surahTitle").textContent="Sure yüklenemedi";const msg=document.createElement("p");msg.className="error-note";msg.textContent="Arapça metin veya meal yüklenemedi. İnternet bağlantını kontrol edip yeniden dene.";ayahList.append(msg);}}
function setAyahFont(delta){const size=Math.max(22,Math.min(42,Number(localStorage.getItem("quran-font-size")||30)+delta));document.documentElement.style.setProperty("--ayah-font-size",size+"px");localStorage.setItem("quran-font-size",String(size));}
document.getElementById("fontSmaller").addEventListener("click",()=>setAyahFont(-2));document.getElementById("fontLarger").addEventListener("click",()=>setAyahFont(2));setAyahFont(0);
document.getElementById("previousSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number>1)loadSurah(x.number-1);});
document.getElementById("nextSurah").addEventListener("click",()=>{const x=JSON.parse(localStorage.getItem("quran-last-read")||"null");if(x&&x.number<114)loadSurah(x.number+1);});
document.getElementById("backToSurahs").addEventListener("click",()=>{readingPanel.hidden=true;pickerEl.hidden=false;quranHeading.hidden=false;surahSelect.value="";window.scrollTo({top:0,behavior:"instant"});});
surahSelect.addEventListener("change",()=>{const number=Number(surahSelect.value);if(number)loadSurah(number);});
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
 const dua=quranDuas[index];
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
 }catch(error){duaReading.replaceChildren();const msg=document.createElement("p");msg.className="error-note";msg.textContent="Dua şu anda yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.";duaReading.append(msg);}
}

loadSurahList();
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));

// Esma-ül Hüsna listesi: Arapça yazılış, Türkçe okunuş ve kısa anlam
const esmaList=[["اللّٰهُ","Allah","Tek ilah, bütün güzel isimlerin sahibi"],["الرَّحْمَٰنُ","Er-Rahmân","Rahmeti bütün varlıkları kuşatan"],["الرَّحِيمُ","Er-Rahîm","Çok merhamet eden"],["الْمَلِكُ","El-Melik","Mülkün ve hükümranlığın sahibi"],["الْقُدُّوسُ","El-Kuddûs","Her türlü eksiklikten uzak olan"],["السَّلَامُ","Es-Selâm","Esenlik ve güven veren"],["الْمُؤْمِنُ","El-Mü'min","Güven veren, emniyete kavuşturan"],["الْمُهَيْمِنُ","El-Müheymin","Gözetip koruyan"],["الْعَزِيزُ","El-Azîz","Mutlak güç ve izzet sahibi"],["الْجَبَّارُ","El-Cebbâr","Dilediğini yaptıran, eksikleri gideren"],["الْمُتَكَبِّرُ","El-Mütekebbir","Büyüklükte eşi olmayan"],["الْخَالِقُ","El-Hâlık","Her şeyi yaratan"],["الْبَارِئُ","El-Bâri'","Varlıkları örneksiz ve uyumlu yaratan"],["الْمُصَوِّرُ","El-Musavvir","Varlıklara şekil veren"],["الْغَفَّارُ","El-Gaffâr","Günahları çokça bağışlayan"],["الْقَهَّارُ","El-Kahhâr","Her şeye üstün ve galip olan"],["الْوَهَّابُ","El-Vehhâb","Karşılıksız nimetler veren"],["الرَّزَّاقُ","Er-Rezzâk","Bütün canlıların rızkını veren"],["الْفَتَّاحُ","El-Fettâh","Hayır kapılarını açan, hüküm veren"],["الْعَلِيمُ","El-Alîm","Her şeyi hakkıyla bilen"],["الْقَابِضُ","El-Kâbıd","Dilediğinde daraltan"],["الْبَاسِطُ","El-Bâsıt","Dilediğinde genişleten"],["الْخَافِضُ","El-Hâfıd","Dilediğini alçaltan"],["الرَّافِعُ","Er-Râfi'","Dilediğini yükselten"],["الْمُعِزُّ","El-Muizz","İzzet ve şeref veren"],["الْمُذِلُّ","El-Müzill","Dilediğini zelil kılan"],["السَّمِيعُ","Es-Semî'","Her şeyi işiten"],["الْبَصِيرُ","El-Basîr","Her şeyi gören"],["الْحَكَمُ","El-Hakem","Mutlak hüküm sahibi"],["الْعَدْلُ","El-Adl","Mutlak adalet sahibi"],["اللَّطِيفُ","El-Latîf","Lütfu ince ve her şeye ulaşan"],["الْخَبِيرُ","El-Habîr","Her şeyin iç yüzünden haberdar"],["الْحَلِيمُ","El-Halîm","Cezada acele etmeyen"],["الْعَظِيمُ","El-Azîm","Pek yüce ve büyük olan"],["الْغَفُورُ","El-Gafûr","Bağışlaması bol olan"],["الشَّكُورُ","Eş-Şekûr","Az amele çok karşılık veren"],["الْعَلِيُّ","El-Aliyy","Yüceler yücesi"],["الْكَبِيرُ","El-Kebîr","Büyüklüğü sınırsız olan"],["الْحَفِيظُ","El-Hafîz","Her şeyi koruyup gözeten"],["الْمُقِيتُ","El-Mukît","Her canlıya rızık ve güç veren"],["الْحَسِيبُ","El-Hasîb","Hesap gören, kullarına yeten"],["الْجَلِيلُ","El-Celîl","Ululuk ve azamet sahibi"],["الْكَرِيمُ","El-Kerîm","Cömertliği bol olan"],["الرَّقِيبُ","Er-Rakîb","Her şeyi gözetleyen"],["الْمُجِيبُ","El-Mücîb","Dualara karşılık veren"],["الْوَاسِعُ","El-Vâsi'","Rahmeti ve ilmi geniş olan"],["الْحَكِيمُ","El-Hakîm","Her işi hikmetli olan"],["الْوَدُودُ","El-Vedûd","Kullarını seven ve sevilmeye layık olan"],["الْمَجِيدُ","El-Mecîd","Şanı ve keremi yüce olan"],["الْبَاعِثُ","El-Bâis","Ölüleri diriltip kaldıran"],["الشَّهِيدُ","Eş-Şehîd","Her şeye şahit olan"],["الْحَقُّ","El-Hakk","Varlığı ve sözü gerçek olan"],["الْوَكِيلُ","El-Vekîl","Kendisine güvenilip dayanılan"],["الْقَوِيُّ","El-Kaviyy","Kuvveti sonsuz olan"],["الْمَتِينُ","El-Metîn","Gücü ve kudreti sarsılmaz olan"],["الْوَلِيُّ","El-Veliyy","İnananların dostu ve yardımcısı"],["الْحَمِيدُ","El-Hamîd","Övgüye layık olan"],["الْمُحْصِي","El-Muhsî","Her şeyi tek tek bilen ve sayan"],["الْمُبْدِئُ","El-Mübdi'","Yaratmayı ilk başlatan"],["الْمُعِيدُ","El-Muîd","Yaratmayı yeniden gerçekleştiren"],["الْمُحْيِي","El-Muhyî","Hayat veren"],["الْمُمِيتُ","El-Mümît","Ölümü yaratan"],["الْحَيُّ","El-Hayy","Daima diri olan"],["الْقَيُّومُ","El-Kayyûm","Her şeyi ayakta tutan"],["الْوَاجِدُ","El-Vâcid","Hiçbir şeye muhtaç olmayan"],["الْمَاجِدُ","El-Mâcid","Şanı, keremi ve cömertliği yüce olan"],["الْوَاحِدُ","El-Vâhid","Tek ve bir olan"],["الصَّمَدُ","Es-Samed","Her şeyin kendisine muhtaç olduğu"],["الْقَادِرُ","El-Kâdir","Her şeye gücü yeten"],["الْمُقْتَدِرُ","El-Muktedir","Kudreti her şeye üstün olan"],["الْمُقَدِّمُ","El-Mukaddim","Dilediğini öne alan"],["الْمُؤَخِّرُ","El-Muahhir","Dilediğini geriye bırakan"],["الْأَوَّلُ","El-Evvel","Başlangıcı olmayan"],["الْآخِرُ","El-Âhir","Sonu olmayan"],["الظَّاهِرُ","Ez-Zâhir","Varlığı apaçık olan"],["الْبَاطِنُ","El-Bâtın","Mahiyeti duyularla kavranamayan"],["الْوَالِي","El-Vâlî","Kâinatı yöneten"],["الْمُتَعَالِي","El-Müteâlî","Her şeyden yüce olan"],["الْبَرُّ","El-Berr","İyiliği ve ihsanı bol olan"],["التَّوَّابُ","Et-Tevvâb","Tövbeleri kabul eden"],["الْمُنْتَقِمُ","El-Müntekim","Adaletiyle suçluları cezalandıran"],["الْعَفُوُّ","El-Afüvv","Günahları silip affeden"],["الرَّؤُوفُ","Er-Raûf","Çok şefkatli olan"],["مَالِكُ الْمُلْكِ","Mâlikü'l-Mülk","Mülkün gerçek sahibi"],["ذُو الْجَلَالِ وَالْإِكْرَامِ","Zü'l-Celâli ve'l-İkrâm","Celâl ve ikram sahibi"],["الْمُقْسِطُ","El-Muksit","Adaletle hükmeden"],["الْجَامِعُ","El-Câmi'","Dilediğini bir araya getiren"],["الْغَنِيُّ","El-Ganiyy","Hiçbir şeye muhtaç olmayan"],["الْمُغْنِي","El-Muğnî","Zengin kılan, ihtiyaçları gideren"],["الْمَانِعُ","El-Mâni'","Dilediğine engel olan, koruyan"],["الضَّارُّ","Ed-Dârr","Hikmetiyle darlık ve zarar yaratan"],["النَّافِعُ","En-Nâfi'","Fayda veren"],["النُّورُ","En-Nûr","Âlemleri aydınlatan"],["الْهَادِي","El-Hâdî","Doğru yola ileten"],["الْبَدِيعُ","El-Bedî'","Eşi ve örneği olmadan yaratan"],["الْبَاقِي","El-Bâkî","Varlığının sonu olmayan"],["الْوَارِثُ","El-Vâris","Her şeyin gerçek sahibi olarak kalan"],["الرَّشِيدُ","Er-Reşîd","Doğru yolu gösteren"],["الصَّبُورُ","Es-Sabûr","Çok sabırlı olan"]];
const namesGrid=document.getElementById("namesGrid");
const namesSearch=document.getElementById("namesSearch");
const namesResultCount=document.getElementById("namesResultCount");
function renderEsma(query=""){
 const q=query.trim().toLocaleLowerCase("tr");
 const filtered=esmaList.filter(item=>!q||item[1].toLocaleLowerCase("tr").includes(q)||item[2].toLocaleLowerCase("tr").includes(q));
 namesGrid.replaceChildren();
 filtered.forEach(item=>{
  const card=document.createElement("article");card.className="esma-card";
  const number=document.createElement("span");number.className="esma-number";number.textContent=String(esmaList.indexOf(item)+1).padStart(2,"0");
  const arabic=document.createElement("div");arabic.className="esma-arabic";arabic.dir="rtl";arabic.lang="ar";arabic.textContent=item[0];
  const name=document.createElement("h2");name.className="esma-name";name.textContent=item[1];
  const meaning=document.createElement("p");meaning.className="esma-meaning";meaning.textContent=item[2];
  card.append(number,arabic,name,meaning);namesGrid.append(card);
 });
 namesResultCount.textContent=filtered.length+" isim listeleniyor";
 if(!filtered.length){const empty=document.createElement("p");empty.className="names-empty";empty.textContent="Bu aramayla eşleşen isim bulunamadı.";namesGrid.append(empty);}
}
namesSearch.addEventListener("input",()=>renderEsma(namesSearch.value));
renderEsma();
