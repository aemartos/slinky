
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  this.wall = undefined;
  this.bonus = undefined;
  this.badGuy = undefined;
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
  this.wall = new Walls(3,1);
  this.wall.drawWalls();
  this.bonus = new Bonus();
  this.bonus.drawBonuses();
  this.badGuy = new BadGuys(3,1);
  this.badGuy.drawBadGuys();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  this.area.html(this.area.html());
}
