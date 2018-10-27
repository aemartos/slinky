
function Form(health, strength) {
  this.health = health;
  this.strength = strength;
  this.path = '';
  this.style = '';
  this.x = undefined;
  this.y = undefined;
}

Form.prototype.random = function (num) {
  var random = (Math.floor(Math.random() * num));
  return random;
}

/* Check if all positions within a given margin from the position x,y are free */
Form.prototype.checkSpaces = function(x,y, margin) {
  //Check margins in the limits (not to close) if its so, I return false
  if (x < 2 || x > cols - 5 || y < 2 || y > rows - 5) {
    return false;
  }
  //Check if margin is a number in the case I use an object (with horizontal and vertical dimensions)
  // In the case it's a numeric value, it's used in both dimensions
  let marginX = typeof margin === "number" ? margin : margin.x;
  let marginY = typeof margin === "number" ? margin : margin.y;
  //Check limits. Get the boundaries of the area to check,
  //if there is a position off the limits, I get the min/max possible number
  let LEFT_BOUND = Math.max(0, x - marginX);
  let RIGHT_BOUND = Math.min(cols-1, x + marginX);
  let TOP_BOUND = Math.max(0, y - marginY);
  let BOTTOM_BOUND = Math.min(rows-1, y + marginY);
  //Between the numbers got previously, I sweep the whole area in the bidimensional array
  //If it's available, I return true, if it's not, false
  for (let i = LEFT_BOUND; i <= RIGHT_BOUND; i++){
    for (let j = TOP_BOUND; j <= BOTTOM_BOUND; j++){
      if (board.grid[j][i] !== 0) {
        return false;
      }
    }
  }
  return true;
}

Form.prototype.getFreePosition = function(margin, call = 7){
  var x = this.random(cols);
  var y = this.random(rows);
  //If there are only 4 tries left to find room,
  //I divide the margin to be less restrictive
  if (call <= 4 && typeof margin === "number") {
    margin = Math.floor(margin / 2);
  }
  //If the number of tries is 0 or the spot is available,
  //I place the element wherever it falls
  if(call === 0 || this.checkSpaces(x,y,margin)){
    let pos = {x,y};
    return pos;
  } else {
    //I use the same function recursively while I don't have a suitable call and I have calls
    return this.getFreePosition(margin, --call);
  }
}

Form.prototype.randomArr = function (arr) {
  var rNum = Math.floor(Math.random() * arr.length);
  return arr[rNum];
}

Form.prototype.randomObj = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}

//Need the parameters to be able to use the function with badGuys and walls
//I need to check if the next position is the target to attack
Form.prototype.attack = function (nextPos, obstacle) {
  if(nextPos === obstacle && !user.shrinkingFromEnemy && !user.shrinkingFromWall) {
    user.health = user.health - this.strength;
    user.shrinkFromEnemy();
    board.lifeLess();
  }
}
