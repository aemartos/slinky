
// User
function User(name, health, strength) {
  this.name = name;
  this.points = 10000;
  this.direction = '';
  this.oldDirection = '';
  this.directionsLog = [];
  this.bones = [];
  this.win = false;
  this.shrinking = false;
  this.shrinkingFromWall = false;
  this.shrinkingFromEnemy = false;
  Form.call(this, health, strength);
}

User.prototype = Object.create(Form.prototype);
User.prototype.constructor = User;

User.prototype.initUser = function () {
  this.health = 3;
  this.points = 10000;
  this.win = false;
  this.shrinking = false;
  this.shrinkingFromWall = false;
  this.shrinkingFromEnemy = false;
  let pos = this.getFreePosition({x:40, y:25},100);
  this.x = pos.x;
  this.y = pos.y;
  this.drawUserBody('back');
}

User.prototype.drawUserBody = function (clas) {
  var x = 'x="' + this.x + '"';
  var y = 'y="' + this.y + '"';
  this.path = '<rect class="form user head ' + clas + '"' + x + y + 'width="' + size + '" height="' + size + '"/>';
  //this.path = '<rect class="form user head ' + clas + '"' + x + y + 'width="2" height="2"/>';
  //this.path = '<rect class="form user fill head ' + clas + ' ' + this.addStroke() + '"' + x + y + 'width="1" height="1"/>';
  //this.path = '<rect class="form user fill head ' + clas + '"' + x + y + 'width="2" height="2"/>\
              //<rect class="form user head ' + clas + ' ' + this.addStroke() + '"' + x + y + 'width="2" height="2"/>';
  board.area.append(this.path);
  board.grid[this.y][this.x] = SLINKY;
  board.area.html(board.area.html());
}

User.prototype.addStroke = function () {
  switch(this.direction) {
    case UP:
    case DOWN:
      return 'sides_lr';
    case LEFT:
    case RIGHT:
      return 'sides_tb';
  }
}

/* Check what's in the next position if slinky follows its current direction */
User.prototype.checkBoundaries = function () {
  let dx = 0;
  let dy = 0;
  let isBoundary = false;

  //this.direction is given by the keydown event
  //Regarding the direction I check the next position the user is going to take
  //isBoundary is used to check the limits of the board
  //the x and y deltas(increments) are used to calculated the new x and y
  //if there is a boundary slinky won't grow, otherwise it grows 1 position
  switch(this.direction) {
    case UP:
      isBoundary = this.y === 0;
      dy = isBoundary ? 0 : -1;
      break;
    case DOWN:
      isBoundary = this.y === rows - size;
      dy = isBoundary ? 0 : 1;
      break;
    case LEFT:
      isBoundary = this.x === 0;
      dx = isBoundary ? 0 : -1;
      break;
    case RIGHT:
      isBoundary = this.x === cols - size;
      dx = isBoundary ? 0 : 1;
      break;
  }
  //set new position
  let nextX = this.x + dx;
  let nextY = this.y + dy;

  //get the content in the grid of the new position, nesPos will have that value
  let nextPos = board.grid[nextY][nextX];

  //nesPos will have the value BOUNDARY if slinky is in the limits of the board
  nextPos = isBoundary ? BOUNDARY : nextPos;
  let isWall = false;
  switch(nextPos) {
    case GOAL:
      this.shrinkFromWall();
      openModal(modalWin);
      this.win = true;
      isWall = true;
      break;
    case (WALL + 'el'):
    case (WALL + 'wa'):
    case (WALL + 'bl'):
    case (WALL + 'te'):
      board.walls[0].attack(nextPos, nextPos);
    case (WALL + 'no'):
    case BOUNDARY:
      isWall = true;
      break;
    case (WALL + 'ic'):
      return BOUNDARY;
    case SLINKY:
      let last = this.getLast();
      let lastX = parseInt(last.attr('x'));
      let lastY = parseInt(last.attr('y'));
      //Check if slinky is shrinking, if it is, let him do it
      if (((this.y + dy) === lastY) && ((this.x + dx) === lastX)) {
        return SHRINK;
      }
      ////Otherwise slinky crashes into itself and shake
      this.shake();
      return SLINKY;
    case (BONUS + 're'):
    case (BONUS + 'sp'):
    case (BONUS + 'di'):
    case (BONUS + 'bl'):
    case (BONUS + 'bi'):
    case (BONUS + 'in'):
      let bon = $('[cx="' + nextX + '.5"][cy="' + nextY + '.5"]');
      Bonus.removeBonus(bon, (nextX), (nextY));
      board.winPoints();
      bonus.play();
      //return BOUNDARY;
      return false;
    default:
      return nextPos;
  }
  //If slinky crashes into a wall and he is not shrinking then do it
  if (isWall) {
    //crash.play();
    if (!this.shrinking) {
      this.shrinkFromWall();
      return BOUNDARY;
    }
    //If it's shrinking, keep doing it
    return SHRINK;
  }
}

