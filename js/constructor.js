
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
  var random = (Math.floor(Math.random() * num));
  return random;
}
