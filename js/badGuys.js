function BadGuys(health, strength) {
  this.z = undefined;
  Form.call(this, health, strength);
}

BadGuys.prototype = Object.create(Form.prototype);
BadGuys.prototype.constructor = BadGuys;

BadGuys.prototype.nextPosBadGuys = function () {
  const dir = [37, 38, 39, 40];
  console.log(direction);
  if (badGuys_count === 0) {
    this.direction = codeToDirection(this.randomArr(dir));
  } else {
    badGuys_count--;
  }
  this.getFreePosition();
  //random de las direcciones utilizando el switch de las direcciones
  //TOP: y-1
  //...
  //...
  //comprobar si la pos está libre en arraybi
  // si está libre devuelvo {x,y}
  // sino, me vuelvo a llamar a mi misma return this.nextPosBadGuys();
  return true;
}

BadGuys.prototype.drawBadGuys = function (positionFunctionOptional) {
  let positionFunction = positionFunctionOptional ? positionFunctionOptional.bind(this) : this.getFreePosition.bind(this);
  for (let i = 0; i < badGuys_limit; i++) {
    let pos = positionFunction(4);
    //transform="rotate(108 69 19)" selfRotation
    this.x = pos.x + ',' + pos.y + ' ';
    this.y = (pos.x + 1) + ',' + pos.y + ' ';
    this.z = (pos.x + 1) + ',' + (pos.y + 1);
    this.path = '<g class="badguyy"><polygon class="form badGuy" points="' + this.x + this.y + this.z + '"' + ' id="badGuy"/></g>';
    board.area.append(this.path);
    board.grid[pos.y][pos.x] = BADGUY;
  }
}
