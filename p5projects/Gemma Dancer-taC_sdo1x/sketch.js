let matchmakerColor;
let matchmakerArmAngle = 0;
let matchmakerRotation = 0;
let drumColor;
let drumArmAngle = 0;

function setup() {
  createCanvas(600, 600);
  matchmakerColor = color(random(255), random(255), random(255));
  drumColor = color(200, 0, 0); // Dark Red
}

function draw() {
  background(0);

  // Matchmaker
  drawMatchmaker();

  // Drum
  drawDrum();
}

function drawMatchmaker() {
  push();
  translate(width / 2, height / 2 - 50); // Position the matchmaker
  rotate(matchmakerRotation);

  // Body
  fill(matchmakerColor);
  noStroke();
  ellipse(0, 0, 80, 120);

  // Head
  fill(255);
  ellipse(0, -40, 60, 60);

  // Arms
  push();
  rotate(matchmakerArmAngle);
  fill(matchmakerColor);
  rect(-40, 10, 80, 10); // Big arm
  pop();

  fill(matchmakerColor);
  rect(-10, -60, 10, 40); // Small arm

  // Update matchmaker color and arm angle
  matchmakerColor = color(random(255), random(255), random(255));
  matchmakerArmAngle = sin(frameCount * 0.05) * 30; // Oscillating arm
  matchmakerRotation += 0.01; // Rotate slowly
  pop();
}

function drawDrum() {
  push();
  translate(width / 2, height / 2 + 50); // Position the drum

  // Drum Body
  fill(drumColor);
  noStroke();
  ellipse(0, 0, 100, 60);

  // Drum Surface
  fill(255);
  ellipse(0, 0, 90, 50);

  // Drum Face
  // Eyebrows
  fill(0);
  arc(10, -10, 30, 10, PI + QUARTER_PI, QUARTER_PI); // Eyebrows (angled)

  // Eyes
  fill(0);
  ellipse(-10, -5, 10, 8);
  ellipse(10, -5, 10, 8);

  // Eye Highlights
  fill(255);
  ellipse(-8, -6, 3, 3);
  ellipse(8, -6, 3, 3);

  // Nose
  fill(0);
  ellipse(0, 5, 8, 5);

  // Arms
  push();
  rotate(drumArmAngle);
  fill(255);
  rect(-30, -40, 10, 40); // Big arm
  rect(30, -40, 10, 40); // Big arm
  pop();

  // Small Arms (drumsticks)
  push();
  rotate(sin(frameCount * 0.1) * 20); // Oscillate the arms
  fill(255);
  rect(-40, 10, 5, 20); // Small arm 1
  rect(40, 10, 5, 20); // Small arm 2
  pop();

  // Legs
  fill(255);
  rect(-30, 30, 10, 30); // Left leg
  rect(30, 30, 10, 30); // Right leg

  // Feet
  fill(255);
  ellipse(-35, 60, 15, 8); // Left foot
  ellipse(35, 60, 15, 8); // Right foot

  // Drum color flicker
  if (frameCount % 60 < 30) {
    drumColor = color(200, 0, 0); // Dark Red
  } else {
    drumColor = color(255, 0, 0); // Red
  }

  pop();
}