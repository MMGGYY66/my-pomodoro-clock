const progressBar = document.querySelector(".outer-circle");
const minutesTag = document.querySelector("#minutes");
const secondsTag = document.querySelector("#seconds");
const startStop = document.querySelector("#start-stop");
const setTimer = document.querySelector("#setting");

let minutes = document.querySelector("#minutes").innerHTML;
let seconds = document.querySelector("#seconds").innerHTML;
let progress = null;
let progressStart = 0;
let progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
  
let speed = 1000;
let degreesChange = 360 / progressEnd;
let toggleSettings = false;
let remainingSeconds = 0;
let remainingMinutes = 0;

function progressTrack() {
  progressStart++;

  remainingSeconds = Math.floor((progressEnd - progressStart) % 60);
  remainingMinutes = Math.floor((progressEnd - progressStart) / 60);

  secondsTag.innerHTML = remainingSeconds.toString().length == 2 ? remainingSeconds : `0${remainingSeconds}`;
  minutesTag.innerHTML = remainingMinutes.toString().length == 2 ? remainingMinutes : `0${remainingMinutes}`;

  progressBar.style.background = `conic-gradient(
        #9d0000 ${progressStart * degreesChange}deg,
        #17171a ${progressStart * degreesChange}deg
      )`;
  if (progressStart == progressEnd) {
    progressBar.style.background = `conic-gradient(
        #00aa51 360deg,
        #00aa51 360deg
      )`;
    clearInterval(progress);
    startStop.innerHTML = "START";
    progress = null;
    progressStart = 0;
  }
}

function startStopProgress() {
  if (!progress) {
    progress = setInterval(progressTrack, speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.background = `conic-gradient(
        #17171a 360deg,
        #17171a 360deg
      )`;
  }
}

function resetValues() {
  if (progress) {
    clearInterval(progress);
  }
  minutes = document.querySelector("#minutes").innerHTML;
  seconds = document.querySelector("#seconds").innerHTML;
  toggleSettings = false;
  minutesTag.contentEditable = false;
  minutesTag.style.borderBottom = `none`;
  secondsTag.contentEditable = false;
  secondsTag.style.borderBottom = `none`;
  progress = null;
  progressStart = 0;
  progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
  degreesChange = 360 / progressEnd;
  progressBar.style.background = `conic-gradient(
        #17171a 360deg,
        #17171a 360deg
      )`;
}


startStop.onclick = () => {
  if (startStop.innerHTML === "START") {
    if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
      startStop.innerHTML = "STOP";
      startStopProgress();
    } else {
      alert("Enter the Time Value in your Timer!");
    }
  } else {
    startStop.innerHTML = "START";
    startStopProgress();
  }
};

setTimer.onclick = function () {
  if (!toggleSettings) {
    toggleSettings = true;
    minutesTag.contentEditable = true;
    minutesTag.style.borderBottom = `1px dashed #ffffff50`;
    secondsTag.contentEditable = true;
    secondsTag.style.borderBottom = `1px dashed #ffffff50`;
  } else {
    resetValues();
  }
};

minutesTag.onblur = function () {
  resetValues();
};

secondsTag.onblur = function () {
  resetValues();
};