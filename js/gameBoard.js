
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  this.zonesXY = [];
  //Form.call(this, health, strength);
}

GameBoard.prototype = Object.create(Form.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(cols).fill().map(() => Array(rows).fill(0));

}

GameBoard.prototype.getZone = function(x,y) {
  return Math.floor(x/8) + "__" + Math.floor(y/8);
}

GameBoard.prototype.getFreePosition = function(){
  let x = this.random(cols);
  let y = this.random(rows);
  let zone = this.getZone(x,y);
  console.log(x,y);
  console.log(this.grid[x][y]);
  if(this.grid[x][y]===0 && this.zonesXY.indexOf(zone) === -1){
    let pos = {x,y,zone};
    return pos;
  } else {
    return this.getFreePosition();
  }
}

GameBoard.prototype.randomStyle = function (arr) {
  var rNum = Math.floor(Math.random() * arr.length);
  return arr[rNum];
}

GameBoard.prototype.initScene = function () {
  this.drawBonus();


  const forms = {
    'bonus':    '<circle cx="21.5" cy="9.5" r=".5" id="bonus" class="form bonus"/>',
    'badGuy':   '<polygon points="44,24 45,24 45,25" id="badGuy" class="form badGuy"/>',
    'goal':     '<rect x="74" y="36" width="2" height="2" id="goal" class="form goal"/>',
    'walls': {
      'ice':   '<g class="form wall ice" style="filter: url(#glow);"><rect x="1" y="1" width="1" height="1" id="wall01_01"/>\
                  <rect x="2" y="1" width="1" height="1" id="wall01_02"/>\
                  <rect x="1" y="2" width="1" height="1" id="wall01_03"/>\
                  <rect x="2" y="2" width="1" height="1" id="wall01_04"/><g>',
      'wash':   '<g class="form wall wash" style="filter: url(#glow);"><rect x="14" y="2" width="1" height="1" id="wall01_01"/>\
                  <rect x="15" y="2" width="1" height="1" id="wall01_02"/>\
                  <rect x="14" y="3" width="1" height="1" id="wall01_03"/></g>',
      'normal':   '<g class="form wall normal"><rect x="22" y="32" width="1" height="1" id="wall03_01"/>\
                  <rect x="22" y="33" width="1" height="1" id="wall03_02"/></g>',
      'electric': '<g class="form wall electric" style="filter: url(#glow);"><rect x="34" y="22" width="1" height="1" id="wall04_01"/>\
                  <rect x="34" y="23" width="1" height="1" id="wall04_02"/>\
                  <rect x="34" y="24" width="1" height="1" id="wall04_03"/>\
                  <rect x="34" y="25" width="1" height="1" id="wall04_04"/></g>',
    }
  };
  const styles = ['normal','ice','electric','wash','blackHole','teletransport'];
  const powers = ['reverse','speedy','disable','shooting','superDamage','antidote', 'random'];
  //this.area.append(forms.user);
  //this.area.append(forms.user_path);
  //this.area.append(forms.bonus);
  //this.area.append(forms.badGuy);
  //this.area.append(forms.goal);
  //this.area.append(forms.walls.ice);
  //this.area.append(forms.walls.wash);
  //this.area.append(forms.walls.normal);
  //this.area.append(forms.walls.electric);

  //REFRESH SVG IN DOM to paint the forms created from jQuery
  board.area.html(board.area.html());
}

GameBoard.prototype.drawBonus = function () {
  const bonus_powers = ['reverse','speedy','disable','blur','bigger','invincible'];
  for (let i = 0; i <= bonus_limit; i++) {
    let pos = this.getFreePosition();
    let style = this.randomStyle(bonus_powers);
    console.log(pos, style);
    let x = ' cx="' + pos.x + '.5"';
    let y = ' cy="' + pos.y + '.5"';
    let bonus = '<circle class="form bonus ' + style + '"' + x + y + ' r=".5"/>';
    console.log(bonus);
    this.area.append(bonus);
    this.grid[pos.x][pos.y] = BONUS;
    this.zonesXY.push(pos.zone)
  }
}

GameBoard.prototype.drawGoal = function () {
  let x = this.random(cols);
  let y = this.random(rows);
  //let goal = <rect x="74" y="36" width="2" height="2" id="goal" class="form goal"/>
}
