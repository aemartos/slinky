function BadGuys(health, strength, index) {
  this.z = undefined;
  this.index = undefined;
  this.rotate = this.random(360);
  Form.call(this, health, strength);
}

BadGuys.prototype = Object.create(Form.prototype);
BadGuys.prototype.constructor = BadGuys;

BadGuys.prototype.nextPosBadGuys = function () {
  board.grid[this.y][this.x] = 0;
  $('#badGuy_' + this.index).remove();
  this.drawBadGuy(this.generateNextPos);
}


BadGuys.prototype.generateNextPos = function (occupied = false) {
  const dir = [UP, DOWN, LEFT, RIGHT];
  let direction = this.direction;
  if (badGuys_count === 0 || occupied) {
    direction = this.randomArr(dir);
  } else {
    badGuys_count--;
  }
  let x = this.x;
  let y = this.y;
  let nextPos = 0;
  switch(direction) {
    case UP:
      try { nextPos = board.grid[y - 1][x];} catch(e) { return this.generateNextPos(true); }
      if (nextPos === 0 || nextPos === SLINKY) {
        y =  y - 1;
        this.attack(nextPos);
        return {x, y};
      }
      return this.generateNextPos(true);
    case DOWN:
      try { nextPos = board.grid[y + 1][x];} catch(e) { return this.generateNextPos(true); }
      if (nextPos === 0 || nextPos === SLINKY) {
        y = y + 1;
        this.attack(nextPos);
        return {x, y};
      }
      return this.generateNextPos(true);
    case LEFT:
      try { nextPos = board.grid[y][x - 1];} catch(e) { return this.generateNextPos(true); }
      if (nextPos === 0 || nextPos === SLINKY) {
        x = x - 1;
        this.attack(nextPos);
        return {x, y};
      }
      return this.generateNextPos(true);
    case RIGHT:
      try { nextPos = board.grid[y][x + 1];} catch(e) { return this.generateNextPos(true); }
      if (nextPos === 0 || nextPos === SLINKY) {
        x = x + 1;
        this.attack(nextPos);
        return {x, y};
      }
      return this.generateNextPos(true);
  }
}

BadGuys.prototype.drawBadGuy = function (positionFunctionOptional) {
  let positionFunction = positionFunctionOptional ? positionFunctionOptional.bind(this) : this.getFreePosition.bind(this);
  let pos = positionFunction(2);
  this.x = pos.x;
  this.y = pos.y;
  let x = pos.x + ',' + pos.y + ' ';
  let y = (pos.x + 1) + ',' + pos.y + ' ';
  let z = (pos.x + 1) + ',' + (pos.y + 1);
  this.path = '<g class="badguyy"><polygon class="form badGuy" transform="rotate(' + this.rotate + ' ' + (pos.x + .5) + ' ' + (pos.y + .5) + ')" points="' + x + y + z + '"id="badGuy_' + this.index +'"/></g>';
  board.area.append(this.path);
  this.rotate += 20;
  board.grid[this.y][this.x] = BADGUY;
}

BadGuys.prototype.attack = function (nextPos) {
  if(nextPos === SLINKY && !user.shrinkingFromEnemy && !user.shrinkingFromWall) {
    user.health = user.health - this.strength;
    user.shrinkFromEnemy();
    board.alert();
    let lives = $('.life.fill');
    lives.last().removeClass('fill');
  }
}
