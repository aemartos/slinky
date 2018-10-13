
// User

function User(name, health, strength) {
  this.name = name;
  this.direction = '';
  this.oldDirection = '';
  this.directionsLog = [];
  this.bones = [];
  Form.call(this, health, strength);
}

User.prototype = Object.create(Form.prototype);
User.prototype.constructor = User;


User.prototype.position = function () {
  this.x = this.random(100);
  this.y = this.random(50);
}

User.prototype.initUser = function () {
  this.position();
  this.drawUserBody('back');
}

User.prototype.drawUserBody = function (clas) {
  var x = 'x="' + this.x + '"';
  var y = 'y="' + this.y + '"';
  //this.path = '<rect id="user" class="form user head ' + clas + ' ' + this.addStroke() + '"' + x + y + 'width="2" height="2"/>';
  this.path = '<rect id="user" class="form user head ' + clas + '"' + x + y + 'width="2" height="2"/>';
  $gameBoard.append(this.path);
  board.grid[this.y/2][this.x/2] = SLINKY;
  $gameBoard.html($gameBoard.html());

  // let bones = $('#user.bone');
  // bones.each(function(i, elem) {
  //   $(elem).attr('num', i);
  // });
}

User.prototype.addStroke = function () {
  switch(this.direction) {
    case UP:
    case DOWN:
      return 'sides_lr';
      break;
    case LEFT:
    case RIGHT:
      return 'sides_tb';
      break;
  }
}

User.prototype.checkBoundaries = function () {
  let dx = 0;
  let dy = 0;
  let isBoundary = false;

  switch(this.direction) {
    case UP:
      isBoundary = this.y === 0;
      dy = isBoundary ? 0 : -1;
      break;
    case DOWN:
      isBoundary = this.y === 48;
      dy = isBoundary ? 0 : 1;
      break;
    case LEFT:
      isBoundary = this.x === 0;
      dx = isBoundary ? 0 : -1;
      break;
    case RIGHT:
      isBoundary = this.x === 98;
      dx = isBoundary ? 0 : 1;
      break;
  }

  let nextPos = board.grid[this.y/2 + dy][this.x/2 + dx];
  //console.log(isBoundary, nextPos, this.x, this.y, dx, dy);
  //console.log(board.grid);
  if(isBoundary || (nextPos !== 0 && nextPos !== BONUS && nextPos !== SLINKY)) {
    return true;
  } else {
    return false;
  }
}

User.prototype.prevDirection = function () {
  let last = this.directionsLog.length - 2;
  this.oldDirection = this.directionsLog[last];
  console.log(this.oldDirection, this.direction);
}

User.prototype.grow = function (x,y) {
  this.x = parseInt($('#user.head').attr('x')) + x;
  this.y = parseInt($('#user.head').attr('y')) + y;
  $('#user.head').removeClass('head');
  this.drawUserBody('bone');
}

User.prototype.growUp = function () {
  this.grow(0,-2);
}

User.prototype.growDown = function () {
  this.grow(0,2);
}

User.prototype.growLeft = function () {
  this.grow(-2,0);
}

User.prototype.growRight = function () {
  this.grow(2,0);
}

User.prototype.shrink = function () {
  this.bones = $('#user.bone');
  if(this.bones.length > 0) {

    this.bones.last().remove();

    board.grid.map((e)=> {
      if(e === SLINKY) {
        return 0;
      }
    });
  }
}
