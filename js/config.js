
// GLOBAL VARIABLES ----------------------------
var startedGame, timer, board, timerFunction, oppositeDir, codeToDirection = undefined;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOUNDARY = 'BOUNDARY';
const SHRINK = 'SHRINK';
const SHOOT = 'SHOOT';
const PAUSE_BUTTON = 'PAUSE_BUTTON';

var PAUSE = false;
const SLINKY = 's';
const WALL = 'w';
const BONUS = 'b';
const BADGUY = 'bg';
const GOAL = 'g'

const RHYTHM = 75;
const size = 1;
const enemy_size = 8;
const cols = 76;
const rows = cols/2;

const walls_limit = 20;
const bonus_limit = 2;
const badGuys_limit = 5;
var bonus_count = 200;
var badGuys_count = 200;
