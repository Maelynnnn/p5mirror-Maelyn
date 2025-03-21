const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const WALL_THICKNESS = 25;
const BRICK_WIDTH = 25;
const BRICK_HEIGHT = 10;

const BALL_RADIUS = 20;
const BALL_INIT_SPEED_X = 5;
const BALL_INIT_SPEED_Y = 5;

const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 20; 
const PADDLE_INIT_Y = 400; 
const PADDLE_SPEED = 10;

const ROW_COUNT = 4;
const COL_COUNT = 18;


let ballX, ballY;
let ballVelocityX, ballVelocityY;

let paddleX, paddleVelocityX;

let bricks = []; // 二维数组（boolean）或其他结构
let gameWon = false;


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  initGame();
}

function draw() {
  background(255);

  if (gameWon) {
    drawWinScreen();
    return;
  }

  drawWalls();
  drawBricks();
  drawPaddle();
  drawBall();

  updateBallPosition();
  updatePaddlePosition();

  checkVictory();
}


function initGame() {
  // 初始化球位置、速度
  ballX = CANVAS_WIDTH / 2;
  ballY = CANVAS_HEIGHT / 2;
  ballVelocityX = BALL_INIT_SPEED_X;
  ballVelocityY = BALL_INIT_SPEED_Y;

  paddleX = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
  paddleVelocityX = 0;

  bricks = [];
  for (let i = 0; i < ROW_COUNT; i++) {
    bricks[i] = [];
    for (let j = 0; j < COL_COUNT; j++) {
      bricks[i][j] = true;
    }
  }

  gameWon = false;
}

function drawWalls() {
  noStroke();
  fill(200);

  rect(0, 0, WALL_THICKNESS, CANVAS_HEIGHT);
  rect(CANVAS_WIDTH - WALL_THICKNESS, 0, WALL_THICKNESS, CANVAS_HEIGHT);

  rect(0, CANVAS_HEIGHT - WALL_THICKNESS, CANVAS_WIDTH, WALL_THICKNESS);
}

function drawBricks() {
  stroke(0);
  noFill();
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (bricks[i][j]) {
        let brickX = WALL_THICKNESS + j * BRICK_WIDTH;
        let brickY = i * BRICK_HEIGHT;
        rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);

        if (checkBrickCollision(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT)) {
          bricks[i][j] = false;
          ballVelocityY = -ballVelocityY; 
        }
      }
    }
  }
}

function drawPaddle() {
  stroke(0);
  noFill();
  rect(paddleX, PADDLE_INIT_Y, PADDLE_WIDTH, PADDLE_HEIGHT);

  if (
    ballX > paddleX - BALL_RADIUS &&
    ballX < paddleX + PADDLE_WIDTH + BALL_RADIUS &&
    ballY + BALL_RADIUS > PADDLE_INIT_Y && 
    ballY - BALL_RADIUS < PADDLE_INIT_Y + PADDLE_HEIGHT
  ) {
    ballVelocityY = -ballVelocityY;
  }
}

function drawBall() {
  noStroke();
  fill(100);
  ellipse(ballX, ballY, BALL_RADIUS);
}


function checkBrickCollision(brickX, brickY, w, h) {
  let ballLeft   = ballX - BALL_RADIUS / 2;
  let ballRight  = ballX + BALL_RADIUS / 2;
  let ballTop    = ballY - BALL_RADIUS / 2;
  let ballBottom = ballY + BALL_RADIUS / 2;

  let brickLeft   = brickX;
  let brickRight  = brickX + w;
  let brickTop    = brickY;
  let brickBottom = brickY + h;


  return (
    ballRight  > brickLeft &&
    ballLeft   < brickRight &&
    ballBottom > brickTop &&
    ballTop    < brickBottom
  );
}

function updateBallPosition() {
  ballX += ballVelocityX;
  ballY += ballVelocityY;


  if (ballX < WALL_THICKNESS + BALL_RADIUS / 2) {
    ballVelocityX = -ballVelocityX;
  } else if (ballX > CANVAS_WIDTH - WALL_THICKNESS - BALL_RADIUS / 2) {
    ballVelocityX = -ballVelocityX;
  }

  if (ballY < BALL_RADIUS / 2) {
    ballVelocityY = -ballVelocityY;
  }

  if (ballY > CANVAS_HEIGHT - WALL_THICKNESS - BALL_RADIUS / 2) {
    ballVelocityY = -ballVelocityY;
  }
}

function updatePaddlePosition() {
  paddleX += paddleVelocityX;

  if (paddleX < WALL_THICKNESS) {
    paddleX = WALL_THICKNESS;
  }
  if (paddleX > CANVAS_WIDTH - WALL_THICKNESS - PADDLE_WIDTH) {
    paddleX = CANVAS_WIDTH - WALL_THICKNESS - PADDLE_WIDTH;
  }
}

function checkVictory() {
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (bricks[i][j]) {
        return;
      }
    }
  }
  gameWon = true;
}

function drawWinScreen() {
  background("green");
  fill(255);
  textSize(32);
  let msg = "You won!";
  let txtWidth = textWidth(msg);
  text(msg, (CANVAS_WIDTH - txtWidth) / 2, CANVAS_HEIGHT / 2);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    paddleVelocityX = -PADDLE_SPEED;
  } else if (keyCode === RIGHT_ARROW) {
    paddleVelocityX = PADDLE_SPEED;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    paddleVelocityX = 0;
  }
}
