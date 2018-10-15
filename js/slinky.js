
// User

function User(name, health, strength) {
  this.name = name;
  this.direction = '';
  this.oldDirection = '';
  this.directionsLog = [];
  this.bones = [];
  this.shrinking = false;
  this.shrinkingFromWall = false;
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
  this.path = '<rect id="user" class="form user head ' + clas + '"' + x + y + 'width="2" height="2"/>';
  //this.path = '<rect id="user" class="form user fill head ' + clas + ' ' + this.addStroke() + '"' + x + y + 'width="2" height="2"/>';
  //this.path = '<rect id="user" class="form user fill head ' + clas + '"' + x + y + 'width="2" height="2"/>\
              //<rect id="user" class="form user head ' + clas + ' ' + this.addStroke() + '"' + x + y + 'width="2" height="2"/>';
              board.area.append(this.path);
  board.grid[this.y/2][this.x/2] = SLINKY;

  //REFRESH SVG IN DOM to paint the forms created from jQuery
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
      isBoundary = this.y === 74;
      dy = isBoundary ? 0 : 1;
      break;
    case LEFT:
      isBoundary = this.x === 0;
      dx = isBoundary ? 0 : -1;
      break;
    case RIGHT:
      isBoundary = this.x === 150;
      dx = isBoundary ? 0 : 1;
      break;
  }

  let nextPos = board.grid[this.y/2 + dy][this.x/2 + dx];
  //console.log(isBoundary, nextPos, this.x, this.y, dx, dy);
  //console.log(board.grid);

  if (isBoundary) {
    if (!this.shrinking) {
      //this.shrinkFromWall();
      return BOUNDARY;
    } else {
      return SHRINK;
    }
  }
  this.bones = $('#user.bone');
  if (nextPos === SLINKY ) {
    let last = this.shrinkingFromWall ? this.bones.first() : this.bones.last();
    // console.log(last)
    let lastX = parseInt(last.attr('x'));
    let lastY = parseInt(last.attr('y'));
    // console.log(this.y + dy * 2,lastY,this.x + dx * 2,lastX);
    if (((this.y + dy * 2) === lastY) && ((this.x + dx * 2 ) === lastX)) {
      return SHRINK;
    } else {
      return SLINKY;
    }
  }
  return nextPos;
}

User.prototype.updatePosition = function () {
  this.x = parseInt($('#user.head').attr('x'));
  this.y = parseInt($('#user.head').attr('y'));
}

User.prototype.prevDirection = function () {
  if(this.direction !== this.oldDirection) {
    let last = this.directionsLog.length - 2;
    this.oldDirection = this.directionsLog[last];
  }
}

User.prototype.cleanGridPosition = function (x,y) {
  board.grid[y/2][x/2] = 0;
  //console.log(board.grid);
}

User.prototype.cleanGridPositions = function () {
  for(var i = 0; i < board.grid.length; i++) {
    for(var j = 0; j < board.grid.length; j++) {
      if (board.grid[i][j] === SLINKY) {
        board.grid[i][j] = 0;
      }
    }
  }
  board.grid[this.y/2][this.x/2] = SLINKY;
}

User.prototype.grow = function (x,y) {
  this.shrinking = false;
  this.x = parseInt($('#user.head').attr('x')) + x;
  this.y = parseInt($('#user.head').attr('y')) + y;
  $('#user.head').removeClass('head');

  //DELETE SHRINK ANIMATION ----------------
  $('#user.back').removeClass(function (index, css) {
    return (css.match (/(^|\s)shrink_\S+/g) || []).join(' ');
  });
  this.drawUserBody('bone');
}

User.prototype.shrink = function () {
  //this.shrinking = true;
  this.bones = $('#user.bone');
  if(this.bones.length > 0) {
    let last = this.shrinkingFromWall ? this.bones.first() : this.bones.last();
    let nextLast = this.shrinkingFromWall ? last : last.prev();

    let lastX = parseInt(nextLast.attr('x'));
    let lastY = parseInt(nextLast.attr('y'));
    if (this.x > lastX) {
      this.shrinking = LEFT;
    } else if (this.x < lastX) {
      this.shrinking = RIGHT;
    } else if (this.y > lastY) {
      this.shrinking = UP;
    } else if (this.y < lastY) {
      this.shrinking = DOWN;
    }
    // console.log(this.shrinking, this.x, this.y, lastX, lastY)
    this.cleanGridPosition(lastX,lastY);
    last.remove();
  }
  this.bones = $('#user.bone');
  if (this.bones.length === 1) {
    $('#user.back').addClass('head');
  } else {
    let last = this.shrinkingFromWall ? this.bones.first() : this.bones.last();
    last.addClass('head');
  }
  this.updatePosition();

  const sd = this.shrinking.toString()[0].toLowerCase();
  this.shrinkAnimation('shrink_' + sd);
}

User.prototype.shrinkFromWall = function () {
  let head = $('#user.head');
  let back = $('#user.back');
  back.addClass('head bone').removeClass('back');
  head.addClass('back').removeClass('head bone');
  this.oldDirection = this.direction;
  this.direction = oppositeDir(this.direction);
  this.shrinking = this.direction;
  this.shrinkingFromWall = true;
}

User.prototype.shrinkAnimation = function (clas) {
  if (this.bones.length === 0) {
    $('#user.back').addClass(clas);
    setTimeout(()=>{$('#user.back').removeClass(clas)}, 500);
  }
}
