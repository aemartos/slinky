// PEN https://codepen.io/popmotion/pen/WXybaR

const { keyframes, everyFrame, styler, timeline, listen, easing, tween, crossfade, transform, valueTypes } = window.popmotion;


const logoStyler = styler(document.getElementById('letter_i_dot'));
const startStyler = styler(document.getElementById('startButton'));

// keyframes({
//   values: ['#FF1C68', '#14D790', '#198FE3','#FF1C68'],
//   duration: 10000,
//   ease: easing.linear,
//   loop: Infinity
// }).start(logoStyler.set('fill'));

// keyframes({
//   values: ['#FF1C68', '#14D790', '#198FE3','#FF1C68'],
//   duration: 10000,
//   ease: easing.linear,
//   loop: Infinity
// }).start(startStyler.set('background'));



//PEN https://codepen.io/popmotion/pen/ooPjxj?editors=1010

const blendRedBlue = transform.blendColor('#FF1C68', '#198FE3');

const animateLeft = tween({
  from: 0,
  to: -30,
  ease: easing.easeInOut,
  flip: Infinity,
  duration: 1000
});

const animateRight = tween({
  to: -15,
  ease: easing.easeInOut,
  flip: Infinity,
  duration: 1000
});


const blendedMotion = crossfade(animateLeft, animateRight)
  .start(logoStyler.set('y'));

tween({
  duration: 3333,
  flip: Infinity
}).start((v) => {
  logoStyler.set('background', valueTypes.color.transform(blendRedBlue(v)));
  blendedMotion.setBalance(v);
});
