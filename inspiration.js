const MEAL_VERSION="1.0.4";
const INSPIRATION_ITEMS=[
{id:"h1",type:"hadith",title:"Ameller niyetlere göredir",text:"Ameller niyetlere göredir. Herkes ancak niyet ettiğinin karşılığını alır.",source:"Buhârî 1 · Müslim 1907a"},
{id:"h2",type:"hadith",title:"Kolaylaştırın",text:"Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz.",source:"Buhârî, İlim, 69 · Müslim, Cihâd, 1732"},
{id:"h3",type:"hadith",title:"Kur’an’ı öğrenmek",text:"Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.",source:"Buhârî, Fedâilü’l-Kur’ân, 5027"},
{id:"h4",type:"hadith",title:"Güzel söz",text:"Güzel söz sadakadır.",source:"Buhârî, 2989 · Müslim, 1009"},
{id:"a1",type:"ayah",title:"İnşirah Suresi · 5-6",text:"",source:"Kur’an-ı Kerim · İnşirah Suresi, 5-6. ayetler",ayahRef:{surah:94,ayahs:[5,6]}},
{id:"a2",type:"ayah",title:"Ra’d Suresi · 28",text:"",source:"Kur’an-ı Kerim · Ra’d Suresi, 28. ayet",ayahRef:{surah:13,ayahs:[28]}},
{id:"a3",type:"ayah",title:"Bakara Suresi · 286",text:"",source:"Kur’an-ı Kerim · Bakara Suresi, 286. ayet",ayahRef:{surah:2,ayahs:[286]}},
{id:"a4",type:"ayah",title:"Zümer Suresi · 53",text:"",source:"Kur’an-ı Kerim · Zümer Suresi, 53. ayet",ayahRef:{surah:39,ayahs:[53]}}
];
(()=>{
const root=document.getElementById("inspirationPage");
if(!root)return;
const select=root.querySelector("#inspirationSelect"),preview=root.querySelector("#inspirationPreview"),listRoot=root.querySelector("#inspirationList");
const theme=root.querySelector("#inspirationTheme"),size=root.querySelector("#inspirationSize"),format=root.querySelector("#inspirationFormat");
const shareButton=root.querySelector("#inspirationShare"),downloadButton=root.querySelector("#inspirationDownload");
const textNode=preview?.querySelector(".inspiration-preview-text"),attribution=preview?.querySelector(".inspiration-preview-attribution"),reference=root.querySelector("#inspirationReference");
if(!select||!preview||!listRoot||!theme||!size||!format||!shareButton||!downloadButton||!textNode||!attribution||!reference)return;
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
  button.addEventListener("click",()=>{current=item;fillSelect();setButtons();render();});
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
select.addEventListener("change",()=>{current=INSPIRATION_ITEMS.find(item=>item.id===select.value)||current;setButtons();render();});
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
})();
