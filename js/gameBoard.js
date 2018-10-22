
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  this.badGuys = [];
}

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));
}

GameBoard.prototype.cleanBoard = function () {
  clearRequestInterval(timer);
  this.createGrid();
  this.area.html('<rect x="0" y="0" id="background" class="background" width="100%" height="100%"/>');
}

GameBoard.prototype.initScene = function () {
  this.initWalls();
  this.initBadGuys();
  this.initBonuses();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  this.area.html(this.area.html());
}

GameBoard.prototype.initWalls = function () {
  for (let i = 0; i < walls_limit; i++) {
    let wall = new Walls(3,1);
    wall.drawWalls();
  }
}

GameBoard.prototype.initBadGuys = function () {
  for (let i = 0; i < badGuys_limit; i++) {
    let badGuy = new BadGuys(3,1,i);
    this.badGuys.push(badGuy);
    badGuy.drawBadGuy();
  }
}

GameBoard.prototype.initBonuses = function () {
  for (let i = 0; i < bonus_limit; i++) {
    let bonus = new Bonus();
    bonus.drawBonus();
  }
}
