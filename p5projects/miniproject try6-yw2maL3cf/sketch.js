let x,y;
let y1, y2;
let orgy = 0;
let mx = 35
let r, g, b;
let r1, g1, b1;
let R = 50;
let late_r = 100;
let pace = 10
let bgx, bgy;
let bgypc = 2;
let bgr = 10;
function setup() {
  createCanvas(400, 400);
  x = 0;
  y = height;
  bgx = width - 300
  bgy = 0
}

function draw() {
  background(0,5);
  noStroke()
  // stroke(220)
  
  fill(r1,g1,b1)
  circle(bgx, bgy, bgr)
  bgy += bgypc;
  if(bgy>height){
    bgypc = random(2, 10)
    bgr = random(10,50)
    bgx = random(100, width-100)
    bgy = 0
    r1 = random(220)
    g1 = random(220)
    b1 = random(220)

  }
  
  
  y = height / 2 + mx *sin(frameCount / 10);
  fill(r,g,b);
  circle(x, y, R);
  // fill(r - 10,g + 100,b - 10);
  y1 = height / 2 + mx *cos(frameCount / 10);
  circle(x-35, y1+30, R - 45);
  // fill(r + 10,g - 100,b + 10);
  y2 = height / 2 + mx *cos(frameCount /10);
  circle(x+30, y2-10, R - 40);
  x = x+5;
  if(x > width+50){
  
    x = -60;
    mx = random(30,100)
    r = random(220)
    g = random(220)
    b = random(220)
    R = random(50,65)
  }


}