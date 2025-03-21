let x;
let y;
let pace_x = 1;
let pace_y = 10;
let circle_r = 30;
let r;
let g;
let b;
function setup() {
  createCanvas(600, 600);
  x = width - 300
  y = 0
}

function draw() {
  noStroke();
  background(0,10);
  fill(r,g,b);
  circle(x, y, circle_r);
  y += pace_y;
  if(y > height + 20){
    r = random(0,90)
    g = random(0, 90)
    b = random(0, 100)
    pace_y = random(10, 50)
    circle_r = random(30, 100)
    x = random(100, width-100)
    y = 0
  }
}