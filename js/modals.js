// PEN https://codepen.io/popmotion/pen/aEoqEG?editors=0010

const openModalButton = $('.open-modal');
const cancelModalButton = $('.modal-cancel');
const replayModalButton = $('.modal-replay');

const modalShade = styler(document.querySelector('.modal-shade'));

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
    board.cleanBoard();
    initGame();
    startGame();
  //}, 500);
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

//listen(openModalButton, 'click').start(openModal);

cancelModalButton.each((i,e)=> {
  listen(e, 'click').start(cancelModal);
});

replayModalButton.each((i,e)=> {
  listen(e, 'click').start(replayModal);
});