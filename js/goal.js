function Goal() {
}

Goal.prototype = Object.create(Form.prototype);
Goal.prototype.constructor = Goal;

Goal.prototype.drawGoal = function () {
  let pos = this.getFreePosition(3);
  this.x = ' x="' + pos.x + '"';
  this.y = ' y="' + pos.y + '"';
  this.path = '<rect id="goal" class="form goal"' + this.x + this.y + 'width="2" height="2"/>';
  board.area.append(this.path);
  board.grid[pos.y][pos.x] = GOAL;
  board.grid[pos.y+1][pos.x] = GOAL;
  board.grid[pos.y][pos.x+1] = GOAL;
  board.grid[pos.y+1][pos.x+1] = GOAL;
}
