const forms = {
  'user':       '<rect x="12" y="12" id="user" class="form user" width="2%" height="4%"/>',
  'user_path':  '<polygon points="0,0 0.5,0 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" id="user_path" class="form user_polygon"/>',
  'bonus':      '<circle cx="21" cy="9" r="1" id="bonus" class="form bonus"/>',
  'badGuy':     '<polygon points="0,0 1,0 1,1" id="badGuy" class="form badGuy"/>',
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

const $gameBoard = $('#gameBoard');

$gameBoard.append(forms.user);
//$gameBoard.append(forms.user_path);
$gameBoard.append(forms.bonus);
// $gameBoard.append(forms.badGuy);
$gameBoard.append(forms.goal);
$gameBoard.append(forms.walls.wall01);
$gameBoard.append(forms.walls.wall02);
$gameBoard.append(forms.walls.wall03);
$gameBoard.append(forms.walls.wall04);


//GRID------------------------- svg

for (let i = 0; i <= 100; i = i+2 ) {
  x1 = 'x1="' + i + '"';
  x2 = 'x2="' + i + '"';
  y1 = 'y1="0"';
  y2 = 'y2="100"';
  line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
  $gameBoard.append(line);
}

for (let i = 0; i <= 100; i = i+2 ) {
  x1 = 'x1="0"';
  x2 = 'x2="100"';
  y1 = 'y1="' + i + '"';
  y2 = 'y2="' + i + '"';
  line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
  $gameBoard.append(line);
}



//GRID------------------------- divs

// for (let i = 1; i < 100; i++) {
//   if (i%2 === 1) {
//     span = '<span class="guide guide_v" style="left:' + i + '%;"' + '></span>';
//     $('#grid').append(span);
//   }
// }

// for (let i = 1; i <= 50; i++) {
//   span = '<span class="guide"></span>';
//   $('.row').append(span);
// }

// for (let j = 1; j <= 50; j++) {
//   span = '<span class="guide"></span>';
//   $('.column').append(span);
// }





//REFRESH SVG IN DOM to paint the forms created from jQuery
$gameBoard.html($gameBoard.html());

const styles = ['normal','ice','electric','wash','blackHole','teletransport'];
// const styles = {
//   'style01': 'normal', // nothing special
//   'style02': 'ice', //can't stand in it
//   'style03': 'electric', //takes half of the life (and makes you electric?)
//   'style04': 'wash', //takes half of the life (and makes you on fire?)
//   'style05': 'blackHole', //die automatically
//   'style06': 'teletransport' //between this kind of walls
// };

const powers = ['reverse','speedy','disable','shooting','superDamage','antidote', 'random'];
// const powers = {
//   'power01': 'reverse', // upside down movement
//   'power02': 'speedy', // super fast movement
//   'power03': 'disable', // user can't control anything
//   'power04': 'shooting', // super shooting, automatic trigger
//   'power05': 'superDamage', // double damage to enemies
//   'power06': 'antidote', // wall effects or other side effects disappear
//   'power07': 'random'
// };


// function Form(health, strength, svg) {
//   this.name = '';
//   this.health = health;
//   this.strength = strength;
//   this.path = svg;
//   this.style = '';
//   this.power = '';
//   this.position = [];
// }

// Form.prototype.random = function () {
//   var random = Math.floor(Math.random()*this.words.length);
// }


// // User
// var user = new Form(3, 2, '<svg></svg>');

// function User(health, strength, svg) {
//   Form.call(this, health, strength, svg);
// }

// User.prototype = Object.create(Form.prototype);
// User.prototype.constructor = User;



// let user = {
//   'name': '',
//   'lifes': 3,
//   'path': '<svg></svg>',
//   'style': '',
//   'damage': 2,
//   'power': '',
//   'position': []
//   // 'x': 0,
//   // 'y': 0
// };

// let wall = {
//   'name': 'wall01',
//   'type': 'wall',
//   'lifes': 6, //if the user hits the walls, can make them disappear
//   'path': '<svg></svg>',
//   'style': '',
//   'damage': undefined,
//   'position': []
//   // 'x': 0,
//   // 'y': 0
// };

// let badGuy = {
//   'name': 'badGuy01',
//   'type': 'badGuy',
//   'lifes': 4,
//   'path': '<svg></svg>',
//   'style': '',
//   'damage': 1,
//   'position': []
//   // 'x': 0,
//   // 'y': 0
// };

// let bonus = {
//   'name': 'bonus01',
//   'type': 'bonus',
//   'lifes': 1,
//   'path': '<svg></svg>',
//   'style': '',
//   'power': '',
//   'position': []
//   // 'x': 0,
//   // 'y': 0
// }
