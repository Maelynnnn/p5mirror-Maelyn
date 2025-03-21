//Improvement points:
//1. Clarify variable naming to minimize confusion
//2. split the logic into multiple functions, each focusing on a single task
//3. Add moderate comments to explain the main logic.
//4. avoid repetitive or ineffective operations, reduce the “magic number”.


const CANVAS_SIZE = 600;
const STAR_COUNT = 100;
const INIT_FISH_COUNT = 3;
const STAR_MAX_OPACITY = 200;
const STAR_MIN_WEIGHT = 0;
const STAR_MAX_WEIGHT = 2; 
const SHINE_DISTANCE = 150;

// array store position
let starX = [];
let starY = [];

let fishX = [];
let fishY = [];
let fishVelX = [];         // Vx
let fishVelY = [];         // Vy
let fishSize = [];         // size
let fishAngle = [];        // angle

let savedVelX;             // when pause, save Vx
let savedVelY;             // when pause, save Vy
let saveSpeed = false;
let alphaDisappear = 255;
let backgroundFade = 0; 
let birthSize;             // new fish size
let windPace = 2;          //wind speed
let windXpos;              // wind x

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  refreshAll();
}

function draw() {
  background(20, 33, 61);
  for (let i = 0; i < STAR_COUNT; i++) {
    drawStar(starX[i], starY[i]);
  }
  for (let i = 0; i < fishX.length; i++) {
    updateFishPosition(i);
    drawFish(i);
    checkCollisionBounds(i);
    checkNearbyObjects(i);
  }
}


function updateFishPosition(i) {

  const xAngle = sin(frameCount * 0.05);
  const yAngle = cos(frameCount * 0.05);

  fishX[i] += xAngle * 0.1 + fishVelX[i];
  fishY[i] -= fishVelY[i] + yAngle * 0.1;
  fishAngle[i] = atan2(xAngle, yAngle);

  if (keyIsPressed && (key === 'w' || key === 'W')) {
    fishX[i] = fishX[i] + xAngle * 0.1 - abs(3 * fishVelX[i]);
    windEffect();
  } else {
    windXpos = width - windPace + 100;
    windPace = 2;
  }
}


function drawFish(i) {
  push();
  translate(fishX[i], fishY[i]);

  if (fishSize[i] > 2) {
    fishVelX[i] = 0;
    fishVelY[i] = 0;
  }

  const mappedY = map(fishY[i], 0, height, 0, 100);

  if (mouseIsPressed) {
    // press mouse to rotate
    rotate(PI * mappedY * 10);

    if (fishSize[i] > 0) {
      fishSize[i] -= 0.005;
    }

    //stop fish
    let distanceMouseFish = dist(mouseX, mouseY, fishX[i], fishY[i]);
    if (distanceMouseFish < 10 && !saveSpeed) {
      rotate(PI * 80 * sin(frameCount * 0.05)); 
      savedVelY = fishVelY[i];
      fishVelY[i] = 0;
      savedVelX = fishVelX[i];
      fishVelX[i] = 0;
      saveSpeed = true;
    }
  }
  if (keyIsPressed && (key === 'm' || key === 'M')) {
    fishVelY[i] = savedVelY;
    fishVelX[i] = savedVelX;
    saveSpeed = false;
  }
  drawSatrick(0, 0, fishSize[i]);
  pop();
}


function checkCollisionBounds(i) {
  if (fishY[i] < -30 || fishY[i] > height + 30) {
    fishVelY[i] = -fishVelY[i];
  }
  if (fishX[i] < -30 || fishX[i] > width + 30) {
    fishVelX[i] = -fishVelX[i];
  }
}

//check distance
function checkNearbyObjects(i) {
  for (let j = 0; j < fishX.length; j++) {
    if (i !== j) {
      let distBetween = dist(fishX[i], fishY[i], fishX[j], fishY[j]);
      if (distBetween < SHINE_DISTANCE) {
        drawShine(fishX[i], fishY[i], fishSize[i]);
      }
    }
  }
}



