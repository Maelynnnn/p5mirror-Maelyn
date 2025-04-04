// Hand Pose Painting with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;

let full_name;
let revealAlpha = 0;

let confirm = false;

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
  mei = loadImage("Mei.png")
  full_name = loadImage("小梅名字.png");
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create an off-screen graphics buffer for painting
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();

  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "f" || key === "F") {

    let fs = fullscreen();
    fullscreen(!fs);

  }
}

function draw() {
  push();
  scale(2);
  image(video, windowWidth/10, windowHeight/10);
  pop();

  image(mei, 0, 0, width, height);
  //background(0);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    
    let middle = hand.middle_finger_tip;
    let ring = hand.ring_finger_tip;
    let thumb_mcp = hand.thumb_mcp;

    // Compute midpoint between index finger and thumb
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    // Draw only if fingers are close together
    let d = dist(index.x, index.y, thumb.x, thumb.y);
    //console.log(d)
    if (d < 20) {
      painting.stroke(0);
      painting.strokeWeight(8);
      painting.line(px, py, x, y);
    }


    // Update previous position
    px = x;
    py = y;
    
    let clear_d = dist(index.x, index.y, middle.x, middle.y);
    //console.log(clear_d);
    if(clear_d < 30){
      painting.clear();
    }else{
      push();
      scale(2);
      noStroke();
      fill(0);
      circle(x + windowWidth / 10, y + windowHeight / 10, 10);
      pop();
    }
    
    let confirm_d = dist(index.x, index.y,thumb_mcp.x, thumb_mcp.y);
    if(confirm_d < 30){
       confirm = true;
    }
    console.log(confirm);

    if (confirm) {
      painting.clear();
      revealAlpha = min(revealAlpha + 5, 255);
    }

  }
  
  // Overlay painting on top of the video
  push();
  scale(2);
  image(painting, windowWidth/10, windowHeight / 10);
  pop();

  push();
  tint(255, revealAlpha);
  image(full_name, 100, -10);
  noTint();
  pop();
  
}
