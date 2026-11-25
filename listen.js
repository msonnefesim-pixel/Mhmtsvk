// Dinle sayfası: ana uygulamadan bağımsız güvenli gezinme ve ses oynatıcı.
(function(){
  const names=["Fâtiha","Bakara","Âl-i İmrân","Nisâ","Mâide","En'âm","A'râf","Enfâl","Tevbe","Yûnus","Hûd","Yûsuf","Ra'd","İbrâhim","Hicr","Nahl","İsrâ","Kehf","Meryem","Tâhâ","Enbiyâ","Hac","Mü'minûn","Nûr","Furkân","Şuarâ","Neml","Kasas","Ankebût","Rûm","Lokmân","Secde","Ahzâb","Sebe","Fâtır","Yâsîn","Sâffât","Sâd","Zümer","Mü'min (Gâfir)","Fussilet","Şûrâ","Zuhruf","Duhân","Câsiye","Ahkâf","Muhammed","Fetih","Hucurât","Kâf","Zâriyât","Tûr","Necm","Kamer","Rahmân","Vâkıa","Hadîd","Mücâdele","Haşr","Mümtehine","Saff","Cuma","Münâfikûn","Tegâbün","Talâk","Tahrîm","Mülk","Kalem","Hâkka","Meâric","Nûh","Cin","Müzzemmil","Müddessir","Kıyâmet","İnsan","Mürselât","Nebe","Nâziât","Abese","Tekvîr","İnfitâr","Mutaffifîn","İnşikâk","Bürûc","Târık","A'lâ","Gâşiye","Fecr","Beled","Şems","Leyl","Duhâ","İnşirâh","Tîn","Alak","Kadr","Beyyine","Zilzâl","Âdiyât","Kâria","Tekâsür","Asr","Hümeze","Fîl","Kureyş","Mâûn","Kevser","Kâfirûn","Nasr","Tebbet (Mesed)","İhlâs","Felak","Nâs"];
  function openListen(){
    document.querySelectorAll(".page").forEach(page=>{
      const visible=page.id==="listenPage";
      page.classList.toggle("active",visible);
      page.style.display=visible?"block":"none";
    });
    document.querySelectorAll(".nav-item").forEach(button=>button.classList.toggle("selected",button.dataset.go==="listen"));
    window.scrollTo(0,0);
  }
  document.addEventListener("click",event=>{
    const button=event.target.closest('[data-go="listen"]');
    if(button)openListen();
  });
  function init(){
    const select=document.getElementById("listenSurahSelect");
    const player=document.getElementById("listenAudio");
    const title=document.getElementById("listenTrackTitle");
    const status=document.getElementById("listenStatus");
    const previous=document.getElementById("listenPrevious");
    const next=document.getElementById("listenNext");
    if(!select||!player||!title||!status||!previous||!next)return;
    if(!select.options.length)names.forEach((name,index)=>{
      const option=document.createElement("option");
      option.value=String(index+1);
      option.textContent=(index+1)+". "+name;
      select.append(option);
    });
    function loadTrack(autoplay){
      const number=Number(select.value||1);
      title.textContent=(names[number-1]||"Sure")+" Suresi";
      player.pause();
      player.src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/"+number+".mp3";
      player.load();
      status.textContent="Tilavet hazır. Dinlemek için oynat tuşuna bas.";
      if(autoplay)player.play().catch(()=>status.textContent="Oynatmak için ses çubuğundaki tuşa dokun.");
    }
    if(!select.dataset.ready){
      select.addEventListener("change",()=>loadTrack(false));
      previous.addEventListener("click",()=>{select.selectedIndex=Math.max(0,select.selectedIndex-1);loadTrack(true);});
      next.addEventListener("click",()=>{select.selectedIndex=Math.min(select.options.length-1,select.selectedIndex+1);loadTrack(true);});
      player.addEventListener("playing",()=>status.textContent="Şu anda dinleniyor.");
      player.addEventListener("waiting",()=>status.textContent="Ses yükleniyor…");
      player.addEventListener("ended",()=>status.textContent="Sure tamamlandı.");
      player.addEventListener("error",()=>status.textContent="Ses yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.");
      select.dataset.ready="1";
    }
    loadTrack(false);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();