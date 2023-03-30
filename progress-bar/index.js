
// containers
const progressBar = document.getElementById('progressBar');
const showProgressContainer = document.getElementById('showProgressContainer');

// buttons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// other
const TIMMER_WAIT = 500;
let progressPercent = 0;
let isProgressRunning = false;

// added listeners
startBtn.addEventListener('click', handleStartPgress);
stopBtn.addEventListener('click', handleStopPgress);

function handleStartPgress() {
  isProgressRunning = true;
  startBtn.disabled = true;
  startBtn.innerHTML = 'Start';
  startBtn.style = `cursor: not-allowed`;
  stopBtn.disabled = false;
  stopBtn.style = `cursor: pointer`;
  runProgress();
}

function handleStopPgress() {
  isProgressRunning = false;
  stopBtn.disabled = true;
  stopBtn.style = `cursor: not-allowed`;
  startBtn.innerHTML = 'Resume';
  startBtn.disabled = false;
  startBtn.style = `cursor: pointer`;
}


function runProgress() {
  if (isProgressRunning) {
    if (progressPercent < 100) {
      progressPercent += 1;

      // update UI
      progressBar.style = `width: ${progressPercent}%`;
      showProgressContainer.innerHTML = `${progressPercent} %`;

      setTimeout(() => {
        runProgress();
      }, TIMMER_WAIT);
    }
  }
}