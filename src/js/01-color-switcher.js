const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
refs.stopBtn.setAttribute('disabled', 'true');

const SWITCH_INTERVAL = 500;
let bgSwitcherId = null;

refs.startBtn.addEventListener('click', onStartSwitcher);
refs.stopBtn.addEventListener('click', onStopSwitcher);

function onStartSwitcher() {
  bgSwitcherStart();
  switchDisabled();
}

function onStopSwitcher() {
  bgSwitcherStop();
  switchDisabled();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bgSwitcherStart() {
  bgSwitcherId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, SWITCH_INTERVAL);
}

function bgSwitcherStop() {
  clearInterval(bgSwitcherId);
}

function switchDisabled() {
  if (refs.startBtn.hasAttribute('disabled')) {
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', 'true');
  } else {
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', 'true');
  }
}
