let drumX, drumY;

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  drumX = width / 2;
  drumY = 400;
}

function draw() {
  background(220);

  // Determine drum color: flicker between red and dark red every 250ms.
  let drumColor = (millis() % 500 < 250) ? color(255, 0, 0) : color(139, 0, 0);

  // Draw the drum with its face, arms, and legs.
  drawDrum(drumColor);

  // Position matchmaker on top of the drum.
  let matchmakerX = drumX;
  let matchmakerY = drumY - 120; // Adjust vertical offset as needed.

  // Flip the matchmaker every second (rotate 180°).
  let t = millis();
  let flip = floor(t / 1000) % 2; // 0 or 1.
  let rotationAngle = flip * PI;

  // Oscillate the small arm to simulate "raising his arm and dropping it".
  let armOscillation = sin(t / 200) * PI / 6; // Oscillates by ±30°.

  // Random body color that changes constantly.
  let bodyColor = color(random(255), random(255), random(255));

  // Draw the matchmaker.
  drawMatchmaker(matchmakerX, matchmakerY, rotationAngle, armOscillation, bodyColor);
}

function drawMatchmaker(x, y, rotation, armOsc, bodyColor) {
  push();
  translate(x, y);
  rotate(rotation);

  noStroke();
  fill(bodyColor);
  // Draw body as an ellipse.
  ellipse(0, 0, 50, 80);

  // Draw face: always white, no features.
  fill(255);
  ellipse(0, -30, 40, 40);

  // Draw arms with a black stroke.
  stroke(0);
  strokeWeight(4);
  
  // Big arm: drawn on the right side (parallel to the ground).
  line(25, 0, 25 + 40, 0);
  
  // Small arm: drawn on the left side; its endpoint oscillates to simulate raising and dropping.
  line(-25, 0, -25, -40 + armOsc * 20);
  
  pop();
}

function drawDrum(drumColor) {
  push();
  translate(drumX, drumY);
  
  noStroke();
  // Outer drum: flickering border.
  fill(drumColor);
  ellipse(0, 0, 200, 200);
  
  // Inner drum: white surface.
  fill(255);
  ellipse(0, 0, 150, 150);
  
  // Draw the drum's face.
  // Eyebrows: black lines with the inner ends lower than the outer ends.
  stroke(0);
  strokeWeight(3);
  // Left eyebrow: inner end at (-25, -20), outer end at (-45, -30).
  line(-25, -20, -45, -30);
  // Right eyebrow: inner end at (25, -20), outer end at (45, -30).
  line(25, -20, 45, -30);
  
  // Eyes: black ovals.
  noStroke();
  fill(0);
  ellipse(-25, 0, 20, 10); // left eye.
  ellipse(25, 0, 20, 10);  // right eye.
  
  // White highlights on the eyes.
  fill(255);
  ellipse(-27, -2, 5, 3);  // left highlight.
  ellipse(23, -2, 5, 3);   // right highlight.
  
  // Nose: black oval.
  fill(0);
  ellipse(0, 15, 10, 6);
  
  // Draw the drum's arms and hands (all in white).
  // Large arms: stationary and raised upward.
  stroke(255);
  strokeWeight(8);
  line(-100, 0, -100, -50); // left large arm.
  line(100, 0, 100, -50);   // right large arm.
  
  // Small arms (drumsticks): animate striking motion.
  let t = millis();
  let offset = sin(t / 100) * 10;  // vertical oscillation.
  stroke(255);
  strokeWeight(4);
  line(-70, 50, -70, 50 + offset); // left small arm.
  line(70, 50, 70, 50 + offset);   // right small arm.
  
  // Rounded hands at the ends of the small arms.
  noStroke();
  fill(255);
  ellipse(-70, 50 + offset, 10, 10); // left hand.
  ellipse(70, 50 + offset, 10, 10);  // right hand.
  
  // Draw the drum's legs and feet (both white).
  fill(255);
  // Legs: rectangular.
  rect(-30, 100, 20, 50);
  rect(10, 100, 20, 50);
  
  // Feet: plain ovals.
  ellipse(-20, 160, 30, 15);
  ellipse(20, 160, 30, 15);
  
  pop();
}
