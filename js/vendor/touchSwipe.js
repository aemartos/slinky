// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
// PEN: https://codepen.io/ganmahmud/pen/RaoKZa

// function swipedetect(el, callback){
//     var touchsurface = el,
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 100, //required min distance traveled to be considered swipe
//     restraint = 200, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function(swipedir){}

//     touchsurface.addEventListener('touchstart', function(e){
//         var touchobj = e.changedTouches[0];
//         swipedir = undefined;
//         dist = 0;
//         startX = touchobj.pageX;
//         startY = touchobj.pageY;
//         startTime = new Date().getTime(); // record time when finger first makes contact with surface
//         e.preventDefault();
//     }, false);

//     touchsurface.addEventListener('touchmove', function(e){
//         e.preventDefault(); // prevent scrolling when inside DIV
//     }, false);

//     touchsurface.addEventListener('touchend', function(e){
//         var touchobj = e.changedTouches[0];
//         distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
//         distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
//         elapsedTime = new Date().getTime() - startTime; // get time elapsed
//         if (elapsedTime <= allowedTime){ // first condition for awipe met
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
//                 swipedir = (distX < 0)? 'LEFT' : 'RIGHT'; // if dist traveled is negative, it indicates LEFT swipe
//             }
//             else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
//                 swipedir = (distY < 0)? 'UP' : 'DOWN'; // if dist traveled is negative, it indicates UP swipe
//             }
//         }
//         handleswipe(swipedir);
//         e.preventDefault();
//     }, false);
// }


//https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

function swipeDetect(el, callback){
  let element = el || document;

  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    xDown = getTouches(evt)[0].clientX;
    yDown = getTouches(evt)[0].clientY;
  };

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
          callback('LEFT');
      } else {
          callback('RIGHT');
      }
    } else {
      if ( yDiff > 0 ) {
          callback('UP');
      } else {
          callback('DOWN');
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
}
