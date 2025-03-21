let r = 1;
let g = 1;
let r_pace = 0.5;
let g_pace = 0.3;
let x1 = 50;
let x2 = 120;
let y1 = 50;
let y2= 75;
let xpc = 1;
let rectx = 200;
let rectmove = 1;
let clx;
let cly= 50;
let pcy = 10;
let a;
let k;
let ismoving = false;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(3*r,g / 2, 30, 50);
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
  circle(x1, y1, 20)
  rect(x1,y1-10, 70, 20)
  circle(x1+70, y1, 20)
  x1 += xpc
  if(x1 < 50 || x1 > 120){
    xpc = -xpc
  }
  circle(x2, y2, 20)
  rect(x2, y2-10, 70, 20)
  circle(x2+70, y2, 20)
  x2 -=xpc
  
  fill(g*2,r,100)
  rect(rectx, 30, 100,65)
  if(x1 == 120 || x2 == 120){
    rectx += rectmove * 2
    rectmove = - rectmove
    rectx += rectmove 
    k = 1
  }else{
    k += 1
  }
  //console.log(abs(x2-rectx));
  if(abs(x2+70-rectx) < 10){
    ismoving = true; 
  }
  
  // }else if(cly > height){
  //     ismoving = false;  
  //   cly = 50
  //   }
  //if(k > 0 & k < 80){
  if(ismoving){
    clx = 250 + sin(frameCount / 10) * 30;
    cly = cly + 3;
    if (cly > height + 10){
      cly = 50
  }
  }else{
    clx = 50;
  }
  circle(clx, cly, 30)
}