function drawSatrick(px, py, psize) {
  noStroke();

  let fadeFactor = psize / 5000;
  let rc = 255 - frameCount * fadeFactor;
  let gc = 255 - frameCount * fadeFactor;
  let bc = 255 - frameCount * fadeFactor;

  fill(rc, gc, bc, alphaDisappear);

  if (gc < 110) {
    alphaDisappear -= frameCount * 0.0005;
  }

  if (alphaDisappear < 10 || psize < 0.5) {
    rectMode(CENTER);
    fill(120, 192, 224, backgroundFade);
    rect(0, 0, width * 3, height * 3);
    backgroundFade += 0.1;
  }
  drawRota(px, py, psize);
}


function drawRota(cx, cy, sizeVal) {
  // if small enough, turn red
  if (sizeVal < 3) {
    fill(154, 3, 30);
  } else {
    fill(255);
  }
  noStroke();
  circle(cx, cy, sizeVal * 8);

  for (let angleVal = 0; angleVal < TWO_PI; angleVal += PI / 2) {
    push();
    translate(cx, cy);
    rotate(angleVal);

    for (let i = sizeVal * 2; i < sizeVal * 26; i += (sizeVal + 6)) {
      let j = 20 * sin((frameCount - i) / 50);
      let s = map(i, 0, 100, 20, 1);
      circle(i - sizeVal * 2, j, s * sizeVal * 0.3);
    }
    pop();
  }
}


function drawShine(cx, cy, sizeVal) {
  stroke(255, 50);
  for (let angle = 0; angle < 10 * PI; angle += PI * 0.05) {
    push();
    translate(cx, cy);
    rotate(angle);
    line(
      0,
      0,
      sizeVal * 10 * sin(frameCount * 0.02),
      sizeVal * 10
    );
    pop();
  }
}

//draw background star
function drawStar(starPosX, starPosY) {
  noFill();
  stroke(255, 255, 255, STAR_MAX_OPACITY);
  let shineSin = sin(frameCount * 0.03);
  let starshine = map(shineSin, -1, 1, 0, 1);
  strokeWeight(lerp(STAR_MAX_WEIGHT, STAR_MIN_WEIGHT, starshine));
  point(starPosX, starPosY);
}


function windEffect() {
  // press w to call wind
  windXpos = width - windPace + 100;
  for (let k = 0; k < height; k += 80) {
    for (let i = 0; i < 400; i += 10) {
      let j = 20 * sin((frameCount - i) / 50);
      let s = map(i, 0, 300, 5, 1);
      fill(255, 200 - i * 1.5);
      circle(windXpos + i / 1.5, k + j, s);
    }
    k += 2;
    if (windXpos < -400) {
      windXpos = width - windPace + 100;
      windPace = 2;
    }
  }
  windPace += 2; 
}


function keyPressed() {
  // press r reset
  if (key === 'r' || key === 'R') {
    removeAllFish();
    refreshAll();
  }
}

//click to create a fis
function mousePressed() {
  fishX.push(mouseX);
  fishY.push(mouseY);
  fishVelX.push(random(0.2, 0.8));
  fishVelY.push(random(0.2, 0.8));
  fishSize.push(birthSize);
}

//clear array
function removeAllFish() {
  fishX.splice(0, fishX.length);
  fishY.splice(0, fishY.length);
  fishVelX.splice(0, fishVelX.length);
  fishVelY.splice(0, fishVelY.length);
  fishSize.splice(0, fishSize.length);
  fishAngle.splice(0, fishAngle.length);
}

function refreshAll() {
  // initialize
  for (let i = 0; i < STAR_COUNT; i++) {
    starX[i] = random(width);
    starY[i] = random(height);
  }

  for (let i = 0; i < INIT_FISH_COUNT; i++) {
    fishX[i] = random(100, width - 100);
    fishY[i] = random(100, height - 100);
    fishVelX[i] = random(0.2, 0.8);
    fishVelY[i] = random(0.2, 0.8);
    fishSize[i] = random(4, 4.5);
    fishAngle[i] = 0;
  }

  alphaDisappear = 255;    
  birthSize = random(1, 2);   
  backgroundFade = -100;   
  saveSpeed = false;   
  windXpos = width - windPace + 100;
}
