
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  //Form.call(this, health, strength);
}

GameBoard.prototype = Object.create(Form.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.createGrid = function () {
  this.grid = Array(rows).fill().map(() => Array(cols).fill(0));
}

GameBoard.prototype.drawThings = function () {
  const forms = {
    //'user':       '<rect x="12" y="12" id="user" class="form user" width="2%" height="4%"/>',
    // 'user_path':  '<polygon points="30,8 32,8 32,6 34,6 34,8 34,10 32,10 30,10" id="user_path" class="form user_path"/>',
    'bonus':      '<circle cx="21" cy="9" r="1" id="bonus" class="form bonus"/>',
    'badGuy':     '<polygon points="44,44 46,44 46,46" id="badGuy" class="form badGuy"/>',
    'goal':       '<rect x="148" y="72" width="4" height="4" id="goal" class="form goal"/>',
    'walls': {
      'wall01':   '<g class="ice" style="filter: url(#glow);"><rect x="2" y="2" width="2" height="2" id="wall01_01" class="form wall wall01 wall01_01 ice2"/>\
                  <rect x="4" y="2" width="2" height="2" id="wall01_02" class="form wall wall01 wall01_02 ice2"/>\
                  <rect x="2" y="4" width="2" height="2" id="wall01_03" class="form wall wall01 wall01_03 ice2"/>\
                  <rect x="4" y="4" width="2" height="2" id="wall01_04" class="form wall wall01 wall01_04 ice2"/><g>',
      'wall02':   '<rect x="10" y="2" width="2" height="2" id="wall01_01" class="form wall wall01 wall01_01"/>\
                  <rect x="12" y="2" width="2" height="2" id="wall01_02" class="form wall wall01 wall01_02"/>\
                  <rect x="10" y="4" width="2" height="2" id="wall01_03" class="form wall wall01 wall01_03"/>',
      'wall03':   '<rect x="22" y="32" width="2" height="2" id="wall03_01" class="form wall wall03 wall03_01"/>\
                  <rect x="22" y="34" width="2" height="2" id="wall03_02" class="form wall wall03 wall03_02"/>',
      'wall04':   '<rect x="34" y="22" width="2" height="2" id="wall04_01" class="form wall wall04 wall04_01"/>\
                  <rect x="34" y="24" width="2" height="2" id="wall04_02" class="form wall wall04 wall04_02"/>\
                  <rect x="34" y="26" width="2" height="2" id="wall04_03" class="form wall wall04 wall04_03"/>\
                  <rect x="34" y="28" width="2" height="2" id="wall04_04" class="form wall wall04 wall04_04"/>',
    },
    //'background': '<rect x="0" y="0" id="background" class="background" width="100%" height="100%"/>'
    //'walls': ['','','','']
  };
  const styles = ['normal','ice','electric','wash','blackHole','teletransport'];
  const powers = ['reverse','speedy','disable','shooting','superDamage','antidote', 'random'];
  console.log(this.area);
  //this.area.append(forms.user);
  //this.area.append(forms.user_path);
  //this.area.append(forms.bonus);
  //this.area.append(forms.badGuy);
  //this.area.append(forms.goal);
  //this.area.append(forms.walls.wall01);
  //this.area.append(forms.walls.wall02);
  //this.area.append(forms.walls.wall03);
  //this.area.append(forms.walls.wall04);
}
