import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");

  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function reset() {
  let minutes = state.minutes;
  let seconds = state.seconds;

  state.isRunning = false;
  document.documentElement.classList.remove("running");

  timer.updateDisplay(minutes, seconds);
  sounds.buttonPressAudio.play();
}

export function moreMinutes() {
  let minutes = Number(el.minutes.textContent);
  let seconds = Number(el.seconds.textContent);

  minutes += 5;
  minutes = Math.max(minutes, 0);

  timer.updateDisplay(minutes, seconds);

  sounds.buttonPressAudio.play();
}

export function lessMinutes() {
  let minutes = Number(el.minutes.textContent);
  let seconds = Number(el.seconds.textContent);

  minutes -= 5;
  minutes = Math.max(minutes, 0);

  timer.updateDisplay(minutes, seconds);

  sounds.buttonPressAudio.play();
}

export function forestMusic() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  let forest = document.getElementById("forest");
  forest.classList.toggle("clicked");

  if (state.isMute) {
    sounds.forest.play();
    return;
  }
  sounds.forest.pause();
}

export function rainingMusic() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  let raining = document.getElementById("rain");
  raining.classList.toggle("clicked");

  if (state.isMute) {
    sounds.raining.play();
    return;
  }
  sounds.raining.pause();
}

export function cafeteriaMusic() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  let cafeteria = document.getElementById("cafeteria");
  cafeteria.classList.toggle("clicked");

  if (state.isMute) {
    sounds.cafeteria.play();
    return;
  }
  sounds.cafeteria.pause();
}

export function fireplaceMusic() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  let fireplace = document.getElementById("fire");
  fireplace.classList.toggle("clicked");

  if (state.isMute) {
    sounds.fireplace.play();
    return;
  }
  sounds.fireplace.pause();
}
