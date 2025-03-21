let x, y, s
let x1 = [];
let y1 = [];
function setup() {
  createCanvas(400, 400);
  s = random(50, 80)
  
}

function draw() {
  background(220);
  draw_face(x, y, -1, s);
  move();
  
}


function draw_face(x, y, dir,size){
  push();
  translate(x, y)
  rotate(dir * sin(frameCount * 0.1))
  // fill(255)
  circle(0, 0, size);
  fill(0);
  circle(0 - size * 0.3, 0, size * 0.05);
  circle(0 + size * 0.3, 0, size * 0.05);
  arc(0, 0, size * 0.3, size * 0.3, 0, PI)
  pop();
}

function move(){
  x = width * noise(frameCount * 0.01);
  y = height * noise(frameCount * 0.01);
}