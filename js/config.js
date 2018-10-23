
// GLOBAL VARIABLES ----------------------------
var user, startedGame, timer, board, timerFunction, timerfps, oppositeDir, codeToDirection = undefined;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOUNDARY = 'BOUNDARY';
const SHRINK = 'SHRINK';
const SHOOT = 'SHOOT';
const PAUSE_BUTTON = 'PAUSE_BUTTON';
const INFO_BUTTON = 'INFO_BUTTON';

var PAUSE = false;
var INFO = false;
var WIN = false;
var LOSE = false;
const SLINKY = 's';
const WALL = 'w';
const BONUS = 'b';
const BADGUY = 'bg';
const GOAL = 'g'

const RHYTHM = 75;
const FPS = 25;
const size = 1;
var counter =0;
var countdown_fps = 0;
const enemy_size = 8;
const cols = 76; //76
const rows = cols/2;

const walls_limit = 10;
const bonus_limit = 2;
const badGuys_limit = 5;
var bonus_count = 200;
var badGuys_count = 150;
