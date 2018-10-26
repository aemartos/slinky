// $(document).ready(function() {


  // GRID ONCLICK --------------------------------

  $('#guides').change(function() {
    if($('#guides').prop("checked")) {
      guidesOn();
    } else {
      guidesOff();
    }
    board.area.html(board.area.html());
  });

  const guidesOn = () => {
    $('#guides').prop("checked", true);
    for (let i = 0; i <= cols; i++) {
      x1 = 'x1="' + i + '"';
      x2 = 'x2="' + i + '"';
      y1 = 'y1="0"';
      y2 = 'y2="' + rows + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      board.area.append(line);
    }
    for (let i = 0; i <= rows; i++) {
      x1 = 'x1="0"';
      x2 = 'x2="' + cols + '"';
      y1 = 'y1="' + i + '"';
      y2 = 'y2="' + i + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      board.area.append(line);
    }
  }

  const guidesOff = () => {
    $('#guides').prop("checked", false);
    $('.line').remove();
  }

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
      case 39:
        return RIGHT;
      case 32:
        return SHOOT;
      case 80:
        return PAUSE_BUTTON;
      case 73:
        return INFO_BUTTON;
      //ESC === 27
      //ENTER === 13
      //P === 80
      //I === 73
      default:
        return undefined;
    }
  }

  timerFunction = (user)=> {
    user.userLose();
    user.userWin();
    user.userPoints();
    if(!PAUSE && !INFO){
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

  timerFunctionScene = ()=> {
    if (!PAUSE && !INFO) {
      if(bonus_count === 0) {
        $('circle.form.bonus').each((i,e)=>{
          let $e = $(e);
          let x = parseInt($e.attr('cx'));
          let y = parseInt($e.attr('cy'));
          board.grid[y][x] = 0;
          $e.remove();
        });
        board.initBonuses();
        bonus_count = 200;
      } else {
        bonus_count--;
      }
      board.badGuys.map((badGuy, i) => {
        badGuy.nextPosBadGuys(i);
      });
    }
  }

  function initListeners(user) {
    $(document).keydown((e)=> {
      startedGame = true;
      direction = codeToDirection(e.keyCode);
      if (!direction || user.shrinkingFromWall || user.shrinkingFromEnemy)  {
        return;
      } else if (direction === SHOOT) {
        //user.shoot();
        console.log('shooting is not implemented yet :D');
      } else if (direction === PAUSE_BUTTON && !INFO) {
        if(PAUSE) {
          cancelModal();
        } else {
          openModal(modalPause);
        }
        PAUSE = !PAUSE;
      } else if (direction === INFO_BUTTON && !PAUSE) {
        if(INFO) {
          cancelModal();
        } else {
          openModal(modalInfo);
        }
        INFO = !INFO;
      } else {
        if (user.shrinking !== direction) {
          user.direction = direction;
          user.directionsLog.push(user.direction);
          user.prevDirection();
        }
      }
    });
    initTimers();
    timerfps = requestInterval(()=>{board.render()}, 1000/FPS);
  }

  function initTimers() {
    timer = requestInterval(()=>{timerFunction(user)}, RHYTHM);
    timerScene = requestInterval(()=>{timerFunctionScene()}, RHYTHM);
  }


  // START GAME ----------------------------------

  function startGame() {
    board = new GameBoard();
    board.createGrid();
    goal = new Goal();
    goal.drawGoal();
    user = new User('scully', 3, 2);
    user.initUser();
    board.initScene();
    initListeners(user);
  };

  function reStartGame() {
    counter = 0;
    board.cleanBoard();
    goal.drawGoal();
    user.initUser();
    board.initScene();
    initTimers();
  };

  const initGame = () => {
    $('.initial_page').css('display', 'none');
    $('.counter').css('display', 'flex');
    $('#guides').css('display', 'block');
    $('#gameBoard').css('display', 'block');
    $('.settings-button').css('display', 'block');
  }

  $("#startButton").click(function() {
    openModal(modalStart);
  });

  playModalButton.click(function() {
    initGame();
    startGame();
  });

  saveModalButton.click(function() {
    PAUSE = false;
    cols = parseInt($("input[name='cols']").val());
    if(cols%2 !==0) {cols+=1}
    rows = cols/2;
    walls_limit = parseInt($("input[name='walls']").val());
    bonus_limit = parseInt($("input[name='bonus']").val());
    badGuys_limit = parseInt($("input[name='badGuys']").val());
    console.log(cols,walls_limit,bonus_limit, badGuys_limit)
    replayModal();
  });



// });