User.prototype.userLose = function () {
  if(this.health === 0) {
    LOSE = true;
    WIN = false;
    lose.play();
    openModal(modalLose);
    clearRequestInterval(timer);
    clearRequestInterval(timerScene);
  }
}

User.prototype.userWin = function () {
  this.bones = $('.user.bone');
  if(this.win && this.bones.length < 1) {
    WIN = true;
    LOSE = false;
    win.play();
    clearRequestInterval(timer);
    clearRequestInterval(timerScene);
  }
}

User.prototype.updatePosition = function () {
  this.x = parseInt($('.user.head').attr('x'));
  this.y = parseInt($('.user.head').attr('y'));
}

//Get old direction to check shrink and other things
User.prototype.prevDirection = function () {
  //Avoid double keydown
  if(this.direction !== this.oldDirection) {
    let last = this.directionsLog.length - 2;
    this.oldDirection = this.directionsLog[last];
  }
}

User.prototype.cleanGridPosition = function (x,y) {
  board.grid[y][x] = 0;
}

User.prototype.cleanGridPositions = function () {
  for(var i = 0; i < board.grid.length; i++) {
    for(var j = 0; j < board.grid[0].length; j++) {
      if (board.grid[i][j] === SLINKY) {
        board.grid[i][j] = 0;
      }
    }
  }
  board.grid[this.y][this.x] = SLINKY;
}

User.prototype.grow = function (x,y) {
  this.shrinking = false;
  this.x = parseInt($('.user.head').attr('x')) + x;
  this.y = parseInt($('.user.head').attr('y')) + y;
  $('.user.head').removeClass('head');

  //DELETE SHRINK ANIMATION ----------------
  $('.user.back').removeClass(function (index, css) {
    return (css.match (/(^|\s)shrink_\S+/g) || []).join(' ');
  });
  this.drawUserBody('bone');
}

/*Get last bone in slinkys body, I need either lasts (first/last) in the case we are shrinking from wall or enemy,
because I turn the position*/
User.prototype.getLast = function () {
  this.bones = $('.user.bone');
  let last = this.shrinkingFromWall ? this.bones.first() : this.bones.last();
  return last;
}

/*Get the second to last bone */
User.prototype.getPrevLast = function () {
  this.bones = $('.user.bone');
  return $(this.bones[this.bones.length - 2]);
}

