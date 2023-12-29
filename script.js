let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songitem"));
let songs = [
  {
    songName: "chaturbhujam sri jagannath",
    filePath: "A.mp3",
    coverPath:
      "https://images.news18.com/ibnlive/uploads/2023/06/jagannath-puri-rath-yatra-2023-history-significance-16872264263x2.jpg",
  },
  {
    songName: "Ek Dantaya BakraTundaya",
    filePath: "B.mp3",
    coverPath:
      "https://images.bhaskarassets.com/thumb/1800x1800/web2images/521/2019/08/30/0521_ganesh_ji_23.jpg",
  },
  {
    songName: "Karpura Gouram karunavataram",
    filePath: "C.mp3",
    coverPath:
      "http://3.bp.blogspot.com/-4qAERoiiquk/UhYGTZKqymI/AAAAAAAABOs/rVdbVuxCU4o/s1600/shankar-bhagwan-wallpaper-free-downl.jpg",
  },
];

// For all songs dynamically
songItems.forEach((element, i) => {
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
});

// Handle play or pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.src = songs[songIndex].filePath; // Set the current song
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

// Listen to the timeupdate event
audioElement.addEventListener("timeupdate", () => {
  // Progress bar
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value / 100) * audioElement.duration;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, index) => {
    element.addEventListener("click", () => {
      makeAllPlays();
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      audioElement.src = songs[index].filePath;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      songIndex = index; // Update the current song index
    });
  }
);

// Forward and backward buttons
document.querySelector(".fa-step-forward").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSelectedSong();
});

document.querySelector(".fa-step-backward").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSelectedSong();
}); 

function playSelectedSong() {
  makeAllPlays();
  const playButton = document.getElementById(songIndex + 1);
  playButton.classList.remove("fa-play-circle");
  playButton.classList.add("fa-pause-circle");
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
}
