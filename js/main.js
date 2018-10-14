// GLOBAL VARIABLES ----------------------------
var startedGame, timer, board = undefined;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOUNDARY = 'BOUNDARY';
const SHRINK = 'SHRINK';
const SHOOT = 'SHOOT';
const PAUSE_BUTTON = 'PAUSE_BUTTON';

var PAUSE = false;
var LIMIT = false;
const SLINKY = 's';


const WALL = 'w';
const BONUS = 'b';
const BADGUY = 'bg'

const RHYTHM = 100;
const rows = 25;
const cols = 50;
function oppositeDir(dir){
  switch(dir){
    case RIGHT:
      return LEFT;
    case LEFT:
      return RIGHT;
    case UP:
      return DOWN;
    case DOWN:
      return UP;
    default:
      return undefined;
  }
}

$(document).ready(function() {


// GRID ONCLICK --------------------------------

$('#guides').change(function() {
  if(this.checked) {
    for (let i = 0; i <= 100; i = i+2 ) {
      x1 = 'x1="' + i + '"';
      x2 = 'x2="' + i + '"';
      y1 = 'y1="0"';
      y2 = 'y2="50"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    for (let i = 0; i <= 50; i = i+2 ) {
      x1 = 'x1="0"';
      x2 = 'x2="100"';
      y1 = 'y1="' + i + '"';
      y2 = 'y2="' + i + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    $gameBoard.html($gameBoard.html());
  } else {
    $('.line').remove();
  }
});

function codeToDirection(key){
  switch(key){
    case 38:
      return UP;
    case 40:
      return DOWN;
    case 37:
      return LEFT;
        return;
    case 39:
      return RIGHT;
    case 32:
        return SHOOT;
    case 80:
        return PAUSE_BUTTON;
    //ESC === 27
    //P === 80
    default:
      return undefined;
  }
}



// MOVEMENT ----------------------------------


function initListeners(user) {
  $(document).keydown((e)=> {
    startedGame = true;
    direction = codeToDirection(e.keyCode);
    // console.error(user.shrinking, direction, user.direction, user.oldDirection)
    if (!direction /*|| (user.shrinking && direction === user.oldDirection && user.oldDirection === user.direction &&  user.bones.length > 0)*/)  {
      return;
    } else if (direction === "SHOOT") {
      user.shoot();
    } else if (direction === "PAUSE") {
      PAUSE = !PAUSE;
    } else {
      if (user.shrinking !== direction) {
        // console.error(2)

      user.direction = direction;
      user.directionsLog.push(user.direction);
      user.prevDirection();
      }
      
    }
  });

  timer = setInterval(()=>{
    if(!PAUSE){

      switch (user.direction) {
        case UP:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(0,-2); //growUp
          }
          break;
        case DOWN:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(0,2); //growDown
          }
          break;
        case LEFT:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(-2,0); //growLeft
          }
          break;
        case RIGHT:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(2,0); //growRight
          }
          break;
      }
      // console.log(user.oldDirection, user.direction);
    }


  }, RHYTHM);
}


// START GAME ----------------------------------

function startGame() {

  board = new GameBoard();
  board.createGrid();
  //console.log(board);

  let user = new User('scully', 3, 2);
  user.initUser();
  initListeners(user);

  //REFRESH SVG IN DOM to paint the forms created from jQuery
  //$gameBoard.html($gameBoard.html());
};

startGame();
// $("#startButton").click(function() {
//   startGame();
// });


});
