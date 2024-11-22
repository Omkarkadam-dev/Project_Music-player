const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Songs data
const songs = [
    {
        title: 'Acoustic Breeze',
        artist: 'Benjamin Tissot',
        src: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Acoustic+Breeze'
    },
    {
        title: 'Creative Minds',
        artist: 'Benjamin Tissot',
        src: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Creative+Minds'
    },
    {
        title: 'Sunny',
        artist: 'Benjamin Tissot',
        src: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        cover: 'https://via.placeholder.com/300x300?text=Sunny'
    }
];

let songIndex = 0;

// Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

// Play song
function playSong() {
    audio.play();
    playBtn.textContent = '⏸️';
}

// Pause song
function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
}

// Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.innerText = `${minutes}:${seconds}`;
}

// Set progress bar
function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = audio.paused;
    isPlaying ? playSong() : pauseSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Initialize
loadSong(songs[songIndex]);
