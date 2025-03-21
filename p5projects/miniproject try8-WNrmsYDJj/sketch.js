let x, y;
let pacex = 2;
let pacey = 3;
let r = 40;
let rpace = 5;
let bgcl = 100;
let bgcl_pc = 3;

let bgx, bgy;
let bgypc = 2;
let bgr = 10;

function setup() {
  createCanvas(400, 400);
  x = 1
  y = 1
  bgx = 100
  bgy = 0
}

function draw() {
  background(bgcl,0,0,10);
  fill(0);
  circle(x, y, r);
  fill(220)
  circle(x + 0.01 * (mouseX - x), y + 0.01*(mouseY - y), r-20);
  fill(208, 0, 0)
  circle(x + 0.05 * (mouseX-x), y + 0.05*(mouseY - y), r-40)
  x += pacex;
  y += pacey;
  if(x < 0 || x > width){
    pacex = -pacex
    r += rpace
    bgcl += bgcl_pc
  }
  if(y < 0 || y > height){
    pacey = -pacey
    bgcl += bgcl_pc
    r += rpace
  }
  if(r > 300){
    rpace = -rpace
  }
  if(bgcl>110){
    noStroke()
    fill('rgba(0,0,0,15)')
    circle(bgx, bgy, bgr)
    bgy += bgypc;
    
    if(bgy>height){
      bgypc = random(2, 10)
      bgr = random(10,50)
      bgx = random(100, width-100)
      bgy = 0
      
  }
  }
  if(bgcl > 200){
    bgcl_pc = -bgcl_pc
  }
}