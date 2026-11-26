(()=>{"use strict";
const KEY="quran-zikirmatik-v1";
const HISTORY_KEY="quran-dhikr-history-v1";
const PRESETS=[{"id":"preset-subhanallah","name":"Sübhanallah","target":33},{"id":"preset-elhamdulillah","name":"Elhamdülillah","target":33},{"id":"preset-allahu-akbar","name":"Allahu Ekber","target":33},{"id":"preset-tahlil","name":"Lâ ilâhe illallah","target":100},{"id":"preset-tehlil-tam","name":"Lâ ilâhe illallâhu vahdehû lâ şerîke leh...","target":100},{"id":"preset-istighfar","name":"Estağfirullah","target":100},{"id":"preset-istighfar-tawba","name":"Estağfirullâhe'l-azîm ve etûbü ileyh","target":100},{"id":"preset-salawat","name":"Allahümme salli alâ Muhammed","target":100},{"id":"preset-salawat-full","name":"Allahümme salli ve sellim alâ nebiyyinâ Muhammed","target":100},{"id":"preset-hawqala","name":"Lâ havle ve lâ kuvvete illâ billâh","target":100},{"id":"preset-hasbunallah","name":"Hasbünallahu ve ni'mel vekîl","target":100},{"id":"preset-subhan-bihamdihi","name":"Sübhanallahi ve bihamdihî","target":100},{"id":"preset-subhan-azim","name":"Sübhanallahil azîm","target":100},{"id":"preset-two-heavy","name":"Sübhanallahi ve bihamdihî, Sübhanallahil azîm","target":100},{"id":"preset-yunus","name":"Lâ ilâhe illâ ente sübhâneke innî küntü minez zâlimîn","target":100},{"id":"preset-rabbana-atina","name":"Rabbenâ âtinâ fid dünyâ haseneten...","target":33},{"id":"preset-hayyu-qayyum","name":"Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs","target":100},{"id":"preset-ente-selam","name":"Allahümme ente's-selâmü ve minke's-selâm, tebârekte zâ'l-celâli ve'l-ikrâm","target":1},{"id":"preset-compound","name":"Sübhanallahi velhamdülillahi ve lâ ilâhe illallahu vallahu ekber","target":100},{"id":"preset-rabbighfir","name":"Rabbiğfir lî ve tüb aleyye","target":100},{"id":"preset-love-allah","name":"ALLAH'ı seviyorum","target":66},{"id":"preset-trust-allah","name":"ALLAH'a güveniyorum","target":101}];
const $=id=>document.getElementById(id);
const state=load();
function load(){
 let x;try{x=JSON.parse(localStorage.getItem(KEY)||"null");}catch{}
 if(!x||!Array.isArray(x.items))x={items:[],active:"preset-subhanallah",vibrate:false};
 const old=x.items||[];
 const ready=PRESETS.map(p=>{const found=old.find(i=>i.id===p.id);return found?{...p,...found,name:p.name,target:found.target===1&&p.target!==1?p.target:(found.target||p.target),count:Number(found.count)||0}:{...p,count:0};});
 const custom=old.filter(i=>i&&typeof i==="object"&&!PRESETS.some(p=>p.id===i.id));
 x.items=[...ready,...custom];
 if(!x.items.some(i=>i.id===x.active))x.active="preset-subhanallah";
 x.vibrate=!!x.vibrate;
 return x;
}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function todayKey(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function loadHistory(){try{const x=JSON.parse(localStorage.getItem(HISTORY_KEY)||"{}");return x&&typeof x==="object"?x:{};}catch{return {};}}
function saveHistory(x){localStorage.setItem(HISTORY_KEY,JSON.stringify(x));}
function adjustDailyHistory(item,delta){const history=loadHistory(),day=todayKey();if(!history[day])history[day]={};const old=history[day][item.id]||{name:item.name,count:0};const next=Math.max(0,(Number(old.count)||0)+delta);if(next===0)delete history[day][item.id];else history[day][item.id]={name:item.name,count:next};if(Object.keys(history[day]).length===0)delete history[day];saveHistory(history);}
function formatHistoryDate(key){const [y,m,d]=key.split("-").map(Number);return new Intl.DateTimeFormat("tr-TR",{day:"numeric",month:"long",year:"numeric"}).format(new Date(y,m-1,d));}
function renderDailyHistory(){const panel=$("dhikrHistoryLog");if(!panel)return;panel.replaceChildren();const history=loadHistory(),today=todayKey();const todayItems=history[today]||{};const todayTotal=Object.values(todayItems).reduce((sum,x)=>sum+(Number(x.count)||0),0);$("dhikrTodayTotal").textContent=String(todayTotal);const days=Object.keys(history).filter(day=>Object.keys(history[day]||{}).length).sort((a,b)=>b.localeCompare(a)).slice(0,60);if(!days.length){const empty=document.createElement("p");empty.className="dhikr-history-empty";empty.textContent="Henüz zikir kaydı yok. Zikir çektikçe günlük geçmişin burada oluşacak.";panel.append(empty);return;}days.forEach(day=>{const items=Object.values(history[day]||{}).filter(x=>(Number(x.count)||0)>0);const total=items.reduce((sum,x)=>sum+Number(x.count||0),0);if(!total)return;const details=document.createElement("details");details.className="dhikr-day";details.open=day===today;const summary=document.createElement("summary");const date=document.createElement("span");date.textContent=day===today?"Bugün":formatHistoryDate(day);const count=document.createElement("span");count.className="dhikr-day-total";count.textContent=total+" zikir";summary.append(date,count);const list=document.createElement("div");list.className="dhikr-day-items";items.sort((a,b)=>a.name.localeCompare(b.name,"tr")).forEach(item=>{const row=document.createElement("div");row.className="dhikr-day-item";const name=document.createElement("span");name.textContent=item.name;const amount=document.createElement("strong");amount.textContent=Number(item.count)+" kez";row.append(name,amount);list.append(row);});details.append(summary,list);panel.append(details);});}
save();
function active(){return state.items.find(x=>x.id===state.active)||state.items[0];}
function render(){
 const item=active();if(!item)return;
 $("dhikrName").textContent=item.name;
 $("dhikrCount").textContent=String(item.count);$("dhikrRounds").textContent=String(Math.floor(item.count/Math.max(1,item.target)));
 $("dhikrTarget").value=String(item.target);
 const cycleCount=item.count%item.target;const progressCount=item.count>0&&cycleCount===0?item.target:cycleCount;$("dhikrProgress").style.width=Math.min(100,progressCount/item.target*100)+"%";
 $("dhikrProgressText").textContent=progressCount+" / "+item.target;
 $("dhikrHistory").replaceChildren();
 state.items.forEach(x=>{const o=document.createElement("option");o.value=x.id;o.textContent=x.name;$("dhikrHistory").append(o);});
 $("dhikrHistory").value=item.id;
 $("vibrationToggle").checked=!!state.vibrate;
 $("dhikrComplete").hidden=!(item.count>0&&item.count%item.target===0);
 renderDailyHistory();
}
$("dhikrHistory").addEventListener("change",e=>{state.active=e.target.value;save();render();});
$("dhikrTarget").addEventListener("change",e=>{active().target=Math.max(1,Math.min(100000,Number(e.target.value)||33));save();render();});
$("dhikrTap").addEventListener("click",()=>{const item=active();item.count++;adjustDailyHistory(item,1);save();if(navigator.vibrate){if(item.count>0&&item.count%item.target===0)navigator.vibrate([180,90,180,90,320]);else if(state.vibrate)navigator.vibrate(25);}render();});
$("dhikrUndo").addEventListener("click",()=>{const item=active();if(item.count>0){item.count=Math.max(0,item.count-1);adjustDailyHistory(item,-1);}save();render();});
$("dhikrReset").addEventListener("click",()=>{active().count=0;save();render();});
$("vibrationToggle").addEventListener("change",e=>{state.vibrate=e.target.checked;save();});
$("addDhikr").addEventListener("click",()=>{const name=$("newDhikrName").value.trim();if(!name){$("newDhikrName").focus();return;}const x={id:"custom-"+Date.now(),name,count:0,target:33};state.items.push(x);state.active=x.id;$("newDhikrName").value="";save();render();});
render();
})();