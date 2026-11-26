const MEAL_VERSION="1.0.4";
const INSPIRATION_DATA_VERSION="2.0";
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
,{id:"a16",type:"ayah",title:"Bakara Suresi · 152",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 152. ayet",ayahRef:{surah:2,ayahs:[152]}}

];
(()=>{
const root=document.getElementById("inspirationPage");
if(!root){console.error("Gönle Dokunan Sözler bölümü bulunamadı.");return;}
const select=root.querySelector("#inspirationSelect"),preview=root.querySelector("#inspirationPreview"),listRoot=root.querySelector("#inspirationList");
const theme=root.querySelector("#inspirationTheme"),size=root.querySelector("#inspirationSize"),format=root.querySelector("#inspirationFormat");
const shareButton=root.querySelector("#inspirationShare"),downloadButton=root.querySelector("#inspirationDownload");
const textNode=preview?.querySelector(".inspiration-preview-text"),attribution=preview?.querySelector(".inspiration-preview-attribution"),reference=root.querySelector("#inspirationReference");
if(!select||!preview||!listRoot||!theme||!size||!format||!shareButton||!downloadButton||!textNode||!attribution||!reference){console.error("Gönle Dokunan Sözler: gerekli ekran öğeleri eksik.");return;}
let filter="all",current=INSPIRATION_ITEMS[0],selectionToken=0;
const mealCache=new Map();
const attributionFor=item=>item.type==="hadith"?"Hz. Muhammed (s.a.v.)":"Kur’an-ı Kerim ayeti";
function visibleItems(){return INSPIRATION_ITEMS.filter(item=>filter==="all"||item.type===filter);}
function setButtons(){
 listRoot.replaceChildren();
 visibleItems().forEach(item=>{
  const button=document.createElement("button");button.type="button";button.className="inspiration-choice"+(current?.id===item.id?" active":"");
  button.setAttribute("aria-pressed",current?.id===item.id?"true":"false");
  const kind=document.createElement("small");kind.textContent=item.type==="hadith"?"HADİS":"AYET";
  const title=document.createElement("strong");title.textContent=item.title;
  button.append(kind,title);
  button.addEventListener("click",event=>{event.preventDefault();current=item;fillSelect();setButtons();render();});
  listRoot.append(button);
 });
}
function fillSelect(){
 select.replaceChildren();
 visibleItems().forEach(item=>{const option=document.createElement("option");option.value=item.id;option.textContent=(item.type==="hadith"?"Hadis · ":"Ayet · ")+item.title;select.append(option);});
 if(current&&!visibleItems().some(item=>item.id===current.id))current=visibleItems()[0]||null;
 if(current)select.value=current.id;
}
async function loadAyahMeal(item){
 if(mealCache.has(item.id))return mealCache.get(item.id);
 if(typeof window.getQuranMealForSurah!=="function")throw new Error("Çevrimdışı meal verisi hazır değil");
 const rows=await window.getQuranMealForSurah(item.ayahRef.surah),byNumber=new Map(rows.map(row=>[Number(row.aya),row]));
 const parts=item.ayahRef.ayahs.map(number=>byNumber.get(number));
 if(parts.some(part=>!part||typeof part.translation!=="string"||!part.translation.trim()))throw new Error("Ayetin tam meali bulunamadı");
 const text=parts.map(part=>part.translation.trim()).join(" ");mealCache.set(item.id,text);return text;
}
function updateReference(item){reference.textContent=item.type==="hadith"?"Hadis kaynağı: "+item.source:"Ayet kaynağı: "+item.source+" · Meal: QuranEnc / Rowwad Translation Center";}
async function render(){
 if(!current){textNode.textContent="Henüz gösterilecek söz bulunmuyor.";attribution.textContent="";shareButton.disabled=true;downloadButton.disabled=true;return;}
 const item=current,token=++selectionToken;shareButton.disabled=true;downloadButton.disabled=true;
 textNode.textContent=item.type==="hadith"?item.text:"Ayetin çevrimdışı meali yükleniyor…";
 attribution.textContent=attributionFor(item);updateReference(item);
 preview.style.background=({green:"radial-gradient(circle at 50% 15%,#326451,#123c32 68%)",cream:"linear-gradient(145deg,#fff9e9,#e8d9b5)",night:"linear-gradient(145deg,#24344f,#101a2c)",sage:"linear-gradient(145deg,#dce7d7,#9caf9b)"})[theme.value];
 const light=theme.value==="cream"||theme.value==="sage";preview.style.color=light?"#29372f":"#f7f0dc";textNode.style.color=light?"#29372f":"#fffaf0";attribution.style.color=light?"#58675b":"#e5d6b2";
 textNode.style.fontSize=({normal:"22px",large:"26px",xlarge:"30px"})[size.value];preview.style.aspectRatio=({portrait:"4 / 5",square:"1 / 1",story:"9 / 16"})[format.value];preview.style.minHeight=format.value==="story"?"540px":format.value==="square"?"330px":"390px";
 if(item.type==="hadith"){shareButton.disabled=false;downloadButton.disabled=false;return;}
 try{const text=await loadAyahMeal(item);if(token!==selectionToken)return;item.displayText=text;textNode.textContent=text;shareButton.disabled=false;downloadButton.disabled=false;}
 catch(error){if(token!==selectionToken)return;item.displayText="";textNode.textContent="Ayet meali yüklenemedi. İnternet bağlantısını kontrol edip tekrar dene.";}
}
function updateList(){fillSelect();setButtons();render();}
document.querySelectorAll("[data-inspiration-filter]").forEach(button=>button.addEventListener("click",()=>{filter=button.dataset.inspirationFilter;document.querySelectorAll("[data-inspiration-filter]").forEach(tab=>tab.classList.toggle("active",tab===button));updateList();}));
select.addEventListener("change",()=>{const chosen=INSPIRATION_ITEMS.find(item=>item.id===select.value);if(!chosen)return;current=chosen;setButtons();render();});
[theme,size,format].forEach(control=>control.addEventListener("change",render));
function wrapText(ctx,text,maxWidth,fontSize){
 let font=fontSize,lines=[];
 while(font>=34){ctx.font="600 "+font+"px Georgia, serif";lines=[];let line="";
  for(const word of text.split(/\s+/)){const candidate=line?line+" "+word:word;if(ctx.measureText(candidate).width>maxWidth&&line){lines.push(line);line=word;}else line=candidate;}
  if(line)lines.push(line);if(lines.length<=9)break;font-=2;
 }
 return {font,lines};
}
async function makeImage(){
 const quote=current?.type==="hadith"?current.text:current?.displayText;
 if(!quote)throw new Error("Paylaşılacak söz veya ayet meali hazır değil.");
 const width=1080,height=format.value==="square"?1080:format.value==="story"?1920:1350,canvas=document.createElement("canvas");
 canvas.width=width;canvas.height=height;const ctx=canvas.getContext("2d");
 const palettes={green:["#326451","#123c32","#e4cf98","#fffaf0"],cream:["#fff9e9","#e8d9b5","#806a3d","#29372f"],night:["#24344f","#101a2c","#d6c58f","#fffaf0"],sage:["#dce7d7","#9caf9b","#806a3d","#29372f"]};
 const colors=palettes[theme.value],gradient=ctx.createLinearGradient(0,0,width,height);gradient.addColorStop(0,colors[0]);gradient.addColorStop(1,colors[1]);ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
 ctx.strokeStyle=colors[2]+"66";ctx.lineWidth=2;ctx.strokeRect(42,42,width-84,height-84);ctx.textAlign="center";ctx.textBaseline="middle";
 const layout=wrapText(ctx,quote,width-190,size.value==="normal"?52:size.value==="large"?62:72),lineHeight=layout.font*1.55,totalHeight=layout.lines.length*lineHeight+72;
 let y=(height-totalHeight)/2+lineHeight/2;ctx.fillStyle=colors[3];ctx.font="600 "+layout.font+"px Georgia, serif";
 layout.lines.forEach(line=>{ctx.fillText(line,width/2,y,width-190);y+=lineHeight;});
 ctx.fillStyle=colors[2];ctx.font="26px Arial, sans-serif";ctx.fillText(attributionFor(current),width/2,y+18,width-160);
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
updateList();
console.info("Gönle Dokunan Sözler hazır:",INSPIRATION_ITEMS.length,"içerik");
})();
