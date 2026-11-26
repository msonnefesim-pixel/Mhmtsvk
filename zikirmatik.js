(()=>{"use strict";
const KEY="quran-zikirmatik-v1";
const $=id=>document.getElementById(id);
const state=load();
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");if(Array.isArray(x.items)&&x.items.length)return x;}catch{}return{items:[{id:"default",name:"Sübhanallah",count:0,target:33}],active:"default",vibrate:false};}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function active(){return state.items.find(x=>x.id===state.active)||state.items[0];}
function render(){
 const item=active();if(!item)return;
 $("dhikrName").value=item.name;
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
$("dhikrName").addEventListener("change",e=>{const x=active();x.name=e.target.value.trim()||"Zikir";save();render();});
$("dhikrTarget").addEventListener("change",e=>{const n=Math.max(1,Math.min(100000,Number(e.target.value)||33));active().target=n;save();render();});
$("dhikrTap").addEventListener("click",()=>{const x=active();x.count++;save();if(state.vibrate&&navigator.vibrate)navigator.vibrate(25);render();});
$("dhikrUndo").addEventListener("click",()=>{const x=active();x.count=Math.max(0,x.count-1);save();render();});
$("dhikrReset").addEventListener("click",()=>{const x=active();x.count=0;save();render();});
$("vibrationToggle").addEventListener("change",e=>{state.vibrate=e.target.checked;save();});
$("addDhikr").addEventListener("click",()=>{const name=$("newDhikrName").value.trim();if(!name){$("newDhikrName").focus();return;}const x={id:"d"+Date.now(),name,count:0,target:33};state.items.push(x);state.active=x.id;$("newDhikrName").value="";save();render();});
render();
})();