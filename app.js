console.log('Welcome to spotify');

//Initailize the variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let mainPlay = document.getElementById('mainPlay');
let rangeBar = document.getElementById('rangeBar');
let gif = document.getElementById('gif');
let mainSongName = document.getElementById('mainSongName');
let songItems = Array.from(document.getElementsByClassName('song-item'));

let songs = [
    { songName: "295", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg" },
    { songName: "GOAT", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg" },
    { songName: "THE LAST RIDE", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg" },
    { songName: "So High", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg" },
    { songName: "Astronaut In The Ocean", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg" },
    { songName: "Sajna", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg" },
    { songName: "Old School Vibe", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg" },
    { songName: "DAKU", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg" },
    { songName: "DROPTOP", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg" },
    { songName: "BROWN MUNDE", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg" },
]

songItems.forEach((element, i) => {
    // console.log(element, i);

    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText = songs[i].songName;
})


// audioElement.play();

//Handle play/pause
mainPlay.addEventListener('click', () => {
    console.log('play/pause');
    if (audioElement.paused || audioElement.currentTime < 0) {
        audioElement.play();
        mainPlay.classList.remove('fa-play-circle');
        mainPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        mainPlay.classList.add('fa-play-circle');
        mainPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }

})

//Liten to Events
audioElement.addEventListener('timeupdate', () => {
    // update seekhbar
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    rangeBar.value = progress;
})

rangeBar.addEventListener('change', () => {
    audioElement.currentTime = rangeBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('song-item-play')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('song-item-play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `./songs/${songIndex + 1}.mp3`;
        mainSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        mainPlay.classList.remove('fa-play-circle');
        mainPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    mainPlay.classList.remove('fa-play-circle');
    mainPlay.classList.add('fa-pause-circle');
})