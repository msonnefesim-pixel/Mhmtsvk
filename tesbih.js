(()=>{"use strict";
const KEY="quran-tesbih-v1";
const $=id=>document.getElementById(id);
const countNode=$("tesbihCount");
const beadsNode=$("tesbihBeads");
const hand=$("tesbihHand");
const tap=$("tesbihTap");
const reset=$("tesbihReset");
if(!countNode||!beadsNode||!hand||!tap||!reset)return;
let count=0;
try{count=Math.max(0,Number(JSON.parse(localStorage.getItem(KEY)||"0"))||0);}catch{}
const NS="http://www.w3.org/2000/svg";
const total=33,cx=150,cy=116,rx=112,ry=76;
const beads=[];
for(let i=0;i<total;i++){
 const angle=(-Math.PI/2)+(i/total)*Math.PI*2;
 const circle=document.createElementNS(NS,"circle");
 circle.setAttribute("cx",String(cx+Math.cos(angle)*rx));
 circle.setAttribute("cy",String(cy+Math.sin(angle)*ry));
 circle.setAttribute("r",i===0?"7":"6");
 circle.setAttribute("class","tesbih-bead"+(i===0?" tesbih-marker":""));
 circle.setAttribute("aria-hidden","true");
 beadsNode.append(circle);beads.push(circle);
}
function render(){
 countNode.textContent=String(count);
 $("tesbihProgress").textContent=(count%99|| (count>0?99:0))+" / 99";
 $("tesbihRounds").textContent=Math.floor(count/33);
 const active=count===0? -1:(count-1)%33;
 beads.forEach((bead,i)=>{bead.classList.toggle("is-current",i===active);bead.classList.toggle("is-passed",active>=0&&i<=active);});
 $("tesbihProgressBar").style.width=(count%99===0&&count>0?100:(count%99)/99*100)+"%";
 $("tesbihNext").textContent=count>=99?"99 tamamlandı · Maşallah":"Sıradaki hedef: "+(count<33?33:count<66?66:99);
 tap.disabled=count>=99;
 tap.textContent=count>=99?"99 TAMAMLANDI · SIFIRLA":"📿  TESBİH ÇEK";
}
function animate(){
 hand.classList.remove("is-moving");
 void hand.getBoundingClientRect();
 hand.classList.add("is-moving");
 beadsNode.classList.remove("is-pulsing");
 void beadsNode.getBoundingClientRect();
 beadsNode.classList.add("is-pulsing");
}
tap.addEventListener("click",()=>{
 if(count>=99)return;
 count++;
 try{localStorage.setItem(KEY,JSON.stringify(count));}catch{}
 animate();
 if((count===33||count===66||count===99)&&navigator.vibrate)navigator.vibrate([120,55,120]);
 render();
});
reset.addEventListener("click",()=>{
 count=0;
 try{localStorage.setItem(KEY,"0");}catch{}
 render();animate();
});
render();
})();