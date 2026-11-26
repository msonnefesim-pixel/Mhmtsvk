// Sure dinleme: hız ayarı, kaldığın yerden devam ve tekrar başlatma.
(function(){
  const names=["Fâtiha","Bakara","Âl-i İmrân","Nisâ","Mâide","En'âm","A'râf","Enfâl","Tevbe","Yûnus","Hûd","Yûsuf","Ra'd","İbrâhim","Hicr","Nahl","İsrâ","Kehf","Meryem","Tâhâ","Enbiyâ","Hac","Mü'minûn","Nûr","Furkân","Şuarâ","Neml","Kasas","Ankebût","Rûm","Lokmân","Secde","Ahzâb","Sebe","Fâtır","Yâsîn","Sâffât","Sâd","Zümer","Mü'min (Gâfir)","Fussilet","Şûrâ","Zuhruf","Duhân","Câsiye","Ahkâf","Muhammed","Fetih","Hucurât","Kâf","Zâriyât","Tûr","Necm","Kamer","Rahmân","Vâkıa","Hadîd","Mücâdele","Haşr","Mümtehine","Saff","Cuma","Münâfikûn","Tegâbün","Talâk","Tahrîm","Mülk","Kalem","Hâkka","Meâric","Nûh","Cin","Müzzemmil","Müddessir","Kıyâmet","İnsan","Mürselât","Nebe","Nâziât","Abese","Tekvîr","İnfitâr","Mutaffifîn","İnşikâk","Bürûc","Târık","A'lâ","Gâşiye","Fecr","Beled","Şems","Leyl","Duhâ","İnşirâh","Tîn","Alak","Kadr","Beyyine","Zilzâl","Âdiyât","Kâria","Tekâsür","Asr","Hümeze","Fîl","Kureyş","Mâûn","Kevser","Kâfirûn","Nasr","Tebbet (Mesed)","İhlâs","Felak","Nâs"];
  const STORAGE_KEY="quran-listen-progress-v1";
  const SPEED_KEY="quran-listen-speed-v1";
  function init(){
    const select=document.getElementById("listenSurahSelect");
    const player=document.getElementById("listenAudio");
    const title=document.getElementById("listenTrackTitle");
    const status=document.getElementById("listenStatus");
    const previous=document.getElementById("listenPrevious");
    const next=document.getElementById("listenNext");
    const speed=document.getElementById("listenSpeed");
    const restart=document.getElementById("listenRestart");
    if(!select||!player||!title||!status||!previous||!next||!speed||!restart)return;
    if(!select.options.length)names.forEach((name,index)=>{
      const option=document.createElement("option");option.value=String(index+1);option.textContent=(index+1)+". "+name;select.append(option);
    });
    function readProgress(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");}catch{return null;}}
    function saveProgress(){if(!player.src||!Number.isFinite(player.currentTime))return;localStorage.setItem(STORAGE_KEY,JSON.stringify({surah:Number(select.value||1),time:player.currentTime}));}
    let restoreTime=0;
    function loadTrack(autoplay,restore=true){
      const number=Number(select.value||1);
      const saved=readProgress();
      restoreTime=restore&&saved&&saved.surah===number?Math.max(0,Number(saved.time)||0):0;
      title.textContent=(names[number-1]||"Sure")+" Suresi";
      player.pause();player.src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/"+number+".mp3";player.load();
      player.playbackRate=Number(speed.value)||1;
      localStorage.setItem(STORAGE_KEY,JSON.stringify({surah:number,time:restoreTime}));
      status.textContent=restoreTime>0?"Kaldığın yer hazırlanıyor…":"Tilavet hazır. Dinlemek için oynat tuşuna bas.";
      player.addEventListener("loadedmetadata",function restore(){player.removeEventListener("loadedmetadata",restore);if(restoreTime>0&&Number.isFinite(player.duration)){player.currentTime=Math.min(restoreTime,Math.max(0,player.duration-1));status.textContent="Kaldığın yerden devam edebilirsin.";}if(autoplay)player.play().catch(()=>status.textContent="Oynatmak için ses çubuğundaki tuşa dokun.");},{once:true});
    }
    if(!select.dataset.ready){
      select.addEventListener("change",()=>loadTrack(false,false));
      previous.addEventListener("click",()=>{select.selectedIndex=Math.max(0,select.selectedIndex-1);loadTrack(true,false);});
      next.addEventListener("click",()=>{select.selectedIndex=Math.min(select.options.length-1,select.selectedIndex+1);loadTrack(true,false);});
      speed.addEventListener("change",()=>{player.playbackRate=Number(speed.value)||1;localStorage.setItem(SPEED_KEY,speed.value);});
      restart.addEventListener("click",()=>{if(!player.src){loadTrack(true,false);return;}player.currentTime=0;localStorage.setItem(STORAGE_KEY,JSON.stringify({surah:Number(select.value||1),time:0}));player.play().then(()=>status.textContent="Sure baştan tekrar çalınıyor.").catch(()=>status.textContent="Tekrar başlatıldı. Oynat tuşuna dokun.");});
      player.addEventListener("timeupdate",()=>{if(!player.paused&&Math.floor(player.currentTime)%3===0)saveProgress();});
      player.addEventListener("pause",saveProgress);
      player.addEventListener("playing",()=>status.textContent="Şu anda dinleniyor.");
      player.addEventListener("waiting",()=>status.textContent="Ses yükleniyor…");
      player.addEventListener("ended",()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify({surah:Number(select.value||1),time:0}));status.textContent="Sure tamamlandı. İstersen tekrar başlatabilirsin.";});
      player.addEventListener("error",()=>status.textContent="Ses yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.");
      window.addEventListener("pagehide",saveProgress);
      select.dataset.ready="1";
    }
    const saved=readProgress();select.value=String(saved&&saved.surah>=1&&saved.surah<=114?saved.surah:1);
    const savedSpeed=localStorage.getItem(SPEED_KEY)||"1";speed.value=["0.75","1","1.25","1.5"].includes(savedSpeed)?savedSpeed:"1";
    player.playbackRate=Number(speed.value);
    loadTrack(false,true);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
