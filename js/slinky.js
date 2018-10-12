
// User

function User(name, health, strength) {
  this.name = name;
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
  this.drawUserBody();
}

User.prototype.drawUserBody = function () {
  var x = 'x="' + this.x + '"';
  var y = 'y="' + this.y + '"';
  this.path = '<rect id="user" class="form user head back"' + x + y + 'width="2" height="2"/>';
  $gameBoard.append(this.path);
  board.grid[this.y/2][this.x/2] = SLINKY;
  $gameBoard.html($gameBoard.html());
}

User.prototype.checkBoundaries = function () {
  let dx= 0;
  let dy = 0;
  let isBoundary = false;

  switch(direction) {
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
  if(isBoundary || (nextPos !== 0 && nextPos !== BONUS)) {
    return true;
  } else {
    return false;
  }
}

User.prototype.grow = function (x,y) {
  this.x = parseInt($('#user.head').attr('x')) + x;
  this.y = parseInt($('#user.head').attr('y')) + y;
  $('#user.head').addClass('bone').removeClass('head');
  this.drawUserBody();
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

}
