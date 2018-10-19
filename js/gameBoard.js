
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
}

GameBoard.prototype = Object.create(Form.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));

}

GameBoard.prototype.checkSpaces = function(x,y, margin) {
  if (x < 2 || x > cols - 5 || y < 2 || y > rows - 5) {
    return false;
  }
  let marginX = typeof margin  === "number" ? margin : margin.x;
  let marginY = typeof margin  === "number" ? margin : margin.y;
  let LEFT_BOUND = Math.max(0, x - marginX);
  let RIGHT_BOUND = Math.min(cols-1, x + marginX);
  let TOP_BOUND = Math.max(0, y - marginY);
  let BOTTOM_BOUND = Math.min(rows-1, y + marginY);
  for (let i = LEFT_BOUND; i <= RIGHT_BOUND; i++){
    for (let j = TOP_BOUND; j <= BOTTOM_BOUND; j++){
      if (this.grid[j][i] !== 0) {
        return false;
      }
    }
  }
  return true;
}

GameBoard.prototype.getFreePosition = function(margin, call = 7){
  var x = this.random(cols);
  var y = this.random(rows);
  if (call <= 4 && typeof margin === "number") {
    margin = Math.floor(margin / 2);
  }
  if(call === 0 || this.checkSpaces(x,y,margin)){
    let pos = {x,y};
    return pos;
  } else {
    return this.getFreePosition(margin, --call);
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
  this.drawWalls();
  this.drawBonuses();
  this.drawBadGuys();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  this.area.html(this.area.html());
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
    let x = ' cx="' + pos.x + '.5"';
    let y = ' cy="' + pos.y + '.5"';
    let bonus = '<circle class="form bonus ' + style + '"' + x + y + ' r=".5"/>';
    this.area.append(bonus);
    this.grid[pos.y][pos.x] = BONUS;
  }
}

GameBoard.prototype.nextPosBadGuys = function () {
  //random de las direcciones utilizando el switch de las direcciones
  //TOP: y-1
  //...
  //...
  //comprobar si la pos está libre en arraybi
  // si está libre devuelvo {x,y}
  // sino, me vuelvo a llamar a mi misma return this.nextPosBadGuys();
}

GameBoard.prototype.drawBadGuys = function (positionFunctionOptional) {
  let positionFunction = positionFunctionOptional || this.getFreePosition.bind(this);
  for (let i = 0; i < badGuys_limit; i++) {
    let pos = positionFunction(4);
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
  function walls(x, y, style, i) {
    return {
      'wall01': {'path': '<g class="form wall ' + style + '" style="filter: url(#glow);" num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + (y+1) + '" width="1" height="1"/>\
                <g>',
                'positions': [{x, y}, {x: x+1, y}, {x, y: y+1}, {x: x+1, y: y+1}],
                },
      'wall02': {'path': '<g class="form wall ' + style + '" style="filter: url(#glow); "num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x: x+1, y}, {x, y: y+1}],
                },
      'wall03': {'path': '<g class="form wall ' + style + '" style="filter: url(#glow);" num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x, y: y+1}],
                },
      'wall04': {'path': '<g class="form wall ' + style + '" style="filter: url(#glow);" num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+2) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+3) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x, y: y+1}, {x, y: y+2}, {x, y: y+3}],
                }
    }
  }
  for (let i = 0; i <= walls_limit; i++) {
    let pos = this.getFreePosition(10);
    let x = pos.x;
    let y = pos.y;
    let style = this.randomStyle(wall_type);
    let wall = this.randomWall(walls(x,y,style,i));
    this.area.append(wall.path);
    wall.positions.map((e)=>{
      this.grid[e.y][e.x] = WALL;
    });
  }

}
