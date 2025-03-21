let x;
let y;
let speed_x = 5;
let speed_y = 2;
let d = 50;
let r = 1;
let g = 2;
let b = 3;
let speed_r = 3;
let speed_g = 1;
let speed_b = 2;

function setup() {
  createCanvas(600, 500);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(112, 214, 255, 5);
  noStroke();
  fill(r, g, b);
  circle(x, y, d);
  
  r += speed_r;
  g += speed_g;
  b += speed_b;
  
  if(r > 255 || r < 0){
    speed_r = -speed_r;
  }
  if(g > 255 || g < 0){
    speed_g = -speed_g;
  }
  if(b > 255 || b < 0){
    speed_b = -speed_b;
  }
  
  
  circle(width-x, height-y, d);
  x += speed_x;
  y += speed_y;
  if( x > width - d / 2 || x < d / 2){
     speed_x = -speed_x;
  }
  if(y > height - d / 2 || y < d / 2){
    speed_y = -speed_y;
  }
}