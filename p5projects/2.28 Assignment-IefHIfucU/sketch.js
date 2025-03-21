let showimg = false;
let currentImageIndex = 0;
let images = [];
let positions = [];
let angle = [];
let num = [];
let tear;
let r = [];
let r_speed = 5;
let random_color = [];
let transp = [];

function preload() {
  images.push(loadImage("1.png"));
  images.push(loadImage("2.png"));
  images.push(loadImage("3.png"));
  images.push(loadImage("4.png"));
  images.push(loadImage("wanted.png"));
  images.push(loadImage("6.png"));
  images.push(loadImage("7.png"));
  images.push(loadImage("8.jpg"));
  images.push(loadImage("9.jpg"));
  images.push(loadImage("10.jpg"));
}

function setup() {
  createCanvas(600, 400);
  tear = loadSound("paper.mp3");
}

function draw_board() {
  fill(220);
  rect(50, 365, 60, 15);
  fill(242, 166, 90);
  rect(130, 365, 60, 15);

  fill(119, 47, 26);
  rect(0, 0, 20, 400);
  rect(0, 0, 600, 20);
  rect(0, 380, 600, 20);
  rect(580, 0, 20, 400);
}

function draw() {
  background(0,0,0);
  noStroke();

  fill(40, 54, 24);
  rect(20, 20, 560, 360);
  
  draw_board();

  for (let i = 0; i < positions.length; i++) {
    let img = images[num[i]];
    let pos = positions[i];

    push();
    imageMode(CENTER);
    translate(pos.x, pos.y);
    rotate(angle[i]);
    image(img, 0, 0, img.width * 0.3, img.height * 0.3);
    pop();
    
    push();
    stroke(
      random_color[i],
      random_color[i - 1] || 0,
      random_color[i - 2] || 0,
      transp[i]
    );
    strokeWeight(10);
    noFill();
    ellipse(pos.x, pos.y, r[i], r[i]);
    
    r[i] += r_speed;
    transp[i] -= 3;
    pop();    
  }
  draw_board();
}

function mousePressed() {
  if (tear.isPlaying()) {
    tear.stop();
  }
  let pos = createVector(mouseX, mouseY);
  positions.push(pos);
  angle.push(random(-PI / 4, PI / 4));
  num.push(floor(random(0, 10)));
  tear.play();
  r.push(2);
  random_color.push(random(10, 250));
  transp.push(220);
}
