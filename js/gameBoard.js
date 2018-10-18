
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  //Form.call(this, health, strength);
}

GameBoard.prototype = Object.create(Form.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));

}

GameBoard.prototype.checkSpaces = function(x,y, margin) {
  //console.log(margin);

  let LEFT_BOUND = Math.max(4, x - margin);
  let RIGHT_BOUND = Math.min(cols-5, x + margin);
  let TOP_BOUND = Math.max(4, y - margin);
  let BOTTOM_BOUND = Math.min(rows-5, y + margin);
  //console.error(x,y);
  //console.log(LEFT_BOUND, RIGHT_BOUND, TOP_BOUND, BOTTOM_BOUND);
  for (let i = LEFT_BOUND; i <= RIGHT_BOUND; i++){
    for (let j = TOP_BOUND; j <= BOTTOM_BOUND; j++){
      if (this.grid[j][i] !== 0) {
        return false;
      }
      // else {
      //   console.log(x,y, this.grid[j][i]);
      // }
    }
  }
  return true;
}

GameBoard.prototype.getFreePosition = function(margin){
  let x = this.random(cols);
  let y = this.random(rows);
  //console.warn(x,y)

  if(this.checkSpaces(x,y,margin)){
    //console.log(x,y);
    //console.log(this.grid[y][x]);
    let pos = {x,y};
    return pos;
  } else {
    return this.getFreePosition(margin);
  }
}

GameBoard.prototype.randomStyle = function (arr) {
  var rNum = Math.floor(Math.random() * arr.length);
  return arr[rNum];
}

GameBoard.prototype.randomWall = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}

GameBoard.prototype.initScene = function () {
  this.drawGoal();
  this.drawWalls();
  this.drawBonuses();
  this.drawBadGuys();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  board.area.html(board.area.html());
}

GameBoard.prototype.drawGoal = function () {
  let pos = this.getFreePosition(4);
  let x = ' x="' + pos.x + '"';
  let y = ' y="' + pos.y + '"';
  let goal = '<rect id="goal" class="form goal"' + x + y + 'width="2" height="2"/>';
  this.area.append(goal);
  this.grid[pos.y][pos.x] = GOAL;
  this.grid[pos.y+1][pos.x] = GOAL;
  this.grid[pos.y][pos.x+1] = GOAL;
  this.grid[pos.y+1][pos.x+1] = GOAL;
}

GameBoard.prototype.drawBonuses = function () {
  const bonus_powers = ['reverse','speedy','disable','blur','bigger','invincible'];
  for (let i = 0; i < bonus_limit; i++) {
    let pos = this.getFreePosition(8);
    let style = this.randomStyle(bonus_powers);
    //console.log(pos, style);
    let x = ' cx="' + pos.x + '.5"';
    let y = ' cy="' + pos.y + '.5"';
    let bonus = '<circle class="form bonus ' + style + '"' + x + y + ' r=".5"/>';
    //console.log(bonus);
    this.area.append(bonus);
    this.grid[pos.y][pos.x] = BONUS;
  }
}

GameBoard.prototype.drawBadGuys = function () {
  for (let i = 0; i < badGuys_limit; i++) {
    let pos = this.getFreePosition(10);
    //transform="rotate(108 69 19)" selfRotation
    let x = pos.x + ',' + pos.y + ' ';
    let y = (pos.x + 1) + ',' + pos.y + ' ';
    let z = (pos.x + 1) + ',' + (pos.y + 1);
    let badGuy = '<g class="badguyy"><polygon class="form badGuy" points="' + x + y + z + '"' + ' id="badGuy"/></g>';
    this.area.append(badGuy);
    this.grid[pos.y][pos.x] = BADGUY;
  }
}

GameBoard.prototype.drawWalls = function () {
  const wall_type = ['normal','ice','electric','wash','blackHole','teletransport'];
  function walls(x, y, style) {
    return {
      'wall01': '<g class="form wall ' + style + '" style="filter: url(#glow);">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + (y+1) + '" width="1" height="1"/>\
                <g>',
      'wall02': '<g class="form wall ' + style + '" style="filter: url(#glow);">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
      'wall03': '<g class="form wall ' + style + '" style="filter: url(#glow);">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
      'wall04': '<g class="form wall ' + style + '" style="filter: url(#glow);">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+2) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+3) + '" width="1" height="1"/>\
                </g>',
    }
  }
  for (let i = 0; i <= walls_limit; i++) {
    let pos = this.getFreePosition(4);
    let x = pos.x;
    let y = pos.y;
    let style = this.randomStyle(wall_type);
    this.area.append(this.randomWall(walls(x,y,style)));
  }
  //this.area.append(walls(x, y, style).wall01);
  //this.area.append(walls(x, y, style).wall02);
  //this.area.append(walls(x, y, style).wall03);
  //this.area.append(walls(x, y, style).wall04);
}
