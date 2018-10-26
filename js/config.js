// GLOBAL VARIABLES ----------------------------
var user,
  startedGame,
  goal,
  timer,
  board,
  timerFunction,
  timerfps,
  oppositeDir,
  codeToDirection = undefined;
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const BOUNDARY = "BOUNDARY";
const SHRINK = "SHRINK";
const SHOOT = "SHOOT";
const PAUSE_BUTTON = "PAUSE_BUTTON";
const INFO_BUTTON = "INFO_BUTTON";

var MUSIC = true;
var PAUSE = false;
var INFO = false;
var WIN = false;
var LOSE = false;
const SLINKY = "s";
const WALL = "w";
const BONUS = "b";
const BADGUY = "bg";
const GOAL = "g";

var RHYTHM = 75;
var FPS = 27;
var size = 1;
var counter = 0;
var countdown_fps = 0;
var cols = 76; //76
var rows = cols / 2;

var walls_limit = 10;
var bonus_limit = 2;
var badGuys_limit = 7;
var bonus_count = 200;
var badGuys_count = 150;


// ------ SOUNDS

var rebound = new Audio('sounds/rebound.mp3');
var shake = new Audio('sounds/shake.mp3');
var bonus = new Audio('sounds/mario-coin.mp3');
var crash = new Audio('sounds/crash.mp3');
var hurt = new Audio('sounds/hurt.wav');
var lose = new Audio('sounds/mario-lose.mp3');
var win = new Audio('sounds/mario-win.mp3');
var applause = new Audio('sounds/applause.mp3');
var thugLife = new Audio('sounds/thug-life.mp3');
var music = new Audio('sounds/MikeNoise-Low EarthOrbit.mp3');

//https://soundcloud.com/odysseus_bsp/sets/cybercity
