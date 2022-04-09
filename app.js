const $ = document.querySelector.bind(document);

const images = $(".music-thumb img");
const titles = $(".music-infomation h3");
const singer = $(".music-infomation h4");
const song = $("#music-song");
const playButton = $(".music-controls-play-inner");
const playBtn = $(".music-controls-play-inner-play");
const pauseBtn = $(".music-controls-play-inner-pause");
const prevBtn = $(".music-controls-prev");
const nextBtn = $(".music-controls-next");
const durationTime = $(".music-timer-duration");
const remainingTime = $(".music-timer-remaining");
const inputRange = $(".music-range");
let isPlaying = true;
let indexSong = 0;
// const musics = [
//   'Chay-Ve-Noi-Phia-Anh-Khac-Viet-1.mp3',
//   'Chay-Ve-Khoc-Voi-Anh-ERIK-2.mp3',
//   'Bao-Gio-Ket-Hon-Ly-Tuan-Kiet-The-Minh-3.mp3',
//   'Phai-Dau-Cuoc-Tinh-Bich-Phuong-4.mp3',
// ];
/**
 * musics:
 * id: 1
 * title: Holo
 * src: Holo.mp3
 * image: unsplash
 */

const musics = [
  {
    id: 1,
    title: "Chạy về nơi phía anh",
    singer: "Khắc Việt",
    src: "Chay-Ve-Noi-Phia-Anh-Khac-Viet-1.mp3",
    image:
      "https://images.unsplash.com/photo-1511525499366-bc3f823bacb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    title: "Chạy về khóc với anh",
    singer: "ERIK",
    src: "Chay-Ve-Khoc-Voi-Anh-ERIK-2.mp3",
    image:
      "https://images.unsplash.com/photo-1628082878598-ed6b930efb74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    title: "Bao giờ kết hôn",
    singer: "Lý Tuấn Kiệt",
    src: "Bao-Gio-Ket-Hon-Ly-Tuan-Kiet-The-Minh-3.mp3",
    image:
      "https://images.unsplash.com/photo-1613313954821-f52621b02c26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
  },
  {
    id: 4,
    title: "Phai dấu cuộc tình",
    singer: "Bích Phương",
    src: "Phai-Dau-Cuoc-Tinh-Bich-Phuong-4.mp3",
    image:
      "https://images.unsplash.com/photo-1591005680043-1fd6ca4b5985?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
];

images.setAttribute("src", musics[indexSong].image);
titles.textContent = musics[indexSong].title;
singer.textContent = musics[indexSong].singer;
song.setAttribute("src", `./music/${musics[indexSong].src}`);
nextBtn.addEventListener("click", () => {
  changeSong(1);
});
prevBtn.addEventListener("click", () => {
  changeSong(-1);
});

song.addEventListener("ended", handleEndedSong);
playButton.addEventListener("click", playPause);
document.addEventListener("keydown", keyEvent)



function handleEndedSong() {
  if (indexSong < musics.length -1) {
    changeSong(1);
  } else {
    playPause();
  }
  
  
} // Ta cần phải viết như này vì khi nào cần nó mới chạy, nếu viết thẳng vào thì nó sẽ luôn được gọi và nó sẽ chạy


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
  images.setAttribute("src", musics[indexSong].image);
  titles.textContent = musics[indexSong].title;
  singer.textContent = musics[indexSong].singer;
  song.setAttribute("src", `./music/${musics[indexSong].src}`); // add đường dẫn vào thẻ html
  playPause();
}

;

function playPause() {
  if (isPlaying) {
    song.play();
    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
    images.classList.add("rotate");

    // Ngoài cách trên ta còn có thể gán nó cho cả đoạn html
    // playButton.innerHTML = `<ion-icon name="pause" class="music-controls-play-inner-pause"></ion-icon>`;
    isPlaying = false;
  } else {
    song.pause();
    pauseBtn.classList.add("hide");
    playBtn.classList.remove("hide");
    images.classList.remove("rotate");

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

function displayTimer() {
  const { duration, currentTime } = song;
  inputRange.max = duration;
  inputRange.value = currentTime;
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }

  if (!currentTime) {
    remainingTime.textContent = "00:00";
  } else {
    remainingTime.textContent = formatTimer(currentTime);
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.round(number % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
setInterval(displayTimer, 800);

inputRange.addEventListener("change", handleChangeRange);
function handleChangeRange() {
  song.currentTime = inputRange.value;
  // inputRange.value là giá trị (vị trí trên thanh input)
}
