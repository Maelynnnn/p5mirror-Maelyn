let x, y, R, angle;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // for (let angle = 0; angle < 20 * PI; angle += PI / 16){
  //   let R = map(angle, 0, 20 * PI, 0, width)
  //   let fs = map(angle, 0, 20 * PI, 10, 120)
  //   let col = map(angle, 0, 20 * PI, 0, 255)
  //   let x = width / 2 + R * cos(angle)
  //   let y = height / 2 + R * sin(angle)
  //   fill(col, 200, col)
  //   draw_face(x, y, 1, fs)
  // }

  for (let angle = 0; angle < 1.5 * PI; angle += PI / 30){
    push();
    translate(width / 2, height / 2)
   // rotate(frameCount * 0.1)
    let R = map(angle, 0, 1.5 * PI, 0, 100)
    let fs = map(angle, 0, 1.5 * PI, 10, 100)
    let col = map(angle, 0, 1.5 * PI, 0, 255)
    let x =  R * cos(angle)
    let y =  R * sin(angle)
    fill(col, 200, col)
    draw_face(x, y, 1, fs)
    pop();
    
}
  
//   for(i = 0; i < width + 100; i += 100){
//     for(j = 0; j < height + 100; j += 100){
//       draw_face(i, j, 1, 100)
//     }
//   }
  
  
  // push();
  // translate(width / 2, height / 2)
  // rotate(frameCount * 0.1)
  // fill(255)
  // circle(0, 0, 100);
  // fill(0);
  // circle(0 - 30, 0, 5);
  // circle(0 + 30, 0, 5);
  // arc(0, 0, 30, 30, 0, PI)
  // pop();
  // draw_face(width / 2, height / 2, 1,100);
  // draw_face(width / 4, height / 4, -1,150);
  // draw_face(300, 300, -1,250);
  console.log(checkMouse());
  if(checkMouse()){
    fill(234,34,1);
  }else{
    fill(255);
  }
  
}

function mousePressed(){
  background(random(255),random(255),random(255))
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

function checkMouse(){
  let d = dist(mouseX, mouseY, width / 2, height / 2)
  if(d < 50){
    return true
  }else{
    return false
  }
}