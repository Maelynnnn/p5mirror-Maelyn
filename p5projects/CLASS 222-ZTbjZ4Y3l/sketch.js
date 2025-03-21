let angle1 = 0;
let angle2 = 0;
let s = 20;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  colorMode(HSB)
  
//   rectMode(CENTER);
//   push();
//   translate(width / 2, height / 2)
//   // rotate(PI / 2* sin(frameCount / 100));
//   rotate(angle1)
//   rect(0, 0, 100);
//   angle1 += 0.05;
//   pop();
  
//   push();
//   translate(width / 4, height / 4)
//   rotate(angle2);
//   rect(0,0, 100);
//   angle2 -= 0.05
//   pop();
  
  // noFill();
  // for (let i = 20; i < width; i += s){
  //   for(j = 20; j < height; j += s){
  //     push();
  //     let d = dist(i, j, mouseX, mouseY)
  //     d1 = map(d, 0, width, 5, 60)
  //     rectMode(CENTER)
  //     translate(i, j)
  //     rotate(angle1)
  //     rect(0, 0, d1)
  //     anglemouse = map(mouseX, 0, width, -0.005, 0.005)
  //     angle1+= anglemouse
  //     pop();
  //   }
  // }
  
  
  // noFill();
  // for (let i = 20; i < width; i += s){
  //   for(j = 20; j < height; j += s){
  //     push();
  //     let d = dist(i, j, mouseX, mouseY)
  //     let d1 = map(d, 0, width, 5, 60)
  //     let angle3 = map(mouseX, 0, width, 0, PI)
  //     rectMode(CENTER)
  //     translate(i, j)
  //     rotate(angle3)
  //     rect(0, 0, d1)
  //     pop();
  //   }
  // }
  
  noFill();
  for (let i = 20; i < width; i += s){
    for(j = 20; j < height; j += s){
      push();
      let d = dist(i, j, mouseX, mouseY)
      let d1 = map(d, 0, width, 5, 2*s)
      let angle3 = map(d, 0, width, 0, PI)
      let h = map(d, 0, width, 0, 100)
      rectMode(CENTER)
      translate(i, j)
      rotate(angle3)
      stroke(h,100,100)
      line(0,0,0,d1)
      // rect(0, 0, d1)
      pop();
    }
  }
  
  

}