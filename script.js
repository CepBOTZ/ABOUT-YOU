const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
let isPlaying = false;
let heartInterval;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function startFloatingHearts() {
  const container = document.getElementById('floating-hearts-container');
  heartInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';

    // Posisi random horizontal
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;

    container.appendChild(heart);

    // Auto hapus setelah 5 detik
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }, 300); // tambahkan 1 heart tiap 300ms
}

function stopFloatingHearts() {
  clearInterval(heartInterval);
  document.getElementById('floating-hearts-container').innerHTML = '';
}


function playMusic() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';

  // Efek hati acak seketika
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createHeartParticle(x, y);
  }
  startFloatingHearts(); // mulai animasi hati
  showLoveText()
}


function pauseMusic() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  stopFloatingHearts(); // hentikan animasi hati
}

function createHeartParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.innerHTML = '❤️';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  document.getElementById('particles-container').appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1500);
}

function showLoveText() {
  const loveText = document.getElementById('love-text');
  loveText.style.animation = 'none'; // reset
  void loveText.offsetWidth; // force reflow
  loveText.style.animation = 'loveFade 2s ease forwards';
}


playBtn.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
});

// Seek when progress bar is changed
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Saat metadata audio tersedia (durasi lengkap)
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Update waktu saat audio diputar
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  stopFloatingHearts(); // hentikan saat selesai
});
