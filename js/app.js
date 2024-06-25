const musicContainer = document.getElementById("contenedor-musica");
const playButton = document.getElementById("reproducir");
const prevButton = document.getElementById("anterior");
const nextButton = document.getElementById("siguiente");
const audio = document.getElementById("audio");
const progress = document.getElementById("progreso");
const progressContainer = document.getElementById("contenedor-progreso");
const title = document.getElementById("titulo");
const cover = document.getElementById("portada");

const songs = ["amalgam", "forher", "movement"];
let songIndex = 1;

function getSongTitle(song) {
  return song.charAt(0).toUpperCase() + song.slice(1);
}

function loadSong(song) {
  title.innerText = getSongTitle(song);
  audio.src = `https://github.com/josecondori-ai/ReproductordeMusica/blob/main/audio/${song}.mp3?raw=true`;

  cover.src = `https://github.com/josecondori-ai/ReproductordeMusica/blob/main/portadas/${song}.jpg?raw=true`;
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.bi").classList.remove("bi-play-fill");
  playButton.querySelector("i.bi").classList.add("bi-pause-fill");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.bi").classList.remove("bi-pause-fill");
  playButton.querySelector("i.bi").classList.add("bi-play-fill");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Init
loadSong(songs[songIndex]);
