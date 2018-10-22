function Bonus() {
}

Bonus.prototype = Object.create(Form.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.drawBonus = function () {
  const bonus_powers = ['reverse','speedy','disable','blur','bigger','invincible'];
  let pos = this.getFreePosition(4);
  this.style = this.randomArr(bonus_powers);
  this.x = ' cx="' + pos.x + '.5"';
  this.y = ' cy="' + pos.y + '.5"';
  this.path = '<circle class="form bonus ' + this.style + '"' + this.x + this.y + ' r=".5"/>';
  board.area.append(this.path);
  //board.grid[pos.y][pos.x] = BONUS;
  board.grid[pos.y][pos.x] = BONUS + this.style.slice(0,2);
}

Bonus.removeBonus = function (bon,x,y) {
  bon.remove();
  board.grid[y][x] = 0;
}
