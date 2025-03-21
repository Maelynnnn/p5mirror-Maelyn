let x;
let y;
let sx = 10;
function setup() {
  createCanvas(400, 400);
  x = 0;
  y = 0;

}

function draw() {
  background(220);
  rectMode(CENTER)
  strokeWeight(10)
  rect(x, y, 100, 100)
  x = x + sx;
  y = y - sx;
  
  if (x > width|| x < 0){
    sx = -sx;
  }
  // if (y > height || y < 0){
  //   sx = +sx
  // }
  console.log(frameCount)
  
}