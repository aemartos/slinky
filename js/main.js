$(document).ready(function() {


  // GRID ONCLICK --------------------------------

  $('#guides').change(function() {
    if(this.checked) {
      for (let i = 0; i <= cols; i = i+2 ) {
        x1 = 'x1="' + i + '"';
        x2 = 'x2="' + i + '"';
        y1 = 'y1="0"';
        y2 = 'y2="' + rows + '"';
        line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
        board.area.append(line);
      }
      for (let i = 0; i <= rows; i = i+2 ) {
        x1 = 'x1="0"';
        x2 = 'x2="' + cols + '"';
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

  oppositeDir = (dir) => {
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
  };

  codeToDirection = (key)=> {
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

  timerFunction = (user)=> {
    if(!PAUSE){
      switch (user.direction) {
        case UP:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(0,-size); //growUp
          }
          break;
        case DOWN:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(0,size); //growDown
          }
          break;
        case LEFT:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(-size,0); //growLeft
          }
          break;
        case RIGHT:
          if (user.oldDirection === oppositeDir(user.direction)) {
            user.shrink();
          } else if(!user.checkBoundaries()) {
            user.grow(size,0); //growRight
          }
          break;
      }
    }
  }

  function initListeners(user) {
    $(document).keydown((e)=> {
      startedGame = true;
      direction = codeToDirection(e.keyCode);
      if (!direction || user.shrinkingFromWall)  {
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
    timer = setInterval(()=>{timerFunction(user)}, RHYTHM);
  }



  // START GAME ----------------------------------

  function startGame() {

    board = new GameBoard();
    board.createGrid();
    board.drawThings();

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
