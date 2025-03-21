let x, y, size;
let angle;
let pacex;
let pace;
let s;
let rotations;
let rotationsX;
let r, g, b, colorchange;
let disappear;
let ds, d;
let my;

function setup() {
  createCanvas(400, 400);
  // x = [random(0, width),random(0, width),random(0, width)];
  // y = [random(0, height),random(0, height),random(0, height)];
  x = [random(0, width), random(0, width), random(0, width)];
  y = [random(0, height), random(0, height), random(0, height)];
  size = [random(20, 50), random(20, 50), random(10, 20)];
  angle = [];
  pace = [random(0.2, 0.8), random(0.2, 0.8), random(0.2, 0.8)];
  pacex = [random(0.2, 0.8), random(0.2, 0.8), random(0.2, 0.8)];
  rotations = [true, true, true];
  rotationsX = [true, true, true];
  disappear = 255;
}

function draw() {
  background(0);
  for (i = 0; i < 3; i += 1) {
    fishmove(i);
    push();
    translate(x[i], y[i] - size[i] * 0.14);
    s = sin(frameCount * 0.05);
    rotate((angle[i] / 8) * s);
    let my = map(y[i],0, height, 0, 10)
    if (rotations[i] == false) {
      rotate((PI * my) );
      my = -my;
    }
    if (rotationsX[i] == false) {
      console.log("hh");
      rotate((PI * my));
      my = -my
    }
    if (sin(frameCount * 0.05) < 0) {
      rotate((angle[i] / 8) * -s * 2);
    }

    teridyfish(0, 0, size[i]);
    pop();

    if (y[i] < -30 || y[i] > height + 30) {
      pace[i] = -pace[i];
      rotations[i] = !rotations[i];
    }
    if (x[i] < -30 || x[i] > width + 30) {
      pacex[i] = -pacex[i];
      rotationsX[i] = !rotationsX[i];
    }
  }
}

function teridyfish(px, py, psize) {
  noStroke();
  //   change color based on distance
  let d = dist(px, py, mouseX, mouseY);
  let ds = map(d, 0, width, 0, 100);
  r = 255 - ds;
  g = 230 - frameCount * (psize / 1000);
  b = 0;
  fill(r, g, b, disappear);

  if (g < 110) {
    disappear -= frameCount * 0.0005;
    console.log("gg");
    fill(r, g, b, disappear);

    circle(px, py, psize * 0.5);

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
  } else {
    fill(r, g, b, disappear);

    circle(px, py, psize * 0.5);

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

  if (disappear < 150) {
    pace[i] = pace[i] * 0.99;
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
