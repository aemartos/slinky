// PEN https://codepen.io/popmotion/pen/aEoqEG?editors=0010

const settingsModalButton = $('.settings-button');
const modalButtonCross = $('.cross-close');
const saveModalButton = $('.modal-save');
const playModalButton = $('.modal-play');
const cancelModalButton = $('.modal-cancel');
const replayModalButton = $('.modal-replay');

const modalShade = styler(document.querySelector('.modal-shade'));

const modalStart = document.querySelector('.modalStart');
const modalSettings = document.querySelector('.modalSettings');
const modalLose = document.querySelector('.modalLose');
const modalWin = document.querySelector('.modalWin');
const modalInfo = document.querySelector('.modalInfo');
const modalPause = document.querySelector('.modalPause');
const modal = styler(document.querySelector('.modal'));
const modalContainer = $('.modal-container').map((i,e)=>{return styler(e)});

let modalSections = [];
let sectionLabels = [];


const selectChildren = (modall) => {
  modalSections = Array.from(modall.children).map(styler);
  sectionLabels = modalSections.map((s, i) => 'section' + i);
};

const tweenUp = (track, duration = 500, yFrom = 100) => ({
  track,
  duration,
  from: { y: yFrom, opacity: 0 },
  to: { y: 0, opacity: 1 },
  ease: { y: easing.backOut, opacity: easing.linear }
});

const setStylers = (v) => {
  if (v.shade !== undefined) modalShade.set('opacity', v.shade);
  if (v.modal !== undefined) modal.set(v.modal);
  sectionLabels.forEach((label, i) => {
    if (v[label] !== undefined) modalSections[i].set(v[label])
  });
};

const showContainers = (modall) => {
  modalShade.set('display', 'block');
  styler(modall).set('display', 'flex');
};

const hideContainers = () => {
  modalShade.set('display', 'none');
  modalContainer.map((i,e)=> {e.set('display', 'none')});
};

const openModal = (modall) => {
  if (board && board.area) {
    music.pause();
    guidesOn();
    board.area.html(board.area.html());
  }
  selectChildren(modall);
  showContainers(modall);
  timeline([
    { track: 'shade', from: 0, to: 1, ease: easing.linear },
    '-100',
    tweenUp('modal'),
    '-200',
    [...modalSections.map((s, i) => tweenUp(sectionLabels[i], 300, 50)), 50]
  ]).start(setStylers);
}

const cancelModal = () => {
  if (board && board.area) {
    music.play();
    guidesOff();
    board.area.html(board.area.html());
  }
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: 100, opacity: 0 },
      ease: { y: easing.easeIn, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 200 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}

const replayModal = () => {
  //setTimeout(()=>{
    //location.reload();
    // board.cleanBoard();
    // initGame();
    reStartGame();
    music.currentTime=0;
    music.play();
  //}, 500);
  okModal();
}

const okModal = () => {
  if (board && board.area) {
    guidesOff();
    board.area.html(board.area.html());
  }
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: -200, opacity: 0 },
      ease: { y: easing.easeOut, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 300 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}


playModalButton.each((i,e)=> {
  listen(e, 'click').start(okModal);
});

settingsModalButton.click(function() {
  PAUSE = true;
  openModal(modalSettings);
});

modalButtonCross.click(function() {
  PAUSE = false;
  cancelModal();
});

cancelModalButton.each((i,e)=> {
  listen(e, 'click').start(cancelModal);
});

cancelModalButton.click(function() {
  setTimeout(()=>{location.reload();}, 300);
});

replayModalButton.each((i,e)=> {
  listen(e, 'click').start(replayModal);
});
