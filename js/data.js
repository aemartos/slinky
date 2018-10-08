const forms = {
  'user': '<svg version="1.1" id="user" x="0px" y="0px" viewBox="0 0 1 1">\
	          <rect x="0" y="0" class="form user" width="1" height="1"/>\
          </svg>',
  'walls': {
    'wall01': '<svg></svg>',
    'wall02': '<svg></svg>',
    'wall03': '<svg></svg>',
    'wall04': '<svg></svg>'
  },
  //'walls': ['','','','']
  'bonus': '<svg></svg>',
  'badGuy': '<svg></svg>',
  'goal': '<svg version="1.1" id="user" x="0px" y="0px" viewBox="0 0 2 2">\
            <rect x="0" y="0" class="form user" width="2" height="2"/>\
          </svg>'
};

const $container = $('.container');
//console.log(forms.user);
$container.append(forms.goal);

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
