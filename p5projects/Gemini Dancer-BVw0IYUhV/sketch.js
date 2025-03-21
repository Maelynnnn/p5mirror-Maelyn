let matchmakerColor;
let drumColor1;
let drumColor2;
let angle = 0;
let armAngle = 0;
let armDirection = 1;
let drumArmAngle = 0;
let drumArmDirection = 1;

function setup() {
  createCanvas(400, 400);
  matchmakerColor = color(random(255), random(255), random(255));
  drumColor1 = color(200, 0, 0);
  drumColor2 = color(100, 0, 0);
}

function draw() {
  background(220);

  // Drum
  let drumColor = lerpColor(drumColor1, drumColor2, sin(frameCount * 0.1) * 0.5 + 0.5);
  fill(drumColor);
  ellipse(width / 2, height / 2 + 50, 150, 80); // Drum body

  // Drum top surface
  fill(255);
  ellipse(width / 2, height / 2 + 50 - 10, 150, 10);

  // Drum face
  fill(0);
  ellipse(width / 2, height / 2 + 20, 20, 30); // Nose
  ellipse(width / 2 - 30, height / 2, 30, 20); // Eye 1
  ellipse(width / 2 + 30, height / 2, 30, 20); // Eye 2

  fill(255);
  ellipse(width / 2 - 25, height / 2 - 5, 5, 5); // Eye highlight 1
  ellipse(width / 2 + 25, height / 2 - 5, 5, 5); // Eye highlight 2

  // Eyebrows
  stroke(0);
  strokeWeight(3);
  line(width / 2 - 45, height / 2 - 20, width / 2 - 15, height / 2 - 30);
  line(width / 2 + 45, height / 2 - 20, width / 2 + 15, height / 2 - 30);
  noStroke();

  // Drum arms
  fill(255);
  rect(width / 2 - 80, height / 2 - 20, 20, 50); // Large arm 1
  rect(width / 2 + 60, height / 2 - 20, 20, 50); // Large arm 2

  push();
  translate(width / 2 - 70, height / 2 + 30);
  rotate(drumArmAngle);
  ellipse(0, 0, 20, 20); // Drumstick 1
  pop();

  push();
  translate(width / 2 + 70, height / 2 + 30);
  rotate(-drumArmAngle);
  ellipse(0, 0, 20, 20); // Drumstick 2
  pop();

  // Drum legs
  fill(255);
  rect(width / 2 - 30, height / 2 + 80, 20, 40); // Leg 1
  rect(width / 2 + 10, height / 2 + 80, 20, 40); // Leg 2
  ellipse(width / 2 - 20, height / 2 + 120, 30, 15); // Foot 1
  ellipse(width / 2 + 20, height / 2 + 120, 30, 15); // Foot 2

  // Matchmaker
  push();
  translate(width / 2, height / 2 - 30);
  rotate(angle);

  // Matchmaker body
  matchmakerColor = color(random(255), random(255), random(255));
  fill(matchmakerColor);
  ellipse(0, -30, 30, 60);

  // Matchmaker face
  fill(255);
  ellipse(0, -50, 20, 20);

  // Matchmaker arms
  fill(matchmakerColor);
  rect(-40, -30, 80, 10); // Large arm
  push();
  translate(0, -60);
  rotate(armAngle);
  rect(0, 0, 10, 40); // Small arm
  pop();

  pop();

  // Angle updates
  angle += 0.01;
  if (frameCount % 60 === 0) {
    angle += PI;
  }

  armAngle += 0.1 * armDirection;
  if (armAngle > PI / 4 || armAngle < -PI / 4) {
    armDirection *= -1;
  }

  drumArmAngle += 0.2 * drumArmDirection;
  if (drumArmAngle > PI / 6 || drumArmAngle < -PI / 6) {
    drumArmDirection *= -1;
  }
}