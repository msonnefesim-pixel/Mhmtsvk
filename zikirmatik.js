(()=>{"use strict";
const KEY="quran-zikirmatik-v1";
const PRESETS=[{"id":"preset-subhanallah","name":"Sübhanallah","target":33},{"id":"preset-elhamdulillah","name":"Elhamdülillah","target":33},{"id":"preset-allahu-akbar","name":"Allahu Ekber","target":33},{"id":"preset-tahlil","name":"Lâ ilâhe illallah","target":100},{"id":"preset-tehlil-tam","name":"Lâ ilâhe illallâhu vahdehû lâ şerîke leh...","target":100},{"id":"preset-istighfar","name":"Estağfirullah","target":100},{"id":"preset-istighfar-tawba","name":"Estağfirullâhe'l-azîm ve etûbü ileyh","target":100},{"id":"preset-salawat","name":"Allahümme salli alâ Muhammed","target":100},{"id":"preset-salawat-full","name":"Allahümme salli ve sellim alâ nebiyyinâ Muhammed","target":100},{"id":"preset-hawqala","name":"Lâ havle ve lâ kuvvete illâ billâh","target":100},{"id":"preset-hasbunallah","name":"Hasbünallahu ve ni'mel vekîl","target":100},{"id":"preset-subhan-bihamdihi","name":"Sübhanallahi ve bihamdihî","target":100},{"id":"preset-subhan-azim","name":"Sübhanallahil azîm","target":100},{"id":"preset-two-heavy","name":"Sübhanallahi ve bihamdihî, Sübhanallahil azîm","target":100},{"id":"preset-yunus","name":"Lâ ilâhe illâ ente sübhâneke innî küntü minez zâlimîn","target":100},{"id":"preset-rabbana-atina","name":"Rabbenâ âtinâ fid dünyâ haseneten...","target":33},{"id":"preset-hayyu-qayyum","name":"Yâ Hayyu yâ Kayyûm, bi-rahmetike esteğîs","target":100},{"id":"preset-ente-selam","name":"Allahümme ente's-selâmü ve minke's-selâm","target":1},{"id":"preset-compound","name":"Sübhanallahi velhamdülillahi ve lâ ilâhe illallahu vallahu ekber","target":100},{"id":"preset-rabbighfir","name":"Rabbiğfir lî ve tüb aleyye","target":100},{"id":"preset-love-allah","name":"ALLAH'ı seviyorum","target":66},{"id":"preset-trust-allah","name":"ALLAH'a güveniyorum","target":101}];
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
save();
function active(){return state.items.find(x=>x.id===state.active)||state.items[0];}
function render(){
 const item=active();if(!item)return;
 $("dhikrName").textContent=item.name;
 $("dhikrCount").textContent=item.count;
 $("dhikrTarget").value=String(item.target);
 $("dhikrProgress").style.width=Math.min(100,item.target?item.count/item.target*100:0)+"%";
 $("dhikrProgressText").textContent=item.count+" / "+item.target;
 $("dhikrHistory").replaceChildren();
 state.items.forEach(x=>{const o=document.createElement("option");o.value=x.id;o.textContent=x.name;$("dhikrHistory").append(o);});
 $("dhikrHistory").value=item.id;
 $("vibrationToggle").checked=!!state.vibrate;
 $("dhikrComplete").hidden=item.count<item.target;
}
$("dhikrHistory").addEventListener("change",e=>{state.active=e.target.value;save();render();});
$("dhikrTarget").addEventListener("change",e=>{active().target=Math.max(1,Math.min(100000,Number(e.target.value)||33));save();render();});
$("dhikrTap").addEventListener("click",()=>{const item=active();item.count++;save();if(navigator.vibrate){if(item.count===item.target)navigator.vibrate([180,90,180,90,320]);else if(state.vibrate)navigator.vibrate(25);}render();});
$("dhikrUndo").addEventListener("click",()=>{active().count=Math.max(0,active().count-1);save();render();});
$("dhikrReset").addEventListener("click",()=>{active().count=0;save();render();});
$("vibrationToggle").addEventListener("change",e=>{state.vibrate=e.target.checked;save();});
$("addDhikr").addEventListener("click",()=>{const name=$("newDhikrName").value.trim();if(!name){$("newDhikrName").focus();return;}const x={id:"custom-"+Date.now(),name,count:0,target:33};state.items.push(x);state.active=x.id;$("newDhikrName").value="";save();render();});
render();
})();