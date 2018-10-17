
// GameBoard

function GameBoard() {
  this.area = $('#gameBoard');
  this.grid = [];
  this.users = [];
  //Form.call(this, health, strength);
}

GameBoard.prototype = Object.create(Form.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.createGrid = function () {
  const viewbox = '0 0 ' + cols + ' ' + rows;
  this.area.attr('viewBox', viewbox);
  this.grid = Array(rows/2).fill().map(() => Array(cols/2).fill(0));
}

GameBoard.prototype.drawThings = function () {
  const forms = {
    //'user':       '<rect x="12" y="12" id="user" class="form user" width="2%" height="4%"/>',
    // 'user_path':  '<polygon points="30,8 32,8 32,6 34,6 34,8 34,10 32,10 30,10" id="user_path" class="form user_path"/>',
    'bonus':      '<circle cx="21" cy="9" r="1" id="bonus" class="form bonus"/>',
    'badGuy':     '<polygon points="44,44 46,44 46,46" id="badGuy" class="form badGuy"/>',
    'goal':       '<rect x="148" y="72" width="4" height="4" id="goal" class="form goal"/>',
    'walls': {
      'ice':   '<g class="form wall ice" style="filter: url(#glow);"><rect x="2" y="2" width="4" height="4" id="wall01_01"/>\
                  <rect x="6" y="2" width="4" height="4" id="wall01_02"/>\
                  <rect x="2" y="6" width="4" height="4" id="wall01_03"/>\
                  <rect x="6" y="6" width="4" height="4" id="wall01_04"/><g>',
      'ice2':   '<g class="form wall ice" style="filter: url(#glow);"><rect x="2" y="20" width="2" height="2" id="wall01_01"/>\
                  <rect x="4" y="20" width="2" height="2" id="wall01_02"/>\
                  <rect x="2" y="22" width="2" height="2" id="wall01_03"/>\
                  <rect x="4" y="22" width="2" height="2" id="wall01_04"/><g>',
      'wash':   '<g class="form wall wash" style="filter: url(#glow);"><rect x="14" y="2" width="2" height="2" id="wall01_01"/>\
                  <rect x="16" y="2" width="2" height="2" id="wall01_02"/>\
                  <rect x="14" y="4" width="2" height="2" id="wall01_03"/></g>',
      'wall03':   '<g class="form wall normal"><rect x="22" y="32" width="2" height="2" id="wall03_01"/>\
                  <rect x="22" y="34" width="2" height="2" id="wall03_02"/></g>',
      'wall04':   '<rect x="34" y="22" width="2" height="2" id="wall04_01"/>\
                  <rect x="34" y="24" width="2" height="2" id="wall04_02"/>\
                  <rect x="34" y="26" width="2" height="2" id="wall04_03"/>\
                  <rect x="34" y="28" width="2" height="2" id="wall04_04"/>',
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
  this.area.append(forms.goal);
  this.area.append(forms.walls.ice);
  this.area.append(forms.walls.ice2);
  this.area.append(forms.walls.wash);
  this.area.append(forms.walls.wall03);
  //this.area.append(forms.walls.wall04);
}
