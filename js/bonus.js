function Bonus() {
}

Bonus.prototype = Object.create(Form.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.drawBonuses = function () {
  const bonus_powers = ['reverse','speedy','disable','blur','bigger','invincible'];
  for (let i = 0; i < bonus_limit; i++) {
    let pos = this.getFreePosition(8);
    this.style = this.randomArr(bonus_powers);
    this.x = ' cx="' + pos.x + '.5"';
    this.y = ' cy="' + pos.y + '.5"';
    this.path = '<circle class="form bonus ' + this.style + '"' + this.x + this.y + ' r=".5"/>';
    board.area.append(this.path);
    board.grid[pos.y][pos.x] = BONUS;
  }
}
