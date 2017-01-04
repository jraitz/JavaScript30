/* get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const toggleFull = player.querySelector('.toggleFullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // video[video.paused ? 'play' : 'pause']();

  // if(video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateButton () {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let isFullscreen = false;
function toggleFullscreen() {
  if (!document.fullscreenElement ||
      !document.webkitFullscreenElement ||
      !document.mozFullScreenElement ||
      !document.msFullscreenElement) {
    if (video.requestFullscreen) {
    	video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
    	video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
    	video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
    	video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  console.log('clickedFull');
}

// hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggleFull.addEventListener('click', toggleFullscreen);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));

toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
