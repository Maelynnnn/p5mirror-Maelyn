let x= 0;
let y = 0;
let pacex = 3;
let pacey = 4;
let r, g, b;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 1);
  noStroke()
  fill(r, g, b)
  circle(x,y,10)
  circle(x,height - y,10)
  circle(width - x, y,10)
  circle(width - x,height - y,10)
  x += pacex;
  y += pacey;
  if (x < 0 || x > width){
    pacex = -pacex
    r = random(220)
    g = random(220)
    b = random(220)
  }
  if(y < 0||y > height){
    pacey = -pacey
    r = random(220)
    g = random(220)
    b = random(220)
  }
}