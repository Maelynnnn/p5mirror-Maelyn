let size;
let x = [];
let y = [];
let angle;
let pacex = [];
let pace = [];
let s;
let rotations;
let rotationsX;
let r, g, b, colorchange;
let disappear;
let ds, d;
let my;
let bgts = 0;
let starx = [];
let stary = [];

function setup() {
  createCanvas(400, 400);
  // x = [random(0, width),random(0, width),random(0, width)];
  // y = [random(0, height),random(0, height),random(0, height)];
  for(i = 0; i < 10; i ++){
    starx[i] = random(0, width);
    stary[i] = random(0, height);
  }
  
  for (i = 0; i < 5; i ++){
    x[i] = random(0, width);
    y[i] = random(0, height);
    pace[i] = random(0.2, 0.8);
    pacex [i] = random(0.2, 0.8);
  }
  size = [
    random(20, 50),
    random(20, 50),
    random(10, 20),
    random(20, 50),
    random(10, 20),
  ];
  angle = [];
  disappear = 255;
}

function draw() {
  background(20, 33, 61);

  for (i = 0; i < 20; i += 1) {
    stars(starx[i], stary[i]);
  }

  for (i = 0; i < 5; i += 1) {
    fishmove(i);
    push();
    translate(x[i], y[i] - size[i] * 0.14);
    s = sin(frameCount * 0.05);
    rotate((angle[i] / 8) * s);
    let my = map(y[i], 0, height, 0, 100);
    if (mouseIsPressed) {
      rotate(PI * my);
      if (size[i] > 0) {
        size[i] -= 0.01;
      }
    }
    if (sin(frameCount * 0.05) < 0) {
      rotate((angle[i] / 8) * -s * 2);
    }

    teridyfish(0, 0, size[i]);
    pop();

    if (y[i] < -30 || y[i] > height + 30) {
      pace[i] = -pace[i];
    }
    if (x[i] < -30 || x[i] > width + 30) {
      pacex[i] = -pacex[i];
    }
  }
}

function drawfish(px, py, psize){
    circle(px, py, psize * 0.4);

    ellipse(px, py + psize * 0.5, psize * 0.15, psize * 0.3);
    ellipse(px, py - psize * 0.5, psize * 0.15, psize * 0.3);
    ellipse(px + psize * 0.5, py, psize * 0.3, psize * 0.15);
    ellipse(px - psize * 0.5, py, psize * 0.3, psize * 0.15);

    ellipse(px, py + psize * 0.82, psize * 0.08, psize * 0.2);
    ellipse(px, py - psize * 0.82, psize * 0.08, psize * 0.2);
    ellipse(px + psize * 0.82, py, psize * 0.2, psize * 0.08);
    ellipse(px - psize * 0.82, py, psize * 0.2, psize * 0.08);

    ellipse(px, py + psize * 1.1, psize * 0.02, psize * 0.2);
    ellipse(px, py - psize * 1.1, psize * 0.02, psize * 0.2);
    ellipse(px + psize * 1.1, py, psize * 0.2, psize * 0.02);
    ellipse(px - psize * 1.1, py, psize * 0.2, psize * 0.02);
}

function teridyfish(px, py, psize) {
  noStroke();
  //   change color based on distance
  r = 255 - frameCount * (psize / 1000);
  g = 255 - frameCount * (psize / 1000);
  b = 255 - frameCount * (psize / 1000);
  fill(r, g, b, disappear);

  if (g < 110) {
    disappear -= frameCount * 0.0005;
    // console.log("gg");
    fill(r, g, b, disappear);
    drawfish(px, py, psize)
    
  } else {
    fill(r, g, b, disappear);
    drawfish(px, py, psize)
  }

  if (disappear < 150) {
    pace[i] = pace[i] * 0.99;
  }
  if (disappear < 10 || psize < 0.5) {
    rectMode(CENTER);
    fill(255, 255, 255, bgts);
    rect(0, 0, width * 3, height * 3);
    bgts += 0.1;
  }

  //console.log(x)
}

function fishmove(t) {
  // x[t] = x[t] + 5 * cos(frameCount * 0.05);

  let x_angle = sin(frameCount * 0.05);
  let y_angle = cos(frameCount * 0.05);

  // x[t] = 10 * sin(frameCount * 0.05);
  x[t] = x[t] + x_angle * 0.1 + pacex[t];
  y[t] -= pace[t] + y_angle * 0.1;
  angle[t] = atan2(x_angle, y_angle);
}

function stars(x, y) {
  noFill();
  stroke(255, 255, 255, 200);
  let shine = sin(frameCount * 0.01);
  let starshine = map(shine, -1, 1, 0, 1);
  strokeWeight(2 - 2 * starshine);
  point(x, y);
}
