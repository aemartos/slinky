

const forms = {
  'user':       '<rect x="12" y="12" id="user" class="form user" width="2%" height="4%"/>',
  // 'user_path':  '<polygon points="30,8 32,8 32,6 34,6 34,8 34,10 32,10 30,10" id="user_path" class="form user_path"/>',
  'bonus':      '<circle cx="21" cy="9" r="1" id="bonus" class="form bonus"/>',
  'badGuy':     '<polygon points="44,44 46,44 46,46" id="badGuy" class="form badGuy"/>',
  'goal':       '<rect x="97.9" y="47.9" width="2%" height="4%" id="goal" class="form goal"/>',
  'walls': {
    'wall01':   '<rect x="2" y="2" width="2%" height="4%" id="wall01_01" class="form wall wall01 wall01_01"/>\
                <rect x="4" y="2" width="2%" height="4%" id="wall01_02" class="form wall wall01 wall01_02"/>\
                <rect x="2" y="4" width="2%" height="4%" id="wall01_03" class="form wall wall01 wall01_03"/>\
                <rect x="4" y="4" width="2%" height="4%" id="wall01_04" class="form wall wall01 wall01_04"/>',
    'wall02':   '<rect x="10" y="2" width="2%" height="4%" id="wall01_01" class="form wall wall01 wall01_01"/>\
                <rect x="12" y="2" width="2%" height="4%" id="wall01_02" class="form wall wall01 wall01_02"/>\
                <rect x="10" y="4" width="2%" height="4%" id="wall01_03" class="form wall wall01 wall01_03"/>',
    'wall03':   '<rect x="22" y="32" width="2%" height="4%" id="wall03_01" class="form wall wall03 wall03_01"/>\
                <rect x="22" y="34" width="2%" height="4%" id="wall03_02" class="form wall wall03 wall03_02"/>',
    'wall04':   '<rect x="34" y="22" width="2%" height="4%" id="wall04_01" class="form wall wall04 wall04_01"/>\
                <rect x="34" y="24" width="2%" height="4%" id="wall04_02" class="form wall wall04 wall04_02"/>\
                <rect x="34" y="26" width="2%" height="4%" id="wall04_03" class="form wall wall04 wall04_03"/>\
                <rect x="34" y="28" width="2%" height="4%" id="wall04_04" class="form wall wall04 wall04_04"/>',
  }
  //'walls': ['','','','']
};
const styles = ['normal','ice','electric','wash','blackHole','teletransport'];
const powers = ['reverse','speedy','disable','shooting','superDamage','antidote', 'random'];



const $gameBoard = $('#gameBoard');

// $gameBoard.append(forms.user);
// $gameBoard.append(forms.user_path);
// $gameBoard.append(forms.bonus);
// $gameBoard.append(forms.badGuy);
// $gameBoard.append(forms.goal);
// $gameBoard.append(forms.walls.wall01);
// $gameBoard.append(forms.walls.wall02);
// $gameBoard.append(forms.walls.wall03);
// $gameBoard.append(forms.walls.wall04);




function Form(health, strength) {
  this.health = health;
  this.strength = strength;
  this.path = '';
  this.style = '';
  this.power = '';
  this.x = undefined;
  this.y = undefined;
}

Form.prototype.random = function (num) {
  var random = Math.floor(Math.random() * num);
  if (random%2 === 0) {
    return random;
  } else {
    return this.random(num);
  }
}



// User

function User(name, health, strength) {
  this.name = name;
  Form.call(this, health, strength);
}

User.prototype = Object.create(Form.prototype);
User.prototype.constructor = User;


User.prototype.position = function () {
  this.x = this.random(100);
  this.y = this.random(50);
}

User.prototype.createUser = function () {
  this.position();
  var x = 'x="' + this.x + '"';
  var y = 'y="' + this.y + '"';
  var svg = '<rect id="user" class="form user"' + x + y + 'width="2%" height="4%"/>';
  $gameBoard.append(svg);
}

var user = new User();
user.createUser();

console.log(user);



//REFRESH SVG IN DOM to paint the forms created from jQuery
$gameBoard.html($gameBoard.html());
//console.log(document.querySelector('#user').getAttribute('x'));
