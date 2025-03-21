let x = 0;
let s = 30;
let j = 0;
let w = 20;
let cx;
let cy;
let R;
let cr;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  // noFill()
  fill(0)
  
  // for(let i = s; i < width; i = i + s){
  // console.log(i)
  //   circle(width / 2, height / 2, i)
  // }
  
  
  
  // for(let j = 0; j < width; j += w){
  //   let f = map(mouseX, 0, width, 0.01, 1)
  //   let rs = 10*sin(j*mouseX);
  // // fill(random(0, 255), random(0, 255), 0)
  // rect(j, 0, rs, height)
  // }
  
  
  
  // for(let cx = s / 2; cx < width; cx += s){
  // // fill(random(255), random(255), random(255))
  //   for (let cy = s / 2; cy < height; cy += s){
  //     // fill(random(255), random(255), random(255))
  //     circle(cx, cy, s)
    // }
  // }
  
  
  for( angle = 0; angle < 2 * PI; angle += PI / 6){
    for(R = 50; R < 150; R += 30){
      let cr = map(angle, 0, 2*PI, 5, 20)
      let x = R*cos(angle) + width / 2
      let y = R*sin(angle) + height / 2
      circle(x, y, cr)
    }
    // let x = R*cos(angle) + width / 2
    // let y = R*sin(angle) + height / 2
    // circle(x, y, 20)
  }
}