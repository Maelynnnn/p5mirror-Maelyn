let x, y;
function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);
  cloud(x, y, 100);
  move();
}

function cloud(u, v, s) {
  // body
  noStroke();
  fill(255);
  circle(u, v, s);
  for (let angle = 0; angle < PI * 2; angle += PI / 6) {
    push();
    translate(u, v);
    rotate(angle);
    circle(s * 0.5, 0, s * 0.5);
    pop();
  }
  // face
  fill(0);
  circle(u - s * 0.3, v, s * 0.05);
  circle(u + s * 0.3, v, s * 0.05);
  arc(u, v, s * 0.3, s * 0.34, 0, PI);
}

function move() {
  y = noise(frameCount * 0.01) * height;
}
