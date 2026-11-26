(()=>{"use strict";
const KEY="quran-zikirmatik-v1";
const PRESETS=[{"id":"preset-subhanallah","name":"Sübhanallah","target":33},{"id":"preset-elhamdulillah","name":"Elhamdülillah","target":33},{"id":"preset-allahu-akbar","name":"Allahu Ekber","target":33},{"id":"preset-tahlil","name":"Lâ ilâhe illallah","target":100},{"id":"preset-istighfar","name":"Estağfirullah","target":100},{"id":"preset-salawat","name":"Allahümme salli alâ Muhammed","target":100}];
const $=id=>document.getElementById(id);
const state=load();
function load(){let x;try{x=JSON.parse(localStorage.getItem(KEY)||"null");}catch{}if(!x||!Array.isArray(x.items))x={items:[],active:"preset-subhanallah",vibrate:false};if(!x.items.length)x.items=[];PRESETS.forEach(p=>{if(!x.items.some(i=>i.id===p.id))x.items.unshift({...p,count:0});});if(!x.items.some(i=>i.id===x.active))x.active="preset-subhanallah";return x;}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function active(){return state.items.find(x=>x.id===state.active)||state.items[0];}
function render(){
 const item=active();if(!item)return;
 $("dhikrName").textContent=item.name;
 $("dhikrCount").textContent=item.count;
 $("dhikrTarget").value=String(item.target);
 $("dhikrProgress").style.width=Math.min(100,item.target?item.count/item.target*100:0)+"%";
 $("dhikrProgressText").textContent=item.count+" / "+item.target;
 $("dhikrHistory").replaceChildren();
 state.items.forEach(x=>{const o=document.createElement("option");o.value=x.id;o.textContent=x.name+" · "+x.count;$("dhikrHistory").append(o);});
 $("dhikrHistory").value=item.id;
 $("vibrationToggle").checked=!!state.vibrate;
 $("dhikrComplete").hidden=item.count<item.target;
}
$("dhikrHistory").addEventListener("change",e=>{state.active=e.target.value;save();render();});
$("dhikrTarget").addEventListener("change",e=>{active().target=Math.max(1,Math.min(100000,Number(e.target.value)||33));save();render();});
$("dhikrTap").addEventListener("click",()=>{active().count++;save();if(state.vibrate&&navigator.vibrate)navigator.vibrate(25);render();});
$("dhikrUndo").addEventListener("click",()=>{active().count=Math.max(0,active().count-1);save();render();});
$("dhikrReset").addEventListener("click",()=>{active().count=0;save();render();});
$("vibrationToggle").addEventListener("change",e=>{state.vibrate=e.target.checked;save();});
$("addDhikr").addEventListener("click",()=>{const name=$("newDhikrName").value.trim();if(!name){$("newDhikrName").focus();return;}const x={id:"custom-"+Date.now(),name,count:0,target:33};state.items.push(x);state.active=x.id;$("newDhikrName").value="";save();render();});
render();
})();