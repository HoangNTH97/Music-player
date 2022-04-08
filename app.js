const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const image = $('.music-thumb');
const song = $('#music-song');
const playButton = $('.music-controls-play-inner');
const playBtn = $('.music-controls-play-inner-play');
const pauseBtn = $('.music-controls-play-inner-pause');
const prevBtn = $('.music-controls-prev');
const nextBtn = $('.music-controls-next');
let isPlaying = true;
let indexSong = 0;
const musics = [
  'Chay-Ve-Noi-Phia-Anh-Khac-Viet-1.mp3',
  'Chay-Ve-Khoc-Voi-Anh-ERIK-2.mp3',
  'Bao-Gio-Ket-Hon-Ly-Tuan-Kiet-The-Minh-3.mp3',
  'Phai-Dau-Cuoc-Tinh-Bich-Phuong-4.mp3',
];


song.setAttribute("src", `./music/${musics[indexSong]}`);
nextBtn.addEventListener('click', () => {
  changeSong(1);
});
prevBtn.addEventListener('click', () => {
  changeSong(-1);
});

function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++; // nhớ là viết cái này trước mới viết điều kiện
    if (indexSong >= musics.length) indexSong = 0;

    isPlaying = true; // gán cái này vào để nó luôn play khi next bài
  } else if (dir === -1) {
    indexSong--;
    if (indexSong < 0) indexSong = musics.length - 1;

    isPlaying = true; // tương tự với prev
  }
  song.setAttribute("src", `./music/${musics[indexSong]}`); // add đường dẫn vào thẻ html
  playPause();
}



playButton.addEventListener('click', playPause);
document.addEventListener('keydown', keyEvent);

function playPause() {
  if (isPlaying) {
    song.play();
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    image.classList.add('rotate');

    // Ngoài cách trên ta còn có thể gán nó cho cả đoạn html
    // playButton.innerHTML = `<ion-icon name="pause" class="music-controls-play-inner-pause"></ion-icon>`;
    isPlaying = false;
  } else {
    song.pause();
    pauseBtn.classList.add('hide');
    playBtn.classList.remove('hide');
    image.classList.remove('rotate');

    // playButton.innerHTML = `<ion-icon name="play" class="music-controls-play-inner-play"></ion-icon>`;
    isPlaying = true;
  }
}
function keyEvent(e) {
  if ((e.keyCode === 32 || e.keyCode === 13) && isPlaying) {
    song.play();
    // playBtn.classList.add('hide');
    // pauseBtn.classList.remove('hide');

    playButton.innerHTML = `<ion-icon name="pause" class="music-controls-play-inner-pause"></ion-icon>`;

    isPlaying = false;
  } else {
    song.pause();
    // pauseBtn.classList.add('hide');
    // playBtn.classList.remove('hide');

    playButton.innerHTML = `<ion-icon name="play" class="music-controls-play-inner-play"></ion-icon>`;

    isPlaying = true;
  }
}

