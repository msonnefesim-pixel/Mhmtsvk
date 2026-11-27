const INSPIRATION_DATA_VERSION="3.0";
const INSPIRATION_ITEMS=[
{id:"h1",type:"hadith",title:"Ameller niyetlere göredir",text:"Ameller niyetlere göredir. Herkes ancak niyet ettiğinin karşılığını alır.",source:"Buhârî 1 · Müslim 1907a"},
{id:"h2",type:"hadith",title:"Kolaylaştırın",text:"Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz.",source:"Buhârî, İlim, 69 · Müslim, Cihâd, 1732"},
{id:"h3",type:"hadith",title:"Kur’an’ı öğrenmek",text:"Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.",source:"Buhârî, Fedâilü’l-Kur’ân, 5027"},
{id:"h4",type:"hadith",title:"Güzel söz",text:"Güzel söz sadakadır.",source:"Buhârî, 2989 · Müslim, 1009"},
{id:"a1",type:"ayah",title:"İnşirah Suresi · 5-6",text:"",source:"Kur’an-ı Kerim · İnşirah Suresi, 5-6. ayetler",ayahRef:{surah:94,ayahs:[5,6]}},
{id:"a2",type:"ayah",title:"Ra’d Suresi · 28",text:"",source:"Kur’an-ı Kerim · Ra’d Suresi, 28. ayet",ayahRef:{surah:13,ayahs:[28]}},
{id:"a3",type:"ayah",title:"Bakara Suresi · 286",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 286. ayet",ayahRef:{surah:2,ayahs:[286]}},
{id:"a4",type:"ayah",title:"Zümer Suresi · 53",text:"",source:"Kur’an-ı Kerim · Zümer Suresi, 53. ayet",ayahRef:{surah:39,ayahs:[53]}}
,{id:"h5",type:"hadith",title:"Güzel konuşmak",text:"Allah’a ve ahiret gününe iman eden ya hayır söylesin ya da sussun.",source:"Buhârî, Edeb, 31 · Müslim, Îmân, 47"}
,{id:"h6",type:"hadith",title:"Merhamet",text:"Merhamet etmeyene merhamet olunmaz.",source:"Buhârî, Edeb, 18 · Müslim, Fedâil, 66"}
,{id:"h7",type:"hadith",title:"Güzel ahlak",text:"Müminlerin iman bakımından en olgunu, ahlakı en güzel olanıdır.",source:"Tirmizî, Radâ, 11"}
,{id:"h8",type:"hadith",title:"Kardeşlik",text:"Sizden biri, kendisi için istediğini kardeşi için de istemedikçe gerçek anlamda iman etmiş olmaz.",source:"Buhârî, Îmân, 7 · Müslim, Îmân, 71"}
,{id:"h9",type:"hadith",title:"Kolaylık ve temizlik",text:"Temizlik imanın yarısıdır.",source:"Müslim, Tahâret, 1"}
,{id:"h10",type:"hadith",title:"Gülümsemek",text:"Kardeşine tebessüm etmen senin için sadakadır.",source:"Tirmizî, Birr, 36"}
,{id:"h11",type:"hadith",title:"Yardımlaşmak",text:"Kim bir müminin dünya sıkıntılarından birini giderirse Allah da onun kıyamet sıkıntılarından birini giderir.",source:"Müslim, Zikir, 38"}
,{id:"h12",type:"hadith",title:"Güçlü olmak",text:"Güçlü kimse, güreşte rakibini yenen değil; öfkelendiğinde kendisine hâkim olandır.",source:"Buhârî, Edeb, 76 · Müslim, Birr, 107"}
,{id:"h13",type:"hadith",title:"İyiliğe vesile olmak",text:"Kim bir hayra vesile olursa, o hayrı yapanın sevabı gibi sevap alır.",source:"Müslim, İmâre, 133"}
,{id:"h14",type:"hadith",title:"Dinde nasihat",text:"Din nasihattir.",source:"Müslim, Îmân, 95"}
,{id:"h15",type:"hadith",title:"Güzellik",text:"Allah güzeldir, güzelliği sever.",source:"Müslim, Îmân, 147"}
,{id:"h16",type:"hadith",title:"Allah’ın yardımı",text:"Kul, kardeşinin yardımında olduğu sürece Allah da onun yardımındadır.",source:"Müslim, Zikir, 38"}
,{id:"a5",type:"ayah",title:"Bakara Suresi · 153",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 153. ayet",ayahRef:{surah:2,ayahs:[153]}}
,{id:"a6",type:"ayah",title:"Bakara Suresi · 186",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 186. ayet",ayahRef:{surah:2,ayahs:[186]}}
,{id:"a7",type:"ayah",title:"Âl-i İmrân Suresi · 139",text:"",source:"Kur’an-ı Kerim · Âl-i İmrân Suresi, 139. ayet",ayahRef:{surah:3,ayahs:[139]}}
,{id:"a8",type:"ayah",title:"Âl-i İmrân Suresi · 173",text:"",source:"Kur’an-ı Kerim · Âl-i İmrân Suresi, 173. ayet",ayahRef:{surah:3,ayahs:[173]}}
,{id:"a9",type:"ayah",title:"İbrâhîm Suresi · 7",text:"",source:"Kur’an-ı Kerim · İbrâhîm Suresi, 7. ayet",ayahRef:{surah:14,ayahs:[7]}}
,{id:"a10",type:"ayah",title:"Tevbe Suresi · 51",text:"",source:"Kur’an-ı Kerim · Tevbe Suresi, 51. ayet",ayahRef:{surah:9,ayahs:[51]}}
,{id:"a11",type:"ayah",title:"Ankebût Suresi · 69",text:"",source:"Kur’an-ı Kerim · Ankebût Suresi, 69. ayet",ayahRef:{surah:29,ayahs:[69]}}
,{id:"a12",type:"ayah",title:"Talâk Suresi · 2-3",text:"",source:"Kur’an-ı Kerim · Talâk Suresi, 2-3. ayetler",ayahRef:{surah:65,ayahs:[2,3]}}
,{id:"a13",type:"ayah",title:"Zümer Suresi · 10",text:"",source:"Kur’an-ı Kerim · Zümer Suresi, 10. ayet",ayahRef:{surah:39,ayahs:[10]}}
,{id:"a14",type:"ayah",title:"Hadîd Suresi · 4",text:"",source:"Kur’an-ı Kerim · Hadîd Suresi, 4. ayet",ayahRef:{surah:57,ayahs:[4]}}
,{id:"a15",type:"ayah",title:"İnşirâh Suresi · 7-8",text:"",source:"Kur’an-ı Kerim · İnşirâh Suresi, 7-8. ayetler",ayahRef:{surah:94,ayahs:[7,8]}}
,{id:"a16",type:"ayah",title:"Bakara Suresi · 152",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 152. ayet",ayahRef:{surah:2,ayahs:[152]}},
{id:"g1",type:"reflection",title:"Güzel düşün, güzel yaşa",text:"Güzel düşünceler kalbine umut, güzel davranışlar hayatına huzur taşır.",source:"Gönle dokunan güzel söz"},
{id:"g2",type:"reflection",title:"Bir gönül kazan",text:"Bazen bir gönül almak, uzun uzun anlatmaktan çok daha kıymetlidir.",source:"Gönle dokunan güzel söz"},
{id:"g3",type:"reflection",title:"Sabırla bekle",text:"Her şeyin bir vakti var. Sabır, umudunu kaybetmeden bekleyebilmektir.",source:"Gönle dokunan güzel söz"},
{id:"g4",type:"reflection",title:"Küçük iyilikler",text:"Küçük bir iyilik, hiç ummadığın bir kalpte büyük bir iz bırakabilir.",source:"Gönle dokunan güzel söz"},
{id:"g5",type:"reflection",title:"Kalp kırma",text:"Sözünü söylemeden önce düşün; bazı yaralar görünmez ama uzun süre sızlar.",source:"Gönle dokunan güzel söz"},
{id:"g6",type:"reflection",title:"Gülümsemeyi unutma",text:"Bir tebessüm, karanlık bir günün içine düşen küçük bir ışık olabilir.",source:"Gönle dokunan güzel söz"},
{id:"g7",type:"reflection",title:"Güzel iz bırak",text:"İnsan geride bıraktığı eşyayla değil, dokunduğu gönüllerle hatırlanır.",source:"Gönle dokunan güzel söz"},
{id:"g8",type:"reflection",title:"Huzurun yolu",text:"Huzur, her şeye sahip olmakta değil; sahip olduklarının kıymetini bilmektir.",source:"Gönle dokunan güzel söz"},
{id:"g9",type:"reflection",title:"İyilikten vazgeçme",text:"İyilik bazen karşılık bulmaz; ama insanın kendi kalbini güzelleştirir.",source:"Gönle dokunan güzel söz"},
{id:"g10",type:"reflection",title:"Her gün yeni umut",text:"Dün ne yaşandıysa yaşandı. Bugün yeniden güzel bir başlangıç yapabilirsin.",source:"Gönle dokunan güzel söz"},
{id:"g11",type:"reflection",title:"Gönül dili",text:"Kalbe ulaşan en kısa yol, samimiyetle söylenmiş güzel bir sözdür.",source:"Gönle dokunan güzel söz"},
{id:"g12",type:"reflection",title:"Vefa kıymetlidir",text:"Zor gününde yanında olanı unutma; vefa, sevginin en sessiz hâlidir.",source:"Gönle dokunan güzel söz"},
{id:"g13",type:"reflection",title:"Dinlemeyi bil",text:"Bazen bir insanın ihtiyacı öğüt değil, onu gerçekten dinleyen bir kalptir.",source:"Gönle dokunan güzel söz"},
{id:"g14",type:"reflection",title:"Kırgınlığı büyütme",text:"Kırgınlıkları içinde taşımak yorucudur; mümkünse konuş, anlamaya çalış ve hafifle.",source:"Gönle dokunan güzel söz"},
{id:"g15",type:"reflection",title:"Güzel niyet",text:"Niyetin güzel, gayretin samimi olsun; gerisini zamanın akışına bırak.",source:"Gönle dokunan güzel söz"},
{id:"g16",type:"reflection",title:"Umut ışığı",text:"En uzun gecenin bile sabahı vardır. Umudunu küçük bir ışık gibi koru.",source:"Gönle dokunan güzel söz"},
{id:"g17",type:"reflection",title:"Paylaşmanın güzelliği",text:"Paylaşılan sevinç çoğalır, paylaşılan yük hafifler.",source:"Gönle dokunan güzel söz"},
{id:"g18",type:"reflection",title:"Sevgi emektir",text:"Sevgi yalnızca sözle değil; anlayışla, sabırla ve emekle büyür.",source:"Gönle dokunan güzel söz"},
{id:"g19",type:"reflection",title:"Kendine de merhamet et",text:"Herkese gösterdiğin anlayıştan birazını kendine de göster.",source:"Gönle dokunan güzel söz"},
{id:"g20",type:"reflection",title:"Güzel sözün gücü",text:"Bir güzel söz, bazen bir insanın bütün gününü değiştirebilir.",source:"Gönle dokunan güzel söz"},
{id:"g21",type:"reflection",title:"Azla mutlu ol",text:"Mutluluk her zaman fazlasında değil, elindekine şükredebilmekte saklıdır.",source:"Gönle dokunan güzel söz"},
{id:"g22",type:"reflection",title:"Dostluk",text:"Gerçek dost, yalnızca güzel gününde değil, sessiz kaldığın günlerde de yanındadır.",source:"Gönle dokunan güzel söz"},
{id:"g23",type:"reflection",title:"Zamanın kıymeti",text:"Zamanını seni iyiliğe ve huzura yaklaştıran şeylere ayır.",source:"Gönle dokunan güzel söz"},
{id:"g24",type:"reflection",title:"İçtenlik",text:"Gösterişsiz bir iyilik, samimiyetsiz bin güzel sözden daha değerlidir.",source:"Gönle dokunan güzel söz"},
{id:"g25",type:"reflection",title:"Affetmenin hafifliği",text:"Affetmek her şeyi unutmak değil, kalbini yüklerden kurtarmaya çalışmaktır.",source:"Gönle dokunan güzel söz"},
{id:"g26",type:"reflection",title:"Gönül yorgunluğu",text:"Yorulduğunda biraz dinlen; vazgeçmek zorunda değilsin.",source:"Gönle dokunan güzel söz"},
{id:"g27",type:"reflection",title:"Güzel bakış",text:"Hayata umutla bakınca her şey değişmez belki, ama içindeki güç değişir.",source:"Gönle dokunan güzel söz"},
{id:"g28",type:"reflection",title:"İnsanlık",text:"İnsan olmanın güzelliği, başkasının derdini de kendi kalbinle hissedebilmektir.",source:"Gönle dokunan güzel söz"},
{id:"g29",type:"reflection",title:"Sessiz iyilik",text:"Kimsenin görmediği yerde yapılan iyilik de değerlidir.",source:"Gönle dokunan güzel söz"},
{id:"g30",type:"reflection",title:"Bir adım yeter",text:"Bazen güzel bir değişim, atılan küçücük bir adımla başlar.",source:"Gönle dokunan güzel söz"},
{id:"g31",type:"reflection",title:"Söz ve davranış",text:"Güzel söz söylemek kıymetlidir; o sözü davranışla yaşatmak daha kıymetlidir.",source:"Gönle dokunan güzel söz"},
{id:"g32",type:"reflection",title:"Gönül zenginliği",text:"Gönlü zengin insan, elindekini paylaşırken eksilmekten korkmaz.",source:"Gönle dokunan güzel söz"},
{id:"g33",type:"reflection",title:"Huzurlu akşam",text:"Günün sonunda kalbinde kırgınlık değil, şükredecek bir güzellik kalsın.",source:"Gönle dokunan güzel söz"},
{id:"g34",type:"reflection",title:"Sevdiklerini ara",text:"Bir sesini duymak isteyenleri erteleme; bazen aramak en güzel hediyedir.",source:"Gönle dokunan güzel söz"},
{id:"g35",type:"reflection",title:"Anlayış",text:"Herkesin anlatmadığı bir hikâyesi vardır. Yargılamadan önce anlamaya çalış.",source:"Gönle dokunan güzel söz"},
{id:"g36",type:"reflection",title:"Güzel başlangıç",text:"Geçmişin yükünü azalt, bugünün güzelliğine yer aç.",source:"Gönle dokunan güzel söz"},
{id:"g37",type:"reflection",title:"Sabır ve emek",text:"Güzel sonuçlar çoğu zaman sabırla verilen emeğin ardından gelir.",source:"Gönle dokunan güzel söz"},
{id:"g38",type:"reflection",title:"Kalbini temiz tut",text:"Kalbinde iyiliğe yer aç; kin ve öfke en çok taşıyanı yorar.",source:"Gönle dokunan güzel söz"},
{id:"g39",type:"reflection",title:"İyiliği çoğalt",text:"Bir iyiliği başlat; belki de başka güzelliklere vesile olursun.",source:"Gönle dokunan güzel söz"},
{id:"g40",type:"reflection",title:"Kıymet bilmek",text:"Yanında olanların kıymetini, uzaklaşmalarını beklemeden bil.",source:"Gönle dokunan güzel söz"},
{id:"g41",type:"reflection",title:"Güzel hatıralar",text:"İnsanların kalbinde güzel hatıralar bırakmak, en değerli miraslardan biridir.",source:"Gönle dokunan güzel söz"},
{id:"g42",type:"reflection",title:"Kendine inan",text:"Bugün zorlanıyor olman, yarın başaramayacağın anlamına gelmez.",source:"Gönle dokunan güzel söz"},
{id:"g43",type:"reflection",title:"Sakin kal",text:"Her sorunun cevabı hemen bulunmaz. Bazen sakinlik, en doğru başlangıçtır.",source:"Gönle dokunan güzel söz"},
{id:"g44",type:"reflection",title:"İnce düşünce",text:"İncelik, kimsenin fark etmediği küçük ayrıntılarda kendini gösterir.",source:"Gönle dokunan güzel söz"},
{id:"g45",type:"reflection",title:"Birlikte güçlüyüz",text:"Sevinci paylaşan, zorluğu birlikte göğüsleyen insanlar daha güçlü bağ kurar.",source:"Gönle dokunan güzel söz"},
{id:"g46",type:"reflection",title:"İyi ki varsın",text:"Bazen bir insana iyi ki varsın demek, ona verilebilecek en güzel hediyedir.",source:"Gönle dokunan güzel söz"},
{id:"g47",type:"reflection",title:"Güzel kal",text:"Dünya her zaman nazik olmayabilir; sen yine de kalbindeki güzelliği koru.",source:"Gönle dokunan güzel söz"},
{id:"g48",type:"reflection",title:"Yol arkadaşlığı",text:"Aynı yolda yürümek kadar, birbirinin yükünü hafifletmek de önemlidir.",source:"Gönle dokunan güzel söz"},
{id:"g49",type:"reflection",title:"Küçük mutluluklar",text:"Bir fincan çay, içten bir sohbet, huzurlu bir an… Mutluluk bazen çok yakındadır.",source:"Gönle dokunan güzel söz"},
{id:"g50",type:"reflection",title:"İç huzur",text:"Başkalarının beklentileri arasında kendi kalbinin sesini kaybetme.",source:"Gönle dokunan güzel söz"},
{id:"g51",type:"reflection",title:"Gönül almak",text:"Haklı çıkmaktan daha değerli olan bazen bir gönlü incitmemektir.",source:"Gönle dokunan güzel söz"},
{id:"g52",type:"reflection",title:"İyilik bulaşıcıdır",text:"Güzel bir davranış, gören başka bir kalbe de iyilik ilhamı verebilir.",source:"Gönle dokunan güzel söz"},
{id:"g53",type:"reflection",title:"Yarınlara umut",text:"Bugün elinden geleni yap; yarına umutla bak.",source:"Gönle dokunan güzel söz"},
{id:"g54",type:"reflection",title:"Şükür",text:"Sahip olduklarını fark etmek, kalbine huzur veren güzel bir alışkanlıktır.",source:"Gönle dokunan güzel söz"},
{id:"g55",type:"reflection",title:"Güven",text:"Güven, büyük sözlerle değil; tutarlı ve içten davranışlarla kurulur.",source:"Gönle dokunan güzel söz"},
{id:"g56",type:"reflection",title:"Sevgiyle yaklaş",text:"Bir insana nasıl davrandığın, ona kendini nasıl hissettirdiğini belirler.",source:"Gönle dokunan güzel söz"},
{id:"g57",type:"reflection",title:"Kalbin yorulmasın",text:"Her şeyi tek başına çözmek zorunda değilsin; gerektiğinde destek istemek de güçtür.",source:"Gönle dokunan güzel söz"},
{id:"g58",type:"reflection",title:"Güzel düşünce",text:"Bir insanın kusurunu aramak yerine güzelliğini görmek, gönlü genişletir.",source:"Gönle dokunan güzel söz"},
{id:"g59",type:"reflection",title:"Dua ve umut",text:"İçinden geçen güzel dilekleri umutla taşı; hayırlı olanı istemekten vazgeçme.",source:"Gönle dokunan güzel söz"},
{id:"g60",type:"reflection",title:"İyi niyetli ol",text:"İyi niyet her kapıyı açmayabilir; ama insanın kendi yolunu aydınlatır.",source:"Gönle dokunan güzel söz"},
{id:"g61",type:"reflection",title:"Vakit ayır",text:"Sevdiklerine ayırdığın zaman, onlara verdiğin değerin en güzel göstergesidir.",source:"Gönle dokunan güzel söz"},
{id:"g62",type:"reflection",title:"Huzura yer aç",text:"Gereksiz telaşı azalt, kalbine iyi gelen güzelliklere biraz daha yer aç.",source:"Gönle dokunan güzel söz"},
{id:"g63",type:"reflection",title:"Gönülden teşekkür",text:"Teşekkür etmeyi bilmek, küçük güzellikleri büyük mutluluklara dönüştürür.",source:"Gönle dokunan güzel söz"},
{id:"g64",type:"reflection",title:"Umut ver",text:"Birinin umudunu artırabiliyorsan, dünyayı güzelleştiren bir iş yapıyorsun demektir.",source:"Gönle dokunan güzel söz"},
{id:"g65",type:"reflection",title:"Güzel ahenk",text:"Saygı, sevgi ve anlayış bir araya gelince en güzel ilişkiler doğar.",source:"Gönle dokunan güzel söz"},
{id:"g66",type:"reflection",title:"Her şey geçer",text:"Zor zamanlar kalıcı değildir; kendine zaman tanı ve umudunu koru.",source:"Gönle dokunan güzel söz"},
{id:"g67",type:"reflection",title:"Kalpten kalbe",text:"Samimi bir kalp, en sade sözle bile başka bir kalbe dokunabilir.",source:"Gönle dokunan güzel söz"},
{id:"g68",type:"reflection",title:"İyilikle yaşa",text:"Günün sonunda yaptığın iyilikleri hatırla; onlar hayatına anlam katar.",source:"Gönle dokunan güzel söz"}

];
(()=>{
const root=document.getElementById("inspirationPage");
if(!root){console.error("Gönle Dokunan Sözler bölümü bulunamadı.");return;}
if(root.dataset.inspirationInitialized==="true")return;
root.style.pointerEvents="auto";
const pickerToggle=root.querySelector("#inspirationPickerToggle"),pickerPanel=root.querySelector("#inspirationPickerPanel"),pickerCurrent=root.querySelector("#inspirationPickerCurrent");
const search=root.querySelector("#inspirationSearch"),preview=root.querySelector("#inspirationPreview"),listRoot=root.querySelector("#inspirationList");
const themeOptions=root.querySelector("#inspirationThemeOptions"),size=root.querySelector("#inspirationSize"),format=root.querySelector("#inspirationFormat");
const shareButton=root.querySelector("#inspirationShare"),downloadButton=root.querySelector("#inspirationDownload");
const textNode=preview?.querySelector(".inspiration-preview-text"),attribution=preview?.querySelector(".inspiration-preview-attribution"),reference=root.querySelector("#inspirationReference");
if(!pickerToggle||!pickerPanel||!pickerCurrent||!search||!preview||!listRoot||!themeOptions||!size||!format||!shareButton||!downloadButton||!textNode||!attribution||!reference){console.error("Gönle Dokunan Sözler: gerekli ekran öğeleri eksik.");return;}
let filter="all",searchTerm="",current=INSPIRATION_ITEMS[0],selectionToken=0,selectedTheme="emerald";
const INSPIRATION_THEMES=[{"id":"emerald","label":"Zümrüt yeşili","colors":["#326451","#174638","#0d3027","#b99a59","#f3e4bb","#fffaf0","#ead9a8"],"light":false},{"id":"navy","label":"Gece laciverti","colors":["#334d78","#203557","#111d38","#a9bde0","#e0eaff","#f6f8ff","#c8d8f5"],"light":false},{"id":"burgundy","label":"Bordo","colors":["#873e50","#642c3c","#421c2b","#d2a0a5","#f6dfe1","#fff5f5","#efc4c9"],"light":false},{"id":"purple","label":"Asil mor","colors":["#70558e","#503968","#342343","#c3a8db","#eddef8","#fff9ff","#ddc2f0"],"light":false},{"id":"rose","label":"Gül kurusu","colors":["#b87983","#925b68","#673c4d","#e0b4b9","#fff0f0","#fffafa","#f3d0d4"],"light":false},{"id":"turquoise","label":"Turkuaz","colors":["#368b8b","#22696f","#164b55","#9ed5cf","#d8f5f0","#f4fffd","#bce8df"],"light":false},{"id":"olive","label":"Zeytin yeşili","colors":["#777b43","#555a2d","#35391e","#c3bd78","#f0edcf","#fffef2","#ded79b"],"light":false},{"id":"coffee","label":"Kahve","colors":["#8a6349","#67452f","#493021","#c7a17b","#f3dfc8","#fff8ef","#e4c5a1"],"light":false},{"id":"charcoal","label":"Antrasit","colors":["#626b73","#414950","#252c33","#aeb8c1","#e4e9ed","#f9fbfc","#d4dce3"],"light":false},{"id":"cream","label":"Krem","colors":["#d8c79f","#b49a6c","#8f7852","#79633d","#493a25","#fffaf0","#a68a5a"],"light":true}];
const mealCache=new Map();
const attributionFor=item=>item.type==="hadith"?"Hz. Muhammed (s.a.v.)":item.type==="ayah"?"Kur’an-ı Kerim ayeti":"Gönle dokunan güzel söz";
function visibleItems(){return INSPIRATION_ITEMS.filter(item=>(filter==="all"||item.type===filter)&&(!searchTerm||(item.title+" "+item.text).toLocaleLowerCase("tr").includes(searchTerm)));}
function setButtons(){
 listRoot.replaceChildren();
 visibleItems().forEach(item=>{
  const button=document.createElement("button");button.type="button";button.className="inspiration-choice"+(current?.id===item.id?" active":"");
  button.setAttribute("aria-pressed",current?.id===item.id?"true":"false");
  button.dataset.inspirationItem=item.id;
  const kind=document.createElement("small");kind.textContent=item.type==="hadith"?"HADİS":item.type==="ayah"?"AYET":"GÜZEL SÖZ";
  const title=document.createElement("strong");title.textContent=item.title;
  button.append(kind,title);
  listRoot.append(button);
 });
}

async function loadAyahMeal(item){
 if(mealCache.has(item.id))return mealCache.get(item.id);
 if(typeof window.getQuranMealForSurah!=="function")throw new Error("Çevrimdışı meal verisi hazır değil");
 const rows=await window.getQuranMealForSurah(item.ayahRef.surah),byNumber=new Map(rows.map(row=>[Number(row.aya),row]));
 const parts=item.ayahRef.ayahs.map(number=>byNumber.get(number));
 if(parts.some(part=>!part||typeof part.translation!=="string"||!part.translation.trim()))throw new Error("Ayetin tam meali bulunamadı");
 const text=parts.map(part=>part.translation.trim()).join(" ");mealCache.set(item.id,text);return text;
}
function updateReference(item){reference.textContent=item.type==="hadith"?"Hadis kaynağı: "+item.source:item.type==="ayah"?"Ayet kaynağı: "+item.source+" · Meal: QuranEnc / Rowwad Translation Center":"Güzel söz · Ayet veya hadis değildir."; }
async function render(){
 if(!current){textNode.textContent="Henüz gösterilecek söz bulunmuyor.";attribution.textContent="";shareButton.disabled=true;downloadButton.disabled=true;return;}
 const item=current,token=++selectionToken;shareButton.disabled=true;downloadButton.disabled=true;
 textNode.textContent=item.type==="ayah"?"Ayetin çevrimdışı meali yükleniyor…":item.text;
 attribution.textContent=attributionFor(item);updateReference(item);
 const palette=INSPIRATION_THEMES.find(x=>x.id===selectedTheme)||INSPIRATION_THEMES[0];preview.style.background="radial-gradient(circle at 50% 15%,"+palette.colors[0]+","+palette.colors[1]+" 68%)";preview.style.borderColor=palette.colors[3];const light=palette.light;preview.style.color=light?palette.colors[4]:"#f7f0dc";textNode.style.color=light?palette.colors[4]:"#fffaf0";attribution.style.color=palette.colors[6];
 const baseFont=({normal:22,large:26,xlarge:30})[size.value];const quoteLength=(item.type!=="ayah"?item.text:(item.displayText||"")).length;const autoFont=quoteLength>420?15:quoteLength>300?16:quoteLength>220?18:quoteLength>140?20:baseFont;textNode.style.fontSize=autoFont+"px";textNode.style.lineHeight="1.55";preview.style.padding=quoteLength>220?"24px 18px":"36px 25px";preview.style.aspectRatio=({portrait:"4 / 5",square:"1 / 1",story:"9 / 16"})[format.value];preview.style.minHeight=format.value==="story"?"540px":format.value==="square"?"330px":"390px";
 if(item.type!=="ayah"){const len=item.text.length;textNode.style.fontSize=(len>420?15:len>300?16:len>220?18:len>140?20:baseFont)+"px";shareButton.disabled=false;downloadButton.disabled=false;return;}
 try{const text=await loadAyahMeal(item);if(token!==selectionToken)return;item.displayText=text;textNode.textContent=text;const fittedFont=text.length>420?15:text.length>300?16:text.length>220?18:text.length>140?20:baseFont;textNode.style.fontSize=fittedFont+"px";textNode.style.lineHeight="1.55";preview.style.padding=text.length>220?"24px 18px":"36px 25px";shareButton.disabled=false;downloadButton.disabled=false;}
 catch(error){if(token!==selectionToken)return;item.displayText="";textNode.textContent="Ayet meali yüklenemedi. İnternet bağlantısını kontrol edip tekrar dene.";}
}
function updateList(){setButtons();render();}
pickerToggle.addEventListener("click",()=>{const open=pickerToggle.getAttribute("aria-expanded")!=="true";pickerToggle.setAttribute("aria-expanded",String(open));pickerPanel.hidden=!open;if(!open)search.blur();});
root.addEventListener("click",event=>{
 const tab=event.target.closest(".inspiration-tab[data-inspiration-filter]");
 if(tab&&root.contains(tab)){
  event.preventDefault();filter=tab.dataset.inspirationFilter;
  root.querySelectorAll(".inspiration-tab").forEach(node=>node.classList.toggle("active",node===tab));
  updateList();return;
 }
 const choice=event.target.closest(".inspiration-choice[data-inspiration-item]");
 if(choice&&root.contains(choice)){
  event.preventDefault();const chosen=INSPIRATION_ITEMS.find(item=>item.id===choice.dataset.inspirationItem);
  if(chosen){current=chosen;pickerCurrent.textContent=chosen.title;pickerToggle.setAttribute("aria-expanded","false");pickerPanel.hidden=true;setButtons();render();}
 }
});
search.addEventListener("input",()=>{searchTerm=search.value.trim().toLocaleLowerCase("tr");setButtons();});
[size,format].forEach(control=>control.addEventListener("change",render));
themeOptions.addEventListener("click",event=>{const button=event.target.closest("[data-inspiration-theme]");if(button)applyInspirationTheme(button.dataset.inspirationTheme,true);});
function wrapText(ctx,text,maxWidth,fontSize){
 let font=fontSize,lines=[];
 while(font>=34){ctx.font="600 "+font+"px Georgia, serif";lines=[];let line="";
  for(const word of text.split(/\s+/)){const candidate=line?line+" "+word:word;if(ctx.measureText(candidate).width>maxWidth&&line){lines.push(line);line=word;}else line=candidate;}
  if(line)lines.push(line);if(lines.length<=9)break;font-=2;
 }
 return {font,lines};
}
async function makeImage(){
 const quote=current?.type!=="ayah"?current?.text:current?.displayText;
 if(!quote)throw new Error("Paylaşılacak söz veya ayet meali hazır değil.");
 const width=1080,height=format.value==="square"?1080:format.value==="story"?1920:1350,canvas=document.createElement("canvas");
 canvas.width=width;canvas.height=height;const ctx=canvas.getContext("2d");
 const palette=INSPIRATION_THEMES.find(x=>x.id===selectedTheme)||INSPIRATION_THEMES[0],colors=palette.colors,gradient=ctx.createLinearGradient(0,0,width,height);gradient.addColorStop(0,colors[0]);gradient.addColorStop(1,colors[1]);ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
 ctx.strokeStyle=colors[3]+"99";ctx.lineWidth=2;ctx.strokeRect(42,42,width-84,height-84);ctx.textAlign="center";ctx.textBaseline="middle";
 const layout=wrapText(ctx,quote,width-190,size.value==="normal"?52:size.value==="large"?62:72),lineHeight=layout.font*1.55,totalHeight=layout.lines.length*lineHeight+72;
 let y=(height-totalHeight)/2+lineHeight/2;ctx.fillStyle=palette.light?colors[4]:colors[5];ctx.font="600 "+layout.font+"px Georgia, serif";
 layout.lines.forEach(line=>{ctx.fillText(line,width/2,y,width-190);y+=lineHeight;});
 ctx.fillStyle=colors[6];ctx.font="26px Arial, sans-serif";ctx.fillText(attributionFor(current),width/2,y+18,width-160);
 return new Promise(resolve=>canvas.toBlob(resolve,"image/png"));
}
function download(blob){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="gonle-dokunan-sozler.png";document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
async function share(){
 try{const blob=await makeImage();if(!blob)throw new Error("Görsel hazırlanamadı.");const file=new File([blob],"gonle-dokunan-sozler.png",{type:"image/png"});
  if(navigator.canShare?.({files:[file]})&&navigator.share)await navigator.share({title:"",text:"",files:[file]});else download(blob);
 }catch(error){if(error.name!=="AbortError")alert(error.message||"Paylaşım açılamadı. Görseli kaydetmeyi deneyebilirsin.");}
}
shareButton.addEventListener("click",share);
downloadButton.addEventListener("click",async()=>{try{const blob=await makeImage();if(blob)download(blob);}catch(error){alert(error.message||"Görsel hazırlanamadı.");}});
pickerPanel.hidden=true;
pickerToggle.setAttribute("aria-expanded","false");
function applyInspirationTheme(id,save=true){const palette=INSPIRATION_THEMES.find(x=>x.id===id)||INSPIRATION_THEMES[0];selectedTheme=palette.id;themeOptions.querySelectorAll("[data-inspiration-theme]").forEach(button=>{const active=button.dataset.inspirationTheme===selectedTheme;button.classList.toggle("selected",active);button.setAttribute("aria-pressed",String(active));});const label=root.querySelector("#inspirationThemeName");if(label)label.textContent=palette.label;if(save){try{localStorage.setItem("inspiration-card-theme",selectedTheme);}catch{}}render();}
let savedInspirationTheme="emerald";try{savedInspirationTheme=localStorage.getItem("inspiration-card-theme")||"emerald";}catch{}applyInspirationTheme(savedInspirationTheme,false);
pickerCurrent.textContent=current.title;
updateList();
console.info("Gönle Dokunan Sözler hazır:",INSPIRATION_ITEMS.length,"içerik; 10 renk paleti ve klavyesiz liste seçimi etkin.");
})();
