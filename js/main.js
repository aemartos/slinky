
// GRID ONCLICK --------------------------------

$('#guides').change(function() {
  if(this.checked) {
    for (let i = 0; i <= 100; i = i+2 ) {
      x1 = 'x1="' + i + '"';
      x2 = 'x2="' + i + '"';
      y1 = 'y1="0"';
      y2 = 'y2="100"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    for (let i = 0; i <= 50; i = i+2 ) {
      x1 = 'x1="0"';
      x2 = 'x2="100"';
      y1 = 'y1="' + i + '"';
      y2 = 'y2="' + i + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    $gameBoard.html($gameBoard.html());
  } else {
    $('.line').remove();
  }
});


// START GAME ----------------------------------

function startGame() {



  var user = new User();
  user.createUser();
  console.log(user);
  //REFRESH SVG IN DOM to paint the forms created from jQuery
  $gameBoard.html($gameBoard.html());
};
