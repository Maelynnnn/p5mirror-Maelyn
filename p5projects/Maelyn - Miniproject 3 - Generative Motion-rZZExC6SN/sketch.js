let r = 1;
let g = 1;
let r_pace = 0.5;
let g_pace = 0.3;
let x1 = 50;
let x2 = 120;
let y1 = 50;
let y2= 75;
let xpc = 1;
let clx1;
let clx2;
let cly= 0;
let pcy = 10;
let sidex;
let sidey;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(g / 6,r + 10, g, 20);
  noStroke();
  fill(r, g, 0);
  r += r_pace;
  g += g_pace;
  if (r > 250 || r < 0){
    r_pace = -r_pace;
  }
  if(g > 250|| g < 0){
    g_pace = -g_pace;
  }
//   up one
  circle(x1, y1, 20)
  rect(x1,y1-10, 70, 20)
  circle(x1+70, y1, 20)
  x1 += xpc
  if(x1 < 50 || x1 > 120){
    xpc = -xpc
  }
//   down one
  circle(x2, y2, 20)
  rect(x2, y2-10, 70, 20)
  circle(x2+70, y2, 20)
  x2 -=xpc
  // up two
  circle(x1+200, y1+130, 20)
  rect(x1+200,y1+120, 70, 20)
  circle(x1+270, y1+130, 20)
//   down two
  circle(x2+200, y2+130, 20)
  rect(x2+200, y2+120, 70, 20)
  circle(x2+270, y2+130, 20)
//   up three
  circle(x1, y1+250, 20)
  rect(x1,y1+240, 70, 20)
  circle(x1+70, y1+250, 20)
//   down three
  circle(x2, y2+250, 20)
  rect(x2, y2+240, 70, 20)
  circle(x2+70, y2+250, 20)
  
//   curve
  clx1 = width / 2 + sin(frameCount / 10) * 35;
  clx2 = width / 2 + cos(frameCount / 10) * 35;
  circle(clx1, cly, 30)
  circle(clx2, cly-45, 30)
  cly = cly + 3;
  if (cly > height + 40){
    cly = 0
  }
  sidex = 0 + cos(frameCount*0.1) * 100;
  sidey = height / 2 - 50 + sin(frameCount*0.1) * 100;
  circle(sidex, sidey, 10);
  circle(sidex + 400, sidey+100, 10);

}