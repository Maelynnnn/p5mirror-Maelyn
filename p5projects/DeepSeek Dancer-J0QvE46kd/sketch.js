let matchmakerColor;
let drumColor;
let angle = 0;
let armAngle = 0;
let drumArmAngle = 0;

function setup() {
  createCanvas(400, 400);
  matchmakerColor = color(random(255), random(255), random(255));
  drumColor = color(255, 0, 0);
  frameRate(30);
}

function draw() {
  background(220);

  // Draw the drum
  drawDrum();

  // Draw the matchmaker
  drawMatchmaker();

  // Update angles for animations
  angle += 0.1;
  armAngle = sin(frameCount * 0.1) * 0.5;
  drumArmAngle = sin(frameCount * 0.2) * 0.8;
}

function drawDrum() {
  // Drum body
  fill(drumColor);
  stroke(0);
  rect(150, 200, 100, 100);

  // Drum surface (white)
  fill(255);
  rect(150, 200, 100, 20);

  // Drum face
  fill(0);
  // Eyebrows
  line(170, 220, 190, 210); // Left eyebrow
  line(230, 220, 210, 210); // Right eyebrow
  // Eyes
  ellipse(180, 230, 10, 15); // Left eye
  ellipse(220, 230, 10, 15); // Right eye
  fill(255);
  ellipse(181, 231, 4, 6); // Left eye highlight
  ellipse(221, 231, 4, 6); // Right eye highlight
  // Nose
  fill(0);
  ellipse(200, 240, 8, 12);

  // Drum arms
  fill(255);
  // Large arms (stationary)
  rect(140, 180, 10, 40); // Left arm
  rect(250, 180, 10, 40); // Right arm
  // Small arms (moving)
  push();
  translate(145, 220);
  rotate(drumArmAngle);
  rect(0, 0, 5, 30); // Left small arm
  pop();
  push();
  translate(255, 220);
  rotate(-drumArmAngle);
  rect(0, 0, 5, 30); // Right small arm
  pop();

  // Drum legs
  fill(255);
  rect(160, 300, 20, 50); // Left leg
  rect(220, 300, 20, 50); // Right leg
  // Drum feet
  ellipse(170, 350, 30, 15); // Left foot
  ellipse(230, 350, 30, 15); // Right foot
}

function drawMatchmaker() {
  // Matchmaker body
  matchmakerColor = color(random(255), random(255), random(255));
  fill(matchmakerColor);
  noStroke();
  ellipse(200, 150, 50, 80);

  // Matchmaker face (white)
  fill(255);
  ellipse(200, 130, 30, 30);

  // Matchmaker arms
  // Big arm (parallel to the ground)
  push();
  translate(200, 150);
  rotate(angle);
  fill(matchmakerColor);
  rect(-5, 0, 10, 50);
  pop();
  // Small arm (moving up and down)
  push();
  translate(200, 150);
  rotate(armAngle);
  fill(matchmakerColor);
  rect(-5, 0, 10, 30);
  pop();
}