User.prototype.shrink = function () {
  let last = this.getLast();
  //Using the previous function I take the position of the last bone,
  //If there is at least 1 bone I'm removing all the bones and clenaning their positions in the grid
  if(this.bones.length > 0) {
    let lastX = parseInt(last.attr('x'));
    let lastY = parseInt(last.attr('y'));
    //Change directions to trigger shrinking
    this.shrinkDir();
    this.cleanGridPosition(lastX, lastY);
    last.remove();

    //Need to capture last again when we remove it
    last = this.getLast();
    //Get new head while I am removing bones
    if (this.bones.length === 1) {
      rebound.play();
      $('.user.back').addClass('head');
    } else {
      last.addClass('head');
    }
  }
  //I need the new position of slinky head
  this.updatePosition();

  //Class initials to css
  const sd = this.shrinking.toString()[0].toLowerCase();
  this.shrinkAnimation('shrink_' + sd);

  //If there are no bones and slinky is shrinking and has been attack,
  //then change speed and reset the values because it has finish shrinking
  if(this.bones.length === 0) {
    if(this.shrinkingFromWall || this.shrinkingFromEnemy) {
      this.shrinkingFromWall = false;
      this.shrinkingFromEnemy = false;
      this.shrinking = false;
      this.oldDirection = this.direction;
      this.direction = oppositeDir(this.oldDirection);
      this.changeSpeed(1);
    } else {
      this.shrinking = true;
    }
  }
}

User.prototype.shrinkDir = function () {
  let last = this.getLast();
  let nextLast = this.shrinkingFromWall ? last : this.getPrevLast();
  let nextLastX = parseInt(nextLast.attr('x'));
  let nextLastY = parseInt(nextLast.attr('y'));

  //Return shrinking direction to get the css class initials
  if (this.x > nextLastX) {
    this.shrinking = LEFT;
  } else if (this.x < nextLastX) {
    this.shrinking = RIGHT;
  } else if (this.y > nextLastY) {
    this.shrinking = UP;
  } else if (this.y < nextLastY) {
    this.shrinking = DOWN;
  }

  //Change direction in case slinky is shrinking backwards
  if (this.shrinkingFromWall || this.shrinkingFromEnemy) {
    this.shrinking = oppositeDir(this.shrinking);
  }
}

User.prototype.shrinkFromWall = function () {
  this.shrinkingFromWall = true;
  //Change direction to do shrinking from the other side
  let head = $('.user.head');
  let back = $('.user.back');
  back.addClass('head bone').removeClass('back');
  head.addClass('back').removeClass('head bone');
  this.oldDirection = this.direction;
  this.direction = oppositeDir(this.oldDirection);
  this.shrinking = this.direction;
  this.changeSpeed(5);
  if (this.bones.length === 1) {
    rebound.play();
  }
}

User.prototype.shrinkFromEnemy = function () {
  //Avoid get hurt when slinky is shrinking from enemy
  if(!this.direction) {
    return;
  }
  //Change direction to do shrinking from the other side
  this.shrinkingFromEnemy = true;
  this.oldDirection = this.direction;
  this.direction = oppositeDir(this.oldDirection);
  this.shrinking = this.direction;
  this.changeSpeed(5);
  if (this.bones.length === 1) {
    rebound.play();
  }
}

//Do animation when there is only one bone in slinkys body
User.prototype.shrinkAnimation = function (clas) {
  if (this.bones.length === 0) {
    $('.user.back').addClass(clas);
    setTimeout(()=>{$('.user.back').removeClass(clas)}, 500);
  }
}

User.prototype.shake = function () {
  $('.user').addClass('shake');
  setTimeout(()=>{$('.user').removeClass('shake')}, 500);
  shake.play();
  setTimeout(()=>{
    shake.pause();
    shake.currentTime = 0;
  }, 1000);
}

//Stop the timer and init a new one to change the slinky speed
User.prototype.changeSpeed = function (num) {
  clearRequestInterval(timer);
  //Check if it's a number and if it's not, use 1
  let t = (num && !isNaN(num)) ? num : 1;
  timer = requestInterval(()=>{timerFunction(this)}, RHYTHM/t);
}

User.prototype.userPoints = function (num) {
  if(this.points <= 0) {
    this.points = 0;
  }
  $('.counter .points .number').text(this.points);
}
