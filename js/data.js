const forms = {
  'user':       '<svg id="user" class="form user" viewBox="0 0 1 1">\
	                <rect x="0" y="0" width="100%" height="100%"/>\
                </svg>',
  'user_path': '<svg id="user_path" class="form user_polygon" viewBox="0 0 1 1">\
                  <polygon points="0,0 0.5,0 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"/>\
                </svg>',
  'bonus':      '<svg id="bonus" class="form bonus" viewBox="0 0 1 1">\
                  <circle cx="50%" cy="50%" r="0.5"/>\
                </svg>',
  'badGuy':     '<svg id="badGuy" class="form badGuy" viewBox="0 0 1 1">\
	                <polygon points="0,0 1,0 1,1"/>\
                </svg>',
  'goal':       '<svg id="goal" class="form goal" viewBox="0 0 2 2">\
                  <rect x="0" y="0" width="100%" height="100%"/>\
                </svg>',
  'walls': {
    'wall01':   '<svg id="wall01" class="form wall wall01" viewBox="0 0 1 1">\
                  <rect x="0" y="0" width="50%" height="50%"/>\
                  <rect x="0.5" y="0" width="50%" height="50%"/>\
                  <rect x="0" y="0.5" width="50%" height="50%"/>\
                  <rect x="0.5" y="0.5" width="50%" height="50%"/>\
                </svg>',
    'wall02':   '<svg id="wall02" class="form wall wall02" viewBox="0 0 1 1">\
                  <rect x="0" y="0" width="50%" height="50%"/>\
                  <rect x="0.5" y="0" width="50%" height="50%"/>\
                  <rect x="0.5" y="0.5" width="50%" height="50%"/>\
                </svg>',
    'wall03':   '<svg id="wall03" class="form wall wall03" viewBox="0 0 0.5 1">\
                  <rect x="0" y="0" width="100%" height="50%"/>\
                  <rect x="0" y="0.5" width="100%" height="50%"/>\
                </svg>',
    'wall04':   '<svg id="wall04" class="form wall wall04" viewBox="0 0 0.5 2">\
                  <rect x="0" y="0" width="100%" height="25%"/>\
                  <rect x="0" y="0.5" width="100%" height="25%"/>\
                  <rect x="0" y="1" width="100%" height="25%"/>\
                  <rect x="0" y="1.5" width="100%" height="25%"/>\
                </svg>',
  }
  //'walls': ['','','','']
};

const $gameBoard = $('.gameBoard');

$gameBoard.append(forms.goal);
$gameBoard.append(forms.user);
$gameBoard.append(forms.user_path);
$gameBoard.append(forms.walls.wall01);
$gameBoard.append(forms.walls.wall02);
$gameBoard.append(forms.walls.wall03);
$gameBoard.append(forms.walls.wall04);
$gameBoard.append(forms.bonus);
$gameBoard.append(forms.badGuy);



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
