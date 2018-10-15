

$(document).ready(function() {


// GRID ONCLICK --------------------------------

$('#guides').change(function() {
  if(this.checked) {
    for (let i = 0; i <= 152; i = i+2 ) {
      x1 = 'x1="' + i + '"';
      x2 = 'x2="' + i + '"';
      y1 = 'y1="0"';
      y2 = 'y2="76"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      board.area.append(line);
    }
    for (let i = 0; i <= 76; i = i+2 ) {
      x1 = 'x1="0"';
      x2 = 'x2="152"';
      y1 = 'y1="' + i + '"';
      y2 = 'y2="' + i + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      board.area.append(line);
    }
    board.area.html(board.area.html());
  } else {
    $('.line').remove();
  }
});



// MOVEMENT ----------------------------------

let oppositeDir = (dir) => {
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


function initListeners(user) {
  $(document).keydown((e)=> {
    startedGame = true;
    direction = codeToDirection(e.keyCode);
    // console.error(user.shrinking, direction, user.direction, user.oldDirection);
    if (!direction /*|| (user.shrinking && direction === user.oldDirection && user.oldDirection === user.direction &&  user.bones.length > 0)*/)  {
      return;
    } else if (direction === SHOOT) {
      user.shoot();
    } else if (direction === PAUSE_BUTTON) {
      PAUSE = !PAUSE;
    } else {
      if (user.shrinking !== direction) {
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
    }
  }, RHYTHM);
}


// START GAME ----------------------------------

function startGame() {

  board = new GameBoard();
  board.createGrid();
  board.drawThings();
  //console.log(board);

  let user = new User('scully', 3, 2);
  user.initUser();
  initListeners(user);

  board.area.html(board.area.html());
};

startGame();
// $("#startButton").click(function() {
//   startGame();
// });


});
