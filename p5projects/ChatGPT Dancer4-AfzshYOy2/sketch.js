function setup() {
  createCanvas(800, 600);
  frameRate(60);
}

function draw() {
  background(220);
  
  // --- Drum (Static) ---
  let drumX = width / 2;
  let drumY = 400;
  drawDrum(drumX, drumY);
  
  // --- Matchmaker (Standing on Top of the Drum) ---
  // Positioned relative to the drum.
  let matchmakerX = drumX;
  let matchmakerY = drumY - 120;
  
  // A new random color for the matchmaker’s body parts (changes every frame)
  let bodyColor = color(random(255), random(255), random(255));
  
  // --- Animate the Arms ---
  // For each arm, the upper arm rotates (simulating shoulder lifting)
  // and the forearm (attached at the elbow) oscillates.
  let upperArmAngle = map(sin(millis() / 1000), -1, 1, 0, -PI / 3);
  let forearmAngle = map(sin(millis() / 800), -1, 1, 0, -PI / 6);
  
  // --- Animate the Legs ---
  // The thigh rotates about the hip (fixed point) and the calf follows with a constant relative bend.
  let thighAngle = map(sin(millis() / 1000), -1, 1, 0, -PI / 6); // lifts between 0 and -30°
  let calfAngle = -PI / 12;  // constant relative bend (about -15°)
  
  drawMatchmaker(matchmakerX, matchmakerY, bodyColor, upperArmAngle, forearmAngle, thighAngle, calfAngle);
}

// Draw the matchmaker with a body (trunk), face, two arms, and two legs (thighs and calves)
function drawMatchmaker(x, y, bodyColor, upperArmAngle, forearmAngle, thighAngle, calfAngle) {
  push();
  translate(x, y);
  noStroke();
  
  // --- Main Body Trunk (Quadrilateral) ---
  fill(bodyColor);
  quad(-20, -40, 20, -40, 25, 40, -25, 40);
  
  // --- Face (Always White, Featureless) ---
  fill(255);
  ellipse(0, -50, 30, 30);
  
  // --- Right Arm (Hierarchical: Upper Arm & Forearm) ---
  push();
    translate(20, -30);  // Right shoulder position relative to trunk
    push();
      rotate(upperArmAngle);
      fill(bodyColor);
      rectMode(CORNER);
      rect(0, -5, 40, 10);  // Upper arm segment
      translate(40, 0);     // Move to elbow
      rotate(forearmAngle);
      rect(0, -4, 30, 8);   // Forearm segment
    pop();
  pop();
  
  // --- Left Arm (Mirrored) ---
  push();
    translate(-20, -30);  // Left shoulder position
    scale(-1, 1);         // Mirror horizontally
    push();
      rotate(upperArmAngle);
      fill(bodyColor);
      rectMode(CORNER);
      rect(0, -5, 40, 10);  // Upper arm segment
      translate(40, 0);     // Elbow
      rotate(forearmAngle);
      rect(0, -4, 30, 8);   // Forearm segment
    pop();
  pop();
  
  // --- Right Leg (Thigh & Calf) ---
  push();
    translate(10, 40);  // Right hip joint (from trunk bottom)
    rotate(thighAngle);
    fill(bodyColor);
    rectMode(CORNER);
    rect(0, 0, 8, 30);   // Thigh segment
    translate(0, 30);    // Move to knee
    rotate(calfAngle);
    rect(0, 0, 8, 30);   // Calf segment
  pop();
  
  // --- Left Leg (Thigh & Calf) ---
  push();
    translate(-10, 40); // Left hip joint
    rotate(thighAngle);
    fill(bodyColor);
    rectMode(CORNER);
    rect(0, 0, 8, 30);   // Thigh segment
    translate(0, 30);    // Knee
    rotate(calfAngle);
    rect(0, 0, 8, 30);   // Calf segment
  pop();
  
  pop();
}

// Draw the drum in a side view with a white top and red body.
// The drum’s face is drawn on the red part. Its arms are built hierarchically,
// with a fixed (large) upper arm and a connected (small) forearm that oscillates like a mallet.
function drawDrum(x, y) {
  push();
  translate(x, y);
  
  // --- Drum Dimensions ---
  let w = 200;
  let h = 150;
  let whiteHeight = 30;         // White top (drum head)
  let redHeight = h - whiteHeight; // Red body
  
  // --- Drum Top (White) ---
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(0, -h / 2 + whiteHeight / 2, w, whiteHeight);
  
  // --- Drum Body (Red; Flickers between Red and Dark Red) ---
  let redBodyColor = (millis() % 500 < 250) ? color(255, 0, 0) : color(139, 0, 0);
  fill(redBodyColor);
  rect(0, -h / 2 + whiteHeight + redHeight / 2, w, redHeight);
  
  // --- Drum Face (Drawn on the Red Body) ---
  let faceCenterX = 0;
  let faceCenterY = -h / 2 + whiteHeight + redHeight / 2;
  stroke(0);
  strokeWeight(3);
  // Eyebrows (inner end lower than outer end)
  line(faceCenterX - 25, faceCenterY + 10, faceCenterX - 45, faceCenterY + 0);
  line(faceCenterX + 25, faceCenterY + 10, faceCenterX + 45, faceCenterY + 0);
  // Eyes (black ovals with white highlights)
  noStroke();
  fill(0);
  ellipse(faceCenterX - 20, faceCenterY + 20, 20, 10);
  ellipse(faceCenterX + 20, faceCenterY + 20, 20, 10);
  fill(255);
  ellipse(faceCenterX - 22, faceCenterY + 18, 5, 3);
  ellipse(faceCenterX + 18, faceCenterY + 18, 5, 3);
  // Nose
  fill(0);
  ellipse(faceCenterX, faceCenterY + 35, 10, 6);
  
  // --- Drum Arms (Hierarchical Construction) ---
  // Parameters for both arms:
  let largeArmLength = 40;
  let smallArmLength = 40;
  let armWidth = 8;
  // The small arm (drum mallet) will oscillate via a sine function:
  let strikeAngle = map(sin(millis() / 100), -1, 1, 0, -PI / 3);  // from 0 to -60°
  
  // Right Drum Arm
  push();
    // Pivot point on the right edge of the drum’s red body.
    // Adjust the pivot so the arm appears attached to the side.
    translate(w / 2, faceCenterY - 20);
    // Fixed rotation for the upper arm (tilted upward)
    rotate(-PI / 8);
    fill(255);
    rectMode(CORNER);
    rect(0, -armWidth / 2, largeArmLength, armWidth);  // Upper arm segment
    translate(largeArmLength, 0);  // Move to elbow
    rotate(strikeAngle);          // Oscillating forearm rotation (mallet action)
    rect(0, -armWidth / 2, smallArmLength, armWidth);   // Forearm segment
  pop();
  
  // Left Drum Arm
  push();
    translate(-w / 2, faceCenterY - 20);
    rotate(PI / 8);  // fixed tilt for left side
    fill(255);
    rectMode(CORNER);
    rect(0, -armWidth / 2, largeArmLength, armWidth);
    translate(largeArmLength, 0);
    // Phase-shift the oscillation for variety.
    let strikeAngleLeft = map(sin(millis() / 100 + PI), -1, 1, 0, -PI / 3);
    rotate(strikeAngleLeft);
    rect(0, -armWidth / 2, smallArmLength, armWidth);
  pop();
  
  pop();
}
