
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
}

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));
}

GameBoard.prototype.initScene = function () {
  let wall = new Walls(3,1);
  wall.drawWalls();
  let bonus = new Bonus();
  bonus.drawBonuses();
  let badGuy = new BadGuys(3,1);
  badGuy.drawBadGuys();
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  this.area.html(this.area.html());
}
