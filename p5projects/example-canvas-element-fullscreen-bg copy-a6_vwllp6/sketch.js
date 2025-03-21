// open the side view and see index.html and style.css files.

function setup() {
  let canvas = createCanvas(500,400);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
}

function draw() {
  noStroke();
  fill(random(255), random(255), random(255), 30);
  ellipse(random(width), random(height), 200, 200);
}