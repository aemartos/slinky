
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

Form.prototype.checkSpaces = function(x,y, margin) {
  if (x < 2 || x > cols - 5 || y < 2 || y > rows - 5) {
    return false;
  }
  let marginX = typeof margin  === "number" ? margin : margin.x;
  let marginY = typeof margin  === "number" ? margin : margin.y;
  let LEFT_BOUND = Math.max(0, x - marginX);
  let RIGHT_BOUND = Math.min(cols-1, x + marginX);
  let TOP_BOUND = Math.max(0, y - marginY);
  let BOTTOM_BOUND = Math.min(rows-1, y + marginY);
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
  if (call <= 4 && typeof margin === "number") {
    margin = Math.floor(margin / 2);
  }
  if(call === 0 || this.checkSpaces(x,y,margin)){
    let pos = {x,y};
    return pos;
  } else {
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
