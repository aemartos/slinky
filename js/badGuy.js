function BadGuys(health, strength, index) {
  this.badGuy = undefined;
  this.z = undefined;
  this.index = index;
  this.rotate = this.random(360);
  Form.call(this, health, strength);
}

BadGuys.prototype = Object.create(Form.prototype);
BadGuys.prototype.constructor = BadGuys;

BadGuys.prototype.generateNextPos = function () {
  const dir = [UP, DOWN, LEFT, RIGHT];
  let direction = this.randomArr(dir);
  let x = this.x;
  let y = this.y;
  let nextPos = 0;

  /* Check next position in the random direction */
  switch(direction) {
    case UP:
      //Check top limit and if it's outside it recursively calls itself again
      if (y <= 1) {
        break;
      }
      //If it's not outside, check the content of the grid,
      //if there's nothing (0) or if it's the slinky, it can go there and attack
      // it returns the new position to move the badGuy
      //if the position is occupied, it recursively calls itself again
      nextPos = board.grid[y - 1][x];
      if (nextPos === 0 || nextPos === SLINKY) {
        y =  y - 1;
        this.attack(nextPos, SLINKY);
        return {x, y};
      }
      break;
    case DOWN:
      if (y >= rows - 1) {
        break;
      }
      nextPos = board.grid[y + 1][x];
      if (nextPos === 0 || nextPos === SLINKY) {
        y = y + 1;
        this.attack(nextPos, SLINKY);
        return {x, y};
      }
      break;
    case LEFT:
      if (x <= 1) {
        break;
      }
      nextPos = board.grid[y][x - 1];
      if (nextPos === 0 || nextPos === SLINKY) {
        x = x - 1;
        this.attack(nextPos, SLINKY);
        return {x, y};
      }
      break;
    case RIGHT:
    if (x >= cols - 1) {
      break;
    }
      nextPos = board.grid[y][x + 1];
      if (nextPos === 0 || nextPos === SLINKY) {
        x = x + 1;
        this.attack(nextPos, SLINKY);
        return {x, y};
      }
      break;
  }
  return this.generateNextPos();
}

BadGuys.prototype.drawBadGuy = function () {
  let pos = this.getFreePosition(2);
  let x = pos.x + ',' + pos.y + ' ';
  let y = (pos.x + 1) + ',' + pos.y + ' ';
  let z = (pos.x + 1) + ',' + (pos.y + 1);
  this.x = pos.x;
  this.y = pos.y;
  this.z = z;
  this.path = '<polygon class="form badGuy" transform="rotate(' + this.rotate + ' ' + (pos.x + .5) + ' ' + (pos.y + .5) + ')" points="' + x + y + z + '" id="badGuy_' + this.index +'"/>';
  board.area.append(this.path);
  this.rotate += 20;
  board.grid[this.y][this.x] = BADGUY;
}

BadGuys.prototype.nextPosBadGuys = function (i) {
  this.badGuy = $('#badGuy_' + i);
  let pos = this.generateNextPos();
  board.grid[this.y][this.x] = 0;
  this.rotate += 20;
  let x = pos.x + ',' + pos.y + ' ';
  let y = (pos.x + 1) + ',' + pos.y + ' ';
  let z = (pos.x + 1) + ',' + (pos.y + 1);
  this.x = pos.x;
  this.y = pos.y;
  this.z = z;
  let rotate = 'rotate(' + this.rotate + ' ' + (pos.x + .5) + ' ' + (pos.y + .5) + ')';
  this.badGuy.attr('points', x + y + z);
  this.badGuy.attr('transform', rotate);
  board.grid[this.y][this.x] = BADGUY;
}
