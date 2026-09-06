const video = document.getElementById("video");
const message = document.getElementById("message");
const nameEl = document.getElementById("channelName");
const statusEl = document.getElementById("status");
const buttons = [...document.querySelectorAll(".channel")];
const fullscreenBtn = document.getElementById("fullscreenBtn");
let hls = null;

function setStatus(text, live=false){
  statusEl.textContent = "● " + text;
  statusEl.classList.toggle("live", live);
}

function playChannel(url, name, button){
  buttons.forEach(b => b.classList.remove("active"));
  if(button) button.classList.add("active");
  nameEl.textContent = name;
  message.style.display = "none";
  setStatus("Connecting…");

  if(hls){ hls.destroy(); hls=null; }
  video.pause();
  video.removeAttribute("src");
  video.load();

  if(window.Hls && Hls.isSupported()){
    hls = new Hls({enableWorker:true});
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setStatus("Live", true);
      video.play().catch(()=>{});
    });
    hls.on(Hls.Events.ERROR, (_, data) => {
      if(data.fatal){
        setStatus("Stream error");
        message.textContent = "Unable to play this stream. The server may block browser playback (CORS/HTTP).";
        message.style.display = "grid";
      }
    });
  } else if(video.canPlayType("application/vnd.apple.mpegurl")){
    video.src = url;
    video.addEventListener("loadedmetadata",()=>{setStatus("Live",true);video.play().catch(()=>{});},{once:true});
    video.addEventListener("error",()=>setStatus("Stream error"),{once:true});
  } else {
    setStatus("Unsupported browser");
  }
}

buttons.forEach(btn => btn.addEventListener("click", () =>
  playChannel(btn.dataset.url, btn.dataset.name, btn)
));

video.addEventListener("playing",()=>setStatus("Live",true));
video.addEventListener("waiting",()=>setStatus("Buffering…"));
video.addEventListener("pause",()=>{ if(!video.ended) setStatus("Paused"); });

fullscreenBtn.addEventListener("click", async () => {
  const target = document.querySelector(".player-wrap");
  if(document.fullscreenElement) await document.exitFullscreen();
  else await target.requestFullscreen();
});

document.addEventListener("DOMContentLoaded", () => {
  // Do not autoplay by default; click the channel to start.
});
