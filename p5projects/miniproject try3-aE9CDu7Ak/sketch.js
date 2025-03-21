let r = 1;
let g = 1;
let r1;
let g1;
let r_pace = 0.5;
let g_pace = 0.3;
let bg_x;
let bg_y;
let bg_x1;
let bg_y1;
let sm_r = 255;
let sm_g = 204;
let p1x = bg_x;
let p1y = bg_y;
let pace1x = 1.2;
let pace1y = 1;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background
  noStroke();
  background(0,5);
  fill(r, g, 200);
  r += r_pace;
  g += g_pace;
  if (r > 250 || r < 0){
    r_pace = -r_pace;
  }
  if(g > 250|| g < 0){
    g_pace = -g_pace;
  }

  bg_x = width / 2 + cos(frameCount / 100) * 100;
  bg_y = height / 2 + sin(frameCount / 100)* 100;
  circle(bg_x, bg_y,100);
  
  // fill(sm_r, sm_g, 213)
  // circle(p1x, p1y, 30)
  // p1x += pace1x
  // p1y += 5 * cos(p1x* 0.05)
  // if (p1x > width + 100){
  //   p1x = 0
  // }
  // if(p1y > 100 || p1y < 500){
  //   pace1y = -pace1y
  // }
  fill(g, r, 20);
  r += r_pace;
  g += g_pace;
  if (r > 250 || r < 0){
    r_pace = -r_pace;
  }
  if(g > 250|| g < 0){
    g_pace = -g_pace;
  }

  bg_x1 = width / 2 + sin(frameCount / 100) * 100;
  bg_y1 = height / 2 + cos(frameCount / 100)* 100;
  circle(bg_x1, bg_y1,100);
  if(bg_x == bg_x1 & bg_y == bg_y1){
    fill(255)
    circle(bg_x,bg_y, 300)
  }
}